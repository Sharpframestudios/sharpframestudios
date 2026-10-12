/*! Sharp Frame Studios: the home page's strand scene. Made by review/make-scene.js from review/scene-src; edit there. */(function(){"use strict";var ct=`
float gThin;
float gKnot;
float gShow;
float hA(float x) { return fract(sin(x * 127.1 + 31.7) * 43758.5453); }
uniform vec4 uFO, uFC, uFH; uniform vec4 uFT[3];
void shFan(vec4 s, float t, out vec3 p, out vec4 nb) {
gThin = 1.0;
float kf = s.x * 3.0, k = min(floor(kf), 2.0), u = kf - k, lay = clamp(s.y, 0.0, 1.0);
if (pick(s) < uFC.w) {
float tk = t;
float Rc = uFC.z, lyr = 1.0 - abs(2.0 * fract(s.x * 23.0 + 0.30 * (s.z - 0.5)) - 1.0), loose = step(0.80, s.w);
float g = pow(max(tk, 0.0), 0.80);
float R0 = 0.62 * Rc, rt = 0.34 * Rc * mix(0.88, 0.72 + 0.28 * lyr, smoothstep(0.0, 0.22, g)) * (1.0 + (0.25 + 0.65 * s.z) * loose * g * g);
float psi = PI - (3.55 + 0.5 * s.z - 1.5 * loose) * g;
float th = TAU * s.x * 3.0 + (1.7 + 0.5 * s.z) * g + uTime * 0.22;
float rr = R0 + rt * cos(psi);
vec3 loc = vec3(rr * cos(th), rr * sin(th), rt * sin(psi) * 0.80);
vec3 nl = vec3(cos(psi) * cos(th), cos(psi) * sin(th), sin(psi));
p = vec3(uFC.xy, 0.0) + rotX(rotY(loc, 0.20), 0.42);
nb = vec4(rotX(rotY(nl, 0.20), 0.42) * (0.62 + 0.38 * lyr), 0.10 + 0.55 * loose * g);
gThin = 0.62 - 0.14 * loose;
gBlue = exp(-tk * 3.8) + 0.25 * loose * smoothstep(0.86, 1.0, tk); gHot = 1.5 * exp(-tk * 11.0) + 0.5 * loose * smoothstep(0.965, 0.995, tk);
gFlex = 0.05; gKnot = 1.0;
return;
}
vec4 T = k < 0.5 ? uFT[0] : (k < 1.5 ? uFT[1] : uFT[2]);
float hov = k < 0.5 ? uFH.x : (k < 1.5 ? uFH.y : uFH.z);
const float M = 7.0;
float cord = min(floor(u * M), M - 1.0), own = fract(s.z * 9.7 + s.w * 4.3);
float hc = hA(cord * 3.7 + k * 11.0), hc2 = hA(cord * 5.3 + k * 7.0 + 2.0), stray = step(0.90, s.w);
vec2 O = uFO.xy + vec2((k - 1.0) * uFO.z * 0.66, 0.0), Ec = vec2(T.x, T.y);
float L = max(O.y - Ec.y, 0.2);
vec2 c1 = O + vec2(0.0, -0.40 * L), c2 = Ec + vec2(0.0, 0.52 * L);
float ts = t;
float tr = 1.0 - ts, t0 = 0.09, t1 = 0.86;
float tt = clamp((tr - t0) / (t1 - t0), 0.0, 1.0), q = 1.0 - tt;
vec2 C = q * q * q * O + 3.0 * q * q * tt * c1 + 3.0 * q * tt * tt * c2 + tt * tt * tt * Ec;
vec2 dC = 3.0 * (q * q * (c1 - O) + 2.0 * q * tt * (c2 - c1) + tt * tt * (Ec - c2));
vec2 tg = normalize(dC + vec2(0.0, -1e-4)), nrm = vec2(-tg.y, tg.x);
float up = clamp((t0 - tr) / t0, 0.0, 1.0), dn = clamp((tr - t1) / (1.0 - t1), 0.0, 1.0);
C.y += ((hc - 0.5) * 0.16 + (s.z - 0.5) * 0.07) * (1.0 - tt) * (1.0 - tt);
C += vec2(-0.30, 1.0) * up * uFH.w * (0.15 + 0.85 * s.z * s.z) - vec2(0.0, 1.0) * dn * T.w;
float e = ease(tt), flat_ = smoothstep(0.30, 0.96, tt);
float turn = (2.3 + 1.2 * hA(k + 0.5)) * (k < 1.5 ? 1.0 : -1.0) * (1.0 - e) + 0.10 * sin(uTime * 0.31 + k * 2.1 + tt * 3.0) * sin(PI * tt);
float ang = TAU * (cord + 0.5) / M + k * 1.3 + turn;
float sub = min(floor(fract(u * M) * 5.0), 4.0), lid = cord * 5.0 + sub + k * 37.0;
float hl = hA(lid * 1.31 + 3.0), hl2 = hA(lid * 2.17 + 9.0), hl3 = hA(lid * 0.73 + 5.0);
float fray = smoothstep(0.38, 0.86, tt);
float xl = ((cord + (sub + 0.5 + (hl - 0.5) * 1.8) / 5.0) / M - 0.5) * 2.0;
vec2 atCard = vec2(mix(((cord + 0.5) / M - 0.5) * 2.0 + (hc - 0.5) * 0.14, xl, fray), (hc2 - 0.5) * 1.6 + (hl3 - 0.5) * 0.9 * fray);
vec2 cc = mix(0.55 * vec2(cos(ang), sin(ang)), atCard, flat_);
float ra = mix(uFO.z * 0.36, T.z, flat_ * flat_), rb = mix(uFO.z * 0.36, uFO.w * 0.16, e);
float rc = mix(mix(uFO.z * 0.20, uFO.z * 0.105, e) * (0.70 + 0.60 * hc), uFO.z * (0.020 + 0.085 * hl2 * hl2), fray);
float phi = TAU * s.w + (1.0 + 1.4 * hc) * tt * (hc2 < 0.5 ? 1.0 : -1.0);
float rho = rc * sqrt(lay) * (1.0 + stray * (0.6 + 2.2 * sin(PI * tt) * (0.5 + 0.5 * sin(tt * 7.0 + TAU * own))));
float ax = cc.x * ra + rho * cos(phi), bz = cc.y * rb + rho * sin(phi);
ax += fray * ((hl3 - 0.5) * 0.34 * min((1.0 - tt) * L, 0.5)
+ uFO.z * 0.11 * (0.35 + hl) * sin(tt * (9.0 + 15.0 * hl2) + TAU * hl3 + uTime * (0.25 + 0.35 * hl)));
ax *= 1.0 + up * up * 0.30;
vec2 xy = C + nrm * ax;
xy += nrm * (0.012 * sin(uTime * 0.50 + k * 1.7 - tt * 6.0) * sin(PI * tt) + 0.007 * sin(uTime * 0.83 + TAU * hc + tt * 9.0) * tt * (1.0 - dn));
p = vec3(xy, bz + (k - 1.0) * 0.02);
float secx = clamp(ax / max(ra + rc, 1e-3), -1.0, 1.0), front = clamp(0.5 + 0.5 * bz / max(rb + rc, 1e-3), 0.0, 1.0);
nb = vec4(normalize(vec3(nrm * secx * 0.55, 0.35 + front)) * (0.60 + 0.40 * front), (0.28 + 0.62 * own) * (0.55 + 0.45 * front) + 0.25 * hov);
gBlue = 0.35 * hov * smoothstep(0.50, 0.90, tr); gHot = 0.30 * hov * smoothstep(0.66, 0.86, tr) * step(0.6, own);
gFlex = 0.25 * sin(PI * tt);
}
uniform vec4 uAC[2]; uniform vec4 uAP;
void shArcs(vec4 s, float t, out vec3 p, out vec4 nb) {
gThin = 1.0;
float k = (pick(s) < uAP.w || s.x >= 0.66667) ? 1.0 : 0.0, dir = 1.0 - 2.0 * k;
float lay = sqrt(clamp(s.y, 0.0, 1.0)), own = fract(s.z * 9.7 + s.w * 4.3), stray = step(0.86, s.w);
vec4 C = k < 0.5 ? uAC[0] : uAC[1];
const float RET = 0.49;
float Ls = 0.46, per = 1.0 + RET, uu = mod(fract(s.z + dir * uTime * 0.0045) * per + Ls * t, per);
float ph = TAU * uu / per;
float lock = floor(fract(s.x * 3.0) * 9.0);
float phi = TAU * (hA(lock + k * 9.0) + 0.16 * (s.w - 0.5)) + ph * dir + 0.5 * sin(ph + TAU * s.z);
float rho = uAP.z * (0.25 + 0.75 * lay) * (1.0 + 1.5 * stray * (0.5 + 0.5 * sin(ph + TAU * own))) * (0.85 + 0.25 * sin(2.0 * ph + TAU * s.w));
rho *= 0.20 + 0.80 * smoothstep(0.0, 0.10, t) * (1.0 - 0.7 * smoothstep(0.88, 1.0, t));
vec3 loc, n;
if (uu <= 1.0) {
float A = mix(uAP.x, uAP.y, uu), R = C.z + rho * cos(phi);
loc = vec3(R * cos(A), R * sin(A), rho * sin(phi));
n = vec3(cos(phi) * cos(A), cos(phi) * sin(A), sin(phi));
} else {
float w = (uu - 1.0) / RET;
vec2 ce = C.z * mix(vec2(cos(uAP.y), sin(uAP.y)), vec2(cos(uAP.x), sin(uAP.x)), w);
vec2 dn = normalize(vec2(-(sin(uAP.x) - sin(uAP.y)), cos(uAP.x) - cos(uAP.y)) + vec2(0.0, -1e-4));
loc = vec3(ce + dn * rho * cos(phi), rho * sin(phi));
n = vec3(dn * cos(phi), sin(phi));
}
p = vec3(C.xy, 0.0) + rotY(loc, C.w);
n = rotY(n, C.w);
nb = vec4(n * (0.58 + 0.42 * lay), 0.30 + 0.50 * own * (0.5 + 0.5 * stray));
gBlue = 0.0; gHot = 0.0; gFlex = 0.30;
}
uniform vec4 uWv, uWv2, uWv3, uWv4, uWv5, uWvL, uWvK, uStE; uniform vec4 uSt[3];
float stairH(float x) {
float r = max(uStE.w, 1e-4);
float h = uSt[0].y * smoothstep(uStE.x - r, uStE.x + r, x)
+ (uSt[1].y - uSt[0].y) * smoothstep(uStE.y - r, uStE.y + r, x)
+ (uSt[2].y - uSt[1].y) * smoothstep(uStE.z - r, uStE.z + r, x);
return h * (1.0 - smoothstep(uSt[2].x - r, uSt[2].x + r, x));
}
vec3 unslot(vec3 p, vec4 s, float thick) {
const float CAMD = 4.0108, B = 1.01695;
float slot = (s.y * 0.7 + s.w * 0.3 - 0.5) * 0.004 * max(1.0, thick) - (s.z - 0.5) * 0.00012;
float d = CAMD - p.z;
return vec3(0.0, 0.0, CAMD) + (p - vec3(0.0, 0.0, CAMD)) / (1.0 - slot * d / B);
}
void shWeave(vec4 s, float t, out vec3 p, out vec4 nb) {
float hw = uWv.z, hd = uWv.w, A = uWv2.z, ws = uWv3.y, kap = max(uWv4.z, 1.0);
bool warp = s.x < ws;
float u = warp ? s.x / ws : (s.x - ws) / (1.0 - ws);
float N = warp ? uWv2.x : uWv2.y, No = warp ? uWv2.y : uWv2.x;
float al = warp ? uWv4.x : uWv4.y, ao = warp ? uWv4.y : uWv4.x;
vec2 e = vec2(cos(al), sin(al)), n = vec2(-e.y, e.x), eo = vec2(cos(ao), sin(ao)), no = vec2(-eo.y, eo.x);
if (e.y > 0.0) e = -e;
float Cm = abs(n.x) * hw + abs(n.y) * hd, Co = abs(no.x) * hw + abs(no.y) * hd, d = 2.0 * Cm / N, dO = 2.0 * Co / No;
float fi = u * N, i = min(floor(fi), N - 1.0), w = min(floor(fract(fi) * kap), kap - 1.0), wq = (w + 0.5) / kap - 0.5;
float LmaxS = 2.0 * min(abs(e.x) > 1e-4 ? hw / abs(e.x) : 99.0, abs(e.y) > 1e-4 ? hd / abs(e.y) : 99.0);
float iLo = min(ceil(0.20 * LmaxS * abs(n.x * n.y) / d - 0.5), floor(0.5 * N) - 1.0);
i = clamp(i, iLo, N - 1.0 - iLo);
float c = -Cm + (i + 0.5) * d + wq * uWv3.x * d;
float l0 = -99.0, l1 = 99.0, la, lb;
if (abs(e.x) > 1e-4) { la = (-hw - c * n.x) / e.x; lb = (hw - c * n.x) / e.x; l0 = max(l0, min(la, lb)); l1 = min(l1, max(la, lb)); }
if (abs(e.y) > 1e-4) { la = (-hd - c * n.y) / e.y; lb = (hd - c * n.y) / e.y; l0 = max(l0, min(la, lb)); l1 = min(l1, max(la, lb)); }
float l0c = l0, l1c = l1;
float par = 1.0 - 2.0 * mod(i, 2.0), sg = warp ? 1.0 : -1.0, gj = dot(no, e) / dO, j0 = (dot(no, c * n) + Co) / dO;
float odd = sg * par > 0.0 ? 1.0 : 0.0, hw_ = hA(i * 7.3 + w * 1.9 + (warp ? 0.0 : 31.0));
float Lmax = 2.0 * min(abs(e.x) > 1e-4 ? hw / abs(e.x) : 99.0, abs(e.y) > 1e-4 ? hd / abs(e.y) : 99.0);
float dep = 2.0 * hd / max(abs(e.y), 0.2) * step(1e-4, abs(e.y));
l1 = max(l0, l1 - uWv5.y * dep * hw_);
if (abs(gj) > 1e-3) {
float q0 = (j0 + (l0 + uWv5.w * dep * fract(hw_ * 7.7)) * gj - 0.5 - odd) * 0.5;
l0 = min(l1, max(l0, (2.0 * (gj > 0.0 ? ceil(q0) : floor(q0)) + odd + 0.5 - j0) / gj));
float q1 = (j0 + l1 * gj - 0.5 - odd) * 0.5;
l1 = max(l0, min(l1, (2.0 * (gj > 0.0 ? floor(q1) : ceil(q1)) + odd + 0.5 - j0) / gj));
}
if (l1 - l0 < 0.07 * Lmax) { l1 = min(l1c, l0 + 0.07 * Lmax); l0 = max(l0c, l1 - 0.07 * Lmax); }
float len = max(l1 - l0, 0.0), Lp = uWv5.x * Lmax, lc = l0 + clamp(s.y, 0.0, 1.0) * len;
float sa = lc - 0.5 * Lp, sb = lc + 0.5 * Lp;
if (abs(gj) > 1e-3) {
sa = (2.0 * floor((j0 + sa * gj - 0.5 - odd) * 0.5 + 0.5) + odd + 0.5 - j0) / gj;
sb = (2.0 * floor((j0 + sb * gj - 0.5 - odd) * 0.5 + 0.5) + odd + 0.5 - j0) / gj;
}
float l = mix(max(l0, sa), min(l1, sb), clamp(t, 0.0, 1.0)), laid = 1.0;
vec2 P = c * n + l * e;
float jf = (dot(no, P) + Co) / dO;
float hgt = sg * par * cos(PI * (jf - 0.5));
float crown = 1.0 - 4.0 * wq * wq;
float y = A * hgt + A * 0.45 * crown + stairH(P.x + uWv.x)
+ uWv3.w * sin(uTime * 0.45 + P.x * 2.3 + P.y * 3.1);
float dy = -sg * par * A * PI * dot(no, e) / dO * sin(PI * (jf - 0.5));
vec3 loc = vec3(P.x, y, P.y), nn = normalize(vec3(-dy * e.x, 1.0, -dy * e.y + 0.35) + vec3(n.x, 0.0, n.y) * (2.0 * wq * uWvK.x));
float tilt = uWv2.w, top = 0.5 + 0.5 * hgt;
p = unslot(vec3(uWv.x, uWv.y, 0.0) + rotX(loc, tilt), s, uWv4.w);
gThin = mix(0.27, 1.0, smoothstep(-hd, -hd + 2.0 * hd * max(uWv5.y, 0.01), P.y)) * (0.30 + 0.70 * laid);
vec2 nW = warp ? n : no, nF = warp ? no : n;
float CW = warp ? Cm : Co, CF = warp ? Co : Cm, dW = warp ? d : dO, dF = warp ? dO : d;
float i1 = floor((dot(nW, vec2(-0.42 * hw, -0.30 * hd)) + CW) / dW), i3 = floor((dot(nW, vec2(-0.50 * hw, 0.50 * hd)) + CW) / dW);
float i2 = floor((dot(nF, vec2(0.42 * hw, -0.25 * hd)) + CF) / dF);
float lit = warp ? (i == i1 ? uWvL.x : (i == i3 ? uWvL.z : 0.0)) : (i == i2 ? uWvL.y : 0.0);
float mid = abs(w - 0.5 * (kap - 1.0)), wire = mid < 0.5 ? 1.0 : (mid < 1.5 ? 0.50 : 0.0);
float xs = P.x * (warp ? -1.0 : 1.0) / hw, head = mix(uWvL.w, uWv5.z, lit);
float run = smoothstep(0.0, 0.02, head - xs) * step(0.5 * uWvL.w, xs) * step(0.004, lit) * wire;
float lay = mix(uWvK.y, 1.0, top * top * (3.0 - 2.0 * top)) * (1.0 - uWvK.z * (1.0 - crown));
nb = vec4(rotX(nn, tilt) * lay * (1.0 - 0.22 * run), uWvK.w * top * top * (1.0 - run));
float dh = (xs - head) / 0.03;
gBlue = run; gHot = 0.70 * run * exp(-dh * dh) * step(lit, 0.985) + 0.55 * run * step(0.9, wire);
gFlex = 0.10;
}`,u=Math.PI/180,qt={loop:.75,fan:.4,arcs:.55};function Ot(n,l){return jt(n,l)+.06*n.cssW}function fo(n,l){var p=n.box("#portrait"),v=l.t-.3*n.cssH;return p?Math.max(v,Math.min(p.b+.12*n.U,l.t-.12*n.cssH)):v}function jt(n,l){return n.narrow()?Math.max(9,.5*l):Math.max(30,.5*l)}function ro(n){var l=n.box("#portrait")||n.NONE,p=n.box("#studio")||n.NONE,v=n.narrow(),g=v?Math.min(.56*l.h,.66*n.cssW):Math.min(.6*l.h,Math.max(.5*l.h,(l.cx-14)/.845)),x=l.cy-10,S=(v?.97:.8)*g,M=[],R,H=l.cx,K=0,P=0;!v&&g>1&&(K=l.r+.092*n.U,P=n.clamp01((.2*n.cssH/g-.8)/.15)*n.clamp01((K-(H+S))/(.02*n.U))*Math.max(n.sstep((n.q-2)/.25),1-n.open(x-.95*g,x+.95*g)));var tt=function(yt){return P>0?n.lerp(yt,Math.max(yt,K),P):yt};if(n.q<2){var Q=n.sstep(n.clamp01(n.q-1)),At=.365*n.U;H=n.lerp(n.cssW/2,H,Q),x=n.lerp(n.cssH/2-.03*n.U,x,Q),S=n.lerp(At,S,Q),g=n.lerp(At,g,Q)}if(v){var Rt=jt(n,p.l+20);for(R=-.72;R<=.73;R+=.36)M.push([Math.max(Rt,H-S*Math.sqrt(1-R*R)),x+R*g,.02]);M.push([Math.max(Rt,H-.42*S),x+.93*g,.02])}else{for(R=-.72;R<=.73;R+=.36)M.push([tt(H+S*Math.sqrt(1-R*R)),x+R*g,.02]);M.push([tt(H+.42*S),x+.93*g,.02])}if(v){var Tt=n.box("#studio .studio-copy");return M.push([jt(n,p.l+20),Math.max(x+1.25*g,(Tt?Tt.b:p.b-120)-.02*n.cssH),0]),M}var nt=Math.max(x+1.25*g,p.b-20);if(P>0){var ht=n.box("#services .sec-head");ht&&(nt=n.lerp(nt,Math.min(nt,Math.max(x+1.25*g,fo(n,ht))),P))}return M.push([n.cssW*.3,nt,0]),M}function Qo(n){var l=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),v=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,g=n.narrow(),x=n.cssH,S=p[0]||n.NONE,M=jt(n,l.l);return[[g?M:n.cssW*.3,g?l.t-.22*x:fo(n,l),0],[M,S.t+60,-.05],[M,v.t-20,-.05],[v.l+.16*v.w,v.b+14,-.02]]}function Wo(n){var l=n.box("#film .sec-head")||n.NONE,p=n.box("#film .films .player",!0);p.length||(p=n.box("#film .player",!0));var v=p[0]||n.NONE,g=p.length?p[p.length-1].b:v.b;if(n.narrow()){var x=Math.max(-6,Math.min(jt(n,l.l),l.l-.072*n.U-2));return[[x,l.t-90,-.03],[x,g+40,-.03]]}return[[n.cssW/2,l.t-90,-.03],[n.cssW/2,g+40,-.03]]}function xe(n){var l=n.box("#wkStage")||n.NONE,p=n.narrow()?jt(n,(n.box("#work .sec-head")||n.NONE).l):n.cssW/2;return[[p,l.t-40,-.03],[p,l.b+.1*n.cssH,0]]}function $o(n){var l=n.box(".oc-shot")||n.NONE,p=n.narrow()?jt(n,(n.box("#focus .sec-head")||n.NONE).l):n.cssW/2;return[[p,l.t-60,-.03],[p,l.b-.1*n.cssH,0]]}function co(n){var l=n.box("#portrait")||n.NONE,p=n.narrow(),v=p?Math.min(.56*l.h,.66*n.cssW):Math.min(.6*l.h,Math.max(.5*l.h,(l.cx-14)/.845)),g=n.ul(v);return{shape:0,u:{uW0:[5.6,g,.085*g,1],uW1:[.3*g,.5,1.55,89],uW2:[.55,1.25,.22,47],uW3:[0,.365,.072,.0876],uWC:[n.ux(l.cx),n.uy(l.cy-10),0,0],uWR:[p?0:-33*u,-.06,4.2+n.time*.05,-1.5],uWB:[0,.73,0,.65]},look:n.look({thick:1.15,gain:.95,share:qt.loop,points:.45,pointSize:.8,tips:0}),open:n.open(l.cy-10-.95*v,l.cy-10+.95*v)}}function Zo(n){for(var l=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),v=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,g=n.narrow(),x=n.cssW,S=n.cssH,M,R,H=n.hover||[0,0,0],K=g?l.t-.22*S:fo(n,l);p.length<3;)p.push(p[p.length-1]||n.NONE);var P={shape:1,u:{uFO:g?[n.ux(Ot(n,l.l)),n.uy(K),n.ul(.07*x),.25]:[n.ux(x*.3),n.uy(K),n.ul(72),.3],uFC:[n.ux(v.l+.16*v.w),n.uy(v.b+10),n.ul(.34*Math.min(v.h,260)),.15],uFH:[H[0],H[1],H[2],n.ul(g?90:150)]},knot:[.15,n.open(v.b-70,v.b+50,v.b-110,v.b+30)],look:n.look({thick:1.25,gain:.95,share:qt.fan,points:.6,pointSize:.85,tips:0}),open:n.open(l.t,p[g?2:0].t+160,K,p[0].t+70)};for(M=0;M<3;M++)R=p[M],P.u["uFT"+M]=g?[n.ux(R.l+.12*R.w),n.uy(R.t),n.ul(.1*R.w),n.ul(60)]:[n.ux(R.cx),n.uy(R.t),n.ul(.26*R.w),n.ul(70)];return P}function ge(n){var l=n.box("#film .films .player",!0),p=n.narrow(),v,g;for(l.length||(l=n.box("#film .player",!0));l.length<2;)l.push(l[l.length-1]||n.NONE);var x={shape:2,u:{uAP:[-20*u,200*u,n.ul(.03*l[0].w),.15]},look:n.look({thick:1.05,gain:.95,share:qt.arcs,points:.35,pointSize:.85})},S=l[0].t+.12*l[0].h,M=.75*l[0].w;if(x.open=p?n.open(l[0].t-60,l[0].t+.5*l[0].h,l[0].t-160,l[0].t+40):n.open(S-M,S+.15*M,S-M,l[0].t+.45*l[0].h),p){var R=n.box("#film .sec-head")||n.NONE,H=.62*n.cssW;x.u.uAC0=x.u.uAC1=[n.ux(n.cssW/2),n.uy(R.t-100+H),n.ul(H),0],x.u.uAP=[0,Math.PI,n.ul(.03*l[0].w*1.6),.15]}else for(v=0;v<2;v++)g=l[v],x.u["uAC"+v]=[n.ux(g.cx+(v?-1:1)*.12*g.w),n.uy(g.t+.12*g.h),n.ul(.75*g.w),(v?-1:1)*60*u];return x}var Ut={thick:1,gain:.66,share:1,points:.22,pointSize:.8,deep:.15,skin:.76,skinW:.2,back:.6},Eo=[.95,.44,.1,.18];function Ro(n,l,p,v,g,x,S,M){var R=n.narrow(),H=R?20:32,K=31*u,P=n.ul(v),tt=Math.sin(K)*P+Math.cos(K)*g,Q=2*tt/H;return{uWv:[n.ux(l),n.uy(p),P,g],uWv2:[H,H,.15*Q,x],uWv3:[.6,.5,0,.004],uWv4:[K,-K,5,Ut.thick],uWv5:[.42,.4,Math.min(1,.5*n.cssW/v+.03),.08],uWvK:Eo,uWvL:S?[S[0],S[1],S[2],M]:[0,0,0,.3],uStE:[-9,-9,-9,.03],uSt0:[0,0,0,0],uSt1:[0,0,0,0],uSt2:[99,0,0,0]}}function Po(n,l,p,v){if(n.narrow())return l;var g=p*n.U*Math.sin(v),x=Math.min(.16*n.cssH,2*g+.035*n.cssH);return Math.min(l,n.cssH-x+g)}function No(n,l,p){return n.narrow()?n.open(l-.8*p,l+1.4*p):n.open(l-.8*p,l+1.4*p,l-p,l-.25*p)}function Ho(n){if(!n.narrow())return n.look(Ut);var l={},p;for(p in Ut)l[p]=Ut[p];return l.share=.86,n.look(l)}function we(n){var l=n.box("#wkStage")||n.NONE,p=n.narrow(),v=p?.45:.8,g=Po(n,l.b+(p?90:.16*n.cssH),v,20.6*u),x=v*n.U*.4+30;return{shape:3,u:Ro(n,n.cssW/2,g,.6*n.cssW,v,20.6*u),look:Ho(n),open:No(n,g,x),foot:g-.55*x}}function s(n){var l=n.box(".oc-shot")||n.NONE,p=n.detail||[0,0,0],v=.72*n.cssW,g=n.narrow()?.5:.9,x=Po(n,l.b-.02*n.cssH,g,23*u),S=g*n.U*.44+30;return{shape:3,u:Ro(n,n.cssW/2,x,v,g,23*u,p,Math.max(.05,.5*l.w/v-.06)),look:Ho(n),open:No(n,x,S),foot:x-.55*S}}function c(n){var l=null,p,v=window.__sceneShapes||[];for(p=0;p<v.length;p++)v[p]&&v[p].id==="b"&&v[p].foot7&&(l=v[p].foot7(n));if(!l){var g=n.box("#process .steps .step")||n.box("#process .steps")||n.NONE;l={left:g.l-24,right:g.r+24,floor:g.t+6,hd:n.narrow()?.16:.2,tip:.3}}var x=Po(n,l.floor,l.hd,l.tip),S=l.hd*n.U*.4+30;return{shape:3,u:Ro(n,(l.left+l.right)/2,x,Math.max(40,(l.right-l.left)/2),l.hd,l.tip),look:Ho(n),open:No(n,x,S),foot:x-.55*S}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"a",glsl:ct,shapes:{1:"shFan",2:"shArcs",3:"shWeave"},stations:{2:co,3:Zo,4:ge,5:we,6:s,"6.5":c},ways:{2:ro,3:Qo,4:Wo,5:xe,6:$o}})})(),(function(){"use strict";var ct={stair:{tip:.3,depth:.2,depthNarrow:.16,riser:.055,riserNarrow:.028,shoulder:.04,shoulderNarrow:.028,cap:.07,warp:.42,lean:1.5,run:.34,fan:.1,locks:24,locksNarrow:8,wires:17,wiresNarrow:10,skirt:.11,node:12,nodeNarrow:10,floorUnder:10,floorUnderNarrow:6,shareNarrow:.86,look:{thick:1.1,gain:.98,share:1,points:.28,pointSize:.9}},pass:{depth:.5,halfWidth:.7,foot:.99,look:{thick:.85,gain:.72,share:1,points:0,pointSize:.9}},columns:{tip:.26,radius:.33,radiusNarrow:.47,rimGap:.36,ovalGap:.42,footNarrow:96,foot:60,riseOver:.33,rim:.035,rimPick:.085,yarns:8,relief:.013,turnsWide:.42,turnsNarrow:.86,wide:.74,wideWidth:.86,hoops:.08,slide:.02,blueWall:.45,blueHoop:.22,share:.8,band:37,bandPly:8,look:{thick:1.3,gain:1.03,share:1,points:.12,pointSize:.9}},arcs:{radius:[.34,.58],rope:.08,tip:.4,apart:.07,factor:3,reach:.8,cover:1,fanOut:.26,wait:.12,look:{thick:1.05,gain:.9,share:.88,points:.2,pointSize:.9}},ring:{radius:[.3,.56],radiusNarrow:.46,rope:.105,tip:.42,below:.02,twist:1.5,section:.62,loose:.07,turn:.03,glint:.55,wait:.1,look:{thick:1.5,gain:.94,share:.88,points:.35,pointSize:1}},foot:{radius:[.27,.5],radiusNarrow:.44,tip:.44,above:.17,look:{thick:1.5,gain:.94,share:.88,points:.3,pointSize:1}}},u=`
uniform vec4 uTX[3]; uniform vec4 uTE[3]; uniform vec4 uTH[3]; uniform vec4 uTN[3];
uniform vec4 uTP, uTQ, uTR, uTL;
vec4 gtE, gtH; float gtR;
float trS(float d) { return smoothstep(-gtR, gtR, d); }
float trH(float x) { return gtH.x * trS(x - gtE.x) + (gtH.y - gtH.x) * trS(x - gtE.y) + (gtH.z - gtH.y) * trS(x - gtE.z); }
float trPlus(float d, float k) { return 0.5 * (d + sqrt(d * d + k * k)); }
float wireOf(float v, float vMid) { return 1.0 - abs(2.0 * fract((v - vMid) * uTR.w + 0.5) - 1.0); }
void shStair(vec4 s, float t, out vec3 p, out vec4 nb) {
int gi = 0;
if (uTQ.y > 0.5) gi = int(min(floor(fract(s.z * 13.37 + s.w * 5.19) * 3.0), 2.0));
vec4 X = uTX[gi], N4 = uTN[gi];
gtE = uTE[gi]; gtH = uTH[gi]; gtR = max(uTP.y, 0.004);
float xL = X.x, xR = X.y, hd = X.w, rf = uTP.z, cap = max(uTP.w, 0.01), ws = uTQ.x;
float lay = max(s.y, 0.0), hs = fract(s.z * 5.17 + s.w * 3.31);
vec3 loc, n; float fr, lw;
float flat_ = 1.0 - smoothstep(0.0, 0.03, gtH.z);
gBlue = 0.0; gHot = 0.0;
if (s.x < ws) {
float v = s.x / ws;
float span = 2.0 * hd - rf, vMid = hd / span;
float isLine = step(abs(v - uTL.x), 0.012);
float beta = 2.0 * gtR;
float nr = step(gtE.x, xR) + step(gtE.y, xR) + step(gtE.z, xR);
float lane0 = -hd + v * span;
float zn = clamp(lane0 / hd, -1.0, 1.0), ze = sqrt(max(0.0, 1.0 - zn * zn));
float xW = xR - 0.25 * cap * (1.0 - ze);
float Mt = (xW - xL) + nr * beta + min(gtH.z, 0.13);
float cov = mix(0.46, 1.0, isLine);
float deep = 0.0;
float m = Mt * ((1.0 - cov) * s.z + cov * t * (1.0 - deep));
float xr = xL + m;
float x = xr - beta * (smoothstep(-beta, beta, xr - gtE.x - 0.5 * beta) + smoothstep(-beta, beta, xr - gtE.y - 1.5 * beta) + smoothstep(-beta, beta, xr - gtE.z - 2.5 * beta));
float mid = 1.0 - zn * zn;
float flow = (0.10 * sin(x * 2.9 + 0.5) + 0.05 * sin(x * 6.7 + 2.1)) * mid;
float fanL = 1.0 + 0.35 * (1.0 - smoothstep(xL, gtE.x, x));
float lane = mix((lane0 + hd * flow) * fanL, 0.0, isLine);
float drop = trPlus(x - xW, 0.07);
float xf = x - drop;
float h = trH(xf);
float y = max(h - drop, 0.0);
float hx = (trH(xf + 0.012) - trH(xf - 0.012)) / 0.024;
float wl = smoothstep(0.006, 0.06, drop);
n = normalize(mix(normalize(vec3(-hx, 1.0, 0.0)), normalize(vec3(1.0, 0.25, 0.35)), wl));
float wire = wireOf(v, vMid);
float lyr = mix(wire, 1.0, isLine);
float sunk = (1.0 - smoothstep(0.55, 0.95, lyr)) * min(0.020, 0.5 * h + 0.004);
loc = vec3(xf - sunk * wl - 0.05 * smoothstep(0.05, 0.13, drop), max(y - sunk * (1.0 - wl), 0.0) + 0.004 * isLine + flat_ * (0.008 + 0.006 * lyr), lane + 0.002 * (lay - 0.5) * isLine);
lw = mix(0.46 + 0.54 * lyr, 0.90, isLine); fr = 0.20;
float lineOn = isLine * N4.w * (1.0 - smoothstep(gtE.w - 0.035, gtE.w + 0.008, xf)) * smoothstep(xL + 0.03, xL + 0.30, xf) * (1.0 - wl);
vec3 dn = (vec3(xf) - N4.xyz), dz2 = vec3(lane * lane * 0.30);
vec3 reached = smoothstep(N4.xyz - 0.03, N4.xyz, vec3(gtE.w)) * gtH.w * (1.0 - wl);
gBlue = max(lineOn, 0.90 * dot(exp(-(dn * dn + dz2) / 0.0030), reached));
gHot = 1.5 * dot(exp(-(dn * dn + dz2) / 0.00085), reached);
} else {
float u = (s.x - ws) / (1.0 - ws);
float body = step(0.70, fract(s.w * 7.0)), NL = max(uTR.z, 2.0);
float lf = u * NL + 0.41 * body, li = floor(lf), wi = fract(lf) - 0.5;
float r1 = fract(sin(li * 12.9898 + body * 78.233) * 43758.5453), r2 = fract(r1 * 7.31 + 0.19), r3 = fract(r1 * 3.77 + 0.63);
float xs = mix(xL, gtE.x, 0.30);
float x0 = xs + (xR - 0.003 - xs) * clamp((li + 0.5 - 0.41 * body + wi * mix(0.56 + 0.42 * r2, 1.02, body)) / NL, 0.0, 1.0);
float ec0 = clamp((x0 - (xR - cap)) / cap, 0.0, 1.0), zf0 = hd * sqrt(1.0 - ec0 * ec0);
float h0 = trH(x0), rfe = min(rf, h0), bsh = clamp(h0 / rf, 0.0, 1.0), rfz = min(rf, zf0);
float dl = mix(0.25 + 0.75 * r3, 0.0, body);
float zoff = mix(0.006 + 0.013 * dl, 0.001, body) + 0.005 * lay;
float nearEnd = clamp((xR - x0) / 0.45, 0.06, 1.0);
float leanK = mix(0.8 + 2.0 * r1, 0.85, body) * nearEnd, lt = mix(0.45 + 0.75 * r1, 0.50, body);
lt *= clamp((xR - 0.03 - x0) / (lt * 2.0 * hd + 1e-4), 0.0, 1.0);
lw = mix(0.56 + 0.24 * dl + 0.20 * lay, 0.38 + 0.26 * lay, body);
float sway = 1.0 + 0.020 * sin(uTime * 0.37 - x0 * 2.6) + 0.012 * sin(uTime * 0.61 + TAU * r2);
float run = (uTQ.z * h0 * leanK + uTQ.w * (0.6 + 0.8 * r2) * mix(0.12, 1.0, nearEnd)) * (0.88 + 0.24 * s.z) * sway * (1.0 + 0.12 * wi * (1.0 - body));
float slope = 0.62 * run * 0.66 / (1.35 * max(h0 - rfe, 0.02));
float tA = 0.10;
if (t < tA) {
float a = t / tA, af = clamp(a / 0.66, 0.0, 1.0), ar = clamp((a - 0.66) / 0.34, 0.0, 1.0), phi = ar * 1.5708;
float zfl = mix(max(zf0 - rfz - 1.8 * rf, -zf0), zf0 - rfz, af), zz = zfl + mix(rfz * ar, rfz * sin(phi), bsh);
float y = h0 - rfe * (1.0 - cos(phi)) - 0.014 * (1.0 - af) * bsh + flat_ * (0.001 + 0.005 * dl + 0.002 * lay);
float a2 = phi * bsh;
n = vec3(0.0, cos(a2), sin(a2));
loc = vec3(x0 + lt * (zf0 - zz) - slope * rfe * (1.0 - cos(phi)), y, zz + zoff * ar);
lw = mix(lw, 0.70 + 0.22 * lay, body); fr = 0.20;
} else {
float tau = (t - tA) / (1.0 - tA);
float xi = run * (0.62 * tau + 0.38 * pow(max(tau, 0.0), 1.6));
float yl = (h0 - rfe) * pow(1.0 - min(tau / 0.66, 1.0), 1.35);
float x = x0 - slope * rfe - xi;
float hh = trH(x), yc = hh - 0.55 * min(rf, hh), hk;
float y = max(smin(yl, yc, 0.045, hk), 0.0) + flat_ * (0.001 + 0.005 * dl + 0.002 * lay);
float ec = clamp((x - (xR - cap)) / cap, 0.0, 1.0), ze = sqrt(1.0 - ec * ec);
float onFloor = 1.0 - smoothstep(0.0, 0.035, y);
float fwd = uTR.x * (0.15 + 0.85 * hs) * smoothstep(0.0, 1.0, tau) * onFloor;
float belly = 0.010 * sin(PI * clamp(y / max(h0, 0.02), 0.0, 1.0)) * (0.3 + 0.7 * dl);
vec3 npl = normalize(vec3(ec * hd / cap, 0.12, ze + 0.02));
n = normalize(mix(npl, vec3(0.0, 1.0, 0.0), onFloor));
loc = vec3(x, y, hd * ze + zoff + fwd + belly);
lw = mix(lw, mix(0.70 + 0.22 * lay, lw, smoothstep(0.0, 0.22, tau)), body);
lw *= 1.0 - 0.30 * onFloor * step(0.02, h0); fr = mix(0.06, 0.25, onFloor);
}
}
loc.y += uTR.y * sin(uTime * 0.45 + loc.x * 2.1) * (1.0 - smoothstep(0.0, 0.02, gtH.z));
p = vec3(loc.x, X.z, 0.0) + rotX(vec3(0.0, loc.y, loc.z), uTP.x);
nb = vec4(rotX(n, uTP.x) * lw, fr);
gFlex = 0.18;
}
uniform vec4 uKC[3]; uniform vec4 uKH, uKP, uKQ, uKB, uKF;
void shBasket(vec4 s, float t, out vec3 p, out vec4 nb) {
float kf = s.x * 3.0, k = min(floor(kf), 2.0), u = kf - k, lay = max(s.y, 0.0);
int ki = int(k);
vec4 C = uKC[ki];
float tip = uKP.x, N = uKP.y, A = uKP.z, sl = uKP.w, R = C.z;
float Hn = max(C.y - C.w, 0.0) / cos(tip), Hf = max(uKH[ki], 0.001);
float flip = ki == 1 ? -1.0 : 1.0;
float th, y, rr, lw, hoop = step(1.0 - uKQ.z, s.z);
if (fract(s.z * 7.31 + s.w * 3.77) > uKB.w) {
float bl = 0.22, al = u * (1.0 - bl) + bl * t, bx = mix(uKF.x, uKF.y, al), br = uKF.w;
float bth = bx * 21.0 + TAU * k / 3.0, ba = TAU * s.w + 2.0 * bth, tuck = 0.40 + 0.60 * smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.88, 1.0, t));
float brho = br * sqrt(lay) * tuck;
float bside = 1.12 * br * sin(bth) + brho * cos(ba), bdeep = 0.70 * br * sin(2.0 * bth) + brho * sin(ba);
p = vec3(bx, uKF.z + bside + 0.004 * sin(uTime * 0.4 + bx * 3.0), bdeep - 0.02);
float bover = 0.5 + 0.5 * sin(2.0 * bth), bskin = sqrt(lay) * tuck;
nb = vec4(normalize(vec3(0.0, cos(ba) + 0.35 * sin(bth), sin(ba) + 0.55)) * (0.42 + 0.58 * bskin) * (0.80 + 0.20 * bover), 0.10 + 0.22 * bskin * bover);
gBlue = 0.0; gHot = 0.0; gFlex = 0.2;
return;
}
if (hoop > 0.5) {
float row = floor(lay * 2.999);
th = TAU * (u + t) + flip * sl * 2.0;
y = -0.004 - 0.0125 * row;
rr = R + A * (1.7 + 0.25 * row);
lw = 1.0;
} else {
float fa = s.z / (1.0 - uKQ.z);
float wide = step(fa, uKB.z), sg = wide * 2.0 - 1.0;
float turns = mix(uKQ.y, uKQ.x, wide), wy = mix(0.26, uKQ.w, wide);
float yi = floor(u * N), lane = fract(u * N) - 0.5;
float tt = t * Hn / Hf;
float wav = 0.10 * sin(tt * 7.0 + TAU * s.w) + 0.25 * (fract(yi * 0.618 + 0.37 * k) - 0.5);
th = TAU * (yi + lane * wy * (1.0 + wav)) / N + flip * sg * (turns * TAU * tt + sl);
float ov = sg * cos(PI * N * (uKQ.x + uKQ.y) * tt + N * sl);
rr = R + A * ov + (lay - 0.5) * A * 0.9;
y = -Hn * (1.0 - t);
lw = 0.50 + 0.22 * lay + 0.28 * (0.5 + 0.5 * ov);
}
vec3 n = vec3(sin(th), 0.0, cos(th));
vec3 loc = vec3(rr * sin(th), y, rr * cos(th));
p = vec3(C.x, C.y, 0.0) + rotX(loc, tip);
vec3 nv = rotX(n, tip);
float back = smoothstep(0.10, -0.20, nv.z);
nv = normalize(mix(nv, vec3(-nv.x, 0.25, -nv.z), back));
nb = vec4(nv * lw * (1.0 - 0.22 * back), 0.0);
gBlue = hoop > 0.5 ? uKB.y * (0.25 + 0.75 * back) : uKB.x * back * exp(y / 0.05);
gHot = 0.0;
gFlex = 0.20;
}
uniform vec4 uOA, uOB, uOC, uOD;
void shCoil(vec4 s, float t, out vec3 p, out vec4 nb) {
float kf = s.x * 3.0, k = min(floor(kf), 2.0), u = kf - k, lay = sqrt(max(s.y, 0.0)), open = uOB.y;
float hs = fract(s.z * 5.17 + s.w * 3.31), cov = mix(0.72, uOD.z, open);
float ThC = TAU * (s.z + cov * t) + uOB.w;
float ThO = PI * 0.5 + (k - 1.0) * uOC.z + 2.0 * uOD.y * ((s.z - 0.5) * (1.0 - cov) + cov * (t - 0.5));
float Th = mix(ThC, ThO, open);
float lo = step(1.0 - uOD.w, hs);
float tuck = smoothstep(0.0, 0.09, t) * (1.0 - smoothstep(0.91, 1.0, t));
float inside = mix(0.30 + 0.70 * tuck, 1.0, open);
float wob = 0.10 * sin(Th * 3.0 + TAU * s.w) + 0.06 * sin(Th * 7.0 + TAU * hs);
float phi0 = TAU * (u * 2.0 + s.w);
float phi = phi0 + uOC.x * Th + 0.30 * sin(Th * 2.0 + TAU * s.z) + open * 2.6 * (Th - PI * 0.5 + 0.4 * (k - 1.0));
float sub = 0.5 + 0.5 * cos(phi0 * 4.0 + 1.3 * k);
float rho = uOA.w * lay * inside * (1.0 + wob + 0.08 * sub + 0.55 * lo * tuck * (0.5 + 0.5 * sin(Th * 2.3 + TAU * s.w))) * (1.0 - 0.30 * open);
float sv = uOC.y * (1.0 - 0.30 * open);
float Ra = uOA.z * (1.0 + open * (uOD.x - 1.0 + 0.06 * uOD.x * (k - 1.0)));
float Rr = Ra + 1.2 * rho * cos(phi);
vec3 loc = vec3(Rr * cos(Th), rho * sv * sin(phi) - open * uOB.z * (k - 1.0), Rr * sin(Th) - open * uOA.z * (uOD.x - 0.15));
vec2 ns = normalize(vec2(cos(phi) * sv, sin(phi) * 1.2));
vec3 n = vec3(ns.x * cos(Th), ns.y, ns.x * sin(Th));
p = vec3(uOA.xy, 0.0) + rotX(loc, uOB.x);
nb = vec4(rotX(n, uOB.x) * (0.46 + 0.54 * lay * inside * (0.62 + 0.38 * sub)), 0.10 + 0.15 * open);
float gd = (t - fract(uTime * 0.045 + s.w)) / 0.05;
gBlue = uOC.w * step(0.955, fract(hs * 7.0 + s.z)) * exp(-gd * gd);
gHot = 0.0;
gFlex = 0.22;
}`,qt=1/Math.tan(14*Math.PI/180);function Ot(s,c,n,l,p){s[c+"0"]=n,s[c+"1"]=l||n,s[c+"2"]=p||n}function fo(s,c){var n=ct.stair,l=Math.cos(n.tip),p=Math.sin(n.tip),v=s.uy(c.floor),g=c.n,x=[],S=[],M,R;for(M=0;M<3;M++){R=Math.min(M,g-1);var H=s.uy(c.tops[R]);x[M]=Math.max(0,qt*(H-v)/(qt*l+H*p)),S[M]=(qt-x[M]*p)/qt}var K=[],P=[];for(M=0;M<3;M++)K[M]=g>1?.52*Math.min(M,g-1)/(g-1):0,P[M]=M<g?s.sstep((c.f-K[M])/.48):0;var tt=x[0]*P[0],Q=tt+(x[1]-x[0])*P[1],At=Q+(x[2]-x[1])*P[2],Rt=[tt,Q,At],Tt=s.ux(c.right)*S[g-1],nt=s.ux(c.left),ht=[],yt=[99,99,99];for(M=0;M<3;M++)ht[M]=M<g?s.ux(c.risers[M])*(((M?S[M-1]:1)+S[M])/2):Tt+5;var Yt=nt+.35*(ht[0]-nt),N=[[0,Yt]],d=0,gt=Yt,Z;for(Z=0;Z<c.nodes.length;Z++)M=c.nodes[Z],yt[Z]=s.ux(c.mids[M])*S[M],N.push([K[M]+.48,yt[Z]]),c.f>=K[M]+.48-.001&&d++;for(Z=1;Z<N.length;Z++)c.f>=N[Z-1][0]&&(gt=s.lerp(N[Z-1][1],N[Z][1],s.clamp01((c.f-N[Z-1][0])/Math.max(1e-4,N[Z][0]-N[Z-1][0]))));c.f>=N[N.length-1][0]&&(gt+=.02);var Pt=Rt.map(function(Bt){var Ct=(v+Bt*l)*qt/(qt-Bt*p);return s.cssH/2-Ct*s.U});return{X:[nt,Tt,v,c.hd],E:[ht[0],ht[1],ht[2],gt],H:[tt,Q,At,.92+.08*Math.sin(1.7*s.time)],N:[yt[0],yt[1],yt[2],c.f>.001?1:0],tread:Pt,lit:d,n:g}}function jt(s,c,n){var l=ct.stair,p={};Ot(p,"uTX",c[0].X,c[1]&&c[1].X,c[2]&&c[2].X),Ot(p,"uTE",c[0].E,c[1]&&c[1].E,c[2]&&c[2].E),Ot(p,"uTH",c[0].H,c[1]&&c[1].H,c[2]&&c[2].H),Ot(p,"uTN",c[0].N,c[1]&&c[1].N,c[2]&&c[2].N),p.uTP=[l.tip,n?l.riserNarrow:l.riser,n?l.shoulderNarrow:l.shoulder,n?.6*l.cap:l.cap],p.uTQ=[l.warp,n?1:0,l.lean,n?.7*l.run:l.run],p.uTR=[l.fan,0,n?l.locksNarrow:l.locks,n?l.wiresNarrow:l.wires];var v=n?l.depthNarrow:l.depth,g=n?l.shoulderNarrow:l.shoulder;return p.uTL=[v/(2*v-g),0,0,0],p}function ro(s){var c=ct.stair,n=s.narrow(),l=s.box("#process .step-tag",!0),p=s.box("#process .step-body",!0),v,g=s.css?s.css("#process","--node"):NaN;if(g>=0||(g=n?c.nodeNarrow:c.node),l.length<3||p.length<3){if(p=s.box("#process .steps .step",!0),p.length<3){var x=s.box("#process .steps")||s.NONE;p=[0,1,2].map(function(H){return{cx:x.l+x.w*(1+2*H)/6,l:x.l+x.w*H/3,r:x.l+x.w*(H+1)/3,t:x.t,b:x.b,w:x.w/3.2}})}l=p.map(function(H,K){var P=H.t-(14+22*K)-g;return{cx:n?H.l+H.w*(.2+.17*K):H.cx,b:P,t:P-20,w:n?H.w*.5:H.w*.62}})}var S={nar:n,node:g,steps:[],top:1e9,last:-1e9};for(v=0;v<3;v++){var M=l[v],R=M.b+g;S.steps.push({x:M.cx,w:M.w,top:M.t,y:R,card:p[v],lift:p[v].t-R}),S.top=Math.min(S.top,M.t),S.last=Math.max(S.last,M.b)}return S}function Qo(s,c){var n=ct.stair,l;if(c=c||ro(s),l=c.steps,c.nar)return{left:l[0].card.l-24,right:l[0].card.r+24,floor:l[0].card.t+n.floorUnderNarrow,hd:n.depthNarrow,tip:n.tip,r0:l[0].card.l};var p=l[0].x-.72*l[0].w;return{left:p-n.skirt*s.cssW,right:l[2].x+.66*l[0].w,floor:l[0].card.t+n.floorUnder,hd:n.depth,tip:n.tip,r0:p}}function Wo(s){var c=ct.stair,n=ro(s),l=n.nar,p=n.steps,v=s.cssH,g,x,S,M;if(l){var R=p[0].lift,H=p[1].lift-R,K=p[1].x-p[0].x;for(K>8||(K=.5*p[0].w),K=Math.max(44,Math.min(90,K)),H>2||(H=16),g=[],S=0,M=[],x=0;x<3;x++){var P=p[x],tt=P.card,Q=.36*P.w,At=[],Rt=[],Tt=[],nt;for(nt=0;nt<=x;nt++)At[nt]=tt.t-R-nt*H,Tt[nt]=P.x-Q-(x-nt)*K,Rt[nt]=nt===x?P.x:Tt[nt]+K/2;var ht=s.clamp01((.9*v-(P.top-20))/(.5*v)),yt=fo(s,{floor:tt.t+c.floorUnderNarrow,tops:At,mids:Rt,risers:Tt,right:P.x+Q,left:Math.max(-24,Tt[0]-64),hd:c.depthNarrow,f:ht,n:x+1,nodes:[x]});g.push(yt),M[x]=yt.tread[x],yt.lit&&S===x&&(S=x+1)}}else{var Yt=p[0].w,N=Qo(s,n),d=s.clamp01((.9*v-(n.top-20))/(.5*v)),gt=c.depth*s.U*Math.sin(c.tip),Z=Math.min(.16*v,2*gt+.035*v),Pt=fo(s,{floor:Math.min(N.floor,v-Z+gt),tops:p.map(function(Vt){return Vt.y}),mids:p.map(function(Vt){return Vt.x}),risers:[N.r0,(p[0].x+p[1].x)/2-.1*Yt,(p[1].x+p[2].x)/2-.1*Yt],right:N.right,left:N.left,hd:c.depth,f:d,n:3,nodes:[0,1,2]});g=[Pt],S=Pt.lit,M=Pt.tread}var Bt=Math.max(p[0].card.t,p[2].card.t),Ct=c.look;if(l){Ct={};for(var Jo in c.look)Ct[Jo]=c.look[Jo];Ct.share=c.shareNarrow}return{shape:"stair",u:jt(s,g,l),look:s.look(Ct),treads:M,lit:S,open:l?1:s.open(n.top-20,Bt+110)}}function xe(s){var c=ct.pass,n=s.narrow(),l=s.cssW,p,v;if(n){var g=Wo(s),x=ro(s).steps[2].card;return{shape:"stair",u:g.u,look:g.look,open:s.open(x.t,x.t+.3*s.cssH)}}var S=[s.ux(l*(.5-c.halfWidth)),s.ux(l*(.5+c.halfWidth)),s.uy(s.cssH*c.foot),c.depth],M={X:S,E:[S[0]+.6,S[0]+1.3,S[0]+2,S[0]],H:[0,0,0,0],N:[99,99,99,0]},R=jt(s,[M],n),H=c.look,K=1;R.uTR[1]=.004;var P=s.sstep(s.clamp01(-ro(s).last/(.6*s.cssH)));if(P<1){var tt=Wo(s),Q={},At={};for(p in R)for(Q[p]=[],v=0;v<4;v++)Q[p][v]=s.lerp(tt.u[p][v],R[p][v],P);for(p in H)At[p]=s.lerp(ct.stair.look[p],H[p],P);R=Q,H=At}return{shape:"stair",u:R,look:s.look(H),open:K}}function $o(s){for(var c=ct.columns,n=s.narrow(),l=s.cssH,p=s.box("#pricing .sec-head")||s.NONE,v=s.box("#pricing .plan",!0),g=s.box("#pricing .plan--pick",!0)[0];v.length<3;)v.push(v[v.length-1]||s.NONE);for(var x=s.ease("b.badge",g&&Math.abs(g.cx-v[1].cx)<6?1:0,.4),S=1,M=n?Math.max(8,Math.min(60,v[1].t-v[0].b)):0,R=n?Math.asin(Math.min(Math.sin(c.tip),c.ovalGap*M/(c.radiusNarrow*v[0].w))):c.tip,H={uKP:[R,c.yarns,c.relief,c.slide*s.time],uKQ:[c.turnsWide,c.turnsNarrow,c.hoops,c.wideWidth],uKB:[c.blueWall,c.blueHoop*(.92+.08*Math.sin(1.3*s.time)),c.wide,n?1:c.share]},K=[0,0,0,0],P=0;P<3;P++){var tt=v[P],Q=(n?c.radiusNarrow:c.radius)*tt.w,At=n?tt.t-c.rimGap*M:p.t-(c.rim+(P===1?(c.rimPick-c.rim)*x:0))*l,Rt=n?tt.t+Math.min(.8*tt.h,c.footNarrow):tt.t+c.foot,Tt=Rt-At;n||(Rt=Math.min(Rt,.985*l));var nt=n?1:s.clamp01((.95*l-tt.t)/(c.riseOver*l));S=Math.min(S,nt);var ht=Rt-Math.max(.1*Tt,s.sstep(nt)*Math.max(0,Rt-At));H["uKC"+P]=[s.ux(tt.cx),s.uy(ht),s.ul(Q),s.uy(Rt)],K[P]=s.ul(Tt)/Math.cos(R)}H.uKH=K;var yt=n?v[0].t-c.rimGap*M:p.t-c.rim*l,Yt=(n?c.radiusNarrow:c.radius)*v[2].w,N=c.look;if(n){N={};for(var d in c.look)N[d]=c.look[d];N.share=c.share}return H.uKF=[s.ux(n?v[0].l-10:Ut(s,p.l)-6),s.ux(v[2].cx+Yt),s.uy(v[0].t+c.band),s.ul(c.bandPly)],{shape:"basket",u:H,look:s.look(N),open:n?1:s.open(yt,v[0].t+c.foot+70)}}function co(s,c,n,l,p,v,g){var x=ct.arcs,S=ct.ring,M=Math.max(x.factor,.86*s.cssW/(.94*l*Math.sin(x.reach)));return{uOA:[s.ux(c),s.uy(n),s.ul(l),s.ul(p*l)],uOB:[v,g,x.apart,.3+S.turn*s.time],uOC:[S.twist,S.section,x.fanOut,S.glint],uOD:[M,x.reach,x.cover,S.loose]}}function Zo(s){var c=ct.arcs,n=s.box("#faq .faq")||s.NONE,l=s.box("#faq .faq .qa",!0),p=s.box("#faq .faq summary",!0),v=0,g;for(g=0;g<p.length;g++)v+=p[g].h;for(g=1;g<l.length;g++)v+=Math.max(0,l[g].t-l[g-1].b);v||(v=n.h);var x=Math.min(c.radius[0]*s.cssW,c.radius[1]*s.cssH),S=n.t+.62*Math.min(v,.55*s.cssH),M=s.narrow();return M||(S=Math.min(S,s.cssH*(1-c.wait)+.22*x)),M?{shape:"coil",u:co(s,s.cssW/2,S,x,c.rope,c.tip,1),look:s.look(c.look),open:s.open(S-.3*x,S+.45*x,S-.34*x-.3*s.cssH,S+.05*x)}:{shape:"coil",u:co(s,s.cssW/2,S,x,c.rope,c.tip,1),look:s.look(c.look),open:Math.max(s.open(S-.3*x,S+.45*x),s.sstep(s.clamp01((s.q-10)/.25)))}}function ge(s){var c=ct.ring,n=s.box("#start .start-side")||s.NONE,l=s.box("#start .form-wrap")||n,p=s.narrow(),v=Math.min((p?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),g=Math.max(n.b,l.b)+c.below*s.cssH;if(p||(g=Math.min(g,s.cssH*(1-c.wait)+.4*v)),p){var x=s.open(null,null,g-.46*v-.3*s.cssH,g),S=x<1?Zo(s):null;if(S&&(x<=0||S.open>.001))return S;var M={},R=s.sstep(x),H;for(H in c.look)M[H]=s.lerp(ct.arcs.look[H],c.look[H],R);return{shape:"coil",u:co(s,s.cssW/2,g,v,c.rope,c.tip,0),look:s.look(M),open:x}}return{shape:"coil",u:co(s,s.cssW/2,g,v,c.rope,c.tip,0),look:s.look(c.look),open:1}}function Ut(s,c){return s.narrow()?Math.max(9,.5*c):Math.max(30,.5*c)}function Eo(s){var c=s.box("#process .sec-head")||s.NONE,n=ro(s),l=n.steps[0].card,p=Ut(s,c.l);return[[p,Math.min(n.top,c.t)-60,-.03],[p,l.t+10,0],[p,l.b,-.03]]}function Ro(s){var c=s.box("#proof .pf-stage")||s.NONE,n=s.box("#process .sec-head")||s.NONE;return[[Ut(s,n.l),c.t+.5*c.h,-.03]]}function Po(s){var c=s.box("#pricing .sec-head")||s.NONE,n=s.box("#pricing .plan",!0),l=n[0]||s.NONE,p=Ut(s,c.l),v=l.b,g;for(g=1;g<n.length;g++)v=Math.max(v,n[g].b);return[[p,c.t-40,-.03],[p,l.t+ct.columns.foot,0],[p,v,-.03]]}function No(s){var c=s.box("#faq .sec-head")||s.NONE,n=s.box("#faq .faq")||s.NONE,l=Ut(s,c.l);return[[l,c.t,-.03],[l,n.b,-.03]]}function Ho(s){var c=ct.ring,n=ct.foot,l=s.box("#start .start-side")||s.NONE,p=s.box("#start .form-wrap")||l,v=s.box("footer.foot")||s.NONE,g=s.narrow(),x=Ut(s,l.l),S=s.sstep(s.clamp01(s.q-11)),M=Math.min((g?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),R=Math.max(l.b,p.b)+c.below*s.cssH,H=Math.min((g?n.radiusNarrow:n.radius[0])*s.cssW,n.radius[1]*s.cssH),K=v.t-n.above*s.cssH;g||(R=Math.min(R,s.cssH*(1-c.wait)+.4*M));var P=s.lerp(M,H,S),tt=s.lerp(R,K,S),Q=tt-.246*P*Math.sin(s.lerp(c.tip,n.tip,S))/Math.sin(.42);return[[x,l.t,-.03],[x,Math.min(l.b+10,Q-.34*s.cssH),-.03],[s.cssW/2-.8*P,Q,-.6*P*Math.cos(s.lerp(c.tip,n.tip,S))/s.U]]}function we(s){var c=ct.foot,n=s.box("footer.foot")||s.NONE,l=s.narrow(),p=Math.min((l?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),v=n.t-c.above*s.cssH;return{shape:"coil",u:co(s,s.cssW/2,v,p,ct.ring.rope,c.tip,0),look:s.look(c.look)}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"b",glsl:u,shapes:{stair:"shStair",basket:"shBasket",coil:"shCoil"},stations:{7:Wo,8:xe,9:$o,10:Zo,11:ge,12:we},ways:{7:Eo,8:Ro,9:Po,10:No,11:Ho},conf:ct,levels:ro,foot7:Qo})})(),(function(){"use strict";if(window.__scene)return;var ct=/[?&]scene-nosort\b/.test(location.search),u={tiers:[{strands:2200,segments:80,points:1200,dprCap:2,pixelCap:9e6},{strands:1e3,segments:52,points:700,dprCap:2,pixelCap:3e6},{strands:520,segments:40,points:400,dprCap:1.5,pixelCap:2e6}],maxStrands:2600,fit:{aspect:16/9,narrow:1.5},width:.0076,minPx:1.35,widthLod:[.85,1.3],hang:{root:[-.1,.33],leave:[224,236],tip:[186,292],tipCurve:.4,trunk:[1.49,.76,.2],reach:[.86,.6,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,minScale:.62,rest:[204,.68,.25,8,.9]},hangUp:{root:[.34,0],leave:[192,204],tip:[176,268],tipCurve:.55,trunk:[1.3,.8,.16],reach:[.86,.62,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,rest:[186,.7,.25,5,.92],under:16,wide:.34,least:.36,most:.62,upTo:1024},body:{wrap:3.4,wrapVar:1.7,treadTwist:.55,tuftCount:47,wires:89,squash:1,lip:.24,ringZ:.88,spin:.1},swirl:{leave:74,end:118,stagger:.12,settle:1.3,gate:[.42,.5]},track:{open:[[.08,0],[.2,.16],[.306,.6],[.36,.88],[.43,1]],loosen:[[0,0],[.1,.25],[.2,.5],[.32,1]],count:[[0,400],[.2,430],[.42,520],[.52,1300],[.62,2200]],thick:[[0,1.25],[.42,1.25],[.52,1],[.64,.72],[.84,.86]],gain:[[0,.86],[.45,.86],[.62,1],[.84,.9]],skin:[[.55,.88],[.66,.935],[.84,.955]],skinW:[[.55,.12],[.7,.06],[.84,.035]],bloom:[[.7,0],[.86,1]],tufts:[[.56,.45],[.84,.1]],wires:[[.62,0],[.8,1]],deep:[[.62,.16],[.84,.07]],yaw:[[0,0],[.45,4],[.63,-9],[.84,9]],pitch:[[0,0],[.45,-3],[.63,7],[.84,-5]],cx:[[.2,.1],[.42,.04],[.586,-.01],[.82,0]],cy:[[.2,.1],[.42,.11],[.586,.085],[.65,.02],[.72,0],[.84,.03]],phase:[[.2,0],[.45,.5],[1,2.3]],hole:[[.2,.42],[.42,.39],[.5,.31],[.54,.28],[.586,.2]],arm:[[.2,1.85],[.36,1.85],[.42,1.95],[.5,1.4],[.54,1.02],[.586,.68]],rim:[[.2,0],[.3,1],[.56,1],[.66,0]],disc:[[.2,.5],[.42,.24],[.586,.14]],wind:[[.48,0],[.586,.18],[.665,1]],radius:[[.46,.4],[.586,.36],[.64,.34],[.72,.26],[.84,.2]],tube:[[.46,.08],[.586,.15],[.64,.19],[.82,.19]],twist:[[.46,2.4],[.64,2.9],[.82,3.3]],loose:[[.46,1],[.62,.85],[.72,.35],[.82,0]],flare:[[.46,.5],[.586,.28],[.64,.1],[.76,.04]],sphere:[[.64,0],[.8,1]],ball:[[.64,.53],[.7,.47],[.76,.41],[.84,.365]],mouth:[[.64,.15],[.7,.12],[.76,.086],[.84,.072]],core:[[.64,0],[.82,1]],wash:[[.2,0],[.42,.06],[.56,.16],[.635,.8],[.72,.62],[.78,.3],[.84,0]],tips:[[0,1],[.52,1],[.64,.5],[.74,0]],points:[[0,.85],[.3,1],[.66,1],[.84,.32]],pointSize:[[0,1],[.3,1.15],[.64,.9],[.84,.7]],turn:[[.2,0],[.5,.5],[.8,1]],floorX:[[0,.78],[.3,.35],[.45,0]],floorY:[[0,-.71],[.3,-.92],[.586,-.93],[.7,-.86],[.84,-.8]],floorW:[[0,.95],[.3,1.3],[.586,.85],[.7,.55],[.84,.42]],shadow:[[0,1],[.3,.45],[.5,.5],[.586,.8],[.82,1]],pool:[[0,.9],[.3,.5],[.586,.9],[.66,1],[.84,.1]]},alive:{viewSway:[1.6,1.1],viewRate:[.21,.17],bob:.014,bobRate:.55,travel:.022,sparkle:.9},calmTime:2.5,pointer:{radius:.34,fingerRadius:.42,aside:.1,gather:.55,turn:[13,9],follow:[.2,.045],rise:.1,fall:.035,pulse:1.5,pulseWidth:.075,eye:[.36,.6,0]},exposure:.76,light:{key:.28,strips:4.8,fill:.45,room:.08,glint:.8,arms:[.25,.75,.45,.15],armSide:.3},shade:{formFloor:.16,back:.6,strandVar:.25,darkShare:.05,open:.42},blue:[.02,.22,1],blueAmt:{tint:1,light:.85,sheen:.2,hot:2.4,reach:1.7,lean:.75,glare:.24,kick:.06,ring:1,points:1,haze:[.72,.2],bloom:.34,tipWash:.55},pulse:{rate:1.7,wave:.16},floor:{shadow:.3,pool:.3},smooth:.16,slowMs:40,warmup:20,window:40,cooldown:60,fastMs:22,calm:480,retries:2,stillRetryMs:2e4,idleEvery:2,lostWaitMs:4e3};u.hero="header.hero",u.stage=".stage",u.secs=[null,null,"#studio","#services","#film","#work","#focus","#process","#proof","#pricing","#faq","#start","footer.foot"],u.names=["hero","ball","loop","fan","arcs","weave","ground","stair","pass","columns","lowarcs","ring","foot"],u.seam={from:1,to:.35,least:.3},u.page={viewSway:[1.2,.9],scale:.4},u.look={thick:1,gain:1,share:1,points:.5,pointSize:1,tips:0,stag:.4,lift:.1,yaw:0,pitch:0,deep:.3,skin:.8,skinW:.12,back:.75},u.pagePoints=[700,400,220],u.ringOut=3,u.via={7:{at:.55,direct:!0,stagger:.35}},u.rope={grid:[-.2,1.2],pad:.06,least:.62,len:.16,ply:.034,plyLeast:.011,swing:1.12,depth:.7,period:210,twist:2,soft:.75,pass:{stagger:.08,join:.46},aside:.8,slide:.2,sway:.006},u.cutBy={},u.passBy={4:{join:.4},9:{direct:!0,span:[.25,.92],stagger:.45},10:{join:.34}},u.passNarrow={9:{join:.4}},u.clear={pad:20,soft:16,dark:.33,heroFrom:.02,heroUntil:.08,heroPad:-8,heroSoft:8},u.edge={hero:0,page:0},u.sortStrands=!ct,u.fadeInMs=500,u.idleAfterMs=2e4,u.gpu={every:12,behind:2,of:[3,4],cool:4,px:[1,.84,.7],calmMs:12e3,giveUp:6,afterDrawn:45},u.warm={quietMs:350,giveUpMs:8e3},u.groups=[1,3,4,5,7,9,12],u.groupFadeMs=450,u.hoverS=.3,u.proof={sel:"#proof .pf-stage",melt:104,cover:.85,whole:!0},u.sleepUnderMenu=!0,u.jump={windows:1,stations:1.5},u.carry={extra:800,back:100,step:96,slow:.3,near:100,pixels:1.5,dpr:1.5,heroPass:.5,lead:160},u.stills={"hero-a":0,"hero-b":.306,"hero-c":.586,"hero-d":1,studio:2,services:3,partner:4,websites:5,difference:6,process:7,pricing:9,faq:10,start:11,footer:12};var qt=28,Ot=1/Math.tan(qt*Math.PI/360),fo=`
uniform float uTime, uShare, uRidge;
uniform vec4 uHg;
uniform vec4 uHg2;
uniform vec4 uHg3;
uniform vec4 uHg4;
uniform vec3 uHg5;
uniform vec4 uOp;
uniform vec4 uOp2;
uniform vec4 uOp3;
uniform vec4 uVx, uVx2, uVx3, uVx4;
uniform vec4 uVxC;
uniform vec4 uW0, uW1, uW2, uW3, uWC, uWR, uWB;
uniform int uShA, uShB;
uniform float uMix, uStag, uLift;
uniform vec4 uHand;
uniform vec4 uHand2;
const float TAU = 6.28318530718;
const float PI = 3.14159265359;
float gSel, gFlex, gBlue, gHot, gThin;
float gKeep;
float gKnot;
float gOwn, gHandIn, gHandM, gShow;
uniform float uFold;
uniform float uFlow;
float gBody, gHandW;
vec3 gLoc;
vec4 gVx, gVx2, gVx3, gVx4, gVxC; float gRidge, gAngle;
vec2 gTail;
float ease(float x) { x = clamp(x, 0.0, 1.0); return x * x * (3.0 - 2.0 * x); }
vec3 rotX(vec3 v, float a) { float c = cos(a), s = sin(a); return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c); }
vec3 rotY(vec3 v, float a) { float c = cos(a), s = sin(a); return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c); }
float pick(vec4 s) { return fract(s.z * 7.31 + s.w * 3.77); }
float place(vec4 s) { float a = TAU * s.x; return a + gVx3.z * sin(a * gVx3.w + 1.7) / gVx3.w + gAngle; }`,jt=`
void shOpen(vec4 s, float t, out vec3 p, out vec4 nb) {
float f = s.x, lay = max(s.y, 0.0), hs = uHg.z, loose = uHg.w, j1 = s.z, j2 = s.w;
float m = ease(uOp.x * (1.0 + uOp.y) - uOp.y * fract(j2 * 5.3 + j1 * 2.1));
float mid = 4.0 * f * (1.0 - f);
float sway = uHg2.x * (0.55 * sin(uTime * 0.41 - f * 3.4) + 0.30 * sin(uTime * 0.67 + TAU * j1) + 0.25 * sin(uTime * 1.07 + TAU * j2 + f * 5.0));
float kap = mix(uOp3.x, 1.0 / uOp.z, m), arc = mix(uOp3.y, TAU * uOp.z, m), rho = 1.0 / kap;
float lead0 = uOp2.x * m;
float bm = mix(uOp3.z, uOp2.w + PI + uOp2.x, m) - lead0;
float a = TAU * f;
float beta = bm + (f - 0.5) * arc * kap + m * uVx3.z * sin(a * uVx3.w + 1.7) / uVx3.w;
vec2 M = mix(uHg.xy, uVxC.xy - uOp.z * vec2(cos(uOp2.w), sin(uOp2.w)), pow(m, uOp3.w));
vec2 Hc = M - rho * vec2(cos(bm), sin(bm));
float a0 = beta + lead0 + (lay - 0.5) * 0.12;
float zh = (lay - 0.5) * uHg3.z * hs, zs = (s.y - 0.5) * uOp2.z, zz = mix(zh, zs, m);
vec3 P0 = vec3(Hc + rho * (1.0 + m * (0.24 * lay * j2 - 0.06)) * vec2(cos(beta), sin(beta))
+ vec2(cos(a0), sin(a0)) * ((j2 - 0.5) * 0.3 * hs * (1.0 - m)), mix(zh * 0.5, uVxC.z + zs * 0.35, m));
float betaH = uOp3.z + (f - 0.5) * uOp3.y * uOp3.x;
float tipH = mix(uHg3.x, uHg3.y, pow(f, uHg3.w)) - betaH + (fract(j1 * 3.7 + j2) - 0.5) * (0.36 + 0.60 * loose) + sway * (1.0 + loose);
float tipS = uOp2.y + (j1 - 0.5) * 0.30 + 0.034 * sin(uTime * 0.40 + 2.0 * a) + 0.018 * sin(uTime * 0.71 + TAU * j1);
float a1 = beta + mix(tipH, tipS, m);
float l1 = mix(hs * (mix(uHg4.x, uHg4.y, f) + uHg5.x * mid) * (0.90 + 0.20 * j2), uOp.w * 0.44 * (0.90 + 0.20 * j2), m);
float l2 = mix(hs * (mix(uHg4.z, uHg4.w, f) + uHg5.y * mid) * (0.50 + 0.50 * sqrt(j1)) * (1.0 + 0.30 * loose), uOp.w * 0.56 * (0.58 + 0.42 * j1), m);
vec3 P1 = P0 + vec3(cos(a0), sin(a0), 0.0) * l1 + vec3(0.0, 0.0, zz * 0.3);
vec3 P2 = P1 + vec3(cos(a1), sin(a1), 0.0) * l2
+ vec3(0.0, 0.0, zz * 0.4 + (j2 - 0.5) * 0.25 * loose * hs * (1.0 - m) + 0.05 * m * sin(uTime * 0.63 + TAU * j2 + beta));
float u = 1.0 - t;
p = u * u * P0 + 2.0 * u * t * P1 + t * t * P2;
float am = 0.5 * (a0 + a1), len = l1 + l2, bend = uHg5.z * (1.0 + 1.5 * sin(PI * m));
p.xy += vec2(-sin(am), cos(am)) * (len * (bend * (j2 - 0.5) * sin(PI * t) + (0.3 * bend * (fract(j1 * 5.1) - 0.5) + 0.045 * m) * sin(TAU * t))
+ 0.012 * t * sin(t * 9.0 + TAU * j1 - uTime * 0.8));
vec2 sec = vec2((0.5 - f) * 2.0, (lay - 0.5) * 2.0);
float skin = clamp(0.55 + 0.5 * max(abs(sec.x), abs(sec.y)), 0.0, 1.0);
float own = fract(j2 * 9.7 + j1 * 4.3);
float free = smoothstep(0.10, 0.55, t) * (0.30 + 0.70 * own);
nb = mix(vec4(normalize(vec3(-sec.x * 0.6, 0.0, sec.y + 0.35)) * skin, free), vec4(0.0, 0.0, 0.62 + 0.38 * own, 0.25 + 0.75 * own * own), m);
gFlex = mix(smoothstep(0.08, 0.85, t), 0.25 + 0.75 * t, m);
gSel = m;
}
float smin(float a, float b, float k, out float h) { h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
void shWound(vec4 s, float t, out vec3 cy, out vec4 nb) {
float sph = gVx4.y;
float layer = mix(max(s.y, 0.0), 1.0 - abs(2.0 * fract(s.x * gVx2.w + 0.30 * (s.z - 0.5)) - 1.0), gRidge);
float lim = 1.0 - gVx2.y;
float loose = smoothstep(lim - 0.02, lim + 0.02, s.w);
float tailD = place(s) + 0.90 * gVx.x - gTail.x; tailD -= TAU * floor(tailD / TAU + 0.5);
loose *= gTail.y > 0.0 ? 1.0 - smoothstep(0.55 * gTail.y, gTail.y, abs(tailD)) : 1.0;
float lay = 0.40 + 0.60 * layer;
float psiEnd = mix(gVx2.z + gVx3.y * s.z, 2.35 + 0.55 * s.z, loose);
float pe = (psiEnd + 0.55) * pow(t, 0.9);
float psi = pe - 0.55;
float th = place(s) + gVx.x * pow(min(pe, 3.69) / 3.69, 0.72) * (1.0 + 0.16 * (s.w - 0.5) * (1.0 - 0.92 * gRidge)) + gVx3.x * max(0.0, pe - 3.69)
+ 0.012 * sin(t * 23.0 + TAU * s.z * 5.0);
float fl = smoothstep(0.56, 1.0, t); fl *= fl * loose;
lay = mix(lay, 1.0, fl);
float cp = cos(psi), sp = sin(psi), rc = gVx.y, hw;
float wall = min((rc - gVx4.w) / max(cp, 0.04), 4.0);
float dome = rc * cp + sqrt(max(gVx4.z * gVx4.z - rc * rc * sp * sp, 0.0));
float aS = smin(wall, dome, gVxC.w, hw);
float a = mix(gVx.z, aS, sph) * lay * (1.0 + 0.035 * (1.0 - sph) * sin(t * 17.0 + TAU * s.w * 3.0));
float reach = gVx2.x * fl * (0.5 + 0.6 * s.z);
float r = rc - a * cp + reach;
float z = a * gVx.w * sp + reach * (s.y - 0.30) * 0.5;
vec2 nS = normalize(mix(vec2(r, z) / max(gVx4.z, 0.01), vec2(-1.0, 0.0), hw) + vec2(1e-5, 0.0));
vec2 n2 = normalize(mix(vec2(-cp, sp), nS, sph) + vec2(1e-5, 0.0));
cy = vec3(r * (1.0 + 0.010 * sin(uTime * 0.9 + TAU * s.z)), th, z);
nb = vec4(lay * vec3(n2.x * cos(th), n2.x * sin(th), n2.y), fl);
gFlex = mix(0.20, 0.035, sph) + 0.60 * fl;
}
void heroCurve(vec4 s, float t, out vec3 p, out vec4 nb) {
gVx = uVx; gVx2 = uVx2; gVx3 = uVx3; gVx4 = uVx4; gVxC = uVxC; gRidge = uRidge; gAngle = uOp2.w; gTail = vec2(0.0);
float wind = uVx4.x;
if (wind <= 0.0) { shOpen(s, t, p, nb); gLoc = p - uVxC.xyz; return; }
vec3 cy; float fw;
shWound(s, t, cy, nb); fw = gFlex;
if (wind < 1.0) {
vec3 po; vec4 no;
shOpen(s, t, po, no);
vec2 d = po.xy - uVxC.xy;
float base = TAU * s.x + uOp2.w + 0.9;
float th = atan(d.y, d.x) - base; th -= TAU * floor(th / TAU + 0.5);
cy = mix(vec3(length(d), th + base, po.z - uVxC.z), cy, wind);
nb = mix(no, nb, wind); gFlex = mix(gFlex, fw, wind);
}
p = vec3(cy.x * cos(cy.y), cy.x * sin(cy.y), cy.z) + uVxC.xyz;
gLoc = p - uVxC.xyz;
gSel = 1.0;
}
void shBody(vec4 s, float t, out vec3 p, out vec4 nb) {
gVx = uW0; gVx2 = uW1; gVx3 = uW2; gVx4 = vec4(1.0, uW3.x, uW3.y, uW3.z); gVxC = vec4(uWC.xyz, uW3.w); gRidge = uWC.w; gAngle = uWR.z; gTail = vec2(uWR.w, uWB.w);
vec3 cy;
shWound(s, t, cy, nb);
gHot = uWB.w > 0.0 ? 0.8 * nb.w * smoothstep(0.972, 0.992, t) : 0.0;
vec3 loc = vec3(cy.x * cos(cy.y), cy.x * sin(cy.y), cy.z);
gLoc = loc;
p = rotX(rotY(loc, uWR.x), uWR.y) + uWC.xyz;
nb.xyz = rotX(rotY(nb.xyz, uWR.x), uWR.y);
gSel = 1.0;
}`,ro=`
void curve(vec4 s, float t, out vec3 p, out vec4 nb) {
gHandW = 1.0; gKeep = 1.0; gOwn = 0.0; gHandIn = 0.0; gHandM = 1.0;
shape(uShA, s, t, p, nb);
}
float strandOn(vec4 s) { return 1.0 - smoothstep(uShare - 0.03, uShare + 0.03, pick(s)); }`,Qo=`
uniform vec4 uRp[8];
uniform vec4 uRpA;
uniform vec4 uRpY;
uniform vec4 uRpK;
uniform vec4 uRpS;
uniform vec4 uRpM;
uniform vec4 uRpC;
uniform vec4 uRpT;
uniform float uRpSoft;
float gLie;`,Wo=`
float ropeHome(vec4 s) { float k = min(floor(s.x * 3.0), 2.0); return (s.x * 3.0 - k) * (1.0 - uRpY.z); }
void shRope(vec4 s, float t, float vb, out vec3 p, out vec4 nb) {
float k = min(floor(s.x * 3.0), 2.0), lay = clamp(s.y, 0.0, 1.0), len = uRpY.z;
float v = vb + len * t;
float y = mix(uRpY.x, uRpY.y, v);
float f = clamp((y - uRpA.x) / (uRpA.y - uRpA.x), 0.0, 1.0) * 7.0, fi = min(floor(f), 6.0), u = f - fi;
int i = int(fi);
vec4 p0 = uRp[max(i - 1, 0)], p1 = uRp[i], p2 = uRp[i + 1], p3 = uRp[min(i + 2, 7)];
vec4 cb = 0.5 * (p2 - p0), cc = p0 - 2.5 * p1 + 2.0 * p2 - 0.5 * p3, cd = 1.5 * (p1 - p2) + 0.5 * (p3 - p0);
vec4 ax = p1 + u * (cb + u * (cc + u * cd));
float dxdy = (cb.x + u * (2.0 * cc.x + 3.0 * u * cd.x)) * 7.0 / (uRpA.y - uRpA.x);
vec2 tg = normalize(vec2(dxdy, 1.0)), nr = vec2(tg.y, -tg.x);
float rad = ax.z, th = uRpK.x + uRpK.y * y + TAU * k / 3.0;
float tuck = 0.40 + 0.60 * smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.88, 1.0, t));
float a = TAU * s.w + uRpK.z * th + 0.6 * sin(th * 0.5 + TAU * s.z);
float rho = rad * sqrt(lay) * tuck * (0.86 + 0.14 * sin(y * 9.0 + TAU * s.z));
float side = uRpA.z * rad * sin(th) + rho * cos(a);
float deep = uRpA.w * rad * sin(2.0 * th) + rho * sin(a);
float sway = uRpK.w * (sin(uTime * 0.37 + y * 1.9) + 0.5 * sin(uTime * 0.61 + y * 3.7 + 1.3));
p = vec3(ax.x + nr.x * side + sway, y + nr.y * side, ax.y + deep);
float over = 0.5 + 0.5 * sin(2.0 * th);
float skin = sqrt(lay) * tuck;
nb = vec4(normalize(vec3(nr * (cos(a) + 0.35 * sin(th)), sin(a) + 0.55)) * (0.42 + 0.58 * skin) * (0.80 + 0.20 * over), 0.10 + 0.22 * skin * over);
}
float inRopeOf(vec4 s, bool second, float g) {
float k = min(floor(s.x * 3.0), 2.0), o = s.x * 3.0 - k, soft = uRpSoft;
float share = second ? uRpS.y : uRpS.x, open = second ? uRpS.w : uRpS.z, pk = pick(s);
vec2 knot = second ? uRpC.zw : uRpC.xy;
if (pk < knot.x) return max(g, 1.0 - knot.y);
if (!second && uRpT.x > 0.0) {
float lo = min(share, uRpT.w), hi = max(share, uRpT.w), u = clamp((hi - pk) / max(hi - lo, 1e-5), 0.0, 1.0);
float w = share > uRpT.w ? smoothstep(u * 0.4, u * 0.4 + 0.6, uRpT.x) : 1.0 - smoothstep((1.0 - u) * 0.4, (1.0 - u) * 0.4 + 0.6, uRpT.x);
g = max(g, pk <= lo ? 0.0 : (pk >= hi ? 1.0 : w));
} else g = max(g, step(share, pk));
g = max(g, smoothstep(o * (1.0 - soft), o * (1.0 - soft) + soft, 1.0 - open));
return g;
}
void lie(vec4 s, float t, bool second, float g, out vec3 p, out vec4 nb) {
bool all = g > 0.9995;
float vb = ropeHome(s), z = 1.0;
gLie = 0.0;
if (all) { gBlue = 0.0; gHot = 0.0; gFlex = 0.45; gSel = 1.0; gThin = 1.0; gShow = 1.0; gBody = 0.0; gKnot = 0.0; gLoc = vec3(0.0); p = vec3(0.0); nb = vec4(0.0); }
else {
shape(second ? uShB : uShA, s, t, p, nb);
if (g < 0.0005) return;
float len = uRpY.z;
z = clamp(g / uRpT.y, 0.0, 1.0); z = 1.0 - pow(1.0 - z, 1.5);
float beside = clamp((p.y - uRpY.x) / (uRpY.y - uRpY.x), 0.5 * len, 1.0 - 0.5 * len) - 0.5 * len;
vb = mix(beside, vb, clamp((g - uRpT.z) / (1.0 - uRpT.z), 0.0, 1.0));
}
vec3 pr; vec4 nr;
shRope(s, t, vb, pr, nr);
if (all) { p = pr; nb = nr; gLie = 1.0; return; }
p = mix(p, pr, z); nb = mix(nb, nr, z); gLie = z;
gBlue *= 1.0 - z; gHot *= 1.0 - z; gFlex = mix(gFlex, 0.45, z); gThin = mix(gThin, 1.0, z); gBody *= 1.0 - z; gShow = mix(gShow, 1.0, z);
}
void curve(vec4 s, float t, out vec3 p, out vec4 nb) {
float k = min(floor(s.x * 3.0), 2.0), o = s.x * 3.0 - k, m = uRpM.x, w = 0.0, gp = 0.0;
bool needA = true, needB = false;
gLie = 0.0;
if (m > 0.0) {
if (uRpM.z > 0.5) {
float od = fract(o + 0.37 * k);
w = smoothstep(od * uRpM.y, od * uRpM.y + (1.0 - uRpM.y), m);
needA = w < 0.9995; needB = w > 0.0005;
} else {
float a = o * uRpM.y, b = uRpM.w + a;
needB = m > b; needA = !needB;
gp = needB ? 1.0 - smoothstep(b, b + (1.0 - uRpM.w - uRpM.y), m) : smoothstep(a, b, m);
}
}
vec3 pa = vec3(0.0); vec4 na = vec4(0.0); float b0 = 0.0, h0 = 0.0, f0 = 0.2, t0 = 1.0, s0 = 1.0, y0 = 0.0, l0 = 0.0;
p = vec3(0.0); nb = vec4(0.0, 0.0, 1.0, 0.0);
for (int turn = 0; turn < 2; turn++) {
bool sec = turn == 1;
if (sec ? !needB : !needA) continue;
if (sec) { pa = p; na = nb; b0 = gBlue; h0 = gHot; f0 = gFlex; t0 = gThin; s0 = gShow; y0 = gBody; l0 = gLie; }
lie(s, t, sec, inRopeOf(s, sec, gp), p, nb);
}
if (needA && needB) {
float e = w * w * (3.0 - 2.0 * w);
p = mix(pa, p, e); nb = mix(na, nb, e);
gBlue = mix(b0, gBlue, e); gHot = mix(h0, gHot, e); gFlex = mix(f0, gFlex, e); gThin = mix(t0, gThin, e); gShow = mix(s0, gShow, e); gBody = mix(y0, gBody, e); gLie = mix(l0, gLie, e);
}
}
float strandOn(vec4 s) { return 1.0; }`,xe=(function(){var t=fo,o=[[/uniform float uMix, uStag, uLift;[^\n]*\n/,""],[/uniform vec4 uHand;[^\n]*\n/,""],[/uniform vec4 uHand2;[^\n]*\n/,""],[/uniform float uFold;[^\n]*\n/,""],[/uniform float uFlow;[^\n]*\n/,""],[/float gKeep;[^\n]*\n/,""],[/float gOwn, gHandIn, gHandM, gShow;/,"float gShow;"],[/float gBody, gHandW;/,"float gBody; const float gHandW = 1.0;"]];return o.forEach(function(e){if(!e[0].test(t))throw new Error("sfs-scene: rope head, no "+e[0]);t=t.replace(e[0],e[1])}),t+Qo})(),$o=`
uniform vec4 uPtr, uPtr2;
uniform vec3 uPtrAmt;
uniform vec2 uPulse;
uniform float uPulseW, uCamD;
vec3 aside(vec3 pv, float flex, out float gather) {
vec2 sp = pv.xy * (uCamD / max(0.01, -pv.z));
vec2 d1 = sp - uPtr.xy, d2 = sp - uPtr2.xy;
float e1 = uPtr.z * exp(-dot(d1, d1) / (uPtr.w * uPtr.w)), e2 = uPtr2.z * exp(-dot(d2, d2) / (uPtr2.w * uPtr2.w));
pv.xy += (d1 * (e1 / uPtr.w) + d2 * (e2 / uPtr2.w)) * (2.33 * uPtrAmt.x * flex);
gather = max(e1, 0.6 * e2);
return pv;
}
float pulseAt(float t) {
float a = (t - uPulse.x) / uPulseW, b = (t - uPulse.y) / uPulseW;
return max(step(-1.0, uPulse.x) * exp(-a * a), step(-1.0, uPulse.y) * exp(-b * b));
}`,co=`#version 300 es
precision highp float;
layout(location=0) in vec2 aIV;
layout(location=1) in vec4 aSeed;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform float uSeg, uWidth, uMinPx, uPxUnit, uWMul, uExposure;
uniform float uCore, uBreath, uWave, uMouth, uWash, uTips, uTipWash, uRim;
uniform vec3 uReach;
uniform vec2 uVar;`,Zo=`
out float vV; out float vBlue; out float vHot; out float vPx; out float vShade; out float vEnd; out float vFree; out float vKick; out float vExp;
out vec3 vTv; out vec3 vPv; out vec3 vNb; out vec3 vTP;
void main() {
float t = aIV.x / uSeg;
vec4 s = aSeed;
vec3 p, q; vec4 nb, nq; float gp, gq;
curve(s, t + 0.006, q, nq);
vec3 qv = aside((uView * vec4(q, 1.0)).xyz, gFlex, gq);
curve(s, t, p, nb);
float w = gSel, body = gBody, sBlue = gBlue, sHot = gHot;
vec2 pl = gLoc.xy;
vec3 pv = aside((uView * vec4(p, 1.0)).xyz, gFlex, gp);
vec3 tv = normalize(qv - pv + vec3(1e-7, 0.0, 0.0));
vec3 vd = normalize(-pv);
vec3 side = normalize(cross(tv, vd));
float inner = mix(1.0, 0.45 + 0.55 * smoothstep(0.0, 0.10, t), w * (1.0 - uVx4.x));
float wd = uWidth * uWMul * (0.78 + 0.44 * s.w) * mix(1.0, 0.55, smoothstep(0.80, 1.0, t));
float ppu = uPxUnit * uCamD / max(0.01, -pv.z);
float hw = 0.5 * max(wd, uMinPx / ppu) * inner * strandOn(s) * gThin * gHandW * gShow;
vEnd = (1.0 - t) * (length(qv - pv) / 0.006) / max(hw, 1e-6);
pv += side * aIV.y * hw;
vec4 c = uProj * vec4(pv, 1.0);
c.z -= (s.y * 0.7 + s.w * 0.3 - 0.5) * 0.004 * c.w * max(1.0, uWMul);
c.xy = c.xy * uStage.xy + uStage.zw * c.w;
gl_Position = c;
vV = aIV.y; vTv = tv; vPv = pv; vPx = 2.0 * hw * ppu; vExp = uExposure;
vNb = mat3(uView) * nb.xyz; vFree = nb.w;
float hs = fract(sin(s.z * 91.345 + s.w * 47.853) * 43758.5453);
vShade = (1.0 - uVar.x * 0.5 + uVar.x * hs) * mix(1.0, 0.46, step(1.0 - uVar.y, fract(hs * 7.31)));
vShade *= 1.0 - 0.62 * uTips * (smoothstep(0.925, 0.940, t) - smoothstep(0.968, 0.976, t));
float hb = fract(s.z * 5.17 + s.w * 3.31);
float lean = pow(clamp(0.5 + 0.5 * dot(pl / max(length(pl), 1e-4), vec2(0.26, -0.97)), 0.0, 1.0), 1.5);
float out_ = max(0.0, length(pl) - uMouth) / (uReach.x * mix(1.0 - 0.4 * uReach.y, 1.0 + 0.6 * uReach.y, lean));
float near = smoothstep(0.10, 0.80, exp(-out_ * out_ / 0.055));
float carry = max(near, 0.9 * step(0.93, hb) * exp(-out_ * 2.2));
float wv = (t - fract(uTime * uWave)) / 0.045;
float wave = 0.42 * exp(-wv * wv) * (1.0 - t) * (1.0 - t);
float core = uCore * body * (carry * (0.88 + 0.12 * uBreath) + wave);
float tip = uTips * smoothstep(0.974, 0.992, t);
float rim = uRim * w * exp(-t * 20.0) * (0.55 + 0.45 * hb);
float pul = pulseAt(t);
vHot = uCore * body * (exp(-t * 26.0) * 0.9 + uReach.z * (0.35 + 0.65 * lean) * near * near) + tip * (0.80 + 0.20 * uBreath) + 1.1 * rim * exp(-t * 40.0) + 0.55 * pul + sHot;
vBlue = clamp(core + uWash * body * (0.55 + 0.45 * hb) + uTips * uTipWash * smoothstep(0.50, 1.0, t) * (0.25 + 0.75 * hb)
+ rim + uPtrAmt.y * gp + 0.85 * pul + sBlue, 0.0, 1.0);
vKick = uCore * body; vTP = vec3(t, hs, clamp((uWMul - 1.5) / 1.5, 0.0, 1.0));
}`,ge=`#version 300 es
precision highp float;
in float vV; in float vBlue; in float vHot; in float vPx; in float vShade; in float vEnd; in float vFree; in float vKick; in float vExp;
in vec3 vTv; in vec3 vPv; in vec3 vNb; in vec3 vTP;
uniform float uGlint, uKick, uArmSide, uSkinW;
uniform vec4 uLight;
uniform vec4 uArms;
uniform vec4 uShade;
uniform vec3 uBlue;
uniform vec4 uBlueAmt;
uniform vec4 uKc[2];
uniform vec4 uKcAmt;
uniform vec4 uFade;
out vec4 o;
float inRect(vec4 r, vec2 f, float soft) { vec2 d = min(f - r.xy, r.zw - f); return smoothstep(0.0, soft, min(d.x, d.y)); }
float lamp(vec3 T, vec3 V, vec3 nm, vec3 L, float k, float wob) {
float d = dot(T, normalize(L + V)) + wob;
return exp(-d * d * k) * smoothstep(-0.30, 0.55, dot(nm, L));
}
void main() {
float v = clamp(vV, -1.0, 1.0);
if (vEnd < 1.0) { float e = 1.0 - vEnd; if (e * e + v * v > 1.0) discard; }
vec3 vd = normalize(-vPv), tv = normalize(vTv);
float round_ = clamp((vPx - 1.5) / 3.0, 0.0, 1.0);
float layer = min(length(vNb), 1.0);
vec3 nrm = vNb / max(length(vNb), 0.001);
float free = clamp(vFree, 0.0, 1.0);
float occ = mix(uShade.x, 1.0, pow(smoothstep(uShade.y, min(1.0, uShade.y + uSkinW), layer), 1.2)) * mix(uShade.w, 1.0, max(free, smoothstep(-0.70, 0.15, dot(nrm, vd))));
occ = max(occ, free * 0.8);
vec3 nm = normalize(nrm + vd * (0.25 + 2.0 * free));
float wob = uGlint * (1.0 - 0.75 * vTP.z) * (0.085 * sin(vTP.x * 31.0 + vTP.y * 40.0) + 0.050 * sin(vTP.x * 73.0 + vTP.y * 17.0));
float key = lamp(tv, vd, nm, normalize(vec3(-0.62, 0.72, 0.30)), 9.0, wob * 0.4);
float strips = uArms.x * lamp(tv, vd, nm, normalize(vec3(0.84, 0.30, 0.34)), 42.0, wob)
+ uArms.y * lamp(tv, vd, nm, normalize(vec3(0.05, 0.98, 0.12)), 18.0, wob)
+ uArms.z * lamp(tv, vd, nm, normalize(vec3(-0.82, -0.30, 0.42)), 34.0, wob)
+ uArms.w * lamp(tv, vd, nm, normalize(vec3(0.25, 0.50, 0.82)), 28.0, wob)
+ uArmSide * vTP.z * lamp(tv, vd, nm, normalize(vec3(-0.80, 0.05, 0.60)), 30.0, wob);
float fill = lamp(tv, vd, nm, normalize(vec3(0.25, -0.86, 0.42)), 5.0, 0.0);
float form = mix(uShade.z, 1.0, smoothstep(-0.25, 0.75, dot(nm, normalize(vec3(-0.70, 0.60, 0.40)))));
vec3 col = vec3(0.88, 0.92, 1.0) * uLight.w * (0.55 + 0.45 * nm.y + 1.2 * free)
+ vec3(1.0) * (uLight.x * key + uLight.y * strips) * form
+ vec3(0.80, 0.87, 1.0) * uLight.z * (fill + 0.60 * smoothstep(0.1, -0.7, nm.y));
float prof = mix(0.24 + 1.02 * exp(-(v - 0.16) * (v - 0.16) * 4.5),
0.16 + 1.25 * exp(-(v - 0.22) * (v - 0.22) * 28.0) + 0.40 * exp(-(v + 0.55) * (v + 0.55) * 60.0), vTP.z);
prof = mix(1.0, prof, round_);
col *= prof * occ * vShade;
float kick = vKick * uKick * lamp(tv, vd, nm, normalize(vec3(0.62, -0.66, 0.42)), 12.0, 0.0) * occ;
float kc = max(uKcAmt.z * inRect(uKc[0], gl_FragCoord.xy, uKcAmt.x), uKcAmt.w * inRect(uKc[1], gl_FragCoord.xy, uKcAmt.x));
float b = clamp(vBlue + kick * 0.5, 0.0, 1.0) * (1.0 - kc);
float lum = dot(col, vec3(0.3333));
col = mix(col, col * vec3(0.10, 0.40, 1.50) + uBlue * (0.03 + 0.70 * lum), b * uBlueAmt.x);
col += uBlue * uBlueAmt.y * (b * b + kick * 0.6) * prof * (0.30 + 0.70 * occ)
+ vec3(0.55, 0.84, 1.0) * b * b * lum * uBlueAmt.w
+ vec3(0.72, 0.87, 1.0) * (vHot * (1.0 - kc)) * uBlueAmt.z * prof;
col = pow(1.0 - exp(-col * vExp * 1.15), vec3(1.0 / 2.2));
col *= 1.0 - uKcAmt.y * kc;
float f = uFade.x;
if (uFade.y > 0.0) { vec2 e = min(gl_FragCoord.xy, uFade.zw - gl_FragCoord.xy); f *= smoothstep(0.0, uFade.y, min(e.x, e.y)); }
o = vec4(col * f, f);
}`,Ut=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aSeed;
layout(location=2) in vec4 aPt;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform vec2 uRes;
uniform float uPtShare, uPtScale, uPointAmt, uTravel, uSparkle, uPtLift, uRim;
uniform vec4 uKc[2]; uniform vec4 uKcAmt;`,Eo=`
out vec2 vUv; out float vA;
float inRect(vec4 r, vec2 f, float soft) { vec2 d = min(f - r.xy, r.zw - f); return smoothstep(0.0, soft, min(d.x, d.y)); }
void main() {
float tm = aPt.w < 0.5 ? 1.0 : (aPt.w < 1.5 ? fract(aPt.x + uTime * uTravel * (0.4 + aPt.z)) : 0.012);
vec3 p; vec4 nb; float gather;
curve(aSeed, tm, p, nb);
vec3 pv = aside((uView * vec4(p, 1.0)).xyz, gFlex, gather);
vec4 c = uProj * vec4(pv, 1.0);
c.z -= uPtLift * 1.017 / c.w;
c.xy = c.xy * uStage.xy + uStage.zw * c.w;
float tw = 0.70 + 0.30 * sin(uTime * (0.9 + 1.6 * aPt.z) + aPt.z * 40.0);
float flash = pow(max(0.0, sin(uTime * (0.33 + 0.45 * aPt.z) + aPt.z * 91.0 + aPt.x * 17.0)), 28.0) * uSparkle;
float edge = aPt.w < 0.5 ? 1.0 : (aPt.w < 1.5 ? smoothstep(0.0, 0.06, tm) * (1.0 - smoothstep(0.90, 1.0, tm)) : uRim * gSel);
float on = smoothstep(uPtShare, uPtShare - 0.04, aPt.z) * edge * strandOn(aSeed) * gHandW * gShow * smoothstep(0.25, 0.70, gThin);
vec2 fpx = (c.xy / c.w * 0.5 + 0.5) * uRes;
on *= 1.0 - max(uKcAmt.z * inRect(uKc[0], fpx, uKcAmt.x), uKcAmt.w * inRect(uKc[1], fpx, uKcAmt.x));
float pul = pulseAt(tm), lift = uPtrAmt.y * gather;
c.xy += aCorner * aPt.y * uPtScale * (1.0 + 0.35 * flash + 0.5 * lift + 0.6 * pul) * 2.0 / uRes * c.w;
gl_Position = c;
vUv = aCorner; vA = min(1.6, (tw + 0.7 * flash + 0.8 * lift + 0.9 * pul)) * uPointAmt * on;
}`,Ro=(function(){var t="smoothstep(0.25, 0.70, gThin);",o=Eo.replace(t,"smoothstep(0.25, 0.70, gThin) * (1.0 - gLie * step(0.12, fract(aPt.z * 13.7)));");if(o===Eo)throw new Error("sfs-scene: rope points, no "+t);return o})(),Po=`#version 300 es
precision highp float;
in vec2 vUv; in float vA; out vec4 o;
uniform vec3 uBlue;
void main() {
float d = length(vUv);
float core = smoothstep(0.26, 0.14, d);
float halo = (0.55 * exp(-d * d * 3.2) + 0.45 * exp(-d * d * 14.0)) * smoothstep(1.0, 0.55, d);
vec3 c = (uBlue + vec3(0.05, 0.09, 0.0)) * halo * 0.62 + vec3(0.90, 0.96, 1.0) * core;
o = min(vec4(c, halo * 0.50 + core) * vA, vec4(1.0));
}`,No=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
uniform mat4 uView, uProj; uniform vec4 uStage; uniform vec3 uPos; uniform vec2 uSize;
uniform float uKind; uniform vec2 uTurn;
vec3 rotX(vec3 v, float a) { float c = cos(a), s = sin(a); return vec3(v.x, v.y * c - v.z * s, v.y * s + v.z * c); }
vec3 rotY(vec3 v, float a) { float c = cos(a), s = sin(a); return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c); }
out vec2 vUv;
void main() {
vec3 pv = uKind < 0.5 ? (uView * vec4(uPos + rotX(rotY(vec3(aCorner * uSize, 0.0), uTurn.x), uTurn.y), 1.0)).xyz : vec3(uPos.xy + aCorner * uSize, uPos.z);
vec4 c = uProj * vec4(pv, 1.0);
c.xy = c.xy * uStage.xy + uStage.zw * c.w;
gl_Position = c; vUv = aCorner;
}`,Ho=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform float uAmt, uKind, uRingR; uniform vec2 uHaze;
uniform vec3 uBlue;
void main() {
float d = length(vUv);
vec4 bl = vec4(uBlue + vec3(0.05, 0.08, 0.0), 1.0), wh = vec4(0.93, 0.97, 1.0, 1.0);
vec4 c;
if (uKind < 0.5) {
float x = d - uRingR;
float line = exp(-x * x / 0.00040);
float soft = exp(-x * x / 0.0050);
float halo = exp(-abs(x) * 5.0) * smoothstep(1.0, 0.5, d);
float inside = smoothstep(uRingR, uRingR * 0.92, d) * (uHaze.x + uHaze.y * smoothstep(uRingR * 0.25, uRingR, d));
c = wh * line + mix(bl, wh, 0.45) * soft * 0.85 + bl * halo * 0.50 + vec4(0.78, 0.88, 1.0, 1.0) * inside;
} else if (uKind < 3.5) {
float a = (0.55 * exp(-d * d * 3.0) + 0.45 * exp(-(vUv.x * vUv.x * 1.6 + vUv.y * vUv.y * 12.0))) * smoothstep(1.0, 0.6, d);
c = vec4(vec3(0.05, 0.06, 0.09) * a, a);
} else c = bl * exp(-d * d * 3.0) * smoothstep(1.0, 0.6, d);
o = min(c, vec4(1.0)) * uAmt;
}`;function we(t,o,e){var r=1/Math.tan(t*Math.PI/360),a=1/(o-e);return new Float32Array([r,0,0,0,0,r,0,0,0,0,(e+o)*a,-1,0,0,2*e*o*a,0])}function s(t,o,e,r){var a=Math.cos(t),i=Math.sin(t),h=Math.cos(o),m=Math.sin(o),f=Math.cos(e),b=Math.sin(e);return new Float32Array([a*f,m*i*f+h*b,-h*i*f+m*b,0,-a*b,-m*i*b+h*f,h*i*b+m*f,0,i,-m*a,h*a,0,0,0,-r,1])}function c(t){return function(){t|=0,t=t+1831565813|0;var o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function n(t,o,e){return t+(o-t)*e}function l(t,o,e){return t<o?o:t>e?e:t}function p(t){return t<0?0:t>1?1:t}function v(t){var o=t.slice().sort(function(e,r){return e-r});return o.length?o[o.length>>1]:0}function g(t,o){var e=t.length;if(o<=t[0][0])return t[0][1];if(o>=t[e-1][0])return t[e-1][1];for(var r=0;o>t[r+1][0];)r++;function a(T){if(T===0||T===e-1)return 0;var z=t[T][0]-t[T-1][0],C=t[T+1][0]-t[T][0],E=(t[T][1]-t[T-1][1])/z,w=(t[T+1][1]-t[T][1])/C;return E*w<=0?0:3*(z+C)/((2*C+z)/E+(C+2*z)/w)}var i=t[r][0],h=t[r+1][0]-i,m=t[r][1],f=t[r+1][1],b=(o-i)/h,A=b*b,F=A*b;return(2*F-3*A+1)*m+(F-2*A+b)*h*a(r)+(3*A-2*F)*f+(F-A)*h*a(r+1)}function x(t){return t=p(t),t*t*(3-2*t)}function S(t){return t-2*Math.PI*Math.round(t/(2*Math.PI))}function M(t){try{performance.mark("sfs-scene:"+t)}catch{}}function R(t){H.push(t),H.length>60&&H.shift(),window.console&&console.warn("[scene] "+t)}var H=[],K=we(qt,.5,30),P=Math.PI/180,tt=/SwiftShader|llvmpipe|Software|Basic Render/i,Q=document.documentElement,At=document.currentScript,Rt=At&&At.src?At.src.replace(/sfs-scene(\.min)?\.js(\?.*)?$/,""):"",Tt=new URLSearchParams(location.search),nt=/[?&](debug|popup-debug|perf=1|sceneperf=1)\b/.test(location.search),ht=new Float32Array(u.maxStrands*4);(function(){for(var t=c(20261007),o=0;o<u.maxStrands;o++)ht[o*4]=(.5+o*.7548776662466927)%1,ht[o*4+1]=(.5+o*.5698402909980532)%1,ht[o*4+2]=t(),ht[o*4+3]=t()})();var yt=128,Yt=u.tiers[0].points,N=null,d=null,gt=null,Z=null,Pt=null,Bt=null,Ct=null,Jo=!1,Vt={begin:0,send:0,waited:0,take:0,frames:[]},Dt=[],St=null,Fo=0,ye=0,tr=[],mt=null,U=[],po=null,be=!1,ke=!1,Oo="",Qt=null,yo=!1,Bo=!1,te=0,or={},Vr={alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1},I="off",pt="page",oe="",er="",vt=0,bt={},Nt={},_r=!1,ut=0,dt=0,Wt=1,at=0,V=0,J=1,Gt=0,Me=0,no=!0,ee="",it=!1,kt=0,$t=0,Mt=null,Ht="",re=0,ao=[],Oe=0,ho=0,Ae=null,_t=0,bo=0,Be=0,io=0,so=0,Ce=0,xt=0,ne=0,Se=16.667,rr=0,Zt=null,Kr=0,nr=!1,ae=0,Co=[],ie=0,uo=0,ko=0,ar=0,se=!1,ue=0,D=null,G=null,Jt=0,ze=!0,lt=null,zt=-1,lo="",Mo=!1,Le=!1,ot=xn(),qe=0,Lo={fails:0},le=0,ir=0,sr=null,Xt=!1,ur=!1,qo=0,lr=!1,fr=!1,k={cx:0,cy:0,on:0,down:!1,finger:!1,downAt:null,ax:0,ay:0,a:0,bx:0,by:0,b:0,busy:!1,turnX:0,turnY:0},to=[],Uo=null,fe=null,cr=!1,mo=[],vo=[],Kt=[],pr=[],Te=[],Ao={},Vo={},hr=null,dr=null,Ue=null,Ir=null,ft={top:0,h:0,stageH:0},Lt=[],Ve=[],jr=[],mr=[],Yr=[],We=null,_e={},Ee=[0,0,0],ce=[0,0,0],vr=[0,0,0],Re=-1,Pe,_o=0,ba=[0,0,0,0],Wn=[1e6,1e6,-1e6,-1e6];function En(t){var o=Ue.get(t);return o===void 0&&(o=getComputedStyle(t).position==="sticky"?1:0,Ue.set(t,o)),o}function So(t){var o=0,e=0,r,a={x:0,y:0,w:t.offsetWidth,h:t.offsetHeight,pin:null,rel:0};for(r=t;r;r=r.offsetParent){if(!a.pin&&En(r)&&r.parentElement){var i=So(r.parentElement),h=getComputedStyle(r),m=getComputedStyle(r.parentElement),f=0,b;for(b=r;b;b=b.offsetParent)f+=b.offsetTop+(b===r?0:b.clientTop);var A=parseFloat(h.top)||0,F=i.pin?i.pin.n+i.rel:i.y,T=F+r.parentElement.clientTop+(parseFloat(m.paddingTop)||0),z=F+i.h-(parseFloat(m.borderBottomWidth)||0)-(parseFloat(m.paddingBottom)||0)-r.offsetHeight-(parseFloat(h.marginBottom)||0),C=Math.abs(f-(window.scrollY+A))<1.5||f>=z-1.5;a.pin={n:C?T+(parseFloat(h.marginTop)||0):f,top:A,lim:z},a.rel=e+(r===t?0:r.clientTop),o+=r.offsetLeft+(r===t?0:r.clientLeft);continue}o+=r.offsetLeft+(r===t?0:r.clientLeft),a.pin||(e+=r.offsetTop+(r===t?0:r.clientTop))}return a.x=o,a.y=e,a}function Dr(t,o){if(!t.pin)return t.y;var e=t.pin;return(e.lim<e.n?e.n:Math.min(Math.max(e.n,o+e.top),e.lim))+t.rel}function xr(t,o){var e=Dr(t,o)-o;return{l:t.x,t:e,w:t.w,h:t.h,r:t.x+t.w,b:e+t.h,cx:t.x+t.w/2,cy:e+t.h/2}}function Ne(t){hr&&t&&!dr.has(t)&&(dr.add(t),hr.observe(t))}function Ke(t,o){var e=Ao[t];if(!e){e=Ao[t]={recs:[]};var r=Array.prototype.slice.call(document.querySelectorAll(t));r.forEach(Ne),e.recs=r.map(So).filter(function(a){return a.w>1&&a.h>1}),it&&(no=!0)}return o?e.recs.map(function(a){return xr(a,zt)}):e.recs.length?xr(e.recs[0],zt):void 0}function Gr(t){var o=t.split("|"),e=document.querySelector(o[0]);return e?parseFloat(getComputedStyle(e).getPropertyValue(o[1])):NaN}function Rn(t,o){var e=t+"|"+o;return e in Vo||(Vo[e]=Gr(e)),Vo[e]}function Ko(){no=!1;var t=[],o,e;at=N&&N.clientWidth?N.clientWidth:Q.clientWidth,V=N&&N.clientHeight?N.clientHeight:window.innerHeight,kt=V,it&&(re=document.body?document.body.offsetHeight:0,!N||!N.clientHeight?kt=V+u.carry.extra:re<kt?(it=!1,Ht="",Mt=null,$t=0,N.style.cssText=Nr,kt=V=N.clientHeight||window.innerHeight):V=kt-u.carry.extra),Gt=window.innerHeight;var r=u.fit;J=Math.max(1,.5*Math.min(Math.max(V,at/r.aspect),at*r.narrow)),oo.cssW=at,oo.cssH=V,oo.U=J,Me=Math.max(0,(it?re:Q.scrollHeight)-Gt);var a=document.querySelector(u.hero),i=a?a.querySelector(u.stage):null;if(a){var h=So(a);ft={top:h.y,h:h.h,stageH:i?i.offsetHeight:Gt},Ne(a)}else ft={top:0,h:Gt,stageH:Gt};var m=pt!=="hero",f=u.secs.map(function(E){return E&&m?document.querySelector(E):null});Lt=f.map(function(E){return E?(Ne(E),So(E).y):null}),m&&Array.prototype.forEach.call(document.querySelectorAll(".sec"),Ne);for(e in Ao){var b=Array.prototype.slice.call(document.querySelectorAll(e));b.forEach(Ne),Ao[e].recs=b.map(So).filter(function(E){return E.w>1&&E.h>1}),Ao[e].recs.forEach(function(E){t.push(E.x,E.pin?E.pin.n+E.rel:E.y,E.w,E.h)})}for(o in Vo)Vo[o]=Gr(o),t.push(Vo[o]);Ve=[],Array.prototype.forEach.call(document.querySelectorAll("img.gd-img"),function(E){if(!/gd-img--over/.test(E.className)&&!(!m&&!E.closest(u.hero))){var w=So(E),y=E.parentElement,$=E.closest(".gd"),q=E.closest(".sec, header.hero, footer.foot");if(y&&/(^|\s)gd-cut(\s|$)/.test(y.className)){var B=So(y);w.h=Math.min(w.h,B.h),w.w=Math.min(w.w,B.w)}if(!(w.w<2||w.h<2)){var O=q?f.indexOf(q):-1;O<0&&(O=q&&q.matches(u.hero)?0:-1),Ve.push({rec:w,st:O,fig:$}),t.push(w.x,w.pin?w.pin.n+w.rel:w.y,w.w,w.h)}}}),jr=m?[1,2,3].map(function(E){return document.querySelector('[data-scene-station="'+E+'"]')}):[],mr=m?[1,2,3].map(function(E){return document.querySelector("#focus .oc-br--"+E)}):[],Yr=m?Array.prototype.slice.call(document.querySelectorAll("#services .cards .card")):[];var A=pt==="page"?document.querySelector(u.proof.sel):null;if(We=A?So(A):null,it){ao=[];var F=u.seam,T=Lt[2]===null||Lt[2]===void 0?pe():Math.min(Lt[2]-F.to*V,Me);Oe=ft.h-Gt>1?pe()+u.carry.heroPass*Math.max(0,T-pe()):-1e9;var z=function(E){var w=E&&E.pin;if(!(!w||w.lim<=w.n+1||w.lim-w.top<=Oe)){for(var y=0;y<ao.length;y++)if(ao[y][0]===w.n-w.top&&ao[y][1]===w.lim-w.top)return;ao.push([w.n-w.top,w.lim-w.top])}};for(e in Ao)Ao[e].recs.forEach(z);z(We),t.push(re,kt)}t.push(at,V,Gt,Me,ft.top,ft.h,Lt.join("/")),t=t.join(",");var C=t!==ee;return ee=t,C}function pe(){return ft.top+ft.h-Gt}function Pn(t){if(Nt.progress)return p(+Nt.progress()||0);var o=ft.h-Gt;return o>1?p((t-ft.top)/o):0}function gr(t){for(var o=1,e=u.seam,r=u.secs.length-1,a=2;a<=r;a++)if(!(Lt[a]===null||Lt[a]===void 0)){var i=Math.min(Lt[a]-e.to*V,Me),h=Math.min(Lt[a]-e.from*V,i-e.least*V);if(a===2&&(h=Math.min(pe(),i-1)),t<=h||(o=a-1+x((t-h)/(i-h)),t<i))break}return o}function Ie(t){var o=Pn(t),e=pe();return pt==="hero"?o:ft.h-Gt<=1?t<=e?o:gr(t):t<=e+1?o:Math.max(o,gr(t))}var Nn={l:0,t:0,w:100,h:100,r:100,b:100,cx:50,cy:50};function wr(t){var o={},e,r=u.look;for(e in r)o[e]=r[e];if(t)for(e in t)o[e]=t[e];return o}function Hn(t,o,e){var r=_e[t];return r||(r=_e[t]={v:o,to:o,s:e||.3}),r.to=o,r.s=e||.3,D&&(r.v=o),r.v}var oo={box:Ke,live:function(t){return Ke(t)},css:Rn,ux:function(t){return(t-at/2)/J},uy:function(t){return(V/2-t)/J},ul:function(t){return t/J},cssW:0,cssH:0,U:1,time:0,scrollY:0,narrow:function(){return at<=900},look:wr,NONE:Nn,clamp01:p,sstep:x,lerp:n,detail:vr,hover:Ee,ease:Hn,ptr:{x:0,y:0,on:0},open:function(t,o,e,r){var a=t==null?0:p((0-t)/Math.max(1,o-t)),i=e==null?1:p((V-e)/Math.max(1,r-e));return Math.min(1-x(a),x(i))},q:0},Xr={uTime:1,uShare:1,uShA:1,uShB:1,uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1,TAU:1,PI:1,gBlue:1,gHot:1,gFlex:1,gThin:1,gSel:1,gKnot:1,gShow:1},Fn={uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1};function On(t){var o=String(t.id||"").toLowerCase().replace(/[^a-z0-9]/g,"")||"x",e=String(t.glsl||"").replace(/\/\*[\s\S]*?\*\//g," ").replace(/\/\/[^\n]*/g," "),r={},a={},i={id:o,src:t,uni:r,gids:{},text:""};e=e.replace(/\buniform\s+(\w+)\s+([^;]+);/g,function(q,B,O){var W=[];return O.split(",").forEach(function(et){var X=/^\s*(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*$/.exec(et);if(!X)throw new Error('cannot read the uniform declaration "'+q.replace(/\s+/g," ")+'"');if(!Xr[X[1]]){if(B!=="vec4")throw new Error("uniform "+X[1]+" is a "+B+": a shape's uniforms are vec4 (SHAPES.md 1)");r[X[1]]=X[2]?+X[2]:0,a[X[1]]=1,W.push(X[1]+(X[2]?"["+X[2]+"]":""))}}),W.length?"uniform vec4 "+W.join(", ")+";":" "});var h="",m=0,f,b;for(f=0;f<e.length;f++)b=e.charAt(f),b==="}"&&m--,h+=m>0&&b!==`
`?" ":b,b==="{"&&m++;for(var A=[],F="(?:void|float|int|bool|vec[234]|mat[234])",T,z=new RegExp("\\b"+F+"\\s+(\\w+)\\s*\\(","g");T=z.exec(h);)a[T[1]]=1;for(var C=new RegExp("\\b(?:const\\s+)?"+F+"\\s+([^;{}()]+(?:\\([^;{}]*\\))?[^;{}()]*);","g");T=C.exec(h);)if(!(/\)\s*$/.test(T[1])&&!/=/.test(T[1]))){var E=T[1].replace(/\([^)]*\)/g,"").split(",").map(function(q){return(/^\s*(\w+)/.exec(q)||[])[1]}).filter(Boolean),w=E.filter(function(q){return Xr[q]});if(w.length===E.length)A.push([T.index,T.index+T[0].length]);else{if(w.length)throw new Error('"'+T[0]+`" declares the engine's `+w.join(", ")+" together with names of its own: put them on lines of their own");E.forEach(function(q){a[q]=1})}}for(f=A.length-1;f>=0;f--)e=e.slice(0,A[f][0])+" "+e.slice(A[f][1]);i.text=e.replace(/[A-Za-z_]\w*/g,function(q,B,O){return a[q]===1&&O.charAt(B-1)!=="."?q+"_"+o:q});var y=t.shapes||{};for(var $ in y){if(!a[y[$]])throw new Error("shape "+$+" names the function "+y[$]+", which the file's glsl does not define");i.gids[$]=Kt.length,Kt.push({fn:y[$]+"_"+o,file:i,local:$})}return i}function Bn(t){var o=`void shape(int id, vec4 s, float t, out vec3 p, out vec4 nb) {
  gBlue = 0.0; gHot = 0.0; gFlex = 0.2; gSel = 1.0; gThin = 1.0; gShow = 1.0; gBody = 0.0; gKnot = 0.0; gLoc = vec3(0.0);
`,e=[],r=[];return t.hero&&e.push("if (id < 0) { heroCurve(s, t, p, nb); gBody = 1.0; }"),t.ids.forEach(function(a){if(a===0){e.push("if (id == 0) { shBody(s, t, p, nb); gBody = 1.0; }");return}e.push("if (id == "+a+") "+Kt[a].fn+"(s, t, p, nb);"),Kt[a].file&&r.indexOf(Kt[a].file)<0&&r.push(Kt[a].file)}),o+="  "+e.join(`
  else `)+`
  else { p = vec3(0.0); nb = vec4(0.0, 0.0, 1.0, 0.0); }
}
`,r.sort(function(a,i){return mo.indexOf(a)-mo.indexOf(i)}),(t.form==="rope"?xe:fo)+jt+r.map(function(a){return`
/* ---- shapes-`+a.id+` ---- */
`+a.text}).join(`
`)+`
`+o+(t.form==="rope"?Wo:ro)}function Cn(){var t=pt==="page"&&vo.length?u.groups:[1];U=[{k:0,lo:0,hi:Math.min(t[0],u.secs.length-1),hero:!0,ids:[0],form:"one",state:"none",strand:null,point:null,info:null}],po=U[0],be=U[0].hi>=u.secs.length-1||pt!=="page"||!vo.length,ke=!1,Oo="",or={}}function he(){if(!be){be=!0;var t=u.groups,o=u.secs.length-1,e,r,a;for(U[0].hi>1&&R("CONF.groups: the first group must end at the ball (1); below it every picture needs the rope"),e=1;e<t.length&&t[e-1]<o;e++){var i=t[e-1],h=Math.min(t[e],o),m=[],f="rope";for(r=i;r<=h;r+=.5)r%1&&(!vo[r]||r>h)||(a=r===1?{gid:0}:He(r),a&&m.indexOf(a.gid)<0&&m.push(a.gid));m.sort(function(b,A){return b-A}),U.push({k:e,lo:i,hi:h,hero:!1,ids:m,form:f,state:"none",strand:null,point:null,info:null})}}}function zo(t){!be&&t>U[0].hi&&he();for(var o=0;o<U.length;o++)if(t<=U[o].hi)return U[o];return U[U.length-1]}function Ln(t,o){return(o.shA<0?!t.hero:t.ids.indexOf(o.shA)<0)||o.shB!==o.shA&&(o.shB<0?!t.hero:t.ids.indexOf(o.shB)<0)?!1:o.rope?t.form==="rope":t.form==="one"}function qn(t){var o=zo(t),e;for(e=o.k-1;e>=0;e--)if(U[e].state==="ready")return{G:U[e],q:U[e].hi};for(e=o.k+1;e<U.length;e++)if(U[e].state==="ready")return{G:U[e],q:U[e].lo<=1?Math.min(2,U[e].hi):U[e].lo};return null}function yr(t,o){var e=t.k?String(t.hi):"";d&&t.strand&&t.strand!==o["strand"+e]&&(d.deleteProgram(t.strand.p),d.deleteProgram(t.point.p)),t.strand=o["strand"+e],t.point=o["point"+e],t.state="ready",t.k&&M("group"+t.hi),Un()}function Un(){var t=[],o,e,r=u.secs.length-1;for(o=0;o<=r;o++)for(e=0;e<U.length;e++)if(U[e].state==="ready"&&o>=U[e].lo&&o<=U[e].hi){t.push(o);break}var a=t.join(",");if(a!==Oo&&(Oo=a,typeof Nt.onLive=="function"))try{Nt.onLive(t)}catch{}}function br(){if(!(I!=="live"||pt!=="page"||!U.length||bt.nogroups)){he(),ke=!0;var t=zo(G===null?0:G).k,o=U.filter(function(e){return e.state==="none"});o.sort(function(e,r){return Math.abs(e.k-t)-Math.abs(r.k-t)||r.k-e.k}),o.forEach(kr)}}function kr(t){t.state="asked",zr(Yo(t),function(o,e){if(t.info=e,!o){t.state="failed",R("the programs of stations "+t.lo+" to "+t.hi+" did not link ("+e.why+"): the page keeps its stills there");return}yr(t,o),wt()},t)}function Vn(t){t.state==="none"&&ke&&kr(t);for(var o=1;o<Dt.length;o++)if(Dt[o].tag===t){Dt.unshift(Dt.splice(o,1)[0]);break}}function Qr(t){he();var o=zo(t),e={};if(o.state==="ready"||!d)return o.state==="ready"?o:null;try{Yo(o).forEach(function(r){e[r.name]=Sr(Ar(r.vs,r.fs))})}catch(r){return o.state="failed",R("group "+o.k+": "+r.message),null}return yr(o,e),o}function $r(t){mo=[],Kt=[{fn:"shBody",file:null,local:0}],vo=[],Te=[],(t||[]).forEach(function(o){if(!(!o||typeof o!="object")){var e=Kt.length;try{mo.push(On(o))}catch(r){Kt.length=e,R("shapes-"+(o.id||"?")+" left out: "+r.message)}}}),mo.forEach(function(o){var e=o.src.stations||{};for(var r in e)typeof e[r]=="function"&&+r>=2&&+r<u.secs.length&&(vo[+r]={fn:e[r],file:o,gids:{},names:{},checked:!1,broken:!1});var a=o.src.ways||{};for(r in a)typeof a[r]=="function"&&(Te[+r]=a[r])}),Cn()}function _n(t,o){var e=t.gids[o];if(e!==void 0)return e;if(t.file.gids[o]!==void 0)e=t.file.gids[o];else if(String(o)==="0")e=0;else{e=null;for(var r=0;r<mo.length;r++)mo[r].gids[o]!==void 0&&(e=mo[r].gids[o])}return t.gids[o]=e}function Kn(t,o,e){var r=t.names[o+e];if(r!==void 0)return r;var a=/^(.*?)(\d)$/.exec(e),i=[t.file,Kt[o].file],h;r=null;for(var m=0;m<i.length&&!r;m++)h=i[m],h&&(h.uni[e]===0?r=e+"_"+h.id:a&&h.uni[a[1]]>+a[2]&&(r=a[1]+"_"+h.id+"["+a[2]+"]"));return!r&&Fn[e]&&(r=e),t.names[o+e]=r}function He(t){var o=vo[t],e,r,a;if(!o||o.broken)return null;try{e=o.fn(oo)}catch(m){return o.broken=!0,R("station "+t+" (shapes-"+o.file.id+") threw: "+m.message),null}if(!e||!e.u)return o.broken=!0,R("station "+t+" (shapes-"+o.file.id+") returned no { shape, u, look }"),null;var i=_n(o,e.shape);if(i===null)return o.broken=!0,R("station "+t+" (shapes-"+o.file.id+") asks for shape "+e.shape+", which no file defines"),null;var h={};for(r in e.u)a=Kn(o,i,r),a?h[a]=e.u[r]:o.checked||R("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not a uniform of its shape; left out'),!o.checked&&(!e.u[r]||e.u[r].length!==4||e.u[r].some(function(m){return typeof m!="number"||m!==m}))&&R("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not four numbers: '+JSON.stringify(e.u[r]));return o.checked=!0,{i:t,gid:i,u:h,look:wr(e.look),treads:e.treads||null,lit:e.lit,floor:e.floor||null,open:e.open===void 0?1:p(e.open),knot:e.knot||Jr,foot:typeof e.foot=="number"?e.foot:null}}function In(){var t=Math.min(u.tiers[vt].strands,u.maxStrands);return Math.min(u.widthLod[1],Math.max(u.widthLod[0],Math.sqrt(u.tiers[0].strands/t)))}function jn(t,o,e){var r=u.track,a={},i,h=u.alive,m=u.body,f=u.hang,b=u.pointer,A=u.hangUp,F=!!A&&V>at&&at<=A.upTo;for(i in r)a[i]=g(r[i],t);var T=Math.min(u.tiers[vt].strands,u.maxStrands),z={p:t,time:o,v:a};z.open=a.open<1e-5?0:a.open>1-1e-5?1:a.open,z.wind=a.wind<1e-5?0:a.wind>1-1e-5?1:a.wind,z.share=Math.min(1,a.count/T);var C=l(at/J/(2*u.fit.aspect),V>=at?0:f.minScale,1);if(z.hg=[at/2/J+f.root[0]*C,V/2/J+f.root[1]*C,C,a.loosen],F){f=A,C=l(A.wide*at/(A.trunkWidth*J),A.least,A.most);var E=Ke("#clock"),w=(E?Math.max(0,E.b):.3*V)+A.under+.5*A.trunkWidth*C*J;z.hg=[at/2/J+A.root[0]*C,(V/2-w)/J+A.root[1]*C,C,a.loosen]}z.hg2=[f.sway,0,0,0];var y=p(a.loosen/f.rest[2]);y=y*y*(3-2*y);var $=f.rest[3]*(1-y);z.hg3=[(n(f.rest[0],f.tip[0],y)+$)*P,(f.tip[1]+$)*P,f.depth,f.tipCurve];var q=n(f.rest[4],1,y);z.hg4=[f.trunk[0]*q,f.trunk[1]*q,n(f.rest[1],f.reach[0],y)*q,f.reach[1]*q],z.hg5=[f.trunk[2]*q,f.reach[2]*q,f.bend];var B=h.bob*Math.sin(o*h.bobRate)*p((t-.5)/.2);z.bob=B;var O=u.swirl,W=p((t-O.gate[0])/(O.gate[1]-O.gate[0]));W=W*W*(3-2*W);var et=e===void 0?m.spin*o:e,X=et-2*Math.PI*Math.round(et/(2*Math.PI)),rt=(f.leave[0]+f.leave[1])/2;z.angle=(rt-180-O.leave)*P+a.phase+(W>=1?et:X*W),z.op3=[(f.leave[1]-f.leave[0])*P/(f.trunkWidth*C),f.trunkWidth*C,(rt+$)*P,O.settle],z.op=[z.open,O.stagger,a.hole,a.arm],z.op2=[O.leave*P,O.end*P,a.disc,z.angle],z.vx=[a.twist,a.radius,a.tube,m.squash],z.vx2=[a.flare,a.loose,m.wrap,m.wires],z.vx3=[m.treadTwist,m.wrapVar,a.tufts,m.tuftCount],z.vx4=[z.wind,a.sphere,a.ball,a.mouth],z.vxc=[a.cx,a.cy+B,0,Math.max(.01,m.lip*a.ball)],z.mouth=n(a.radius-a.tube,a.mouth,a.sphere),z.outer=n(a.radius+a.tube,a.ball,a.sphere),z.ringZ=n(a.tube*m.squash*.22,a.ball*m.ringZ,a.sphere);var j=a.yaw+h.viewSway[0]*Math.sin(o*h.viewRate[0])+a.turn*b.turn[0]*k.turnX,_=a.pitch+h.viewSway[1]*Math.sin(o*h.viewRate[1]+1.3)-a.turn*b.turn[1]*k.turnY;return z.view=s(j*P,_*P,0,Ot),z.eye=Zr([a.cx,a.cy,0],z.ringZ,a.yaw*P,a.pitch*P,a.sphere,a.cy/z.ringZ),z.core=a.core,z.floor={x:a.floorX,y:a.floorY,w:a.floorW,shadow:a.shadow*(1-4*B),pool:a.pool},z}function Zr(t,o,e,r,a,i){var h=u.pointer.eye[2],m=Mr([0,0,o],h*e,h*r),f=Ot/(Ot-t[2]-m[2]);return[(t[0]+m[0])*f,(t[1]+m[1])*f,e,r,a,i]}function Yn(t,o){var e=t.v,r=u.alive,a=u.page,i=u.shade,h=Math.min(u.tiers[vt].strands,u.maxStrands),m=e.yaw+(r.viewSway[0]-a.scale*a.viewSway[0])*Math.sin(o*r.viewRate[0]),f=e.pitch+(r.viewSway[1]-a.scale*a.viewSway[1])*Math.sin(o*r.viewRate[1]+1.3);return{i:1,gid:0,life:[(m-e.yaw)*P,(f-e.pitch)*P,t.bob],u:{uW0:t.vx,uW1:t.vx2,uW2:t.vx3,uW3:[e.sphere,e.ball,e.mouth,t.vxc[3]],uWC:[t.vxc[0],t.vxc[1],t.vxc[2],e.wires],uWR:[m*P,f*P,t.angle,0],uWB:[e.core,u.blueAmt.reach*t.outer/.85,e.wash,0]},look:wr({thick:e.thick,gain:e.gain,share:t.share,points:e.points,pointSize:e.pointSize,tips:e.tips,deep:e.deep,skin:n(e.skin,1-(1-e.skin)*Math.pow(u.tiers[0].strands/h,.8),e.wires),skinW:e.skinW,back:i.back}),treads:null,lit:void 0,floor:null,open:1,knot:Jr,foot:null}}function Mr(t,o,e){var r=Math.cos(o),a=Math.sin(o),i=t[0]*r+t[2]*a,h=-t[0]*a+t[2]*r,m=Math.cos(e),f=Math.sin(e);return[i,t[1]*m-h*f,t[1]*f+h*m]}function Io(t,o,e){var r=jn(Math.min(t,1),o,e),a=r.v,i=r,h=u.shade,m=u.blueAmt,f=u.body,b=u.pointer,A=Math.min(u.tiers[vt].strands,u.maxStrands),F=1-r.wind;if(oo.time=o,oo.scrollY=zt,oo.q=t,i.rope=null,i.q=t,i.kind=0,i.mix=0,i.shA=i.shB=-1,i.u=null,i.ridge=a.wires,i.rim=a.rim,i.thick=a.thick,i.gain=a.gain,i.skinW=a.skinW,i.tips=a.tips,i.wash=a.wash,i.shade=[n(a.deep,Math.max(a.deep,h.open),F),n(a.skin,1-(1-a.skin)*Math.pow(u.tiers[0].strands/A,.8),a.wires),h.formFloor,n(h.back,Math.max(h.back,.85),F)],i.reach=m.reach*r.outer/.85,i.ring=r.core>.002?{core:r.core,at:[r.vxc[0],r.vxc[1],r.ringZ],turn:[0,0],mouth:r.mouth,outer:r.outer,bloom:a.bloom}:null,i.floors=[r.floor],i.ptsH={share:a.points,size:a.pointSize,amt:1},i.ptsS=null,i.bodyAt=[r.vxc[0],r.vxc[1]],i.turn=a.turn,i.lit=void 0,i.treads=null,i.stations=[0],i.edge=u.edge.hero,t<=1||pt==="hero")return i;var T=u.secs.length-1,z=Math.max(1,Math.min(T-1,Math.floor(t))),C=p(t-z);t>=T&&(z=T-1,C=1);var E=z===1?Yn(r,o):null,w=E||He(z),y=C>0?He(z+1):w;w||(w=y),y||(y=w),i.stations=C>0?[z,z+1]:[z];var $=null,q=u.via[z+1],B=q&&C>0&&w&&y&&w.gid!==y.gid&&vo[z+.5]?He(z+.5):null;if(B&&B.gid===w.gid&&(C<q.at?(y=B,C=C/q.at):(w=B,C=(C-q.at)/(1-q.at),$={span:[0,1],direct:q.direct,stagger:q.stagger})),i.edge=u.edge.page,i.rim=0,i.ridge=1,i.floors=[],i.ring=null,i.ptsH=null,i.core=0,i.wash=0,i.bodyAt=null,i.turn=0,!w)return i.share=0,i.shA=i.shB=0,i.u={},i.ptsS=null,i.view=on(0,0,o),i;var O=x(C),W={},et,X,rt,j={},_=C<1e-5?0:C>1-1e-5?1:C,Y=O,L={pass:0,share:[1,1],open:[1,1],cut:0,knot:[0,1,0,1],foot:null};if(w.gid===y.gid){for(et in w.u)X=w.u[et],rt=y.u[et]||X,W[et]=X===rt?X:[n(X[0],rt[0],O),n(X[1],rt[1],O),n(X[2],rt[2],O),n(X[3],rt[3],O)];w.gid===0&&w!==y&&w.u.uWR&&y.u.uWR&&(W.uWR[2]=n(y.u.uWR[2]+S(w.u.uWR[2]-y.u.uWR[2]),y.u.uWR[2],O)),i.shA=i.shB=w.gid,L.share=[w.look.share,y.look.share],L.open=[n(w.open,y.open,O),1];var Ft=u.cutBy[z+1];L.cut=Math.abs(w.look.share-y.look.share)>1e-4?Ft?p((_-Ft[0])/(Ft[1]-Ft[0])):_:0,Ft&&L.cut>=1&&(L.cut=.99999),L.foot=w.foot===null&&y.foot===null?null:[n(w.foot===null?y.foot:w.foot,y.foot===null?w.foot:y.foot,O),n(w.foot===null?0:w.open,y.foot===null?0:y.open,O)],L.knot=[n(w.knot[0],y.knot[0],O),n(w.knot[1],y.knot[1],O),0,1]}else{for(et in w.u)W[et]=w.u[et];for(et in y.u)W[et]=y.u[et];var Et=$||at<=900&&u.passNarrow[z+1]||u.passBy[z+1]||null,wo=Et&&Et.span?Et.span:[0,1];L.join=Et&&Et.join!==void 0?Et.join:u.rope.pass.join,L.direct=Et&&Et.direct?1:0,L.stagger=Et&&Et.stagger!==void 0?Et.stagger:L.direct?.5:u.rope.pass.stagger,_=p((_-wo[0])/Math.max(1e-4,wo[1]-wo[0])),_=_<1e-5?0:_>1-1e-5?1:_,Y=x(_),i.shA=w.gid,i.shB=y.gid,i.kind=2,i.mix=_,L.pass=_,L.share=[w.look.share,y.look.share],L.open=[w.open,y.open],L.knot=[w.knot[0],w.knot[1],y.knot[0],y.knot[1]];var Go=w.foot===null?0:w.open*(1-x(_/.4)),Xo=y.foot===null?0:y.open*x((_-.6)/.4);L.foot=Go+Xo>0?[(Go*(w.foot||0)+Xo*(y.foot||0))/(Go+Xo),Math.max(Go,Xo)]:null,_===0?(i.shB=w.gid,i.kind=0,L.share[1]=L.share[0],L.open[1]=L.open[0]):_===1&&(i.shA=y.gid,i.kind=0,L.pass=0,L.share[0]=L.share[1],L.open[0]=L.open[1],L.knot=[y.knot[0],y.knot[1],y.knot[0],y.knot[1]])}for(et in u.look)j[et]=n(w.look[et],y.look[et],Y);if(i.u=W,i.look=j,i.share=1,i.thick=j.thick,i.gain=j.gain,i.skinW=j.skinW,i.tips=j.tips,i.shade=[j.deep,j.skin,h.formFloor,j.back],i.view=on(j.yaw,j.pitch,o),(i.shA===0||i.shB===0)&&W.uW0&&W.uWC&&W.uWR&&W.uWB&&W.uW3){var To=E?1-x(C*u.ringOut):1;E&&y!==w&&y.u.uWB&&(W.uWB=[E.u.uWB[0]*To+y.u.uWB[0]*O,W.uWB[1],W.uWB[2],W.uWB[3]]);var me=W.uW3[0],Ze=W.uW0[1],Br=W.uW0[2],Tn=n(Br*W.uW0[3]*.22,W.uW3[1]*f.ringZ,me),Cr=E?E.life:[0,0,0],Lr=y===w?1:1-O;if(i.eye=Zr([W.uWC[0],W.uWC[1]-Lr*Cr[2],W.uWC[2]],Tn,W.uWR[0]-Lr*Cr[0],W.uWR[1]-Lr*Cr[1],me,0),W.uWR=[W.uWR[0]+b.turn[0]*P*k.turnX,W.uWR[1]-b.turn[1]*P*k.turnY,W.uWR[2],W.uWR[3]],i.mouth=n(Ze-Br,W.uW3[2],me),i.outer=n(Ze+Br,W.uW3[1],me),i.core=W.uWB[0],i.reach=Math.max(.01,W.uWB[1]),i.wash=W.uWB[2],i.bodyAt=[W.uWC[0],W.uWC[1]],i.turn=1,i.core>.002){var qr=Mr([0,0,Tn],W.uWR[0],W.uWR[1]);i.ring={core:i.core,at:[W.uWC[0]+qr[0],W.uWC[1]+qr[1],W.uWC[2]+qr[2]],turn:[W.uWR[0],W.uWR[1]],mouth:i.mouth,outer:i.outer,bloom:E?a.bloom*To:0}}E&&To>.002&&i.floors.push({x:r.floor.x,y:r.floor.y,w:r.floor.w,shadow:r.floor.shadow*To,pool:r.floor.pool*To})}[[w,w===y?1:1-O],[y,w===y?0:O]].forEach(function(Je){var ve=Je[0].floor;ve&&Je[1]>.002&&i.floors.push({x:ve[0],y:ve[1],w:ve[2],shadow:(ve[3]||0)*Je[1],pool:(ve[4]||0)*Je[1]})}),E?(i.ptsH={share:a.points,size:a.pointSize,amt:1-O},i.ptsS={share:y.look.points,size:y.look.pointSize,amt:O}):i.ptsS={share:j.points,size:j.pointSize,amt:1},i.rope=Dn(L,o);var Ur=w.i===7?w:y.i===7?y:null;return Ur&&(i.lit=Ur.lit,i.treads=Ur.treads),i}var Jr=[0,1],tn={};function Dn(t,o){var e=u.rope,r=[],a,i,h,m,f=V;for(a=2;a<Te.length;a++)if(Te[a]){try{h=Te[a](oo)}catch(_){tn[a]||(tn[a]=1,R("the way of section "+a+" threw: "+_.message)),h=null}if(h)for(i=0;i<h.length;i++)h[i]&&h[i][0]===h[i][0]&&h[i][1]===h[i][1]&&r.push(h[i])}for(m=r.length,m||(r=[[at*.5,0,0],[at*.5,f,0]],m=2),a=1;a<m;a++)r[a][1]<r[a-1][1]+1&&(r[a]=[r[a][0],r[a-1][1]+1,r[a][2]||0]);var b=Math.max(r[0][1],-e.pad*f),A=Math.min(r[m-1][1],(1+e.pad)*f),F=e.grid[0]*f,T=e.grid[1]*f;if(it&&_t>0?(A=Math.min(r[m-1][1],(1+e.pad)*f+_t),T+=_t):it&&_t<0&&(b=Math.max(r[0][1],-e.pad*f+_t),F+=_t),t.foot&&t.foot[1]>0&&(A=n(A,Math.min(A,Math.max(t.foot[0],b+.3*f)),x(t.foot[1]))),A-b<e.least*f){var z=e.least*f-(A-b);r[m-1][1]>A+1?A+=z:b-=z}function C(_){if(_<=r[0][1])return[r[0][0],r[0][2]||0];if(_>=r[m-1][1])return[r[m-1][0],r[m-1][2]||0];for(var Y=1;r[Y][1]<_;)Y++;var L=x((_-r[Y-1][1])/(r[Y][1]-r[Y-1][1]));return[n(r[Y-1][0],r[Y][0],L),n(r[Y-1][2]||0,r[Y][2]||0,L)]}var E=e.pass,w=e.soft,y=e.len,$=t.join===void 0?E.join:t.join;function q(_){var Y=0,L=!1,Ft=t.pass;if(Ft>0&&t.direct){var Et=x((Ft-_*t.stagger)/(1-t.stagger)),wo=x((1-t.open[0]-_*(1-w))/w),Go=x((1-t.open[1]-_*(1-w))/w);return n(wo+(1-wo)*(1-Math.min(1,t.share[0])),Go+(1-Go)*(1-Math.min(1,t.share[1])),Et)}if(Ft>0){var Xo=_*E.stagger,To=$+Xo;L=Ft>To,Y=L?1-x((Ft-To)/(1-$-E.stagger)):x((Ft-Xo)/$)}var me=L?t.share[1]:t.cut?n(t.share[0],t.share[1],x(t.cut)):t.share[0],Ze=L?t.open[1]:t.open[0];return Y=Math.max(Y,x((1-Ze-_*(1-w))/w)),Y+(1-Y)*(1-Math.min(1,me))}var B=new Float32Array(32);for(i=0;i<8;i++){var O=F+(T-F)*i/7,W=C(O),et=p((O-b)/(A-b)),X=0;for(a=0;a<5;a++)X+=q(p((et-y*a/4)/(1-y)));X/=5,B[i*4]=(W[0]-at/2)/J,B[i*4+1]=W[1],B[i*4+2]=Math.max(e.plyLeast,e.ply*Math.sqrt(X))}var rt=2*Math.PI/e.period,j=(zt+f/2)*rt;return{flat:B,a:[(f/2-F)/J,(f/2-T)/J,e.swing,e.depth],y:[(f/2-b)/J,(f/2-A)/J,y,1],k:[j-2*Math.PI*Math.floor(j/(2*Math.PI)),-rt*J,e.twist,e.sway],s:[t.share[0]>=.9995?2:t.share[0],t.share[1]>=.9995?2:t.share[1],t.open[0],t.open[1]],m:[t.pass,t.pass>0&&t.stagger!==void 0?t.stagger:E.stagger,t.pass>0&&t.direct?1:0,$],tt:[t.cut||0,e.aside,e.slide,t.cut?t.share[1]:0],c:t.knot,soft:w,top:b,foot:A}}function on(t,o,e){var r=u.page,a=u.alive;return s((t+r.viewSway[0]*Math.sin(e*a.viewRate[0]))*P*r.scale,(o+r.viewSway[1]*Math.sin(e*a.viewRate[1]+1.3))*P*r.scale,0,Ot)}function en(t){var o=u.clear,e=[],r,a,i,h,m;for(i=0;i<Ve.length;i++)if(r=Ve[i],!(t.stations.indexOf(r.st)<0&&!(r.st===0&&t.q<=1))&&!(r.fig&&!/(^|\s)gd-in(\s|$)/.test(r.fig.className))&&(h=r.st===0?1-x((t.q-o.heroFrom)/(o.heroUntil-o.heroFrom)):1,!(h<=.002))){a=xr(r.rec,zt);var f=it?-$t:0,b=it?kt-$t:V;if(!(a.t+a.h+o.pad<f||a.t-o.pad>b)){m=(Math.min(b,a.t+a.h)-Math.max(f,a.t))*a.w;var A=r.st===0?o.heroPad:o.pad;e.push({l:a.l-A,t:a.t-A,r:a.l+a.w+A,b:a.t+a.h+A,on:h,area:m})}}return e.sort(function(F,T){return T.area-F.area}),e.slice(0,2)}function Ar(t,o){var e=d.createShader(d.VERTEX_SHADER),r=d.createShader(d.FRAGMENT_SHADER),a=d.createProgram();return d.shaderSource(e,t),d.compileShader(e),d.shaderSource(r,o),d.compileShader(r),d.attachShader(a,e),d.attachShader(a,r),d.linkProgram(a),{p:a,v:e,f:r}}function Gn(t){return!Ct||!!d.getProgramParameter(t.p,Ct.COMPLETION_STATUS_KHR)}function Sr(t){var o=t.p;if(!d.getProgramParameter(o,d.LINK_STATUS))throw new Error(d.getShaderInfoLog(t.v)||d.getShaderInfoLog(t.f)||d.getProgramInfoLog(o)||"program did not link");for(var e={},r=d.getProgramParameter(o,d.ACTIVE_UNIFORMS),a=0;a<r;a++){var i=d.getActiveUniform(o,a);e[i.name]=d.getUniformLocation(o,i.name)}return{p:o,u:e}}function jo(t){var o=d.createBuffer();return d.bindBuffer(d.ARRAY_BUFFER,o),d.bufferData(d.ARRAY_BUFFER,t,d.STATIC_DRAW),o}function xo(t,o,e){d.enableVertexAttribArray(t),d.vertexAttribPointer(t,o,d.FLOAT,!1,0,0),e&&d.vertexAttribDivisor(t,e)}function je(t){var o=ht[t*4+2]*7.31+ht[t*4+3]*3.77;return o-Math.floor(o)}function eo(t,o){var e=t.u[o];return e===void 0&&(e=t.u[o]=d.getUniformLocation(t.p,o)),e}function Yo(t,o){t=t||U[0];var e=Bn(t),r=t.k?String(t.hi):"",a=co+e+$o+Zo,i=Ut+e+$o+(t.form==="rope"?Ro:Eo),h=[{name:"strand"+r,vs:bt.shader?a.replace("void main","void broken("):a,fs:ge,attribs:[[0,2,0],[1,4,1]],blend:!1},{name:"point"+r,vs:i,fs:Po,attribs:[[0,2,0],[1,4,1],[2,4,1]],blend:!0}];return!o&&(t===po||arguments.length===0)&&h.push({name:"glow",vs:No,fs:Ho,attribs:[[0,2,0]],blend:!0}),h}function rn(t,o,e){var r=t.createVertexArray(),a=[],i=e.blend,h,m,f;for(t.useProgram(o),t.bindVertexArray(r),h=0;h<e.attribs.length;h++)m=e.attribs[h],f=t.createBuffer(),a.push(f),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(16),t.STATIC_DRAW),t.enableVertexAttribArray(m[0]),t.vertexAttribPointer(m[0],m[1],t.FLOAT,!1,0,0),m[2]&&t.vertexAttribDivisor(m[0],m[2]);for(i?(t.enable(t.BLEND),i.length?t.blendFunc(i[0],i[1]):t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)):t.disable(t.BLEND),t.viewport(0,0,1,1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,1),t.bindVertexArray(null),t.deleteVertexArray(r),h=0;h<a.length;h++)t.deleteBuffer(a[h])}function Xn(t,o){var e=null;t.onmessage=function(r){var a=r.data,i=performance.now(),h={kind:"done",ok:!1,why:"",programs:[]},m,f,b,A,F;try{if(!e&&(e=new OffscreenCanvas(8,8).getContext("webgl2",a.attrs),b=e&&e.getExtension("WEBGL_debug_renderer_info"),b=e?String(b?e.getParameter(b.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER)):"",e&&a.soft&&new RegExp(a.soft,"i").test(b)&&(e=null),t.postMessage({kind:"ctx",ok:!!e,renderer:b}),!e))return;for(m=0;m<a.items.length;m++)f=a.items[m],f.v=e.createShader(e.VERTEX_SHADER),f.f=e.createShader(e.FRAGMENT_SHADER),f.p=e.createProgram(),e.shaderSource(f.v,f.vs),e.compileShader(f.v),e.shaderSource(f.f,f.fs),e.compileShader(f.f),e.attachShader(f.p,f.v),e.attachShader(f.p,f.f),e.linkProgram(f.p);for(m=0;m<a.items.length;m++){if(f=a.items[m],A=performance.now(),!e.getProgramParameter(f.p,e.LINK_STATUS))throw new Error(f.name+": "+(e.getShaderInfoLog(f.v)||e.getShaderInfoLog(f.f)||e.getProgramInfoLog(f.p)||"did not link"));F=performance.now(),o(e,f.p,f),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array(4)),h.programs.push([f.name,Math.round(F-A),Math.round(performance.now()-F)])}h.ok=!0}catch(T){h.why=String(T&&T.message||T)}h.ms=Math.round(performance.now()-i),t.postMessage(h)}}function nn(t,o,e){return{items:t,done:o,tag:e||null,hold:!1,drop:null,info:{how:"direct",ms:0,waited:0,worker:[],why:""}}}function zr(t,o,e){!e&&(I==="live"||I==="lost")&&tr.push({items:t,done:o}),Dt.push(nn(t,o,e)),Ye()}function Qn(){if(I!=="live"||!so)return!0;var t=performance.now();return xt>2&&ze&&!k.busy&&t-qo>u.warm.quietMs&&t-ne>u.fadeInMs&&t-te>u.groupFadeMs}function $n(){try{return typeof Nt.calm!="function"||!!Nt.calm()}catch{return!0}}function an(t,o,e){var r=null,a="",i=0,h=!1;function m(){clearTimeout(i),r&&(r.onmessage=r.onerror=null,r.terminate(),r=null),a&&(URL.revokeObjectURL(a),a="")}function f(){h||(h=!0,m(),e())}try{if(bt.noworker||!window.Worker||!window.OffscreenCanvas||!window.Blob||!window.URL)throw new Error("no worker");a=URL.createObjectURL(new Blob(["("+Xn.toString()+")(self,"+rn.toString()+")"],{type:"text/javascript"})),r=new Worker(a),r.onmessage=function(b){var A=b.data||{};if(A.kind==="ctx"){A.ok||f();return}A.ok?(o.how="worker",o.worker=A.programs):o.why=String(A.why||""),f()},r.onerror=f,i=setTimeout(f,u.warm.giveUpMs),r.postMessage({attrs:Vr,soft:tt.source,items:t.map(function(b){return{name:b.name,vs:b.vs,fs:b.fs,attribs:b.attribs,blend:b.blend}})})}catch{setTimeout(f,0)}return function(){h=!0,m()}}function sn(t){return t.map(function(o){return o.name+`
`+o.vs+`
`+o.fs}).join(`

`)}function Ye(){if(clearTimeout(ye),ye=0,St||!Dt.length)return;if(!d||I!=="building"&&I!=="live"){Dt=[];return}if(I==="live"&&!$n()||!Qn()&&!(Dt[0].tag&&yo&&!Bo&&xt>2)){ye=setTimeout(Ye,120);return}var t=St=Dt.shift();t.t0=performance.now();function o(){t.hold=!1,t.drop=null,St===t&&(M("warm"),Zn(t))}if(mt&&mt.over&&mt.key===sn(t.items)){t.info.how=mt.info.how,t.info.worker=mt.info.worker,t.info.why=mt.info.why,t.info.early=mt.ms,mt=null,o();return}t.hold=!0,t.drop=an(t.items,t.info,o)}function Zn(t){var o,e={},r=0,a=!1,i=0;try{o=t.items.map(function(h){return Ar(h.vs,h.fs)})}catch(h){Tr(t,null,h.message);return}(function h(){if(Fo=0,!(St!==t||!d)){var m;if(!a){if(Ct){for(m=0;m<o.length;m++)if(!Gn(o[m])){t.info.waited++,Fo=requestAnimationFrame(h);return}}else if(r<o.length&&(d.getProgramParameter(o[r++].p,d.LINK_STATUS),r<o.length)){Fo=requestAnimationFrame(h);return}try{for(m=0;m<o.length;m++)e[t.items[m].name]=Sr(o[m])}catch(f){Tr(t,null,f.message);return}a=!0}if(t.info.how!=="worker"&&i<t.items.length){rn(d,e[t.items[i].name].p,t.items[i]),i++,I==="live"&&lt&&!Xt&&xt>2&&(Do(),It(lt)),Fo=requestAnimationFrame(h);return}Tr(t,e,"")}})()}function Tr(t,o,e){if(St===t){St=null,t.info.ms=Math.round(performance.now()-t.t0),e&&(t.info.why=e);try{typeof t.done=="function"&&t.done(o,t.info)}catch(r){R("warm: "+r.message)}Ye()}}function un(){clearTimeout(ye),ye=0,Fo&&(cancelAnimationFrame(Fo),Fo=0),St&&St.drop&&St.drop(),St=null,Dt=[]}function Jn(){var t=zo(G===null?0:G),o={};U.forEach(function(e){e.strand=e.point=null,e.state!=="failed"&&(e.state="none")}),po=t,Oo="",Yo(t).forEach(function(e){o[e.name]=Sr(Ar(e.vs,e.fs))}),ln(o,t)}function ln(t,o){gt={glow:t.glow},yr(o,t);var e=new Float32Array((yt+1)*4),r;for(r=0;r<=yt;r++)e[r*4]=r,e[r*4+1]=-1,e[r*4+2]=r,e[r*4+3]=1;for(var a=c(77),i=new Float32Array(Yt*4),h=new Float32Array(Yt*4),m=0,f=u.track.count[0][1]/Math.min(u.tiers[0].strands,u.maxStrands)-.04,b={},A=u.tiers.length-1;A>=0;A--){var F=[],T=[],z=Math.min(u.tiers[A].strands,u.maxStrands),C=Math.min(u.tiers[A].points,Yt);for(r=0;r<z;r++)je(r)<f&&(F.push(r),b[r]||T.push(r));for(F.length||F.push(0),r=m;r<C;r++){var E=a(),w=E<.64&&T.length>0,y=w?T.shift():F[Math.floor(a()*F.length)];w&&(b[y]=!0),i.set(ht.subarray(y*4,y*4+4),r*4),h[r*4]=w?1:.2+.72*a(),h[r*4+1]=w?16+10*a():E>.86?8+6*a():5+4*a(),h[r*4+2]=a(),h[r*4+3]=w?0:E>.86?1:2}m=Math.max(m,C)}var $=u.pagePoints[0],q=new Float32Array($*4),B=new Float32Array($*4);for(a=c(77),r=0;r<$;r++){var O=Math.floor(a()*500),W=a()<.35;q.set(ht.subarray(O*4,O*4+4),r*4),B[r*4]=.15+.75*a(),B[r*4+1]=W?14+8*a():5+5*a(),B[r*4+2]=a(),B[r*4+3]=W?0:1}pr=u.tiers.map(function(rt){var j=Math.min(rt.strands,u.maxStrands),_=[],Y,L=new Float32Array(j*4),Ft=new Float32Array(j);for(Y=0;Y<j;Y++)_.push(Y);for(u.sortStrands&&_.sort(function(Et,wo){return je(Et)-je(wo)||Et-wo}),Y=0;Y<j;Y++)L.set(ht.subarray(_[Y]*4,_[Y]*4+4),Y*4),Ft[Y]=je(_[Y]);return{n:j,data:L,picks:Ft}}),Z={strand:[],point:d.createVertexArray(),pointS:d.createVertexArray(),quad:d.createVertexArray()};var et=jo(e);pr.forEach(function(rt){var j=d.createVertexArray();d.bindVertexArray(j),d.bindBuffer(d.ARRAY_BUFFER,et),xo(0,2,0),jo(rt.data),xo(1,4,1),Z.strand.push(j)}),d.bindVertexArray(Z.point);var X=jo(new Float32Array([-1,-1,1,-1,-1,1,1,1]));xo(0,2,0),jo(i),xo(1,4,1),jo(h),xo(2,4,1),d.bindVertexArray(Z.pointS),d.bindBuffer(d.ARRAY_BUFFER,X),xo(0,2,0),jo(q),xo(1,4,1),jo(B),xo(2,4,1),d.bindVertexArray(Z.quad),d.bindBuffer(d.ARRAY_BUFFER,X),xo(0,2,0),d.bindVertexArray(null)}function ta(t){var o=pr[vt];if(t>=.999||!u.sortStrands)return o.n;for(var e=t+.031,r=0,a=o.n,i;r<a;)i=r+a>>1,o.picks[i]<=e?r=i+1:a=i;return r}function Do(){var t=u.tiers[vt];Wt=it?Math.min(window.devicePixelRatio||1,t.dprCap,u.carry.dpr,Math.sqrt(t.pixelCap*u.carry.pixels/Math.max(1,at*kt))):Math.min(window.devicePixelRatio||1,t.dprCap,Math.sqrt(t.pixelCap/Math.max(1,at*V))),uo&&(Wt*=u.gpu.px[Math.min(uo,u.gpu.px.length-1)]);var o=Math.max(1,Math.round(at*Wt)),e=Math.max(1,Math.round((it?kt:V)*Wt));(o!==ut||e!==dt)&&(ut=N.width=o,dt=N.height=e)}function fn(t,o){var e=t.u,r=u.pointer,a=k.finger?r.fingerRadius:r.radius,i=o.u||{},h;d.useProgram(t.p),d.uniform1f(e.uTime,o.time),d.uniform1f(e.uShare,o.share>=.999?2:o.share),d.uniform1f(e.uRidge,o.ridge),d.uniform4fv(e.uHg,o.hg),d.uniform4fv(e.uHg2,o.hg2),d.uniform4fv(e.uHg3,o.hg3),d.uniform4fv(e.uHg4,o.hg4),d.uniform3fv(e.uHg5,o.hg5),d.uniform4fv(e.uOp,o.op),d.uniform4fv(e.uOp2,o.op2),d.uniform4fv(e.uOp3,o.op3),d.uniform4fv(e.uVx,o.vx),d.uniform4fv(e.uVx2,o.vx2),d.uniform4fv(e.uVx3,o.vx3),d.uniform4fv(e.uVx4,o.vx4),d.uniform4fv(e.uVxC,o.vxc),d.uniform1i(e.uShA,o.shA),d.uniform1i(e.uShB,o.shB);var m=o.rope;m&&(d.uniform4fv(eo(t,"uRp[0]"),m.flat),d.uniform4fv(eo(t,"uRpA"),m.a),d.uniform4fv(eo(t,"uRpY"),m.y),d.uniform4fv(eo(t,"uRpK"),m.k),d.uniform4fv(eo(t,"uRpS"),m.s),d.uniform4fv(eo(t,"uRpM"),m.m),d.uniform4fv(eo(t,"uRpT"),m.tt),d.uniform4fv(eo(t,"uRpC"),m.c),d.uniform1f(eo(t,"uRpSoft"),m.soft));for(h in i)d.uniform4fv(eo(t,h),i[h]);d.uniformMatrix4fv(e.uView,!1,o.view),d.uniformMatrix4fv(e.uProj,!1,K),d.uniform4f(e.uStage,2*J/at,o.stageY,0,o.shiftNdc),d.uniform1f(e.uCamD,Ot),d.uniform4f(e.uPtr,k.ax,k.ay,o.ptrA,a),d.uniform4f(e.uPtr2,k.bx,k.by,o.ptrB,a*1.15),d.uniform3f(e.uPtrAmt,r.aside,r.gather,0),d.uniform2f(e.uPulse,o.pulse[0],o.pulse[1]),d.uniform1f(e.uPulseW,r.pulseWidth),d.uniform4fv(eo(t,"uKc[0]"),o.kcRect),d.uniform4f(e.uKcAmt,Math.max(1,(o.q<=1?u.clear.heroSoft:u.clear.soft)*Wt),u.clear.dark,o.kcOn[0],o.kcOn[1])}function De(t,o,e,r,a){var i=gt.glow.u;d.uniform1f(i.uKind,t),d.uniform1f(i.uAmt,o),d.uniform2f(i.uSize,e,r),d.uniform3f(i.uPos,a[0],a[1],a[2]),d.drawArrays(d.TRIANGLE_STRIP,0,4)}function It(t){var o=d,e=u.tiers[vt],r=u.light,a=u.shade,i=u.blueAmt,h=u.blue,m=u.floor,f;if(o.viewport(0,0,ut,dt),o.disable(o.SCISSOR_TEST),o.disable(o.BLEND),o.depthMask(!0),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),!!t){var b=t.G;if(!(!b||b.state!=="ready")){if(!Ln(b,t)){or[b.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]||(or[b.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]=1,R("group "+b.k+" (stations "+b.lo+" to "+b.hi+") cannot draw shapes "+t.shA+" and "+t.shB+" with passage kind "+t.kind+": see CONF.groups"));return}fr=!1;var A=Math.sin(t.time*u.pulse.rate),F=t.time,T=t.fade===void 0?1:t.fade;if(t.shiftNdc=-2*_o/V,t.stageY=2*J/V,it&&(t.stageY=2*J/kt,t.shiftNdc=(kt-V-2*$t-2*_o)/kt),pt==="hero"){var z=Math.max(0,Math.min(dt,Math.round((ft.stageH+_o)*Wt)));o.enable(o.SCISSOR_TEST),o.scissor(0,dt-z,ut,z)}if(t.ptrA=t.quiet?0:k.a,t.ptrB=t.quiet?0:k.b,t.pulse=[-9,-9],!t.quiet)for(f=0;f<to.length&&f<2;f++)t.pulse[f]=-.15+1.35*(F-to[f])/u.pointer.pulse;var C=en(t),E=new Float32Array(8);for(t.kcOn=[0,0],f=0;f<2;f++)if(C[f]){var w=it?kt-$t:V;E.set([C[f].l*Wt,(w-C[f].b)*Wt,C[f].r*Wt,(w-C[f].t)*Wt],f*4),t.kcOn[f]=C[f].on}else E.set(Wn,f*4);for(t.kcRect=E,t.kc=C,o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.disable(o.DEPTH_TEST),o.useProgram(gt.glow.p),o.uniformMatrix4fv(gt.glow.u.uView,!1,t.view),o.uniformMatrix4fv(gt.glow.u.uProj,!1,K),o.uniform4f(gt.glow.u.uStage,2*J/at,t.stageY,0,t.shiftNdc),o.uniform3f(gt.glow.u.uBlue,h[0],h[1],h[2]),o.uniform2f(gt.glow.u.uTurn,0,0),o.bindVertexArray(Z.quad),f=0;f<t.floors.length;f++){var y=t.floors[f];m.shadow*y.shadow>.002&&De(3,m.shadow*y.shadow*T,y.w*1.5,.15,[y.x+.03,y.y-.02,-Ot]),m.pool*y.pool>.002&&De(4,m.pool*y.pool*(.92+.08*A)*T,y.w*1.15,.17,[y.x+y.w*.2,y.y-.05,-Ot])}o.disable(o.BLEND),o.depthMask(!0),o.enable(o.DEPTH_TEST),o.depthFunc(o.LESS),fn(b.strand,t);var $=ta(t.share),q=Math.min(e.segments,yt),B=b.strand.u;if(o.uniform1f(B.uSeg,q),o.uniform1f(B.uWidth,u.width*In()),o.uniform1f(B.uWMul,t.thick),o.uniform1f(B.uMinPx,u.minPx),o.uniform1f(B.uPxUnit,J*Wt),o.uniform1f(B.uCore,t.core),o.uniform1f(B.uBreath,A),o.uniform1f(B.uWave,u.pulse.wave),o.uniform1f(B.uMouth,t.mouth),o.uniform3f(B.uReach,t.reach,i.lean,i.glare),o.uniform1f(B.uWash,t.wash),o.uniform1f(B.uTips,t.tips),o.uniform1f(B.uTipWash,i.tipWash),o.uniform1f(B.uRim,t.rim),o.uniform2f(B.uVar,a.strandVar,a.darkShare),o.uniform1f(B.uExposure,u.exposure*t.gain),o.uniform1f(B.uSkinW,t.skinW),o.uniform1f(B.uGlint,r.glint),o.uniform1f(B.uKick,i.kick),o.uniform1f(B.uArmSide,r.armSide),o.uniform4f(B.uLight,r.key,r.strips,r.fill,r.room),o.uniform4fv(B.uArms,r.arms),o.uniform4fv(B.uShade,t.shade),o.uniform3f(B.uBlue,h[0],h[1],h[2]),o.uniform4f(B.uBlueAmt,i.tint,i.light,i.hot,i.sheen),o.uniform4f(B.uFade,T,t.edge>0?t.edge*Math.min(ut,dt):0,ut,dt),$>0&&(o.bindVertexArray(Z.strand[vt]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,(q+1)*2,$)),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.depthFunc(o.LEQUAL),t.ring&&t.ring.core>.002){var O=t.ring;o.disable(o.DEPTH_TEST),o.useProgram(gt.glow.p),o.bindVertexArray(Z.quad),o.uniform1f(gt.glow.u.uRingR,1/3),o.uniform2f(gt.glow.u.uHaze,i.haze[0],i.haze[1]);var W=t.view,et=O.outer*.9,X=Mr([0,0,et],O.turn[0],O.turn[1]),rt=[O.at[0]+X[0],O.at[1]+X[1],X[2]];O.bloom*i.bloom>.002&&De(4,O.bloom*i.bloom*(.9+.1*A)*T,O.outer*1.05,O.outer*1.05,[W[0]*rt[0]+W[4]*rt[1]+W[8]*rt[2]+W[12],W[1]*rt[0]+W[5]*rt[1]+W[9]*rt[2]+W[13],W[2]*rt[0]+W[6]*rt[1]+W[10]*rt[2]+W[14]]),o.uniform2f(gt.glow.u.uTurn,O.turn[0],O.turn[1]),De(0,O.core*(.94+.06*A)*i.ring*T,O.mouth*3,O.mouth*3,O.at),o.enable(o.DEPTH_TEST)}if(t.ptsH||t.ptsS){fn(b.point,t);var j=b.point.u,_=Math.max(.7,Math.min(1.15,J/420)),Y=[[t.ptsH,Z.point,Math.min(e.points,Yt)],[t.ptsS,Z.pointS,Math.min(u.pagePoints[vt],u.pagePoints[0])]];for(o.uniform2f(j.uRes,ut,dt),o.uniform1f(j.uTravel,u.alive.travel),o.uniform1f(j.uSparkle,t.quiet?0:u.alive.sparkle),o.uniform1f(j.uPtLift,.07),o.uniform1f(j.uRim,t.rim),o.uniform3f(j.uBlue,h[0],h[1],h[2]),f=0;f<2;f++){var L=Y[f][0];!L||L.amt*L.share<=.002||(o.uniform1f(j.uPtShare,L.share),o.uniform1f(j.uPtScale,Wt*_*L.size),o.uniform1f(j.uPointAmt,i.points*L.amt*T),o.bindVertexArray(Y[f][1]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Y[f][2]))}}o.bindVertexArray(null)}}}function Wr(t,o,e){k.cx=t,k.cy=o,k.on=e,qo=performance.now(),wt()}function cn(){return G!==null&&G<1}function oa(t){if(t.pointerType==="touch"){if(!k.down||cn())return;k.finger=!0}else k.finger=!1;Wr(t.clientX,t.clientY,1)}function ea(t){if(!(t.pointerType==="mouse"&&t.button!==0)){if(k.down=!0,k.finger=t.pointerType==="touch",k.downAt=[t.clientX,t.clientY,performance.now()],k.finger&&cn()){qo=performance.now();return}Wr(t.clientX,t.clientY,1)}}function ra(t){var o=k.downAt;k.down&&o&&Math.abs(t.clientX-o[0])+Math.abs(t.clientY-o[1])<12&&performance.now()-o[2]<600&&Er(),k.down=!1,k.downAt=null,t.pointerType==="touch"&&(k.on=0)}function na(){k.down=!1,k.downAt=null,k.on=0}function pn(){k.on=0}function hn(){return!cr&&!/(^|\s)menu-open(\s|$)/.test(Q.className)}function Er(){I!=="live"||!hn()||lo||(to.unshift(bo),to.length>2&&(to.length=2),wt())}function aa(t){var o=u.pointer,e=t/16.667,r=(k.cx-at/2)/J,a=(V/2+_o-k.cy)/J,i=k.cy>=0&&k.cy<=V,h=!i||!hn()?0:k.on;h&&k.a<.004&&k.b<.004&&(k.ax=k.bx=r,k.ay=k.by=a);var m=1-Math.pow(1-o.follow[0],e),f=1-Math.pow(1-o.follow[1],e);h&&(k.ax+=(r-k.ax)*m,k.ay+=(a-k.ay)*m),k.bx+=(k.ax-k.bx)*f,k.by+=(k.ay-k.by)*f;var b=1-Math.pow(1-(h>k.a?o.rise:o.fall),e);k.a+=(h-k.a)*b,k.b+=(k.a-k.b)*(1-Math.pow(1-o.fall*1.6,e));var A=Uo?Math.tanh((k.ax-Uo[0])/1.1):0,F=Uo?Math.tanh((k.ay-Uo[1])/.8):0,T=fe;if(Uo&&T[4]>0){var z=o.eye,C=k.ax-T[0],E=k.ay-T[1],w=Math.hypot(C,E)+1e-9,y=z[0]*Math.tanh(w/z[1])/w,$=Math.asin(l(z[2]*Math.sin(T[2])+y*C,-.9,.9)),q=Math.cos($),B=y*E-z[2]*Math.cos(T[2])*Math.sin(T[3]),O=-Math.asin(l(B/q,-.9,.9));O=-Math.asin(l((B+T[5]*(Math.cos(z[2]*T[3])-Math.cos(O)))/q,-.9,.9)),A=n(A,k.finger?0:($-T[2])/(o.turn[0]*P),T[4]),F=n(F,k.finger?0:(T[3]-O)/(o.turn[1]*P),T[4])}A*=k.a,F*=k.a;var W=1-Math.pow(1-.06,e);for(k.turnX+=(A-k.turnX)*W,k.turnY+=(F-k.turnY)*W,k.busy=Math.abs(h-k.a)>.003||k.b>.003&&Math.abs(k.a-k.b)>.003||h>0&&(Math.abs(r-k.ax)+Math.abs(a-k.ay)>.002||Math.abs(k.ax-k.bx)+Math.abs(k.ay-k.by)>.002)||Math.abs(A-k.turnX)+Math.abs(F-k.turnY)>.003;to.length&&bo-to[to.length-1]>o.pulse*1.1;)to.pop();return oo.ptr.x=k.ax,oo.ptr.y=k.ay,oo.ptr.on=k.a,k.busy||to.length>0}function ia(t,o){var e=!1,r,a,i=1-Math.exp(-t/(u.hoverS*1e3/3));for(r=0;r<3;r++)Math.abs(ce[r]-Ee[r])>.004?(Ee[r]+=(ce[r]-Ee[r])*i,e=!0):Ee[r]=ce[r];for(r=0;r<3;r++){var h=0;o>5&&o<7&&mr[r]&&(h=parseFloat(mr[r].style.getPropertyValue("--b"))||0),h!==vr[r]&&(vr[r]=h,e=!0)}for(r in _e)a=_e[r],Math.abs(a.to-a.v)>.001?(a.v+=(a.to-a.v)*(1-Math.exp(-t/(a.s*1e3/3))),e=!0):a.v=a.to;return e}function Ge(t){if(t!==Re){for(var o=0;o<3;o++){var e=jr[o];e&&(o<t?e.getAttribute("data-scene-lit")!=="1"&&e.setAttribute("data-scene-lit","1"):e.hasAttribute("data-scene-lit")&&e.removeAttribute("data-scene-lit"))}Re=t}}function Xe(t){if(Uo=t.bodyAt&&t.turn>0?t.bodyAt:null,fe=t.eye,pt==="page"){if(t.lit!==void 0){Pe=!0,Ge(Math.max(0,Math.min(3,Math.round(t.lit))));return}if(Pe===void 0&&vo[7]){var o=He(7);Pe=!!(o&&o.lit!==void 0)}Pe&&(t.q>=8?Ge(3):t.q<=6&&Ge(0))}}function dn(t){var o=zo(G),e;return o.state==="ready"?(yo&&(yo=!1,Bo&&Qt!==null&&Math.abs(o.k-zo(Qt).k)<=1?G=Qt:xt>2&&(te=t),Bo=!1,o=zo(G)),{q:G,G:o}):(Vn(o),e=qn(G),e&&!sa(e.q,zt)&&(e=null),yo=!0,Bo=!!e,e||{q:G,G:null})}function sa(t,o){var e,r,a=.35*V,i;if(t<=1)e=ft.top,r=ft.top+ft.h;else{if(e=Lt[t],e==null)return!0;for(r=Me+Gt,i=t+1;i<Lt.length;i++)if(Lt[i]!==null&&Lt[i]!==void 0){r=Lt[i];break}}return r+a>o&&e-a<o+V}function ua(){var t=Tt.get("scene-carry");return pt==="page"&&(t==="1"||t!=="0"&&!!window.matchMedia&&window.matchMedia("(hover: none) and (pointer: coarse)").matches)}function la(t){if(t<Oe)return!0;for(var o=0;o<ao.length;o++)if(t>=ao[o][0]&&t<=ao[o][1])return!0;return!1}function Qe(t,o){var e=u.carry,r=Ht,a=Mt;if(la(t))return o!==null&&(ho=0,Ae=t),$t=0,_t=0,Ht!=="f"&&(Ht="f",Mt=null,N.style.position="fixed",N.style.top="0px"),r!==Ht;var i=kt-V,h=Math.max(0,re-kt);o!==null&&(ho=Ae===null||!o?0:.5*ho+.5*(t-Ae)/o,Ae=t);var m=Math.abs(ho)>e.slow,f=m?ho>0?t-e.back:t-i+e.back:t-i/2,b=Math.round(Math.min(h,Math.max(0,f))),A=m?e.step:Math.abs(ho)<.02?i/4:i/2-e.near;(Mt===null||Mt>h||b!==Mt&&Math.abs(f-Mt)>A)&&(Mt=b,Ht!=="a"&&(Ht="a",N.style.position="absolute"),(Mt!==a||r!=="a")&&(N.style.top=Mt+"px")),$t=t-Mt;var F=Math.max(-1,Math.min(1,ho*e.lead/Math.max(1,i-e.back)))*(i-e.back);return o!==null&&(_t+=(F-_t)*(o?1-Math.pow(1-.2,o/16.667):1),Math.abs(_t)<.5&&F===0&&(_t=0)),r!==Ht||Mt!==a}function fa(t){return it&&Ht==="a"&&Mt!==null&&(t<Mt||t+V>Mt+kt)}function wt(){I==="live"&&!so&&!document.hidden&&(so=requestAnimationFrame(Pr))}function Rr(){so&&cancelAnimationFrame(so),so=0,io=0,$e()}function ca(t){if(document.hidden)return"hidden";var o=Q.className;if(/(^|\s)wk-open(\s|$)/.test(o))return"project";if(/(^|\s)offer-open(\s|$)/.test(o))return"offer";if(u.sleepUnderMenu&&/(^|\s)menu-open(\s|$)/.test(o))return"menu";if(pt==="hero")return t>=ft.top+ft.h?"stage-out":"";if(We){var e=u.proof,r=Dr(We,t)-t,a=r+We.h,i=e.whole?0:e.melt;if((Math.min(a-i,V)-Math.max(r+i,0))/V>=e.cover)return"proof"}return""}function mn(t){if(Q.classList.add("scene-on"),ne=t,M("on"),!Jo&&(Jo=!0,typeof Nt.onReady=="function"))try{Nt.onReady()}catch{}}function Pr(t){if(St&&St.hold&&I==="live"&&!bt.nohold){io=0,so=requestAnimationFrame(Pr);return}if(xt>2){vn(t);return}var o=performance.now();vn(t),Vt.frames.push(+(performance.now()-o).toFixed(1))}function vn(t){if(so=0,!(I!=="live"||document.hidden)){var o=io?Math.min(100,t-io):16.667,e=io?t-io:0;if(io=t,Ce++,Le=!1,e>3&&e<100&&(Se+=(e-Se)*Math.max(.12,1/(rr+4)),rr++),no&&Ko(),typeof Nt.before=="function")try{Nt.before(t)}catch{}var r=window.scrollY,a=r!==zt,i=Math.abs(r-zt)>u.jump.windows*V;zt=r,_o=pt==="hero"?Math.min(0,ft.top+ft.h-r-ft.stageH):0;var h=D?"":ca(r);if(h){if(h==="proof"&&(lo!=="proof"||fa(r))&&xt>2&&!Xt){it&&Qe(r,0),Do(),Jt=G=Ie(r);var m=dn(t),f=Io(m.q,bo,Be);f.G=m.G,f.fade=1,Qt=m.q,Xe(f),It(f),xt++,Le=!0,lt=f}h==="stage-out"&&lo!=="stage-out"&&xt>2&&!Xt&&(Do(),It(null)),h==="stage-out"&&xt<2&&!Xt&&(Do(),It(null),xt=3,mn(t-u.fadeInMs-1)),lo=h,Mo=!0,io=0,$e();return}lo="",ma(t),Do();var b=it?Qe(r,e):!1;Jt=D?D.q:Ie(r),G===null||Mo||D||i&&Math.abs(Jt-G)>u.jump.stations||Jt<=1&&G<=1?G=Jt:(G+=(Jt-G)*(1-Math.pow(1-u.smooth,Se/16.667)),Math.abs(Jt-G)<2e-4&&(G=Jt)),Mo=!1;var A=D?null:dn(t);ze=G===Jt;var F,T=!ze||a,z=1;if(D?(F=Io(D.q,D.t),F.quiet=!0,F.G=Qr(D.q)):(bo+=o/1e3,G>=u.swirl.gate[1]&&(Be+=u.body.spin*o/1e3),aa(o)&&(T=!0),ia(o,G)&&(T=!0),F=Io(A.q,bo,Be),F.G=A.G,ne?(z=p((t-ne)/u.fadeInMs),z<1&&(T=!0)):z=0,te&&t-te<u.groupFadeMs&&(z=Math.min(z,p((t-te)/u.groupFadeMs)),T=!0)),F.fade=z,Qt=D?D.q:A.q,Xe(F),yo&&!D&&!F.G&&xt>2){!fr&&!Xt&&(It(null),fr=!0),lo="waiting",Mo=!0,io=0,lt=F;return}var C=t-qo>u.idleAfterMs,E=sr!==null?sr:vt>0||C?u.idleEvery:1,w=Xt||!D&&!T&&!b&&xt>2&&(E===0||E>1&&Ce%E!==0);if(Xt&&!ur&&(It(null),ur=!0),w||(It(F),xt++,Le=!0,xt===1&&M("frame"),xt===2&&(mn(t),pt==="page"&&setTimeout(br,0)),D||da()),lt=F,!D&&!(it&&(a||!ze)&&!le)&&ha(le||e),I==="live"){if(D&&xt>2){io=0;return}so=requestAnimationFrame(Pr)}}}function pa(){if(I==="live"){var t=Ko();if(t){var o=it&&!lo&&!Xt&&lt&&xt>2?Qe(zt,null):!1;if((Le||o)&&lt&&!Xt){var e=D?Io(D.q,D.t):Io(Qt===null?0:Qt,bo,Be);e.quiet=lt.quiet,e.fade=lt.fade,e.G=lt.G,Do(),Xe(e),It(e),lt=e}wt()}}}function xn(){return{warm:0,list:[],cool:0,recent:[],calm:0,upped:!1}}function ha(t){if(t&&(ot.recent.push(t),ot.recent.length>60&&ot.recent.shift(),!(lr&&!le))){if(ot.cool>0){ot.cool--;return}if(ot.warm<u.warmup){ot.warm++;return}if(ot.list.push(t),!(ot.list.length<u.window)){var o=v(ot.list);if(ot.list=[],o>u.slowMs){if(ot.cool=u.cooldown,ot.calm=0,ot.upped&&(Lo.fails++,ot.upped=!1),vt<u.tiers.length-1){vt++,ut=dt=0;return}de("too-slow");return}if(o>u.fastMs){ot.calm=0;return}ot.calm+=u.window,!(ot.calm<u.calm*Math.pow(2,Lo.fails))&&(ot.calm=0,ot.upped=!1,vt>qe&&Lo.fails<u.retries&&gn(performance.now())&&(vt--,ut=dt=0,ot.upped=!0,se=!0,ko=performance.now()))}}}function da(){if(!(!d||I!=="live"||it||xt<u.gpu.afterDrawn)){if(ue){++ae>=u.gpu.every&&(ae=0,wn(ue,performance.now()));return}if(!(Zt||St)&&!(++ae<u.gpu.every)){ae=0;try{Zt=d.fenceSync(d.SYNC_GPU_COMMANDS_COMPLETE,0),d.flush()}catch{Zt=null}Kr=Ce,nr=!1}}}function ma(t){if(Zt){if(St){$e();return}var o=Ce-Kr,e=!1;try{e=d.getSyncParameter(Zt,d.SYNC_STATUS)===d.SIGNALED}catch{e=!0,nr=!0}if(!(!e&&o<u.gpu.giveUp)){try{d.deleteSync(Zt)}catch{}Zt=null,nr||wn(o,t)}}}function $e(){if(Zt&&d)try{d.deleteSync(Zt)}catch{}Zt=null,ae=0}function gn(t){return t-ko>=u.gpu.calmMs*Math.pow(2,Lo.fails)}function wn(t,o){var e=u.gpu,r=t>=e.behind,a,i=0;if(ar=t,!(lr&&!ue)){if(ko||(ko=o),ie>0){ie--,r&&(ko=o);return}for(Co.push(r?1:0),Co.length>e.of[1]&&Co.shift(),a=0;a<Co.length;a++)i+=Co[a];if(r&&(ko=o),i>=e.of[0]){Co=[],ie=e.cool,se&&(Lo.fails++,se=!1),uo<e.px.length-1?(uo++,ut=dt=0,H.push("gpu behind ("+t+" frames): pixels x "+e.px[uo])):vt<u.tiers.length-1&&(vt++,ut=dt=0,ot.calm=0,H.push("gpu behind ("+t+" frames): tier "+vt));return}r||!gn(o)||(se=!1,uo>0&&vt<=qe&&Lo.fails<u.retries&&(uo--,ut=dt=0,se=!0,ko=o,ie=e.cool,H.push("gpu calm: pixels x "+e.px[uo])))}}var Nr="position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;display:block",va="html.scene-on .stage{background:transparent}html.scene-on .stage .poster,html.scene-on .stage .hero-video,html.scene-on .stage.video-ready .hero-video,html.scene-on .stage.rev-on .hero-video.rev{opacity:0}html.scene-on .stage .poster{visibility:hidden;transition:opacity 1.1s var(--ease),visibility 0s linear 1.1s}html.scene-on .stage .hero-video{visibility:hidden}html.scene-on .stage .scrim{display:none}html.scene-on body:not(.bg-on) .bg-wrap{transition-duration:.12s}";function xa(){var t=parseInt(Tt.get("scene-tier"),10);if(bt.tier!==void 0)return bt.tier;if(t>=0&&t<u.tiers.length)return t;var o=window.matchMedia&&(window.matchMedia("(max-width: 820px)").matches||window.matchMedia("(pointer: coarse)").matches);return o?1:0}function yn(t){return I!=="off"&&Fe(),Nt=t||{},pt=Nt.mode==="hero"?"hero":"page",oe="",M("start"),Vt={begin:0,send:0,waited:0,take:0,frames:[]},wa(),mt&&!mt.over?(I="building",mt.then=function(){I==="building"&&!d&&bn()},!0):bn()}function bn(){var t=performance.now(),o=window.scrollY;N=document.createElement("canvas"),N.className="sfs-scene",N.setAttribute("aria-hidden","true"),N.style.cssText=Nr,it=ua(),kt=0,$t=0,Mt=null,Ht="",ho=0,Ae=null,_t=0,ao=[],it&&(N.style.cssText=Nr.replace(/height:100(l?vh)/g,"height:calc(100$1 + "+u.carry.extra+"px)"),Ht="f");var e=document.querySelector(".env");if(e&&e.parentNode?e.parentNode.insertBefore(N,e.nextSibling):document.body.insertBefore(N,document.body.firstChild),d=bt.nogl?null:N.getContext("webgl2",Vr),!d)return Mn(),de("no-webgl2");Pt=d.getExtension("WEBGL_lose_context");var r=d.getExtension("WEBGL_debug_renderer_info");if(er=String(r?d.getParameter(r.UNMASKED_RENDERER_WEBGL):d.getParameter(d.RENDERER)),bt.software||tt.test(er))return Fe(),de("software-renderer");if(Ct=d.getExtension("KHR_parallel_shader_compile"),Vt.context=+(performance.now()-t).toFixed(1),$r(pt==="hero"?null:window.__sceneShapes),N.addEventListener("webglcontextlost",An),N.addEventListener("webglcontextrestored",Sn),pt==="hero"&&!document.getElementById("sfs-scene-style")&&(Bt=document.createElement("style"),Bt.id="sfs-scene-style",Bt.textContent=va,document.head.appendChild(Bt)),qe=xa(),vt=qe,xt=0,ne=0,ut=dt=0,G=null,no=!0,ee="",Ao={},Vo={},Re=-1,Pe=void 0,qo=performance.now(),ot=xn(),Lo={fails:0},lo="",Mo=!1,Xt=!1,Jo=!1,Zt=null,ae=0,Co=[],ie=0,uo=0,ko=0,ar=0,se=!1,Se=16.667,rr=0,Qt=null,yo=!1,Bo=!1,te=0,po=U[0],pt==="page"&&!be&&o>2*window.innerHeight){try{Ko(),zt=o,he(),po=zo(Ie(o))}catch{po=U[0]}no=!0,ee=""}return I="building",kn(),Vt.begin=+(performance.now()-t).toFixed(1),!0}function ga(t){if(!(!(window.GestureEvent||bt.prepare)||I!=="off"||mt||bt.nogl||bt.software||bt.noworker)){pt=t&&t.mode==="hero"?"hero":"page",$r(pt==="hero"?null:window.__sceneShapes),po=U[0];var o=Yo(),e=performance.now(),r={key:sn(o),over:!1,then:null,drop:null,ms:0,info:{how:"direct",worker:[],why:""}};mt=r,r.drop=an(o,r.info,function(){if(r.over=!0,r.ms=Math.round(performance.now()-e),M("prepared"),r.then){var a=r.then;r.then=null,a()}})}}function kn(){if(I==="building"){var t=performance.now(),o=po,e=Yo(o);Vt.send=+(performance.now()-t).toFixed(1),zr(e,function(r,a){if(I==="building"){if(Vt.warm=a,Vt.waited=a.waited,!r){if(o!==U[0]&&!bt.shader){o.state="failed",R("the programs of stations "+o.lo+" to "+o.hi+" did not link: "+a.why),po=U[0],kn();return}R(a.why),Fe(),de("shader-failed");return}var i=performance.now();ln(r,o),Vt.take=+(performance.now()-i).toFixed(1),M("built"),I="live",wt()}},o)}}function Mn(){N&&N.parentNode&&N.parentNode.removeChild(N),N=null,d=null,gt=null,Z=null,Pt=null,Ct=null,Ht="",Mt=null,$t=0}function Fe(){Rr(),clearTimeout(ir),un(),tr=[],mt&&mt.then&&(mt.then=null,mt.over||(mt.drop(),mt=null)),N&&(N.removeEventListener("webglcontextlost",An),N.removeEventListener("webglcontextrestored",Sn)),d&&Pt&&!d.isContextLost()&&Pt.loseContext(),Mn(),Bt&&Bt.parentNode&&Bt.parentNode.removeChild(Bt),Bt=null,/(^|\s)scene-on(\s|$)/.test(Q.className)&&Q.classList.remove("scene-on"),Re>0&&Ge(0),I="off",D=null,lt=null,U.forEach(function(t){t.strand=t.point=null,t.state!=="failed"&&(t.state="none")}),ke=!1,Oo="",yo=!1,Bo=!1}function de(t){if(I!=="off"&&Fe(),oe=t,typeof Nt.onFail=="function")try{Nt.onFail(t)}catch{}return!1}function An(t){t.preventDefault(),t.target===N&&(Rr(),un(),I="lost",oe="context-lost",it&&Ht==="a"&&(Mt=0,N.style.top="0px"),U.forEach(function(o){o.strand=o.point=null,o.state!=="failed"&&(o.state="none")}),ke=!1,ir=setTimeout(function(){I==="lost"&&de("context-lost")},u.lostWaitMs))}function Sn(t){if(t.target===N){clearTimeout(ir),Pt=d.getExtension("WEBGL_lose_context")||Pt,Ct=d.getExtension("KHR_parallel_shader_compile");try{Jn()}catch{return de("shader-failed")}I="live",oe="",xt=0,ne=0,ut=dt=0,Mo=!0,wt(),tr.forEach(function(o){Dt.push(nn(o.items,o.done))}),Ye(),pt==="page"&&setTimeout(br,0)}}function go(){no=!0,wt()}function Hr(){qo=performance.now()}function Fr(t){var o=t&&t.closest?t.closest("#services .cards .card"):null;return o?Yr.indexOf(o):-1}function wa(){if(!_r){_r=!0;var t={passive:!0};dr=new WeakSet,Ue=new WeakMap,window.ResizeObserver&&(hr=new ResizeObserver(pa)),window.MutationObserver&&(Ir=new MutationObserver(function(){wt()}),Ir.observe(Q,{attributes:!0,attributeFilter:["class"]})),window.addEventListener("scroll",function(){qo=performance.now(),wt()},t),window.addEventListener("resize",function(){Ue=new WeakMap,go()},t),window.addEventListener("load",go,t),window.addEventListener("pageshow",go,t),document.addEventListener("visibilitychange",function(){document.hidden?Rr():(Mo=!0,wt())}),document.fonts&&(document.fonts.ready&&document.fonts.ready.then(go),document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",go)),document.addEventListener("toggle",function(o){go(),o.target&&o.target.closest&&o.target.closest("#faq")&&G>9.5&&G<10.5&&Er()},!0),document.addEventListener("click",function(o){o.target&&o.target.closest&&o.target.closest('[role="tab"]')&&go()},t),document.addEventListener("load",function(o){o.target&&o.target.tagName==="IMG"&&/gd-img/.test(o.target.className)&&go()},!0),window.addEventListener("pointermove",oa,t),window.addEventListener("pointerdown",ea,t),window.addEventListener("pointerup",ra,t),window.addEventListener("pointercancel",na,t),document.addEventListener("pointerleave",pn,t),window.addEventListener("blur",pn),window.addEventListener("keydown",Hr,t),window.addEventListener("wheel",Hr,t),window.addEventListener("touchstart",Hr,t),document.addEventListener("pointerover",function(o){for(var e=Fr(o.target),r=0;r<3;r++)ce[r]=r===e?1:0;e>=0&&wt()},t),document.addEventListener("focusin",function(o){var e=Fr(o.target);e>=0&&(ce[e]=1,wt()),cr=!!(o.target&&o.target.closest&&o.target.closest("#start form"))},t),document.addEventListener("focusout",function(o){var e=Fr(o.target);e>=0&&(ce[e]=0,wt()),cr=!1},t)}}function zn(){var t=new Uint8Array(ut*dt*4);return d.readPixels(0,0,ut,dt,d.RGBA,d.UNSIGNED_BYTE,t),t}function ya(){for(var t=zn(),o=2166136261,e=0;e<dt;e+=3)for(var r=e*ut*4,a=r+ut*4;r<a;r+=12)o^=t[r],o=Math.imul(o,16777619),o^=t[r+1],o=Math.imul(o,16777619),o^=t[r+2],o=Math.imul(o,16777619),o^=t[r+3],o=Math.imul(o,16777619);return(o>>>0).toString(16)}function Or(t,o){no&&Ko(),zt=window.scrollY,_o=pt==="hero"?Math.min(0,ft.top+ft.h-zt-ft.stageH):0,it&&Qe(zt,0),Do();var e=Io(t,o);return e.quiet=!0,e.fade=1,e.G=Qr(t),Qt=t,Xe(e),It(e),lt=e,e}var st={start:function(t){return yn(t)},prepare:ga,stop:function(){I!=="off"&&Fe(),oe="stopped"},refresh:go,busy:function(){return!!(St&&St.hold)||!!(mt&&!mt.over)},state:function(){var t=u.tiers[vt]||{};return{mode:I,scene:pt,reason:oe,tier:vt,q:G===null?null:+G.toFixed(4),target:+Jt.toFixed(4),station:G===null?null:Math.round(G),drawing:!!so&&!lo&&!Xt,sleeping:lo,frameMs:+v(ot.recent).toFixed(2),settled:ze,pinned:!!D,warming:St?St.hold?"worker":"own":Dt.length?"waiting":"",renderer:er,ratio:+Wt.toFixed(3),size:[ut,dt],unit:+J.toFixed(1),strands:t.strands,segments:t.segments,drawn:xt,startMs:Vt,parallel:!!Ct,time:+bo.toFixed(3),lit:Re,files:mo.map(function(o){return o.id}),shapes:Kt.map(function(o){return o.fn}),stations:vo.map(function(o,e){return o?o.file.id:e<2?"engine":null}),pointer:[+k.ax.toFixed(3),+k.ay.toFixed(3),+k.a.toFixed(3),+k.b.toFixed(3)],turn:[+k.turnX.toFixed(3),+k.turnY.toFixed(3)],pulses:to.length,eye:Uo&&fe?[+(at/2+fe[0]*J).toFixed(1),+(V/2+_o-fe[1]*J).toFixed(1),fe[4]]:null,groups:U.map(function(o){return{from:o.lo,to:o.hi,shapes:(o.hero?["heroCurve"]:[]).concat(o.ids.map(function(e){return Kt[e]?Kt[e].fn:String(e)})),form:o.form,state:o.state,ms:o.info?o.info.ms:null,how:o.info?o.info.how:null,waited:o.info?o.info.waited:null,worker:o.info?o.info.worker:null}}),carry:it?{top:Ht==="a"?Mt:null,held:Ht==="f",off:$t,canvasH:kt,windowH:V,docH:re,speed:+ho.toFixed(3),lead:Math.round(_t),heroHold:Math.round(Oe),holds:ao}:null,live:Oo?Oo.split(",").map(Number):[],drawQ:Qt===null?null:+Qt.toFixed(4),standIn:yo,standSeen:Bo,px:uo,lag:ar,pace:+Se.toFixed(2)}}};nt&&(st.conf=u,st.log=function(){return H.slice()},st.programs=function(){return Yo()},st.warm=function(t,o){zr(t,o)},st.groupPrograms=function(){return he(),U.map(function(t){return Yo(t,!0)})},st.groupsAsk=function(t){if(t&&t.length){he(),t.forEach(function(o){U[o]&&U[o].state==="none"&&kr(U[o])});return}bt.nogroups=!1,br()},st.qAt=function(t){if(no&&N&&Ko(),t===void 0)return Ie(window.scrollY);var o=ft.h-Gt,e=o>1?p((t-ft.top)/o):0;return pt==="hero"||e<1||t<=pe()?e:gr(t)},st.dump=function(t,o){if(I!=="live")return null;no&&Ko(),zt=window.scrollY;var e=Io(+t,o===void 0?bo:+o),r=en(e),a=e.rope?{flat:Array.prototype.slice.call(e.rope.flat),a:e.rope.a,y:e.rope.y,k:e.rope.k,s:e.rope.s,m:e.rope.m,tt:e.rope.tt,c:e.rope.c,soft:e.rope.soft,top:e.rope.top,foot:e.rope.foot}:null;return{q:e.q,scrollY:zt,shA:e.shA,shB:e.shB,kind:e.kind,mix:e.mix,rope:a,u:e.u,share:e.share,thick:e.thick,gain:e.gain,tips:e.tips,shade:e.shade,core:e.core,wash:e.wash,floors:e.floors,ring:e.ring,ptsH:e.ptsH,ptsS:e.ptsS,lit:e.lit,treads:e.treads,kc:r,layout:ee.length+":"+ee.slice(-60)}},st.still=function(t,o){return I!=="live"?null:(D={q:+t,t:+o||0},Or(D.q,D.t),G=Jt=D.q,wt(),ya())},st.release=function(){D=null,G=null,wt()},st.grid=function(t,o){if(I!=="live"||!lt)return null;It(lt);for(var e=zn(),r=[],a=ut/t,i=dt/o,h=0;h<o;h++)for(var m=0;m<t;m++){for(var f=[0,0,0,0],b=0,A=Math.floor(h*i);A<(h+1)*i;A+=2)for(var F=Math.floor(m*a);F<(m+1)*a;F+=2){var T=(A*ut+F)*4;f[0]+=e[T],f[1]+=e[T+1],f[2]+=e[T+2],f[3]+=e[T+3],b++}r.push(f[0]/b,f[1]/b,f[2]/b,f[3]/b)}return r},st.pixels=function(t,o,e,r){if(I!=="live"||!lt)return null;It(lt);var a=Math.max(0,Math.round(t*Wt)),i=Math.max(0,Math.round(((it?kt-$t:V)-o-r)*Wt)),h=Math.max(1,Math.min(ut-a,Math.round(e*Wt))),m=Math.max(1,Math.min(dt-i,Math.round(r*Wt))),f=new Uint8Array(h*m*4);return d.readPixels(a,i,h,m,d.RGBA,d.UNSIGNED_BYTE,f),{w:h,h:m,data:Array.prototype.slice.call(f)}},st.force=function(t){if(t==="lost"||t==="restore"){Pt&&(t==="lost"?Pt.loseContext():Pt.restoreContext());return}if(t==="slow"){le=55,ot.warm=u.warmup,ot.cool=0,D=null,wt();return}if(t==="gpuslow"){ue=3,ie=0,$e(),D=null,wt();return}if(t==="steady"){le=0,ue=0;return}le=0,ue=0,bt={};var o=/^tier(\d)$/.exec(t||"");return o?bt.tier=+o[1]:t&&t!=="auto"&&(bt[t]=!0),yn(Nt)},st.point=function(t,o,e){k.finger=!1,Wr(t,o,e===!1?0:1)},st.pulse=Er,st.bench=function(t,o){if(I!=="live")return null;o=o||40;var e=new Uint8Array(4),r=Or(t,1);d.readPixels(0,0,1,1,d.RGBA,d.UNSIGNED_BYTE,e);for(var a=performance.now(),i=0;i<o;i++)r.time=1+i*.016,It(r);return d.finish(),d.readPixels(0,0,1,1,d.RGBA,d.UNSIGNED_BYTE,e),(performance.now()-a)/o},st.hold=function(t){lr=t!==!1},st.rate=function(t){sr=t==null?null:+t,wt()},st.hide=function(t){Xt=!!t,ur=!1,Mo=!0,wt()},st.tread=function(t){var o=lt&&lt.treads;return o&&o[t-1]!==void 0?{y:o[t-1],scrollY:zt}:null},st.keepClear=function(){return lt&&lt.kc?lt.kc.map(function(t){return{l:t.l,t:t.t,r:t.r,b:t.b,on:t.on}}):[]},st.anchor=function(t,o){return no&&N&&Ko(),{scrollY:zt,box:Ke(t,o)||null}},st.snapshot=function(t,o){return I!=="live"||!lt?null:(It(lt),N.toDataURL(t||"image/png",o||.9))},st.poster=function(t,o,e,r){if(I!=="live")return null;var a=typeof t=="number"?t:u.stills[t];if(a===void 0)return null;var i=D;D={q:a,t:e===void 0?u.calmTime:e},Or(D.q,D.t);var h=Math.min(1600,Math.round(o||1600),ut),m=Math.round(h*dt/ut),f=document.createElement("canvas");f.width=h,f.height=m;var b=f.getContext("2d");b.imageSmoothingQuality="high",b.drawImage(N,0,0,h,m);var A=f.toDataURL("image/webp",r||.8);return D=i,wt(),{name:String(t),q:a,url:A,w:h,h:m,bytes:Math.round((A.length-23)*.75)}}),window.__scene=st,(function(){var t=Tt.get("scene-force");if(t&&nt){var o=/^tier(\d)$/.exec(t);o?bt.tier=+o[1]:bt[t]=!0}})()})();
