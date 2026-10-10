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
}`,u=Math.PI/180,Rt={loop:.75,fan:.4,arcs:.55};function Ft(n,h){return n.narrow()?6:Math.max(30,.5*h)}function me(n){var h=n.box("#portrait")||n.NONE,v=n.box("#studio")||n.NONE,d=n.narrow(),m=d?Math.min(.56*h.h,.66*n.cssW):Math.min(.6*h.h,Math.max(.5*h.h,(h.cx-14)/.845)),x=h.cy-10,T=(d?.97:.8)*m,S=[],y,L=h.cx;if(n.q<2){var N=n.sstep(n.clamp01(n.q-1)),H=.365*n.U;L=n.lerp(n.cssW/2,L,N),x=n.lerp(n.cssH/2-.03*n.U,x,N),T=n.lerp(H,T,N),m=n.lerp(H,m,N)}for(y=-.72;y<=.73;y+=.36)S.push([L+T*Math.sqrt(1-y*y),x+y*m,.02]);return S.push([L+.42*T,x+.93*m,.02]),S.push([n.cssW*(d?.24:.3),Math.max(x+1.25*m,v.b-20),0]),S}function Ee(n){var h=n.box("#services .sec-head")||n.NONE,v=n.box("#services .cards .card",!0),d=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,m=n.narrow(),x=n.cssH,T=v[0]||n.NONE,S=Ft(n,h.l);return[[n.cssW*(m?.24:.3),h.t-(m?.22:.3)*x,0],[S,T.t+60,-.05],[S,d.t-20,-.05],[d.l+.16*d.w,d.b+14,-.02]]}function Ve(n){var h=n.box("#film .sec-head")||n.NONE,v=n.box("#film .films .player",!0);v.length||(v=n.box("#film .player",!0));var d=v[0]||n.NONE,m=v.length?v[v.length-1].b:d.b;return[[n.cssW/2,h.t-90,-.03],[n.cssW/2,m+40,-.03]]}function _e(n){var h=n.box("#wkStage")||n.NONE;return[[n.cssW/2,h.t-40,-.03],[n.cssW/2,h.b+.1*n.cssH,0]]}function Ke(n){var h=n.box(".oc-shot")||n.NONE;return[[n.cssW/2,h.t-60,-.03],[n.cssW/2,h.b-.1*n.cssH,0]]}function ve(n){var h=n.box("#portrait")||n.NONE,v=n.narrow(),d=v?Math.min(.56*h.h,.66*n.cssW):Math.min(.6*h.h,Math.max(.5*h.h,(h.cx-14)/.845)),m=n.ul(d);return{shape:0,u:{uW0:[5.6,m,.085*m,1],uW1:[.3*m,.5,1.55,89],uW2:[.55,1.25,.22,47],uW3:[0,.365,.072,.0876],uWC:[n.ux(h.cx),n.uy(h.cy-10),0,0],uWR:[v?0:-33*u,-.06,4.2+n.time*.05,-1.5],uWB:[0,.73,0,.65]},look:n.look({thick:1.15,gain:.95,share:Rt.loop,points:.45,pointSize:.8,tips:0}),open:n.open(h.cy-10-.95*d,h.cy-10+.95*d)}}function Pe(n){for(var h=n.box("#services .sec-head")||n.NONE,v=n.box("#services .cards .card",!0),d=n.box("#services .cards-ai .card--wide")||n.box("#services .card--wide")||n.NONE,m=n.narrow(),x=n.cssW,T=n.cssH,S,y,L=n.hover||[0,0,0];v.length<3;)v.push(v[v.length-1]||n.NONE);var N={shape:1,u:{uFO:m?[n.ux(x*.24),n.uy(h.t-.22*T),n.ul(.07*x),.25]:[n.ux(x*.3),n.uy(h.t-.3*T),n.ul(72),.3],uFC:[n.ux(d.l+.16*d.w),n.uy(d.b+10),n.ul(.34*Math.min(d.h,260)),.15],uFH:[L[0],L[1],L[2],n.ul(m?90:150)]},knot:[.15,n.open(d.b-70,d.b+50,d.b-110,d.b+30)],look:n.look({thick:1.25,gain:.95,share:Rt.fan,points:.6,pointSize:.85,tips:0}),open:n.open(h.t,v[m?2:0].t+160,h.t-(m?.22:.3)*T,v[0].t+70)};for(S=0;S<3;S++)y=v[S],N.u["uFT"+S]=m?[n.ux(y.l+.12*y.w),n.uy(y.t),n.ul(.1*y.w),n.ul(60)]:[n.ux(y.cx),n.uy(y.t),n.ul(.26*y.w),n.ul(70)];return N}function Ie(n){var h=n.box("#film .films .player",!0),v=n.narrow(),d,m;for(h.length||(h=n.box("#film .player",!0));h.length<2;)h.push(h[h.length-1]||n.NONE);var x={shape:2,u:{uAP:[-20*u,200*u,n.ul(.03*h[0].w),.15]},look:n.look({thick:1.05,gain:.95,share:Rt.arcs,points:.35,pointSize:.85})},T=h[0].t+.12*h[0].h,S=.75*h[0].w;if(x.open=v?n.open(h[0].t-60,h[0].t+.5*h[0].h,h[0].t-160,h[0].t+40):n.open(T-S,T+.15*S,T-S,h[0].t+.45*h[0].h),v){var y=n.box("#film .sec-head")||n.NONE,L=.62*n.cssW;x.u.uAC0=x.u.uAC1=[n.ux(n.cssW/2),n.uy(y.t-100+L),n.ul(L),0],x.u.uAP=[0,Math.PI,n.ul(.03*h[0].w*1.6),.15]}else for(d=0;d<2;d++)m=h[d],x.u["uAC"+d]=[n.ux(m.cx+(d?-1:1)*.12*m.w),n.uy(m.t+.12*m.h),n.ul(.75*m.w),(d?-1:1)*60*u];return x}var Et={thick:1,gain:.66,share:1,points:.22,pointSize:.8,deep:.15,skin:.76,skinW:.2,back:.6},je=[.95,.44,.1,.18];function xe(n,h,v,d,m,x,T,S){var y=n.narrow(),L=y?20:32,N=31*u,H=n.ul(d),it=Math.sin(N)*H+Math.cos(N)*m,ft=2*it/L;return{uWv:[n.ux(h),n.uy(v),H,m],uWv2:[L,L,.15*ft,x],uWv3:[.6,.5,0,.004],uWv4:[N,-N,5,Et.thick],uWv5:[.42,.4,Math.min(1,.5*n.cssW/d+.03),.08],uWvK:je,uWvL:T?[T[0],T[1],T[2],S]:[0,0,0,.3],uStE:[-9,-9,-9,.03],uSt0:[0,0,0,0],uSt1:[0,0,0,0],uSt2:[99,0,0,0]}}function Jt(n,h,v,d){var m=v*n.U*Math.sin(d),x=Math.min(.16*n.cssH,2*m+.035*n.cssH);return Math.min(h,n.cssH-x+m)}function ge(n,h,v){return n.open(h-.8*v,h+1.4*v,h-v,h-.25*v)}function Ye(n){var h=n.box("#wkStage")||n.NONE,v=n.narrow(),d=v?.45:.8,m=Jt(n,h.b+(v?90:.16*n.cssH),d,20.6*u),x=d*n.U*.4+30;return{shape:3,u:xe(n,n.cssW/2,m,.6*n.cssW,d,20.6*u),look:n.look(Et),open:ge(n,m,x),foot:m-.55*x}}function De(n){var h=n.box(".oc-shot")||n.NONE,v=n.detail||[0,0,0],d=.72*n.cssW,m=n.narrow()?.5:.9,x=Jt(n,h.b-.02*n.cssH,m,23*u),T=m*n.U*.44+30;return{shape:3,u:xe(n,n.cssW/2,x,d,m,23*u,v,Math.max(.05,.5*h.w/d-.06)),look:n.look(Et),open:ge(n,x,T),foot:x-.55*T}}function l(n){var h=n.box("#process .step-tag",!0),v=n.box("#process .step-body",!0),d=n.narrow(),m=null,x,T=window.__sceneShapes||[];for(x=0;x<T.length;x++)T[x]&&T[x].id==="b"&&T[x].conf&&(m=T[x].conf.stair);if(m=m||{tip:.3,depth:.2,depthNarrow:.16,skirt:.11,floorUnder:10,floorUnderNarrow:6},v.length<3&&(v=n.box("#process .steps .step",!0)),v.length<3){var S=n.box("#process .steps")||n.NONE;v=[S,S,S]}var y,L,N=v[0].t+(d?m.floorUnderNarrow:m.floorUnder),H=d?m.depthNarrow:m.depth;if(!d&&h.length>=3){var it=h[0].w;y=h[0].cx-.72*it-m.skirt*n.cssW,L=h[2].cx+.66*it}else if(!d&&v.length>=3){var ft=.62*v[0].w;y=v[0].cx-.72*ft-m.skirt*n.cssW,L=v[2].cx+.66*ft}else y=v[0].l-24,L=v[0].r+24;N=Jt(n,N,H,m.tip);var C=H*n.U*.4+30;return{shape:3,u:xe(n,(y+L)/2,N,Math.max(40,(L-y)/2),H,m.tip),look:n.look(Et),open:ge(n,N,C),foot:N-.55*C}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"a",glsl:ct,shapes:{1:"shFan",2:"shArcs",3:"shWeave"},stations:{2:ve,3:Pe,4:Ie,5:Ye,6:De,"6.5":l},ways:{2:me,3:Ee,4:Ve,5:_e,6:Ke}})})(),(function(){"use strict";var ct={stair:{tip:.3,depth:.2,depthNarrow:.16,riser:.055,riserNarrow:.028,shoulder:.04,shoulderNarrow:.028,cap:.07,warp:.42,lean:1.5,run:.34,fan:.1,locks:24,locksNarrow:8,wires:17,wiresNarrow:10,skirt:.11,node:12,nodeNarrow:10,floorUnder:10,floorUnderNarrow:6,look:{thick:1.1,gain:.98,share:1,points:.28,pointSize:.9}},pass:{depth:.5,halfWidth:.7,foot:.99,look:{thick:.85,gain:.72,share:1,points:0,pointSize:.9}},columns:{tip:.26,radius:.33,radiusNarrow:.44,foot:60,riseOver:.33,rim:.035,rimPick:.085,yarns:8,relief:.013,turnsWide:.42,turnsNarrow:.86,wide:.74,wideWidth:.86,hoops:.08,slide:.02,blueWall:.45,blueHoop:.22,share:.8,band:37,bandPly:8,look:{thick:1.3,gain:1.03,share:1,points:.12,pointSize:.9}},arcs:{radius:[.34,.58],rope:.08,tip:.4,apart:.07,factor:3,reach:.8,cover:1,fanOut:.26,wait:.12,look:{thick:1.05,gain:.9,share:.88,points:.2,pointSize:.9}},ring:{radius:[.3,.56],radiusNarrow:.46,rope:.105,tip:.42,below:.02,twist:1.5,section:.62,loose:.07,turn:.03,glint:.55,wait:.1,look:{thick:1.5,gain:.94,share:.88,points:.35,pointSize:1}},foot:{radius:[.27,.5],radiusNarrow:.44,tip:.44,above:.17,look:{thick:1.5,gain:.94,share:.88,points:.3,pointSize:1}}},u=`
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
}`,Rt=1/Math.tan(14*Math.PI/180);function Ft(l,n,h,v,d){l[n+"0"]=h,l[n+"1"]=v||h,l[n+"2"]=d||h}function me(l,n){var h=ct.stair,v=Math.cos(h.tip),d=Math.sin(h.tip),m=l.uy(n.floor),x=n.n,T=[],S=[],y,L;for(y=0;y<3;y++){L=Math.min(y,x-1);var N=l.uy(n.tops[L]);T[y]=Math.max(0,Rt*(N-m)/(Rt*v+N*d)),S[y]=(Rt-T[y]*d)/Rt}var H=[],it=[];for(y=0;y<3;y++)H[y]=x>1?.52*Math.min(y,x-1)/(x-1):0,it[y]=y<x?l.sstep((n.f-H[y])/.48):0;var ft=T[0]*it[0],C=ft+(T[1]-T[0])*it[1],St=C+(T[2]-T[1])*it[2],yt=[ft,C,St],Ct=l.ux(n.right)*S[x-1],te=l.ux(n.left),Pt=[],Nt=[99,99,99];for(y=0;y<3;y++)Pt[y]=y<x?l.ux(n.risers[y])*(((y?S[y-1]:1)+S[y])/2):Ct+5;var et=te+.35*(Pt[0]-te),bt=[[0,et]],Lt=0,O=et,c;for(c=0;c<n.nodes.length;c++)y=n.nodes[c],Nt[c]=l.ux(n.mids[y])*S[y],bt.push([H[y]+.48,Nt[c]]),n.f>=H[y]+.48-.001&&Lt++;for(c=1;c<bt.length;c++)n.f>=bt[c-1][0]&&(O=l.lerp(bt[c-1][1],bt[c][1],l.clamp01((n.f-bt[c-1][0])/Math.max(1e-4,bt[c][0]-bt[c-1][0]))));n.f>=bt[bt.length-1][0]&&(O+=.02);var vt=yt.map(function(xt){var Tt=(m+xt*v)*Rt/(Rt-xt*d);return l.cssH/2-Tt*l.U});return{X:[te,Ct,m,n.hd],E:[Pt[0],Pt[1],Pt[2],O],H:[ft,C,St,.92+.08*Math.sin(1.7*l.time)],N:[Nt[0],Nt[1],Nt[2],n.f>.001?1:0],tread:vt,lit:Lt,n:x}}function Ee(l,n,h){var v=ct.stair,d={};Ft(d,"uTX",n[0].X,n[1]&&n[1].X,n[2]&&n[2].X),Ft(d,"uTE",n[0].E,n[1]&&n[1].E,n[2]&&n[2].E),Ft(d,"uTH",n[0].H,n[1]&&n[1].H,n[2]&&n[2].H),Ft(d,"uTN",n[0].N,n[1]&&n[1].N,n[2]&&n[2].N),d.uTP=[v.tip,h?v.riserNarrow:v.riser,h?v.shoulderNarrow:v.shoulder,h?.6*v.cap:v.cap],d.uTQ=[v.warp,h?1:0,v.lean,h?.7*v.run:v.run],d.uTR=[v.fan,0,h?v.locksNarrow:v.locks,h?v.wiresNarrow:v.wires];var m=h?v.depthNarrow:v.depth,x=h?v.shoulderNarrow:v.shoulder;return d.uTL=[m/(2*m-x),0,0,0],d}function Ve(l){var n=ct.stair,h=l.narrow(),v=h?n.nodeNarrow:n.node,d=l.cssH,m=l.box("#process .step-tag",!0),x=l.box("#process .step-body",!0),T,S;if(m.length<3||x.length<3){var y=l.box("#process .steps .step",!0);if(y.length<3){var L=l.box("#process .steps")||l.NONE;y=[0,1,2].map(function(D){return{cx:L.l+L.w*(1+2*D)/6,t:L.t,w:L.w/3.2}})}m=y.map(function(D,_t){var we=h?D.w*.5:D.w*.62;return{cx:h?D.l+D.w*(.2+.17*_t):D.cx,b:D.t-(14+22*_t)-v,t:D.t-(14+22*_t)-v-20,w:we,l:0}}),x=y}var N,H;if(h){var it=x[0].t-m[0].b-v,ft=x[1].t-m[1].b-(x[0].t-m[0].b),C=m[1].cx-m[0].cx;for(C>8||(C=.5*m[0].w),C=Math.max(44,Math.min(90,C)),ft>2||(ft=16),T=[],N=0,H=[],S=0;S<3;S++){var St=m[S],yt=x[S],Ct=.36*St.w,te=[],Pt=[],Nt=[],et;for(et=0;et<=S;et++)te[et]=yt.t-it-et*ft,Nt[et]=St.cx-Ct-(S-et)*C,Pt[et]=et===S?St.cx:Nt[et]+C/2;var bt=l.clamp01((.9*d-(St.t-20))/(.5*d)),Lt=me(l,{floor:yt.t+n.floorUnderNarrow,tops:te,mids:Pt,risers:Nt,right:St.cx+Ct,left:Math.max(-24,Nt[0]-64),hd:n.depthNarrow,f:bt,n:S+1,nodes:[S]});T.push(Lt),H[S]=Lt.tread[S],Lt.lit&&N===S&&(N=S+1)}}else{var O=m[0].w,c=Math.min(m[0].t,m[1].t,m[2].t)-20,vt=l.clamp01((.9*d-c)/(.5*d)),xt=m[0].cx-.72*O,Tt=n.depth*l.U*Math.sin(n.tip),qt=Math.min(.16*d,2*Tt+.035*d),Ut=me(l,{floor:Math.min(x[0].t+n.floorUnder,d-qt+Tt),tops:m.map(function(D){return D.b+v}),mids:m.map(function(D){return D.cx}),risers:[xt,(m[0].cx+m[1].cx)/2-.1*O,(m[1].cx+m[2].cx)/2-.1*O],right:m[2].cx+.66*O,left:xt-n.skirt*l.cssW,hd:n.depth,f:vt,n:3,nodes:[0,1,2]});T=[Ut],N=Ut.lit,H=Ut.tread}var Ge=m.map(function(D){return D.t}),Vt=Math.min.apply(null,Ge)-20,Wt=Math.max(x[0].t,x[2].t);return{shape:"stair",u:Ee(l,T,h),look:l.look(n.look),treads:H,lit:N,open:h?1:l.open(Vt,Wt+110)}}function _e(l){var n=ct.pass,h=l.narrow(),v=l.cssW,d=[l.ux(v*(.5-n.halfWidth)),l.ux(v*(.5+n.halfWidth)),l.uy(l.cssH*n.foot),n.depth],m={X:d,E:[d[0]+.6,d[0]+1.3,d[0]+2,d[0]],H:[0,0,0,0],N:[99,99,99,0]},x=Ee(l,[m],h);return x.uTR[1]=.004,{shape:"stair",u:x,look:l.look(n.look)}}function Ke(l){for(var n=ct.columns,h=l.narrow(),v=l.cssH,d=l.box("#pricing .sec-head")||l.NONE,m=l.box("#pricing .plan",!0),x=l.box("#pricing .plan--pick",!0)[0];m.length<3;)m.push(m[m.length-1]||l.NONE);for(var T=l.ease("b.badge",x&&Math.abs(x.cx-m[1].cx)<6?1:0,.4),S=1,y={uKP:[n.tip,n.yarns,n.relief,n.slide*l.time],uKQ:[n.turnsWide,n.turnsNarrow,n.hoops,n.wideWidth],uKB:[n.blueWall,n.blueHoop*(.92+.08*Math.sin(1.3*l.time)),n.wide,n.share]},L=[0,0,0,0],N=0;N<3;N++){var H=m[N],it=(h?n.radiusNarrow:n.radius)*H.w,ft=h?H.t-4:d.t-(n.rim+(N===1?(n.rimPick-n.rim)*T:0))*v,C=h?H.t+Math.min(.8*H.h,.4*v):H.t+n.foot,St=C-ft;h||(C=Math.min(C,.985*v));var yt=l.clamp01((.95*v-H.t)/(n.riseOver*v));S=Math.min(S,yt);var Ct=C-Math.max(.1*St,l.sstep(yt)*Math.max(0,C-ft));y["uKC"+N]=[l.ux(H.cx),l.uy(Ct),l.ul(it),l.uy(C)],L[N]=l.ul(St)/Math.cos(n.tip)}y.uKH=L;var te=h?m[0].t-4:d.t-n.rim*v,Pt=(h?n.radiusNarrow:n.radius)*m[2].w;return y.uKF=[l.ux(h?m[0].l-10:Et(l,d.l)-6),l.ux(m[2].cx+Pt),l.uy(m[0].t+n.band),l.ul(n.bandPly)],{shape:"basket",u:y,look:l.look(n.look),open:h?1:l.open(te,m[0].t+n.foot+70)}}function ve(l,n,h,v,d,m,x){var T=ct.arcs,S=ct.ring,y=Math.max(T.factor,.86*l.cssW/(.94*v*Math.sin(T.reach)));return{uOA:[l.ux(n),l.uy(h),l.ul(v),l.ul(d*v)],uOB:[m,x,T.apart,.3+S.turn*l.time],uOC:[S.twist,S.section,T.fanOut,S.glint],uOD:[y,T.reach,T.cover,S.loose]}}function Pe(l){var n=ct.arcs,h=l.box("#faq .faq")||l.NONE,v=l.box("#faq .faq .qa",!0),d=l.box("#faq .faq summary",!0),m=0,x;for(x=0;x<d.length;x++)m+=d[x].h;for(x=1;x<v.length;x++)m+=Math.max(0,v[x].t-v[x-1].b);m||(m=h.h);var T=Math.min(n.radius[0]*l.cssW,n.radius[1]*l.cssH),S=h.t+.62*Math.min(m,.55*l.cssH);return S=Math.min(S,l.cssH*(1-n.wait)+.22*T),{shape:"coil",u:ve(l,l.cssW/2,S,T,n.rope,n.tip,1),look:l.look(n.look),open:Math.max(l.open(S-.3*T,S+.45*T),l.sstep(l.clamp01((l.q-10)/.25)))}}function Ie(l){var n=ct.ring,h=l.box("#start .start-side")||l.NONE,v=l.box("#start .form-wrap")||h,d=l.narrow(),m=Math.min((d?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),x=Math.max(h.b,v.b)+n.below*l.cssH;return x=Math.min(x,l.cssH*(1-n.wait)+.4*m),{shape:"coil",u:ve(l,l.cssW/2,x,m,n.rope,n.tip,0),look:l.look(n.look),open:1}}function Et(l,n){return l.narrow()?6:Math.max(30,.5*n)}function je(l){var n=l.box("#process .sec-head")||l.NONE,h=l.box("#process .step-body",!0),v=l.box("#process .step-tag",!0);h.length<3&&(h=l.box("#process .steps .step",!0));var d=h[0]||l.NONE,m=Et(l,n.l),x=v.length?Math.min.apply(null,v.map(function(T){return T.t})):d.t-120;return[[m,Math.min(x,n.t)-60,-.03],[m,d.t+10,0],[m,d.b,-.03]]}function xe(l){var n=l.box("#proof .pf-stage")||l.NONE,h=l.box("#process .sec-head")||l.NONE;return[[Et(l,h.l),n.t+.5*n.h,-.03]]}function Jt(l){var n=l.box("#pricing .sec-head")||l.NONE,h=l.box("#pricing .plan",!0),v=h[0]||l.NONE,d=Et(l,n.l),m=v.b,x;for(x=1;x<h.length;x++)m=Math.max(m,h[x].b);return[[d,n.t-40,-.03],[d,v.t+ct.columns.foot,0],[d,m,-.03]]}function ge(l){var n=l.box("#faq .sec-head")||l.NONE,h=l.box("#faq .faq")||l.NONE,v=Et(l,n.l);return[[v,n.t,-.03],[v,h.b,-.03]]}function Ye(l){var n=ct.ring,h=ct.foot,v=l.box("#start .start-side")||l.NONE,d=l.box("#start .form-wrap")||v,m=l.box("footer.foot")||l.NONE,x=l.narrow(),T=Et(l,v.l),S=l.sstep(l.clamp01(l.q-11)),y=Math.min((x?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),L=Math.max(v.b,d.b)+n.below*l.cssH,N=Math.min((x?h.radiusNarrow:h.radius[0])*l.cssW,h.radius[1]*l.cssH),H=m.t-h.above*l.cssH;L=Math.min(L,l.cssH*(1-n.wait)+.4*y);var it=l.lerp(y,N,S),ft=l.lerp(L,H,S),C=ft-.246*it*Math.sin(l.lerp(n.tip,h.tip,S))/Math.sin(.42);return[[T,v.t,-.03],[T,Math.min(v.b+10,C-.34*l.cssH),-.03],[l.cssW/2-.8*it,C,-.6*it*Math.cos(l.lerp(n.tip,h.tip,S))/l.U]]}function De(l){var n=ct.foot,h=l.box("footer.foot")||l.NONE,v=l.narrow(),d=Math.min((v?n.radiusNarrow:n.radius[0])*l.cssW,n.radius[1]*l.cssH),m=h.t-n.above*l.cssH;return{shape:"coil",u:ve(l,l.cssW/2,m,d,ct.ring.rope,n.tip,0),look:l.look(n.look)}}(window.__sceneShapes=window.__sceneShapes||[]).push({id:"b",glsl:u,shapes:{stair:"shStair",basket:"shBasket",coil:"shCoil"},stations:{7:Ve,8:_e,9:Ke,10:Pe,11:Ie,12:De},ways:{7:je,8:xe,9:Jt,10:ge,11:Ye},conf:ct})})(),(function(){"use strict";if(window.__scene)return;var ct=/[?&]scene-nosort\b/.test(location.search),u={tiers:[{strands:2200,segments:80,points:1200,dprCap:2,pixelCap:9e6},{strands:1e3,segments:52,points:700,dprCap:2,pixelCap:3e6},{strands:520,segments:40,points:400,dprCap:1.5,pixelCap:2e6}],maxStrands:2600,fit:{aspect:16/9,narrow:1.5},width:.0076,minPx:1.35,widthLod:[.85,1.3],hang:{root:[-.1,.33],leave:[224,236],tip:[186,292],tipCurve:.4,trunk:[1.49,.76,.2],reach:[.86,.6,.04],trunkWidth:.97,depth:.55,sway:.085,bend:.13,minScale:.62,rest:[204,.68,.25,8,.9]},body:{wrap:3.4,wrapVar:1.7,treadTwist:.55,tuftCount:47,wires:89,squash:1,lip:.24,ringZ:.88,spin:.1},swirl:{leave:74,end:118,stagger:.12,settle:1.3,gate:[.42,.5]},track:{open:[[.08,0],[.2,.16],[.306,.6],[.36,.88],[.43,1]],loosen:[[0,0],[.1,.25],[.2,.5],[.32,1]],count:[[0,400],[.2,430],[.42,520],[.52,1300],[.62,2200]],thick:[[0,1.25],[.42,1.25],[.52,1],[.64,.72],[.84,.86]],gain:[[0,.86],[.45,.86],[.62,1],[.84,.9]],skin:[[.55,.88],[.66,.935],[.84,.955]],skinW:[[.55,.12],[.7,.06],[.84,.035]],bloom:[[.7,0],[.86,1]],tufts:[[.56,.45],[.84,.1]],wires:[[.62,0],[.8,1]],deep:[[.62,.16],[.84,.07]],yaw:[[0,0],[.45,4],[.63,-9],[.84,9]],pitch:[[0,0],[.45,-3],[.63,7],[.84,-5]],cx:[[.2,.1],[.42,.04],[.586,-.01],[.82,0]],cy:[[.2,.1],[.42,.11],[.586,.085],[.65,.02],[.72,0],[.84,.03]],phase:[[.2,0],[.45,.5],[1,2.3]],hole:[[.2,.42],[.42,.39],[.5,.31],[.54,.28],[.586,.2]],arm:[[.2,1.85],[.36,1.85],[.42,1.95],[.5,1.4],[.54,1.02],[.586,.68]],rim:[[.2,0],[.3,1],[.56,1],[.66,0]],disc:[[.2,.5],[.42,.24],[.586,.14]],wind:[[.48,0],[.586,.18],[.665,1]],radius:[[.46,.4],[.586,.36],[.64,.34],[.72,.26],[.84,.2]],tube:[[.46,.08],[.586,.15],[.64,.19],[.82,.19]],twist:[[.46,2.4],[.64,2.9],[.82,3.3]],loose:[[.46,1],[.62,.85],[.72,.35],[.82,0]],flare:[[.46,.5],[.586,.28],[.64,.1],[.76,.04]],sphere:[[.64,0],[.8,1]],ball:[[.64,.53],[.7,.47],[.76,.41],[.84,.365]],mouth:[[.64,.15],[.7,.12],[.76,.086],[.84,.072]],core:[[.64,0],[.82,1]],wash:[[.2,0],[.42,.06],[.56,.16],[.635,.8],[.72,.62],[.78,.3],[.84,0]],tips:[[0,1],[.52,1],[.64,.5],[.74,0]],points:[[0,.85],[.3,1],[.66,1],[.84,.32]],pointSize:[[0,1],[.3,1.15],[.64,.9],[.84,.7]],turn:[[.2,0],[.5,.5],[.8,1]],floorX:[[0,.78],[.3,.35],[.45,0]],floorY:[[0,-.71],[.3,-.92],[.586,-.93],[.7,-.86],[.84,-.8]],floorW:[[0,.95],[.3,1.3],[.586,.85],[.7,.55],[.84,.42]],shadow:[[0,1],[.3,.45],[.5,.5],[.586,.8],[.82,1]],pool:[[0,.9],[.3,.5],[.586,.9],[.66,1],[.84,.1]]},alive:{viewSway:[1.6,1.1],viewRate:[.21,.17],bob:.014,bobRate:.55,travel:.022,sparkle:.9},calmTime:2.5,pointer:{radius:.34,fingerRadius:.42,aside:.1,gather:.55,turn:[13,9],follow:[.2,.045],rise:.1,fall:.035,pulse:1.5,pulseWidth:.075},exposure:.76,light:{key:.28,strips:4.8,fill:.45,room:.08,glint:.8,arms:[.25,.75,.45,.15],armSide:.3},shade:{formFloor:.16,back:.6,strandVar:.25,darkShare:.05,open:.42},blue:[.02,.22,1],blueAmt:{tint:1,light:.85,sheen:.2,hot:2.4,reach:1.7,lean:.75,glare:.24,kick:.06,ring:1,points:1,haze:[.72,.2],bloom:.34,tipWash:.55},pulse:{rate:1.7,wave:.16},floor:{shadow:.3,pool:.3},smooth:.16,slowMs:40,warmup:20,window:40,cooldown:60,fastMs:22,calm:480,retries:2,stillRetryMs:2e4,idleEvery:2,lostWaitMs:4e3};u.hero="header.hero",u.stage=".stage",u.secs=[null,null,"#studio","#services","#film","#work","#focus","#process","#proof","#pricing","#faq","#start","footer.foot"],u.names=["hero","ball","loop","fan","arcs","weave","ground","stair","pass","columns","lowarcs","ring","foot"],u.seam={from:1,to:.35,least:.3},u.page={viewSway:[1.2,.9],scale:.4},u.look={thick:1,gain:1,share:1,points:.5,pointSize:1,tips:0,stag:.4,lift:.1,yaw:0,pitch:0,deep:.3,skin:.8,skinW:.12,back:.75},u.pagePoints=[700,400,220],u.ringOut=3,u.via={7:{at:.55,direct:!0,stagger:.35}},u.rope={grid:[-.2,1.2],pad:.06,least:.62,len:.16,ply:.034,plyLeast:.011,swing:1.12,depth:.7,period:210,twist:2,soft:.75,pass:{stagger:.08,join:.46},aside:.8,slide:.2,sway:.006},u.cutBy={},u.passBy={4:{join:.4},9:{direct:!0,span:[.25,.92],stagger:.45},10:{join:.34}},u.clear={pad:20,soft:16,dark:.33,heroFrom:.02,heroUntil:.08,heroPad:-8,heroSoft:8},u.edge={hero:0,page:0},u.sortStrands=!ct,u.fadeInMs=500,u.idleAfterMs=2e4,u.warm={quietMs:350,giveUpMs:8e3},u.groups=[1,3,4,5,7,9,12],u.groupFadeMs=450,u.hoverS=.3,u.proof={sel:"#proof .pf-stage",melt:104,cover:.85,whole:!0},u.sleepUnderMenu=!0,u.jump={windows:1,stations:1.5},u.stills={"hero-a":0,"hero-b":.306,"hero-c":.586,"hero-d":1,studio:2,services:3,partner:4,websites:5,difference:6,process:7,pricing:9,faq:10,start:11,footer:12};var Rt=28,Ft=1/Math.tan(Rt*Math.PI/360),me=`
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
float place(vec4 s) { float a = TAU * s.x; return a + gVx3.z * sin(a * gVx3.w + 1.7) / gVx3.w + gAngle; }`,Ee=`
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
}`,Ve=`
void curve(vec4 s, float t, out vec3 p, out vec4 nb) {
gHandW = 1.0; gKeep = 1.0; gOwn = 0.0; gHandIn = 0.0; gHandM = 1.0;
shape(uShA, s, t, p, nb);
}
float strandOn(vec4 s) { return 1.0 - smoothstep(uShare - 0.03, uShare + 0.03, pick(s)); }`,_e=`
uniform vec4 uRp[8];
uniform vec4 uRpA;
uniform vec4 uRpY;
uniform vec4 uRpK;
uniform vec4 uRpS;
uniform vec4 uRpM;
uniform vec4 uRpC;
uniform vec4 uRpT;
uniform float uRpSoft;
float gLie;`,Ke=`
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
float strandOn(vec4 s) { return 1.0; }`,ve=(function(){var t=me,e=[[/uniform float uMix, uStag, uLift;[^\n]*\n/,""],[/uniform vec4 uHand;[^\n]*\n/,""],[/uniform vec4 uHand2;[^\n]*\n/,""],[/uniform float uFold;[^\n]*\n/,""],[/uniform float uFlow;[^\n]*\n/,""],[/float gKeep;[^\n]*\n/,""],[/float gOwn, gHandIn, gHandM, gShow;/,"float gShow;"],[/float gBody, gHandW;/,"float gBody; const float gHandW = 1.0;"]];return e.forEach(function(o){if(!o[0].test(t))throw new Error("sfs-scene: rope head, no "+o[0]);t=t.replace(o[0],o[1])}),t+_e})(),Pe=`
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
}`,Ie=`#version 300 es
precision highp float;
layout(location=0) in vec2 aIV;
layout(location=1) in vec4 aSeed;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform float uSeg, uWidth, uMinPx, uPxUnit, uWMul, uExposure;
uniform float uCore, uBreath, uWave, uMouth, uWash, uTips, uTipWash, uRim;
uniform vec3 uReach;
uniform vec2 uVar;`,Et=`
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
}`,je=`#version 300 es
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
}`,xe=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aSeed;
layout(location=2) in vec4 aPt;
uniform mat4 uView, uProj;
uniform vec4 uStage;
uniform vec2 uRes;
uniform float uPtShare, uPtScale, uPointAmt, uTravel, uSparkle, uPtLift, uRim;
uniform vec4 uKc[2]; uniform vec4 uKcAmt;`,Jt=`
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
}`,ge=(function(){var t="smoothstep(0.25, 0.70, gThin);",e=Jt.replace(t,"smoothstep(0.25, 0.70, gThin) * (1.0 - gLie * step(0.12, fract(aPt.z * 13.7)));");if(e===Jt)throw new Error("sfs-scene: rope points, no "+t);return e})(),Ye=`#version 300 es
precision highp float;
in vec2 vUv; in float vA; out vec4 o;
uniform vec3 uBlue;
void main() {
float d = length(vUv);
float core = smoothstep(0.26, 0.14, d);
float halo = (0.55 * exp(-d * d * 3.2) + 0.45 * exp(-d * d * 14.0)) * smoothstep(1.0, 0.55, d);
vec3 c = (uBlue + vec3(0.05, 0.09, 0.0)) * halo * 0.62 + vec3(0.90, 0.96, 1.0) * core;
o = min(vec4(c, halo * 0.50 + core) * vA, vec4(1.0));
}`,De=`#version 300 es
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
}`,l=`#version 300 es
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
}`;function n(t,e,o){var r=1/Math.tan(t*Math.PI/360),a=1/(e-o);return new Float32Array([r,0,0,0,0,r,0,0,0,0,(o+e)*a,-1,0,0,2*o*e*a,0])}function h(t,e,o,r){var a=Math.cos(t),i=Math.sin(t),f=Math.cos(e),p=Math.sin(e),s=Math.cos(o),w=Math.sin(o);return new Float32Array([a*s,p*i*s+f*w,-f*i*s+p*w,0,-a*w,-p*i*w+f*s,f*i*w+p*s,0,i,-p*a,f*a,0,0,0,-r,1])}function v(t){return function(){t|=0,t=t+1831565813|0;var e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function d(t,e,o){return t+(e-t)*o}function m(t,e,o){return t<e?e:t>o?o:t}function x(t){return t<0?0:t>1?1:t}function T(t){var e=t.slice().sort(function(o,r){return o-r});return e.length?e[e.length>>1]:0}function S(t,e){var o=t.length;if(e<=t[0][0])return t[0][1];if(e>=t[o-1][0])return t[o-1][1];for(var r=0;e>t[r+1][0];)r++;function a(g){if(g===0||g===o-1)return 0;var W=t[g][0]-t[g-1][0],E=t[g+1][0]-t[g][0],K=(t[g][1]-t[g-1][1])/W,k=(t[g+1][1]-t[g][1])/E;return K*k<=0?0:3*(W+E)/((2*E+W)/K+(E+2*W)/k)}var i=t[r][0],f=t[r+1][0]-i,p=t[r][1],s=t[r+1][1],w=(e-i)/f,M=w*w,z=M*w;return(2*z-3*M+1)*p+(z-2*M+w)*f*a(r)+(3*M-2*z)*s+(z-M)*f*a(r+1)}function y(t){return t=x(t),t*t*(3-2*t)}function L(t){return t-2*Math.PI*Math.round(t/(2*Math.PI))}function N(t){try{performance.mark("sfs-scene:"+t)}catch{}}function H(t){it.push(t),it.length>60&&it.shift(),window.console&&console.warn("[scene] "+t)}var it=[],ft=n(Rt,.5,30),C=Math.PI/180,St=/SwiftShader|llvmpipe|Software|Basic Render/i,yt=document.documentElement,Ct=document.currentScript,te=Ct&&Ct.src?Ct.src.replace(/sfs-scene(\.min)?\.js(\?.*)?$/,""):"",Pt=new URLSearchParams(location.search),Nt=/[?&](debug|popup-debug|perf=1|sceneperf=1)\b/.test(location.search),et=new Float32Array(u.maxStrands*4);(function(){for(var t=v(20261007),e=0;e<u.maxStrands;e++)et[e*4]=(.5+e*.7548776662466927)%1,et[e*4+1]=(.5+e*.5698402909980532)%1,et[e*4+2]=t(),et[e*4+3]=t()})();var bt=128,Lt=u.tiers[0].points,O=null,c=null,vt=null,xt=null,Tt=null,qt=null,Ut=null,Ge=!1,Vt={begin:0,send:0,waited:0,take:0,frames:[]},Wt=[],D=null,_t=0,we=0,So=[],lt=null,F=[],ee=null,Xe=!1,Qe=!1,ye="",Kt=null,ue=!1,be=!1,Ne=0,To={},lr={alpha:!0,premultipliedAlpha:!0,antialias:!0,depth:!0,stencil:!1,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1},I="off",st="page",He="",Wo="",gt=0,ht={},Ht={},ur=!1,ut=0,pt=0,kt=1,wt=0,Q=0,ot=1,It=0,lo=0,oe=!0,Be="",fe=0,uo=0,$t=0,Zt=0,fr=0,dt=0,Oe=0,G=null,Y=null,jt=0,fo=!0,rt=null,Mt=-1,re="",ce=!1,co=!1,J=Cr(),Ro=0,ho={fails:0},$e=0,Eo=0,Po=null,Yt=!1,No=!1,ke=0,cr=!1,Ho=!1,b={cx:0,cy:0,on:0,down:!1,finger:!1,downAt:null,ax:0,ay:0,a:0,bx:0,by:0,b:0,busy:!1,turnX:0,turnY:0},Dt=[],Ze=null,Bo=!1,ne=[],ae=[],Bt=[],Oo=[],Je=[],Fe={},Fo=null,Co=null,po=null,hr=null,nt={top:0,h:0,stageH:0},Gt=[],mo=[],pr=[],Lo=[],dr=[],vo=null,xo={},to=[0,0,0],Ce=[0,0,0],qo=[0,0,0],eo=-1,oo,ro=0,Hn=[0,0,0,0],jr=[1e6,1e6,-1e6,-1e6];function Yr(t){var e=po.get(t);return e===void 0&&(e=getComputedStyle(t).position==="sticky"?1:0,po.set(t,e)),e}function he(t){var e=0,o=0,r,a={x:0,y:0,w:t.offsetWidth,h:t.offsetHeight,pin:null,rel:0};for(r=t;r;r=r.offsetParent){if(!a.pin&&Yr(r)&&r.parentElement){var i=he(r.parentElement),f=getComputedStyle(r),p=getComputedStyle(r.parentElement),s=0,w;for(w=r;w;w=w.offsetParent)s+=w.offsetTop+(w===r?0:w.clientTop);var M=parseFloat(f.top)||0,z=i.pin?i.pin.n+i.rel:i.y,g=z+r.parentElement.clientTop+(parseFloat(p.paddingTop)||0),W=z+i.h-(parseFloat(p.borderBottomWidth)||0)-(parseFloat(p.paddingBottom)||0)-r.offsetHeight-(parseFloat(f.marginBottom)||0),E=Math.abs(s-(window.scrollY+M))<1.5||s>=W-1.5;a.pin={n:E?g+(parseFloat(f.marginTop)||0):s,top:M,lim:W},a.rel=o+(r===t?0:r.clientTop),e+=r.offsetLeft+(r===t?0:r.clientLeft);continue}e+=r.offsetLeft+(r===t?0:r.clientLeft),a.pin||(o+=r.offsetTop+(r===t?0:r.clientTop))}return a.x=e,a.y=o,a}function mr(t,e){if(!t.pin)return t.y;var o=t.pin;return(o.lim<o.n?o.n:Math.min(Math.max(o.n,e+o.top),o.lim))+t.rel}function Uo(t,e){var o=mr(t,e)-e;return{l:t.x,t:o,w:t.w,h:t.h,r:t.x+t.w,b:o+t.h,cx:t.x+t.w/2,cy:o+t.h/2}}function no(t){Fo&&t&&!Co.has(t)&&(Co.add(t),Fo.observe(t))}function Vo(t,e){var o=Fe[t];if(!o){o=Fe[t]={recs:[]};var r=Array.prototype.slice.call(document.querySelectorAll(t));r.forEach(no),o.recs=r.map(he).filter(function(a){return a.w>1&&a.h>1})}return e?o.recs.map(function(a){return Uo(a,Mt)}):o.recs.length?Uo(o.recs[0],Mt):void 0}function Me(){oe=!1;var t=[],e,o;wt=O&&O.clientWidth?O.clientWidth:yt.clientWidth,Q=O&&O.clientHeight?O.clientHeight:window.innerHeight,It=window.innerHeight;var r=u.fit;ot=Math.max(1,.5*Math.min(Math.max(Q,wt/r.aspect),wt*r.narrow)),Xt.cssW=wt,Xt.cssH=Q,Xt.U=ot,lo=Math.max(0,yt.scrollHeight-It);var a=document.querySelector(u.hero),i=a?a.querySelector(u.stage):null;if(a){var f=he(a);nt={top:f.y,h:f.h,stageH:i?i.offsetHeight:It},no(a)}else nt={top:0,h:It,stageH:It};var p=st!=="hero",s=u.secs.map(function(g){return g&&p?document.querySelector(g):null});Gt=s.map(function(g){return g?(no(g),he(g).y):null}),p&&Array.prototype.forEach.call(document.querySelectorAll(".sec"),no);for(o in Fe){var w=Array.prototype.slice.call(document.querySelectorAll(o));w.forEach(no),Fe[o].recs=w.map(he).filter(function(g){return g.w>1&&g.h>1}),Fe[o].recs.forEach(function(g){t.push(g.x,g.pin?g.pin.n+g.rel:g.y,g.w,g.h)})}mo=[],Array.prototype.forEach.call(document.querySelectorAll("img.gd-img"),function(g){if(!/gd-img--over/.test(g.className)&&!(!p&&!g.closest(u.hero))){var W=he(g),E=g.parentElement,K=g.closest(".gd"),k=g.closest(".sec, header.hero, footer.foot");if(E&&/(^|\s)gd-cut(\s|$)/.test(E.className)){var A=he(E);W.h=Math.min(W.h,A.h),W.w=Math.min(W.w,A.w)}if(!(W.w<2||W.h<2)){var X=k?s.indexOf(k):-1;X<0&&(X=k&&k.matches(u.hero)?0:-1),mo.push({rec:W,st:X,fig:K}),t.push(W.x,W.pin?W.pin.n+W.rel:W.y,W.w,W.h)}}}),pr=p?[1,2,3].map(function(g){return document.querySelector('[data-scene-station="'+g+'"]')}):[],Lo=p?[1,2,3].map(function(g){return document.querySelector("#focus .oc-br--"+g)}):[],dr=p?Array.prototype.slice.call(document.querySelectorAll("#services .cards .card")):[];var M=st==="page"?document.querySelector(u.proof.sel):null;vo=M?he(M):null,t.push(wt,Q,It,lo,nt.top,nt.h,Gt.join("/")),t=t.join(",");var z=t!==Be;return Be=t,z}function _o(){return nt.top+nt.h-It}function Dr(t){if(Ht.progress)return x(+Ht.progress()||0);var e=nt.h-It;return e>1?x((t-nt.top)/e):0}function Ko(t){for(var e=1,o=u.seam,r=u.secs.length-1,a=2;a<=r;a++)if(!(Gt[a]===null||Gt[a]===void 0)){var i=Math.min(Gt[a]-o.to*Q,lo),f=Math.min(Gt[a]-o.from*Q,i-o.least*Q);if(a===2&&(f=Math.min(_o(),i-1)),t<=f||(e=a-1+y((t-f)/(i-f)),t<i))break}return e}function go(t){var e=Dr(t),o=_o();return st==="hero"?e:nt.h-It<=1?t<=o?e:Ko(t):t<=o+1?e:Math.max(e,Ko(t))}var Gr={l:0,t:0,w:100,h:100,r:100,b:100,cx:50,cy:50};function Io(t){var e={},o,r=u.look;for(o in r)e[o]=r[o];if(t)for(o in t)e[o]=t[o];return e}function Xr(t,e,o){var r=xo[t];return r||(r=xo[t]={v:e,to:e,s:o||.3}),r.to=e,r.s=o||.3,G&&(r.v=e),r.v}var Xt={box:Vo,live:function(t){return Vo(t)},ux:function(t){return(t-wt/2)/ot},uy:function(t){return(Q/2-t)/ot},ul:function(t){return t/ot},cssW:0,cssH:0,U:1,time:0,scrollY:0,narrow:function(){return wt<=900},look:Io,NONE:Gr,clamp01:x,sstep:y,lerp:d,detail:qo,hover:to,ease:Xr,ptr:{x:0,y:0,on:0},open:function(t,e,o,r){var a=t==null?0:x((0-t)/Math.max(1,e-t)),i=o==null?1:x((Q-o)/Math.max(1,r-o));return Math.min(1-y(a),y(i))},q:0},vr={uTime:1,uShare:1,uShA:1,uShB:1,uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1,TAU:1,PI:1,gBlue:1,gHot:1,gFlex:1,gThin:1,gSel:1,gKnot:1,gShow:1},Qr={uW0:1,uW1:1,uW2:1,uW3:1,uWC:1,uWR:1,uWB:1};function $r(t){var e=String(t.id||"").toLowerCase().replace(/[^a-z0-9]/g,"")||"x",o=String(t.glsl||"").replace(/\/\*[\s\S]*?\*\//g," ").replace(/\/\/[^\n]*/g," "),r={},a={},i={id:e,src:t,uni:r,gids:{},text:""};o=o.replace(/\buniform\s+(\w+)\s+([^;]+);/g,function(R,q,B){var P=[];return B.split(",").forEach(function(Z){var j=/^\s*(\w+)\s*(?:\[\s*(\d+)\s*\])?\s*$/.exec(Z);if(!j)throw new Error('cannot read the uniform declaration "'+R.replace(/\s+/g," ")+'"');if(!vr[j[1]]){if(q!=="vec4")throw new Error("uniform "+j[1]+" is a "+q+": a shape's uniforms are vec4 (SHAPES.md 1)");r[j[1]]=j[2]?+j[2]:0,a[j[1]]=1,P.push(j[1]+(j[2]?"["+j[2]+"]":""))}}),P.length?"uniform vec4 "+P.join(", ")+";":" "});var f="",p=0,s,w;for(s=0;s<o.length;s++)w=o.charAt(s),w==="}"&&p--,f+=p>0&&w!==`
`?" ":w,w==="{"&&p++;for(var M=[],z="(?:void|float|int|bool|vec[234]|mat[234])",g,W=new RegExp("\\b"+z+"\\s+(\\w+)\\s*\\(","g");g=W.exec(f);)a[g[1]]=1;for(var E=new RegExp("\\b(?:const\\s+)?"+z+"\\s+([^;{}()]+(?:\\([^;{}]*\\))?[^;{}()]*);","g");g=E.exec(f);)if(!(/\)\s*$/.test(g[1])&&!/=/.test(g[1]))){var K=g[1].replace(/\([^)]*\)/g,"").split(",").map(function(R){return(/^\s*(\w+)/.exec(R)||[])[1]}).filter(Boolean),k=K.filter(function(R){return vr[R]});if(k.length===K.length)M.push([g.index,g.index+g[0].length]);else{if(k.length)throw new Error('"'+g[0]+`" declares the engine's `+k.join(", ")+" together with names of its own: put them on lines of their own");K.forEach(function(R){a[R]=1})}}for(s=M.length-1;s>=0;s--)o=o.slice(0,M[s][0])+" "+o.slice(M[s][1]);i.text=o.replace(/[A-Za-z_]\w*/g,function(R,q,B){return a[R]===1&&B.charAt(q-1)!=="."?R+"_"+e:R});var A=t.shapes||{};for(var X in A){if(!a[A[X]])throw new Error("shape "+X+" names the function "+A[X]+", which the file's glsl does not define");i.gids[X]=Bt.length,Bt.push({fn:A[X]+"_"+e,file:i,local:X})}return i}function Zr(t){var e=`void shape(int id, vec4 s, float t, out vec3 p, out vec4 nb) {
  gBlue = 0.0; gHot = 0.0; gFlex = 0.2; gSel = 1.0; gThin = 1.0; gShow = 1.0; gBody = 0.0; gKnot = 0.0; gLoc = vec3(0.0);
`,o=[],r=[];return t.hero&&o.push("if (id < 0) { heroCurve(s, t, p, nb); gBody = 1.0; }"),t.ids.forEach(function(a){if(a===0){o.push("if (id == 0) { shBody(s, t, p, nb); gBody = 1.0; }");return}o.push("if (id == "+a+") "+Bt[a].fn+"(s, t, p, nb);"),Bt[a].file&&r.indexOf(Bt[a].file)<0&&r.push(Bt[a].file)}),e+="  "+o.join(`
  else `)+`
  else { p = vec3(0.0); nb = vec4(0.0, 0.0, 1.0, 0.0); }
}
`,r.sort(function(a,i){return ne.indexOf(a)-ne.indexOf(i)}),(t.form==="rope"?ve:me)+Ee+r.map(function(a){return`
/* ---- shapes-`+a.id+` ---- */
`+a.text}).join(`
`)+`
`+e+(t.form==="rope"?Ke:Ve)}function Jr(){var t=st==="page"&&ae.length?u.groups:[1];F=[{k:0,lo:0,hi:Math.min(t[0],u.secs.length-1),hero:!0,ids:[0],form:"one",state:"none",strand:null,point:null,info:null}],ee=F[0],Xe=F[0].hi>=u.secs.length-1||st!=="page"||!ae.length,Qe=!1,ye="",To={}}function Le(){if(!Xe){Xe=!0;var t=u.groups,e=u.secs.length-1,o,r,a;for(F[0].hi>1&&H("CONF.groups: the first group must end at the ball (1); below it every picture needs the rope"),o=1;o<t.length&&t[o-1]<e;o++){var i=t[o-1],f=Math.min(t[o],e),p=[],s="rope";for(r=i;r<=f;r+=.5)r%1&&(!ae[r]||r>f)||(a=r===1?{gid:0}:ao(r),a&&p.indexOf(a.gid)<0&&p.push(a.gid));p.sort(function(w,M){return w-M}),F.push({k:o,lo:i,hi:f,hero:!1,ids:p,form:s,state:"none",strand:null,point:null,info:null})}}}function pe(t){!Xe&&t>F[0].hi&&Le();for(var e=0;e<F.length;e++)if(t<=F[e].hi)return F[e];return F[F.length-1]}function tn(t,e){return(e.shA<0?!t.hero:t.ids.indexOf(e.shA)<0)||e.shB!==e.shA&&(e.shB<0?!t.hero:t.ids.indexOf(e.shB)<0)?!1:e.rope?t.form==="rope":t.form==="one"}function en(t){var e=pe(t),o;for(o=e.k-1;o>=0;o--)if(F[o].state==="ready")return{G:F[o],q:F[o].hi};for(o=e.k+1;o<F.length;o++)if(F[o].state==="ready")return{G:F[o],q:F[o].lo<=1?Math.min(2,F[o].hi):F[o].lo};return null}function jo(t,e){var o=t.k?String(t.hi):"";c&&t.strand&&t.strand!==e["strand"+o]&&(c.deleteProgram(t.strand.p),c.deleteProgram(t.point.p)),t.strand=e["strand"+o],t.point=e["point"+o],t.state="ready",t.k&&N("group"+t.hi),on()}function on(){var t=[],e,o,r=u.secs.length-1;for(e=0;e<=r;e++)for(o=0;o<F.length;o++)if(F[o].state==="ready"&&e>=F[o].lo&&e<=F[o].hi){t.push(e);break}var a=t.join(",");if(a!==ye&&(ye=a,typeof Ht.onLive=="function"))try{Ht.onLive(t)}catch{}}function Yo(){if(!(I!=="live"||st!=="page"||!F.length||ht.nogroups)){Le(),Qe=!0;var t=pe(Y===null?0:Y).k,e=F.filter(function(o){return o.state==="none"});e.sort(function(o,r){return Math.abs(o.k-t)-Math.abs(r.k-t)||r.k-o.k}),e.forEach(Do)}}function Do(t){t.state="asked",Qo(Se(t),function(e,o){if(t.info=o,!e){t.state="failed",H("the programs of stations "+t.lo+" to "+t.hi+" did not link ("+o.why+"): the page keeps its stills there");return}jo(t,e),mt()},t)}function rn(t){t.state==="none"&&Qe&&Do(t);for(var e=1;e<Wt.length;e++)if(Wt[e].tag===t){Wt.unshift(Wt.splice(e,1)[0]);break}}function xr(t){Le();var e=pe(t),o={};if(e.state==="ready"||!c)return e.state==="ready"?e:null;try{Se(e).forEach(function(r){o[r.name]=Xo(Go(r.vs,r.fs))})}catch(r){return e.state="failed",H("group "+e.k+": "+r.message),null}return jo(e,o),e}function gr(t){ne=[],Bt=[{fn:"shBody",file:null,local:0}],ae=[],Je=[],(t||[]).forEach(function(e){if(!(!e||typeof e!="object")){var o=Bt.length;try{ne.push($r(e))}catch(r){Bt.length=o,H("shapes-"+(e.id||"?")+" left out: "+r.message)}}}),ne.forEach(function(e){var o=e.src.stations||{};for(var r in o)typeof o[r]=="function"&&+r>=2&&+r<u.secs.length&&(ae[+r]={fn:o[r],file:e,gids:{},names:{},checked:!1,broken:!1});var a=e.src.ways||{};for(r in a)typeof a[r]=="function"&&(Je[+r]=a[r])}),Jr()}function nn(t,e){var o=t.gids[e];if(o!==void 0)return o;if(t.file.gids[e]!==void 0)o=t.file.gids[e];else if(String(e)==="0")o=0;else{o=null;for(var r=0;r<ne.length;r++)ne[r].gids[e]!==void 0&&(o=ne[r].gids[e])}return t.gids[e]=o}function an(t,e,o){var r=t.names[e+o];if(r!==void 0)return r;var a=/^(.*?)(\d)$/.exec(o),i=[t.file,Bt[e].file],f;r=null;for(var p=0;p<i.length&&!r;p++)f=i[p],f&&(f.uni[o]===0?r=o+"_"+f.id:a&&f.uni[a[1]]>+a[2]&&(r=a[1]+"_"+f.id+"["+a[2]+"]"));return!r&&Qr[o]&&(r=o),t.names[e+o]=r}function ao(t){var e=ae[t],o,r,a;if(!e||e.broken)return null;try{o=e.fn(Xt)}catch(p){return e.broken=!0,H("station "+t+" (shapes-"+e.file.id+") threw: "+p.message),null}if(!o||!o.u)return e.broken=!0,H("station "+t+" (shapes-"+e.file.id+") returned no { shape, u, look }"),null;var i=nn(e,o.shape);if(i===null)return e.broken=!0,H("station "+t+" (shapes-"+e.file.id+") asks for shape "+o.shape+", which no file defines"),null;var f={};for(r in o.u)a=an(e,i,r),a?f[a]=o.u[r]:e.checked||H("station "+t+" (shapes-"+e.file.id+'): "'+r+'" is not a uniform of its shape; left out'),!e.checked&&(!o.u[r]||o.u[r].length!==4||o.u[r].some(function(p){return typeof p!="number"||p!==p}))&&H("station "+t+" (shapes-"+e.file.id+'): "'+r+'" is not four numbers: '+JSON.stringify(o.u[r]));return e.checked=!0,{i:t,gid:i,u:f,look:Io(o.look),treads:o.treads||null,lit:o.lit,floor:o.floor||null,open:o.open===void 0?1:x(o.open),knot:o.knot||yr,foot:typeof o.foot=="number"?o.foot:null}}function sn(){var t=Math.min(u.tiers[gt].strands,u.maxStrands);return Math.min(u.widthLod[1],Math.max(u.widthLod[0],Math.sqrt(u.tiers[0].strands/t)))}function ln(t,e,o){var r=u.track,a={},i,f=u.alive,p=u.body,s=u.hang,w=u.pointer;for(i in r)a[i]=S(r[i],t);var M=Math.min(u.tiers[gt].strands,u.maxStrands),z={p:t,time:e,v:a};z.open=a.open<1e-5?0:a.open>1-1e-5?1:a.open,z.wind=a.wind<1e-5?0:a.wind>1-1e-5?1:a.wind,z.share=Math.min(1,a.count/M);var g=m(wt/ot/(2*u.fit.aspect),s.minScale,1);z.hg=[wt/2/ot+s.root[0]*g,Q/2/ot+s.root[1]*g,g,a.loosen],z.hg2=[s.sway,0,0,0];var W=x(a.loosen/s.rest[2]);W=W*W*(3-2*W);var E=s.rest[3]*(1-W);z.hg3=[(d(s.rest[0],s.tip[0],W)+E)*C,(s.tip[1]+E)*C,s.depth,s.tipCurve];var K=d(s.rest[4],1,W);z.hg4=[s.trunk[0]*K,s.trunk[1]*K,d(s.rest[1],s.reach[0],W)*K,s.reach[1]*K],z.hg5=[s.trunk[2]*K,s.reach[2]*K,s.bend];var k=f.bob*Math.sin(e*f.bobRate)*x((t-.5)/.2);z.bob=k;var A=u.swirl,X=x((t-A.gate[0])/(A.gate[1]-A.gate[0]));X=X*X*(3-2*X);var R=o===void 0?p.spin*e:o,q=R-2*Math.PI*Math.round(R/(2*Math.PI)),B=(s.leave[0]+s.leave[1])/2;z.angle=(B-180-A.leave)*C+a.phase+(X>=1?R:q*X),z.op3=[(s.leave[1]-s.leave[0])*C/(s.trunkWidth*g),s.trunkWidth*g,(B+E)*C,A.settle],z.op=[z.open,A.stagger,a.hole,a.arm],z.op2=[A.leave*C,A.end*C,a.disc,z.angle],z.vx=[a.twist,a.radius,a.tube,p.squash],z.vx2=[a.flare,a.loose,p.wrap,p.wires],z.vx3=[p.treadTwist,p.wrapVar,a.tufts,p.tuftCount],z.vx4=[z.wind,a.sphere,a.ball,a.mouth],z.vxc=[a.cx,a.cy+k,0,Math.max(.01,p.lip*a.ball)],z.mouth=d(a.radius-a.tube,a.mouth,a.sphere),z.outer=d(a.radius+a.tube,a.ball,a.sphere),z.ringZ=d(a.tube*p.squash*.22,a.ball*p.ringZ,a.sphere);var P=a.yaw+f.viewSway[0]*Math.sin(e*f.viewRate[0])+a.turn*w.turn[0]*b.turnX,Z=a.pitch+f.viewSway[1]*Math.sin(e*f.viewRate[1]+1.3)-a.turn*w.turn[1]*b.turnY;return z.view=h(P*C,Z*C,0,Ft),z.core=a.core,z.floor={x:a.floorX,y:a.floorY,w:a.floorW,shadow:a.shadow*(1-4*k),pool:a.pool},z}function un(t,e){var o=t.v,r=u.alive,a=u.page,i=u.shade,f=Math.min(u.tiers[gt].strands,u.maxStrands),p=o.yaw+(r.viewSway[0]-a.scale*a.viewSway[0])*Math.sin(e*r.viewRate[0]),s=o.pitch+(r.viewSway[1]-a.scale*a.viewSway[1])*Math.sin(e*r.viewRate[1]+1.3);return{i:1,gid:0,u:{uW0:t.vx,uW1:t.vx2,uW2:t.vx3,uW3:[o.sphere,o.ball,o.mouth,t.vxc[3]],uWC:[t.vxc[0],t.vxc[1],t.vxc[2],o.wires],uWR:[p*C,s*C,t.angle,0],uWB:[o.core,u.blueAmt.reach*t.outer/.85,o.wash,0]},look:Io({thick:o.thick,gain:o.gain,share:t.share,points:o.points,pointSize:o.pointSize,tips:o.tips,deep:o.deep,skin:d(o.skin,1-(1-o.skin)*Math.pow(u.tiers[0].strands/f,.8),o.wires),skinW:o.skinW,back:i.back}),treads:null,lit:void 0,floor:null,open:1,knot:yr,foot:null}}function wr(t,e,o){var r=Math.cos(e),a=Math.sin(e),i=t[0]*r+t[2]*a,f=-t[0]*a+t[2]*r,p=Math.cos(o),s=Math.sin(o);return[i,t[1]*p-f*s,t[1]*s+f*p]}function Ae(t,e,o){var r=ln(Math.min(t,1),e,o),a=r.v,i=r,f=u.shade,p=u.blueAmt,s=u.body,w=u.pointer,M=Math.min(u.tiers[gt].strands,u.maxStrands),z=1-r.wind;if(Xt.time=e,Xt.scrollY=Mt,Xt.q=t,i.rope=null,i.q=t,i.kind=0,i.mix=0,i.shA=i.shB=-1,i.u=null,i.ridge=a.wires,i.rim=a.rim,i.thick=a.thick,i.gain=a.gain,i.skinW=a.skinW,i.tips=a.tips,i.wash=a.wash,i.shade=[d(a.deep,Math.max(a.deep,f.open),z),d(a.skin,1-(1-a.skin)*Math.pow(u.tiers[0].strands/M,.8),a.wires),f.formFloor,d(f.back,Math.max(f.back,.85),z)],i.reach=p.reach*r.outer/.85,i.ring=r.core>.002?{core:r.core,at:[r.vxc[0],r.vxc[1],r.ringZ],turn:[0,0],mouth:r.mouth,outer:r.outer,bloom:a.bloom}:null,i.floors=[r.floor],i.ptsH={share:a.points,size:a.pointSize,amt:1},i.ptsS=null,i.bodyAt=[r.vxc[0],r.vxc[1]],i.turn=a.turn,i.lit=void 0,i.treads=null,i.stations=[0],i.edge=u.edge.hero,t<=1||st==="hero")return i;var g=u.secs.length-1,W=Math.max(1,Math.min(g-1,Math.floor(t))),E=x(t-W);t>=g&&(W=g-1,E=1);var K=W===1?un(r,e):null,k=K||ao(W),A=E>0?ao(W+1):k;k||(k=A),A||(A=k),i.stations=E>0?[W,W+1]:[W];var X=null,R=u.via[W+1],q=R&&E>0&&k&&A&&k.gid!==A.gid&&ae[W+.5]?ao(W+.5):null;if(q&&q.gid===k.gid&&(E<R.at?(A=q,E=E/R.at):(k=q,E=(E-R.at)/(1-R.at),X={span:[0,1],direct:R.direct,stagger:R.stagger})),i.edge=u.edge.page,i.rim=0,i.ridge=1,i.floors=[],i.ring=null,i.ptsH=null,i.core=0,i.wash=0,i.bodyAt=null,i.turn=0,!k)return i.share=0,i.shA=i.shB=0,i.u={},i.ptsS=null,i.view=kr(0,0,e),i;var B=y(E),P={},Z,j,at,$={},U=E<1e-5?0:E>1-1e-5?1:E,V=B,_={pass:0,share:[1,1],open:[1,1],cut:0,knot:[0,1,0,1],foot:null};if(k.gid===A.gid){for(Z in k.u)j=k.u[Z],at=A.u[Z]||j,P[Z]=j===at?j:[d(j[0],at[0],B),d(j[1],at[1],B),d(j[2],at[2],B),d(j[3],at[3],B)];k.gid===0&&k!==A&&k.u.uWR&&A.u.uWR&&(P.uWR[2]=d(A.u.uWR[2]+L(k.u.uWR[2]-A.u.uWR[2]),A.u.uWR[2],B)),i.shA=i.shB=k.gid,_.share=[k.look.share,A.look.share],_.open=[d(k.open,A.open,B),1];var zt=u.cutBy[W+1];_.cut=Math.abs(k.look.share-A.look.share)>1e-4?zt?x((U-zt[0])/(zt[1]-zt[0])):U:0,zt&&_.cut>=1&&(_.cut=.99999),_.foot=k.foot===null&&A.foot===null?null:[d(k.foot===null?A.foot:k.foot,A.foot===null?k.foot:A.foot,B),d(k.foot===null?0:k.open,A.foot===null?0:A.open,B)],_.knot=[d(k.knot[0],A.knot[0],B),d(k.knot[1],A.knot[1],B),0,1]}else{for(Z in k.u)P[Z]=k.u[Z];for(Z in A.u)P[Z]=A.u[Z];var At=X||u.passBy[W+1]||null,le=At&&At.span?At.span:[0,1];_.join=At&&At.join!==void 0?At.join:u.rope.pass.join,_.direct=At&&At.direct?1:0,_.stagger=At&&At.stagger!==void 0?At.stagger:_.direct?.5:u.rope.pass.stagger,U=x((U-le[0])/Math.max(1e-4,le[1]-le[0])),U=U<1e-5?0:U>1-1e-5?1:U,V=y(U),i.shA=k.gid,i.shB=A.gid,i.kind=2,i.mix=U,_.pass=U,_.share=[k.look.share,A.look.share],_.open=[k.open,A.open],_.knot=[k.knot[0],k.knot[1],A.knot[0],A.knot[1]];var We=k.foot===null?0:k.open*(1-y(U/.4)),Re=A.foot===null?0:A.open*y((U-.6)/.4);_.foot=We+Re>0?[(We*(k.foot||0)+Re*(A.foot||0))/(We+Re),Math.max(We,Re)]:null,U===0?(i.shB=k.gid,i.kind=0,_.share[1]=_.share[0],_.open[1]=_.open[0]):U===1&&(i.shA=A.gid,i.kind=0,_.pass=0,_.share[0]=_.share[1],_.open[0]=_.open[1],_.knot=[A.knot[0],A.knot[1],A.knot[0],A.knot[1]])}for(Z in u.look)$[Z]=d(k.look[Z],A.look[Z],V);if(i.u=P,i.look=$,i.share=1,i.thick=$.thick,i.gain=$.gain,i.skinW=$.skinW,i.tips=$.tips,i.shade=[$.deep,$.skin,f.formFloor,$.back],i.view=kr($.yaw,$.pitch,e),(i.shA===0||i.shB===0)&&P.uW0&&P.uWC&&P.uWR&&P.uWB&&P.uW3){var de=K?1-y(E*u.ringOut):1;K&&A!==k&&A.u.uWB&&(P.uWB=[K.u.uWB[0]*de+A.u.uWB[0]*B,P.uWB[1],P.uWB[2],P.uWB[3]]),P.uWR=[P.uWR[0]+w.turn[0]*C*b.turnX,P.uWR[1]-w.turn[1]*C*b.turnY,P.uWR[2],P.uWR[3]];var so=P.uW3[0],Ao=P.uW0[1],ar=P.uW0[2];if(i.mouth=d(Ao-ar,P.uW3[2],so),i.outer=d(Ao+ar,P.uW3[1],so),i.core=P.uWB[0],i.reach=Math.max(.01,P.uWB[1]),i.wash=P.uWB[2],i.bodyAt=[P.uWC[0],P.uWC[1]],i.turn=1,i.core>.002){var ir=wr([0,0,d(ar*P.uW0[3]*.22,P.uW3[1]*s.ringZ,so)],P.uWR[0],P.uWR[1]);i.ring={core:i.core,at:[P.uWC[0]+ir[0],P.uWC[1]+ir[1],P.uWC[2]+ir[2]],turn:[P.uWR[0],P.uWR[1]],mouth:i.mouth,outer:i.outer,bloom:K?a.bloom*de:0}}K&&de>.002&&i.floors.push({x:r.floor.x,y:r.floor.y,w:r.floor.w,shadow:r.floor.shadow*de,pool:r.floor.pool*de})}[[k,k===A?1:1-B],[A,k===A?0:B]].forEach(function(zo){var Ue=zo[0].floor;Ue&&zo[1]>.002&&i.floors.push({x:Ue[0],y:Ue[1],w:Ue[2],shadow:(Ue[3]||0)*zo[1],pool:(Ue[4]||0)*zo[1]})}),K?(i.ptsH={share:a.points,size:a.pointSize,amt:1-B},i.ptsS={share:A.look.points,size:A.look.pointSize,amt:B}):i.ptsS={share:$.points,size:$.pointSize,amt:1},i.rope=fn(_,e);var sr=k.i===7?k:A.i===7?A:null;return sr&&(i.lit=sr.lit,i.treads=sr.treads),i}var yr=[0,1],br={};function fn(t,e){var o=u.rope,r=[],a,i,f,p,s=Q;for(a=2;a<Je.length;a++)if(Je[a]){try{f=Je[a](Xt)}catch(U){br[a]||(br[a]=1,H("the way of section "+a+" threw: "+U.message)),f=null}if(f)for(i=0;i<f.length;i++)f[i]&&f[i][0]===f[i][0]&&f[i][1]===f[i][1]&&r.push(f[i])}for(p=r.length,p||(r=[[wt*.5,0,0],[wt*.5,s,0]],p=2),a=1;a<p;a++)r[a][1]<r[a-1][1]+1&&(r[a]=[r[a][0],r[a-1][1]+1,r[a][2]||0]);var w=Math.max(r[0][1],-o.pad*s),M=Math.min(r[p-1][1],(1+o.pad)*s);if(t.foot&&t.foot[1]>0&&(M=d(M,Math.min(M,Math.max(t.foot[0],w+.3*s)),y(t.foot[1]))),M-w<o.least*s){var z=o.least*s-(M-w);r[p-1][1]>M+1?M+=z:w-=z}function g(U){if(U<=r[0][1])return[r[0][0],r[0][2]||0];if(U>=r[p-1][1])return[r[p-1][0],r[p-1][2]||0];for(var V=1;r[V][1]<U;)V++;var _=y((U-r[V-1][1])/(r[V][1]-r[V-1][1]));return[d(r[V-1][0],r[V][0],_),d(r[V-1][2]||0,r[V][2]||0,_)]}var W=o.pass,E=o.soft,K=o.len,k=t.join===void 0?W.join:t.join;function A(U){var V=0,_=!1,zt=t.pass;if(zt>0&&t.direct){var At=y((zt-U*t.stagger)/(1-t.stagger)),le=y((1-t.open[0]-U*(1-E))/E),We=y((1-t.open[1]-U*(1-E))/E);return d(le+(1-le)*(1-Math.min(1,t.share[0])),We+(1-We)*(1-Math.min(1,t.share[1])),At)}if(zt>0){var Re=U*W.stagger,de=k+Re;_=zt>de,V=_?1-y((zt-de)/(1-k-W.stagger)):y((zt-Re)/k)}var so=_?t.share[1]:t.cut?d(t.share[0],t.share[1],y(t.cut)):t.share[0],Ao=_?t.open[1]:t.open[0];return V=Math.max(V,y((1-Ao-U*(1-E))/E)),V+(1-V)*(1-Math.min(1,so))}var X=o.grid[0]*s,R=o.grid[1]*s,q=new Float32Array(32);for(i=0;i<8;i++){var B=X+(R-X)*i/7,P=g(B),Z=x((B-w)/(M-w)),j=0;for(a=0;a<5;a++)j+=A(x((Z-K*a/4)/(1-K)));j/=5,q[i*4]=(P[0]-wt/2)/ot,q[i*4+1]=P[1],q[i*4+2]=Math.max(o.plyLeast,o.ply*Math.sqrt(j))}var at=2*Math.PI/o.period,$=(Mt+s/2)*at;return{flat:q,a:[(s/2-X)/ot,(s/2-R)/ot,o.swing,o.depth],y:[(s/2-w)/ot,(s/2-M)/ot,K,1],k:[$-2*Math.PI*Math.floor($/(2*Math.PI)),-at*ot,o.twist,o.sway],s:[t.share[0]>=.9995?2:t.share[0],t.share[1]>=.9995?2:t.share[1],t.open[0],t.open[1]],m:[t.pass,t.pass>0&&t.stagger!==void 0?t.stagger:W.stagger,t.pass>0&&t.direct?1:0,k],tt:[t.cut||0,o.aside,o.slide,t.cut?t.share[1]:0],c:t.knot,soft:E,top:w,foot:M}}function kr(t,e,o){var r=u.page,a=u.alive;return h((t+r.viewSway[0]*Math.sin(o*a.viewRate[0]))*C*r.scale,(e+r.viewSway[1]*Math.sin(o*a.viewRate[1]+1.3))*C*r.scale,0,Ft)}function Mr(t){var e=u.clear,o=[],r,a,i,f,p;for(i=0;i<mo.length;i++)if(r=mo[i],!(t.stations.indexOf(r.st)<0&&!(r.st===0&&t.q<=1))&&!(r.fig&&!/(^|\s)gd-in(\s|$)/.test(r.fig.className))&&(f=r.st===0?1-y((t.q-e.heroFrom)/(e.heroUntil-e.heroFrom)):1,!(f<=.002)&&(a=Uo(r.rec,Mt),!(a.t+a.h+e.pad<0||a.t-e.pad>Q)))){p=(Math.min(Q,a.t+a.h)-Math.max(0,a.t))*a.w;var s=r.st===0?e.heroPad:e.pad;o.push({l:a.l-s,t:a.t-s,r:a.l+a.w+s,b:a.t+a.h+s,on:f,area:p})}return o.sort(function(w,M){return M.area-w.area}),o.slice(0,2)}function Go(t,e){var o=c.createShader(c.VERTEX_SHADER),r=c.createShader(c.FRAGMENT_SHADER),a=c.createProgram();return c.shaderSource(o,t),c.compileShader(o),c.shaderSource(r,e),c.compileShader(r),c.attachShader(a,o),c.attachShader(a,r),c.linkProgram(a),{p:a,v:o,f:r}}function cn(t){return!Ut||!!c.getProgramParameter(t.p,Ut.COMPLETION_STATUS_KHR)}function Xo(t){var e=t.p;if(!c.getProgramParameter(e,c.LINK_STATUS))throw new Error(c.getShaderInfoLog(t.v)||c.getShaderInfoLog(t.f)||c.getProgramInfoLog(e)||"program did not link");for(var o={},r=c.getProgramParameter(e,c.ACTIVE_UNIFORMS),a=0;a<r;a++){var i=c.getActiveUniform(e,a);o[i.name]=c.getUniformLocation(e,i.name)}return{p:e,u:o}}function ze(t){var e=c.createBuffer();return c.bindBuffer(c.ARRAY_BUFFER,e),c.bufferData(c.ARRAY_BUFFER,t,c.STATIC_DRAW),e}function ie(t,e,o){c.enableVertexAttribArray(t),c.vertexAttribPointer(t,e,c.FLOAT,!1,0,0),o&&c.vertexAttribDivisor(t,o)}function wo(t){var e=et[t*4+2]*7.31+et[t*4+3]*3.77;return e-Math.floor(e)}function Qt(t,e){var o=t.u[e];return o===void 0&&(o=t.u[e]=c.getUniformLocation(t.p,e)),o}function Se(t,e){t=t||F[0];var o=Zr(t),r=t.k?String(t.hi):"",a=Ie+o+Pe+Et,i=xe+o+Pe+(t.form==="rope"?ge:Jt),f=[{name:"strand"+r,vs:ht.shader?a.replace("void main","void broken("):a,fs:je,attribs:[[0,2,0],[1,4,1]],blend:!1},{name:"point"+r,vs:i,fs:Ye,attribs:[[0,2,0],[1,4,1],[2,4,1]],blend:!0}];return!e&&(t===ee||arguments.length===0)&&f.push({name:"glow",vs:De,fs:l,attribs:[[0,2,0]],blend:!0}),f}function Ar(t,e,o){var r=t.createVertexArray(),a=[],i=o.blend,f,p,s;for(t.useProgram(e),t.bindVertexArray(r),f=0;f<o.attribs.length;f++)p=o.attribs[f],s=t.createBuffer(),a.push(s),t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,new Float32Array(16),t.STATIC_DRAW),t.enableVertexAttribArray(p[0]),t.vertexAttribPointer(p[0],p[1],t.FLOAT,!1,0,0),p[2]&&t.vertexAttribDivisor(p[0],p[2]);for(i?(t.enable(t.BLEND),i.length?t.blendFunc(i[0],i[1]):t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)):t.disable(t.BLEND),t.viewport(0,0,1,1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,1),t.bindVertexArray(null),t.deleteVertexArray(r),f=0;f<a.length;f++)t.deleteBuffer(a[f])}function hn(t,e){var o=null;t.onmessage=function(r){var a=r.data,i=performance.now(),f={kind:"done",ok:!1,why:"",programs:[]},p,s,w,M,z;try{if(!o&&(o=new OffscreenCanvas(8,8).getContext("webgl2",a.attrs),w=o&&o.getExtension("WEBGL_debug_renderer_info"),w=o?String(w?o.getParameter(w.UNMASKED_RENDERER_WEBGL):o.getParameter(o.RENDERER)):"",o&&a.soft&&new RegExp(a.soft,"i").test(w)&&(o=null),t.postMessage({kind:"ctx",ok:!!o,renderer:w}),!o))return;for(p=0;p<a.items.length;p++)s=a.items[p],s.v=o.createShader(o.VERTEX_SHADER),s.f=o.createShader(o.FRAGMENT_SHADER),s.p=o.createProgram(),o.shaderSource(s.v,s.vs),o.compileShader(s.v),o.shaderSource(s.f,s.fs),o.compileShader(s.f),o.attachShader(s.p,s.v),o.attachShader(s.p,s.f),o.linkProgram(s.p);for(p=0;p<a.items.length;p++){if(s=a.items[p],M=performance.now(),!o.getProgramParameter(s.p,o.LINK_STATUS))throw new Error(s.name+": "+(o.getShaderInfoLog(s.v)||o.getShaderInfoLog(s.f)||o.getProgramInfoLog(s.p)||"did not link"));z=performance.now(),e(o,s.p,s),o.readPixels(0,0,1,1,o.RGBA,o.UNSIGNED_BYTE,new Uint8Array(4)),f.programs.push([s.name,Math.round(z-M),Math.round(performance.now()-z)])}f.ok=!0}catch(g){f.why=String(g&&g.message||g)}f.ms=Math.round(performance.now()-i),t.postMessage(f)}}function zr(t,e,o){return{items:t,done:e,tag:o||null,hold:!1,drop:null,info:{how:"direct",ms:0,waited:0,worker:[],why:""}}}function Qo(t,e,o){!o&&(I==="live"||I==="lost")&&So.push({items:t,done:e}),Wt.push(zr(t,e,o)),yo()}function pn(){if(I!=="live"||!Zt)return!0;var t=performance.now();return dt>2&&fo&&!b.busy&&t-ke>u.warm.quietMs&&t-Oe>u.fadeInMs&&t-Ne>u.groupFadeMs}function dn(){try{return typeof Ht.calm!="function"||!!Ht.calm()}catch{return!0}}function Sr(t,e,o){var r=null,a="",i=0,f=!1;function p(){clearTimeout(i),r&&(r.onmessage=r.onerror=null,r.terminate(),r=null),a&&(URL.revokeObjectURL(a),a="")}function s(){f||(f=!0,p(),o())}try{if(ht.noworker||!window.Worker||!window.OffscreenCanvas||!window.Blob||!window.URL)throw new Error("no worker");a=URL.createObjectURL(new Blob(["("+hn.toString()+")(self,"+Ar.toString()+")"],{type:"text/javascript"})),r=new Worker(a),r.onmessage=function(w){var M=w.data||{};if(M.kind==="ctx"){M.ok||s();return}M.ok?(e.how="worker",e.worker=M.programs):e.why=String(M.why||""),s()},r.onerror=s,i=setTimeout(s,u.warm.giveUpMs),r.postMessage({attrs:lr,soft:St.source,items:t.map(function(w){return{name:w.name,vs:w.vs,fs:w.fs,attribs:w.attribs,blend:w.blend}})})}catch{setTimeout(s,0)}return function(){f=!0,p()}}function Tr(t){return t.map(function(e){return e.name+`
`+e.vs+`
`+e.fs}).join(`

`)}function yo(){if(clearTimeout(we),we=0,D||!Wt.length)return;if(!c||I!=="building"&&I!=="live"){Wt=[];return}if(I==="live"&&!dn()||!pn()&&!(Wt[0].tag&&ue&&!be&&dt>2)){we=setTimeout(yo,120);return}var t=D=Wt.shift();t.t0=performance.now();function e(){t.hold=!1,t.drop=null,D===t&&(N("warm"),mn(t))}if(lt&&lt.over&&lt.key===Tr(t.items)){t.info.how=lt.info.how,t.info.worker=lt.info.worker,t.info.why=lt.info.why,t.info.early=lt.ms,lt=null,e();return}t.hold=!0,t.drop=Sr(t.items,t.info,e)}function mn(t){var e,o={},r=0,a=!1,i=0;try{e=t.items.map(function(f){return Go(f.vs,f.fs)})}catch(f){$o(t,null,f.message);return}(function f(){if(_t=0,!(D!==t||!c)){var p;if(!a){if(Ut){for(p=0;p<e.length;p++)if(!cn(e[p])){t.info.waited++,_t=requestAnimationFrame(f);return}}else if(r<e.length&&(c.getProgramParameter(e[r++].p,c.LINK_STATUS),r<e.length)){_t=requestAnimationFrame(f);return}try{for(p=0;p<e.length;p++)o[t.items[p].name]=Xo(e[p])}catch(s){$o(t,null,s.message);return}a=!0}if(t.info.how!=="worker"&&i<t.items.length){Ar(c,o[t.items[i].name].p,t.items[i]),i++,I==="live"&&rt&&!Yt&&dt>2&&(Te(),Ot(rt)),_t=requestAnimationFrame(f);return}$o(t,o,"")}})()}function $o(t,e,o){if(D===t){D=null,t.info.ms=Math.round(performance.now()-t.t0),o&&(t.info.why=o);try{typeof t.done=="function"&&t.done(e,t.info)}catch(r){H("warm: "+r.message)}yo()}}function Wr(){clearTimeout(we),we=0,_t&&(cancelAnimationFrame(_t),_t=0),D&&D.drop&&D.drop(),D=null,Wt=[]}function vn(){var t=pe(Y===null?0:Y),e={};F.forEach(function(o){o.strand=o.point=null,o.state!=="failed"&&(o.state="none")}),ee=t,ye="",Se(t).forEach(function(o){e[o.name]=Xo(Go(o.vs,o.fs))}),Rr(e,t)}function Rr(t,e){vt={glow:t.glow},jo(e,t);var o=new Float32Array((bt+1)*4),r;for(r=0;r<=bt;r++)o[r*4]=r,o[r*4+1]=-1,o[r*4+2]=r,o[r*4+3]=1;for(var a=v(77),i=new Float32Array(Lt*4),f=new Float32Array(Lt*4),p=0,s=u.track.count[0][1]/Math.min(u.tiers[0].strands,u.maxStrands)-.04,w={},M=u.tiers.length-1;M>=0;M--){var z=[],g=[],W=Math.min(u.tiers[M].strands,u.maxStrands),E=Math.min(u.tiers[M].points,Lt);for(r=0;r<W;r++)wo(r)<s&&(z.push(r),w[r]||g.push(r));for(z.length||z.push(0),r=p;r<E;r++){var K=a(),k=K<.64&&g.length>0,A=k?g.shift():z[Math.floor(a()*z.length)];k&&(w[A]=!0),i.set(et.subarray(A*4,A*4+4),r*4),f[r*4]=k?1:.2+.72*a(),f[r*4+1]=k?16+10*a():K>.86?8+6*a():5+4*a(),f[r*4+2]=a(),f[r*4+3]=k?0:K>.86?1:2}p=Math.max(p,E)}var X=u.pagePoints[0],R=new Float32Array(X*4),q=new Float32Array(X*4);for(a=v(77),r=0;r<X;r++){var B=Math.floor(a()*500),P=a()<.35;R.set(et.subarray(B*4,B*4+4),r*4),q[r*4]=.15+.75*a(),q[r*4+1]=P?14+8*a():5+5*a(),q[r*4+2]=a(),q[r*4+3]=P?0:1}Oo=u.tiers.map(function(at){var $=Math.min(at.strands,u.maxStrands),U=[],V,_=new Float32Array($*4),zt=new Float32Array($);for(V=0;V<$;V++)U.push(V);for(u.sortStrands&&U.sort(function(At,le){return wo(At)-wo(le)||At-le}),V=0;V<$;V++)_.set(et.subarray(U[V]*4,U[V]*4+4),V*4),zt[V]=wo(U[V]);return{n:$,data:_,picks:zt}}),xt={strand:[],point:c.createVertexArray(),pointS:c.createVertexArray(),quad:c.createVertexArray()};var Z=ze(o);Oo.forEach(function(at){var $=c.createVertexArray();c.bindVertexArray($),c.bindBuffer(c.ARRAY_BUFFER,Z),ie(0,2,0),ze(at.data),ie(1,4,1),xt.strand.push($)}),c.bindVertexArray(xt.point);var j=ze(new Float32Array([-1,-1,1,-1,-1,1,1,1]));ie(0,2,0),ze(i),ie(1,4,1),ze(f),ie(2,4,1),c.bindVertexArray(xt.pointS),c.bindBuffer(c.ARRAY_BUFFER,j),ie(0,2,0),ze(R),ie(1,4,1),ze(q),ie(2,4,1),c.bindVertexArray(xt.quad),c.bindBuffer(c.ARRAY_BUFFER,j),ie(0,2,0),c.bindVertexArray(null)}function xn(t){var e=Oo[gt];if(t>=.999||!u.sortStrands)return e.n;for(var o=t+.031,r=0,a=e.n,i;r<a;)i=r+a>>1,e.picks[i]<=o?r=i+1:a=i;return r}function Te(){var t=u.tiers[gt];kt=Math.min(window.devicePixelRatio||1,t.dprCap,Math.sqrt(t.pixelCap/Math.max(1,wt*Q)));var e=Math.max(1,Math.round(wt*kt)),o=Math.max(1,Math.round(Q*kt));(e!==ut||o!==pt)&&(ut=O.width=e,pt=O.height=o)}function Er(t,e){var o=t.u,r=u.pointer,a=b.finger?r.fingerRadius:r.radius,i=e.u||{},f;c.useProgram(t.p),c.uniform1f(o.uTime,e.time),c.uniform1f(o.uShare,e.share>=.999?2:e.share),c.uniform1f(o.uRidge,e.ridge),c.uniform4fv(o.uHg,e.hg),c.uniform4fv(o.uHg2,e.hg2),c.uniform4fv(o.uHg3,e.hg3),c.uniform4fv(o.uHg4,e.hg4),c.uniform3fv(o.uHg5,e.hg5),c.uniform4fv(o.uOp,e.op),c.uniform4fv(o.uOp2,e.op2),c.uniform4fv(o.uOp3,e.op3),c.uniform4fv(o.uVx,e.vx),c.uniform4fv(o.uVx2,e.vx2),c.uniform4fv(o.uVx3,e.vx3),c.uniform4fv(o.uVx4,e.vx4),c.uniform4fv(o.uVxC,e.vxc),c.uniform1i(o.uShA,e.shA),c.uniform1i(o.uShB,e.shB);var p=e.rope;p&&(c.uniform4fv(Qt(t,"uRp[0]"),p.flat),c.uniform4fv(Qt(t,"uRpA"),p.a),c.uniform4fv(Qt(t,"uRpY"),p.y),c.uniform4fv(Qt(t,"uRpK"),p.k),c.uniform4fv(Qt(t,"uRpS"),p.s),c.uniform4fv(Qt(t,"uRpM"),p.m),c.uniform4fv(Qt(t,"uRpT"),p.tt),c.uniform4fv(Qt(t,"uRpC"),p.c),c.uniform1f(Qt(t,"uRpSoft"),p.soft));for(f in i)c.uniform4fv(Qt(t,f),i[f]);c.uniformMatrix4fv(o.uView,!1,e.view),c.uniformMatrix4fv(o.uProj,!1,ft),c.uniform4f(o.uStage,2*ot/wt,2*ot/Q,0,e.shiftNdc),c.uniform1f(o.uCamD,Ft),c.uniform4f(o.uPtr,b.ax,b.ay,e.ptrA,a),c.uniform4f(o.uPtr2,b.bx,b.by,e.ptrB,a*1.15),c.uniform3f(o.uPtrAmt,r.aside,r.gather,0),c.uniform2f(o.uPulse,e.pulse[0],e.pulse[1]),c.uniform1f(o.uPulseW,r.pulseWidth),c.uniform4fv(Qt(t,"uKc[0]"),e.kcRect),c.uniform4f(o.uKcAmt,Math.max(1,(e.q<=1?u.clear.heroSoft:u.clear.soft)*kt),u.clear.dark,e.kcOn[0],e.kcOn[1])}function bo(t,e,o,r,a){var i=vt.glow.u;c.uniform1f(i.uKind,t),c.uniform1f(i.uAmt,e),c.uniform2f(i.uSize,o,r),c.uniform3f(i.uPos,a[0],a[1],a[2]),c.drawArrays(c.TRIANGLE_STRIP,0,4)}function Ot(t){var e=c,o=u.tiers[gt],r=u.light,a=u.shade,i=u.blueAmt,f=u.blue,p=u.floor,s;if(e.viewport(0,0,ut,pt),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.depthMask(!0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),!!t){var w=t.G;if(!(!w||w.state!=="ready")){if(!tn(w,t)){To[w.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]||(To[w.k+"/"+t.shA+"/"+t.shB+"/"+t.kind]=1,H("group "+w.k+" (stations "+w.lo+" to "+w.hi+") cannot draw shapes "+t.shA+" and "+t.shB+" with passage kind "+t.kind+": see CONF.groups"));return}Ho=!1;var M=Math.sin(t.time*u.pulse.rate),z=t.time,g=t.fade===void 0?1:t.fade;if(t.shiftNdc=-2*ro/Q,st==="hero"){var W=Math.max(0,Math.min(pt,Math.round((nt.stageH+ro)*kt)));e.enable(e.SCISSOR_TEST),e.scissor(0,pt-W,ut,W)}if(t.ptrA=t.quiet?0:b.a,t.ptrB=t.quiet?0:b.b,t.pulse=[-9,-9],!t.quiet)for(s=0;s<Dt.length&&s<2;s++)t.pulse[s]=-.15+1.35*(z-Dt[s])/u.pointer.pulse;var E=Mr(t),K=new Float32Array(8);for(t.kcOn=[0,0],s=0;s<2;s++)E[s]?(K.set([E[s].l*kt,(Q-E[s].b)*kt,E[s].r*kt,(Q-E[s].t)*kt],s*4),t.kcOn[s]=E[s].on):K.set(jr,s*4);for(t.kcRect=K,t.kc=E,e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),e.disable(e.DEPTH_TEST),e.useProgram(vt.glow.p),e.uniformMatrix4fv(vt.glow.u.uView,!1,t.view),e.uniformMatrix4fv(vt.glow.u.uProj,!1,ft),e.uniform4f(vt.glow.u.uStage,2*ot/wt,2*ot/Q,0,t.shiftNdc),e.uniform3f(vt.glow.u.uBlue,f[0],f[1],f[2]),e.uniform2f(vt.glow.u.uTurn,0,0),e.bindVertexArray(xt.quad),s=0;s<t.floors.length;s++){var k=t.floors[s];p.shadow*k.shadow>.002&&bo(3,p.shadow*k.shadow*g,k.w*1.5,.15,[k.x+.03,k.y-.02,-Ft]),p.pool*k.pool>.002&&bo(4,p.pool*k.pool*(.92+.08*M)*g,k.w*1.15,.17,[k.x+k.w*.2,k.y-.05,-Ft])}e.disable(e.BLEND),e.depthMask(!0),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),Er(w.strand,t);var A=xn(t.share),X=Math.min(o.segments,bt),R=w.strand.u;if(e.uniform1f(R.uSeg,X),e.uniform1f(R.uWidth,u.width*sn()),e.uniform1f(R.uWMul,t.thick),e.uniform1f(R.uMinPx,u.minPx),e.uniform1f(R.uPxUnit,ot*kt),e.uniform1f(R.uCore,t.core),e.uniform1f(R.uBreath,M),e.uniform1f(R.uWave,u.pulse.wave),e.uniform1f(R.uMouth,t.mouth),e.uniform3f(R.uReach,t.reach,i.lean,i.glare),e.uniform1f(R.uWash,t.wash),e.uniform1f(R.uTips,t.tips),e.uniform1f(R.uTipWash,i.tipWash),e.uniform1f(R.uRim,t.rim),e.uniform2f(R.uVar,a.strandVar,a.darkShare),e.uniform1f(R.uExposure,u.exposure*t.gain),e.uniform1f(R.uSkinW,t.skinW),e.uniform1f(R.uGlint,r.glint),e.uniform1f(R.uKick,i.kick),e.uniform1f(R.uArmSide,r.armSide),e.uniform4f(R.uLight,r.key,r.strips,r.fill,r.room),e.uniform4fv(R.uArms,r.arms),e.uniform4fv(R.uShade,t.shade),e.uniform3f(R.uBlue,f[0],f[1],f[2]),e.uniform4f(R.uBlueAmt,i.tint,i.light,i.hot,i.sheen),e.uniform4f(R.uFade,g,t.edge>0?t.edge*Math.min(ut,pt):0,ut,pt),A>0&&(e.bindVertexArray(xt.strand[gt]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,(X+1)*2,A)),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),e.depthFunc(e.LEQUAL),t.ring&&t.ring.core>.002){var q=t.ring;e.disable(e.DEPTH_TEST),e.useProgram(vt.glow.p),e.bindVertexArray(xt.quad),e.uniform1f(vt.glow.u.uRingR,1/3),e.uniform2f(vt.glow.u.uHaze,i.haze[0],i.haze[1]);var B=t.view,P=q.outer*.9,Z=wr([0,0,P],q.turn[0],q.turn[1]),j=[q.at[0]+Z[0],q.at[1]+Z[1],Z[2]];q.bloom*i.bloom>.002&&bo(4,q.bloom*i.bloom*(.9+.1*M)*g,q.outer*1.05,q.outer*1.05,[B[0]*j[0]+B[4]*j[1]+B[8]*j[2]+B[12],B[1]*j[0]+B[5]*j[1]+B[9]*j[2]+B[13],B[2]*j[0]+B[6]*j[1]+B[10]*j[2]+B[14]]),e.uniform2f(vt.glow.u.uTurn,q.turn[0],q.turn[1]),bo(0,q.core*(.94+.06*M)*i.ring*g,q.mouth*3,q.mouth*3,q.at),e.enable(e.DEPTH_TEST)}if(t.ptsH||t.ptsS){Er(w.point,t);var at=w.point.u,$=Math.max(.7,Math.min(1.15,ot/420)),U=[[t.ptsH,xt.point,Math.min(o.points,Lt)],[t.ptsS,xt.pointS,Math.min(u.pagePoints[gt],u.pagePoints[0])]];for(e.uniform2f(at.uRes,ut,pt),e.uniform1f(at.uTravel,u.alive.travel),e.uniform1f(at.uSparkle,t.quiet?0:u.alive.sparkle),e.uniform1f(at.uPtLift,.07),e.uniform1f(at.uRim,t.rim),e.uniform3f(at.uBlue,f[0],f[1],f[2]),s=0;s<2;s++){var V=U[s][0];!V||V.amt*V.share<=.002||(e.uniform1f(at.uPtShare,V.share),e.uniform1f(at.uPtScale,kt*$*V.size),e.uniform1f(at.uPointAmt,i.points*V.amt*g),e.bindVertexArray(U[s][1]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,U[s][2]))}}e.bindVertexArray(null)}}}function Zo(t,e,o){b.cx=t,b.cy=e,b.on=o,ke=performance.now(),mt()}function Pr(){return Y!==null&&Y<1}function gn(t){if(t.pointerType==="touch"){if(!b.down||Pr())return;b.finger=!0}else b.finger=!1;Zo(t.clientX,t.clientY,1)}function wn(t){if(!(t.pointerType==="mouse"&&t.button!==0)){if(b.down=!0,b.finger=t.pointerType==="touch",b.downAt=[t.clientX,t.clientY,performance.now()],b.finger&&Pr()){ke=performance.now();return}Zo(t.clientX,t.clientY,1)}}function yn(t){var e=b.downAt;b.down&&e&&Math.abs(t.clientX-e[0])+Math.abs(t.clientY-e[1])<12&&performance.now()-e[2]<600&&Jo(),b.down=!1,b.downAt=null,t.pointerType==="touch"&&(b.on=0)}function bn(){b.down=!1,b.downAt=null,b.on=0}function Nr(){b.on=0}function Hr(){return!Bo&&!/(^|\s)menu-open(\s|$)/.test(yt.className)}function Jo(){I!=="live"||!Hr()||re||(Dt.unshift(fe),Dt.length>2&&(Dt.length=2),mt())}function kn(t){var e=u.pointer,o=t/16.667,r=(b.cx-wt/2)/ot,a=(Q/2+ro-b.cy)/ot,i=b.cy>=0&&b.cy<=Q,f=!i||!Hr()?0:b.on;f&&b.a<.004&&b.b<.004&&(b.ax=b.bx=r,b.ay=b.by=a);var p=1-Math.pow(1-e.follow[0],o),s=1-Math.pow(1-e.follow[1],o);f&&(b.ax+=(r-b.ax)*p,b.ay+=(a-b.ay)*p),b.bx+=(b.ax-b.bx)*s,b.by+=(b.ay-b.by)*s;var w=1-Math.pow(1-(f>b.a?e.rise:e.fall),o);b.a+=(f-b.a)*w,b.b+=(b.a-b.b)*(1-Math.pow(1-e.fall*1.6,o));var M=Ze?b.a*Math.tanh((b.ax-Ze[0])/1.1):0,z=Ze?b.a*Math.tanh((b.ay-Ze[1])/.8):0,g=1-Math.pow(1-.06,o);for(b.turnX+=(M-b.turnX)*g,b.turnY+=(z-b.turnY)*g,b.busy=Math.abs(f-b.a)>.003||b.b>.003&&Math.abs(b.a-b.b)>.003||f>0&&(Math.abs(r-b.ax)+Math.abs(a-b.ay)>.002||Math.abs(b.ax-b.bx)+Math.abs(b.ay-b.by)>.002)||Math.abs(M-b.turnX)+Math.abs(z-b.turnY)>.003;Dt.length&&fe-Dt[Dt.length-1]>e.pulse*1.1;)Dt.pop();return Xt.ptr.x=b.ax,Xt.ptr.y=b.ay,Xt.ptr.on=b.a,b.busy||Dt.length>0}function Mn(t,e){var o=!1,r,a,i=1-Math.exp(-t/(u.hoverS*1e3/3));for(r=0;r<3;r++)Math.abs(Ce[r]-to[r])>.004?(to[r]+=(Ce[r]-to[r])*i,o=!0):to[r]=Ce[r];for(r=0;r<3;r++){var f=0;e>5&&e<7&&Lo[r]&&(f=parseFloat(Lo[r].style.getPropertyValue("--b"))||0),f!==qo[r]&&(qo[r]=f,o=!0)}for(r in xo)a=xo[r],Math.abs(a.to-a.v)>.001?(a.v+=(a.to-a.v)*(1-Math.exp(-t/(a.s*1e3/3))),o=!0):a.v=a.to;return o}function ko(t){if(t!==eo){for(var e=0;e<3;e++){var o=pr[e];o&&(e<t?o.getAttribute("data-scene-lit")!=="1"&&o.setAttribute("data-scene-lit","1"):o.hasAttribute("data-scene-lit")&&o.removeAttribute("data-scene-lit"))}eo=t}}function Mo(t){if(Ze=t.bodyAt&&t.turn>0?t.bodyAt:null,st==="page"){if(t.lit!==void 0){oo=!0,ko(Math.max(0,Math.min(3,Math.round(t.lit))));return}if(oo===void 0&&ae[7]){var e=ao(7);oo=!!(e&&e.lit!==void 0)}oo&&(t.q>=8?ko(3):t.q<=6&&ko(0))}}function Br(t){var e=pe(Y),o;return e.state==="ready"?(ue&&(ue=!1,be&&Kt!==null&&Math.abs(e.k-pe(Kt).k)<=1?Y=Kt:dt>2&&(Ne=t),be=!1,e=pe(Y)),{q:Y,G:e}):(rn(e),o=en(Y),o&&!An(o.q,Mt)&&(o=null),ue=!0,be=!!o,o||{q:Y,G:null})}function An(t,e){var o,r,a=.35*Q,i;if(t<=1)o=nt.top,r=nt.top+nt.h;else{if(o=Gt[t],o==null)return!0;for(r=lo+It,i=t+1;i<Gt.length;i++)if(Gt[i]!==null&&Gt[i]!==void 0){r=Gt[i];break}}return r+a>e&&o-a<e+Q}function mt(){I==="live"&&!Zt&&!document.hidden&&(Zt=requestAnimationFrame(er))}function tr(){Zt&&cancelAnimationFrame(Zt),Zt=0,$t=0}function zn(t){if(document.hidden)return"hidden";var e=yt.className;if(/(^|\s)wk-open(\s|$)/.test(e))return"project";if(/(^|\s)offer-open(\s|$)/.test(e))return"offer";if(u.sleepUnderMenu&&/(^|\s)menu-open(\s|$)/.test(e))return"menu";if(st==="hero")return t>=nt.top+nt.h?"stage-out":"";if(vo){var o=u.proof,r=mr(vo,t)-t,a=r+vo.h,i=o.whole?0:o.melt;if((Math.min(a-i,Q)-Math.max(r+i,0))/Q>=o.cover)return"proof"}return""}function Or(t){if(yt.classList.add("scene-on"),Oe=t,N("on"),!Ge&&(Ge=!0,typeof Ht.onReady=="function"))try{Ht.onReady()}catch{}}function er(t){if(D&&D.hold&&I==="live"&&!ht.nohold){$t=0,Zt=requestAnimationFrame(er);return}if(dt>2){Fr(t);return}var e=performance.now();Fr(t),Vt.frames.push(+(performance.now()-e).toFixed(1))}function Fr(t){if(Zt=0,!(I!=="live"||document.hidden)){var e=$t?Math.min(100,t-$t):16.667,o=$t?t-$t:0;$t=t,fr++,co=!1,oe&&Me();var r=window.scrollY,a=r!==Mt,i=Math.abs(r-Mt)>u.jump.windows*Q;Mt=r,ro=st==="hero"?Math.min(0,nt.top+nt.h-r-nt.stageH):0;var f=G?"":zn(r);if(f){if(f==="proof"&&re!=="proof"&&dt>2&&!Yt){Te(),jt=Y=go(r);var p=Br(t),s=Ae(p.q,fe,uo);s.G=p.G,s.fade=1,Kt=p.q,Mo(s),Ot(s),dt++,co=!0,rt=s}f==="stage-out"&&re!=="stage-out"&&dt>2&&!Yt&&(Te(),Ot(null)),f==="stage-out"&&dt<2&&!Yt&&(Te(),Ot(null),dt=3,Or(t-u.fadeInMs-1)),re=f,ce=!0,$t=0;return}re="",Te(),jt=G?G.q:go(r),Y===null||ce||G||i&&Math.abs(jt-Y)>u.jump.stations||jt<=1&&Y<=1?Y=jt:(Y+=(jt-Y)*(1-Math.pow(1-u.smooth,e/16.667)),Math.abs(jt-Y)<2e-4&&(Y=jt)),ce=!1;var w=G?null:Br(t);fo=Y===jt;var M,z=!fo||a,g=1;if(G?(M=Ae(G.q,G.t),M.quiet=!0,M.G=xr(G.q)):(fe+=e/1e3,Y>=u.swirl.gate[1]&&(uo+=u.body.spin*e/1e3),kn(e)&&(z=!0),Mn(e,Y)&&(z=!0),M=Ae(w.q,fe,uo),M.G=w.G,Oe?(g=x((t-Oe)/u.fadeInMs),g<1&&(z=!0)):g=0,Ne&&t-Ne<u.groupFadeMs&&(g=Math.min(g,x((t-Ne)/u.groupFadeMs)),z=!0)),M.fade=g,Kt=G?G.q:w.q,Mo(M),ue&&!G&&!M.G&&dt>2){!Ho&&!Yt&&(Ot(null),Ho=!0),re="waiting",ce=!0,$t=0,rt=M;return}var W=t-ke>u.idleAfterMs,E=Po!==null?Po:gt>0||W?u.idleEvery:1,K=Yt||!G&&!z&&dt>2&&(E===0||E>1&&fr%E!==0);if(Yt&&!No&&(Ot(null),No=!0),K||(Ot(M),dt++,co=!0,dt===1&&N("frame"),dt===2&&(Or(t),st==="page"&&setTimeout(Yo,0))),rt=M,G||Tn($e||o),I==="live"){if(G&&dt>2){$t=0;return}Zt=requestAnimationFrame(er)}}}function Sn(){if(I==="live"){var t=Me();if(t){if(co&&rt&&!Yt){var e=G?Ae(G.q,G.t):Ae(Kt===null?0:Kt,fe,uo);e.quiet=rt.quiet,e.fade=rt.fade,e.G=rt.G,Te(),Mo(e),Ot(e),rt=e}mt()}}}function Cr(){return{warm:0,list:[],cool:0,recent:[],calm:0,upped:!1}}function Tn(t){if(t&&(J.recent.push(t),J.recent.length>60&&J.recent.shift(),!(cr&&!$e))){if(J.cool>0){J.cool--;return}if(J.warm<u.warmup){J.warm++;return}if(J.list.push(t),!(J.list.length<u.window)){var e=T(J.list);if(J.list=[],e>u.slowMs){if(J.cool=u.cooldown,J.calm=0,J.upped&&(ho.fails++,J.upped=!1),gt<u.tiers.length-1){gt++,ut=pt=0;return}qe("too-slow");return}if(e>u.fastMs){J.calm=0;return}J.calm+=u.window,!(J.calm<u.calm*Math.pow(2,ho.fails))&&(J.calm=0,J.upped=!1,gt>Ro&&ho.fails<u.retries&&(gt--,ut=pt=0,J.upped=!0))}}}var Wn="html.scene-on .stage{background:transparent}html.scene-on .stage .poster,html.scene-on .stage .hero-video,html.scene-on .stage.video-ready .hero-video,html.scene-on .stage.rev-on .hero-video.rev{opacity:0}html.scene-on .stage .poster{visibility:hidden;transition:opacity 1.1s var(--ease),visibility 0s linear 1.1s}html.scene-on .stage .hero-video{visibility:hidden}html.scene-on .stage .scrim{display:none}html.scene-on body:not(.bg-on) .bg-wrap{transition-duration:.12s}";function Rn(){var t=parseInt(Pt.get("scene-tier"),10);if(ht.tier!==void 0)return ht.tier;if(t>=0&&t<u.tiers.length)return t;var e=window.matchMedia&&(window.matchMedia("(max-width: 820px)").matches||window.matchMedia("(pointer: coarse)").matches);return e?1:0}function Lr(t){return I!=="off"&&io(),Ht=t||{},st=Ht.mode==="hero"?"hero":"page",He="",N("start"),Vt={begin:0,send:0,waited:0,take:0,frames:[]},Pn(),lt&&!lt.over?(I="building",lt.then=function(){I==="building"&&!c&&qr()},!0):qr()}function qr(){var t=performance.now(),e=window.scrollY;O=document.createElement("canvas"),O.className="sfs-scene",O.setAttribute("aria-hidden","true"),O.style.cssText="position:fixed;left:0;top:0;width:100%;height:100vh;height:100lvh;z-index:0;pointer-events:none;display:block";var o=document.querySelector(".env");if(o&&o.parentNode?o.parentNode.insertBefore(O,o.nextSibling):document.body.insertBefore(O,document.body.firstChild),c=ht.nogl?null:O.getContext("webgl2",lr),!c)return Vr(),qe("no-webgl2");Tt=c.getExtension("WEBGL_lose_context");var r=c.getExtension("WEBGL_debug_renderer_info");if(Wo=String(r?c.getParameter(r.UNMASKED_RENDERER_WEBGL):c.getParameter(c.RENDERER)),ht.software||St.test(Wo))return io(),qe("software-renderer");if(Ut=c.getExtension("KHR_parallel_shader_compile"),Vt.context=+(performance.now()-t).toFixed(1),gr(st==="hero"?null:window.__sceneShapes),O.addEventListener("webglcontextlost",_r),O.addEventListener("webglcontextrestored",Kr),st==="hero"&&!document.getElementById("sfs-scene-style")&&(qt=document.createElement("style"),qt.id="sfs-scene-style",qt.textContent=Wn,document.head.appendChild(qt)),Ro=Rn(),gt=Ro,dt=0,Oe=0,ut=pt=0,Y=null,oe=!0,Be="",Fe={},eo=-1,oo=void 0,ke=performance.now(),J=Cr(),ho={fails:0},re="",ce=!1,Yt=!1,Ge=!1,Kt=null,ue=!1,be=!1,Ne=0,ee=F[0],st==="page"&&!Xe&&e>2*window.innerHeight){try{Me(),Mt=e,Le(),ee=pe(go(e))}catch{ee=F[0]}oe=!0,Be=""}return I="building",Ur(),Vt.begin=+(performance.now()-t).toFixed(1),!0}function En(t){if(!(!(window.GestureEvent||ht.prepare)||I!=="off"||lt||ht.nogl||ht.software||ht.noworker)){st=t&&t.mode==="hero"?"hero":"page",gr(st==="hero"?null:window.__sceneShapes),ee=F[0];var e=Se(),o=performance.now(),r={key:Tr(e),over:!1,then:null,drop:null,ms:0,info:{how:"direct",worker:[],why:""}};lt=r,r.drop=Sr(e,r.info,function(){if(r.over=!0,r.ms=Math.round(performance.now()-o),N("prepared"),r.then){var a=r.then;r.then=null,a()}})}}function Ur(){if(I==="building"){var t=performance.now(),e=ee,o=Se(e);Vt.send=+(performance.now()-t).toFixed(1),Qo(o,function(r,a){if(I==="building"){if(Vt.warm=a,Vt.waited=a.waited,!r){if(e!==F[0]&&!ht.shader){e.state="failed",H("the programs of stations "+e.lo+" to "+e.hi+" did not link: "+a.why),ee=F[0],Ur();return}H(a.why),io(),qe("shader-failed");return}var i=performance.now();Rr(r,e),Vt.take=+(performance.now()-i).toFixed(1),N("built"),I="live",mt()}},e)}}function Vr(){O&&O.parentNode&&O.parentNode.removeChild(O),O=null,c=null,vt=null,xt=null,Tt=null,Ut=null}function io(){tr(),clearTimeout(Eo),Wr(),So=[],lt&&lt.then&&(lt.then=null,lt.over||(lt.drop(),lt=null)),O&&(O.removeEventListener("webglcontextlost",_r),O.removeEventListener("webglcontextrestored",Kr)),c&&Tt&&!c.isContextLost()&&Tt.loseContext(),Vr(),qt&&qt.parentNode&&qt.parentNode.removeChild(qt),qt=null,/(^|\s)scene-on(\s|$)/.test(yt.className)&&yt.classList.remove("scene-on"),eo>0&&ko(0),I="off",G=null,rt=null,F.forEach(function(t){t.strand=t.point=null,t.state!=="failed"&&(t.state="none")}),Qe=!1,ye="",ue=!1,be=!1}function qe(t){if(I!=="off"&&io(),He=t,typeof Ht.onFail=="function")try{Ht.onFail(t)}catch{}return!1}function _r(t){t.preventDefault(),t.target===O&&(tr(),Wr(),I="lost",He="context-lost",F.forEach(function(e){e.strand=e.point=null,e.state!=="failed"&&(e.state="none")}),Qe=!1,Eo=setTimeout(function(){I==="lost"&&qe("context-lost")},u.lostWaitMs))}function Kr(t){if(t.target===O){clearTimeout(Eo),Tt=c.getExtension("WEBGL_lose_context")||Tt,Ut=c.getExtension("KHR_parallel_shader_compile");try{vn()}catch{return qe("shader-failed")}I="live",He="",dt=0,Oe=0,ut=pt=0,ce=!0,mt(),So.forEach(function(e){Wt.push(zr(e.items,e.done))}),yo(),st==="page"&&setTimeout(Yo,0)}}function se(){oe=!0,mt()}function or(){ke=performance.now()}function rr(t){var e=t&&t.closest?t.closest("#services .cards .card"):null;return e?dr.indexOf(e):-1}function Pn(){if(!ur){ur=!0;var t={passive:!0};Co=new WeakSet,po=new WeakMap,window.ResizeObserver&&(Fo=new ResizeObserver(Sn)),window.MutationObserver&&(hr=new MutationObserver(function(){mt()}),hr.observe(yt,{attributes:!0,attributeFilter:["class"]})),window.addEventListener("scroll",function(){ke=performance.now(),mt()},t),window.addEventListener("resize",function(){po=new WeakMap,se()},t),window.addEventListener("load",se,t),window.addEventListener("pageshow",se,t),document.addEventListener("visibilitychange",function(){document.hidden?tr():(ce=!0,mt())}),document.fonts&&(document.fonts.ready&&document.fonts.ready.then(se),document.fonts.addEventListener&&document.fonts.addEventListener("loadingdone",se)),document.addEventListener("toggle",function(e){se(),e.target&&e.target.closest&&e.target.closest("#faq")&&Y>9.5&&Y<10.5&&Jo()},!0),document.addEventListener("click",function(e){e.target&&e.target.closest&&e.target.closest('[role="tab"]')&&se()},t),document.addEventListener("load",function(e){e.target&&e.target.tagName==="IMG"&&/gd-img/.test(e.target.className)&&se()},!0),window.addEventListener("pointermove",gn,t),window.addEventListener("pointerdown",wn,t),window.addEventListener("pointerup",yn,t),window.addEventListener("pointercancel",bn,t),document.addEventListener("pointerleave",Nr,t),window.addEventListener("blur",Nr),window.addEventListener("keydown",or,t),window.addEventListener("wheel",or,t),window.addEventListener("touchstart",or,t),document.addEventListener("pointerover",function(e){for(var o=rr(e.target),r=0;r<3;r++)Ce[r]=r===o?1:0;o>=0&&mt()},t),document.addEventListener("focusin",function(e){var o=rr(e.target);o>=0&&(Ce[o]=1,mt()),Bo=!!(e.target&&e.target.closest&&e.target.closest("#start form"))},t),document.addEventListener("focusout",function(e){var o=rr(e.target);o>=0&&(Ce[o]=0,mt()),Bo=!1},t)}}function Ir(){var t=new Uint8Array(ut*pt*4);return c.readPixels(0,0,ut,pt,c.RGBA,c.UNSIGNED_BYTE,t),t}function Nn(){for(var t=Ir(),e=2166136261,o=0;o<pt;o+=3)for(var r=o*ut*4,a=r+ut*4;r<a;r+=12)e^=t[r],e=Math.imul(e,16777619),e^=t[r+1],e=Math.imul(e,16777619),e^=t[r+2],e=Math.imul(e,16777619),e^=t[r+3],e=Math.imul(e,16777619);return(e>>>0).toString(16)}function nr(t,e){oe&&Me(),Mt=window.scrollY,ro=st==="hero"?Math.min(0,nt.top+nt.h-Mt-nt.stageH):0,Te();var o=Ae(t,e);return o.quiet=!0,o.fade=1,o.G=xr(t),Kt=t,Mo(o),Ot(o),rt=o,o}var tt={start:function(t){return Lr(t)},prepare:En,stop:function(){I!=="off"&&io(),He="stopped"},refresh:se,busy:function(){return!!(D&&D.hold)||!!(lt&&!lt.over)},state:function(){var t=u.tiers[gt]||{};return{mode:I,scene:st,reason:He,tier:gt,q:Y===null?null:+Y.toFixed(4),target:+jt.toFixed(4),station:Y===null?null:Math.round(Y),drawing:!!Zt&&!re&&!Yt,sleeping:re,frameMs:+T(J.recent).toFixed(2),settled:fo,pinned:!!G,warming:D?D.hold?"worker":"own":Wt.length?"waiting":"",renderer:Wo,ratio:+kt.toFixed(3),size:[ut,pt],unit:+ot.toFixed(1),strands:t.strands,segments:t.segments,drawn:dt,startMs:Vt,parallel:!!Ut,time:+fe.toFixed(3),lit:eo,files:ne.map(function(e){return e.id}),shapes:Bt.map(function(e){return e.fn}),stations:ae.map(function(e,o){return e?e.file.id:o<2?"engine":null}),pointer:[+b.ax.toFixed(3),+b.ay.toFixed(3),+b.a.toFixed(3),+b.b.toFixed(3)],turn:[+b.turnX.toFixed(3),+b.turnY.toFixed(3)],pulses:Dt.length,groups:F.map(function(e){return{from:e.lo,to:e.hi,shapes:(e.hero?["heroCurve"]:[]).concat(e.ids.map(function(o){return Bt[o]?Bt[o].fn:String(o)})),form:e.form,state:e.state,ms:e.info?e.info.ms:null,how:e.info?e.info.how:null,waited:e.info?e.info.waited:null,worker:e.info?e.info.worker:null}}),live:ye?ye.split(",").map(Number):[],drawQ:Kt===null?null:+Kt.toFixed(4),standIn:ue,standSeen:be}}};Nt&&(tt.conf=u,tt.log=function(){return it.slice()},tt.programs=function(){return Se()},tt.warm=function(t,e){Qo(t,e)},tt.groupPrograms=function(){return Le(),F.map(function(t){return Se(t,!0)})},tt.groupsAsk=function(t){if(t&&t.length){Le(),t.forEach(function(e){F[e]&&F[e].state==="none"&&Do(F[e])});return}ht.nogroups=!1,Yo()},tt.qAt=function(t){if(oe&&O&&Me(),t===void 0)return go(window.scrollY);var e=nt.h-It,o=e>1?x((t-nt.top)/e):0;return st==="hero"||o<1||t<=_o()?o:Ko(t)},tt.dump=function(t,e){if(I!=="live")return null;oe&&Me(),Mt=window.scrollY;var o=Ae(+t,e===void 0?fe:+e),r=Mr(o),a=o.rope?{flat:Array.prototype.slice.call(o.rope.flat),a:o.rope.a,y:o.rope.y,k:o.rope.k,s:o.rope.s,m:o.rope.m,tt:o.rope.tt,c:o.rope.c,soft:o.rope.soft,top:o.rope.top,foot:o.rope.foot}:null;return{q:o.q,scrollY:Mt,shA:o.shA,shB:o.shB,kind:o.kind,mix:o.mix,rope:a,u:o.u,share:o.share,thick:o.thick,gain:o.gain,tips:o.tips,shade:o.shade,core:o.core,wash:o.wash,floors:o.floors,ring:o.ring,ptsH:o.ptsH,ptsS:o.ptsS,lit:o.lit,treads:o.treads,kc:r,layout:Be.length+":"+Be.slice(-60)}},tt.still=function(t,e){return I!=="live"?null:(G={q:+t,t:+e||0},nr(G.q,G.t),Y=jt=G.q,mt(),Nn())},tt.release=function(){G=null,Y=null,mt()},tt.grid=function(t,e){if(I!=="live"||!rt)return null;Ot(rt);for(var o=Ir(),r=[],a=ut/t,i=pt/e,f=0;f<e;f++)for(var p=0;p<t;p++){for(var s=[0,0,0,0],w=0,M=Math.floor(f*i);M<(f+1)*i;M+=2)for(var z=Math.floor(p*a);z<(p+1)*a;z+=2){var g=(M*ut+z)*4;s[0]+=o[g],s[1]+=o[g+1],s[2]+=o[g+2],s[3]+=o[g+3],w++}r.push(s[0]/w,s[1]/w,s[2]/w,s[3]/w)}return r},tt.pixels=function(t,e,o,r){if(I!=="live"||!rt)return null;Ot(rt);var a=Math.max(0,Math.round(t*kt)),i=Math.max(0,Math.round((Q-e-r)*kt)),f=Math.max(1,Math.min(ut-a,Math.round(o*kt))),p=Math.max(1,Math.min(pt-i,Math.round(r*kt))),s=new Uint8Array(f*p*4);return c.readPixels(a,i,f,p,c.RGBA,c.UNSIGNED_BYTE,s),{w:f,h:p,data:Array.prototype.slice.call(s)}},tt.force=function(t){if(t==="lost"||t==="restore"){Tt&&(t==="lost"?Tt.loseContext():Tt.restoreContext());return}if(t==="slow"){$e=55,J.warm=u.warmup,J.cool=0,G=null,mt();return}if(t==="steady"){$e=0;return}$e=0,ht={};var e=/^tier(\d)$/.exec(t||"");return e?ht.tier=+e[1]:t&&t!=="auto"&&(ht[t]=!0),Lr(Ht)},tt.point=function(t,e,o){b.finger=!1,Zo(t,e,o===!1?0:1)},tt.pulse=Jo,tt.bench=function(t,e){if(I!=="live")return null;e=e||40;var o=new Uint8Array(4),r=nr(t,1);c.readPixels(0,0,1,1,c.RGBA,c.UNSIGNED_BYTE,o);for(var a=performance.now(),i=0;i<e;i++)r.time=1+i*.016,Ot(r);return c.finish(),c.readPixels(0,0,1,1,c.RGBA,c.UNSIGNED_BYTE,o),(performance.now()-a)/e},tt.hold=function(t){cr=t!==!1},tt.rate=function(t){Po=t==null?null:+t,mt()},tt.hide=function(t){Yt=!!t,No=!1,ce=!0,mt()},tt.tread=function(t){var e=rt&&rt.treads;return e&&e[t-1]!==void 0?{y:e[t-1],scrollY:Mt}:null},tt.keepClear=function(){return rt&&rt.kc?rt.kc.map(function(t){return{l:t.l,t:t.t,r:t.r,b:t.b,on:t.on}}):[]},tt.anchor=function(t,e){return oe&&O&&Me(),{scrollY:Mt,box:Vo(t,e)||null}},tt.snapshot=function(t,e){return I!=="live"||!rt?null:(Ot(rt),O.toDataURL(t||"image/png",e||.9))},tt.poster=function(t,e,o,r){if(I!=="live")return null;var a=typeof t=="number"?t:u.stills[t];if(a===void 0)return null;var i=G;G={q:a,t:o===void 0?u.calmTime:o},nr(G.q,G.t);var f=Math.min(1600,Math.round(e||1600),ut),p=Math.round(f*pt/ut),s=document.createElement("canvas");s.width=f,s.height=p;var w=s.getContext("2d");w.imageSmoothingQuality="high",w.drawImage(O,0,0,f,p);var M=s.toDataURL("image/webp",r||.8);return G=i,mt(),{name:String(t),q:a,url:M,w:f,h:p,bytes:Math.round((M.length-23)*.75)}}),window.__scene=tt,(function(){var t=Pt.get("scene-force");if(t&&Nt){var e=/^tier(\d)$/.exec(t);e?ht.tier=+e[1]:ht[t]=!0}})()})();
