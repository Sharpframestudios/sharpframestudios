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
}`,u=Math.PI/180,Ct={loop:.75,fan:.4,arcs:.55};function It(n,l){return jt(n,l)+.06*n.cssW}function fo(n,l){var p=n.box("#portrait"),v=l.t-.3*n.cssH;return p?Math.max(v,Math.min(p.b+.12*n.U,l.t-.12*n.cssH)):v}function jt(n,l){return n.narrow()?Math.max(9,.5*l):Math.max(30,.5*l)}function ro(n){var l=n.box("#portrait")||n.NONE,p=n.box("#studio")||n.NONE,v=n.narrow(),g=v?Math.min(.56*l.h,.66*n.cssW):Math.min(.6*l.h,Math.max(.5*l.h,(l.cx-14)/.845)),x=l.cy-10,S=(v?.97:.8)*g,k=[],W,H=l.cx,K=0,B=0;!v&&g>1&&(K=l.r+.092*n.U,B=n.clamp01((.2*n.cssH/g-.8)/.15)*n.clamp01((K-(H+S))/(.02*n.U))*Math.max(n.sstep((n.q-2)/.25),1-n.open(x-.95*g,x+.95*g)));var tt=function(yt){return B>0?n.lerp(yt,Math.max(yt,K),B):yt};if(n.q<2){var Q=n.sstep(n.clamp01(n.q-1)),At=.365*n.U;H=n.lerp(n.cssW/2,H,Q),x=n.lerp(n.cssH/2-.03*n.U,x,Q),S=n.lerp(At,S,Q),g=n.lerp(At,g,Q)}if(v){var Wt=jt(n,p.l+20);for(W=-.72;W<=.73;W+=.36)k.push([Math.max(Wt,H-S*Math.sqrt(1-W*W)),x+W*g,.02]);k.push([Math.max(Wt,H-.42*S),x+.93*g,.02])}else{for(W=-.72;W<=.73;W+=.36)k.push([tt(H+S*Math.sqrt(1-W*W)),x+W*g,.02]);k.push([tt(H+.42*S),x+.93*g,.02])}if(v){var Tt=n.box("#studio .studio-copy");return k.push([jt(n,p.l+20),Math.max(x+1.25*g,(Tt?Tt.b:p.b-120)-.02*n.cssH),0]),k}var nt=Math.max(x+1.25*g,p.b-20);if(B>0){var ht=n.box("#services .sec-head");ht&&(nt=n.lerp(nt,Math.min(nt,Math.max(x+1.25*g,fo(n,ht))),B))}return k.push([n.cssW*.3,nt,0]),k}function Go(n){var l=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),v=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,g=n.narrow(),x=n.cssH,S=p[0]||n.NONE,k=jt(n,l.l);return[[g?k:n.cssW*.3,g?l.t-.22*x:fo(n,l),0],[k,S.t+60,-.05],[k,v.t-20,-.05],[v.l+.16*v.w,v.b+14,-.02]]}function Eo(n){var l=n.box("#film .sec-head")||n.NONE,p=n.box("#film .films .player",!0);p.length||(p=n.box("#film .player",!0));var v=p[0]||n.NONE,g=p.length?p[p.length-1].b:v.b;if(n.narrow()){var x=Math.max(-6,Math.min(jt(n,l.l),l.l-.072*n.U-2));return[[x,l.t-90,-.03],[x,g+40,-.03]]}return[[n.cssW/2,l.t-90,-.03],[n.cssW/2,g+40,-.03]]}function de(n){var l=n.box("#wkStage")||n.NONE,p=n.narrow()?jt(n,(n.box("#work .sec-head")||n.NONE).l):n.cssW/2;return[[p,l.t-40,-.03],[p,l.b+.1*n.cssH,0]]}function Xo(n){var l=n.box(".oc-shot")||n.NONE,p=n.narrow()?jt(n,(n.box("#focus .sec-head")||n.NONE).l):n.cssW/2;return[[p,l.t-60,-.03],[p,l.b-.1*n.cssH,0]]}function co(n){var l=n.box("#portrait")||n.NONE,p=n.narrow(),v=p?Math.min(.56*l.h,.66*n.cssW):Math.min(.6*l.h,Math.max(.5*l.h,(l.cx-14)/.845)),g=n.ul(v);return{shape:0,u:{uW0:[5.6,g,.085*g,1],uW1:[.3*g,.5,1.55,89],uW2:[.55,1.25,.22,47],uW3:[0,.365,.072,.0876],uWC:[n.ux(l.cx),n.uy(l.cy-10),0,0],uWR:[p?0:-33*u,-.06,4.2+n.time*.05,-1.5],uWB:[0,.73,0,.65]},look:n.look({thick:1.15,gain:.95,share:Ct.loop,points:.45,pointSize:.8,tips:0}),open:n.open(l.cy-10-.95*v,l.cy-10+.95*v)}}function Qo(n){for(var l=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),v=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,g=n.narrow(),x=n.cssW,S=n.cssH,k,W,H=n.hover||[0,0,0],K=g?l.t-.22*S:fo(n,l);p.length<3;)p.push(p[p.length-1]||n.NONE);var B={shape:1,u:{uFO:g?[n.ux(It(n,l.l)),n.uy(K),n.ul(.07*x),.25]:[n.ux(x*.3),n.uy(K),n.ul(72),.3],uFC:[n.ux(v.l+.16*v.w),n.uy(v.b+10),n.ul(.34*Math.min(v.h,260)),.15],uFH:[H[0],H[1],H[2],n.ul(g?90:150)]},knot:[.15,n.open(v.b-70,v.b+50,v.b-110,v.b+30)],look:n.look({thick:1.25,gain:.95,share:Ct.fan,points:.6,pointSize:.85,tips:0}),open:n.open(l.t,p[g?2:0].t+160,K,p[0].t+70)};for(k=0;k<3;k++)W=p[k],B.u["uFT"+k]=g?[n.ux(W.l+.12*W.w),n.uy(W.t),n.ul(.1*W.w),n.ul(60)]:[n.ux(W.cx),n.uy(W.t),n.ul(.26*W.w),n.ul(70)];return B}function me(n){var l=n.box("#film .films .player",!0),p=n.narrow(),v,g;for(l.length||(l=n.box("#film .player",!0));l.length<2;)l.push(l[l.length-1]||n.NONE);var x={shape:2,u:{uAP:[-20*u,200*u,n.ul(.03*l[0].w),.15]},look:n.look({thick:1.05,gain:.95,share:Ct.arcs,points:.35,pointSize:.85})},S=l[0].t+.12*l[0].h,k=.75*l[0].w;if(x.open=p?n.open(l[0].t-60,l[0].t+.5*l[0].h,l[0].t-160,l[0].t+40):n.open(S-k,S+.15*k,S-k,l[0].t+.45*l[0].h),p){var W=n.box("#film .sec-head")||n.NONE,H=.62*n.cssW;x.u.uAC0=x.u.uAC1=[n.ux(n.cssW/2),n.uy(W.t-100+H),n.ul(H),0],x.u.uAP=[0,Math.PI,n.ul(.03*l[0].w*1.6),.15]}else for(v=0;v<2;v++)g=l[v],x.u["uAC"+v]=[n.ux(g.cx+(v?-1:1)*.12*g.w),n.uy(g.t+.12*g.h),n.ul(.75*g.w),(v?-1:1)*60*u];return x}var Ut={thick:1,gain:.66,share:1,points:.22,pointSize:.8,deep:.15,skin:.76,skinW:.2,back:.6},Ro=[.95,.44,.1,.18];function Wo(n,l,p,v,g,x,S,k){var W=n.narrow(),H=W?20:32,K=31*u,B=n.ul(v),tt=Math.sin(K)*B+Math.cos(K)*g,Q=2*tt/H;return{uWv:[n.ux(l),n.uy(p),B,g],uWv2:[H,H,.15*Q,x],uWv3:[.6,.5,0,.004],uWv4:[K,-K,5,Ut.thick],uWv5:[.42,.4,Math.min(1,.5*n.cssW/v+.03),.08],uWvK:Ro,uWvL:S?[S[0],S[1],S[2],k]:[0,0,0,.3],uStE:[-9,-9,-9,.03],uSt0:[0,0,0,0],uSt1:[0,0,0,0],uSt2:[99,0,0,0]}}function Po(n,l,p,v){if(n.narrow())return l;var g=p*n.U*Math.sin(v),x=Math.min(.16*n.cssH,2*g+.035*n.cssH);return Math.min(l,n.cssH-x+g)}function Ho(n,l,p){return n.narrow()?n.open(l-.8*p,l+1.4*p):n.open(l-.8*p,l+1.4*p,l-p,l-.25*p)}function No(n){if(!n.narrow())return n.look(Ut);var l={},p;for(p in Ut)l[p]=Ut[p];return l.share=.86,n.look(l)}function ve(n){var l=n.box("#wkStage")||n.NONE,p=n.narrow(),v=p?.45:.8,g=Po(n,l.b+(p?90:.16*n.cssH),v,20.6*u),x=v*n.U*.4+30;return{shape:3,u:Wo(n,n.cssW/2,g,.6*n.cssW,v,20.6*u),look:No(n),open:Ho(n,g,x),foot:g-.55*x}}function s(n){var l=n.box(".oc-shot")||n.NONE,p=n.detail||[0,0,0],v=.72*n.cssW,g=n.narrow()?.5:.9,x=Po(n,l.b-.02*n.cssH,g,23*u),S=g*n.U*.44+30;return{shape:3,u:Wo(n,n.cssW/2,x,v,g,23*u,p,Math.max(.05,.5*l.w/v-.06)),look:No(n),open:Ho(n,x,S),foot:x-.55*S}}function c(n){var l=null,p,v=window.__sceneShapes||[];for(p=0;p<v.length;p++)v[p]&&v[p].id==="b"&&v[p].foot7&&(l=v[p].foot7(n));if(!l){var g=n.box("#process .steps .step")||n.box("#process .steps")||n.NONE;l={left:g.l-24,right:g.r+24,floor:g.t+6,hd:n.narrow()?.16:.2,tip:.3}}var x=Po(n,l.floor,l.hd,l.tip),S=l.hd*n.U*.4+30;return{shape:3,u:Wo(n,(l.left+l.right)/2,x,Math.max(40,(l.right-l.left)/2),l.hd,l.tip),look:No(n),open:Ho(n,x,S),foot:x-.55*S}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"a",glsl:ct,shapes:{1:"shFan",2:"shArcs",3:"shWeave"},stations:{2:co,3:Qo,4:me,5:ve,6:s,"6.5":c},ways:{2:ro,3:Go,4:Eo,5:de,6:Xo}})})(),(function(){"use strict";var ct={stair:{tip:.3,depth:.2,depthNarrow:.16,riser:.055,riserNarrow:.028,shoulder:.04,shoulderNarrow:.028,cap:.07,warp:.42,lean:1.5,run:.34,fan:.1,locks:24,locksNarrow:8,wires:17,wiresNarrow:10,skirt:.11,node:12,nodeNarrow:10,floorUnder:10,floorUnderNarrow:6,shareNarrow:.86,look:{thick:1.1,gain:.98,share:1,points:.28,pointSize:.9}},pass:{depth:.5,halfWidth:.7,foot:.99,look:{thick:.85,gain:.72,share:1,points:0,pointSize:.9}},columns:{tip:.26,radius:.33,radiusNarrow:.47,rimGap:.36,ovalGap:.42,footNarrow:96,foot:60,riseOver:.33,rim:.035,rimPick:.085,yarns:8,relief:.013,turnsWide:.42,turnsNarrow:.86,wide:.74,wideWidth:.86,hoops:.08,slide:.02,blueWall:.45,blueHoop:.22,share:.8,band:37,bandPly:8,look:{thick:1.3,gain:1.03,share:1,points:.12,pointSize:.9}},arcs:{radius:[.34,.58],rope:.08,tip:.4,apart:.07,factor:3,reach:.8,cover:1,fanOut:.26,wait:.12,look:{thick:1.05,gain:.9,share:.88,points:.2,pointSize:.9}},ring:{radius:[.3,.56],radiusNarrow:.46,rope:.105,tip:.42,below:.02,twist:1.5,section:.62,loose:.07,turn:.03,glint:.55,wait:.1,look:{thick:1.5,gain:.94,share:.88,points:.35,pointSize:1}},foot:{radius:[.27,.5],radiusNarrow:.44,tip:.44,above:.17,look:{thick:1.5,gain:.94,share:.88,points:.3,pointSize:1}}},u=`
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
}`,Ct=1/Math.tan(14*Math.PI/180);function It(s,c,n,l,p){s[c+"0"]=n,s[c+"1"]=l||n,s[c+"2"]=p||n}function fo(s,c){var n=ct.stair,l=Math.cos(n.tip),p=Math.sin(n.tip),v=s.uy(c.floor),g=c.n,x=[],S=[],k,W;for(k=0;k<3;k++){W=Math.min(k,g-1);var H=s.uy(c.tops[W]);x[k]=Math.max(0,Ct*(H-v)/(Ct*l+H*p)),S[k]=(Ct-x[k]*p)/Ct}var K=[],B=[];for(k=0;k<3;k++)K[k]=g>1?.52*Math.min(k,g-1)/(g-1):0,B[k]=k<g?s.sstep((c.f-K[k])/.48):0;var tt=x[0]*B[0],Q=tt+(x[1]-x[0])*B[1],At=Q+(x[2]-x[1])*B[2],Wt=[tt,Q,At],Tt=s.ux(c.right)*S[g-1],nt=s.ux(c.left),ht=[],yt=[99,99,99];for(k=0;k<3;k++)ht[k]=k<g?s.ux(c.risers[k])*(((k?S[k-1]:1)+S[k])/2):Tt+5;var Yt=nt+.35*(ht[0]-nt),P=[[0,Yt]],d=0,gt=Yt,$;for($=0;$<c.nodes.length;$++)k=c.nodes[$],yt[$]=s.ux(c.mids[k])*S[k],P.push([K[k]+.48,yt[$]]),c.f>=K[k]+.48-.001&&d++;for($=1;$<P.length;$++)c.f>=P[$-1][0]&&(gt=s.lerp(P[$-1][1],P[$][1],s.clamp01((c.f-P[$-1][0])/Math.max(1e-4,P[$][0]-P[$-1][0]))));c.f>=P[P.length-1][0]&&(gt+=.02);var Pt=Wt.map(function(Lt){var Ot=(v+Lt*l)*Ct/(Ct-Lt*p);return s.cssH/2-Ot*s.U});return{X:[nt,Tt,v,c.hd],E:[ht[0],ht[1],ht[2],gt],H:[tt,Q,At,.92+.08*Math.sin(1.7*s.time)],N:[yt[0],yt[1],yt[2],c.f>.001?1:0],tread:Pt,lit:d,n:g}}function jt(s,c,n){var l=ct.stair,p={};It(p,"uTX",c[0].X,c[1]&&c[1].X,c[2]&&c[2].X),It(p,"uTE",c[0].E,c[1]&&c[1].E,c[2]&&c[2].E),It(p,"uTH",c[0].H,c[1]&&c[1].H,c[2]&&c[2].H),It(p,"uTN",c[0].N,c[1]&&c[1].N,c[2]&&c[2].N),p.uTP=[l.tip,n?l.riserNarrow:l.riser,n?l.shoulderNarrow:l.shoulder,n?.6*l.cap:l.cap],p.uTQ=[l.warp,n?1:0,l.lean,n?.7*l.run:l.run],p.uTR=[l.fan,0,n?l.locksNarrow:l.locks,n?l.wiresNarrow:l.wires];var v=n?l.depthNarrow:l.depth,g=n?l.shoulderNarrow:l.shoulder;return p.uTL=[v/(2*v-g),0,0,0],p}function ro(s){var c=ct.stair,n=s.narrow(),l=s.box("#process .step-tag",!0),p=s.box("#process .step-body",!0),v,g=s.css?s.css("#process","--node"):NaN;if(g>=0||(g=n?c.nodeNarrow:c.node),l.length<3||p.length<3){if(p=s.box("#process .steps .step",!0),p.length<3){var x=s.box("#process .steps")||s.NONE;p=[0,1,2].map(function(H){return{cx:x.l+x.w*(1+2*H)/6,l:x.l+x.w*H/3,r:x.l+x.w*(H+1)/3,t:x.t,b:x.b,w:x.w/3.2}})}l=p.map(function(H,K){var B=H.t-(14+22*K)-g;return{cx:n?H.l+H.w*(.2+.17*K):H.cx,b:B,t:B-20,w:n?H.w*.5:H.w*.62}})}var S={nar:n,node:g,steps:[],top:1e9,last:-1e9};for(v=0;v<3;v++){var k=l[v],W=k.b+g;S.steps.push({x:k.cx,w:k.w,top:k.t,y:W,card:p[v],lift:p[v].t-W}),S.top=Math.min(S.top,k.t),S.last=Math.max(S.last,k.b)}return S}function Go(s,c){var n=ct.stair,l;if(c=c||ro(s),l=c.steps,c.nar)return{left:l[0].card.l-24,right:l[0].card.r+24,floor:l[0].card.t+n.floorUnderNarrow,hd:n.depthNarrow,tip:n.tip,r0:l[0].card.l};var p=l[0].x-.72*l[0].w;return{left:p-n.skirt*s.cssW,right:l[2].x+.66*l[0].w,floor:l[0].card.t+n.floorUnder,hd:n.depth,tip:n.tip,r0:p}}function Eo(s){var c=ct.stair,n=ro(s),l=n.nar,p=n.steps,v=s.cssH,g,x,S,k;if(l){var W=p[0].lift,H=p[1].lift-W,K=p[1].x-p[0].x;for(K>8||(K=.5*p[0].w),K=Math.max(44,Math.min(90,K)),H>2||(H=16),g=[],S=0,k=[],x=0;x<3;x++){var B=p[x],tt=B.card,Q=.36*B.w,At=[],Wt=[],Tt=[],nt;for(nt=0;nt<=x;nt++)At[nt]=tt.t-W-nt*H,Tt[nt]=B.x-Q-(x-nt)*K,Wt[nt]=nt===x?B.x:Tt[nt]+K/2;var ht=s.clamp01((.9*v-(B.top-20))/(.5*v)),yt=fo(s,{floor:tt.t+c.floorUnderNarrow,tops:At,mids:Wt,risers:Tt,right:B.x+Q,left:Math.max(-24,Tt[0]-64),hd:c.depthNarrow,f:ht,n:x+1,nodes:[x]});g.push(yt),k[x]=yt.tread[x],yt.lit&&S===x&&(S=x+1)}}else{var Yt=p[0].w,P=Go(s,n),d=s.clamp01((.9*v-(n.top-20))/(.5*v)),gt=c.depth*s.U*Math.sin(c.tip),$=Math.min(.16*v,2*gt+.035*v),Pt=fo(s,{floor:Math.min(P.floor,v-$+gt),tops:p.map(function(qt){return qt.y}),mids:p.map(function(qt){return qt.x}),risers:[P.r0,(p[0].x+p[1].x)/2-.1*Yt,(p[1].x+p[2].x)/2-.1*Yt],right:P.right,left:P.left,hd:c.depth,f:d,n:3,nodes:[0,1,2]});g=[Pt],S=Pt.lit,k=Pt.tread}var Lt=Math.max(p[0].card.t,p[2].card.t),Ot=c.look;if(l){Ot={};for(var $o in c.look)Ot[$o]=c.look[$o];Ot.share=c.shareNarrow}return{shape:"stair",u:jt(s,g,l),look:s.look(Ot),treads:k,lit:S,open:l?1:s.open(n.top-20,Lt+110)}}function de(s){var c=ct.pass,n=s.narrow(),l=s.cssW,p,v;if(n){var g=Eo(s),x=ro(s).steps[2].card;return{shape:"stair",u:g.u,look:g.look,open:s.open(x.t,x.t+.3*s.cssH)}}var S=[s.ux(l*(.5-c.halfWidth)),s.ux(l*(.5+c.halfWidth)),s.uy(s.cssH*c.foot),c.depth],k={X:S,E:[S[0]+.6,S[0]+1.3,S[0]+2,S[0]],H:[0,0,0,0],N:[99,99,99,0]},W=jt(s,[k],n),H=c.look,K=1;W.uTR[1]=.004;var B=s.sstep(s.clamp01(-ro(s).last/(.6*s.cssH)));if(B<1){var tt=Eo(s),Q={},At={};for(p in W)for(Q[p]=[],v=0;v<4;v++)Q[p][v]=s.lerp(tt.u[p][v],W[p][v],B);for(p in H)At[p]=s.lerp(ct.stair.look[p],H[p],B);W=Q,H=At}return{shape:"stair",u:W,look:s.look(H),open:K}}function Xo(s){for(var c=ct.columns,n=s.narrow(),l=s.cssH,p=s.box("#pricing .sec-head")||s.NONE,v=s.box("#pricing .plan",!0),g=s.box("#pricing .plan--pick",!0)[0];v.length<3;)v.push(v[v.length-1]||s.NONE);for(var x=s.ease("b.badge",g&&Math.abs(g.cx-v[1].cx)<6?1:0,.4),S=1,k=n?Math.max(8,Math.min(60,v[1].t-v[0].b)):0,W=n?Math.asin(Math.min(Math.sin(c.tip),c.ovalGap*k/(c.radiusNarrow*v[0].w))):c.tip,H={uKP:[W,c.yarns,c.relief,c.slide*s.time],uKQ:[c.turnsWide,c.turnsNarrow,c.hoops,c.wideWidth],uKB:[c.blueWall,c.blueHoop*(.92+.08*Math.sin(1.3*s.time)),c.wide,n?1:c.share]},K=[0,0,0,0],B=0;B<3;B++){var tt=v[B],Q=(n?c.radiusNarrow:c.radius)*tt.w,At=n?tt.t-c.rimGap*k:p.t-(c.rim+(B===1?(c.rimPick-c.rim)*x:0))*l,Wt=n?tt.t+Math.min(.8*tt.h,c.footNarrow):tt.t+c.foot,Tt=Wt-At;n||(Wt=Math.min(Wt,.985*l));var nt=n?1:s.clamp01((.95*l-tt.t)/(c.riseOver*l));S=Math.min(S,nt);var ht=Wt-Math.max(.1*Tt,s.sstep(nt)*Math.max(0,Wt-At));H["uKC"+B]=[s.ux(tt.cx),s.uy(ht),s.ul(Q),s.uy(Wt)],K[B]=s.ul(Tt)/Math.cos(W)}H.uKH=K;var yt=n?v[0].t-c.rimGap*k:p.t-c.rim*l,Yt=(n?c.radiusNarrow:c.radius)*v[2].w,P=c.look;if(n){P={};for(var d in c.look)P[d]=c.look[d];P.share=c.share}return H.uKF=[s.ux(n?v[0].l-10:Ut(s,p.l)-6),s.ux(v[2].cx+Yt),s.uy(v[0].t+c.band),s.ul(c.bandPly)],{shape:"basket",u:H,look:s.look(P),open:n?1:s.open(yt,v[0].t+c.foot+70)}}function co(s,c,n,l,p,v,g){var x=ct.arcs,S=ct.ring,k=Math.max(x.factor,.86*s.cssW/(.94*l*Math.sin(x.reach)));return{uOA:[s.ux(c),s.uy(n),s.ul(l),s.ul(p*l)],uOB:[v,g,x.apart,.3+S.turn*s.time],uOC:[S.twist,S.section,x.fanOut,S.glint],uOD:[k,x.reach,x.cover,S.loose]}}function Qo(s){var c=ct.arcs,n=s.box("#faq .faq")||s.NONE,l=s.box("#faq .faq .qa",!0),p=s.box("#faq .faq summary",!0),v=0,g;for(g=0;g<p.length;g++)v+=p[g].h;for(g=1;g<l.length;g++)v+=Math.max(0,l[g].t-l[g-1].b);v||(v=n.h);var x=Math.min(c.radius[0]*s.cssW,c.radius[1]*s.cssH),S=n.t+.62*Math.min(v,.55*s.cssH),k=s.narrow();return k||(S=Math.min(S,s.cssH*(1-c.wait)+.22*x)),k?{shape:"coil",u:co(s,s.cssW/2,S,x,c.rope,c.tip,1),look:s.look(c.look),open:s.open(S-.3*x,S+.45*x,S-.34*x-.3*s.cssH,S+.05*x)}:{shape:"coil",u:co(s,s.cssW/2,S,x,c.rope,c.tip,1),look:s.look(c.look),open:Math.max(s.open(S-.3*x,S+.45*x),s.sstep(s.clamp01((s.q-10)/.25)))}}function me(s){var c=ct.ring,n=s.box("#start .start-side")||s.NONE,l=s.box("#start .form-wrap")||n,p=s.narrow(),v=Math.min((p?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),g=Math.max(n.b,l.b)+c.below*s.cssH;if(p||(g=Math.min(g,s.cssH*(1-c.wait)+.4*v)),p){var x=s.open(null,null,g-.46*v-.3*s.cssH,g),S=x<1?Qo(s):null;if(S&&(x<=0||S.open>.001))return S;var k={},W=s.sstep(x),H;for(H in c.look)k[H]=s.lerp(ct.arcs.look[H],c.look[H],W);return{shape:"coil",u:co(s,s.cssW/2,g,v,c.rope,c.tip,0),look:s.look(k),open:x}}return{shape:"coil",u:co(s,s.cssW/2,g,v,c.rope,c.tip,0),look:s.look(c.look),open:1}}function Ut(s,c){return s.narrow()?Math.max(9,.5*c):Math.max(30,.5*c)}function Ro(s){var c=s.box("#process .sec-head")||s.NONE,n=ro(s),l=n.steps[0].card,p=Ut(s,c.l);return[[p,Math.min(n.top,c.t)-60,-.03],[p,l.t+10,0],[p,l.b,-.03]]}function Wo(s){var c=s.box("#proof .pf-stage")||s.NONE,n=s.box("#process .sec-head")||s.NONE;return[[Ut(s,n.l),c.t+.5*c.h,-.03]]}function Po(s){var c=s.box("#pricing .sec-head")||s.NONE,n=s.box("#pricing .plan",!0),l=n[0]||s.NONE,p=Ut(s,c.l),v=l.b,g;for(g=1;g<n.length;g++)v=Math.max(v,n[g].b);return[[p,c.t-40,-.03],[p,l.t+ct.columns.foot,0],[p,v,-.03]]}function Ho(s){var c=s.box("#faq .sec-head")||s.NONE,n=s.box("#faq .faq")||s.NONE,l=Ut(s,c.l);return[[l,c.t,-.03],[l,n.b,-.03]]}function No(s){var c=ct.ring,n=ct.foot,l=s.box("#start .start-side")||s.NONE,p=s.box("#start .form-wrap")||l,v=s.box("footer.foot")||s.NONE,g=s.narrow(),x=Ut(s,l.l),S=s.sstep(s.clamp01(s.q-11)),k=Math.min((g?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),W=Math.max(l.b,p.b)+c.below*s.cssH,H=Math.min((g?n.radiusNarrow:n.radius[0])*s.cssW,n.radius[1]*s.cssH),K=v.t-n.above*s.cssH;g||(W=Math.min(W,s.cssH*(1-c.wait)+.4*k));var B=s.lerp(k,H,S),tt=s.lerp(W,K,S),Q=tt-.246*B*Math.sin(s.lerp(c.tip,n.tip,S))/Math.sin(.42);return[[x,l.t,-.03],[x,Math.min(l.b+10,Q-.34*s.cssH),-.03],[s.cssW/2-.8*B,Q,-.6*B*Math.cos(s.lerp(c.tip,n.tip,S))/s.U]]}function ve(s){var c=ct.foot,n=s.box("footer.foot")||s.NONE,l=s.narrow(),p=Math.min((l?c.radiusNarrow:c.radius[0])*s.cssW,c.radius[1]*s.cssH),v=n.t-c.above*s.cssH;return{shape:"coil",u:co(s,s.cssW/2,v,p,ct.ring.rope,c.tip,0),look:s.look(c.look)}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"b",glsl:u,shapes:{stair:"shStair",basket:"shBasket",coil:"shCoil"},stations:{7:Eo,8:de,9:Xo,10:Qo,11:me,12:ve},ways:{7:Ro,8:Wo,9:Po,10:Ho,11:No},conf:ct,levels:ro,foot7:Go})})(),(function(){"use strict";if(window.__scene)return;var ct=/[?&]scene-nosort\b/.test(location.search),u={tiers:[{strands:2200,segments:80,points:1200,dprCap:2,pixelCap:9e6},{strands:1e3,segments:52,points:700,dprCap:2,pixelCap:3e6},{strands:520,segments:40,points:400,dprCap:1.5,pixelCap:2e6}],maxStrands:2600,fit:{aspect:16/9,narrow:1.5},width:.0076,minPx:1.35,widthLod:[.85,1.3],hang:{root:[-.1,.33],leave:[224,236],tip:[186,292],tipCurve:.4,trunk:[1.49,.76,.2],reach:[.86,.6,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,minScale:.62,rest:[204,.68,.25,8,.9]},hangUp:{root:[.34,0],leave:[192,204],tip:[176,268],tipCurve:.55,trunk:[1.3,.8,.16],reach:[.86,.62,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,rest:[186,.7,.25,5,.92],under:16,wide:.34,least:.36,most:.62,upTo:1024},body:{wrap:3.4,wrapVar:1.7,treadTwist:.55,tuftCount:47,wires:89,squash:1,lip:.24,ringZ:.88,spin:.1},swirl:{leave:74,end:118,stagger:.12,settle:1.3,gate:[.42,.5]},track:{open:[[.08,0],[.2,.16],[.306,.6],[.36,.88],[.43,1]],loosen:[[0,0],[.1,.25],[.2,.5],[.32,1]],count:[[0,400],[.2,430],[.42,520],[.52,1300],[.62,2200]],thick:[[0,1.25],[.42,1.25],[.52,1],[.64,.72],[.84,.86]],gain:[[0,.86],[.45,.86],[.62,1],[.84,.9]],skin:[[.55,.88],[.66,.935],[.84,.955]],skinW:[[.55,.12],[.7,.06],[.84,.035]],bloom:[[.7,0],[.86,1]],tufts:[[.56,.45],[.84,.1]],wires:[[.62,0],[.8,1]],deep:[[.62,.16],[.84,.07]],yaw:[[0,0],[.45,4],[.63,-9],[.84,9]],pitch:[[0,0],[.45,-3],[.63,7],[.84,-5]],cx:[[.2,.1],[.42,.04],[.586,-.01],[.82,0]],cy:[[.2,.1],[.42,.11],[.586,.085],[.65,.02],[.72,0],[.84,.03]],phase:[[.2,0],[.45,.5],[1,2.3]],hole:[[.2,.42],[.42,.39],[.5,.31],[.54,.28],[.586,.2]],arm:[[.2,1.85],[.36,1.85],[.42,1.95],[.5,1.4],[.54,1.02],[.586,.68]],rim:[[.2,0],[.3,1],[.56,1],[.66,0]],disc:[[.2,.5],[.42,.24],[.586,.14]],wind:[[.48,0],[.586,.18],[.665,1]],radius:[[.46,.4],[.586,.36],[.64,.34],[.72,.26],[.84,.2]],tube:[[.46,.08],[.586,.15],[.64,.19],[.82,.19]],twist:[[.46,2.4],[.64,2.9],[.82,3.3]],loose:[[.46,1],[.62,.85],[.72,.35],[.82,0]],flare:[[.46,.5],[.586,.28],[.64,.1],[.76,.04]],sphere:[[.64,0],[.8,1]],ball:[[.64,.53],[.7,.47],[.76,.41],[.84,.365]],mouth:[[.64,.15],[.7,.12],[.76,.086],[.84,.072]],core:[[.64,0],[.82,1]],wash:[[.2,0],[.42,.06],[.56,.16],[.635,.8],[.72,.62],[.78,.3],[.84,0]],tips:[[0,1],[.52,1],[.64,.5],[.74,0]],points:[[0,.85],[.3,1],[.66,1],[.84,.32]],pointSize:[[0,1],[.3,1.15],[.64,.9],[.84,.7]],turn:[[.2,0],[.5,.5],[.8,1]],floorX:[[0,.78],[.3,.35],[.45,0]],floorY:[[0,-.71],[.3,-.92],[.586,-.93],[.7,-.86],[.84,-.8]],floorW:[[0,.95],[.3,1.3],[.586,.85],[.7,.55],[.84,.42]],shadow:[[0,1],[.3,.45],[.5,.5],[.586,.8],[.82,1]],pool:[[0,.9],[.3,.5],[.586,.9],[.66,1],[.84,.1]]},alive:{viewSway:[1.6,1.1],viewRate:[.21,.17],bob:.014,bobRate:.55,travel:.022,sparkle:.9},calmTime:2.5,pointer:{radius:.34,fingerRadius:.42,aside:.1,gather:.55,turn:[13,9],follow:[.2,.045],rise:.1,fall:.035,pulse:1.5,pulseWidth:.075},exposure:.76,light:{key:.28,strips:4.8,fill:.45,room:.08,glint:.8,arms:[.25,.75,.45,.15],armSide:.3},shade:{formFloor:.16,back:.6,strandVar:.25,darkShare:.05,open:.42},blue:[.02,.22,1],blueAmt:{tint:1,light:.85,sheen:.2,hot:2.4,reach:1.7,lean:.75,glare:.24,kick:.06,ring:1,points:1,haze:[.72,.2],bloom:.34,tipWash:.55},pulse:{rate:1.7,wave:.16},floor:{shadow:.3,pool:.3},smooth:.16,slowMs:40,warmup:20,window:40,cooldown:60,fastMs:22,calm:480,retries:2,stillRetryMs:2e4,idleEvery:2,lostWaitMs:4e3};u.hero="header.hero",u.stage=".stage",u.secs=[null,null,"#studio","#services","#film","#work","#focus","#process","#proof","#pricing","#faq","#start","footer.foot"],u.names=["hero","ball","loop","fan","arcs","weave","ground","stair","pass","columns","lowarcs","ring","foot"],u.seam={from:1,to:.35,least:.3},u.page={viewSway:[1.2,.9],scale:.4},u.look={thick:1,gain:1,share:1,points:.5,pointSize:1,tips:0,stag:.4,lift:.1,yaw:0,pitch:0,deep:.3,skin:.8,skinW:.12,back:.75},u.pagePoints=[700,400,220],u.ringOut=3,u.via={7:{at:.55,direct:!0,stagger:.35}},u.rope={grid:[-.2,1.2],pad:.06,least:.62,len:.16,ply:.034,plyLeast:.011,swing:1.12,depth:.7,period:210,twist:2,soft:.75,pass:{stagger:.08,join:.46},aside:.8,slide:.2,sway:.006},u.cutBy={},u.passBy={4:{join:.4},9:{direct:!0,span:[.25,.92],stagger:.45},10:{join:.34}},u.passNarrow={9:{join:.4}},u.clear={pad:20,soft:16,dark:.33,heroFrom:.02,heroUntil:.08,heroPad:-8,heroSoft:8},u.edge={hero:0,page:0},u.sortStrands=!ct,u.fadeInMs=500,u.idleAfterMs=2e4,u.gpu={every:12,behind:2,of:[3,4],cool:4,px:[1,.84,.7],calmMs:12e3,giveUp:6,afterDrawn:45},u.warm={quietMs:350,giveUpMs:8e3},u.groups=[1,3,4,5,7,9,12],u.groupFadeMs=450,u.hoverS=.3,u.proof={sel:"#proof .pf-stage",melt:104,cover:.85,whole:!0},u.sleepUnderMenu=!0,u.jump={windows:1,stations:1.5},u.carry={extra:800,back:100,step:96,slow:.3,near:100,pixels:1.5,dpr:1.5,heroPass:.5,lead:160},u.stills={"hero-a":0,"hero-b":.306,"hero-c":.586,"hero-d":1,studio:2,services:3,partner:4,websites:5,difference:6,process:7,pricing:9,faq:10,start:11,footer:12};var Ct=28,It=1/Math.tan(Ct*Math.PI/360),fo=`
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
float strandOn(vec4 s) { return 1.0 - smoothstep(uShare - 0.03, uShare + 0.03, pick(s)); }`,Go=`
uniform vec4 uRp[8];
uniform vec4 uRpA;
uniform vec4 uRpY;
uniform vec4 uRpK;
uniform vec4 uRpS;
uniform vec4 uRpM;
uniform vec4 uRpC;
uniform vec4 uRpT;
uniform float uRpSoft;
float gLie;`,Eo=`
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
float strandOn(vec4 s) { return 1.0; }`,de=(function(){var t=fo,o=[[/uniform float uMix, uStag, uLift;[^\n]*\n/,""],[/uniform vec4 uHand;[^\n]*\n/,""],[/uniform vec4 uHand2;[^\n]*\n/,""],[/uniform float uFold;[^\n]*\n/,""],[/uniform float uFlow;[^\n]*\n/,""],[/float gKeep;[^\n]*\n/,""],[/float gOwn, gHandIn, gHandM, gShow;/,"float gShow;"],[/float gBody, gHandW;/,"float gBody; const float gHandW = 1.0;"]];return o.forEach(function(e){if(!e[0].test(t))throw new Error("sfs-scene: rope head, no "+e[0]);t=t.replace(e[0],e[1])}),t+Go})(),Xo=`
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
uniform vec2 uVar;`,Qo=`
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
}`,me=`#version 300 es
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
uniform vec4 uKc[2]; uniform vec4 uKcAmt;`,Ro=`
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
}`,Wo=(function(){var t="smoothstep(0.25, 0.70, gThin);",o=Ro.replace(t,"smoothstep(0.25, 0.70, gThin) * (1.0 - gLie * step(0.12, fract(aPt.z * 13.7)));");if(o===Ro)throw new Error("sfs-scene: rope points, no "+t);return o})(),Po=`#version 300 es
precision highp float;
in vec2 vUv; in float vA; out vec4 o;
uniform vec3 uBlue;
void main() {
float d = length(vUv);
float core = smoothstep(0.26, 0.14, d);
float halo = (0.55 * exp(-d * d * 3.2) + 0.45 * exp(-d * d * 14.0)) * smoothstep(1.0, 0.55, d);
vec3 c = (uBlue + vec3(0.05, 0.09, 0.0)) * halo * 0.62 + vec3(0.90, 0.96, 1.0) * core;
o = min(vec4(c, halo * 0.50 + core) * vA, vec4(1.0));
}`,Ho=`#version 300 es
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
}`,No=`#version 300 es
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
}`;function ve(t,o,e){var r=1/Math.tan(t*Math.PI/360),a=1/(o-e);return new Float32Array([r,0,0,0,0,r,0,0,0,0,(e+o)*a,-1,0,0,2*e*o*a,0])}function s(t,o,e,r){var a=Math.cos(t),i=Math.sin(t),h=Math.cos(o),m=Math.sin(o),f=Math.cos(e),y=Math.sin(e);return new Float32Array([a*f,m*i*f+h*y,-h*i*f+m*y,0,-a*y,-m*i*y+h*f,h*i*y+m*f,0,i,-m*a,h*a,0,0,0,-r,1])}function c(t){return function(){t|=0,t=t+1831565813|0;var o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function n(t,o,e){return t+(o-t)*e}function l(t,o,e){return t<o?o:t>e?e:t}function p(t){return t<0?0:t>1?1:t}function v(t){var o=t.slice().sort(function(e,r){return e-r});return o.length?o[o.length>>1]:0}function g(t,o){var e=t.length;if(o<=t[0][0])return t[0][1];if(o>=t[e-1][0])return t[e-1][1];for(var r=0;o>t[r+1][0];)r++;function a(E){if(E===0||E===e-1)return 0;var z=t[E][0]-t[E-1][0],F=t[E+1][0]-t[E][0],R=(t[E][1]-t[E-1][1])/z,w=(t[E+1][1]-t[E][1])/F;return R*w<=0?0:3*(z+F)/((2*F+z)/R+(F+2*z)/w)}var i=t[r][0],h=t[r+1][0]-i,m=t[r][1],f=t[r+1][1],y=(o-i)/h,A=y*y,N=A*y;return(2*N-3*A+1)*m+(N-2*A+y)*h*a(r)+(3*A-2*N)*f+(N-A)*h*a(r+1)}function x(t){return t=p(t),t*t*(3-2*t)}function S(t){return t-2*Math.PI*Math.round(t/(2*Math.PI))}function k(t){try{performance.mark("sfs-scene:"+t)}catch{}}function W(t){H.push(t),H.length>60&&H.shift(),window.console&&console.warn("[scene] "+t)}var H=[],K=ve(Ct,.5,30),B=Math.PI/180,tt=/SwiftShader|llvmpipe|Software|Basic Render/i,Q=document.documentElement,At=document.currentScript,Wt=At&&At.src?At.src.replace(/sfs-scene(\.min)?\.js(\?.*)?$/,""):"",Tt=new URLSearchParams(location.search),nt=/[?&](debug|popup-debug|perf=1|sceneperf=1)\b/.test(location.search),ht=new Float32Array(u.maxStrands*4);(function(){for(var t=c(20261007),o=0;o<u.maxStrands;o++)ht[o*4]=(.5+o*.7548776662466927)%1,ht[o*4+1]=(.5+o*.5698402909980532)%1,ht[o*4+2]=t(),ht[o*4+3]=t()})();var yt=128,Yt=u.tiers[0].points,P=null,d=null,gt=null,$=null,Pt=null,Lt=null,Ot=null,$o=!1,qt={begin:0,send:0,waited:0,take:0,frames:[]},Dt=[],St=null,Bo=0,xe=0,Je=[],mt=null,U=[],po=null,ge=!1,we=!1,Lo="",Qt=null,yo=!1,Oo=!1,Zo=0,tr={},Fr={alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1},I="off",pt="page",Jo="",or="",vt=0,bt={},Ht={},Cr=!1,st=0,dt=0,Et=1,ut=0,_=0,Z=1,Gt=0,ye=0,no=!0,te="",at=!1,kt=0,$t=0,Mt=null,Nt="",oe=0,ao=[],Be=0,ho=0,be=null,_t=0,bo=0,Le=0,io=0,so=0,Oe=0,xt=0,ee=0,ke=16.667,er=0,Zt=null,Ur=0,rr=!1,re=0,Fo=[],ne=0,uo=0,ko=0,nr=0,ae=!1,ie=0,D=null,G=null,Jt=0,Me=!0,lt=null,zt=-1,lo="",Mo=!1,Fe=!1,ot=hn(),Ce=0,Co={fails:0},se=0,ar=0,ir=null,Xt=!1,sr=!1,Uo=0,ur=!1,lr=!1,M={cx:0,cy:0,on:0,down:!1,finger:!1,downAt:null,ax:0,ay:0,a:0,bx:0,by:0,b:0,busy:!1,turnX:0,turnY:0},to=[],Ae=null,fr=!1,mo=[],vo=[],Vt=[],cr=[],Se=[],Ao={},qo={},pr=null,hr=null,Ue=null,qr=null,ft={top:0,h:0,stageH:0},Ft=[],qe=[],_r=[],dr=[],Vr=[],ze=null,_e={},Te=[0,0,0],ue=[0,0,0],mr=[0,0,0],Ee=-1,Re,le=0,va=[0,0,0,0],Mn=[1e6,1e6,-1e6,-1e6];function An(t){var o=Ue.get(t);return o===void 0&&(o=getComputedStyle(t).position==="sticky"?1:0,Ue.set(t,o)),o}function So(t){var o=0,e=0,r,a={x:0,y:0,w:t.offsetWidth,h:t.offsetHeight,pin:null,rel:0};for(r=t;r;r=r.offsetParent){if(!a.pin&&An(r)&&r.parentElement){var i=So(r.parentElement),h=getComputedStyle(r),m=getComputedStyle(r.parentElement),f=0,y;for(y=r;y;y=y.offsetParent)f+=y.offsetTop+(y===r?0:y.clientTop);var A=parseFloat(h.top)||0,N=i.pin?i.pin.n+i.rel:i.y,E=N+r.parentElement.clientTop+(parseFloat(m.paddingTop)||0),z=N+i.h-(parseFloat(m.borderBottomWidth)||0)-(parseFloat(m.paddingBottom)||0)-r.offsetHeight-(parseFloat(h.marginBottom)||0),F=Math.abs(f-(window.scrollY+A))<1.5||f>=z-1.5;a.pin={n:F?E+(parseFloat(h.marginTop)||0):f,top:A,lim:z},a.rel=e+(r===t?0:r.clientTop),o+=r.offsetLeft+(r===t?0:r.clientLeft);continue}o+=r.offsetLeft+(r===t?0:r.clientLeft),a.pin||(e+=r.offsetTop+(r===t?0:r.clientTop))}return a.x=o,a.y=e,a}function Kr(t,o){if(!t.pin)return t.y;var e=t.pin;return(e.lim<e.n?e.n:Math.min(Math.max(e.n,o+e.top),e.lim))+t.rel}function vr(t,o){var e=Kr(t,o)-o;return{l:t.x,t:e,w:t.w,h:t.h,r:t.x+t.w,b:e+t.h,cx:t.x+t.w/2,cy:e+t.h/2}}function We(t){pr&&t&&!hr.has(t)&&(hr.add(t),pr.observe(t))}function Ve(t,o){var e=Ao[t];if(!e){e=Ao[t]={recs:[]};var r=Array.prototype.slice.call(document.querySelectorAll(t));r.forEach(We),e.recs=r.map(So).filter(function(a){return a.w>1&&a.h>1}),at&&(no=!0)}return o?e.recs.map(function(a){return vr(a,zt)}):e.recs.length?vr(e.recs[0],zt):void 0}function Ir(t){var o=t.split("|"),e=document.querySelector(o[0]);return e?parseFloat(getComputedStyle(e).getPropertyValue(o[1])):NaN}function Sn(t,o){var e=t+"|"+o;return e in qo||(qo[e]=Ir(e)),qo[e]}function _o(){no=!1;var t=[],o,e;ut=P&&P.clientWidth?P.clientWidth:Q.clientWidth,_=P&&P.clientHeight?P.clientHeight:window.innerHeight,kt=_,at&&(oe=document.body?document.body.offsetHeight:0,!P||!P.clientHeight?kt=_+u.carry.extra:oe<kt?(at=!1,Nt="",Mt=null,$t=0,P.style.cssText=Wr,kt=_=P.clientHeight||window.innerHeight):_=kt-u.carry.extra),Gt=window.innerHeight;var r=u.fit;Z=Math.max(1,.5*Math.min(Math.max(_,ut/r.aspect),ut*r.narrow)),oo.cssW=ut,oo.cssH=_,oo.U=Z,ye=Math.max(0,(at?oe:Q.scrollHeight)-Gt);var a=document.querySelector(u.hero),i=a?a.querySelector(u.stage):null;if(a){var h=So(a);ft={top:h.y,h:h.h,stageH:i?i.offsetHeight:Gt},We(a)}else ft={top:0,h:Gt,stageH:Gt};var m=pt!=="hero",f=u.secs.map(function(R){return R&&m?document.querySelector(R):null});Ft=f.map(function(R){return R?(We(R),So(R).y):null}),m&&Array.prototype.forEach.call(document.querySelectorAll(".sec"),We);for(e in Ao){var y=Array.prototype.slice.call(document.querySelectorAll(e));y.forEach(We),Ao[e].recs=y.map(So).filter(function(R){return R.w>1&&R.h>1}),Ao[e].recs.forEach(function(R){t.push(R.x,R.pin?R.pin.n+R.rel:R.y,R.w,R.h)})}for(o in qo)qo[o]=Ir(o),t.push(qo[o]);qe=[],Array.prototype.forEach.call(document.querySelectorAll("img.gd-img"),function(R){if(!/gd-img--over/.test(R.className)&&!(!m&&!R.closest(u.hero))){var w=So(R),b=R.parentElement,J=R.closest(".gd"),q=R.closest(".sec, header.hero, footer.foot");if(b&&/(^|\s)gd-cut(\s|$)/.test(b.className)){var O=So(b);w.h=Math.min(w.h,O.h),w.w=Math.min(w.w,O.w)}if(!(w.w<2||w.h<2)){var L=q?f.indexOf(q):-1;L<0&&(L=q&&q.matches(u.hero)?0:-1),qe.push({rec:w,st:L,fig:J}),t.push(w.x,w.pin?w.pin.n+w.rel:w.y,w.w,w.h)}}}),_r=m?[1,2,3].map(function(R){return document.querySelector('[data-scene-station="'+R+'"]')}):[],dr=m?[1,2,3].map(function(R){return document.querySelector("#focus .oc-br--"+R)}):[],Vr=m?Array.prototype.slice.call(document.querySelectorAll("#services .cards .card")):[];var A=pt==="page"?document.querySelector(u.proof.sel):null;if(ze=A?So(A):null,at){ao=[];var N=u.seam,E=Ft[2]===null||Ft[2]===void 0?fe():Math.min(Ft[2]-N.to*_,ye);Be=ft.h-Gt>1?fe()+u.carry.heroPass*Math.max(0,E-fe()):-1e9;var z=function(R){var w=R&&R.pin;if(!(!w||w.lim<=w.n+1||w.lim-w.top<=Be)){for(var b=0;b<ao.length;b++)if(ao[b][0]===w.n-w.top&&ao[b][1]===w.lim-w.top)return;ao.push([w.n-w.top,w.lim-w.top])}};for(e in Ao)Ao[e].recs.forEach(z);z(ze),t.push(oe,kt)}t.push(ut,_,Gt,ye,ft.top,ft.h,Ft.join("/")),t=t.join(",");var F=t!==te;return te=t,F}function fe(){return ft.top+ft.h-Gt}function zn(t){if(Ht.progress)return p(+Ht.progress()||0);var o=ft.h-Gt;return o>1?p((t-ft.top)/o):0}function xr(t){for(var o=1,e=u.seam,r=u.secs.length-1,a=2;a<=r;a++)if(!(Ft[a]===null||Ft[a]===void 0)){var i=Math.min(Ft[a]-e.to*_,ye),h=Math.min(Ft[a]-e.from*_,i-e.least*_);if(a===2&&(h=Math.min(fe(),i-1)),t<=h||(o=a-1+x((t-h)/(i-h)),t<i))break}return o}function Ke(t){var o=zn(t),e=fe();return pt==="hero"?o:ft.h-Gt<=1?t<=e?o:xr(t):t<=e+1?o:Math.max(o,xr(t))}var Tn={l:0,t:0,w:100,h:100,r:100,b:100,cx:50,cy:50};function gr(t){var o={},e,r=u.look;for(e in r)o[e]=r[e];if(t)for(e in t)o[e]=t[e];return o}function En(t,o,e){var r=_e[t];return r||(r=_e[t]={v:o,to:o,s:e||.3}),r.to=o,r.s=e||.3,D&&(r.v=o),r.v}var oo={box:Ve,live:function(t){return Ve(t)},css:Sn,ux:function(t){return(t-ut/2)/Z},uy:function(t){return(_/2-t)/Z},ul:function(t){return t/Z},cssW:0,cssH:0,U:1,time:0,scrollY:0,narrow:function(){return ut<=900},look:gr,NONE:Tn,clamp01:p,sstep:x,lerp:n,detail:mr,hover:Te,ease:En,ptr:{x:0,y:0,on:0},open:function(t,o,e,r){var a=t==null?0:p((0-t)/Math.max(1,o-t)),i=e==null?1:p((_-e)/Math.max(1,r-e));return Math.min(1-x(a),x(i))},q:0},jr={uTime:1,uShare:1,uShA:1,uShB:1,uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1,TAU:1,PI:1,gBlue:1,gHot:1,gFlex:1,gThin:1,gSel:1,gKnot:1,gShow:1},Rn={uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1};function Wn(t){var o=String(t.id||"").toLowerCase().replace(/[^a-z0-9]/g,"")||"x",e=String(t.glsl||"").replace(/\/\*[\s\S]*?\*\//g," ").replace(/\/\/[^\n]*/g," "),r={},a={},i={id:o,src:t,uni:r,gids:{},text:""};e=e.replace(/\buniform\s+(\w+)\s+([^;]+);/g,function(q,O,L){var T=[];return L.split(",").forEach(function(et){var X=/^\s*(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*$/.exec(et);if(!X)throw new Error('cannot read the uniform declaration "'+q.replace(/\s+/g," ")+'"');if(!jr[X[1]]){if(O!=="vec4")throw new Error("uniform "+X[1]+" is a "+O+": a shape's uniforms are vec4 (SHAPES.md 1)");r[X[1]]=X[2]?+X[2]:0,a[X[1]]=1,T.push(X[1]+(X[2]?"["+X[2]+"]":""))}}),T.length?"uniform vec4 "+T.join(", ")+";":" "});var h="",m=0,f,y;for(f=0;f<e.length;f++)y=e.charAt(f),y==="}"&&m--,h+=m>0&&y!==`
`?" ":y,y==="{"&&m++;for(var A=[],N="(?:void|float|int|bool|vec[234]|mat[234])",E,z=new RegExp("\\b"+N+"\\s+(\\w+)\\s*\\(","g");E=z.exec(h);)a[E[1]]=1;for(var F=new RegExp("\\b(?:const\\s+)?"+N+"\\s+([^;{}()]+(?:\\([^;{}]*\\))?[^;{}()]*);","g");E=F.exec(h);)if(!(/\)\s*$/.test(E[1])&&!/=/.test(E[1]))){var R=E[1].replace(/\([^)]*\)/g,"").split(",").map(function(q){return(/^\s*(\w+)/.exec(q)||[])[1]}).filter(Boolean),w=R.filter(function(q){return jr[q]});if(w.length===R.length)A.push([E.index,E.index+E[0].length]);else{if(w.length)throw new Error('"'+E[0]+`" declares the engine's `+w.join(", ")+" together with names of its own: put them on lines of their own");R.forEach(function(q){a[q]=1})}}for(f=A.length-1;f>=0;f--)e=e.slice(0,A[f][0])+" "+e.slice(A[f][1]);i.text=e.replace(/[A-Za-z_]\w*/g,function(q,O,L){return a[q]===1&&L.charAt(O-1)!=="."?q+"_"+o:q});var b=t.shapes||{};for(var J in b){if(!a[b[J]])throw new Error("shape "+J+" names the function "+b[J]+", which the file's glsl does not define");i.gids[J]=Vt.length,Vt.push({fn:b[J]+"_"+o,file:i,local:J})}return i}function Pn(t){var o=`void shape(int id, vec4 s, float t, out vec3 p, out vec4 nb) {
  gBlue = 0.0; gHot = 0.0; gFlex = 0.2; gSel = 1.0; gThin = 1.0; gShow = 1.0; gBody = 0.0; gKnot = 0.0; gLoc = vec3(0.0);
