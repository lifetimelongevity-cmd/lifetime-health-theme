"""Echte Verpackungen perspektivisch auf die Produkte im hochskalierten Hero legen.
Aufruf: python3 etiketten.py <render_1x.png> <esrgan_2x.png> <out.png> <debugdir> <produkt>[,<produkt>...]
"""
import sys, json, cv2, numpy as np
from PIL import Image
R = "/Users/benediktjunker/Desktop/Projekte/Produkte/1 AKTUELL/"
MOCK = {
    'box':       R + "AGE&DNA-Test/foto-agedna-box-tuerkis-vorne.png",
    'pouch':     R + "NMN (Pouch)/foto-nmn-pouch-30g-vorne.png",
    'kreatin':   R + "Dosen & Sprays/mockup-kreatin-dose-300g.png",
    'fisetin':   R + "Dosen & Sprays/mockup-fisetin-dose.png",
    'spermidin': R + "Dosen & Sprays/mockup-spermidin-dose.png",
    'tmg':       R + "Dosen & Sprays/mockup-tmg-dose.png",
}
# Bereich der Vorlage, der übernommen werden darf (relativ zur freigestellten Vorlage: x0,y0,x1,y1).
# Pouch nur das Logo: der Name auf dem Beutel bleibt wie im Rendering verdeckt (VSW).
ERLAUBT = {
    'box': [(0.0, 0.06, 1.0, 0.88)],
    'pouch': [(0.27, 0.235, 0.73, 0.375)],
    'kreatin': [(0.28, 0.28, 0.72, 1.0)],
    'fisetin': [(0.0, 0.30, 1.0, 1.0)],
    'spermidin': [(0.0, 0.30, 1.0, 1.0)],
    'tmg': [(0.0, 0.30, 1.0, 1.0)],
}

SCHRIFT = {'pouch'}

def lade_vorlage(p):
    im = Image.open(p).convert('RGBA')
    a = np.asarray(im.getchannel('A'))
    ys, xs = np.where(a > 240)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    return np.asarray(im)

