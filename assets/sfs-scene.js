/*! Sharp Frame Studios: the home page's strand scene. Made by review/make-scene.js from review/scene-src; edit there. */(function(){"use strict";var lt=`
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
}`,u=Math.PI/180,Ot={loop:.75,fan:.4,arcs:.55};function Kt(n,s){return Ft(n,s)+.06*n.cssW}function Ft(n,s){return n.narrow()?Math.max(9,.5*s):Math.max(30,.5*s)}function _o(n){var s=n.box("#portrait")||n.NONE,p=n.box("#studio")||n.NONE,h=n.narrow(),v=h?Math.min(.56*s.h,.66*n.cssW):Math.min(.6*s.h,Math.max(.5*s.h,(s.cx-14)/.845)),w=s.cy-10,x=(h?.97:.8)*v,S=[],k,N=s.cx;if(n.q<2){var L=n.sstep(n.clamp01(n.q-1)),X=.365*n.U;N=n.lerp(n.cssW/2,N,L),w=n.lerp(n.cssH/2-.03*n.U,w,L),x=n.lerp(X,x,L),v=n.lerp(X,v,L)}if(h){var F=Ft(n,p.l+20);for(k=-.72;k<=.73;k+=.36)S.push([Math.max(F,N-x*Math.sqrt(1-k*k)),w+k*v,.02]);S.push([Math.max(F,N-.42*x),w+.93*v,.02])}else{for(k=-.72;k<=.73;k+=.36)S.push([N+x*Math.sqrt(1-k*k),w+k*v,.02]);S.push([N+.42*x,w+.93*v,.02])}if(h){var J=n.box("#studio .studio-copy");return S.push([Ft(n,p.l+20),Math.max(w+1.25*v,(J?J.b:p.b-120)-.02*n.cssH),0]),S}return S.push([n.cssW*.3,Math.max(w+1.25*v,p.b-20),0]),S}function oo(n){var s=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),h=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,v=n.narrow(),w=n.cssH,x=p[0]||n.NONE,S=Ft(n,s.l);return[[v?S:n.cssW*.3,s.t-(v?.22:.3)*w,0],[S,x.t+60,-.05],[S,h.t-20,-.05],[h.l+.16*h.w,h.b+14,-.02]]}function Ko(n){var s=n.box("#film .sec-head")||n.NONE,p=n.box("#film .films .player",!0);p.length||(p=n.box("#film .player",!0));var h=p[0]||n.NONE,v=p.length?p[p.length-1].b:h.b;if(n.narrow()){var w=Math.max(-6,Math.min(Ft(n,s.l),s.l-.072*n.U-2));return[[w,s.t-90,-.03],[w,v+40,-.03]]}return[[n.cssW/2,s.t-90,-.03],[n.cssW/2,v+40,-.03]]}function zo(n){var s=n.box("#wkStage")||n.NONE,p=n.narrow()?Ft(n,(n.box("#work .sec-head")||n.NONE).l):n.cssW/2;return[[p,s.t-40,-.03],[p,s.b+.1*n.cssH,0]]}function ae(n){var s=n.box(".oc-shot")||n.NONE,p=n.narrow()?Ft(n,(n.box("#focus .sec-head")||n.NONE).l):n.cssW/2;return[[p,s.t-60,-.03],[p,s.b-.1*n.cssH,0]]}function Io(n){var s=n.box("#portrait")||n.NONE,p=n.narrow(),h=p?Math.min(.56*s.h,.66*n.cssW):Math.min(.6*s.h,Math.max(.5*s.h,(s.cx-14)/.845)),v=n.ul(h);return{shape:0,u:{uW0:[5.6,v,.085*v,1],uW1:[.3*v,.5,1.55,89],uW2:[.55,1.25,.22,47],uW3:[0,.365,.072,.0876],uWC:[n.ux(s.cx),n.uy(s.cy-10),0,0],uWR:[p?0:-33*u,-.06,4.2+n.time*.05,-1.5],uWB:[0,.73,0,.65]},look:n.look({thick:1.15,gain:.95,share:Ot.loop,points:.45,pointSize:.8,tips:0}),open:n.open(s.cy-10-.95*h,s.cy-10+.95*h)}}function lo(n){for(var s=n.box("#services .sec-head")||n.NONE,p=n.box("#services .cards .card",!0),h=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,v=n.narrow(),w=n.cssW,x=n.cssH,S,k,N=n.hover||[0,0,0];p.length<3;)p.push(p[p.length-1]||n.NONE);var L={shape:1,u:{uFO:v?[n.ux(Kt(n,s.l)),n.uy(s.t-.22*x),n.ul(.07*w),.25]:[n.ux(w*.3),n.uy(s.t-.3*x),n.ul(72),.3],uFC:[n.ux(h.l+.16*h.w),n.uy(h.b+10),n.ul(.34*Math.min(h.h,260)),.15],uFH:[N[0],N[1],N[2],n.ul(v?90:150)]},knot:[.15,n.open(h.b-70,h.b+50,h.b-110,h.b+30)],look:n.look({thick:1.25,gain:.95,share:Ot.fan,points:.6,pointSize:.85,tips:0}),open:n.open(s.t,p[v?2:0].t+160,s.t-(v?.22:.3)*x,p[0].t+70)};for(S=0;S<3;S++)k=p[S],L.u["uFT"+S]=v?[n.ux(k.l+.12*k.w),n.uy(k.t),n.ul(.1*k.w),n.ul(60)]:[n.ux(k.cx),n.uy(k.t),n.ul(.26*k.w),n.ul(70)];return L}function jo(n){var s=n.box("#film .films .player",!0),p=n.narrow(),h,v;for(s.length||(s=n.box("#film .player",!0));s.length<2;)s.push(s[s.length-1]||n.NONE);var w={shape:2,u:{uAP:[-20*u,200*u,n.ul(.03*s[0].w),.15]},look:n.look({thick:1.05,gain:.95,share:Ot.arcs,points:.35,pointSize:.85})},x=s[0].t+.12*s[0].h,S=.75*s[0].w;if(w.open=p?n.open(s[0].t-60,s[0].t+.5*s[0].h,s[0].t-160,s[0].t+40):n.open(x-S,x+.15*S,x-S,s[0].t+.45*s[0].h),p){var k=n.box("#film .sec-head")||n.NONE,N=.62*n.cssW;w.u.uAC0=w.u.uAC1=[n.ux(n.cssW/2),n.uy(k.t-100+N),n.ul(N),0],w.u.uAP=[0,Math.PI,n.ul(.03*s[0].w*1.6),.15]}else for(h=0;h<2;h++)v=s[h],w.u["uAC"+h]=[n.ux(v.cx+(h?-1:1)*.12*v.w),n.uy(v.t+.12*v.h),n.ul(.75*v.w),(h?-1:1)*60*u];return w}var go={thick:1,gain:.66,share:1,points:.22,pointSize:.8,deep:.15,skin:.76,skinW:.2,back:.6},eo=[.95,.44,.1,.18];function uo(n,s,p,h,v,w,x,S){var k=n.narrow(),N=k?20:32,L=31*u,X=n.ul(h),F=Math.sin(L)*X+Math.cos(L)*v,J=2*F/N;return{uWv:[n.ux(s),n.uy(p),X,v],uWv2:[N,N,.15*J,w],uWv3:[.6,.5,0,.004],uWv4:[L,-L,5,go.thick],uWv5:[.42,.4,Math.min(1,.5*n.cssW/h+.03),.08],uWvK:eo,uWvL:x?[x[0],x[1],x[2],S]:[0,0,0,.3],uStE:[-9,-9,-9,.03],uSt0:[0,0,0,0],uSt1:[0,0,0,0],uSt2:[99,0,0,0]}}function To(n,s,p,h){if(n.narrow())return s;var v=p*n.U*Math.sin(h),w=Math.min(.16*n.cssH,2*v+.035*n.cssH);return Math.min(s,n.cssH-w+v)}function Ro(n,s,p){return n.narrow()?n.open(s-.8*p,s+1.4*p):n.open(s-.8*p,s+1.4*p,s-p,s-.25*p)}function Eo(n){if(!n.narrow())return n.look(go);var s={},p;for(p in go)s[p]=go[p];return s.share=.86,n.look(s)}function ie(n){var s=n.box("#wkStage")||n.NONE,p=n.narrow(),h=p?.45:.8,v=To(n,s.b+(p?90:.16*n.cssH),h,20.6*u),w=h*n.U*.4+30;return{shape:3,u:uo(n,n.cssW/2,v,.6*n.cssW,h,20.6*u),look:Eo(n),open:Ro(n,v,w),foot:v-.55*w}}function se(n){var s=n.box(".oc-shot")||n.NONE,p=n.detail||[0,0,0],h=.72*n.cssW,v=n.narrow()?.5:.9,w=To(n,s.b-.02*n.cssH,v,23*u),x=v*n.U*.44+30;return{shape:3,u:uo(n,n.cssW/2,w,h,v,23*u,p,Math.max(.05,.5*s.w/h-.06)),look:Eo(n),open:Ro(n,w,x),foot:w-.55*x}}function l(n){var s=null,p,h=window.__sceneShapes||[];for(p=0;p<h.length;p++)h[p]&&h[p].id==="b"&&h[p].foot7&&(s=h[p].foot7(n));if(!s){var v=n.box("#process .steps .step")||n.box("#process .steps")||n.NONE;s={left:v.l-24,right:v.r+24,floor:v.t+6,hd:n.narrow()?.16:.2,tip:.3}}var w=To(n,s.floor,s.hd,s.tip),x=s.hd*n.U*.4+30;return{shape:3,u:uo(n,(s.left+s.right)/2,w,Math.max(40,(s.right-s.left)/2),s.hd,s.tip),look:Eo(n),open:Ro(n,w,x),foot:w-.55*x}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"a",glsl:lt,shapes:{1:"shFan",2:"shArcs",3:"shWeave"},stations:{2:Io,3:lo,4:jo,5:ie,6:se,"6.5":l},ways:{2:_o,3:oo,4:Ko,5:zo,6:ae}})})(),(function(){"use strict";var lt={stair:{tip:.3,depth:.2,depthNarrow:.16,riser:.055,riserNarrow:.028,shoulder:.04,shoulderNarrow:.028,cap:.07,warp:.42,lean:1.5,run:.34,fan:.1,locks:24,locksNarrow:8,wires:17,wiresNarrow:10,skirt:.11,node:12,nodeNarrow:10,floorUnder:10,floorUnderNarrow:6,shareNarrow:.86,look:{thick:1.1,gain:.98,share:1,points:.28,pointSize:.9}},pass:{depth:.5,halfWidth:.7,foot:.99,look:{thick:.85,gain:.72,share:1,points:0,pointSize:.9}},columns:{tip:.26,radius:.33,radiusNarrow:.47,rimGap:.36,ovalGap:.42,footNarrow:96,foot:60,riseOver:.33,rim:.035,rimPick:.085,yarns:8,relief:.013,turnsWide:.42,turnsNarrow:.86,wide:.74,wideWidth:.86,hoops:.08,slide:.02,blueWall:.45,blueHoop:.22,share:.8,band:37,bandPly:8,look:{thick:1.3,gain:1.03,share:1,points:.12,pointSize:.9}},arcs:{radius:[.34,.58],rope:.08,tip:.4,apart:.07,factor:3,reach:.8,cover:1,fanOut:.26,wait:.12,look:{thick:1.05,gain:.9,share:.88,points:.2,pointSize:.9}},ring:{radius:[.3,.56],radiusNarrow:.46,rope:.105,tip:.42,below:.02,twist:1.5,section:.62,loose:.07,turn:.03,glint:.55,wait:.1,look:{thick:1.5,gain:.94,share:.88,points:.35,pointSize:1}},foot:{radius:[.27,.5],radiusNarrow:.44,tip:.44,above:.17,look:{thick:1.5,gain:.94,share:.88,points:.3,pointSize:1}}},u=`
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
}`,Ot=1/Math.tan(14*Math.PI/180);function Kt(l,n,s,p,h){l[n+"0"]=s,l[n+"1"]=p||s,l[n+"2"]=h||s}function Ft(l,n){var s=lt.stair,p=Math.cos(s.tip),h=Math.sin(s.tip),v=l.uy(n.floor),w=n.n,x=[],S=[],k,N;for(k=0;k<3;k++){N=Math.min(k,w-1);var L=l.uy(n.tops[N]);x[k]=Math.max(0,Ot*(L-v)/(Ot*p+L*h)),S[k]=(Ot-x[k]*h)/Ot}var X=[],F=[];for(k=0;k<3;k++)X[k]=w>1?.52*Math.min(k,w-1)/(w-1):0,F[k]=k<w?l.sstep((n.f-X[k])/.48):0;var J=x[0]*F[0],nt=J+(x[1]-x[0])*F[1],Tt=nt+(x[2]-x[1])*F[2],It=[J,nt,Tt],Nt=l.ux(n.right)*S[w-1],pt=l.ux(n.left),vt=[],Rt=[99,99,99];for(k=0;k<3;k++)vt[k]=k<w?l.ux(n.risers[k])*(((k?S[k-1]:1)+S[k])/2):Nt+5;var jt=pt+.35*(vt[0]-pt),W=[[0,jt]],m=0,dt=jt,Q;for(Q=0;Q<n.nodes.length;Q++)k=n.nodes[Q],Rt[Q]=l.ux(n.mids[k])*S[k],W.push([X[k]+.48,Rt[Q]]),n.f>=X[k]+.48-.001&&m++;for(Q=1;Q<W.length;Q++)n.f>=W[Q-1][0]&&(dt=l.lerp(W[Q-1][1],W[Q][1],l.clamp01((n.f-W[Q-1][0])/Math.max(1e-4,W[Q][0]-W[Q-1][0]))));n.f>=W[W.length-1][0]&&(dt+=.02);var Et=It.map(function(Ht){var Bt=(v+Ht*p)*Ot/(Ot-Ht*h);return l.cssH/2-Bt*l.U});return{X:[pt,Nt,v,n.hd],E:[vt[0],vt[1],vt[2],dt],H:[J,nt,Tt,.92+.08*Math.sin(1.7*l.time)],N:[Rt[0],Rt[1],Rt[2],n.f>.001?1:0],tread:Et,lit:m,n:w}}function _o(l,n,s){var p=lt.stair,h={};Kt(h,"uTX",n[0].X,n[1]&&n[1].X,n[2]&&n[2].X),Kt(h,"uTE",n[0].E,n[1]&&n[1].E,n[2]&&n[2].E),Kt(h,"uTH",n[0].H,n[1]&&n[1].H,n[2]&&n[2].H),Kt(h,"uTN",n[0].N,n[1]&&n[1].N,n[2]&&n[2].N),h.uTP=[p.tip,s?p.riserNarrow:p.riser,s?p.shoulderNarrow:p.shoulder,s?.6*p.cap:p.cap],h.uTQ=[p.warp,s?1:0,p.lean,s?.7*p.run:p.run],h.uTR=[p.fan,0,s?p.locksNarrow:p.locks,s?p.wiresNarrow:p.wires];var v=s?p.depthNarrow:p.depth,w=s?p.shoulderNarrow:p.shoulder;return h.uTL=[v/(2*v-w),0,0,0],h}function oo(l){var n=lt.stair,s=l.narrow(),p=l.box("#process .step-tag",!0),h=l.box("#process .step-body",!0),v,w=l.css?l.css("#process","--node"):NaN;if(w>=0||(w=s?n.nodeNarrow:n.node),p.length<3||h.length<3){if(h=l.box("#process .steps .step",!0),h.length<3){var x=l.box("#process .steps")||l.NONE;h=[0,1,2].map(function(L){return{cx:x.l+x.w*(1+2*L)/6,l:x.l+x.w*L/3,r:x.l+x.w*(L+1)/3,t:x.t,b:x.b,w:x.w/3.2}})}p=h.map(function(L,X){var F=L.t-(14+22*X)-w;return{cx:s?L.l+L.w*(.2+.17*X):L.cx,b:F,t:F-20,w:s?L.w*.5:L.w*.62}})}var S={nar:s,node:w,steps:[],top:1e9,last:-1e9};for(v=0;v<3;v++){var k=p[v],N=k.b+w;S.steps.push({x:k.cx,w:k.w,top:k.t,y:N,card:h[v],lift:h[v].t-N}),S.top=Math.min(S.top,k.t),S.last=Math.max(S.last,k.b)}return S}function Ko(l,n){var s=lt.stair,p;if(n=n||oo(l),p=n.steps,n.nar)return{left:p[0].card.l-24,right:p[0].card.r+24,floor:p[0].card.t+s.floorUnderNarrow,hd:s.depthNarrow,tip:s.tip,r0:p[0].card.l};var h=p[0].x-.72*p[0].w;return{left:h-s.skirt*l.cssW,right:p[2].x+.66*p[0].w,floor:p[0].card.t+s.floorUnder,hd:s.depth,tip:s.tip,r0:h}}function zo(l){var n=lt.stair,s=oo(l),p=s.nar,h=s.steps,v=l.cssH,w,x,S,k;if(p){var N=h[0].lift,L=h[1].lift-N,X=h[1].x-h[0].x;for(X>8||(X=.5*h[0].w),X=Math.max(44,Math.min(90,X)),L>2||(L=16),w=[],S=0,k=[],x=0;x<3;x++){var F=h[x],J=F.card,nt=.36*F.w,Tt=[],It=[],Nt=[],pt;for(pt=0;pt<=x;pt++)Tt[pt]=J.t-N-pt*L,Nt[pt]=F.x-nt-(x-pt)*X,It[pt]=pt===x?F.x:Nt[pt]+X/2;var vt=l.clamp01((.9*v-(F.top-20))/(.5*v)),Rt=Ft(l,{floor:J.t+n.floorUnderNarrow,tops:Tt,mids:It,risers:Nt,right:F.x+nt,left:Math.max(-24,Nt[0]-64),hd:n.depthNarrow,f:vt,n:x+1,nodes:[x]});w.push(Rt),k[x]=Rt.tread[x],Rt.lit&&S===x&&(S=x+1)}}else{var jt=h[0].w,W=Ko(l,s),m=l.clamp01((.9*v-(s.top-20))/(.5*v)),dt=n.depth*l.U*Math.sin(n.tip),Q=Math.min(.16*v,2*dt+.035*v),Et=Ft(l,{floor:Math.min(W.floor,v-Q+dt),tops:h.map(function(Ct){return Ct.y}),mids:h.map(function(Ct){return Ct.x}),risers:[W.r0,(h[0].x+h[1].x)/2-.1*jt,(h[1].x+h[2].x)/2-.1*jt],right:W.right,left:W.left,hd:n.depth,f:m,n:3,nodes:[0,1,2]});w=[Et],S=Et.lit,k=Et.tread}var Ht=Math.max(h[0].card.t,h[2].card.t),Bt=n.look;if(p){Bt={};for(var Yo in n.look)Bt[Yo]=n.look[Yo];Bt.share=n.shareNarrow}return{shape:"stair",u:_o(l,w,p),look:l.look(Bt),treads:k,lit:S,open:p?1:l.open(s.top-20,Ht+110)}}function ae(l){var n=lt.pass,s=l.narrow(),p=l.cssW,h,v;if(s){var w=zo(l),x=oo(l).steps[2].card;return{shape:"stair",u:w.u,look:w.look,open:l.open(x.t,x.t+.3*l.cssH)}}var S=[l.ux(p*(.5-n.halfWidth)),l.ux(p*(.5+n.halfWidth)),l.uy(l.cssH*n.foot),n.depth],k={X:S,E:[S[0]+.6,S[0]+1.3,S[0]+2,S[0]],H:[0,0,0,0],N:[99,99,99,0]},N=_o(l,[k],s),L=n.look,X=1;N.uTR[1]=.004;var F=l.sstep(l.clamp01(-oo(l).last/(.6*l.cssH)));if(F<1){var J=zo(l),nt={},Tt={};for(h in N)for(nt[h]=[],v=0;v<4;v++)nt[h][v]=l.lerp(J.u[h][v],N[h][v],F);for(h in L)Tt[h]=l.lerp(lt.stair.look[h],L[h],F);N=nt,L=Tt}return{shape:"stair",u:N,look:l.look(L),open:X}}function Io(l){for(var n=lt.columns,s=l.narrow(),p=l.cssH,h=l.box("#pricing .sec-head")||l.NONE,v=l.box("#pricing .plan",!0),w=l.box("#pricing .plan--pick",!0)[0];v.length<3;)v.push(v[v.length-1]||l.NONE);for(var x=l.ease("b.badge",w&&Math.abs(w.cx-v[1].cx)<6?1:0,.4),S=1,k=s?Math.max(8,Math.min(60,v[1].t-v[0].b)):0,N=s?Math.asin(Math.min(Math.sin(n.tip),n.ovalGap*k/(n.radiusNarrow*v[0].w))):n.tip,L={uKP:[N,n.yarns,n.relief,n.slide*l.time],uKQ:[n.turnsWide,n.turnsNarrow,n.hoops,n.wideWidth],uKB:[n.blueWall,n.blueHoop*(.92+.08*Math.sin(1.3*l.time)),n.wide,s?1:n.share]},X=[0,0,0,0],F=0;F<3;F++){var J=v[F],nt=(s?n.radiusNarrow:n.radius)*J.w,Tt=s?J.t-n.rimGap*k:h.t-(n.rim+(F===1?(n.rimPick-n.rim)*x:0))*p,It=s?J.t+Math.min(.8*J.h,n.footNarrow):J.t+n.foot,Nt=It-Tt;s||(It=Math.min(It,.985*p));var pt=s?1:l.clamp01((.95*p-J.t)/(n.riseOver*p));S=Math.min(S,pt);var vt=It-Math.max(.1*Nt,l.sstep(pt)*Math.max(0,It-Tt));L["uKC"+F]=[l.ux(J.cx),l.uy(vt),l.ul(nt),l.uy(It)],X[F]=l.ul(Nt)/Math.cos(N)}L.uKH=X;var Rt=s?v[0].t-n.rimGap*k:h.t-n.rim*p,jt=(s?n.radiusNarrow:n.radius)*v[2].w,W=n.look;if(s){W={};for(var m in n.look)W[m]=n.look[m];W.share=n.share}return L.uKF=[l.ux(s?v[0].l-10:eo(l,h.l)-6),l.ux(v[2].cx+jt),l.uy(v[0].t+n.band),l.ul(n.bandPly)],{shape:"basket",u:L,look:l.look(W),open:s?1:l.open(Rt,v[0].t+n.foot+70)}}function lo(l,n,s,p,h,v,w){var x=lt.arcs,S=lt.ring,k=Math.max(x.factor,.86*l.cssW/(.94*p*Math.sin(x.reach)));return{uOA:[l.ux(n),l.uy(s),l.ul(p),l.ul(h*p)],uOB:[v,w,x.apart,.3+S.turn*l.time],uOC:[S.twist,S.section,x.fanOut,S.glint],uOD:[k,x.reach,x.cover,S.loose]}}function jo(l){var n=lt.arcs,s=l.box("#faq .faq")||l.NONE,p=l.box("#faq .faq .qa",!0),h=l.box("#faq .faq summary",!0),v=0,w;for(w=0;w<h.length;w++)v+=h[w].h;for(w=1;w<p.length;w++)v+=Math.max(0,p[w].t-p[w-1].b);v||(v=s.h);var x=Math.min(n.radius[0]*l.cssW,n.radius[1]*l.cssH),S=s.t+.62*Math.min(v,.55*l.cssH),k=l.narrow();return k||(S=Math.min(S,l.cssH*(1-n.wait)+.22*x)),k?{shape:"coil",u:lo(l,l.cssW/2,S,x,n.rope,n.tip,1),look:l.look(n.look),open:l.open(S-.3*x,S+.45*x,S-.34*x-.3*l.cssH,S+.05*x)}:{shape:"coil",u:lo(l,l.cssW/2,S,x,n.rope,n.tip,1),look:l.look(n.look),open:Math.max(l.open(S-.3*x,S+.45*x),l.sstep(l.clamp01((l.q-10)/.25)))}}function go(l){var n=lt.ring,s=l.box("#start .start-side")||l.NONE,p=l.box("#start .form-wrap")||s,h=l.narrow(),v=Math.min((h?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),w=Math.max(s.b,p.b)+n.below*l.cssH;if(h||(w=Math.min(w,l.cssH*(1-n.wait)+.4*v)),h){var x=l.open(null,null,w-.46*v-.3*l.cssH,w),S=x<1?jo(l):null;if(S&&(x<=0||S.open>.001))return S;var k={},N=l.sstep(x),L;for(L in n.look)k[L]=l.lerp(lt.arcs.look[L],n.look[L],N);return{shape:"coil",u:lo(l,l.cssW/2,w,v,n.rope,n.tip,0),look:l.look(k),open:x}}return{shape:"coil",u:lo(l,l.cssW/2,w,v,n.rope,n.tip,0),look:l.look(n.look),open:1}}function eo(l,n){return l.narrow()?Math.max(9,.5*n):Math.max(30,.5*n)}function uo(l){var n=l.box("#process .sec-head")||l.NONE,s=oo(l),p=s.steps[0].card,h=eo(l,n.l);return[[h,Math.min(s.top,n.t)-60,-.03],[h,p.t+10,0],[h,p.b,-.03]]}function To(l){var n=l.box("#proof .pf-stage")||l.NONE,s=l.box("#process .sec-head")||l.NONE;return[[eo(l,s.l),n.t+.5*n.h,-.03]]}function Ro(l){var n=l.box("#pricing .sec-head")||l.NONE,s=l.box("#pricing .plan",!0),p=s[0]||l.NONE,h=eo(l,n.l),v=p.b,w;for(w=1;w<s.length;w++)v=Math.max(v,s[w].b);return[[h,n.t-40,-.03],[h,p.t+lt.columns.foot,0],[h,v,-.03]]}function Eo(l){var n=l.box("#faq .sec-head")||l.NONE,s=l.box("#faq .faq")||l.NONE,p=eo(l,n.l);return[[p,n.t,-.03],[p,s.b,-.03]]}function ie(l){var n=lt.ring,s=lt.foot,p=l.box("#start .start-side")||l.NONE,h=l.box("#start .form-wrap")||p,v=l.box("footer.foot")||l.NONE,w=l.narrow(),x=eo(l,p.l),S=l.sstep(l.clamp01(l.q-11)),k=Math.min((w?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),N=Math.max(p.b,h.b)+n.below*l.cssH,L=Math.min((w?s.radiusNarrow:s.radius[0])*l.cssW,s.radius[1]*l.cssH),X=v.t-s.above*l.cssH;w||(N=Math.min(N,l.cssH*(1-n.wait)+.4*k));var F=l.lerp(k,L,S),J=l.lerp(N,X,S),nt=J-.246*F*Math.sin(l.lerp(n.tip,s.tip,S))/Math.sin(.42);return[[x,p.t,-.03],[x,Math.min(p.b+10,nt-.34*l.cssH),-.03],[l.cssW/2-.8*F,nt,-.6*F*Math.cos(l.lerp(n.tip,s.tip,S))/l.U]]}function se(l){var n=lt.foot,s=l.box("footer.foot")||l.NONE,p=l.narrow(),h=Math.min((p?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),v=s.t-n.above*l.cssH;return{shape:"coil",u:lo(l,l.cssW/2,v,h,lt.ring.rope,n.tip,0),look:l.look(n.look)}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"b",glsl:u,shapes:{stair:"shStair",basket:"shBasket",coil:"shCoil"},stations:{7:zo,8:ae,9:Io,10:jo,11:go,12:se},ways:{7:uo,8:To,9:Ro,10:Eo,11:ie},conf:lt,levels:oo,foot7:Ko})})(),(function(){"use strict";if(window.__scene)return;var lt=/[?&]scene-nosort\b/.test(location.search),u={tiers:[{strands:2200,segments:80,points:1200,dprCap:2,pixelCap:9e6},{strands:1e3,segments:52,points:700,dprCap:2,pixelCap:3e6},{strands:520,segments:40,points:400,dprCap:1.5,pixelCap:2e6}],maxStrands:2600,fit:{aspect:16/9,narrow:1.5},width:.0076,minPx:1.35,widthLod:[.85,1.3],hang:{root:[-.1,.33],leave:[224,236],tip:[186,292],tipCurve:.4,trunk:[1.49,.76,.2],reach:[.86,.6,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,minScale:.62,rest:[204,.68,.25,8,.9]},hangUp:{root:[.34,0],leave:[192,204],tip:[176,268],tipCurve:.55,trunk:[1.3,.8,.16],reach:[.86,.62,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,rest:[186,.7,.25,5,.92],under:16,wide:.34,least:.36,most:.62,upTo:1024},body:{wrap:3.4,wrapVar:1.7,treadTwist:.55,tuftCount:47,wires:89,squash:1,lip:.24,ringZ:.88,spin:.1},swirl:{leave:74,end:118,stagger:.12,settle:1.3,gate:[.42,.5]},track:{open:[[.08,0],[.2,.16],[.306,.6],[.36,.88],[.43,1]],loosen:[[0,0],[.1,.25],[.2,.5],[.32,1]],count:[[0,400],[.2,430],[.42,520],[.52,1300],[.62,2200]],thick:[[0,1.25],[.42,1.25],[.52,1],[.64,.72],[.84,.86]],gain:[[0,.86],[.45,.86],[.62,1],[.84,.9]],skin:[[.55,.88],[.66,.935],[.84,.955]],skinW:[[.55,.12],[.7,.06],[.84,.035]],bloom:[[.7,0],[.86,1]],tufts:[[.56,.45],[.84,.1]],wires:[[.62,0],[.8,1]],deep:[[.62,.16],[.84,.07]],yaw:[[0,0],[.45,4],[.63,-9],[.84,9]],pitch:[[0,0],[.45,-3],[.63,7],[.84,-5]],cx:[[.2,.1],[.42,.04],[.586,-.01],[.82,0]],cy:[[.2,.1],[.42,.11],[.586,.085],[.65,.02],[.72,0],[.84,.03]],phase:[[.2,0],[.45,.5],[1,2.3]],hole:[[.2,.42],[.42,.39],[.5,.31],[.54,.28],[.586,.2]],arm:[[.2,1.85],[.36,1.85],[.42,1.95],[.5,1.4],[.54,1.02],[.586,.68]],rim:[[.2,0],[.3,1],[.56,1],[.66,0]],disc:[[.2,.5],[.42,.24],[.586,.14]],wind:[[.48,0],[.586,.18],[.665,1]],radius:[[.46,.4],[.586,.36],[.64,.34],[.72,.26],[.84,.2]],tube:[[.46,.08],[.586,.15],[.64,.19],[.82,.19]],twist:[[.46,2.4],[.64,2.9],[.82,3.3]],loose:[[.46,1],[.62,.85],[.72,.35],[.82,0]],flare:[[.46,.5],[.586,.28],[.64,.1],[.76,.04]],sphere:[[.64,0],[.8,1]],ball:[[.64,.53],[.7,.47],[.76,.41],[.84,.365]],mouth:[[.64,.15],[.7,.12],[.76,.086],[.84,.072]],core:[[.64,0],[.82,1]],wash:[[.2,0],[.42,.06],[.56,.16],[.635,.8],[.72,.62],[.78,.3],[.84,0]],tips:[[0,1],[.52,1],[.64,.5],[.74,0]],points:[[0,.85],[.3,1],[.66,1],[.84,.32]],pointSize:[[0,1],[.3,1.15],[.64,.9],[.84,.7]],turn:[[.2,0],[.5,.5],[.8,1]],floorX:[[0,.78],[.3,.35],[.45,0]],floorY:[[0,-.71],[.3,-.92],[.586,-.93],[.7,-.86],[.84,-.8]],floorW:[[0,.95],[.3,1.3],[.586,.85],[.7,.55],[.84,.42]],shadow:[[0,1],[.3,.45],[.5,.5],[.586,.8],[.82,1]],pool:[[0,.9],[.3,.5],[.586,.9],[.66,1],[.84,.1]]},alive:{viewSway:[1.6,1.1],viewRate:[.21,.17],bob:.014,bobRate:.55,travel:.022,sparkle:.9},calmTime:2.5,pointer:{radius:.34,fingerRadius:.42,aside:.1,gather:.55,turn:[13,9],follow:[.2,.045],rise:.1,fall:.035,pulse:1.5,pulseWidth:.075},exposure:.76,light:{key:.28,strips:4.8,fill:.45,room:.08,glint:.8,arms:[.25,.75,.45,.15],armSide:.3},shade:{formFloor:.16,back:.6,strandVar:.25,darkShare:.05,open:.42},blue:[.02,.22,1],blueAmt:{tint:1,light:.85,sheen:.2,hot:2.4,reach:1.7,lean:.75,glare:.24,kick:.06,ring:1,points:1,haze:[.72,.2],bloom:.34,tipWash:.55},pulse:{rate:1.7,wave:.16},floor:{shadow:.3,pool:.3},smooth:.16,slowMs:40,warmup:20,window:40,cooldown:60,fastMs:22,calm:480,retries:2,stillRetryMs:2e4,idleEvery:2,lostWaitMs:4e3};u.hero="header.hero",u.stage=".stage",u.secs=[null,null,"#studio","#services","#film","#work","#focus","#process","#proof","#pricing","#faq","#start","footer.foot"],u.names=["hero","ball","loop","fan","arcs","weave","ground","stair","pass","columns","lowarcs","ring","foot"],u.seam={from:1,to:.35,least:.3},u.page={viewSway:[1.2,.9],scale:.4},u.look={thick:1,gain:1,share:1,points:.5,pointSize:1,tips:0,stag:.4,lift:.1,yaw:0,pitch:0,deep:.3,skin:.8,skinW:.12,back:.75},u.pagePoints=[700,400,220],u.ringOut=3,u.via={7:{at:.55,direct:!0,stagger:.35}},u.rope={grid:[-.2,1.2],pad:.06,least:.62,len:.16,ply:.034,plyLeast:.011,swing:1.12,depth:.7,period:210,twist:2,soft:.75,pass:{stagger:.08,join:.46},aside:.8,slide:.2,sway:.006},u.cutBy={},u.passBy={4:{join:.4},9:{direct:!0,span:[.25,.92],stagger:.45},10:{join:.34}},u.passNarrow={9:{join:.4}},u.clear={pad:20,soft:16,dark:.33,heroFrom:.02,heroUntil:.08,heroPad:-8,heroSoft:8},u.edge={hero:0,page:0},u.sortStrands=!lt,u.fadeInMs=500,u.idleAfterMs=2e4,u.warm={quietMs:350,giveUpMs:8e3},u.groups=[1,3,4,5,7,9,12],u.groupFadeMs=450,u.hoverS=.3,u.proof={sel:"#proof .pf-stage",melt:104,cover:.85,whole:!0},u.sleepUnderMenu=!0,u.jump={windows:1,stations:1.5},u.carry={extra:800,back:100,step:96,slow:.3,near:100,pixels:1.5,dpr:1.5,heroPass:.5,lead:160},u.stills={"hero-a":0,"hero-b":.306,"hero-c":.586,"hero-d":1,studio:2,services:3,partner:4,websites:5,difference:6,process:7,pricing:9,faq:10,start:11,footer:12};var Ot=28,Kt=1/Math.tan(Ot*Math.PI/360),Ft=`
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
float place(vec4 s) { float a = TAU * s.x; return a + gVx3.z * sin(a * gVx3.w + 1.7) / gVx3.w + gAngle; }`,_o=`
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
}`,oo=`
void curve(vec4 s, float t, out vec3 p, out vec4 nb) {
gHandW = 1.0; gKeep = 1.0; gOwn = 0.0; gHandIn = 0.0; gHandM = 1.0;
shape(uShA, s, t, p, nb);
}
float strandOn(vec4 s) { return 1.0 - smoothstep(uShare - 0.03, uShare + 0.03, pick(s)); }`,Ko=`
uniform vec4 uRp[8];
uniform vec4 uRpA;
uniform vec4 uRpY;
uniform vec4 uRpK;
uniform vec4 uRpS;
uniform vec4 uRpM;
uniform vec4 uRpC;
uniform vec4 uRpT;
uniform float uRpSoft;
float gLie;`,zo=`
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
float strandOn(vec4 s) { return 1.0; }`,ae=(function(){var t=Ft,o=[[/uniform float uMix, uStag, uLift;[^\n]*\n/,""],[/uniform vec4 uHand;[^\n]*\n/,""],[/uniform vec4 uHand2;[^\n]*\n/,""],[/uniform float uFold;[^\n]*\n/,""],[/uniform float uFlow;[^\n]*\n/,""],[/float gKeep;[^\n]*\n/,""],[/float gOwn, gHandIn, gHandM, gShow;/,"float gShow;"],[/float gBody, gHandW;/,"float gBody; const float gHandW = 1.0;"]];return o.forEach(function(e){if(!e[0].test(t))throw new Error("sfs-scene: rope head, no "+e[0]);t=t.replace(e[0],e[1])}),t+Ko})(),Io=`
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
}`,lo=`#version 300 es
precision highp float;
layout(location=0) in vec2 aIV;
layout(location=1) in vec4 aSeed;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform float uSeg, uWidth, uMinPx, uPxUnit, uWMul, uExposure;
uniform float uCore, uBreath, uWave, uMouth, uWash, uTips, uTipWash, uRim;
uniform vec3 uReach;
uniform vec2 uVar;`,jo=`
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
}`,go=`#version 300 es
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
}`,eo=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aSeed;
layout(location=2) in vec4 aPt;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform vec2 uRes;
uniform float uPtShare, uPtScale, uPointAmt, uTravel, uSparkle, uPtLift, uRim;
uniform vec4 uKc[2]; uniform vec4 uKcAmt;`,uo=`
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
}`,To=(function(){var t="smoothstep(0.25, 0.70, gThin);",o=uo.replace(t,"smoothstep(0.25, 0.70, gThin) * (1.0 - gLie * step(0.12, fract(aPt.z * 13.7)));");if(o===uo)throw new Error("sfs-scene: rope points, no "+t);return o})(),Ro=`#version 300 es
precision highp float;
in vec2 vUv; in float vA; out vec4 o;
uniform vec3 uBlue;
void main() {
float d = length(vUv);
float core = smoothstep(0.26, 0.14, d);
float halo = (0.55 * exp(-d * d * 3.2) + 0.45 * exp(-d * d * 14.0)) * smoothstep(1.0, 0.55, d);
vec3 c = (uBlue + vec3(0.05, 0.09, 0.0)) * halo * 0.62 + vec3(0.90, 0.96, 1.0) * core;
o = min(vec4(c, halo * 0.50 + core) * vA, vec4(1.0));
}`,Eo=`#version 300 es
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
}`,ie=`#version 300 es
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
}`;function se(t,o,e){var r=1/Math.tan(t*Math.PI/360),a=1/(o-e);return new Float32Array([r,0,0,0,0,r,0,0,0,0,(e+o)*a,-1,0,0,2*e*o*a,0])}function l(t,o,e,r){var a=Math.cos(t),i=Math.sin(t),c=Math.cos(o),d=Math.sin(o),f=Math.cos(e),y=Math.sin(e);return new Float32Array([a*f,d*i*f+c*y,-c*i*f+d*y,0,-a*y,-d*i*y+c*f,c*i*y+d*f,0,i,-d*a,c*a,0,0,0,-r,1])}function n(t){return function(){t|=0,t=t+1831565813|0;var o=Math.imul(t^t>>>15,1|t);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296}}function s(t,o,e){return t+(o-t)*e}function p(t,o,e){return t<o?o:t>e?e:t}function h(t){return t<0?0:t>1?1:t}function v(t){var o=t.slice().sort(function(e,r){return e-r});return o.length?o[o.length>>1]:0}function w(t,o){var e=t.length;if(o<=t[0][0])return t[0][1];if(o>=t[e-1][0])return t[e-1][1];for(var r=0;o>t[r+1][0];)r++;function a(R){if(R===0||R===e-1)return 0;var z=t[R][0]-t[R-1][0],O=t[R+1][0]-t[R][0],E=(t[R][1]-t[R-1][1])/z,g=(t[R+1][1]-t[R][1])/O;return E*g<=0?0:3*(z+O)/((2*O+z)/E+(O+2*z)/g)}var i=t[r][0],c=t[r+1][0]-i,d=t[r][1],f=t[r+1][1],y=(o-i)/c,A=y*y,P=A*y;return(2*P-3*A+1)*d+(P-2*A+y)*c*a(r)+(3*A-2*P)*f+(P-A)*c*a(r+1)}function x(t){return t=h(t),t*t*(3-2*t)}function S(t){return t-2*Math.PI*Math.round(t/(2*Math.PI))}function k(t){try{performance.mark("sfs-scene:"+t)}catch{}}function N(t){L.push(t),L.length>60&&L.shift(),window.console&&console.warn("[scene] "+t)}var L=[],X=se(Ot,.5,30),F=Math.PI/180,J=/SwiftShader|llvmpipe|Software|Basic Render/i,nt=document.documentElement,Tt=document.currentScript,It=Tt&&Tt.src?Tt.src.replace(/sfs-scene(\.min)?\.js(\?.*)?$/,""):"",Nt=new URLSearchParams(location.search),pt=/[?&](debug|popup-debug|perf=1|sceneperf=1)\b/.test(location.search),vt=new Float32Array(u.maxStrands*4);(function(){for(var t=n(20261007),o=0;o<u.maxStrands;o++)vt[o*4]=(.5+o*.7548776662466927)%1,vt[o*4+1]=(.5+o*.5698402909980532)%1,vt[o*4+2]=t(),vt[o*4+3]=t()})();var Rt=128,jt=u.tiers[0].points,W=null,m=null,dt=null,Q=null,Et=null,Ht=null,Bt=null,Yo=!1,Ct={begin:0,send:0,waited:0,take:0,frames:[]},Yt=[],At=null,Wo=0,le=0,Ve=[],ct=null,q=[],fo=null,ue=!1,fe=!1,Po="",Xt=null,wo=!1,No=!1,Do=0,_e={},kr={alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1},I="off",ut="page",Go="",Ke="",Mt=0,xt={},qt={},Mr=!1,ht=0,gt=0,St=1,ft=0,_=0,Z=1,Dt=0,ce=0,ro=!0,Xo="",at=!1,wt=0,Qt=0,yt=null,Wt="",Qo=0,no=[],Ae=0,co=0,he=null,Ut=0,yo=0,Se=0,ao=0,io=0,Ar=0,mt=0,Zo=0,D=null,Y=null,Zt=0,pe=!0,it=null,kt=-1,so="",bo=!1,ze=!1,et=$r(),Ie=0,Te={fails:0},$o=0,je=0,Ye=null,Gt=!1,De=!1,Ho=0,Sr=!1,Ge=!1,M={cx:0,cy:0,on:0,down:!1,finger:!1,downAt:null,ax:0,ay:0,a:0,bx:0,by:0,b:0,busy:!1,turnX:0,turnY:0},$t=[],de=null,Xe=!1,ho=[],po=[],Vt=[],Qe=[],me=[],ko={},Bo={},Ze=null,$e=null,Re=null,zr=null,st={top:0,h:0,stageH:0},Lt=[],Ee=[],Tr=[],Je=[],Rr=[],ve=null,We={},xe=[0,0,0],Jo=[0,0,0],tr=[0,0,0],ge=-1,we,te=0,$n=[0,0,0,0],sn=[1e6,1e6,-1e6,-1e6];function ln(t){var o=Re.get(t);return o===void 0&&(o=getComputedStyle(t).position==="sticky"?1:0,Re.set(t,o)),o}function Mo(t){var o=0,e=0,r,a={x:0,y:0,w:t.offsetWidth,h:t.offsetHeight,pin:null,rel:0};for(r=t;r;r=r.offsetParent){if(!a.pin&&ln(r)&&r.parentElement){var i=Mo(r.parentElement),c=getComputedStyle(r),d=getComputedStyle(r.parentElement),f=0,y;for(y=r;y;y=y.offsetParent)f+=y.offsetTop+(y===r?0:y.clientTop);var A=parseFloat(c.top)||0,P=i.pin?i.pin.n+i.rel:i.y,R=P+r.parentElement.clientTop+(parseFloat(d.paddingTop)||0),z=P+i.h-(parseFloat(d.borderBottomWidth)||0)-(parseFloat(d.paddingBottom)||0)-r.offsetHeight-(parseFloat(c.marginBottom)||0),O=Math.abs(f-(window.scrollY+A))<1.5||f>=z-1.5;a.pin={n:O?R+(parseFloat(c.marginTop)||0):f,top:A,lim:z},a.rel=e+(r===t?0:r.clientTop),o+=r.offsetLeft+(r===t?0:r.clientLeft);continue}o+=r.offsetLeft+(r===t?0:r.clientLeft),a.pin||(e+=r.offsetTop+(r===t?0:r.clientTop))}return a.x=o,a.y=e,a}function Er(t,o){if(!t.pin)return t.y;var e=t.pin;return(e.lim<e.n?e.n:Math.min(Math.max(e.n,o+e.top),e.lim))+t.rel}function or(t,o){var e=Er(t,o)-o;return{l:t.x,t:e,w:t.w,h:t.h,r:t.x+t.w,b:e+t.h,cx:t.x+t.w/2,cy:e+t.h/2}}function ye(t){Ze&&t&&!$e.has(t)&&($e.add(t),Ze.observe(t))}function Pe(t,o){var e=ko[t];if(!e){e=ko[t]={recs:[]};var r=Array.prototype.slice.call(document.querySelectorAll(t));r.forEach(ye),e.recs=r.map(Mo).filter(function(a){return a.w>1&&a.h>1}),at&&(ro=!0)}return o?e.recs.map(function(a){return or(a,kt)}):e.recs.length?or(e.recs[0],kt):void 0}function Wr(t){var o=t.split("|"),e=document.querySelector(o[0]);return e?parseFloat(getComputedStyle(e).getPropertyValue(o[1])):NaN}function un(t,o){var e=t+"|"+o;return e in Bo||(Bo[e]=Wr(e)),Bo[e]}function Lo(){ro=!1;var t=[],o,e;ft=W&&W.clientWidth?W.clientWidth:nt.clientWidth,_=W&&W.clientHeight?W.clientHeight:window.innerHeight,wt=_,at&&(Qo=document.body?document.body.offsetHeight:0,!W||!W.clientHeight?wt=_+u.carry.extra:Qo<wt?(at=!1,Wt="",yt=null,Qt=0,W.style.cssText=mr,wt=_=W.clientHeight||window.innerHeight):_=wt-u.carry.extra),Dt=window.innerHeight;var r=u.fit;Z=Math.max(1,.5*Math.min(Math.max(_,ft/r.aspect),ft*r.narrow)),Jt.cssW=ft,Jt.cssH=_,Jt.U=Z,ce=Math.max(0,(at?Qo:nt.scrollHeight)-Dt);var a=document.querySelector(u.hero),i=a?a.querySelector(u.stage):null;if(a){var c=Mo(a);st={top:c.y,h:c.h,stageH:i?i.offsetHeight:Dt},ye(a)}else st={top:0,h:Dt,stageH:Dt};var d=ut!=="hero",f=u.secs.map(function(E){return E&&d?document.querySelector(E):null});Lt=f.map(function(E){return E?(ye(E),Mo(E).y):null}),d&&Array.prototype.forEach.call(document.querySelectorAll(".sec"),ye);for(e in ko){var y=Array.prototype.slice.call(document.querySelectorAll(e));y.forEach(ye),ko[e].recs=y.map(Mo).filter(function(E){return E.w>1&&E.h>1}),ko[e].recs.forEach(function(E){t.push(E.x,E.pin?E.pin.n+E.rel:E.y,E.w,E.h)})}for(o in Bo)Bo[o]=Wr(o),t.push(Bo[o]);Ee=[],Array.prototype.forEach.call(document.querySelectorAll("img.gd-img"),function(E){if(!/gd-img--over/.test(E.className)&&!(!d&&!E.closest(u.hero))){var g=Mo(E),b=E.parentElement,$=E.closest(".gd"),U=E.closest(".sec, header.hero, footer.foot");if(b&&/(^|\s)gd-cut(\s|$)/.test(b.className)){var B=Mo(b);g.h=Math.min(g.h,B.h),g.w=Math.min(g.w,B.w)}if(!(g.w<2||g.h<2)){var H=U?f.indexOf(U):-1;H<0&&(H=U&&U.matches(u.hero)?0:-1),Ee.push({rec:g,st:H,fig:$}),t.push(g.x,g.pin?g.pin.n+g.rel:g.y,g.w,g.h)}}}),Tr=d?[1,2,3].map(function(E){return document.querySelector('[data-scene-station="'+E+'"]')}):[],Je=d?[1,2,3].map(function(E){return document.querySelector("#focus .oc-br--"+E)}):[],Rr=d?Array.prototype.slice.call(document.querySelectorAll("#services .cards .card")):[];var A=ut==="page"?document.querySelector(u.proof.sel):null;if(ve=A?Mo(A):null,at){no=[];var P=u.seam,R=Lt[2]===null||Lt[2]===void 0?oe():Math.min(Lt[2]-P.to*_,ce);Ae=st.h-Dt>1?oe()+u.carry.heroPass*Math.max(0,R-oe()):-1e9;var z=function(E){var g=E&&E.pin;if(!(!g||g.lim<=g.n+1||g.lim-g.top<=Ae)){for(var b=0;b<no.length;b++)if(no[b][0]===g.n-g.top&&no[b][1]===g.lim-g.top)return;no.push([g.n-g.top,g.lim-g.top])}};for(e in ko)ko[e].recs.forEach(z);z(ve),t.push(Qo,wt)}t.push(ft,_,Dt,ce,st.top,st.h,Lt.join("/")),t=t.join(",");var O=t!==Xo;return Xo=t,O}function oe(){return st.top+st.h-Dt}function fn(t){if(qt.progress)return h(+qt.progress()||0);var o=st.h-Dt;return o>1?h((t-st.top)/o):0}function er(t){for(var o=1,e=u.seam,r=u.secs.length-1,a=2;a<=r;a++)if(!(Lt[a]===null||Lt[a]===void 0)){var i=Math.min(Lt[a]-e.to*_,ce),c=Math.min(Lt[a]-e.from*_,i-e.least*_);if(a===2&&(c=Math.min(oe(),i-1)),t<=c||(o=a-1+x((t-c)/(i-c)),t<i))break}return o}function Ne(t){var o=fn(t),e=oe();return ut==="hero"?o:st.h-Dt<=1?t<=e?o:er(t):t<=e+1?o:Math.max(o,er(t))}var cn={l:0,t:0,w:100,h:100,r:100,b:100,cx:50,cy:50};function rr(t){var o={},e,r=u.look;for(e in r)o[e]=r[e];if(t)for(e in t)o[e]=t[e];return o}function hn(t,o,e){var r=We[t];return r||(r=We[t]={v:o,to:o,s:e||.3}),r.to=o,r.s=e||.3,D&&(r.v=o),r.v}var Jt={box:Pe,live:function(t){return Pe(t)},css:un,ux:function(t){return(t-ft/2)/Z},uy:function(t){return(_/2-t)/Z},ul:function(t){return t/Z},cssW:0,cssH:0,U:1,time:0,scrollY:0,narrow:function(){return ft<=900},look:rr,NONE:cn,clamp01:h,sstep:x,lerp:s,detail:tr,hover:xe,ease:hn,ptr:{x:0,y:0,on:0},open:function(t,o,e,r){var a=t==null?0:h((0-t)/Math.max(1,o-t)),i=e==null?1:h((_-e)/Math.max(1,r-e));return Math.min(1-x(a),x(i))},q:0},Pr={uTime:1,uShare:1,uShA:1,uShB:1,uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1,TAU:1,PI:1,gBlue:1,gHot:1,gFlex:1,gThin:1,gSel:1,gKnot:1,gShow:1},pn={uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1};function dn(t){var o=String(t.id||"").toLowerCase().replace(/[^a-z0-9]/g,"")||"x",e=String(t.glsl||"").replace(/\/\*[\s\S]*?\*\//g," ").replace(/\/\/[^\n]*/g," "),r={},a={},i={id:o,src:t,uni:r,gids:{},text:""};e=e.replace(/\buniform\s+(\w+)\s+([^;]+);/g,function(U,B,H){var T=[];return H.split(",").forEach(function(tt){var G=/^\s*(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*$/.exec(tt);if(!G)throw new Error('cannot read the uniform declaration "'+U.replace(/\s+/g," ")+'"');if(!Pr[G[1]]){if(B!=="vec4")throw new Error("uniform "+G[1]+" is a "+B+": a shape's uniforms are vec4 (SHAPES.md 1)");r[G[1]]=G[2]?+G[2]:0,a[G[1]]=1,T.push(G[1]+(G[2]?"["+G[2]+"]":""))}}),T.length?"uniform vec4 "+T.join(", ")+";":" "});var c="",d=0,f,y;for(f=0;f<e.length;f++)y=e.charAt(f),y==="}"&&d--,c+=d>0&&y!==`
`?" ":y,y==="{"&&d++;for(var A=[],P="(?:void|float|int|bool|vec[234]|mat[234])",R,z=new RegExp("\\b"+P+"\\s+(\\w+)\\s*\\(","g");R=z.exec(c);)a[R[1]]=1;for(var O=new RegExp("\\b(?:const\\s+)?"+P+"\\s+([^;{}()]+(?:\\([^;{}]*\\))?[^;{}()]*);","g");R=O.exec(c);)if(!(/\)\s*$/.test(R[1])&&!/=/.test(R[1]))){var E=R[1].replace(/\([^)]*\)/g,"").split(",").map(function(U){return(/^\s*(\w+)/.exec(U)||[])[1]}).filter(Boolean),g=E.filter(function(U){return Pr[U]});if(g.length===E.length)A.push([R.index,R.index+R[0].length]);else{if(g.length)throw new Error('"'+R[0]+`" declares the engine's `+g.join(", ")+" together with names of its own: put them on lines of their own");E.forEach(function(U){a[U]=1})}}for(f=A.length-1;f>=0;f--)e=e.slice(0,A[f][0])+" "+e.slice(A[f][1]);i.text=e.replace(/[A-Za-z_]\w*/g,function(U,B,H){return a[U]===1&&H.charAt(B-1)!=="."?U+"_"+o:U});var b=t.shapes||{};for(var $ in b){if(!a[b[$]])throw new Error("shape "+$+" names the function "+b[$]+", which the file's glsl does not define");i.gids[$]=Vt.length,Vt.push({fn:b[$]+"_"+o,file:i,local:$})}return i}function mn(t){var o=`void shape(int id, vec4 s, float t, out vec3 p, out vec4 nb) {
  gBlue = 0.0; gHot = 0.0; gFlex = 0.2; gSel = 1.0; gThin = 1.0; gShow = 1.0; gBody = 0.0; gKnot = 0.0; gLoc = vec3(0.0);
`,e=[],r=[];return t.hero&&e.push("if (id < 0) { heroCurve(s, t, p, nb); gBody = 1.0; }"),t.ids.forEach(function(a){if(a===0){e.push("if (id == 0) { shBody(s, t, p, nb); gBody = 1.0; }");return}e.push("if (id == "+a+") "+Vt[a].fn+"(s, t, p, nb);"),Vt[a].file&&r.indexOf(Vt[a].file)<0&&r.push(Vt[a].file)}),o+="  "+e.join(`
  else `)+`
  else { p = vec3(0.0); nb = vec4(0.0, 0.0, 1.0, 0.0); }
}
`,r.sort(function(a,i){return ho.indexOf(a)-ho.indexOf(i)}),(t.form==="rope"?ae:Ft)+_o+r.map(function(a){return`
/* ---- shapes-`+a.id+` ---- */
`+a.text}).join(`
`)+`
`+o+(t.form==="rope"?zo:oo)}function vn(){var t=ut==="page"&&po.length?u.groups:[1];q=[{k:0,lo:0,hi:Math.min(t[0],u.secs.length-1),hero:!0,ids:[0],form:"one",state:"none",strand:null,point:null,info:null}],fo=q[0],ue=q[0].hi>=u.secs.length-1||ut!=="page"||!po.length,fe=!1,Po="",_e={}}function ee(){if(!ue){ue=!0;var t=u.groups,o=u.secs.length-1,e,r,a;for(q[0].hi>1&&N("CONF.groups: the first group must end at the ball (1); below it every picture needs the rope"),e=1;e<t.length&&t[e-1]<o;e++){var i=t[e-1],c=Math.min(t[e],o),d=[],f="rope";for(r=i;r<=c;r+=.5)r%1&&(!po[r]||r>c)||(a=r===1?{gid:0}:be(r),a&&d.indexOf(a.gid)<0&&d.push(a.gid));d.sort(function(y,A){return y-A}),q.push({k:e,lo:i,hi:c,hero:!1,ids:d,form:f,state:"none",strand:null,point:null,info:null})}}}function Ao(t){!ue&&t>q[0].hi&&ee();for(var o=0;o<q.length;o++)if(t<=q[o].hi)return q[o];return q[q.length-1]}function xn(t,o){return(o.shA<0?!t.hero:t.ids.indexOf(o.shA)<0)||o.shB!==o.shA&&(o.shB<0?!t.hero:t.ids.indexOf(o.shB)<0)?!1:o.rope?t.form==="rope":t.form==="one"}function gn(t){var o=Ao(t),e;for(e=o.k-1;e>=0;e--)if(q[e].state==="ready")return{G:q[e],q:q[e].hi};for(e=o.k+1;e<q.length;e++)if(q[e].state==="ready")return{G:q[e],q:q[e].lo<=1?Math.min(2,q[e].hi):q[e].lo};return null}function nr(t,o){var e=t.k?String(t.hi):"";m&&t.strand&&t.strand!==o["strand"+e]&&(m.deleteProgram(t.strand.p),m.deleteProgram(t.point.p)),t.strand=o["strand"+e],t.point=o["point"+e],t.state="ready",t.k&&k("group"+t.hi),wn()}function wn(){var t=[],o,e,r=u.secs.length-1;for(o=0;o<=r;o++)for(e=0;e<q.length;e++)if(q[e].state==="ready"&&o>=q[e].lo&&o<=q[e].hi){t.push(o);break}var a=t.join(",");if(a!==Po&&(Po=a,typeof qt.onLive=="function"))try{qt.onLive(t)}catch{}}function ar(){if(!(I!=="live"||ut!=="page"||!q.length||xt.nogroups)){ee(),fe=!0;var t=Ao(Y===null?0:Y).k,o=q.filter(function(e){return e.state==="none"});o.sort(function(e,r){return Math.abs(e.k-t)-Math.abs(r.k-t)||r.k-e.k}),o.forEach(ir)}}function ir(t){t.state="asked",ur(Co(t),function(o,e){if(t.info=e,!o){t.state="failed",N("the programs of stations "+t.lo+" to "+t.hi+" did not link ("+e.why+"): the page keeps its stills there");return}nr(t,o),bt()},t)}function yn(t){t.state==="none"&&fe&&ir(t);for(var o=1;o<Yt.length;o++)if(Yt[o].tag===t){Yt.unshift(Yt.splice(o,1)[0]);break}}function Nr(t){ee();var o=Ao(t),e={};if(o.state==="ready"||!m)return o.state==="ready"?o:null;try{Co(o).forEach(function(r){e[r.name]=lr(sr(r.vs,r.fs))})}catch(r){return o.state="failed",N("group "+o.k+": "+r.message),null}return nr(o,e),o}function Hr(t){ho=[],Vt=[{fn:"shBody",file:null,local:0}],po=[],me=[],(t||[]).forEach(function(o){if(!(!o||typeof o!="object")){var e=Vt.length;try{ho.push(dn(o))}catch(r){Vt.length=e,N("shapes-"+(o.id||"?")+" left out: "+r.message)}}}),ho.forEach(function(o){var e=o.src.stations||{};for(var r in e)typeof e[r]=="function"&&+r>=2&&+r<u.secs.length&&(po[+r]={fn:e[r],file:o,gids:{},names:{},checked:!1,broken:!1});var a=o.src.ways||{};for(r in a)typeof a[r]=="function"&&(me[+r]=a[r])}),vn()}function bn(t,o){var e=t.gids[o];if(e!==void 0)return e;if(t.file.gids[o]!==void 0)e=t.file.gids[o];else if(String(o)==="0")e=0;else{e=null;for(var r=0;r<ho.length;r++)ho[r].gids[o]!==void 0&&(e=ho[r].gids[o])}return t.gids[o]=e}function kn(t,o,e){var r=t.names[o+e];if(r!==void 0)return r;var a=/^(.*?)(\d)$/.exec(e),i=[t.file,Vt[o].file],c;r=null;for(var d=0;d<i.length&&!r;d++)c=i[d],c&&(c.uni[e]===0?r=e+"_"+c.id:a&&c.uni[a[1]]>+a[2]&&(r=a[1]+"_"+c.id+"["+a[2]+"]"));return!r&&pn[e]&&(r=e),t.names[o+e]=r}function be(t){var o=po[t],e,r,a;if(!o||o.broken)return null;try{e=o.fn(Jt)}catch(d){return o.broken=!0,N("station "+t+" (shapes-"+o.file.id+") threw: "+d.message),null}if(!e||!e.u)return o.broken=!0,N("station "+t+" (shapes-"+o.file.id+") returned no { shape, u, look }"),null;var i=bn(o,e.shape);if(i===null)return o.broken=!0,N("station "+t+" (shapes-"+o.file.id+") asks for shape "+e.shape+", which no file defines"),null;var c={};for(r in e.u)a=kn(o,i,r),a?c[a]=e.u[r]:o.checked||N("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not a uniform of its shape; left out'),!o.checked&&(!e.u[r]||e.u[r].length!==4||e.u[r].some(function(d){return typeof d!="number"||d!==d}))&&N("station "+t+" (shapes-"+o.file.id+'): "'+r+'" is not four numbers: '+JSON.stringify(e.u[r]));return o.checked=!0,{i:t,gid:i,u:c,look:rr(e.look),treads:e.treads||null,lit:e.lit,floor:e.floor||null,open:e.open===void 0?1:h(e.open),knot:e.knot||Lr,foot:typeof e.foot=="number"?e.foot:null}}function Mn(){var t=Math.min(u.tiers[Mt].strands,u.maxStrands);return Math.min(u.widthLod[1],Math.max(u.widthLod[0],Math.sqrt(u.tiers[0].strands/t)))}function An(t,o,e){var r=u.track,a={},i,c=u.alive,d=u.body,f=u.hang,y=u.pointer,A=u.hangUp,P=!!A&&_>ft&&ft<=A.upTo;for(i in r)a[i]=w(r[i],t);var R=Math.min(u.tiers[Mt].strands,u.maxStrands),z={p:t,time:o,v:a};z.open=a.open<1e-5?0:a.open>1-1e-5?1:a.open,z.wind=a.wind<1e-5?0:a.wind>1-1e-5?1:a.wind,z.share=Math.min(1,a.count/R);var O=p(ft/Z/(2*u.fit.aspect),f.minScale,1);if(z.hg=[ft/2/Z+f.root[0]*O,_/2/Z+f.root[1]*O,O,a.loosen],P){f=A,O=p(A.wide*ft/(A.trunkWidth*Z),A.least,A.most);var E=Pe("#clock"),g=(E?Math.max(0,E.b):.3*_)+A.under+.5*A.trunkWidth*O*Z;z.hg=[ft/2/Z+A.root[0]*O,(_/2-g)/Z+A.root[1]*O,O,a.loosen]}z.hg2=[f.sway,0,0,0];var b=h(a.loosen/f.rest[2]);b=b*b*(3-2*b);var $=f.rest[3]*(1-b);z.hg3=[(s(f.rest[0],f.tip[0],b)+$)*F,(f.tip[1]+$)*F,f.depth,f.tipCurve];var U=s(f.rest[4],1,b);z.hg4=[f.trunk[0]*U,f.trunk[1]*U,s(f.rest[1],f.reach[0],b)*U,f.reach[1]*U],z.hg5=[f.trunk[2]*U,f.reach[2]*U,f.bend];var B=c.bob*Math.sin(o*c.bobRate)*h((t-.5)/.2);z.bob=B;var H=u.swirl,T=h((t-H.gate[0])/(H.gate[1]-H.gate[0]));T=T*T*(3-2*T);var tt=e===void 0?d.spin*o:e,G=tt-2*Math.PI*Math.round(tt/(2*Math.PI)),ot=(f.leave[0]+f.leave[1])/2;z.angle=(ot-180-H.leave)*F+a.phase+(T>=1?tt:G*T),z.op3=[(f.leave[1]-f.leave[0])*F/(f.trunkWidth*O),f.trunkWidth*O,(ot+$)*F,H.settle],z.op=[z.open,H.stagger,a.hole,a.arm],z.op2=[H.leave*F,H.end*F,a.disc,z.angle],z.vx=[a.twist,a.radius,a.tube,d.squash],z.vx2=[a.flare,a.loose,d.wrap,d.wires],z.vx3=[d.treadTwist,d.wrapVar,a.tufts,d.tuftCount],z.vx4=[z.wind,a.sphere,a.ball,a.mouth],z.vxc=[a.cx,a.cy+B,0,Math.max(.01,d.lip*a.ball)],z.mouth=s(a.radius-a.tube,a.mouth,a.sphere),z.outer=s(a.radius+a.tube,a.ball,a.sphere),z.ringZ=s(a.tube*d.squash*.22,a.ball*d.ringZ,a.sphere);var K=a.yaw+c.viewSway[0]*Math.sin(o*c.viewRate[0])+a.turn*y.turn[0]*M.turnX,V=a.pitch+c.viewSway[1]*Math.sin(o*c.viewRate[1]+1.3)-a.turn*y.turn[1]*M.turnY;return z.view=l(K*F,V*F,0,Kt),z.core=a.core,z.floor={x:a.floorX,y:a.floorY,w:a.floorW,shadow:a.shadow*(1-4*B),pool:a.pool},z}function Sn(t,o){var e=t.v,r=u.alive,a=u.page,i=u.shade,c=Math.min(u.tiers[Mt].strands,u.maxStrands),d=e.yaw+(r.viewSway[0]-a.scale*a.viewSway[0])*Math.sin(o*r.viewRate[0]),f=e.pitch+(r.viewSway[1]-a.scale*a.viewSway[1])*Math.sin(o*r.viewRate[1]+1.3);return{i:1,gid:0,u:{uW0:t.vx,uW1:t.vx2,uW2:t.vx3,uW3:[e.sphere,e.ball,e.mouth,t.vxc[3]],uWC:[t.vxc[0],t.vxc[1],t.vxc[2],e.wires],uWR:[d*F,f*F,t.angle,0],uWB:[e.core,u.blueAmt.reach*t.outer/.85,e.wash,0]},look:rr({thick:e.thick,gain:e.gain,share:t.share,points:e.points,pointSize:e.pointSize,tips:e.tips,deep:e.deep,skin:s(e.skin,1-(1-e.skin)*Math.pow(u.tiers[0].strands/c,.8),e.wires),skinW:e.skinW,back:i.back}),treads:null,lit:void 0,floor:null,open:1,knot:Lr,foot:null}}function Br(t,o,e){var r=Math.cos(o),a=Math.sin(o),i=t[0]*r+t[2]*a,c=-t[0]*a+t[2]*r,d=Math.cos(e),f=Math.sin(e);return[i,t[1]*d-c*f,t[1]*f+c*d]}function Oo(t,o,e){var r=An(Math.min(t,1),o,e),a=r.v,i=r,c=u.shade,d=u.blueAmt,f=u.body,y=u.pointer,A=Math.min(u.tiers[Mt].strands,u.maxStrands),P=1-r.wind;if(Jt.time=o,Jt.scrollY=kt,Jt.q=t,i.rope=null,i.q=t,i.kind=0,i.mix=0,i.shA=i.shB=-1,i.u=null,i.ridge=a.wires,i.rim=a.rim,i.thick=a.thick,i.gain=a.gain,i.skinW=a.skinW,i.tips=a.tips,i.wash=a.wash,i.shade=[s(a.deep,Math.max(a.deep,c.open),P),s(a.skin,1-(1-a.skin)*Math.pow(u.tiers[0].strands/A,.8),a.wires),c.formFloor,s(c.back,Math.max(c.back,.85),P)],i.reach=d.reach*r.outer/.85,i.ring=r.core>.002?{core:r.core,at:[r.vxc[0],r.vxc[1],r.ringZ],turn:[0,0],mouth:r.mouth,outer:r.outer,bloom:a.bloom}:null,i.floors=[r.floor],i.ptsH={share:a.points,size:a.pointSize,amt:1},i.ptsS=null,i.bodyAt=[r.vxc[0],r.vxc[1]],i.turn=a.turn,i.lit=void 0,i.treads=null,i.stations=[0],i.edge=u.edge.hero,t<=1||ut==="hero")return i;var R=u.secs.length-1,z=Math.max(1,Math.min(R-1,Math.floor(t))),O=h(t-z);t>=R&&(z=R-1,O=1);var E=z===1?Sn(r,o):null,g=E||be(z),b=O>0?be(z+1):g;g||(g=b),b||(b=g),i.stations=O>0?[z,z+1]:[z];var $=null,U=u.via[z+1],B=U&&O>0&&g&&b&&g.gid!==b.gid&&po[z+.5]?be(z+.5):null;if(B&&B.gid===g.gid&&(O<U.at?(b=B,O=O/U.at):(g=B,O=(O-U.at)/(1-U.at),$={span:[0,1],direct:U.direct,stagger:U.stagger})),i.edge=u.edge.page,i.rim=0,i.ridge=1,i.floors=[],i.ring=null,i.ptsH=null,i.core=0,i.wash=0,i.bodyAt=null,i.turn=0,!g)return i.share=0,i.shA=i.shB=0,i.u={},i.ptsS=null,i.view=Fr(0,0,o),i;var H=x(O),T={},tt,G,ot,K={},V=O<1e-5?0:O>1-1e-5?1:O,j=H,C={pass:0,share:[1,1],open:[1,1],cut:0,knot:[0,1,0,1],foot:null};if(g.gid===b.gid){for(tt in g.u)G=g.u[tt],ot=b.u[tt]||G,T[tt]=G===ot?G:[s(G[0],ot[0],H),s(G[1],ot[1],H),s(G[2],ot[2],H),s(G[3],ot[3],H)];g.gid===0&&g!==b&&g.u.uWR&&b.u.uWR&&(T.uWR[2]=s(b.u.uWR[2]+S(g.u.uWR[2]-b.u.uWR[2]),b.u.uWR[2],H)),i.shA=i.shB=g.gid,C.share=[g.look.share,b.look.share],C.open=[s(g.open,b.open,H),1];var Pt=u.cutBy[z+1];C.cut=Math.abs(g.look.share-b.look.share)>1e-4?Pt?h((V-Pt[0])/(Pt[1]-Pt[0])):V:0,Pt&&C.cut>=1&&(C.cut=.99999),C.foot=g.foot===null&&b.foot===null?null:[s(g.foot===null?b.foot:g.foot,b.foot===null?g.foot:b.foot,H),s(g.foot===null?0:g.open,b.foot===null?0:b.open,H)],C.knot=[s(g.knot[0],b.knot[0],H),s(g.knot[1],b.knot[1],H),0,1]}else{for(tt in g.u)T[tt]=g.u[tt];for(tt in b.u)T[tt]=b.u[tt];var zt=$||ft<=900&&u.passNarrow[z+1]||u.passBy[z+1]||null,xo=zt&&zt.span?zt.span:[0,1];C.join=zt&&zt.join!==void 0?zt.join:u.rope.pass.join,C.direct=zt&&zt.direct?1:0,C.stagger=zt&&zt.stagger!==void 0?zt.stagger:C.direct?.5:u.rope.pass.stagger,V=h((V-xo[0])/Math.max(1e-4,xo[1]-xo[0])),V=V<1e-5?0:V>1-1e-5?1:V,j=x(V),i.shA=g.gid,i.shB=b.gid,i.kind=2,i.mix=V,C.pass=V,C.share=[g.look.share,b.look.share],C.open=[g.open,b.open],C.knot=[g.knot[0],g.knot[1],b.knot[0],b.knot[1]];var Uo=g.foot===null?0:g.open*(1-x(V/.4)),Vo=b.foot===null?0:b.open*x((V-.6)/.4);C.foot=Uo+Vo>0?[(Uo*(g.foot||0)+Vo*(b.foot||0))/(Uo+Vo),Math.max(Uo,Vo)]:null,V===0?(i.shB=g.gid,i.kind=0,C.share[1]=C.share[0],C.open[1]=C.open[0]):V===1&&(i.shA=b.gid,i.kind=0,C.pass=0,C.share[0]=C.share[1],C.open[0]=C.open[1],C.knot=[b.knot[0],b.knot[1],b.knot[0],b.knot[1]])}for(tt in u.look)K[tt]=s(g.look[tt],b.look[tt],j);if(i.u=T,i.look=K,i.share=1,i.thick=K.thick,i.gain=K.gain,i.skinW=K.skinW,i.tips=K.tips,i.shade=[K.deep,K.skin,c.formFloor,K.back],i.view=Fr(K.yaw,K.pitch,o),(i.shA===0||i.shB===0)&&T.uW0&&T.uWC&&T.uWR&&T.uWB&&T.uW3){var So=E?1-x(O*u.ringOut):1;E&&b!==g&&b.u.uWB&&(T.uWB=[E.u.uWB[0]*So+b.u.uWB[0]*H,T.uWB[1],T.uWB[2],T.uWB[3]]),T.uWR=[T.uWR[0]+y.turn[0]*F*M.turnX,T.uWR[1]-y.turn[1]*F*M.turnY,T.uWR[2],T.uWR[3]];var Me=T.uW3[0],qe=T.uW0[1],wr=T.uW0[2];if(i.mouth=s(qe-wr,T.uW3[2],Me),i.outer=s(qe+wr,T.uW3[1],Me),i.core=T.uWB[0],i.reach=Math.max(.01,T.uWB[1]),i.wash=T.uWB[2],i.bodyAt=[T.uWC[0],T.uWC[1]],i.turn=1,i.core>.002){var yr=Br([0,0,s(wr*T.uW0[3]*.22,T.uW3[1]*f.ringZ,Me)],T.uWR[0],T.uWR[1]);i.ring={core:i.core,at:[T.uWC[0]+yr[0],T.uWC[1]+yr[1],T.uWC[2]+yr[2]],turn:[T.uWR[0],T.uWR[1]],mouth:i.mouth,outer:i.outer,bloom:E?a.bloom*So:0}}E&&So>.002&&i.floors.push({x:r.floor.x,y:r.floor.y,w:r.floor.w,shadow:r.floor.shadow*So,pool:r.floor.pool*So})}[[g,g===b?1:1-H],[b,g===b?0:H]].forEach(function(Ue){var ne=Ue[0].floor;ne&&Ue[1]>.002&&i.floors.push({x:ne[0],y:ne[1],w:ne[2],shadow:(ne[3]||0)*Ue[1],pool:(ne[4]||0)*Ue[1]})}),E?(i.ptsH={share:a.points,size:a.pointSize,amt:1-H},i.ptsS={share:b.look.points,size:b.look.pointSize,amt:H}):i.ptsS={share:K.points,size:K.pointSize,amt:1},i.rope=zn(C,o);var br=g.i===7?g:b.i===7?b:null;return br&&(i.lit=br.lit,i.treads=br.treads),i}var Lr=[0,1],Or={};function zn(t,o){var e=u.rope,r=[],a,i,c,d,f=_;for(a=2;a<me.length;a++)if(me[a]){try{c=me[a](Jt)}catch(V){Or[a]||(Or[a]=1,N("the way of section "+a+" threw: "+V.message)),c=null}if(c)for(i=0;i<c.length;i++)c[i]&&c[i][0]===c[i][0]&&c[i][1]===c[i][1]&&r.push(c[i])}for(d=r.length,d||(r=[[ft*.5,0,0],[ft*.5,f,0]],d=2),a=1;a<d;a++)r[a][1]<r[a-1][1]+1&&(r[a]=[r[a][0],r[a-1][1]+1,r[a][2]||0]);var y=Math.max(r[0][1],-e.pad*f),A=Math.min(r[d-1][1],(1+e.pad)*f),P=e.grid[0]*f,R=e.grid[1]*f;if(at&&Ut>0?(A=Math.min(r[d-1][1],(1+e.pad)*f+Ut),R+=Ut):at&&Ut<0&&(y=Math.max(r[0][1],-e.pad*f+Ut),P+=Ut),t.foot&&t.foot[1]>0&&(A=s(A,Math.min(A,Math.max(t.foot[0],y+.3*f)),x(t.foot[1]))),A-y<e.least*f){var z=e.least*f-(A-y);r[d-1][1]>A+1?A+=z:y-=z}function O(V){if(V<=r[0][1])return[r[0][0],r[0][2]||0];if(V>=r[d-1][1])return[r[d-1][0],r[d-1][2]||0];for(var j=1;r[j][1]<V;)j++;var C=x((V-r[j-1][1])/(r[j][1]-r[j-1][1]));return[s(r[j-1][0],r[j][0],C),s(r[j-1][2]||0,r[j][2]||0,C)]}var E=e.pass,g=e.soft,b=e.len,$=t.join===void 0?E.join:t.join;function U(V){var j=0,C=!1,Pt=t.pass;if(Pt>0&&t.direct){var zt=x((Pt-V*t.stagger)/(1-t.stagger)),xo=x((1-t.open[0]-V*(1-g))/g),Uo=x((1-t.open[1]-V*(1-g))/g);return s(xo+(1-xo)*(1-Math.min(1,t.share[0])),Uo+(1-Uo)*(1-Math.min(1,t.share[1])),zt)}if(Pt>0){var Vo=V*E.stagger,So=$+Vo;C=Pt>So,j=C?1-x((Pt-So)/(1-$-E.stagger)):x((Pt-Vo)/$)}var Me=C?t.share[1]:t.cut?s(t.share[0],t.share[1],x(t.cut)):t.share[0],qe=C?t.open[1]:t.open[0];return j=Math.max(j,x((1-qe-V*(1-g))/g)),j+(1-j)*(1-Math.min(1,Me))}var B=new Float32Array(32);for(i=0;i<8;i++){var H=P+(R-P)*i/7,T=O(H),tt=h((H-y)/(A-y)),G=0;for(a=0;a<5;a++)G+=U(h((tt-b*a/4)/(1-b)));G/=5,B[i*4]=(T[0]-ft/2)/Z,B[i*4+1]=T[1],B[i*4+2]=Math.max(e.plyLeast,e.ply*Math.sqrt(G))}var ot=2*Math.PI/e.period,K=(kt+f/2)*ot;return{flat:B,a:[(f/2-P)/Z,(f/2-R)/Z,e.swing,e.depth],y:[(f/2-y)/Z,(f/2-A)/Z,b,1],k:[K-2*Math.PI*Math.floor(K/(2*Math.PI)),-ot*Z,e.twist,e.sway],s:[t.share[0]>=.9995?2:t.share[0],t.share[1]>=.9995?2:t.share[1],t.open[0],t.open[1]],m:[t.pass,t.pass>0&&t.stagger!==void 0?t.stagger:E.stagger,t.pass>0&&t.direct?1:0,$],tt:[t.cut||0,e.aside,e.slide,t.cut?t.share[1]:0],c:t.knot,soft:g,top:y,foot:A}}function Fr(t,o,e){var r=u.page,a=u.alive;return l((t+r.viewSway[0]*Math.sin(e*a.viewRate[0]))*F*r.scale,(o+r.viewSway[1]*Math.sin(e*a.viewRate[1]+1.3))*F*r.scale,0,Kt)}function Cr(t){var o=u.clear,e=[],r,a,i,c,d;for(i=0;i<Ee.length;i++)if(r=Ee[i],!(t.stations.indexOf(r.st)<0&&!(r.st===0&&t.q<=1))&&!(r.fig&&!/(^|\s)gd-in(\s|$)/.test(r.fig.className))&&(c=r.st===0?1-x((t.q-o.heroFrom)/(o.heroUntil-o.heroFrom)):1,!(c<=.002))){a=or(r.rec,kt);var f=at?-Qt:0,y=at?wt-Qt:_;if(!(a.t+a.h+o.pad<f||a.t-o.pad>y)){d=(Math.min(y,a.t+a.h)-Math.max(f,a.t))*a.w;var A=r.st===0?o.heroPad:o.pad;e.push({l:a.l-A,t:a.t-A,r:a.l+a.w+A,b:a.t+a.h+A,on:c,area:d})}}return e.sort(function(P,R){return R.area-P.area}),e.slice(0,2)}function sr(t,o){var e=m.createShader(m.VERTEX_SHADER),r=m.createShader(m.FRAGMENT_SHADER),a=m.createProgram();return m.shaderSource(e,t),m.compileShader(e),m.shaderSource(r,o),m.compileShader(r),m.attachShader(a,e),m.attachShader(a,r),m.linkProgram(a),{p:a,v:e,f:r}}function Tn(t){return!Bt||!!m.getProgramParameter(t.p,Bt.COMPLETION_STATUS_KHR)}function lr(t){var o=t.p;if(!m.getProgramParameter(o,m.LINK_STATUS))throw new Error(m.getShaderInfoLog(t.v)||m.getShaderInfoLog(t.f)||m.getProgramInfoLog(o)||"program did not link");for(var e={},r=m.getProgramParameter(o,m.ACTIVE_UNIFORMS),a=0;a<r;a++){var i=m.getActiveUniform(o,a);e[i.name]=m.getUniformLocation(o,i.name)}return{p:o,u:e}}function Fo(t){var o=m.createBuffer();return m.bindBuffer(m.ARRAY_BUFFER,o),m.bufferData(m.ARRAY_BUFFER,t,m.STATIC_DRAW),o}function mo(t,o,e){m.enableVertexAttribArray(t),m.vertexAttribPointer(t,o,m.FLOAT,!1,0,0),e&&m.vertexAttribDivisor(t,e)}function He(t){var o=vt[t*4+2]*7.31+vt[t*4+3]*3.77;return o-Math.floor(o)}function to(t,o){var e=t.u[o];return e===void 0&&(e=t.u[o]=m.getUniformLocation(t.p,o)),e}function Co(t,o){t=t||q[0];var e=mn(t),r=t.k?String(t.hi):"",a=lo+e+Io+jo,i=eo+e+Io+(t.form==="rope"?To:uo),c=[{name:"strand"+r,vs:xt.shader?a.replace("void main","void broken("):a,fs:go,attribs:[[0,2,0],[1,4,1]],blend:!1},{name:"point"+r,vs:i,fs:Ro,attribs:[[0,2,0],[1,4,1],[2,4,1]],blend:!0}];return!o&&(t===fo||arguments.length===0)&&c.push({name:"glow",vs:Eo,fs:ie,attribs:[[0,2,0]],blend:!0}),c}function qr(t,o,e){var r=t.createVertexArray(),a=[],i=e.blend,c,d,f;for(t.useProgram(o),t.bindVertexArray(r),c=0;c<e.attribs.length;c++)d=e.attribs[c],f=t.createBuffer(),a.push(f),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(16),t.STATIC_DRAW),t.enableVertexAttribArray(d[0]),t.vertexAttribPointer(d[0],d[1],t.FLOAT,!1,0,0),d[2]&&t.vertexAttribDivisor(d[0],d[2]);for(i?(t.enable(t.BLEND),i.length?t.blendFunc(i[0],i[1]):t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)):t.disable(t.BLEND),t.viewport(0,0,1,1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,1),t.bindVertexArray(null),t.deleteVertexArray(r),c=0;c<a.length;c++)t.deleteBuffer(a[c])}function Rn(t,o){var e=null;t.onmessage=function(r){var a=r.data,i=performance.now(),c={kind:"done",ok:!1,why:"",programs:[]},d,f,y,A,P;try{if(!e&&(e=new OffscreenCanvas(8,8).getContext("webgl2",a.attrs),y=e&&e.getExtension("WEBGL_debug_renderer_info"),y=e?String(y?e.getParameter(y.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER)):"",e&&a.soft&&new RegExp(a.soft,"i").test(y)&&(e=null),t.postMessage({kind:"ctx",ok:!!e,renderer:y}),!e))return;for(d=0;d<a.items.length;d++)f=a.items[d],f.v=e.createShader(e.VERTEX_SHADER),f.f=e.createShader(e.FRAGMENT_SHADER),f.p=e.createProgram(),e.shaderSource(f.v,f.vs),e.compileShader(f.v),e.shaderSource(f.f,f.fs),e.compileShader(f.f),e.attachShader(f.p,f.v),e.attachShader(f.p,f.f),e.linkProgram(f.p);for(d=0;d<a.items.length;d++){if(f=a.items[d],A=performance.now(),!e.getProgramParameter(f.p,e.LINK_STATUS))throw new Error(f.name+": "+(e.getShaderInfoLog(f.v)||e.getShaderInfoLog(f.f)||e.getProgramInfoLog(f.p)||"did not link"));P=performance.now(),o(e,f.p,f),e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array(4)),c.programs.push([f.name,Math.round(P-A),Math.round(performance.now()-P)])}c.ok=!0}catch(R){c.why=String(R&&R.message||R)}c.ms=Math.round(performance.now()-i),t.postMessage(c)}}function Ur(t,o,e){return{items:t,done:o,tag:e||null,hold:!1,drop:null,info:{how:"direct",ms:0,waited:0,worker:[],why:""}}}function ur(t,o,e){!e&&(I==="live"||I==="lost")&&Ve.push({items:t,done:o}),Yt.push(Ur(t,o,e)),Be()}function En(){if(I!=="live"||!io)return!0;var t=performance.now();return mt>2&&pe&&!M.busy&&t-Ho>u.warm.quietMs&&t-Zo>u.fadeInMs&&t-Do>u.groupFadeMs}function Wn(){try{return typeof qt.calm!="function"||!!qt.calm()}catch{return!0}}function Vr(t,o,e){var r=null,a="",i=0,c=!1;function d(){clearTimeout(i),r&&(r.onmessage=r.onerror=null,r.terminate(),r=null),a&&(URL.revokeObjectURL(a),a="")}function f(){c||(c=!0,d(),e())}try{if(xt.noworker||!window.Worker||!window.OffscreenCanvas||!window.Blob||!window.URL)throw new Error("no worker");a=URL.createObjectURL(new Blob(["("+Rn.toString()+")(self,"+qr.toString()+")"],{type:"text/javascript"})),r=new Worker(a),r.onmessage=function(y){var A=y.data||{};if(A.kind==="ctx"){A.ok||f();return}A.ok?(o.how="worker",o.worker=A.programs):o.why=String(A.why||""),f()},r.onerror=f,i=setTimeout(f,u.warm.giveUpMs),r.postMessage({attrs:kr,soft:J.source,items:t.map(function(y){return{name:y.name,vs:y.vs,fs:y.fs,attribs:y.attribs,blend:y.blend}})})}catch{setTimeout(f,0)}return function(){c=!0,d()}}function _r(t){return t.map(function(o){return o.name+`
`+o.vs+`
`+o.fs}).join(`

`)}function Be(){if(clearTimeout(le),le=0,At||!Yt.length)return;if(!m||I!=="building"&&I!=="live"){Yt=[];return}if(I==="live"&&!Wn()||!En()&&!(Yt[0].tag&&wo&&!No&&mt>2)){le=setTimeout(Be,120);return}var t=At=Yt.shift();t.t0=performance.now();function o(){t.hold=!1,t.drop=null,At===t&&(k("warm"),Pn(t))}if(ct&&ct.over&&ct.key===_r(t.items)){t.info.how=ct.info.how,t.info.worker=ct.info.worker,t.info.why=ct.info.why,t.info.early=ct.ms,ct=null,o();return}t.hold=!0,t.drop=Vr(t.items,t.info,o)}function Pn(t){var o,e={},r=0,a=!1,i=0;try{o=t.items.map(function(c){return sr(c.vs,c.fs)})}catch(c){fr(t,null,c.message);return}(function c(){if(Wo=0,!(At!==t||!m)){var d;if(!a){if(Bt){for(d=0;d<o.length;d++)if(!Tn(o[d])){t.info.waited++,Wo=requestAnimationFrame(c);return}}else if(r<o.length&&(m.getProgramParameter(o[r++].p,m.LINK_STATUS),r<o.length)){Wo=requestAnimationFrame(c);return}try{for(d=0;d<o.length;d++)e[t.items[d].name]=lr(o[d])}catch(f){fr(t,null,f.message);return}a=!0}if(t.info.how!=="worker"&&i<t.items.length){qr(m,e[t.items[i].name].p,t.items[i]),i++,I==="live"&&it&&!Gt&&mt>2&&(qo(),_t(it)),Wo=requestAnimationFrame(c);return}fr(t,e,"")}})()}function fr(t,o,e){if(At===t){At=null,t.info.ms=Math.round(performance.now()-t.t0),e&&(t.info.why=e);try{typeof t.done=="function"&&t.done(o,t.info)}catch(r){N("warm: "+r.message)}Be()}}function Kr(){clearTimeout(le),le=0,Wo&&(cancelAnimationFrame(Wo),Wo=0),At&&At.drop&&At.drop(),At=null,Yt=[]}function Nn(){var t=Ao(Y===null?0:Y),o={};q.forEach(function(e){e.strand=e.point=null,e.state!=="failed"&&(e.state="none")}),fo=t,Po="",Co(t).forEach(function(e){o[e.name]=lr(sr(e.vs,e.fs))}),Ir(o,t)}function Ir(t,o){dt={glow:t.glow},nr(o,t);var e=new Float32Array((Rt+1)*4),r;for(r=0;r<=Rt;r++)e[r*4]=r,e[r*4+1]=-1,e[r*4+2]=r,e[r*4+3]=1;for(var a=n(77),i=new Float32Array(jt*4),c=new Float32Array(jt*4),d=0,f=u.track.count[0][1]/Math.min(u.tiers[0].strands,u.maxStrands)-.04,y={},A=u.tiers.length-1;A>=0;A--){var P=[],R=[],z=Math.min(u.tiers[A].strands,u.maxStrands),O=Math.min(u.tiers[A].points,jt);for(r=0;r<z;r++)He(r)<f&&(P.push(r),y[r]||R.push(r));for(P.length||P.push(0),r=d;r<O;r++){var E=a(),g=E<.64&&R.length>0,b=g?R.shift():P[Math.floor(a()*P.length)];g&&(y[b]=!0),i.set(vt.subarray(b*4,b*4+4),r*4),c[r*4]=g?1:.2+.72*a(),c[r*4+1]=g?16+10*a():E>.86?8+6*a():5+4*a(),c[r*4+2]=a(),c[r*4+3]=g?0:E>.86?1:2}d=Math.max(d,O)}var $=u.pagePoints[0],U=new Float32Array($*4),B=new Float32Array($*4);for(a=n(77),r=0;r<$;r++){var H=Math.floor(a()*500),T=a()<.35;U.set(vt.subarray(H*4,H*4+4),r*4),B[r*4]=.15+.75*a(),B[r*4+1]=T?14+8*a():5+5*a(),B[r*4+2]=a(),B[r*4+3]=T?0:1}Qe=u.tiers.map(function(ot){var K=Math.min(ot.strands,u.maxStrands),V=[],j,C=new Float32Array(K*4),Pt=new Float32Array(K);for(j=0;j<K;j++)V.push(j);for(u.sortStrands&&V.sort(function(zt,xo){return He(zt)-He(xo)||zt-xo}),j=0;j<K;j++)C.set(vt.subarray(V[j]*4,V[j]*4+4),j*4),Pt[j]=He(V[j]);return{n:K,data:C,picks:Pt}}),Q={strand:[],point:m.createVertexArray(),pointS:m.createVertexArray(),quad:m.createVertexArray()};var tt=Fo(e);Qe.forEach(function(ot){var K=m.createVertexArray();m.bindVertexArray(K),m.bindBuffer(m.ARRAY_BUFFER,tt),mo(0,2,0),Fo(ot.data),mo(1,4,1),Q.strand.push(K)}),m.bindVertexArray(Q.point);var G=Fo(new Float32Array([-1,-1,1,-1,-1,1,1,1]));mo(0,2,0),Fo(i),mo(1,4,1),Fo(c),mo(2,4,1),m.bindVertexArray(Q.pointS),m.bindBuffer(m.ARRAY_BUFFER,G),mo(0,2,0),Fo(U),mo(1,4,1),Fo(B),mo(2,4,1),m.bindVertexArray(Q.quad),m.bindBuffer(m.ARRAY_BUFFER,G),mo(0,2,0),m.bindVertexArray(null)}function Hn(t){var o=Qe[Mt];if(t>=.999||!u.sortStrands)return o.n;for(var e=t+.031,r=0,a=o.n,i;r<a;)i=r+a>>1,o.picks[i]<=e?r=i+1:a=i;return r}function qo(){var t=u.tiers[Mt];St=at?Math.min(window.devicePixelRatio||1,t.dprCap,u.carry.dpr,Math.sqrt(t.pixelCap*u.carry.pixels/Math.max(1,ft*wt))):Math.min(window.devicePixelRatio||1,t.dprCap,Math.sqrt(t.pixelCap/Math.max(1,ft*_)));var o=Math.max(1,Math.round(ft*St)),e=Math.max(1,Math.round((at?wt:_)*St));(o!==ht||e!==gt)&&(ht=W.width=o,gt=W.height=e)}function jr(t,o){var e=t.u,r=u.pointer,a=M.finger?r.fingerRadius:r.radius,i=o.u||{},c;m.useProgram(t.p),m.uniform1f(e.uTime,o.time),m.uniform1f(e.uShare,o.share>=.999?2:o.share),m.uniform1f(e.uRidge,o.ridge),m.uniform4fv(e.uHg,o.hg),m.uniform4fv(e.uHg2,o.hg2),m.uniform4fv(e.uHg3,o.hg3),m.uniform4fv(e.uHg4,o.hg4),m.uniform3fv(e.uHg5,o.hg5),m.uniform4fv(e.uOp,o.op),m.uniform4fv(e.uOp2,o.op2),m.uniform4fv(e.uOp3,o.op3),m.uniform4fv(e.uVx,o.vx),m.uniform4fv(e.uVx2,o.vx2),m.uniform4fv(e.uVx3,o.vx3),m.uniform4fv(e.uVx4,o.vx4),m.uniform4fv(e.uVxC,o.vxc),m.uniform1i(e.uShA,o.shA),m.uniform1i(e.uShB,o.shB);var d=o.rope;d&&(m.uniform4fv(to(t,"uRp[0]"),d.flat),m.uniform4fv(to(t,"uRpA"),d.a),m.uniform4fv(to(t,"uRpY"),d.y),m.uniform4fv(to(t,"uRpK"),d.k),m.uniform4fv(to(t,"uRpS"),d.s),m.uniform4fv(to(t,"uRpM"),d.m),m.uniform4fv(to(t,"uRpT"),d.tt),m.uniform4fv(to(t,"uRpC"),d.c),m.uniform1f(to(t,"uRpSoft"),d.soft));for(c in i)m.uniform4fv(to(t,c),i[c]);m.uniformMatrix4fv(e.uView,!1,o.view),m.uniformMatrix4fv(e.uProj,!1,X),m.uniform4f(e.uStage,2*Z/ft,o.stageY,0,o.shiftNdc),m.uniform1f(e.uCamD,Kt),m.uniform4f(e.uPtr,M.ax,M.ay,o.ptrA,a),m.uniform4f(e.uPtr2,M.bx,M.by,o.ptrB,a*1.15),m.uniform3f(e.uPtrAmt,r.aside,r.gather,0),m.uniform2f(e.uPulse,o.pulse[0],o.pulse[1]),m.uniform1f(e.uPulseW,r.pulseWidth),m.uniform4fv(to(t,"uKc[0]"),o.kcRect),m.uniform4f(e.uKcAmt,Math.max(1,(o.q<=1?u.clear.heroSoft:u.clear.soft)*St),u.clear.dark,o.kcOn[0],o.kcOn[1])}function Le(t,o,e,r,a){var i=dt.glow.u;m.uniform1f(i.uKind,t),m.uniform1f(i.uAmt,o),m.uniform2f(i.uSize,e,r),m.uniform3f(i.uPos,a[0],a[1],a[2]),m.drawArrays(m.TRIANGLE_STRIP,0,4)}function _t(t){var o=m,e=u.tiers[Mt],r=u.light,a=u.shade,i=u.blueAmt,c=u.blue,d=u.floor,f;if(o.viewport(0,0,ht,gt),o.disable(o.SCISSOR_TEST),o.disable(o.BLEND),o.depthMask(!0),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),!!t){var y=t.G;if(!(!y||y.state!=="ready")){if(!xn(y,t)){_e[y.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]||(_e[y.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]=1,N("group "+y.k+" (stations "+y.lo+" to "+y.hi+") cannot draw shapes "+t.shA+" and "+t.shB+" with passage kind "+t.kind+": see CONF.groups"));return}Ge=!1;var A=Math.sin(t.time*u.pulse.rate),P=t.time,R=t.fade===void 0?1:t.fade;if(t.shiftNdc=-2*te/_,t.stageY=2*Z/_,at&&(t.stageY=2*Z/wt,t.shiftNdc=(wt-_-2*Qt-2*te)/wt),ut==="hero"){var z=Math.max(0,Math.min(gt,Math.round((st.stageH+te)*St)));o.enable(o.SCISSOR_TEST),o.scissor(0,gt-z,ht,z)}if(t.ptrA=t.quiet?0:M.a,t.ptrB=t.quiet?0:M.b,t.pulse=[-9,-9],!t.quiet)for(f=0;f<$t.length&&f<2;f++)t.pulse[f]=-.15+1.35*(P-$t[f])/u.pointer.pulse;var O=Cr(t),E=new Float32Array(8);for(t.kcOn=[0,0],f=0;f<2;f++)if(O[f]){var g=at?wt-Qt:_;E.set([O[f].l*St,(g-O[f].b)*St,O[f].r*St,(g-O[f].t)*St],f*4),t.kcOn[f]=O[f].on}else E.set(sn,f*4);for(t.kcRect=E,t.kc=O,o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.disable(o.DEPTH_TEST),o.useProgram(dt.glow.p),o.uniformMatrix4fv(dt.glow.u.uView,!1,t.view),o.uniformMatrix4fv(dt.glow.u.uProj,!1,X),o.uniform4f(dt.glow.u.uStage,2*Z/ft,t.stageY,0,t.shiftNdc),o.uniform3f(dt.glow.u.uBlue,c[0],c[1],c[2]),o.uniform2f(dt.glow.u.uTurn,0,0),o.bindVertexArray(Q.quad),f=0;f<t.floors.length;f++){var b=t.floors[f];d.shadow*b.shadow>.002&&Le(3,d.shadow*b.shadow*R,b.w*1.5,.15,[b.x+.03,b.y-.02,-Kt]),d.pool*b.pool>.002&&Le(4,d.pool*b.pool*(.92+.08*A)*R,b.w*1.15,.17,[b.x+b.w*.2,b.y-.05,-Kt])}o.disable(o.BLEND),o.depthMask(!0),o.enable(o.DEPTH_TEST),o.depthFunc(o.LESS),jr(y.strand,t);var $=Hn(t.share),U=Math.min(e.segments,Rt),B=y.strand.u;if(o.uniform1f(B.uSeg,U),o.uniform1f(B.uWidth,u.width*Mn()),o.uniform1f(B.uWMul,t.thick),o.uniform1f(B.uMinPx,u.minPx),o.uniform1f(B.uPxUnit,Z*St),o.uniform1f(B.uCore,t.core),o.uniform1f(B.uBreath,A),o.uniform1f(B.uWave,u.pulse.wave),o.uniform1f(B.uMouth,t.mouth),o.uniform3f(B.uReach,t.reach,i.lean,i.glare),o.uniform1f(B.uWash,t.wash),o.uniform1f(B.uTips,t.tips),o.uniform1f(B.uTipWash,i.tipWash),o.uniform1f(B.uRim,t.rim),o.uniform2f(B.uVar,a.strandVar,a.darkShare),o.uniform1f(B.uExposure,u.exposure*t.gain),o.uniform1f(B.uSkinW,t.skinW),o.uniform1f(B.uGlint,r.glint),o.uniform1f(B.uKick,i.kick),o.uniform1f(B.uArmSide,r.armSide),o.uniform4f(B.uLight,r.key,r.strips,r.fill,r.room),o.uniform4fv(B.uArms,r.arms),o.uniform4fv(B.uShade,t.shade),o.uniform3f(B.uBlue,c[0],c[1],c[2]),o.uniform4f(B.uBlueAmt,i.tint,i.light,i.hot,i.sheen),o.uniform4f(B.uFade,R,t.edge>0?t.edge*Math.min(ht,gt):0,ht,gt),$>0&&(o.bindVertexArray(Q.strand[Mt]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,(U+1)*2,$)),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.depthFunc(o.LEQUAL),t.ring&&t.ring.core>.002){var H=t.ring;o.disable(o.DEPTH_TEST),o.useProgram(dt.glow.p),o.bindVertexArray(Q.quad),o.uniform1f(dt.glow.u.uRingR,1/3),o.uniform2f(dt.glow.u.uHaze,i.haze[0],i.haze[1]);var T=t.view,tt=H.outer*.9,G=Br([0,0,tt],H.turn[0],H.turn[1]),ot=[H.at[0]+G[0],H.at[1]+G[1],G[2]];H.bloom*i.bloom>.002&&Le(4,H.bloom*i.bloom*(.9+.1*A)*R,H.outer*1.05,H.outer*1.05,[T[0]*ot[0]+T[4]*ot[1]+T[8]*ot[2]+T[12],T[1]*ot[0]+T[5]*ot[1]+T[9]*ot[2]+T[13],T[2]*ot[0]+T[6]*ot[1]+T[10]*ot[2]+T[14]]),o.uniform2f(dt.glow.u.uTurn,H.turn[0],H.turn[1]),Le(0,H.core*(.94+.06*A)*i.ring*R,H.mouth*3,H.mouth*3,H.at),o.enable(o.DEPTH_TEST)}if(t.ptsH||t.ptsS){jr(y.point,t);var K=y.point.u,V=Math.max(.7,Math.min(1.15,Z/420)),j=[[t.ptsH,Q.point,Math.min(e.points,jt)],[t.ptsS,Q.pointS,Math.min(u.pagePoints[Mt],u.pagePoints[0])]];for(o.uniform2f(K.uRes,ht,gt),o.uniform1f(K.uTravel,u.alive.travel),o.uniform1f(K.uSparkle,t.quiet?0:u.alive.sparkle),o.uniform1f(K.uPtLift,.07),o.uniform1f(K.uRim,t.rim),o.uniform3f(K.uBlue,c[0],c[1],c[2]),f=0;f<2;f++){var C=j[f][0];!C||C.amt*C.share<=.002||(o.uniform1f(K.uPtShare,C.share),o.uniform1f(K.uPtScale,St*V*C.size),o.uniform1f(K.uPointAmt,i.points*C.amt*R),o.bindVertexArray(j[f][1]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,j[f][2]))}}o.bindVertexArray(null)}}}function cr(t,o,e){M.cx=t,M.cy=o,M.on=e,Ho=performance.now(),bt()}function Yr(){return Y!==null&&Y<1}function Bn(t){if(t.pointerType==="touch"){if(!M.down||Yr())return;M.finger=!0}else M.finger=!1;cr(t.clientX,t.clientY,1)}function Ln(t){if(!(t.pointerType==="mouse"&&t.button!==0)){if(M.down=!0,M.finger=t.pointerType==="touch",M.downAt=[t.clientX,t.clientY,performance.now()],M.finger&&Yr()){Ho=performance.now();return}cr(t.clientX,t.clientY,1)}}function On(t){var o=M.downAt;M.down&&o&&Math.abs(t.clientX-o[0])+Math.abs(t.clientY-o[1])<12&&performance.now()-o[2]<600&&hr(),M.down=!1,M.downAt=null,t.pointerType==="touch"&&(M.on=0)}function Fn(){M.down=!1,M.downAt=null,M.on=0}function Dr(){M.on=0}function Gr(){return!Xe&&!/(^|\s)menu-open(\s|$)/.test(nt.className)}function hr(){I!=="live"||!Gr()||so||($t.unshift(yo),$t.length>2&&($t.length=2),bt())}function Cn(t){var o=u.pointer,e=t/16.667,r=(M.cx-ft/2)/Z,a=(_/2+te-M.cy)/Z,i=M.cy>=0&&M.cy<=_,c=!i||!Gr()?0:M.on;c&&M.a<.004&&M.b<.004&&(M.ax=M.bx=r,M.ay=M.by=a);var d=1-Math.pow(1-o.follow[0],e),f=1-Math.pow(1-o.follow[1],e);c&&(M.ax+=(r-M.ax)*d,M.ay+=(a-M.ay)*d),M.bx+=(M.ax-M.bx)*f,M.by+=(M.ay-M.by)*f;var y=1-Math.pow(1-(c>M.a?o.rise:o.fall),e);M.a+=(c-M.a)*y,M.b+=(M.a-M.b)*(1-Math.pow(1-o.fall*1.6,e));var A=de?M.a*Math.tanh((M.ax-de[0])/1.1):0,P=de?M.a*Math.tanh((M.ay-de[1])/.8):0,R=1-Math.pow(1-.06,e);for(M.turnX+=(A-M.turnX)*R,M.turnY+=(P-M.turnY)*R,M.busy=Math.abs(c-M.a)>.003||M.b>.003&&Math.abs(M.a-M.b)>.003||c>0&&(Math.abs(r-M.ax)+Math.abs(a-M.ay)>.002||Math.abs(M.ax-M.bx)+Math.abs(M.ay-M.by)>.002)||Math.abs(A-M.turnX)+Math.abs(P-M.turnY)>.003;$t.length&&yo-$t[$t.length-1]>o.pulse*1.1;)$t.pop();return Jt.ptr.x=M.ax,Jt.ptr.y=M.ay,Jt.ptr.on=M.a,M.busy||$t.length>0}function qn(t,o){var e=!1,r,a,i=1-Math.exp(-t/(u.hoverS*1e3/3));for(r=0;r<3;r++)Math.abs(Jo[r]-xe[r])>.004?(xe[r]+=(Jo[r]-xe[r])*i,e=!0):xe[r]=Jo[r];for(r=0;r<3;r++){var c=0;o>5&&o<7&&Je[r]&&(c=parseFloat(Je[r].style.getPropertyValue("--b"))||0),c!==tr[r]&&(tr[r]=c,e=!0)}for(r in We)a=We[r],Math.abs(a.to-a.v)>.001?(a.v+=(a.to-a.v)*(1-Math.exp(-t/(a.s*1e3/3))),e=!0):a.v=a.to;return e}function Oe(t){if(t!==ge){for(var o=0;o<3;o++){var e=Tr[o];e&&(o<t?e.getAttribute("data-scene-lit")!=="1"&&e.setAttribute("data-scene-lit","1"):e.hasAttribute("data-scene-lit")&&e.removeAttribute("data-scene-lit"))}ge=t}}function Fe(t){if(de=t.bodyAt&&t.turn>0?t.bodyAt:null,ut==="page"){if(t.lit!==void 0){we=!0,Oe(Math.max(0,Math.min(3,Math.round(t.lit))));return}if(we===void 0&&po[7]){var o=be(7);we=!!(o&&o.lit!==void 0)}we&&(t.q>=8?Oe(3):t.q<=6&&Oe(0))}}function Xr(t){var o=Ao(Y),e;return o.state==="ready"?(wo&&(wo=!1,No&&Xt!==null&&Math.abs(o.k-Ao(Xt).k)<=1?Y=Xt:mt>2&&(Do=t),No=!1,o=Ao(Y)),{q:Y,G:o}):(yn(o),e=gn(Y),e&&!Un(e.q,kt)&&(e=null),wo=!0,No=!!e,e||{q:Y,G:null})}function Un(t,o){var e,r,a=.35*_,i;if(t<=1)e=st.top,r=st.top+st.h;else{if(e=Lt[t],e==null)return!0;for(r=ce+Dt,i=t+1;i<Lt.length;i++)if(Lt[i]!==null&&Lt[i]!==void 0){r=Lt[i];break}}return r+a>o&&e-a<o+_}function Vn(){var t=Nt.get("scene-carry");return ut==="page"&&(t==="1"||t!=="0"&&!!window.matchMedia&&window.matchMedia("(hover: none) and (pointer: coarse)").matches)}function _n(t){if(t<Ae)return!0;for(var o=0;o<no.length;o++)if(t>=no[o][0]&&t<=no[o][1])return!0;return!1}function Ce(t,o){var e=u.carry,r=Wt,a=yt;if(_n(t))return o!==null&&(co=0,he=t),Qt=0,Ut=0,Wt!=="f"&&(Wt="f",yt=null,W.style.position="fixed",W.style.top="0px"),r!==Wt;var i=wt-_,c=Math.max(0,Qo-wt);o!==null&&(co=he===null||!o?0:.5*co+.5*(t-he)/o,he=t);var d=Math.abs(co)>e.slow,f=d?co>0?t-e.back:t-i+e.back:t-i/2,y=Math.round(Math.min(c,Math.max(0,f))),A=d?e.step:Math.abs(co)<.02?i/4:i/2-e.near;(yt===null||yt>c||y!==yt&&Math.abs(f-yt)>A)&&(yt=y,Wt!=="a"&&(Wt="a",W.style.position="absolute"),(yt!==a||r!=="a")&&(W.style.top=yt+"px")),Qt=t-yt;var P=Math.max(-1,Math.min(1,co*e.lead/Math.max(1,i-e.back)))*(i-e.back);return o!==null&&(Ut+=(P-Ut)*(o?1-Math.pow(1-.2,o/16.667):1),Math.abs(Ut)<.5&&P===0&&(Ut=0)),r!==Wt||yt!==a}function Kn(t){return at&&Wt==="a"&&yt!==null&&(t<yt||t+_>yt+wt)}function bt(){I==="live"&&!io&&!document.hidden&&(io=requestAnimationFrame(dr))}function pr(){io&&cancelAnimationFrame(io),io=0,ao=0}function In(t){if(document.hidden)return"hidden";var o=nt.className;if(/(^|\s)wk-open(\s|$)/.test(o))return"project";if(/(^|\s)offer-open(\s|$)/.test(o))return"offer";if(u.sleepUnderMenu&&/(^|\s)menu-open(\s|$)/.test(o))return"menu";if(ut==="hero")return t>=st.top+st.h?"stage-out":"";if(ve){var e=u.proof,r=Er(ve,t)-t,a=r+ve.h,i=e.whole?0:e.melt;if((Math.min(a-i,_)-Math.max(r+i,0))/_>=e.cover)return"proof"}return""}function Qr(t){if(nt.classList.add("scene-on"),Zo=t,k("on"),!Yo&&(Yo=!0,typeof qt.onReady=="function"))try{qt.onReady()}catch{}}function dr(t){if(At&&At.hold&&I==="live"&&!xt.nohold){ao=0,io=requestAnimationFrame(dr);return}if(mt>2){Zr(t);return}var o=performance.now();Zr(t),Ct.frames.push(+(performance.now()-o).toFixed(1))}function Zr(t){if(io=0,!(I!=="live"||document.hidden)){var o=ao?Math.min(100,t-ao):16.667,e=ao?t-ao:0;ao=t,Ar++,ze=!1,ro&&Lo();var r=window.scrollY,a=r!==kt,i=Math.abs(r-kt)>u.jump.windows*_;kt=r,te=ut==="hero"?Math.min(0,st.top+st.h-r-st.stageH):0;var c=D?"":In(r);if(c){if(c==="proof"&&(so!=="proof"||Kn(r))&&mt>2&&!Gt){at&&Ce(r,0),qo(),Zt=Y=Ne(r);var d=Xr(t),f=Oo(d.q,yo,Se);f.G=d.G,f.fade=1,Xt=d.q,Fe(f),_t(f),mt++,ze=!0,it=f}c==="stage-out"&&so!=="stage-out"&&mt>2&&!Gt&&(qo(),_t(null)),c==="stage-out"&&mt<2&&!Gt&&(qo(),_t(null),mt=3,Qr(t-u.fadeInMs-1)),so=c,bo=!0,ao=0;return}so="",qo();var y=at?Ce(r,e):!1;Zt=D?D.q:Ne(r),Y===null||bo||D||i&&Math.abs(Zt-Y)>u.jump.stations||Zt<=1&&Y<=1?Y=Zt:(Y+=(Zt-Y)*(1-Math.pow(1-u.smooth,o/16.667)),Math.abs(Zt-Y)<2e-4&&(Y=Zt)),bo=!1;var A=D?null:Xr(t);pe=Y===Zt;var P,R=!pe||a,z=1;if(D?(P=Oo(D.q,D.t),P.quiet=!0,P.G=Nr(D.q)):(yo+=o/1e3,Y>=u.swirl.gate[1]&&(Se+=u.body.spin*o/1e3),Cn(o)&&(R=!0),qn(o,Y)&&(R=!0),P=Oo(A.q,yo,Se),P.G=A.G,Zo?(z=h((t-Zo)/u.fadeInMs),z<1&&(R=!0)):z=0,Do&&t-Do<u.groupFadeMs&&(z=Math.min(z,h((t-Do)/u.groupFadeMs)),R=!0)),P.fade=z,Xt=D?D.q:A.q,Fe(P),wo&&!D&&!P.G&&mt>2){!Ge&&!Gt&&(_t(null),Ge=!0),so="waiting",bo=!0,ao=0,it=P;return}var O=t-Ho>u.idleAfterMs,E=Ye!==null?Ye:Mt>0||O?u.idleEvery:1,g=Gt||!D&&!R&&!y&&mt>2&&(E===0||E>1&&Ar%E!==0);if(Gt&&!De&&(_t(null),De=!0),g||(_t(P),mt++,ze=!0,mt===1&&k("frame"),mt===2&&(Qr(t),ut==="page"&&setTimeout(ar,0))),it=P,!D&&!(at&&(a||!pe)&&!$o)&&Yn($o||e),I==="live"){if(D&&mt>2){ao=0;return}io=requestAnimationFrame(dr)}}}function jn(){if(I==="live"){var t=Lo();if(t){var o=at&&!so&&!Gt&&it&&mt>2?Ce(kt,null):!1;if((ze||o)&&it&&!Gt){var e=D?Oo(D.q,D.t):Oo(Xt===null?0:Xt,yo,Se);e.quiet=it.quiet,e.fade=it.fade,e.G=it.G,qo(),Fe(e),_t(e),it=e}bt()}}}function $r(){return{warm:0,list:[],cool:0,recent:[],calm:0,upped:!1}}function Yn(t){if(t&&(et.recent.push(t),et.recent.length>60&&et.recent.shift(),!(Sr&&!$o))){if(et.cool>0){et.cool--;return}if(et.warm<u.warmup){et.warm++;return}if(et.list.push(t),!(et.list.length<u.window)){var o=v(et.list);if(et.list=[],o>u.slowMs){if(et.cool=u.cooldown,et.calm=0,et.upped&&(Te.fails++,et.upped=!1),Mt<u.tiers.length-1){Mt++,ht=gt=0;return}re("too-slow");return}if(o>u.fastMs){et.calm=0;return}et.calm+=u.window,!(et.calm<u.calm*Math.pow(2,Te.fails))&&(et.calm=0,et.upped=!1,Mt>Ie&&Te.fails<u.retries&&(Mt--,ht=gt=0,et.upped=!0))}}}var mr="position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;display:block",Dn="html.scene-on .stage{background:transparent}html.scene-on .stage .poster,html.scene-on .stage .hero-video,html.scene-on .stage.video-ready .hero-video,html.scene-on .stage.rev-on .hero-video.rev{opacity:0}html.scene-on .stage .poster{visibility:hidden;transition:opacity 1.1s var(--ease),visibility 0s linear 1.1s}html.scene-on .stage .hero-video{visibility:hidden}html.scene-on .stage .scrim{display:none}html.scene-on body:not(.bg-on) .bg-wrap{transition-duration:.12s}";function Gn(){var t=parseInt(Nt.get("scene-tier"),10);if(xt.tier!==void 0)return xt.tier;if(t>=0&&t<u.tiers.length)return t;var o=window.matchMedia&&(window.matchMedia("(max-width: 820px)").matches||window.matchMedia("(pointer: coarse)").matches);return o?1:0}function Jr(t){return I!=="off"&&ke(),qt=t||{},ut=qt.mode==="hero"?"hero":"page",Go="",k("start"),Ct={begin:0,send:0,waited:0,take:0,frames:[]},Qn(),ct&&!ct.over?(I="building",ct.then=function(){I==="building"&&!m&&tn()},!0):tn()}function tn(){var t=performance.now(),o=window.scrollY;W=document.createElement("canvas"),W.className="sfs-scene",W.setAttribute("aria-hidden","true"),W.style.cssText=mr,at=Vn(),wt=0,Qt=0,yt=null,Wt="",co=0,he=null,Ut=0,no=[],at&&(W.style.cssText=mr.replace(/height:100(l?vh)/g,"height:calc(100$1 + "+u.carry.extra+"px)"),Wt="f");var e=document.querySelector(".env");if(e&&e.parentNode?e.parentNode.insertBefore(W,e.nextSibling):document.body.insertBefore(W,document.body.firstChild),m=xt.nogl?null:W.getContext("webgl2",kr),!m)return en(),re("no-webgl2");Et=m.getExtension("WEBGL_lose_context");var r=m.getExtension("WEBGL_debug_renderer_info");if(Ke=String(r?m.getParameter(r.UNMASKED_RENDERER_WEBGL):m.getParameter(m.RENDERER)),xt.software||J.test(Ke))return ke(),re("software-renderer");if(Bt=m.getExtension("KHR_parallel_shader_compile"),Ct.context=+(performance.now()-t).toFixed(1),Hr(ut==="hero"?null:window.__sceneShapes),W.addEventListener("webglcontextlost",rn),W.addEventListener("webglcontextrestored",nn),ut==="hero"&&!document.getElementById("sfs-scene-style")&&(Ht=document.createElement("style"),Ht.id="sfs-scene-style",Ht.textContent=Dn,document.head.appendChild(Ht)),Ie=Gn(),Mt=Ie,mt=0,Zo=0,ht=gt=0,Y=null,ro=!0,Xo="",ko={},Bo={},ge=-1,we=void 0,Ho=performance.now(),et=$r(),Te={fails:0},so="",bo=!1,Gt=!1,Yo=!1,Xt=null,wo=!1,No=!1,Do=0,fo=q[0],ut==="page"&&!ue&&o>2*window.innerHeight){try{Lo(),kt=o,ee(),fo=Ao(Ne(o))}catch{fo=q[0]}ro=!0,Xo=""}return I="building",on(),Ct.begin=+(performance.now()-t).toFixed(1),!0}function Xn(t){if(!(!(window.GestureEvent||xt.prepare)||I!=="off"||ct||xt.nogl||xt.software||xt.noworker)){ut=t&&t.mode==="hero"?"hero":"page",Hr(ut==="hero"?null:window.__sceneShapes),fo=q[0];var o=Co(),e=performance.now(),r={key:_r(o),over:!1,then:null,drop:null,ms:0,info:{how:"direct",worker:[],why:""}};ct=r,r.drop=Vr(o,r.info,function(){if(r.over=!0,r.ms=Math.round(performance.now()-e),k("prepared"),r.then){var a=r.then;r.then=null,a()}})}}function on(){if(I==="building"){var t=performance.now(),o=fo,e=Co(o);Ct.send=+(performance.now()-t).toFixed(1),ur(e,function(r,a){if(I==="building"){if(Ct.warm=a,Ct.waited=a.waited,!r){if(o!==q[0]&&!xt.shader){o.state="failed",N("the programs of stations "+o.lo+" to "+o.hi+" did not link: "+a.why),fo=q[0],on();return}N(a.why),ke(),re("shader-failed");return}var i=performance.now();Ir(r,o),Ct.take=+(performance.now()-i).toFixed(1),k("built"),I="live",bt()}},o)}}function en(){W&&W.parentNode&&W.parentNode.removeChild(W),W=null,m=null,dt=null,Q=null,Et=null,Bt=null,Wt="",yt=null,Qt=0}function ke(){pr(),clearTimeout(je),Kr(),Ve=[],ct&&ct.then&&(ct.then=null,ct.over||(ct.drop(),ct=null)),W&&(W.removeEventListener("webglcontextlost",rn),W.removeEventListener("webglcontextrestored",nn)),m&&Et&&!m.isContextLost()&&Et.loseContext(),en(),Ht&&Ht.parentNode&&Ht.parentNode.removeChild(Ht),Ht=null,/(^|\s)scene-on(\s|$)/.test(nt.className)&&nt.classList.remove("scene-on"),ge>0&&Oe(0),I="off",D=null,it=null,q.forEach(function(t){t.strand=t.point=null,t.state!=="failed"&&(t.state="none")}),fe=!1,Po="",wo=!1,No=!1}function re(t){if(I!=="off"&&ke(),Go=t,typeof qt.onFail=="function")try{qt.onFail(t)}catch{}return!1}function rn(t){t.preventDefault(),t.target===W&&(pr(),Kr(),I="lost",Go="context-lost",at&&Wt==="a"&&(yt=0,W.style.top="0px"),q.forEach(function(o){o.strand=o.point=null,o.state!=="failed"&&(o.state="none")}),fe=!1,je=setTimeout(function(){I==="lost"&&re("context-lost")},u.lostWaitMs))}function nn(t){if(t.target===W){clearTimeout(je),Et=m.getExtension("WEBGL_lose_context")||Et,Bt=m.getExtension("KHR_parallel_shader_compile");try{Nn()}catch{return re("shader-failed")}I="live",Go="",mt=0,Zo=0,ht=gt=0,bo=!0,bt(),Ve.forEach(function(o){Yt.push(Ur(o.items,o.done))}),Be(),ut==="page"&&setTimeout(ar,0)}}function vo(){ro=!0,bt()}function vr(){Ho=performance.now()}function xr(t){var o=t&&t.closest?t.closest("#services .cards .card"):null;return o?Rr.indexOf(o):-1}function Qn(){if(!Mr){Mr=!0;var t={passive:!0};$e=new WeakSet,Re=new WeakMap,window.ResizeObserver&&(Ze=new ResizeObserver(jn)),window.MutationObserver&&(zr=new MutationObserver(function(){bt()}),zr.observe(nt,{attributes:!0,attributeFilter:["class"]})),window.addEventListener("scroll",function(){Ho=performance.now(),bt()},t),window.addEventListener("resize",function(){Re=new WeakMap,vo()},t),window.addEventListener("load",vo,t),window.addEventListener("pageshow",vo,t),document.addEventListener("visibilitychange",function(){document.hidden?pr():(bo=!0,bt())}),document.fonts&&(document.fonts.ready&&document.fonts.ready.then(vo),document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",vo)),document.addEventListener("toggle",function(o){vo(),o.target&&o.target.closest&&o.target.closest("#faq")&&Y>9.5&&Y<10.5&&hr()},!0),document.addEventListener("click",function(o){o.target&&o.target.closest&&o.target.closest('[role="tab"]')&&vo()},t),document.addEventListener("load",function(o){o.target&&o.target.tagName==="IMG"&&/gd-img/.test(o.target.className)&&vo()},!0),window.addEventListener("pointermove",Bn,t),window.addEventListener("pointerdown",Ln,t),window.addEventListener("pointerup",On,t),window.addEventListener("pointercancel",Fn,t),document.addEventListener("pointerleave",Dr,t),window.addEventListener("blur",Dr),window.addEventListener("keydown",vr,t),window.addEventListener("wheel",vr,t),window.addEventListener("touchstart",vr,t),document.addEventListener("pointerover",function(o){for(var e=xr(o.target),r=0;r<3;r++)Jo[r]=r===e?1:0;e>=0&&bt()},t),document.addEventListener("focusin",function(o){var e=xr(o.target);e>=0&&(Jo[e]=1,bt()),Xe=!!(o.target&&o.target.closest&&o.target.closest("#start form"))},t),document.addEventListener("focusout",function(o){var e=xr(o.target);e>=0&&(Jo[e]=0,bt()),Xe=!1},t)}}function an(){var t=new Uint8Array(ht*gt*4);return m.readPixels(0,0,ht,gt,m.RGBA,m.UNSIGNED_BYTE,t),t}function Zn(){for(var t=an(),o=2166136261,e=0;e<gt;e+=3)for(var r=e*ht*4,a=r+ht*4;r<a;r+=12)o^=t[r],o=Math.imul(o,16777619),o^=t[r+1],o=Math.imul(o,16777619),o^=t[r+2],o=Math.imul(o,16777619),o^=t[r+3],o=Math.imul(o,16777619);return(o>>>0).toString(16)}function gr(t,o){ro&&Lo(),kt=window.scrollY,te=ut==="hero"?Math.min(0,st.top+st.h-kt-st.stageH):0,at&&Ce(kt,0),qo();var e=Oo(t,o);return e.quiet=!0,e.fade=1,e.G=Nr(t),Xt=t,Fe(e),_t(e),it=e,e}var rt={start:function(t){return Jr(t)},prepare:Xn,stop:function(){I!=="off"&&ke(),Go="stopped"},refresh:vo,busy:function(){return!!(At&&At.hold)||!!(ct&&!ct.over)},state:function(){var t=u.tiers[Mt]||{};return{mode:I,scene:ut,reason:Go,tier:Mt,q:Y===null?null:+Y.toFixed(4),target:+Zt.toFixed(4),station:Y===null?null:Math.round(Y),drawing:!!io&&!so&&!Gt,sleeping:so,frameMs:+v(et.recent).toFixed(2),settled:pe,pinned:!!D,warming:At?At.hold?"worker":"own":Yt.length?"waiting":"",renderer:Ke,ratio:+St.toFixed(3),size:[ht,gt],unit:+Z.toFixed(1),strands:t.strands,segments:t.segments,drawn:mt,startMs:Ct,parallel:!!Bt,time:+yo.toFixed(3),lit:ge,files:ho.map(function(o){return o.id}),shapes:Vt.map(function(o){return o.fn}),stations:po.map(function(o,e){return o?o.file.id:e<2?"engine":null}),pointer:[+M.ax.toFixed(3),+M.ay.toFixed(3),+M.a.toFixed(3),+M.b.toFixed(3)],turn:[+M.turnX.toFixed(3),+M.turnY.toFixed(3)],pulses:$t.length,groups:q.map(function(o){return{from:o.lo,to:o.hi,shapes:(o.hero?["heroCurve"]:[]).concat(o.ids.map(function(e){return Vt[e]?Vt[e].fn:String(e)})),form:o.form,state:o.state,ms:o.info?o.info.ms:null,how:o.info?o.info.how:null,waited:o.info?o.info.waited:null,worker:o.info?o.info.worker:null}}),carry:at?{top:Wt==="a"?yt:null,held:Wt==="f",off:Qt,canvasH:wt,windowH:_,docH:Qo,speed:+co.toFixed(3),lead:Math.round(Ut),heroHold:Math.round(Ae),holds:no}:null,live:Po?Po.split(",").map(Number):[],drawQ:Xt===null?null:+Xt.toFixed(4),standIn:wo,standSeen:No}}};pt&&(rt.conf=u,rt.log=function(){return L.slice()},rt.programs=function(){return Co()},rt.warm=function(t,o){ur(t,o)},rt.groupPrograms=function(){return ee(),q.map(function(t){return Co(t,!0)})},rt.groupsAsk=function(t){if(t&&t.length){ee(),t.forEach(function(o){q[o]&&q[o].state==="none"&&ir(q[o])});return}xt.nogroups=!1,ar()},rt.qAt=function(t){if(ro&&W&&Lo(),t===void 0)return Ne(window.scrollY);var o=st.h-Dt,e=o>1?h((t-st.top)/o):0;return ut==="hero"||e<1||t<=oe()?e:er(t)},rt.dump=function(t,o){if(I!=="live")return null;ro&&Lo(),kt=window.scrollY;var e=Oo(+t,o===void 0?yo:+o),r=Cr(e),a=e.rope?{flat:Array.prototype.slice.call(e.rope.flat),a:e.rope.a,y:e.rope.y,k:e.rope.k,s:e.rope.s,m:e.rope.m,tt:e.rope.tt,c:e.rope.c,soft:e.rope.soft,top:e.rope.top,foot:e.rope.foot}:null;return{q:e.q,scrollY:kt,shA:e.shA,shB:e.shB,kind:e.kind,mix:e.mix,rope:a,u:e.u,share:e.share,thick:e.thick,gain:e.gain,tips:e.tips,shade:e.shade,core:e.core,wash:e.wash,floors:e.floors,ring:e.ring,ptsH:e.ptsH,ptsS:e.ptsS,lit:e.lit,treads:e.treads,kc:r,layout:Xo.length+":"+Xo.slice(-60)}},rt.still=function(t,o){return I!=="live"?null:(D={q:+t,t:+o||0},gr(D.q,D.t),Y=Zt=D.q,bt(),Zn())},rt.release=function(){D=null,Y=null,bt()},rt.grid=function(t,o){if(I!=="live"||!it)return null;_t(it);for(var e=an(),r=[],a=ht/t,i=gt/o,c=0;c<o;c++)for(var d=0;d<t;d++){for(var f=[0,0,0,0],y=0,A=Math.floor(c*i);A<(c+1)*i;A+=2)for(var P=Math.floor(d*a);P<(d+1)*a;P+=2){var R=(A*ht+P)*4;f[0]+=e[R],f[1]+=e[R+1],f[2]+=e[R+2],f[3]+=e[R+3],y++}r.push(f[0]/y,f[1]/y,f[2]/y,f[3]/y)}return r},rt.pixels=function(t,o,e,r){if(I!=="live"||!it)return null;_t(it);var a=Math.max(0,Math.round(t*St)),i=Math.max(0,Math.round(((at?wt-Qt:_)-o-r)*St)),c=Math.max(1,Math.min(ht-a,Math.round(e*St))),d=Math.max(1,Math.min(gt-i,Math.round(r*St))),f=new Uint8Array(c*d*4);return m.readPixels(a,i,c,d,m.RGBA,m.UNSIGNED_BYTE,f),{w:c,h:d,data:Array.prototype.slice.call(f)}},rt.force=function(t){if(t==="lost"||t==="restore"){Et&&(t==="lost"?Et.loseContext():Et.restoreContext());return}if(t==="slow"){$o=55,et.warm=u.warmup,et.cool=0,D=null,bt();return}if(t==="steady"){$o=0;return}$o=0,xt={};var o=/^tier(\d)$/.exec(t||"");return o?xt.tier=+o[1]:t&&t!=="auto"&&(xt[t]=!0),Jr(qt)},rt.point=function(t,o,e){M.finger=!1,cr(t,o,e===!1?0:1)},rt.pulse=hr,rt.bench=function(t,o){if(I!=="live")return null;o=o||40;var e=new Uint8Array(4),r=gr(t,1);m.readPixels(0,0,1,1,m.RGBA,m.UNSIGNED_BYTE,e);for(var a=performance.now(),i=0;i<o;i++)r.time=1+i*.016,_t(r);return m.finish(),m.readPixels(0,0,1,1,m.RGBA,m.UNSIGNED_BYTE,e),(performance.now()-a)/o},rt.hold=function(t){Sr=t!==!1},rt.rate=function(t){Ye=t==null?null:+t,bt()},rt.hide=function(t){Gt=!!t,De=!1,bo=!0,bt()},rt.tread=function(t){var o=it&&it.treads;return o&&o[t-1]!==void 0?{y:o[t-1],scrollY:kt}:null},rt.keepClear=function(){return it&&it.kc?it.kc.map(function(t){return{l:t.l,t:t.t,r:t.r,b:t.b,on:t.on}}):[]},rt.anchor=function(t,o){return ro&&W&&Lo(),{scrollY:kt,box:Pe(t,o)||null}},rt.snapshot=function(t,o){return I!=="live"||!it?null:(_t(it),W.toDataURL(t||"image/png",o||.9))},rt.poster=function(t,o,e,r){if(I!=="live")return null;var a=typeof t=="number"?t:u.stills[t];if(a===void 0)return null;var i=D;D={q:a,t:e===void 0?u.calmTime:e},gr(D.q,D.t);var c=Math.min(1600,Math.round(o||1600),ht),d=Math.round(c*gt/ht),f=document.createElement("canvas");f.width=c,f.height=d;var y=f.getContext("2d");y.imageSmoothingQuality="high",y.drawImage(W,0,0,c,d);var A=f.toDataURL("image/webp",r||.8);return D=i,bt(),{name:String(t),q:a,url:A,w:c,h:d,bytes:Math.round((A.length-23)*.75)}}),window.__scene=rt,(function(){var t=Nt.get("scene-force");if(t&&pt){var o=/^tier(\d)$/.exec(t);o?xt.tier=+o[1]:xt[t]=!0}})()})();