`,e=[],r=[];return t.hero&&e.push("if (id < 0) { heroCurve(s, t, p, nb); gBody = 1.0; }"),t.ids.forEach(function(a){if(a===0){e.push("if (id == 0) { shBody(s, t, p, nb); gBody = 1.0; }");return}e.push("if (id == "+a+") "+Vt[a].fn+"(s, t, p, nb);"),Vt[a].file&&r.indexOf(Vt[a].file)<0&&r.push(Vt[a].file)}),o+="  "+e.join(`
  else `)+`
  else { p = vec3(0.0); nb = vec4(0.0, 0.0, 1.0, 0.0); }
}
`,r.sort(function(a,i){return mo.indexOf(a)-mo.indexOf(i)}),(t.form==="rope"?de:fo)+jt+r.map(function(a){return`
/* ---- shapes-`+a.id+` ---- */
`+a.text}).join(`
`)+`
`+o+(t.form==="rope"?Eo:ro)}function Hn(){var t=pt==="page"&&vo.length?u.groups:[1];U=[{k:0,lo:0,hi:Math.min(t[0],u.secs.length-1),hero:!0,ids:[0],form:"one",state:"none",strand:null,point:null,info:null}],po=U[0],ge=U[0].hi>=u.secs.length-1||pt!=="page"||!vo.length,we=!1,Lo="",tr={}}function ce(){if(!ge){ge=!0;var t=u.groups,o=u.secs.length-1,e,r,a;for(U[0].hi>1&&W("CONF.groups: the first group must end at the ball (1); below it every picture needs the rope"),e=1;e<t.length&&t[e-1]<o;e++){var i=t[e-1],h=Math.min(t[e],o),m=[],f="rope";for(r=i;r<=h;r+=.5)r%1&&(!vo[r]||r>h)||(a=r===1?{gid:0}:Pe(r),a&&m.indexOf(a.gid)<0&&m.push(a.gid));m.sort(function(y,A){return y-A}),U.push({k:e,lo:i,hi:h,hero:!1,ids:m,form:f,state:"none",strand:null,point:null,info:null})}}}function zo(t){!ge&&t>U[0].hi&&ce();for(var o=0;o<U.length;o++)if(t<=U[o].hi)return U[o];return U[U.length-1]}function Nn(t,o){return(o.shA<0?!t.hero:t.ids.indexOf(o.shA)<0)||o.shB!==o.shA&&(o.shB<0?!t.hero:t.ids.indexOf(o.shB)<0)?!1:o.rope?t.form==="rope":t.form==="one"}function Bn(t){var o=zo(t),e;for(e=o.k-1;e>=0;e--)if(U[e].state==="ready")return{G:U[e],q:U[e].hi};for(e=o.k+1;e<U.length;e++)if(U[e].state==="ready")return{G:U[e],q:U[e].lo<=1?Math.min(2,U[e].hi):U[e].lo};return null}function wr(t,o){var e=t.k?String(t.hi):"";d&&t.strand&&t.strand!==o["strand"+e]&&(d.deleteProgram(t.strand.p),d.deleteProgram(t.point.p)),t.strand=o["strand"+e],t.point=o["point"+e],t.state="ready",t.k&&k("group"+t.hi),Ln()}function Ln(){var t=[],o,e,r=u.secs.length-1;for(o=0;o<=r;o++)for(e=0;e<U.length;e++)if(U[e].state==="ready"&&o>=U[e].lo&&o<=U[e].hi){t.push(o);break}var a=t.join(",");if(a!==Lo&&(Lo=a,typeof Ht.onLive=="function"))try{Ht.onLive(t)}catch{}}function yr(){if(!(I!=="live"||pt!=="page"||!U.length||bt.nogroups)){ce(),we=!0;var t=zo(G===null?0:G).k,o=U.filter(function(e){return e.state==="none"});o.sort(function(e,r){return Math.abs(e.k-t)-Math.abs(r.k-t)||r.k-e.k}),o.forEach(br)}}function br(t){t.state="asked",Ar(Io(t),function(o,e){if(t.info=e,!o){t.state="failed",W("the programs of stations "+t.lo+" to "+t.hi+" did not link ("+e.why+"): the page keeps its stills there");return}wr(t,o),wt()},t)}function On(t){t.state==="none"&&we&&br(t);for(var o=1;o<Dt.length;o++)if(Dt[o].tag===t){Dt.unshift(Dt.splice(o,1)[0]);break}}function Yr(t){ce();var o=zo(t),e={};if(o.state==="ready"||!d)return o.state==="ready"?o:null;try{Io(o).forEach(function(r){e[r.name]=Mr(kr(r.vs,r.fs))})}catch(r){return o.state="failed",W("group "+o.k+": "+r.message),null}return wr(o,e),o}function Dr(t){mo=[],Vt=[{fn:"shBody",file:null,local:0}],vo=[],Se=[],(t||[]).forEach(function(o){if(!(!o||typeof o!="object")){var e=Vt.length;try{mo.push(Wn(o))}catch(r){Vt.length=e,W("shapes-"+(o.id||"?")+" left out: "+r.message)}}}),mo.forEach(function(o){var e=o.src.stations||{};for(var r in e)typeof e[r]=="function"&&+r>=2&&+r<u.secs.length&&(vo[+r]={fn:e[r],file:o,gids:{},names:{},checked:!1,broken:!1});var a=o.src.ways||{};for(r in a)typeof a[r]=="function"&&(Se[+r]=a[r])}),Hn()}function Fn(t,o){var e=t.gids[o];if(e!==void 0)return e;if(t.file.gids[o]!==void 0)e=t.file.gids[o];else if(String(o)==="0")e=0;else{e=null;for(var r=0;r<mo.length;r++)mo[r].gids[o]!==void 0&&(e=mo[r].gids[o])}return t.gids[o]=e}function Cn(t,o,e){var r=t.names[o+e];if(r!==void 0)return r;var a=/^(.*?)(\d)$/.exec(e),i=[t.file,Vt[o].file],h;r=null;for(var m=0;m<i.length&&!r;m++)h=i[m],h&&(h.uni[e]===0?r=e+"_"+h.id:a&&h.uni[a[1]]>+a[2]&&(r=a[1]+"_"+h.id+"["+a[2]+"]"));return!r&&Rn[e]&&(r=e),t.names[o+e]=r}function Pe(t){var o=vo[t],e,r,a;if(!o||o.broken)return null;try{e=o.fn(oo)}catch(m){return o.broken=!0,W("station "+t+" (shapes-"+o.file.id+") threw: "+m.message),null}if(!e||!e.u)return o.broken=!0,W("station "+t+" (shapes-"+o.file.id+") returned no { shape, u, look }"),null;var i=Fn(o,e.shape);if(i===null)return o.broken=!0,W("station "+t+" (shapes-"+o.file.id+") asks for shape "+e.shape+", which no file defines"),null;var h={};for(r in e.u)a=Cn(o,i,r),a?h[a]=e.u[r]:o.checked||W("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not a uniform of its shape; left out'),!o.checked&&(!e.u[r]||e.u[r].length!==4||e.u[r].some(function(m){return typeof m!="number"||m!==m}))&&W("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not four numbers: '+JSON.stringify(e.u[r]));return o.checked=!0,{i:t,gid:i,u:h,look:gr(e.look),treads:e.treads||null,lit:e.lit,floor:e.floor||null,open:e.open===void 0?1:p(e.open),knot:e.knot||Xr,foot:typeof e.foot=="number"?e.foot:null}}function Un(){var t=Math.min(u.tiers[vt].strands,u.maxStrands);return Math.min(u.widthLod[1],Math.max(u.widthLod[0],Math.sqrt(u.tiers[0].strands/t)))}function qn(t,o,e){var r=u.track,a={},i,h=u.alive,m=u.body,f=u.hang,y=u.pointer,A=u.hangUp,N=!!A&&_>ut&&ut<=A.upTo;for(i in r)a[i]=g(r[i],t);var E=Math.min(u.tiers[vt].strands,u.maxStrands),z={p:t,time:o,v:a};z.open=a.open<1e-5?0:a.open>1-1e-5?1:a.open,z.wind=a.wind<1e-5?0:a.wind>1-1e-5?1:a.wind,z.share=Math.min(1,a.count/E);var F=l(ut/Z/(2*u.fit.aspect),_>=ut?0:f.minScale,1);if(z.hg=[ut/2/Z+f.root[0]*F,_/2/Z+f.root[1]*F,F,a.loosen],N){f=A,F=l(A.wide*ut/(A.trunkWidth*Z),A.least,A.most);var R=Ve("#clock"),w=(R?Math.max(0,R.b):.3*_)+A.under+.5*A.trunkWidth*F*Z;z.hg=[ut/2/Z+A.root[0]*F,(_/2-w)/Z+A.root[1]*F,F,a.loosen]}z.hg2=[f.sway,0,0,0];var b=p(a.loosen/f.rest[2]);b=b*b*(3-2*b);var J=f.rest[3]*(1-b);z.hg3=[(n(f.rest[0],f.tip[0],b)+J)*B,(f.tip[1]+J)*B,f.depth,f.tipCurve];var q=n(f.rest[4],1,b);z.hg4=[f.trunk[0]*q,f.trunk[1]*q,n(f.rest[1],f.reach[0],b)*q,f.reach[1]*q],z.hg5=[f.trunk[2]*q,f.reach[2]*q,f.bend];var O=h.bob*Math.sin(o*h.bobRate)*p((t-.5)/.2);z.bob=O;var L=u.swirl,T=p((t-L.gate[0])/(L.gate[1]-L.gate[0]));T=T*T*(3-2*T);var et=e===void 0?m.spin*o:e,X=et-2*Math.PI*Math.round(et/(2*Math.PI)),rt=(f.leave[0]+f.leave[1])/2;z.angle=(rt-180-L.leave)*B+a.phase+(T>=1?et:X*T),z.op3=[(f.leave[1]-f.leave[0])*B/(f.trunkWidth*F),f.trunkWidth*F,(rt+J)*B,L.settle],z.op=[z.open,L.stagger,a.hole,a.arm],z.op2=[L.leave*B,L.end*B,a.disc,z.angle],z.vx=[a.twist,a.radius,a.tube,m.squash],z.vx2=[a.flare,a.loose,m.wrap,m.wires],z.vx3=[m.treadTwist,m.wrapVar,a.tufts,m.tuftCount],z.vx4=[z.wind,a.sphere,a.ball,a.mouth],z.vxc=[a.cx,a.cy+O,0,Math.max(.01,m.lip*a.ball)],z.mouth=n(a.radius-a.tube,a.mouth,a.sphere),z.outer=n(a.radius+a.tube,a.ball,a.sphere),z.ringZ=n(a.tube*m.squash*.22,a.ball*m.ringZ,a.sphere);var j=a.yaw+h.viewSway[0]*Math.sin(o*h.viewRate[0])+a.turn*y.turn[0]*M.turnX,V=a.pitch+h.viewSway[1]*Math.sin(o*h.viewRate[1]+1.3)-a.turn*y.turn[1]*M.turnY;return z.view=s(j*B,V*B,0,It),z.core=a.core,z.floor={x:a.floorX,y:a.floorY,w:a.floorW,shadow:a.shadow*(1-4*O),pool:a.pool},z}function _n(t,o){var e=t.v,r=u.alive,a=u.page,i=u.shade,h=Math.min(u.tiers[vt].strands,u.maxStrands),m=e.yaw+(r.viewSway[0]-a.scale*a.viewSway[0])*Math.sin(o*r.viewRate[0]),f=e.pitch+(r.viewSway[1]-a.scale*a.viewSway[1])*Math.sin(o*r.viewRate[1]+1.3);return{i:1,gid:0,u:{uW0:t.vx,uW1:t.vx2,uW2:t.vx3,uW3:[e.sphere,e.ball,e.mouth,t.vxc[3]],uWC:[t.vxc[0],t.vxc[1],t.vxc[2],e.wires],uWR:[m*B,f*B,t.angle,0],uWB:[e.core,u.blueAmt.reach*t.outer/.85,e.wash,0]},look:gr({thick:e.thick,gain:e.gain,share:t.share,points:e.points,pointSize:e.pointSize,tips:e.tips,deep:e.deep,skin:n(e.skin,1-(1-e.skin)*Math.pow(u.tiers[0].strands/h,.8),e.wires),skinW:e.skinW,back:i.back}),treads:null,lit:void 0,floor:null,open:1,knot:Xr,foot:null}}function Gr(t,o,e){var r=Math.cos(o),a=Math.sin(o),i=t[0]*r+t[2]*a,h=-t[0]*a+t[2]*r,m=Math.cos(e),f=Math.sin(e);return[i,t[1]*m-h*f,t[1]*f+h*m]}function Vo(t,o,e){var r=qn(Math.min(t,1),o,e),a=r.v,i=r,h=u.shade,m=u.blueAmt,f=u.body,y=u.pointer,A=Math.min(u.tiers[vt].strands,u.maxStrands),N=1-r.wind;if(oo.time=o,oo.scrollY=zt,oo.q=t,i.rope=null,i.q=t,i.kind=0,i.mix=0,i.shA=i.shB=-1,i.u=null,i.ridge=a.wires,i.rim=a.rim,i.thick=a.thick,i.gain=a.gain,i.skinW=a.skinW,i.tips=a.tips,i.wash=a.wash,i.shade=[n(a.deep,Math.max(a.deep,h.open),N),n(a.skin,1-(1-a.skin)*Math.pow(u.tiers[0].strands/A,.8),a.wires),h.formFloor,n(h.back,Math.max(h.back,.85),N)],i.reach=m.reach*r.outer/.85,i.ring=r.core>.002?{core:r.core,at:[r.vxc[0],r.vxc[1],r.ringZ],turn:[0,0],mouth:r.mouth,outer:r.outer,bloom:a.bloom}:null,i.floors=[r.floor],i.ptsH={share:a.points,size:a.pointSize,amt:1},i.ptsS=null,i.bodyAt=[r.vxc[0],r.vxc[1]],i.turn=a.turn,i.lit=void 0,i.treads=null,i.stations=[0],i.edge=u.edge.hero,t<=1||pt==="hero")return i;var E=u.secs.length-1,z=Math.max(1,Math.min(E-1,Math.floor(t))),F=p(t-z);t>=E&&(z=E-1,F=1);var R=z===1?_n(r,o):null,w=R||Pe(z),b=F>0?Pe(z+1):w;w||(w=b),b||(b=w),i.stations=F>0?[z,z+1]:[z];var J=null,q=u.via[z+1],O=q&&F>0&&w&&b&&w.gid!==b.gid&&vo[z+.5]?Pe(z+.5):null;if(O&&O.gid===w.gid&&(F<q.at?(b=O,F=F/q.at):(w=O,F=(F-q.at)/(1-q.at),J={span:[0,1],direct:q.direct,stagger:q.stagger})),i.edge=u.edge.page,i.rim=0,i.ridge=1,i.floors=[],i.ring=null,i.ptsH=null,i.core=0,i.wash=0,i.bodyAt=null,i.turn=0,!w)return i.share=0,i.shA=i.shB=0,i.u={},i.ptsS=null,i.view=$r(0,0,o),i;var L=x(F),T={},et,X,rt,j={},V=F<1e-5?0:F>1-1e-5?1:F,Y=L,C={pass:0,share:[1,1],open:[1,1],cut:0,knot:[0,1,0,1],foot:null};if(w.gid===b.gid){for(et in w.u)X=w.u[et],rt=b.u[et]||X,T[et]=X===rt?X:[n(X[0],rt[0],L),n(X[1],rt[1],L),n(X[2],rt[2],L),n(X[3],rt[3],L)];w.gid===0&&w!==b&&w.u.uWR&&b.u.uWR&&(T.uWR[2]=n(b.u.uWR[2]+S(w.u.uWR[2]-b.u.uWR[2]),b.u.uWR[2],L)),i.shA=i.shB=w.gid,C.share=[w.look.share,b.look.share],C.open=[n(w.open,b.open,L),1];var Bt=u.cutBy[z+1];C.cut=Math.abs(w.look.share-b.look.share)>1e-4?Bt?p((V-Bt[0])/(Bt[1]-Bt[0])):V:0,Bt&&C.cut>=1&&(C.cut=.99999),C.foot=w.foot===null&&b.foot===null?null:[n(w.foot===null?b.foot:w.foot,b.foot===null?w.foot:b.foot,L),n(w.foot===null?0:w.open,b.foot===null?0:b.open,L)],C.knot=[n(w.knot[0],b.knot[0],L),n(w.knot[1],b.knot[1],L),0,1]}else{for(et in w.u)T[et]=w.u[et];for(et in b.u)T[et]=b.u[et];var Rt=J||ut<=900&&u.passNarrow[z+1]||u.passBy[z+1]||null,wo=Rt&&Rt.span?Rt.span:[0,1];C.join=Rt&&Rt.join!==void 0?Rt.join:u.rope.pass.join,C.direct=Rt&&Rt.direct?1:0,C.stagger=Rt&&Rt.stagger!==void 0?Rt.stagger:C.direct?.5:u.rope.pass.stagger,V=p((V-wo[0])/Math.max(1e-4,wo[1]-wo[0])),V=V<1e-5?0:V>1-1e-5?1:V,Y=x(V),i.shA=w.gid,i.shB=b.gid,i.kind=2,i.mix=V,C.pass=V,C.share=[w.look.share,b.look.share],C.open=[w.open,b.open],C.knot=[w.knot[0],w.knot[1],b.knot[0],b.knot[1]];var Yo=w.foot===null?0:w.open*(1-x(V/.4)),Do=b.foot===null?0:b.open*x((V-.6)/.4);C.foot=Yo+Do>0?[(Yo*(w.foot||0)+Do*(b.foot||0))/(Yo+Do),Math.max(Yo,Do)]:null,V===0?(i.shB=w.gid,i.kind=0,C.share[1]=C.share[0],C.open[1]=C.open[0]):V===1&&(i.shA=b.gid,i.kind=0,C.pass=0,C.share[0]=C.share[1],C.open[0]=C.open[1],C.knot=[b.knot[0],b.knot[1],b.knot[0],b.knot[1]])}for(et in u.look)j[et]=n(w.look[et],b.look[et],Y);if(i.u=T,i.look=j,i.share=1,i.thick=j.thick,i.gain=j.gain,i.skinW=j.skinW,i.tips=j.tips,i.shade=[j.deep,j.skin,h.formFloor,j.back],i.view=$r(j.yaw,j.pitch,o),(i.shA===0||i.shB===0)&&T.uW0&&T.uWC&&T.uWR&&T.uWB&&T.uW3){var To=R?1-x(F*u.ringOut):1;R&&b!==w&&b.u.uWB&&(T.uWB=[R.u.uWB[0]*To+b.u.uWB[0]*L,T.uWB[1],T.uWB[2],T.uWB[3]]),T.uWR=[T.uWR[0]+y.turn[0]*B*M.turnX,T.uWR[1]-y.turn[1]*B*M.turnY,T.uWR[2],T.uWR[3]];var Ne=T.uW3[0],$e=T.uW0[1],Br=T.uW0[2];if(i.mouth=n($e-Br,T.uW3[2],Ne),i.outer=n($e+Br,T.uW3[1],Ne),i.core=T.uWB[0],i.reach=Math.max(.01,T.uWB[1]),i.wash=T.uWB[2],i.bodyAt=[T.uWC[0],T.uWC[1]],i.turn=1,i.core>.002){var Lr=Gr([0,0,n(Br*T.uW0[3]*.22,T.uW3[1]*f.ringZ,Ne)],T.uWR[0],T.uWR[1]);i.ring={core:i.core,at:[T.uWC[0]+Lr[0],T.uWC[1]+Lr[1],T.uWC[2]+Lr[2]],turn:[T.uWR[0],T.uWR[1]],mouth:i.mouth,outer:i.outer,bloom:R?a.bloom*To:0}}R&&To>.002&&i.floors.push({x:r.floor.x,y:r.floor.y,w:r.floor.w,shadow:r.floor.shadow*To,pool:r.floor.pool*To})}[[w,w===b?1:1-L],[b,w===b?0:L]].forEach(function(Ze){var he=Ze[0].floor;he&&Ze[1]>.002&&i.floors.push({x:he[0],y:he[1],w:he[2],shadow:(he[3]||0)*Ze[1],pool:(he[4]||0)*Ze[1]})}),R?(i.ptsH={share:a.points,size:a.pointSize,amt:1-L},i.ptsS={share:b.look.points,size:b.look.pointSize,amt:L}):i.ptsS={share:j.points,size:j.pointSize,amt:1},i.rope=Vn(C,o);var Or=w.i===7?w:b.i===7?b:null;return Or&&(i.lit=Or.lit,i.treads=Or.treads),i}var Xr=[0,1],Qr={};function Vn(t,o){var e=u.rope,r=[],a,i,h,m,f=_;for(a=2;a<Se.length;a++)if(Se[a]){try{h=Se[a](oo)}catch(V){Qr[a]||(Qr[a]=1,W("the way of section "+a+" threw: "+V.message)),h=null}if(h)for(i=0;i<h.length;i++)h[i]&&h[i][0]===h[i][0]&&h[i][1]===h[i][1]&&r.push(h[i])}for(m=r.length,m||(r=[[ut*.5,0,0],[ut*.5,f,0]],m=2),a=1;a<m;a++)r[a][1]<r[a-1][1]+1&&(r[a]=[r[a][0],r[a-1][1]+1,r[a][2]||0]);var y=Math.max(r[0][1],-e.pad*f),A=Math.min(r[m-1][1],(1+e.pad)*f),N=e.grid[0]*f,E=e.grid[1]*f;if(at&&_t>0?(A=Math.min(r[m-1][1],(1+e.pad)*f+_t),E+=_t):at&&_t<0&&(y=Math.max(r[0][1],-e.pad*f+_t),N+=_t),t.foot&&t.foot[1]>0&&(A=n(A,Math.min(A,Math.max(t.foot[0],y+.3*f)),x(t.foot[1]))),A-y<e.least*f){var z=e.least*f-(A-y);r[m-1][1]>A+1?A+=z:y-=z}function F(V){if(V<=r[0][1])return[r[0][0],r[0][2]||0];if(V>=r[m-1][1])return[r[m-1][0],r[m-1][2]||0];for(var Y=1;r[Y][1]<V;)Y++;var C=x((V-r[Y-1][1])/(r[Y][1]-r[Y-1][1]));return[n(r[Y-1][0],r[Y][0],C),n(r[Y-1][2]||0,r[Y][2]||0,C)]}var R=e.pass,w=e.soft,b=e.len,J=t.join===void 0?R.join:t.join;function q(V){var Y=0,C=!1,Bt=t.pass;if(Bt>0&&t.direct){var Rt=x((Bt-V*t.stagger)/(1-t.stagger)),wo=x((1-t.open[0]-V*(1-w))/w),Yo=x((1-t.open[1]-V*(1-w))/w);return n(wo+(1-wo)*(1-Math.min(1,t.share[0])),Yo+(1-Yo)*(1-Math.min(1,t.share[1])),Rt)}if(Bt>0){var Do=V*R.stagger,To=J+Do;C=Bt>To,Y=C?1-x((Bt-To)/(1-J-R.stagger)):x((Bt-Do)/J)}var Ne=C?t.share[1]:t.cut?n(t.share[0],t.share[1],x(t.cut)):t.share[0],$e=C?t.open[1]:t.open[0];return Y=Math.max(Y,x((1-$e-V*(1-w))/w)),Y+(1-Y)*(1-Math.min(1,Ne))}var O=new Float32Array(32);for(i=0;i<8;i++){var L=N+(E-N)*i/7,T=F(L),et=p((L-y)/(A-y)),X=0;for(a=0;a<5;a++)X+=q(p((et-b*a/4)/(1-b)));X/=5,O[i*4]=(T[0]-ut/2)/Z,O[i*4+1]=T[1],O[i*4+2]=Math.max(e.plyLeast,e.ply*Math.sqrt(X))}var rt=2*Math.PI/e.period,j=(zt+f/2)*rt;return{flat:O,a:[(f/2-N)/Z,(f/2-E)/Z,e.swing,e.depth],y:[(f/2-y)/Z,(f/2-A)/Z,b,1],k:[j-2*Math.PI*Math.floor(j/(2*Math.PI)),-rt*Z,e.twist,e.sway],s:[t.share[0]>=.9995?2:t.share[0],t.share[1]>=.9995?2:t.share[1],t.open[0],t.open[1]],m:[t.pass,t.pass>0&&t.stagger!==void 0?t.stagger:R.stagger,t.pass>0&&t.direct?1:0,J],tt:[t.cut||0,e.aside,e.slide,t.cut?t.share[1]:0],c:t.knot,soft:w,top:y,foot:A}}function $r(t,o,e){var r=u.page,a=u.alive;return s((t+r.viewSway[0]*Math.sin(e*a.viewRate[0]))*B*r.scale,(o+r.viewSway[1]*Math.sin(e*a.viewRate[1]+1.3))*B*r.scale,0,It)}function Zr(t){var o=u.clear,e=[],r,a,i,h,m;for(i=0;i<qe.length;i++)if(r=qe[i],!(t.stations.indexOf(r.st)<0&&!(r.st===0&&t.q<=1))&&!(r.fig&&!/(^|\s)gd-in(\s|$)/.test(r.fig.className))&&(h=r.st===0?1-x((t.q-o.heroFrom)/(o.heroUntil-o.heroFrom)):1,!(h<=.002))){a=vr(r.rec,zt);var f=at?-$t:0,y=at?kt-$t:_;if(!(a.t+a.h+o.pad<f||a.t-o.pad>y)){m=(Math.min(y,a.t+a.h)-Math.max(f,a.t))*a.w;var A=r.st===0?o.heroPad:o.pad;e.push({l:a.l-A,t:a.t-A,r:a.l+a.w+A,b:a.t+a.h+A,on:h,area:m})}}return e.sort(function(N,E){return E.area-N.area}),e.slice(0,2)}function kr(t,o){var e=d.createShader(d.VERTEX_SHADER),r=d.createShader(d.FRAGMENT_SHADER),a=d.createProgram();return d.shaderSource(e,t),d.compileShader(e),d.shaderSource(r,o),d.compileShader(r),d.attachShader(a,e),d.attachShader(a,r),d.linkProgram(a),{p:a,v:e,f:r}}function Kn(t){return!Ot||!!d.getProgramParameter(t.p,Ot.COMPLETION_STATUS_KHR)}function Mr(t){var o=t.p;if(!d.getProgramParameter(o,d.LINK_STATUS))throw new Error(d.getShaderInfoLog(t.v)||d.getShaderInfoLog(t.f)||d.getProgramInfoLog(o)||"program did not link");for(var e={},r=d.getProgramParameter(o,d.ACTIVE_UNIFORMS),a=0;a<r;a++){var i=d.getActiveUniform(o,a);e[i.name]=d.getUniformLocation(o,i.name)}return{p:o,u:e}}function Ko(t){var o=d.createBuffer();return d.bindBuffer(d.ARRAY_BUFFER,o),d.bufferData(d.ARRAY_BUFFER,t,d.STATIC_DRAW),o}function xo(t,o,e){d.enableVertexAttribArray(t),d.vertexAttribPointer(t,o,d.FLOAT,!1,0,0),e&&d.vertexAttribDivisor(t,e)}function Ie(t){var o=ht[t*4+2]*7.31+ht[t*4+3]*3.77;return o-Math.floor(o)}function eo(t,o){var e=t.u[o];return e===void 0&&(e=t.u[o]=d.getUniformLocation(t.p,o)),e}function Io(t,o){t=t||U[0];var e=Pn(t),r=t.k?String(t.hi):"",a=co+e+Xo+Qo,i=Ut+e+Xo+(t.form==="rope"?Wo:Ro),h=[{name:"strand"+r,vs:bt.shader?a.replace("void main","void broken("):a,fs:me,attribs:[[0,2,0],[1,4,1]],blend:!1},{name:"point"+r,vs:i,fs:Po,attribs:[[0,2,0],[1,4,1],[2,4,1]],blend:!0}];return!o&&(t===po||arguments.length===0)&&h.push({name:"glow",vs:Ho,fs:No,attribs:[[0,2,0]],blend:!0}),h}function Jr(t,o,e){var r=t.createVertexArray(),a=[],i=e.blend,h,m,f;for(t.useProgram(o),t.bindVertexArray(r),h=0;h<e.attribs.length;h++)m=e.attribs[h],f=t.createBuffer(),a.push(f),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(16),t.STATIC_DRAW),t.enableVertexAttribArray(m[0]),t.vertexAttribPointer(m[0],m[1],t.FLOAT,!1,0,0),m[2]&&t.vertexAttribDivisor(m[0],m[2]);for(i?(t.enable(t.BLEND),i.length?t.blendFunc(i[0],i[1]):t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)):t.disable(t.BLEND),t.viewport(0,0,1,1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,1),t.bindVertexArray(null),t.deleteVertexArray(r),h=0;h<a.length;h++)t.deleteBuffer(a[h])}function In(t,o){var e=null;t.onmessage=function(r){var a=r.data,i=performance.now(),h={kind:"done",ok:!1,why:"",programs:[]},m,f,y,A,N;try{if(!e&&(e=new OffscreenCanvas(8,8).getContext("webgl2",a.attrs),y=e&&e.getExtension("WEBGL_debug_renderer_info"),y=e?String(y?e.getParameter(y.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER)):"",e&&a.soft&&new RegExp(a.soft,"i").test(y)&&(e=null),t.postMessage({kind:"ctx",ok:!!e,renderer:y}),!e))return;for(m=0;m<a.items.length;m++)f=a.items[m],f.v=e.createShader(e.VERTEX_SHADER),f.f=e.createShader(e.FRAGMENT_SHADER),f.p=e.createProgram(),e.shaderSource(f.v,f.vs),e.compileShader(f.v),e.shaderSource(f.f,f.fs),e.compileShader(f.f),e.attachShader(f.p,f.v),e.attachShader(f.p,f.f),e.linkProgram(f.p);for(m=0;m<a.items.length;m++){if(f=a.items[m],A=performance.now(),!e.getProgramParameter(f.p,e.LINK_STATUS))throw new Error(f.name+": "+(e.getShaderInfoLog(f.v)||e.getShaderInfoLog(f.f)||e.getProgramInfoLog(f.p)||"did not link"));N=performance.now(),o(e,f.p,f),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array(4)),h.programs.push([f.name,Math.round(N-A),Math.round(performance.now()-N)])}h.ok=!0}catch(E){h.why=String(E&&E.message||E)}h.ms=Math.round(performance.now()-i),t.postMessage(h)}}function tn(t,o,e){return{items:t,done:o,tag:e||null,hold:!1,drop:null,info:{how:"direct",ms:0,waited:0,worker:[],why:""}}}function Ar(t,o,e){!e&&(I==="live"||I==="lost")&&Je.push({items:t,done:o}),Dt.push(tn(t,o,e)),je()}function jn(){if(I!=="live"||!so)return!0;var t=performance.now();return xt>2&&Me&&!M.busy&&t-Uo>u.warm.quietMs&&t-ee>u.fadeInMs&&t-Zo>u.groupFadeMs}function Yn(){try{return typeof Ht.calm!="function"||!!Ht.calm()}catch{return!0}}function on(t,o,e){var r=null,a="",i=0,h=!1;function m(){clearTimeout(i),r&&(r.onmessage=r.onerror=null,r.terminate(),r=null),a&&(URL.revokeObjectURL(a),a="")}function f(){h||(h=!0,m(),e())}try{if(bt.noworker||!window.Worker||!window.OffscreenCanvas||!window.Blob||!window.URL)throw new Error("no worker");a=URL.createObjectURL(new Blob(["("+In.toString()+")(self,"+Jr.toString()+")"],{type:"text/javascript"})),r=new Worker(a),r.onmessage=function(y){var A=y.data||{};if(A.kind==="ctx"){A.ok||f();return}A.ok?(o.how="worker",o.worker=A.programs):o.why=String(A.why||""),f()},r.onerror=f,i=setTimeout(f,u.warm.giveUpMs),r.postMessage({attrs:Fr,soft:tt.source,items:t.map(function(y){return{name:y.name,vs:y.vs,fs:y.fs,attribs:y.attribs,blend:y.blend}})})}catch{setTimeout(f,0)}return function(){h=!0,m()}}function en(t){return t.map(function(o){return o.name+`
`+o.vs+`
`+o.fs}).join(`