def main():
    r1, e2, out, dbg, namen = sys.argv[1:6]
    roi_all = json.loads(open(sys.argv[6]).read()) if len(sys.argv) > 6 else {}
    render1 = np.asarray(Image.open(r1).convert('RGB'))
    esr = np.asarray(Image.open(e2).convert('RGB')).astype(np.float32)
    H2, W2 = esr.shape[:2]
    f = W2 / render1.shape[1]
    lanc = cv2.resize(render1, (W2, H2), interpolation=cv2.INTER_LANCZOS4).astype(np.float32)
    ergebnis = esr.copy()
    sift = cv2.SIFT_create(nfeatures=8000)
    bericht = {}
    for name in namen.split(','):
        x0, y0, x1, y1 = [int(v * f) for v in roi_all[name]]
        vorlage = lade_vorlage(MOCK[name])
        # Vorlage auf etwa doppelte Zielgröße bringen (Matching), Detail kommt später aus der vollen Auflösung
        ziel_b = (x1 - x0)
        s = min(1.0, 2.0 * ziel_b / vorlage.shape[1])
        vk = cv2.resize(vorlage, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        g_v = cv2.cvtColor(vk[..., :3], cv2.COLOR_RGB2GRAY)
        m_v = (vk[..., 3] > 200).astype(np.uint8) * 255
        roi = lanc[y0:y1, x0:x1].astype(np.uint8)
        g_r = cv2.cvtColor(roi, cv2.COLOR_RGB2GRAY)
        kv, dv = sift.detectAndCompute(g_v, m_v)
        kr, dr = sift.detectAndCompute(g_r, None)
        bf = cv2.BFMatcher(cv2.NORM_L2)
        mm = bf.knnMatch(dv, dr, k=2)
        gut = [m for m, n in mm if m.distance < 0.75 * n.distance]
        src = np.float32([kv[m.queryIdx].pt for m in gut]) / s
        dst = np.float32([kr[m.trainIdx].pt for m in gut]) + np.float32([x0, y0])
        Hm, inl = cv2.findHomography(src, dst, cv2.RANSAC, 3.0 * f)
        n_in = int(inl.sum()) if inl is not None else 0
        bericht[name] = {'matches': len(gut), 'inlier': n_in}
        if Hm is None or n_in < 25:
            print(name, 'zu wenige Treffer', bericht[name]); continue
        # Vorlage in voller Auflösung, aber vorher auf ~1,5x Ziel verkleinert (sauberes Downsampling)
        s2 = min(1.0, 1.5 * ziel_b / vorlage.shape[1])
        vs = cv2.resize(vorlage, None, fx=s2, fy=s2, interpolation=cv2.INTER_AREA).astype(np.float32)
        S = np.diag([1 / s2, 1 / s2, 1.0])
        Hs = Hm @ S
        warp = cv2.warpPerspective(vs, Hs, (W2, H2), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=0)
        alpha = np.clip(warp[..., 3] / 255.0, 0, 1)
        rgb = np.clip(warp[..., :3], 0, 255)
        # erlaubter Bereich der Vorlage
        hv, wv = vs.shape[:2]
        erl = np.zeros((hv, wv), np.float32)
        for ex0, ey0, ex1, ey1 in ERLAUBT[name]:
            erl[int(ey0 * hv):int(ey1 * hv), int(ex0 * wv):int(ex1 * wv)] = 1
        erl_w = cv2.warpPerspective(erl, Hs, (W2, H2), flags=cv2.INTER_LINEAR)
        innen = cv2.erode((alpha > 0.98).astype(np.uint8), np.ones((int(5 * f), int(5 * f)), np.uint8))
        maske = innen.astype(np.float32) * (erl_w > 0.5)
        sel = maske > 0.5
        # Farbe: affine 3x4-Abbildung Vorlage -> Rendering auf weichgezeichneten Pixeln
        bl = lambda im, s_: cv2.GaussianBlur(im, (0, 0), s_)
        rb, lb = bl(rgb, 2.0 * f), bl(lanc, 2.0 * f)
        X = np.c_[rb[sel], np.ones(sel.sum())]
        Y = lb[sel]
        M, *_ = np.linalg.lstsq(X, Y, rcond=None)
        farb = (np.c_[rgb.reshape(-1, 3), np.ones(H2 * W2)] @ M).reshape(H2, W2, 3)
        # Restschattierung (Zylinder, Licht): Verhältnis stark weichgezeichneter Luminanz
        lum = lambda im: im @ np.float32([0.299, 0.587, 0.114])
        sig = 10.0 * f
        w_ = bl(maske, sig) + 1e-4
        lr = bl(lum(lanc) * maske, sig) / w_
        lf = bl(lum(farb) * maske, sig) / w_
        ratio = np.clip(lr / np.maximum(lf, 1), 0.75, 1.3)
        farb = np.clip(farb * ratio[..., None], 0, 255)
        if name in SCHRIFT:
            # Nur die Schriftzüge übertragen: Text-Alpha aus der Vorlage, Grund aus dem Rendering ohne alte Schrift
            k = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(r * f) | 1, int(r * f) | 1))
            L = lum(farb); Lr = lum(lanc)
            bgv = cv2.GaussianBlur(cv2.morphologyEx(L, cv2.MORPH_CLOSE, k(7)), (0, 0), 2 * f)
            a_neu = np.clip((bgv - L - 8) / 55.0, 0, 1) * np.clip((150 - L) / 30.0, 0, 1) * (maske > 0.5)
            bgr = cv2.morphologyEx(Lr, cv2.MORPH_CLOSE, k(7))
            alt = (((bgr - Lr) > 14) & (Lr < 150)).astype(np.uint8) * (cv2.dilate((maske > 0.5).astype(np.uint8), k(4)))
            loch = cv2.dilate(((alt > 0) | (a_neu > 0.05)).astype(np.uint8), k(3))
            sauber = cv2.inpaint(np.clip(ergebnis, 0, 255).astype(np.uint8), loch, 3 * f, cv2.INPAINT_TELEA).astype(np.float32)
            ergebnis = np.where(loch[..., None] > 0, sauber, ergebnis)
            ergebnis = ergebnis * (1 - a_neu[..., None]) + farb * a_neu[..., None]
            Image.fromarray((a_neu * 255).astype(np.uint8)).save(f"{dbg}/maske-{name}.png")
            print(name, bericht[name], 'schrift')
            continue
        # Verdeckung: wo das Rendering stark abweicht (Hand, Dose davor), Rendering behalten
        diff = np.abs(bl(farb, 3.0 * f) - bl(lanc, 3.0 * f)).sum(axis=2)
        frei = (diff < 60).astype(np.uint8)
        k = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(r * f) | 1, int(r * f) | 1))
        frei = cv2.morphologyEx(frei, cv2.MORPH_CLOSE, k(4))
        frei = cv2.morphologyEx(frei, cv2.MORPH_OPEN, k(6))
        frei = cv2.erode(frei, k(3))
        n, lab, st, _ = cv2.connectedComponentsWithStats((frei * (maske > 0.5)).astype(np.uint8))
        keep = np.zeros(n, np.uint8); keep[1:] = st[1:, cv2.CC_STAT_AREA] >= (14 * f) ** 2
        frei = keep[lab]
        m_end = maske * frei
        m_end = cv2.GaussianBlur(m_end, (0, 0), 1.2 * f)
        ergebnis = ergebnis * (1 - m_end[..., None]) + farb * m_end[..., None]
        bericht[name]['abdeckung'] = round(float((m_end > 0.5).sum()) / max(1, float(sel.sum())), 3)
        Image.fromarray((m_end * 255).astype(np.uint8)).save(f"{dbg}/maske-{name}.png")
        print(name, bericht[name])
    # Badge EPIGENETIK & DNA: dunkle Pille in Vorlage und Rendering finden, Pille auf Pille legen
    if 'badge' in roi_all:
        bx0, by0, bx1, by1 = [int(v * f) for v in roi_all['badge']]
        reg = lanc[by0:by1, bx0:bx1]
        dunkel = (reg.mean(axis=2) < 70).astype(np.uint8)
        n, lab, st, _ = cv2.connectedComponentsWithStats(dunkel)
        i = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
        rx, ry, rw, rh = st[i, :4]
        box = lade_vorlage(MOCK['box'])
        hb, wb = box.shape[:2]
        ecke = box[int(hb * 0.85):, int(wb * 0.6):, :3]
        d2 = (ecke.mean(axis=2) < 70).astype(np.uint8)
        n2, lab2, st2, _ = cv2.connectedComponentsWithStats(d2)
        j = 1 + int(np.argmax(st2[1:, cv2.CC_STAT_AREA]))
        qx, qy, qw, qh = st2[j, :4]
        rand = 0.35
        mx, my = int(qw * rand / 2), int(qh * rand)
        quelle = ecke[max(0, qy - my):qy + qh + my, max(0, qx - mx):qx + qw + mx].astype(np.float32)
        zx0 = bx0 + rx - int(rw * rand / 2); zy0 = by0 + ry - int(rh * rand)
        zw = rw + 2 * int(rw * rand / 2); zh = rh + 2 * int(rh * rand)
        q = cv2.resize(quelle, (zw, zh), interpolation=cv2.INTER_AREA)
        ziel = lanc[zy0:zy0 + zh, zx0:zx0 + zw]
        bl = lambda im, s_: cv2.GaussianBlur(im, (0, 0), s_)
        X = np.c_[bl(q, 2).reshape(-1, 3), np.ones(zw * zh)]
        M, *_ = np.linalg.lstsq(X, bl(ziel, 2).reshape(-1, 3), rcond=None)
        qf = np.clip((np.c_[q.reshape(-1, 3), np.ones(zw * zh)] @ M).reshape(zh, zw, 3), 0, 255)
        m = np.zeros((zh, zw), np.float32); m[int(zh * 0.12):int(zh * 0.88), int(zw * 0.06):int(zw * 0.94)] = 1
        m = cv2.GaussianBlur(m, (0, 0), 1.5 * f)[..., None]
        ergebnis[zy0:zy0 + zh, zx0:zx0 + zw] = ergebnis[zy0:zy0 + zh, zx0:zx0 + zw] * (1 - m) + qf * m
        print('badge', (rx, ry, rw, rh), '<-', (qx, qy, qw, qh))
    # Rückfall: Kleinschrift ohne echte Vorlage (Röhrchen, Tabellen am Dosenrand) aus dem unveränderten Original
    for rx0, ry0, rx1, ry1 in roi_all.get('original', []):
        m = np.zeros((H2, W2), np.float32)
        m[int(ry0 * f):int(ry1 * f), int(rx0 * f):int(rx1 * f)] = 1
        m = cv2.GaussianBlur(m, (0, 0), 4 * f)[..., None]
        scharf = np.clip(lanc + 0.6 * (lanc - cv2.GaussianBlur(lanc, (0, 0), 1.2 * f)), 0, 255)
        ergebnis = ergebnis * (1 - m) + scharf * m
    Image.fromarray(np.clip(ergebnis, 0, 255).astype(np.uint8)).save(out)

main()