`)}function je(){if(clearTimeout(xe),xe=0,St||!Dt.length)return;if(!d||I!=="building"&&I!=="live"){Dt=[];return}if(I==="live"&&!Yn()||!jn()&&!(Dt[0].tag&&yo&&!Oo&&xt>2)){xe=setTimeout(je,120);return}var t=St=Dt.shift();t.t0=performance.now();function o(){t.hold=!1,t.drop=null,St===t&&(k("warm"),Dn(t))}if(mt&&mt.over&&mt.key===en(t.items)){t.info.how=mt.info.how,t.info.worker=mt.info.worker,t.info.why=mt.info.why,t.info.early=mt.ms,mt=null,o();return}t.hold=!0,t.drop=on(t.items,t.info,o)}function Dn(t){var o,e={},r=0,a=!1,i=0;try{o=t.items.map(function(h){return kr(h.vs,h.fs)})}catch(h){Sr(t,null,h.message);return}(function h(){if(Bo=0,!(St!==t||!d)){var m;if(!a){if(Ot){for(m=0;m<o.length;m++)if(!Kn(o[m])){t.info.waited++,Bo=requestAnimationFrame(h);return}}else if(r<o.length&&(d.getProgramParameter(o[r++].p,d.LINK_STATUS),r<o.length)){Bo=requestAnimationFrame(h);return}try{for(m=0;m<o.length;m++)e[t.items[m].name]=Mr(o[m])}catch(f){Sr(t,null,f.message);return}a=!0}if(t.info.how!=="worker"&&i<t.items.length){Jr(d,e[t.items[i].name].p,t.items[i]),i++,I==="live"&&lt&&!Xt&&xt>2&&(jo(),Kt(lt)),Bo=requestAnimationFrame(h);return}Sr(t,e,"")}})()}function Sr(t,o,e){if(St===t){St=null,t.info.ms=Math.round(performance.now()-t.t0),e&&(t.info.why=e);try{typeof t.done=="function"&&t.done(o,t.info)}catch(r){W("warm: "+r.message)}je()}}function rn(){clearTimeout(xe),xe=0,Bo&&(cancelAnimationFrame(Bo),Bo=0),St&&St.drop&&St.drop(),St=null,Dt=[]}function Gn(){var t=zo(G===null?0:G),o={};U.forEach(function(e){e.strand=e.point=null,e.state!=="failed"&&(e.state="none")}),po=t,Lo="",Io(t).forEach(function(e){o[e.name]=Mr(kr(e.vs,e.fs))}),nn(o,t)}function nn(t,o){gt={glow:t.glow},wr(o,t);var e=new Float32Array((yt+1)*4),r;for(r=0;r<=yt;r++)e[r*4]=r,e[r*4+1]=-1,e[r*4+2]=r,e[r*4+3]=1;for(var a=c(77),i=new Float32Array(Yt*4),h=new Float32Array(Yt*4),m=0,f=u.track.count[0][1]/Math.min(u.tiers[0].strands,u.maxStrands)-.04,y={},A=u.tiers.length-1;A>=0;A--){var N=[],E=[],z=Math.min(u.tiers[A].strands,u.maxStrands),F=Math.min(u.tiers[A].points,Yt);for(r=0;r<z;r++)Ie(r)<f&&(N.push(r),y[r]||E.push(r));for(N.length||N.push(0),r=m;r<F;r++){var R=a(),w=R<.64&&E.length>0,b=w?E.shift():N[Math.floor(a()*N.length)];w&&(y[b]=!0),i.set(ht.subarray(b*4,b*4+4),r*4),h[r*4]=w?1:.2+.72*a(),h[r*4+1]=w?16+10*a():R>.86?8+6*a():5+4*a(),h[r*4+2]=a(),h[r*4+3]=w?0:R>.86?1:2}m=Math.max(m,F)}var J=u.pagePoints[0],q=new Float32Array(J*4),O=new Float32Array(J*4);for(a=c(77),r=0;r<J;r++){var L=Math.floor(a()*500),T=a()<.35;q.set(ht.subarray(L*4,L*4+4),r*4),O[r*4]=.15+.75*a(),O[r*4+1]=T?14+8*a():5+5*a(),O[r*4+2]=a(),O[r*4+3]=T?0:1}cr=u.tiers.map(function(rt){var j=Math.min(rt.strands,u.maxStrands),V=[],Y,C=new Float32Array(j*4),Bt=new Float32Array(j);for(Y=0;Y<j;Y++)V.push(Y);for(u.sortStrands&&V.sort(function(Rt,wo){return Ie(Rt)-Ie(wo)||Rt-wo}),Y=0;Y<j;Y++)C.set(ht.subarray(V[Y]*4,V[Y]*4+4),Y*4),Bt[Y]=Ie(V[Y]);return{n:j,data:C,picks:Bt}}),$={strand:[],point:d.createVertexArray(),pointS:d.createVertexArray(),quad:d.createVertexArray()};var et=Ko(e);cr.forEach(function(rt){var j=d.createVertexArray();d.bindVertexArray(j),d.bindBuffer(d.ARRAY_BUFFER,et),xo(0,2,0),Ko(rt.data),xo(1,4,1),$.strand.push(j)}),d.bindVertexArray($.point);var X=Ko(new Float32Array([-1,-1,1,-1,-1,1,1,1]));xo(0,2,0),Ko(i),xo(1,4,1),Ko(h),xo(2,4,1),d.bindVertexArray($.pointS),d.bindBuffer(d.ARRAY_BUFFER,X),xo(0,2,0),Ko(q),xo(1,4,1),Ko(O),xo(2,4,1),d.bindVertexArray($.quad),d.bindBuffer(d.ARRAY_BUFFER,X),xo(0,2,0),d.bindVertexArray(null)}function Xn(t){var o=cr[vt];if(t>=.999||!u.sortStrands)return o.n;for(var e=t+.031,r=0,a=o.n,i;r<a;)i=r+a>>1,o.picks[i]<=e?r=i+1:a=i;return r}function jo(){var t=u.tiers[vt];Et=at?Math.min(window.devicePixelRatio||1,t.dprCap,u.carry.dpr,Math.sqrt(t.pixelCap*u.carry.pixels/Math.max(1,ut*kt))):Math.min(window.devicePixelRatio||1,t.dprCap,Math.sqrt(t.pixelCap/Math.max(1,ut*_))),uo&&(Et*=u.gpu.px[Math.min(uo,u.gpu.px.length-1)]);var o=Math.max(1,Math.round(ut*Et)),e=Math.max(1,Math.round((at?kt:_)*Et));(o!==st||e!==dt)&&(st=P.width=o,dt=P.height=e)}function an(t,o){var e=t.u,r=u.pointer,a=M.finger?r.fingerRadius:r.radius,i=o.u||{},h;d.useProgram(t.p),d.uniform1f(e.uTime,o.time),d.uniform1f(e.uShare,o.share>=.999?2:o.share),d.uniform1f(e.uRidge,o.ridge),d.uniform4fv(e.uHg,o.hg),d.uniform4fv(e.uHg2,o.hg2),d.uniform4fv(e.uHg3,o.hg3),d.uniform4fv(e.uHg4,o.hg4),d.uniform3fv(e.uHg5,o.hg5),d.uniform4fv(e.uOp,o.op),d.uniform4fv(e.uOp2,o.op2),d.uniform4fv(e.uOp3,o.op3),d.uniform4fv(e.uVx,o.vx),d.uniform4fv(e.uVx2,o.vx2),d.uniform4fv(e.uVx3,o.vx3),d.uniform4fv(e.uVx4,o.vx4),d.uniform4fv(e.uVxC,o.vxc),d.uniform1i(e.uShA,o.shA),d.uniform1i(e.uShB,o.shB);var m=o.rope;m&&(d.uniform4fv(eo(t,"uRp[0]"),m.flat),d.uniform4fv(eo(t,"uRpA"),m.a),d.uniform4fv(eo(t,"uRpY"),m.y),d.uniform4fv(eo(t,"uRpK"),m.k),d.uniform4fv(eo(t,"uRpS"),m.s),d.uniform4fv(eo(t,"uRpM"),m.m),d.uniform4fv(eo(t,"uRpT"),m.tt),d.uniform4fv(eo(t,"uRpC"),m.c),d.uniform1f(eo(t,"uRpSoft"),m.soft));for(h in i)d.uniform4fv(eo(t,h),i[h]);d.uniformMatrix4fv(e.uView,!1,o.view),d.uniformMatrix4fv(e.uProj,!1,K),d.uniform4f(e.uStage,2*Z/ut,o.stageY,0,o.shiftNdc),d.uniform1f(e.uCamD,It),d.uniform4f(e.uPtr,M.ax,M.ay,o.ptrA,a),d.uniform4f(e.uPtr2,M.bx,M.by,o.ptrB,a*1.15),d.uniform3f(e.uPtrAmt,r.aside,r.gather,0),d.uniform2f(e.uPulse,o.pulse[0],o.pulse[1]),d.uniform1f(e.uPulseW,r.pulseWidth),d.uniform4fv(eo(t,"uKc[0]"),o.kcRect),d.uniform4f(e.uKcAmt,Math.max(1,(o.q<=1?u.clear.heroSoft:u.clear.soft)*Et),u.clear.dark,o.kcOn[0],o.kcOn[1])}function Ye(t,o,e,r,a){var i=gt.glow.u;d.uniform1f(i.uKind,t),d.uniform1f(i.uAmt,o),d.uniform2f(i.uSize,e,r),d.uniform3f(i.uPos,a[0],a[1],a[2]),d.drawArrays(d.TRIANGLE_STRIP,0,4)}function Kt(t){var o=d,e=u.tiers[vt],r=u.light,a=u.shade,i=u.blueAmt,h=u.blue,m=u.floor,f;if(o.viewport(0,0,st,dt),o.disable(o.SCISSOR_TEST),o.disable(o.BLEND),o.depthMask(!0),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),!!t){var y=t.G;if(!(!y||y.state!=="ready")){if(!Nn(y,t)){tr[y.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]||(tr[y.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]=1,W("group "+y.k+" (stations "+y.lo+" to "+y.hi+") cannot draw shapes "+t.shA+" and "+t.shB+" with passage kind "+t.kind+": see CONF.groups"));return}lr=!1;var A=Math.sin(t.time*u.pulse.rate),N=t.time,E=t.fade===void 0?1:t.fade;if(t.shiftNdc=-2*le/_,t.stageY=2*Z/_,at&&(t.stageY=2*Z/kt,t.shiftNdc=(kt-_-2*$t-2*le)/kt),pt==="hero"){var z=Math.max(0,Math.min(dt,Math.round((ft.stageH+le)*Et)));o.enable(o.SCISSOR_TEST),o.scissor(0,dt-z,st,z)}if(t.ptrA=t.quiet?0:M.a,t.ptrB=t.quiet?0:M.b,t.pulse=[-9,-9],!t.quiet)for(f=0;f<to.length&&f<2;f++)t.pulse[f]=-.15+1.35*(N-to[f])/u.pointer.pulse;var F=Zr(t),R=new Float32Array(8);for(t.kcOn=[0,0],f=0;f<2;f++)if(F[f]){var w=at?kt-$t:_;R.set([F[f].l*Et,(w-F[f].b)*Et,F[f].r*Et,(w-F[f].t)*Et],f*4),t.kcOn[f]=F[f].on}else R.set(Mn,f*4);for(t.kcRect=R,t.kc=F,o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.disable(o.DEPTH_TEST),o.useProgram(gt.glow.p),o.uniformMatrix4fv(gt.glow.u.uView,!1,t.view),o.uniformMatrix4fv(gt.glow.u.uProj,!1,K),o.uniform4f(gt.glow.u.uStage,2*Z/ut,t.stageY,0,t.shiftNdc),o.uniform3f(gt.glow.u.uBlue,h[0],h[1],h[2]),o.uniform2f(gt.glow.u.uTurn,0,0),o.bindVertexArray($.quad),f=0;f<t.floors.length;f++){var b=t.floors[f];m.shadow*b.shadow>.002&&Ye(3,m.shadow*b.shadow*E,b.w*1.5,.15,[b.x+.03,b.y-.02,-It]),m.pool*b.pool>.002&&Ye(4,m.pool*b.pool*(.92+.08*A)*E,b.w*1.15,.17,[b.x+b.w*.2,b.y-.05,-It])}o.disable(o.BLEND),o.depthMask(!0),o.enable(o.DEPTH_TEST),o.depthFunc(o.LESS),an(y.strand,t);var J=Xn(t.share),q=Math.min(e.segments,yt),O=y.strand.u;if(o.uniform1f(O.uSeg,q),o.uniform1f(O.uWidth,u.width*Un()),o.uniform1f(O.uWMul,t.thick),o.uniform1f(O.uMinPx,u.minPx),o.uniform1f(O.uPxUnit,Z*Et),o.uniform1f(O.uCore,t.core),o.uniform1f(O.uBreath,A),o.uniform1f(O.uWave,u.pulse.wave),o.uniform1f(O.uMouth,t.mouth),o.uniform3f(O.uReach,t.reach,i.lean,i.glare),o.uniform1f(O.uWash,t.wash),o.uniform1f(O.uTips,t.tips),o.uniform1f(O.uTipWash,i.tipWash),o.uniform1f(O.uRim,t.rim),o.uniform2f(O.uVar,a.strandVar,a.darkShare),o.uniform1f(O.uExposure,u.exposure*t.gain),o.uniform1f(O.uSkinW,t.skinW),o.uniform1f(O.uGlint,r.glint),o.uniform1f(O.uKick,i.kick),o.uniform1f(O.uArmSide,r.armSide),o.uniform4f(O.uLight,r.key,r.strips,r.fill,r.room),o.uniform4fv(O.uArms,r.arms),o.uniform4fv(O.uShade,t.shade),o.uniform3f(O.uBlue,h[0],h[1],h[2]),o.uniform4f(O.uBlueAmt,i.tint,i.light,i.hot,i.sheen),o.uniform4f(O.uFade,E,t.edge>0?t.edge*Math.min(st,dt):0,st,dt),J>0&&(o.bindVertexArray($.strand[vt]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,(q+1)*2,J)),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.depthFunc(o.LEQUAL),t.ring&&t.ring.core>.002){var L=t.ring;o.disable(o.DEPTH_TEST),o.useProgram(gt.glow.p),o.bindVertexArray($.quad),o.uniform1f(gt.glow.u.uRingR,1/3),o.uniform2f(gt.glow.u.uHaze,i.haze[0],i.haze[1]);var T=t.view,et=L.outer*.9,X=Gr([0,0,et],L.turn[0],L.turn[1]),rt=[L.at[0]+X[0],L.at[1]+X[1],X[2]];L.bloom*i.bloom>.002&&Ye(4,L.bloom*i.bloom*(.9+.1*A)*E,L.outer*1.05,L.outer*1.05,[T[0]*rt[0]+T[4]*rt[1]+T[8]*rt[2]+T[12],T[1]*rt[0]+T[5]*rt[1]+T[9]*rt[2]+T[13],T[2]*rt[0]+T[6]*rt[1]+T[10]*rt[2]+T[14]]),o.uniform2f(gt.glow.u.uTurn,L.turn[0],L.turn[1]),Ye(0,L.core*(.94+.06*A)*i.ring*E,L.mouth*3,L.mouth*3,L.at),o.enable(o.DEPTH_TEST)}if(t.ptsH||t.ptsS){an(y.point,t);var j=y.point.u,V=Math.max(.7,Math.min(1.15,Z/420)),Y=[[t.ptsH,$.point,Math.min(e.points,Yt)],[t.ptsS,$.pointS,Math.min(u.pagePoints[vt],u.pagePoints[0])]];for(o.uniform2f(j.uRes,st,dt),o.uniform1f(j.uTravel,u.alive.travel),o.uniform1f(j.uSparkle,t.quiet?0:u.alive.sparkle),o.uniform1f(j.uPtLift,.07),o.uniform1f(j.uRim,t.rim),o.uniform3f(j.uBlue,h[0],h[1],h[2]),f=0;f<2;f++){var C=Y[f][0];!C||C.amt*C.share<=.002||(o.uniform1f(j.uPtShare,C.share),o.uniform1f(j.uPtScale,Et*V*C.size),o.uniform1f(j.uPointAmt,i.points*C.amt*E),o.bindVertexArray(Y[f][1]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Y[f][2]))}}o.bindVertexArray(null)}}}function zr(t,o,e){M.cx=t,M.cy=o,M.on=e,Uo=performance.now(),wt()}function sn(){return G!==null&&G<1}function Qn(t){if(t.pointerType==="touch"){if(!M.down||sn())return;M.finger=!0}else M.finger=!1;zr(t.clientX,t.clientY,1)}function $n(t){if(!(t.pointerType==="mouse"&&t.button!==0)){if(M.down=!0,M.finger=t.pointerType==="touch",M.downAt=[t.clientX,t.clientY,performance.now()],M.finger&&sn()){Uo=performance.now();return}zr(t.clientX,t.clientY,1)}}function Zn(t){var o=M.downAt;M.down&&o&&Math.abs(t.clientX-o[0])+Math.abs(t.clientY-o[1])<12&&performance.now()-o[2]<600&&Tr(),M.down=!1,M.downAt=null,t.pointerType==="touch"&&(M.on=0)}function Jn(){M.down=!1,M.downAt=null,M.on=0}function un(){M.on=0}function ln(){return!fr&&!/(^|\s)menu-open(\s|$)/.test(Q.className)}function Tr(){I!=="live"||!ln()||lo||(to.unshift(bo),to.length>2&&(to.length=2),wt())}function ta(t){var o=u.pointer,e=t/16.667,r=(M.cx-ut/2)/Z,a=(_/2+le-M.cy)/Z,i=M.cy>=0&&M.cy<=_,h=!i||!ln()?0:M.on;h&&M.a<.004&&M.b<.004&&(M.ax=M.bx=r,M.ay=M.by=a);var m=1-Math.pow(1-o.follow[0],e),f=1-Math.pow(1-o.follow[1],e);h&&(M.ax+=(r-M.ax)*m,M.ay+=(a-M.ay)*m),M.bx+=(M.ax-M.bx)*f,M.by+=(M.ay-M.by)*f;var y=1-Math.pow(1-(h>M.a?o.rise:o.fall),e);M.a+=(h-M.a)*y,M.b+=(M.a-M.b)*(1-Math.pow(1-o.fall*1.6,e));var A=Ae?M.a*Math.tanh((M.ax-Ae[0])/1.1):0,N=Ae?M.a*Math.tanh((M.ay-Ae[1])/.8):0,E=1-Math.pow(1-.06,e);for(M.turnX+=(A-M.turnX)*E,M.turnY+=(N-M.turnY)*E,M.busy=Math.abs(h-M.a)>.003||M.b>.003&&Math.abs(M.a-M.b)>.003||h>0&&(Math.abs(r-M.ax)+Math.abs(a-M.ay)>.002||Math.abs(M.ax-M.bx)+Math.abs(M.ay-M.by)>.002)||Math.abs(A-M.turnX)+Math.abs(N-M.turnY)>.003;to.length&&bo-to[to.length-1]>o.pulse*1.1;)to.pop();return oo.ptr.x=M.ax,oo.ptr.y=M.ay,oo.ptr.on=M.a,M.busy||to.length>0}function oa(t,o){var e=!1,r,a,i=1-Math.exp(-t/(u.hoverS*1e3/3));for(r=0;r<3;r++)Math.abs(ue[r]-Te[r])>.004?(Te[r]+=(ue[r]-Te[r])*i,e=!0):Te[r]=ue[r];for(r=0;r<3;r++){var h=0;o>5&&o<7&&dr[r]&&(h=parseFloat(dr[r].style.getPropertyValue("--b"))||0),h!==mr[r]&&(mr[r]=h,e=!0)}for(r in _e)a=_e[r],Math.abs(a.to-a.v)>.001?(a.v+=(a.to-a.v)*(1-Math.exp(-t/(a.s*1e3/3))),e=!0):a.v=a.to;return e}function De(t){if(t!==Ee){for(var o=0;o<3;o++){var e=_r[o];e&&(o<t?e.getAttribute("data-scene-lit")!=="1"&&e.setAttribute("data-scene-lit","1"):e.hasAttribute("data-scene-lit")&&e.removeAttribute("data-scene-lit"))}Ee=t}}function Ge(t){if(Ae=t.bodyAt&&t.turn>0?t.bodyAt:null,pt==="page"){if(t.lit!==void 0){Re=!0,De(Math.max(0,Math.min(3,Math.round(t.lit))));return}if(Re===void 0&&vo[7]){var o=Pe(7);Re=!!(o&&o.lit!==void 0)}Re&&(t.q>=8?De(3):t.q<=6&&De(0))}}function fn(t){var o=zo(G),e;return o.state==="ready"?(yo&&(yo=!1,Oo&&Qt!==null&&Math.abs(o.k-zo(Qt).k)<=1?G=Qt:xt>2&&(Zo=t),Oo=!1,o=zo(G)),{q:G,G:o}):(On(o),e=Bn(G),e&&!ea(e.q,zt)&&(e=null),yo=!0,Oo=!!e,e||{q:G,G:null})}function ea(t,o){var e,r,a=.35*_,i;if(t<=1)e=ft.top,r=ft.top+ft.h;else{if(e=Ft[t],e==null)return!0;for(r=ye+Gt,i=t+1;i<Ft.length;i++)if(Ft[i]!==null&&Ft[i]!==void 0){r=Ft[i];break}}return r+a>o&&e-a<o+_}function ra(){var t=Tt.get("scene-carry");return pt==="page"&&(t==="1"||t!=="0"&&!!window.matchMedia&&window.matchMedia("(hover: none) and (pointer: coarse)").matches)}function na(t){if(t<Be)return!0;for(var o=0;o<ao.length;o++)if(t>=ao[o][0]&&t<=ao[o][1])return!0;return!1}function Xe(t,o){var e=u.carry,r=Nt,a=Mt;if(na(t))return o!==null&&(ho=0,be=t),$t=0,_t=0,Nt!=="f"&&(Nt="f",Mt=null,P.style.position="fixed",P.style.top="0px"),r!==Nt;var i=kt-_,h=Math.max(0,oe-kt);o!==null&&(ho=be===null||!o?0:.5*ho+.5*(t-be)/o,be=t);var m=Math.abs(ho)>e.slow,f=m?ho>0?t-e.back:t-i+e.back:t-i/2,y=Math.round(Math.min(h,Math.max(0,f))),A=m?e.step:Math.abs(ho)<.02?i/4:i/2-e.near;(Mt===null||Mt>h||y!==Mt&&Math.abs(f-Mt)>A)&&(Mt=y,Nt!=="a"&&(Nt="a",P.style.position="absolute"),(Mt!==a||r!=="a")&&(P.style.top=Mt+"px")),$t=t-Mt;var N=Math.max(-1,Math.min(1,ho*e.lead/Math.max(1,i-e.back)))*(i-e.back);return o!==null&&(_t+=(N-_t)*(o?1-Math.pow(1-.2,o/16.667):1),Math.abs(_t)<.5&&N===0&&(_t=0)),r!==Nt||Mt!==a}function aa(t){return at&&Nt==="a"&&Mt!==null&&(t<Mt||t+_>Mt+kt)}function wt(){I==="live"&&!so&&!document.hidden&&(so=requestAnimationFrame(Rr))}function Er(){so&&cancelAnimationFrame(so),so=0,io=0,Qe()}function ia(t){if(document.hidden)return"hidden";var o=Q.className;if(/(^|\s)wk-open(\s|$)/.test(o))return"project";if(/(^|\s)offer-open(\s|$)/.test(o))return"offer";if(u.sleepUnderMenu&&/(^|\s)menu-open(\s|$)/.test(o))return"menu";if(pt==="hero")return t>=ft.top+ft.h?"stage-out":"";if(ze){var e=u.proof,r=Kr(ze,t)-t,a=r+ze.h,i=e.whole?0:e.melt;if((Math.min(a-i,_)-Math.max(r+i,0))/_>=e.cover)return"proof"}return""}function cn(t){if(Q.classList.add("scene-on"),ee=t,k("on"),!$o&&($o=!0,typeof Ht.onReady=="function"))try{Ht.onReady()}catch{}}function Rr(t){if(St&&St.hold&&I==="live"&&!bt.nohold){io=0,so=requestAnimationFrame(Rr);return}if(xt>2){pn(t);return}var o=performance.now();pn(t),qt.frames.push(+(performance.now()-o).toFixed(1))}function pn(t){if(so=0,!(I!=="live"||document.hidden)){var o=io?Math.min(100,t-io):16.667,e=io?t-io:0;if(io=t,Oe++,Fe=!1,e>3&&e<100&&(ke+=(e-ke)*Math.max(.12,1/(er+4)),er++),no&&_o(),typeof Ht.before=="function")try{Ht.before(t)}catch{}var r=window.scrollY,a=r!==zt,i=Math.abs(r-zt)>u.jump.windows*_;zt=r,le=pt==="hero"?Math.min(0,ft.top+ft.h-r-ft.stageH):0;var h=D?"":ia(r);if(h){if(h==="proof"&&(lo!=="proof"||aa(r))&&xt>2&&!Xt){at&&Xe(r,0),jo(),Jt=G=Ke(r);var m=fn(t),f=Vo(m.q,bo,Le);f.G=m.G,f.fade=1,Qt=m.q,Ge(f),Kt(f),xt++,Fe=!0,lt=f}h==="stage-out"&&lo!=="stage-out"&&xt>2&&!Xt&&(jo(),Kt(null)),h==="stage-out"&&xt<2&&!Xt&&(jo(),Kt(null),xt=3,cn(t-u.fadeInMs-1)),lo=h,Mo=!0,io=0,Qe();return}lo="",fa(t),jo();var y=at?Xe(r,e):!1;Jt=D?D.q:Ke(r),G===null||Mo||D||i&&Math.abs(Jt-G)>u.jump.stations||Jt<=1&&G<=1?G=Jt:(G+=(Jt-G)*(1-Math.pow(1-u.smooth,ke/16.667)),Math.abs(Jt-G)<2e-4&&(G=Jt)),Mo=!1;var A=D?null:fn(t);Me=G===Jt;var N,E=!Me||a,z=1;if(D?(N=Vo(D.q,D.t),N.quiet=!0,N.G=Yr(D.q)):(bo+=o/1e3,G>=u.swirl.gate[1]&&(Le+=u.body.spin*o/1e3),ta(o)&&(E=!0),oa(o,G)&&(E=!0),N=Vo(A.q,bo,Le),N.G=A.G,ee?(z=p((t-ee)/u.fadeInMs),z<1&&(E=!0)):z=0,Zo&&t-Zo<u.groupFadeMs&&(z=Math.min(z,p((t-Zo)/u.groupFadeMs)),E=!0)),N.fade=z,Qt=D?D.q:A.q,Ge(N),yo&&!D&&!N.G&&xt>2){!lr&&!Xt&&(Kt(null),lr=!0),lo="waiting",Mo=!0,io=0,lt=N;return}var F=t-Uo>u.idleAfterMs,R=ir!==null?ir:vt>0||F?u.idleEvery:1,w=Xt||!D&&!E&&!y&&xt>2&&(R===0||R>1&&Oe%R!==0);if(Xt&&!sr&&(Kt(null),sr=!0),w||(Kt(N),xt++,Fe=!0,xt===1&&k("frame"),xt===2&&(cn(t),pt==="page"&&setTimeout(yr,0)),D||la()),lt=N,!D&&!(at&&(a||!Me)&&!se)&&ua(se||e),I==="live"){if(D&&xt>2){io=0;return}so=requestAnimationFrame(Rr)}}}function sa(){if(I==="live"){var t=_o();if(t){var o=at&&!lo&&!Xt&&lt&&xt>2?Xe(zt,null):!1;if((Fe||o)&&lt&&!Xt){var e=D?Vo(D.q,D.t):Vo(Qt===null?0:Qt,bo,Le);e.quiet=lt.quiet,e.fade=lt.fade,e.G=lt.G,jo(),Ge(e),Kt(e),lt=e}wt()}}}function hn(){return{warm:0,list:[],cool:0,recent:[],calm:0,upped:!1}}function ua(t){if(t&&(ot.recent.push(t),ot.recent.length>60&&ot.recent.shift(),!(ur&&!se))){if(ot.cool>0){ot.cool--;return}if(ot.warm<u.warmup){ot.warm++;return}if(ot.list.push(t),!(ot.list.length<u.window)){var o=v(ot.list);if(ot.list=[],o>u.slowMs){if(ot.cool=u.cooldown,ot.calm=0,ot.upped&&(Co.fails++,ot.upped=!1),vt<u.tiers.length-1){vt++,st=dt=0;return}pe("too-slow");return}if(o>u.fastMs){ot.calm=0;return}ot.calm+=u.window,!(ot.calm<u.calm*Math.pow(2,Co.fails))&&(ot.calm=0,ot.upped=!1,vt>Ce&&Co.fails<u.retries&&dn(performance.now())&&(vt--,st=dt=0,ot.upped=!0,ae=!0,ko=performance.now()))}}}function la(){if(!(!d||I!=="live"||at||xt<u.gpu.afterDrawn)){if(ie){++re>=u.gpu.every&&(re=0,mn(ie,performance.now()));return}if(!(Zt||St)&&!(++re<u.gpu.every)){re=0;try{Zt=d.fenceSync(d.SYNC_GPU_COMMANDS_COMPLETE,0),d.flush()}catch{Zt=null}Ur=Oe,rr=!1}}}function fa(t){if(Zt){if(St){Qe();return}var o=Oe-Ur,e=!1;try{e=d.getSyncParameter(Zt,d.SYNC_STATUS)===d.SIGNALED}catch{e=!0,rr=!0}if(!(!e&&o<u.gpu.giveUp)){try{d.deleteSync(Zt)}catch{}Zt=null,rr||mn(o,t)}}}function Qe(){if(Zt&&d)try{d.deleteSync(Zt)}catch{}Zt=null,re=0}function dn(t){return t-ko>=u.gpu.calmMs*Math.pow(2,Co.fails)}function mn(t,o){var e=u.gpu,r=t>=e.behind,a,i=0;if(nr=t,!(ur&&!ie)){if(ko||(ko=o),ne>0){ne--,r&&(ko=o);return}for(Fo.push(r?1:0),Fo.length>e.of[1]&&Fo.shift(),a=0;a<Fo.length;a++)i+=Fo[a];if(r&&(ko=o),i>=e.of[0]){Fo=[],ne=e.cool,ae&&(Co.fails++,ae=!1),uo<e.px.length-1?(uo++,st=dt=0,H.push("gpu behind ("+t+" frames): pixels x "+e.px[uo])):vt<u.tiers.length-1&&(vt++,st=dt=0,ot.calm=0,H.push("gpu behind ("+t+" frames): tier "+vt));return}r||!dn(o)||(ae=!1,uo>0&&vt<=Ce&&Co.fails<u.retries&&(uo--,st=dt=0,ae=!0,ko=o,ne=e.cool,H.push("gpu calm: pixels x "+e.px[uo])))}}var Wr="position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;display:block",ca="html.scene-on .stage{background:transparent}html.scene-on .stage .poster,html.scene-on .stage .hero-video,html.scene-on .stage.video-ready .hero-video,html.scene-on .stage.rev-on .hero-video.rev{opacity:0}html.scene-on .stage .poster{visibility:hidden;transition:opacity 1.1s var(--ease),visibility 0s linear 1.1s}html.scene-on .stage .hero-video{visibility:hidden}html.scene-on .stage .scrim{display:none}html.scene-on body:not(.bg-on) .bg-wrap{transition-duration:.12s}";function pa(){var t=parseInt(Tt.get("scene-tier"),10);if(bt.tier!==void 0)return bt.tier;if(t>=0&&t<u.tiers.length)return t;var o=window.matchMedia&&(window.matchMedia("(max-width: 820px)").matches||window.matchMedia("(pointer: coarse)").matches);return o?1:0}function vn(t){return I!=="off"&&He(),Ht=t||{},pt=Ht.mode==="hero"?"hero":"page",Jo="",k("start"),qt={begin:0,send:0,waited:0,take:0,frames:[]},da(),mt&&!mt.over?(I="building",mt.then=function(){I==="building"&&!d&&xn()},!0):xn()}function xn(){var t=performance.now(),o=window.scrollY;P=document.createElement("canvas"),P.className="sfs-scene",P.setAttribute("aria-hidden","true"),P.style.cssText=Wr,at=ra(),kt=0,$t=0,Mt=null,Nt="",ho=0,be=null,_t=0,ao=[],at&&(P.style.cssText=Wr.replace(/height:100(l?vh)/g,"height:calc(100$1 + "+u.carry.extra+"px)"),Nt="f");var e=document.querySelector(".env");if(e&&e.parentNode?e.parentNode.insertBefore(P,e.nextSibling):document.body.insertBefore(P,document.body.firstChild),d=bt.nogl?null:P.getContext("webgl2",Fr),!d)return wn(),pe("no-webgl2");Pt=d.getExtension("WEBGL_lose_context");var r=d.getExtension("WEBGL_debug_renderer_info");if(or=String(r?d.getParameter(r.UNMASKED_RENDERER_WEBGL):d.getParameter(d.RENDERER)),bt.software||tt.test(or))return He(),pe("software-renderer");if(Ot=d.getExtension("KHR_parallel_shader_compile"),qt.context=+(performance.now()-t).toFixed(1),Dr(pt==="hero"?null:window.__sceneShapes),P.addEventListener("webglcontextlost",yn),P.addEventListener("webglcontextrestored",bn),pt==="hero"&&!document.getElementById("sfs-scene-style")&&(Lt=document.createElement("style"),Lt.id="sfs-scene-style",Lt.textContent=ca,document.head.appendChild(Lt)),Ce=pa(),vt=Ce,xt=0,ee=0,st=dt=0,G=null,no=!0,te="",Ao={},qo={},Ee=-1,Re=void 0,Uo=performance.now(),ot=hn(),Co={fails:0},lo="",Mo=!1,Xt=!1,$o=!1,Zt=null,re=0,Fo=[],ne=0,uo=0,ko=0,nr=0,ae=!1,ke=16.667,er=0,Qt=null,yo=!1,Oo=!1,Zo=0,po=U[0],pt==="page"&&!ge&&o>2*window.innerHeight){try{_o(),zt=o,ce(),po=zo(Ke(o))}catch{po=U[0]}no=!0,te=""}return I="building",gn(),qt.begin=+(performance.now()-t).toFixed(1),!0}function ha(t){if(!(!(window.GestureEvent||bt.prepare)||I!=="off"||mt||bt.nogl||bt.software||bt.noworker)){pt=t&&t.mode==="hero"?"hero":"page",Dr(pt==="hero"?null:window.__sceneShapes),po=U[0];var o=Io(),e=performance.now(),r={key:en(o),over:!1,then:null,drop:null,ms:0,info:{how:"direct",worker:[],why:""}};mt=r,r.drop=on(o,r.info,function(){if(r.over=!0,r.ms=Math.round(performance.now()-e),k("prepared"),r.then){var a=r.then;r.then=null,a()}})}}function gn(){if(I==="building"){var t=performance.now(),o=po,e=Io(o);qt.send=+(performance.now()-t).toFixed(1),Ar(e,function(r,a){if(I==="building"){if(qt.warm=a,qt.waited=a.waited,!r){if(o!==U[0]&&!bt.shader){o.state="failed",W("the programs of stations "+o.lo+" to "+o.hi+" did not link: "+a.why),po=U[0],gn();return}W(a.why),He(),pe("shader-failed");return}var i=performance.now();nn(r,o),qt.take=+(performance.now()-i).toFixed(1),k("built"),I="live",wt()}},o)}}function wn(){P&&P.parentNode&&P.parentNode.removeChild(P),P=null,d=null,gt=null,$=null,Pt=null,Ot=null,Nt="",Mt=null,$t=0}function He(){Er(),clearTimeout(ar),rn(),Je=[],mt&&mt.then&&(mt.then=null,mt.over||(mt.drop(),mt=null)),P&&(P.removeEventListener("webglcontextlost",yn),P.removeEventListener("webglcontextrestored",bn)),d&&Pt&&!d.isContextLost()&&Pt.loseContext(),wn(),Lt&&Lt.parentNode&&Lt.parentNode.removeChild(Lt),Lt=null,/(^|\s)scene-on(\s|$)/.test(Q.className)&&Q.classList.remove("scene-on"),Ee>0&&De(0),I="off",D=null,lt=null,U.forEach(function(t){t.strand=t.point=null,t.state!=="failed"&&(t.state="none")}),we=!1,Lo="",yo=!1,Oo=!1}function pe(t){if(I!=="off"&&He(),Jo=t,typeof Ht.onFail=="function")try{Ht.onFail(t)}catch{}return!1}function yn(t){t.preventDefault(),t.target===P&&(Er(),rn(),I="lost",Jo="context-lost",at&&Nt==="a"&&(Mt=0,P.style.top="0px"),U.forEach(function(o){o.strand=o.point=null,o.state!=="failed"&&(o.state="none")}),we=!1,ar=setTimeout(function(){I==="lost"&&pe("context-lost")},u.lostWaitMs))}function bn(t){if(t.target===P){clearTimeout(ar),Pt=d.getExtension("WEBGL_lose_context")||Pt,Ot=d.getExtension("KHR_parallel_shader_compile");try{Gn()}catch{return pe("shader-failed")}I="live",Jo="",xt=0,ee=0,st=dt=0,Mo=!0,wt(),Je.forEach(function(o){Dt.push(tn(o.items,o.done))}),je(),pt==="page"&&setTimeout(yr,0)}}function go(){no=!0,wt()}function Pr(){Uo=performance.now()}function Hr(t){var o=t&&t.closest?t.closest("#services .cards .card"):null;return o?Vr.indexOf(o):-1}function da(){if(!Cr){Cr=!0;var t={passive:!0};hr=new WeakSet,Ue=new WeakMap,window.ResizeObserver&&(pr=new ResizeObserver(sa)),window.MutationObserver&&(qr=new MutationObserver(function(){wt()}),qr.observe(Q,{attributes:!0,attributeFilter:["class"]})),window.addEventListener("scroll",function(){Uo=performance.now(),wt()},t),window.addEventListener("resize",function(){Ue=new WeakMap,go()},t),window.addEventListener("load",go,t),window.addEventListener("pageshow",go,t),document.addEventListener("visibilitychange",function(){document.hidden?Er():(Mo=!0,wt())}),document.fonts&&(document.fonts.ready&&document.fonts.ready.then(go),document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",go)),document.addEventListener("toggle",function(o){go(),o.target&&o.target.closest&&o.target.closest("#faq")&&G>9.5&&G<10.5&&Tr()},!0),document.addEventListener("click",function(o){o.target&&o.target.closest&&o.target.closest('[role="tab"]')&&go()},t),document.addEventListener("load",function(o){o.target&&o.target.tagName==="IMG"&&/gd-img/.test(o.target.className)&&go()},!0),window.addEventListener("pointermove",Qn,t),window.addEventListener("pointerdown",$n,t),window.addEventListener("pointerup",Zn,t),window.addEventListener("pointercancel",Jn,t),document.addEventListener("pointerleave",un,t),window.addEventListener("blur",un),window.addEventListener("keydown",Pr,t),window.addEventListener("wheel",Pr,t),window.addEventListener("touchstart",Pr,t),document.addEventListener("pointerover",function(o){for(var e=Hr(o.target),r=0;r<3;r++)ue[r]=r===e?1:0;e>=0&&wt()},t),document.addEventListener("focusin",function(o){var e=Hr(o.target);e>=0&&(ue[e]=1,wt()),fr=!!(o.target&&o.target.closest&&o.target.closest("#start form"))},t),document.addEventListener("focusout",function(o){var e=Hr(o.target);e>=0&&(ue[e]=0,wt()),fr=!1},t)}}function kn(){var t=new Uint8Array(st*dt*4);return d.readPixels(0,0,st,dt,d.RGBA,d.UNSIGNED_BYTE,t),t}function ma(){for(var t=kn(),o=2166136261,e=0;e<dt;e+=3)for(var r=e*st*4,a=r+st*4;r<a;r+=12)o^=t[r],o=Math.imul(o,16777619),o^=t[r+1],o=Math.imul(o,16777619),o^=t[r+2],o=Math.imul(o,16777619),o^=t[r+3],o=Math.imul(o,16777619);return(o>>>0).toString(16)}function Nr(t,o){no&&_o(),zt=window.scrollY,le=pt==="hero"?Math.min(0,ft.top+ft.h-zt-ft.stageH):0,at&&Xe(zt,0),jo();var e=Vo(t,o);return e.quiet=!0,e.fade=1,e.G=Yr(t),Qt=t,Ge(e),Kt(e),lt=e,e}var it={start:function(t){return vn(t)},prepare:ha,stop:function(){I!=="off"&&He(),Jo="stopped"},refresh:go,busy:function(){return!!(St&&St.hold)||!!(mt&&!mt.over)},state:function(){var t=u.tiers[vt]||{};return{mode:I,scene:pt,reason:Jo,tier:vt,q:G===null?null:+G.toFixed(4),target:+Jt.toFixed(4),station:G===null?null:Math.round(G),drawing:!!so&&!lo&&!Xt,sleeping:lo,frameMs:+v(ot.recent).toFixed(2),settled:Me,pinned:!!D,warming:St?St.hold?"worker":"own":Dt.length?"waiting":"",renderer:or,ratio:+Et.toFixed(3),size:[st,dt],unit:+Z.toFixed(1),strands:t.strands,segments:t.segments,drawn:xt,startMs:qt,parallel:!!Ot,time:+bo.toFixed(3),lit:Ee,files:mo.map(function(o){return o.id}),shapes:Vt.map(function(o){return o.fn}),stations:vo.map(function(o,e){return o?o.file.id:e<2?"engine":null}),pointer:[+M.ax.toFixed(3),+M.ay.toFixed(3),+M.a.toFixed(3),+M.b.toFixed(3)],turn:[+M.turnX.toFixed(3),+M.turnY.toFixed(3)],pulses:to.length,groups:U.map(function(o){return{from:o.lo,to:o.hi,shapes:(o.hero?["heroCurve"]:[]).concat(o.ids.map(function(e){return Vt[e]?Vt[e].fn:String(e)})),form:o.form,state:o.state,ms:o.info?o.info.ms:null,how:o.info?o.info.how:null,waited:o.info?o.info.waited:null,worker:o.info?o.info.worker:null}}),carry:at?{top:Nt==="a"?Mt:null,held:Nt==="f",off:$t,canvasH:kt,windowH:_,docH:oe,speed:+ho.toFixed(3),lead:Math.round(_t),heroHold:Math.round(Be),holds:ao}:null,live:Lo?Lo.split(",").map(Number):[],drawQ:Qt===null?null:+Qt.toFixed(4),standIn:yo,standSeen:Oo,px:uo,lag:nr,pace:+ke.toFixed(2)}}};nt&&(it.conf=u,it.log=function(){return H.slice()},it.programs=function(){return Io()},it.warm=function(t,o){Ar(t,o)},it.groupPrograms=function(){return ce(),U.map(function(t){return Io(t,!0)})},it.groupsAsk=function(t){if(t&&t.length){ce(),t.forEach(function(o){U[o]&&U[o].state==="none"&&br(U[o])});return}bt.nogroups=!1,yr()},it.qAt=function(t){if(no&&P&&_o(),t===void 0)return Ke(window.scrollY);var o=ft.h-Gt,e=o>1?p((t-ft.top)/o):0;return pt==="hero"||e<1||t<=fe()?e:xr(t)},it.dump=function(t,o){if(I!=="live")return null;no&&_o(),zt=window.scrollY;var e=Vo(+t,o===void 0?bo:+o),r=Zr(e),a=e.rope?{flat:Array.prototype.slice.call(e.rope.flat),a:e.rope.a,y:e.rope.y,k:e.rope.k,s:e.rope.s,m:e.rope.m,tt:e.rope.tt,c:e.rope.c,soft:e.rope.soft,top:e.rope.top,foot:e.rope.foot}:null;return{q:e.q,scrollY:zt,shA:e.shA,shB:e.shB,kind:e.kind,mix:e.mix,rope:a,u:e.u,share:e.share,thick:e.thick,gain:e.gain,tips:e.tips,shade:e.shade,core:e.core,wash:e.wash,floors:e.floors,ring:e.ring,ptsH:e.ptsH,ptsS:e.ptsS,lit:e.lit,treads:e.treads,kc:r,layout:te.length+":"+te.slice(-60)}},it.still=function(t,o){return I!=="live"?null:(D={q:+t,t:+o||0},Nr(D.q,D.t),G=Jt=D.q,wt(),ma())},it.release=function(){D=null,G=null,wt()},it.grid=function(t,o){if(I!=="live"||!lt)return null;Kt(lt);for(var e=kn(),r=[],a=st/t,i=dt/o,h=0;h<o;h++)for(var m=0;m<t;m++){for(var f=[0,0,0,0],y=0,A=Math.floor(h*i);A<(h+1)*i;A+=2)for(var N=Math.floor(m*a);N<(m+1)*a;N+=2){var E=(A*st+N)*4;f[0]+=e[E],f[1]+=e[E+1],f[2]+=e[E+2],f[3]+=e[E+3],y++}r.push(f[0]/y,f[1]/y,f[2]/y,f[3]/y)}return r},it.pixels=function(t,o,e,r){if(I!=="live"||!lt)return null;Kt(lt);var a=Math.max(0,Math.round(t*Et)),i=Math.max(0,Math.round(((at?kt-$t:_)-o-r)*Et)),h=Math.max(1,Math.min(st-a,Math.round(e*Et))),m=Math.max(1,Math.min(dt-i,Math.round(r*Et))),f=new Uint8Array(h*m*4);return d.readPixels(a,i,h,m,d.RGBA,d.UNSIGNED_BYTE,f),{w:h,h:m,data:Array.prototype.slice.call(f)}},it.force=function(t){if(t==="lost"||t==="restore"){Pt&&(t==="lost"?Pt.loseContext():Pt.restoreContext());return}if(t==="slow"){se=55,ot.warm=u.warmup,ot.cool=0,D=null,wt();return}if(t==="gpuslow"){ie=3,ne=0,Qe(),D=null,wt();return}if(t==="steady"){se=0,ie=0;return}se=0,ie=0,bt={};var o=/^tier(\d)$/.exec(t||"");return o?bt.tier=+o[1]:t&&t!=="auto"&&(bt[t]=!0),vn(Ht)},it.point=function(t,o,e){M.finger=!1,zr(t,o,e===!1?0:1)},it.pulse=Tr,it.bench=function(t,o){if(I!=="live")return null;o=o||40;var e=new Uint8Array(4),r=Nr(t,1);d.readPixels(0,0,1,1,d.RGBA,d.UNSIGNED_BYTE,e);for(var a=performance.now(),i=0;i<o;i++)r.time=1+i*.016,Kt(r);return d.finish(),d.readPixels(0,0,1,1,d.RGBA,d.UNSIGNED_BYTE,e),(performance.now()-a)/o},it.hold=function(t){ur=t!==!1},it.rate=function(t){ir=t==null?null:+t,wt()},it.hide=function(t){Xt=!!t,sr=!1,Mo=!0,wt()},it.tread=function(t){var o=lt&&lt.treads;return o&&o[t-1]!==void 0?{y:o[t-1],scrollY:zt}:null},it.keepClear=function(){return lt&&lt.kc?lt.kc.map(function(t){return{l:t.l,t:t.t,r:t.r,b:t.b,on:t.on}}):[]},it.anchor=function(t,o){return no&&P&&_o(),{scrollY:zt,box:Ve(t,o)||null}},it.snapshot=function(t,o){return I!=="live"||!lt?null:(Kt(lt),P.toDataURL(t||"image/png",o||.9))},it.poster=function(t,o,e,r){if(I!=="live")return null;var a=typeof t=="number"?t:u.stills[t];if(a===void 0)return null;var i=D;D={q:a,t:e===void 0?u.calmTime:e},Nr(D.q,D.t);var h=Math.min(1600,Math.round(o||1600),st),m=Math.round(h*dt/st),f=document.createElement("canvas");f.width=h,f.height=m;var y=f.getContext("2d");y.imageSmoothingQuality="high",y.drawImage(P,0,0,h,m);var A=f.toDataURL("image/webp",r||.8);return D=i,wt(),{name:String(t),q:a,url:A,w:h,h:m,bytes:Math.round((A.length-23)*.75)}}),window.__scene=it,(function(){var t=Tt.get("scene-force");if(t&&nt){var o=/^tier(\d)$/.exec(t);o?bt.tier=+o[1]:bt[t]=!0}})()})();
