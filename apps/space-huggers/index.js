"use strict";const e=Math.PI,f=t=>t<0?-t:t,aa=(t,i)=>t<i?t:i,ba=(t,i)=>i<t?t:i,h=(t,i=1,s=0)=>t<s?s:i<t?i:t,q=(t,i=1,s=0)=>i-s?h((t-s)/(i-s)):0,ca=(t,i=1,s=0)=>s+h(t)*(i-s),da=(t,i,s,h)=>2*f(t.x-s.x)<i.x+h.x&2*f(t.y-s.y)<i.y+h.y,r=(t=1,i=0)=>i+(t-i)*Math.random(),ja=(i=1)=>0<i?ea(i*r(0/i,1)**.5):new t,ea=(i=1)=>ka(new t,r(2*e),i),la=(t=new v,i=new v(0,0,0,1),s)=>s?t.qa(i,r()):new v(r(t.r,i.r),r(t.u,i.u),r(t.b,i.b),r(t.a,i.a));let ma=0;const x=(t=1,i=0)=>i+(t-i)*(1e9*Math.sin(++ma)**2%1),z=(i=0,s)=>null==i.x?new t(i,null==s?i:s):new t(i.x,i.y);function ka(t,i,s=1){return t.x=s*Math.sin(i),t.y=s*Math.cos(i),t}function na(i,s){return new t(i.x/s.x,i.y/s.y)}function pa(t){return t.x**2+t.y**2}function qa(t,i){return(t.x-i.x)**2+(t.y-i.y)**2}function ra(t){var i=t.length();return 1<i?t.scale(1/i):t}function sa(i){return new t(0|i.x,0|i.y)}function ta(t,i){return 0<=t.x&&0<=t.y&&t.x<i.x&&t.y<i.y}class t{constructor(t=0,i=0){this.x=t,this.y=i}L(){return new t(this.x,this.y)}scale(i){return new t(this.x*i,this.y*i)}add(i){return new t(this.x+i.x,this.y+i.y)}j(i){return new t(this.x-i.x,this.y-i.y)}multiply(i){return new t(this.x*i.x,this.y*i.y)}length(){return pa(this)**.5}normalize(i=1){var s=this.length();return s?this.scale(i/s):new t(i)}angle(){return Math.atan2(this.x,this.y)}rotate(i){var s=Math.cos(i);return i=Math.sin(i),new t(this.x*s-this.y*i,this.x*i+this.y*s)}direction(){return f(this.x)>f(this.y)?this.x<0?3:1:this.y<0?2:0}round(){return new t(Math.round(this.x),Math.round(this.y))}qa(t,i){return this.add(t.j(this).scale(h(i)))}}function ua(t){return new v(h(t.r),h(t.u),h(t.b),h(t.a))}function va(t,i=.05){return ua(new v(t.r+r(i,-i),t.u+r(i,-i),t.b+r(i,-i),t.a+r(0,-0)))}function xa(t){return`rgb(${255*t.r|0},${255*t.u|0},${255*t.b|0},${t.a})`}function ya(t){return(255*t.r|0)+(255*t.u<<8)+(255*t.b<<16)+(255*t.a<<24)}function za(t=0,i=0,s=1,h=1){var a=new v,e=(t,i,s)=>(s=(s%1+1)%1)<1/6?t+6*(i-t)*s:s<.5?i:s<2/3?t+(i-t)*(2/3-s)*6:t;return a.r=e(s=2*s-(i=s<.5?s*(1+i):s+i-s*i),i,t+1/3),a.u=e(s,i,t),a.b=e(s,i,t-1/3),a.a=h,a}class v{constructor(t=1,i=1,s=1,h=1){this.r=t,this.u=i,this.b=s,this.a=h}L(){return new v(this.r,this.u,this.b,this.a)}add(t){return new v(this.r+t.r,this.u+t.u,this.b+t.b,this.a+t.a)}j(t){return new v(this.r-t.r,this.u-t.u,this.b-t.b,this.a-t.a)}multiply(t){return new v(this.r*t.r,this.u*t.u,this.b*t.b,this.a*t.a)}scale(t,i=t){return new v(this.r*t,this.u*t,this.b*t,this.a*i)}qa(t,i){return this.add(t.j(this).scale(h(i)))}}function A(t){t.time=void 0}function B(t){return null!=t.time}function Aa(t){return B(t)?q(t.time-C,0,t.setTime):0}class D{constructor(t){this.time=null==t?void 0:C+t,this.setTime=t}set(t=0){this.time=C+t,this.setTime=t}active(){return C<=this.time}get(){return B(this)?C-this.time:0}}const Ba=1/60,E=z(16);let F=0,G=0,Ca=z(),Da=[],Ea=[],Fa=0,C=0,Ga=0,Ha=0,H=z(),I=4*ba(E.x,E.y),La,Ma;const Na=new Image;function Oa(){const s=t=>{if(!t.M){t.update();for(const i of t.children)s(i)}};for(const t of Da)t.parent||s(t);Da=Da.filter(t=>!t.M),Ea=Ea.filter(t=>!t.M),C=++Fa/60}function Pa(t,i=0,s=()=>1){var h=Ea;if(i)if(null!=i.x)for(const a of h)da(t,i,a.g,a.size)&&s(a);else{i**=2;for(const e of h)qa(t,e.g)<i&&s(e)}else for(const r of h)s(r)}let Qa;function J(t,i,s=15,h=1){var a=1.5*s;a**2<(i=qa(H,i))||((t=[...t])[0]=(t[0]||1)*h*q(i**.5,s,a),Ra(...t))}function Ra(t=1,i=.05,s=220,h=0,a=0,r=.1,n=0,c=1,o=0,b=0,l=0,d=0,v=0,u=0,x=0,g=0,y=0,w=1,z=0,p=0){if(Ta){var m=2*e,A=o*=500*m/44100/44100,C=[];i=s*=(1+2*i*Math.random()-i)*m/44100;var D,S=0,F=0,H=0,U=1,M=0,B=0,G=0;for(b*=500*m/44100**3,x*=m/44100,l*=m/44100,d*=44100,v=44100*v|0,D=(h=44100*h+9)+(z*=44100)+(a*=44100)+(r*=44100)+(y*=44100)|0;H<D;C[H++]=G){++B%(100*g|0)||(G=n?1<n?2<n?3<n?Math.sin((S%m)**3):Math.max(Math.min(Math.tan(S),1),-1):1-(2*S/m%2+2)%2:1-4*f(Math.round(S/m)-S/m):Math.sin(S),G=(v?1-p+p*Math.sin(m*H/v):1)*(0<G?1:-1)*(G<0?-G:G)**c*t*.5*(H<h?H/h:H<h+z?1-(H-h)/z*(1-w):H<h+z+a?w:H<D-y?(D-H-y)/r*w:0),G=y?G/2+(H<y?0:(H<D-y?1:(D-H)/y)*C[H-y|0]/2):G);var I=(s+=o+=b)*Math.cos(x*F++);S+=I-I*u*(1-1e9*(Math.sin(H)+1)%2),U&&++U>d&&(s+=l,i+=l,U=0),!v||++M%v||(s=i,o=A,U=U||1)}Qa=Qa||new(window.AudioContext||webkitAudioContext),t=Qa.createBuffer(1,C.length,44100),s=Qa.createBufferSource(),t.getChannelData(0).set(C),s.buffer=t,s.connect(Qa.destination),s.start()}}const Ua=z(.999);function Va(t,i=1){return t.s?-i:i}function Wa(t,i,s=z()){i.parent||t.children.includes(i),t.children.push(i),i.parent=t,i.pb=s.L(),i.N=0}function Xa(t,i=1,s){i&&!t.Ga?(Ea.includes(t),Ea.push(t)):!i&&t.Ga&&(Ea.includes(t),Ea.splice(Ea.indexOf(t),1)),t.Ga=i,t.nb=s,t.ua=1}class Ya{constructor(t,i=Ua,s=-1,h=E,a=0){this.g=t.L(),this.size=i,this.F=s,this.G=h,this.angle=a,this.color=void 0,this.l=1,this.ia=this.ja=.99,this.J=0,this.Ka=.8,this.T=C,this.h=z(this.Ga=this.A=this.O=0),this.ua=this.ea=1,this.children=[],Da.push(this)}update(){if(this.parent)this.g=this.pb.multiply(z(Va(this),1)).rotate(-this.parent.angle).add(this.parent.g),this.angle=Va(this)*this.N+this.parent.angle;else{this.h.x=h(this.h.x,1,-1),this.h.y=h(this.h.y,1,-1);var i=this.g.L();if(this.g.x+=this.h.x*=this.ja,this.g.y+=this.h.y=this.ja*this.h.y+-.01*this.ea,this.angle+=this.O*=this.ia,this.l){var s,a,e,r,n,c=this.h.y<0;if(this.B&&(s=this.B.h?this.B.h.x:0,this.h.x=s+(this.h.x-s)*this.Ka,this.B=0),this.Ga)for(var o of Ea)!this.nb&!o.nb||o.M||o.parent||da(this.g,this.size,o.g,o.size)&&o!=this&&(!this.W(o)|!o.W(this)||(da(i,this.size,o.g,o.size)?(s=(a=(s=i.j(o.g)).length())<.01?ea(.001):s.scale(.001/a),this.h=this.h.add(s),o.l&&(o.h=o.h.j(s))):(s=this.size.x+o.size.x,a=this.size.y+o.size.y,e=2*(i.y-o.g.y)>a+-.01,r=2*f(i.y-o.g.y)<a,n=2*f(i.x-o.g.x)<s,!e&&!n&&r||(this.g.y=o.g.y+(.5*a+.001)*(i.y-o.g.y<0?-1:1),o.B&&c||!o.l?(c&&(this.B=o),this.h.y*=-this.J):o.l&&(this.h.y=o.h.y=(this.l*this.h.y+o.l*o.h.y)/(this.l+o.l))),e||!r&&n||(this.g.x=o.g.x+(.5*s+.001)*(i.x-o.g.x<0?-1:1),this.h.x=o.l?o.h.x=(this.l*this.h.x+o.l*o.h.x)/(this.l+o.l):this.h.x*-this.J))));this.ua&&Za(this.g,this.size,this)&&!Za(i,this.size,this)&&(o=Za(new t(i.x,this.g.y),this.size,this),s=Za(new t(this.g.x,i.y),this.size,this),!o&&s||(this.B=c,this.g.y=i.y,this.h.y*=-this.J),!s&&o||(this.g.x=i.x,this.h.x*=-this.J))}}}S(){K(this.g,this.size,this.F,this.G,this.color,this.angle,this.s,this.aa)}o(){if(!this.M){this.M=1,this.parent&&this.parent.removeChild(this);for(const t of this.children)t.o(t.parent=0)}}Sa(t){return 0<t}W(){return 1}removeChild(t){t.parent==this&&this.children.includes(t),this.children.splice(this.children.indexOf(t),1),t.parent=0}}let $a=[],M=z();const ab=[],bb=(t,i=0)=>{ta(t,M)&&($a[(0|t.y)*M.x+t.x|0]=i)},N=t=>ta(t,M)?$a[(0|t.y)*M.x+t.x|0]:0;function Za(i,s=z(),h){var a=i.x-.5*s.x|0,e=i.y-.5*s.y|0,r=i.x+.5*s.x|0;for(i=i.y+.5*s.y|0;e<=i;++e)for(s=a;s<=r;++s){var n=$a[e*M.x+s];if(n&&(!h||h.Sa(n,new t(s,e))))return 1}}function cb(h,a){h=sa(h);var e=(a=sa(a)).j(h),r=f(e.x),n=-f(e.y),c=e.x<0?-1:1,e=e.y<0?-1:1;let o=r+n;for(let i=h.x,s=h.y;;){if((h=N(z(i,s)))&&0<h)return new t(i+.5,s+.5);if(i==a.x&s==a.y)break;n<=(h=2*o)&&(o+=n,i+=c),h<=r&&(o+=r,s+=e)}}class db{constructor(t=-1,i=0,s=0,h=new v){this.cb=t,this.direction=i,this.s=s,this.color=h}clear(){this.cb=this.direction=this.s=0,color=new v}}function eb(t,i){var s=sa(i).add(t.g).add(z(.5));fb(t,s,z(1),0,0,t=>t.clearRect(-.5,-.5,1,1)),(i=t.getData(i)).cb<0||K(s,z(1),i.cb||-1,t.G,i.color,i.direction*e/2,i.s)}function hb(t){var i=t.size.x*t.G.x,s=t.size.y*t.G.y;t.canvas.width=i,t.canvas.height=s,t.tb=[Ca,F,G,I,H],I=t.G.x,H=t.size.scale(.5),F=t.canvas,G=t.context,G.imageSmoothingEnabled=!1,Ca=z(i,s),ib(i,s)}function jb(s){for(let i=s.size.x;i--;)for(let t=s.size.y;t--;)eb(s,z(i,t))}function fb(t,i,s,h,a,e){const r=t.context;r.save(),i=i.j(t.g).multiply(t.G),s=s.multiply(t.G),r.translate(i.x,t.canvas.height-i.y),r.rotate(h),r.scale(a?-s.x:s.x,s.y),e(r),r.restore()}function kb(t,i=z(1),s=0,h=E,a=new v,e=0,r){fb(P,t,i,e,r,t=>{var i;s<0?(t.fillStyle=xa(a),t.fillRect(-.5,-.5,1,1)):(i=Na.width/h.x,t.globalAlpha=a.a,t.drawImage(Na,s%i*h.x,(s/i|0)*h.x,h.x,h.y,-.5,-.5,1,1))})}class lb extends Ya{constructor(t){var i=z(1);for(super(z(),t),this.canvas=ab.length?ab.pop():document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.scale=i,this.G=E.L(),this.A=-1e9,this.Fb=1,this.data=[],t=(t=this.size).x*t.y;t--;)this.data.push(new db)}o(){ab.push(this.canvas),super.o()}setData(t,i,s){ta(t,this.size)&&(this.data[(0|t.y)*this.size.x+t.x|0]=i,s&&eb(this,t))}getData(t){return ta(t,this.size)&&this.data[(0|t.y)*this.size.x+t.x|0]}update(){}S(){this.Fb&&mb();var t=this.g.add(z(0,this.size.y*this.scale.y)).j(H).multiply(z(I,-I)).add(Ca.scale(.5)).j(z(.5));G.drawImage(this.canvas,t.x,t.y,I*this.size.x*this.scale.x,I*this.size.y*this.scale.y)}}const Q=[[]],nb=(t,i=0)=>Q[i][t]&&Q[i][t].d?1:0,ob=(t,i=0)=>Q[i][t]&&Q[i][t].p?1:0;let Ta=0,pb=z();onkeydown=t=>{t.repeat||(Q[qb=0][rb(t.keyCode)]={d:Ta=1,p:1})},onkeyup=t=>{t=rb(t.keyCode),Q[0][t]&&(Q[0][t].d=0,Q[0][t].r=1)},onmousedown=t=>(Q[0][t.button]={d:Ta=1,p:1},onmousemove(t)),onmouseup=t=>Q[0][t.button]&&(Q[0][t.button].d=0,Q[0][t.button].r=1),onmousemove=t=>{var i;F&&(i=F.getBoundingClientRect(),pb.x=Ca.x*q(t.x,i.right,i.left),pb.y=Ca.y*q(t.y,i.bottom,i.top))},oncontextmenu=()=>!1;const rb=t=>87==t?38:83==t?40:65==t?37:68==t?39:t;let qb=0,sb=0;const tb=(t=0)=>t<sb?Q[t+1].Aa[0]:z(),R=(t,i=0)=>i<sb?nb(t,i+1):0,ub=(t,i=0)=>i<sb?ob(t,i+1):0;function vb(){if(navigator.getGamepads&&document.hasFocus()){var i,h=navigator.getGamepads();for(let s=sb=0;s<navigator.getGamepads().length;++s){const a=h[s];let t=Q[s+1];t||(t=Q[s+1]=[],t.Aa=[z(),z()]),a&&2<=a.axes.length&&(sb=s+1,i=t=>.3<t?q(t,.8,.3):t<-.3?-q(-t,.8,.3):0,t.Aa[0]=z(i(a.axes[0]),i(-a.axes[1])),R(12,s)|R(13,s)|R(14,s)|R(15,s)&&(t.Aa[0]=z(R(15,s)-R(14,s),R(12,s)-R(13,s))),t.Aa[0]=ra(t.Aa[0]),a.buttons.map((t,i)=>{Q[s+1][i]=t.pressed?{d:1,p:!R(i,s)}:Q[s+1][i]={r:R(i,s)},qb|=t.pressed&&!s}))}}}function wb(i){var s=null!=i.Ta.x?new t(r(-.5,.5),r(-.5,.5)).multiply(i.Ta).rotate(i.angle):ja(.5*i.Ta),s=new xb(i.g.add(s),i.F,i.G,i.angle+r(i.qb,-i.qb));const h=i.Nb;var a=(o=t=>t+t*r(h,-h))(i.Mb),e=o(i.bb),n=o(i.Pb),c=o(i.speed),o=o(i.wb)*(2*(0|r(2))-1);const b=r(i.gb,-i.gb),l=la(i.Cb,i.Db,i.sb),d=la(i.Ab,i.Bb,i.sb);s.Ia=l,s.Ha=d.j(l),s.h=ka(new t,i.angle+b,c),s.O=o,s.Jb=a,s.bb=e,s.Qb=n-e,s.Ua=i.Ua,s.ja=i.ja,s.ia=i.ia,s.J=i.J,s.Ka=i.Ka,s.ea=i.ea,s.ua=i.ua,s.Ca=i.Ca,s.A=i.A,s.ta=i.ta,s.fb=i.Za,i.Lb&&i.Lb(s)}class Ab extends Ya{constructor(i,s=0,h=0,a=100,r=e,n=-1,c=E,o=new v,b=new v,l=new v(1,1,1,0),d=new v(1,1,1,0),u=.5,x=.1,f=1,g=.1,y=.05,w=1,z=1,p=0,m=e,A=.1,C=.2,D,S,F=1,H=S?1e9:0){super(i,new t,n,c),this.Ta=s,this.hb=h,this.X=a,this.gb=r,this.Cb=o,this.Db=b,this.Ab=l,this.Bb=d,this.sb=F,this.Mb=u,this.bb=x,this.Pb=f,this.speed=g,this.wb=y,this.ja=w,this.ia=z,this.ea=p,this.qb=m,this.Ua=A,this.Nb=C,this.ua=D,this.Ca=S,this.A=H,this.ta=this.xa=0}update(){if(this.parent&&super.update(),!this.hb||C-this.T<=this.hb){if(this.X){var t=1/this.X;for(this.xa+=Ba;0<this.xa;this.xa-=t)wb(this)}}else this.o()}S(){}}class xb extends Ya{constructor(i,s,h,a){super(i,new t,s,h,a)}S(){var i=aa((C-this.T)/this.Jb,1),s=this.bb+i*this.Qb,s=new t(s,s),h=.5*this.Ua,h=new v(this.Ia.r+i*this.Ha.r,this.Ia.u+i*this.Ha.u,this.Ia.b+i*this.Ha.b,(this.Ia.a+i*this.Ha.a)*(i<h?i/h:1-h<i?(1-i)/h:1));if(this.Ca&&Bb(1),this.ta){var a=this.h.length();const e=this.h.scale(1/a);a*=this.ta,s.y=ba(s.x,a),this.angle=e.angle(),K(this.g.add(e.multiply(z(0,.5*-a))),s,this.F,this.G,h,this.angle,this.s)}else K(this.g,s,this.F,this.G,h,this.angle,this.s);this.Ca&&Bb(void 0),1==i&&(this.color=h,this.size=s,this.fb&&this.fb(this),this.M=1)}}let Cb,S,Db,U,V,Eb,Fb,Gb,Hb,Ib,Jb;function Kb(){Cb=document.createElement("canvas"),S=Cb.getContext("webgl",{antialias:!1}),S.bindTexture(3553,S.createTexture()),S.texImage2D(3553,0,6408,6408,5121,Na),Hb=.3/La.x,Ib=.3/La.y,Jb&&(document.body.appendChild(Cb),Cb.style=F.style.cssText),Db=Lb();var t=new ArrayBuffer(14155776);Mb(t.byteLength),U=new Float32Array(t),V=new Uint32Array(t),t=(t,i,s,h,a=0)=>{t=S.getAttribLocation(Db,t),S.enableVertexAttribArray(t),S.vertexAttribPointer(t,h,i,a,36,e),e+=h*s};let e=Fb=Eb=0;t("a",5126,4,1),t("p",5126,4,2),t("s",5126,4,2),t("t",5126,4,2),t("c",5121,1,4,1),t("b",5121,1,4,1),S.texParameteri(3553,10241,9728),S.texParameteri(3553,10240,9728)}function Bb(t){t!=Gb&&Nb(),Gb=t,S.blendFunc(770,t?1:771),S.enable(3042)}function Ob(t,i){return i=S.createShader(i),S.shaderSource(i,t),S.compileShader(i),i}function Lb(){var t=S.createProgram();return S.attachShader(t,Ob("precision lowp float;uniform mat4 m;attribute float a;attribute vec2 p,s,t;attribute vec4 c,b;varying vec2 v;varying vec4 d,e;void main(){gl_Position=m*vec4((s*cos(-a)+vec2(-s.y,s.x)*sin(-a))*.5+p,1,1);v=t;d=c;e=b;}",35633)),S.attachShader(t,Ob("precision lowp float;varying vec2 v;varying vec4 d,e;uniform sampler2D j;void main(){gl_FragColor=texture2D(j,v)*d+e;}",35632)),S.linkProgram(t),t}function Mb(t){var i=S.createBuffer();S.bindBuffer(34962,i),S.bufferData(34962,t,35048)}function ib(t,i){Cb.width=t,Cb.height=i,S.viewport(0,0,t,i),S.useProgram(Db),Bb(),t=2*I/t,i=2*I/i,S.uniformMatrix4fv(S.getUniformLocation(Db,"m"),0,new Float32Array([t,0,0,0,0,i,0,0,1,1,-1,1,-1-t*H.x,-1-i*H.y,0,0]))}function Nb(){Eb&&(S.bufferSubData(34962,0,U.subarray(0,216*Eb)),S.drawArrays(4,0,6*Eb),Eb=0)}function mb(t){var i=G;Fb&&(Nb(),!Jb||t)&&(i.drawImage(Cb,0,Gb=Fb=0),S.clear(16384))}function Pb(t,i,s,h,a,e,r,n,c,o,b,l){65536<=Eb&&Nb(),r+=Hb,n+=Ib,c-=Hb,o-=Ib;var d=54*Eb++-1;s=e?-s:s,Fb=1,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=-s,U[++d]=-h,U[++d]=r,U[++d]=o,V[++d]=b,V[++d]=l,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=s,U[++d]=h,U[++d]=c,U[++d]=n,V[++d]=b,V[++d]=l,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=-s,U[++d]=h,U[++d]=r,U[++d]=n,V[++d]=b,V[++d]=l,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=-s,U[++d]=-h,U[++d]=r,U[++d]=o,V[++d]=b,V[++d]=l,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=s,U[++d]=-h,U[++d]=c,U[++d]=o,V[++d]=b,V[++d]=l,U[++d]=a,U[++d]=t,U[++d]=i,U[++d]=s,U[++d]=h,U[++d]=c,U[++d]=n,V[++d]=b,V[++d]=l}const Qb=t=>t.add(z(.5)).j(Ca.scale(.5)).multiply(z(1/I,-1/I)).add(H);function K(t,i=z(1),s=-1,h=E,a=new v,e=0,r,n=new v(0,0,0,0)){var c,o;!i.x|!i.y||(s<0?Pb(t.x,t.y,i.x,i.y,e,0,0,0,0,0,0,ya(a)):(c=Na.width/h.x|0,o=h.x*Ma.x,h=h.y*Ma.y,Pb(t.x,t.y,i.x,i.y,e,r,r=s%c*o,s=(s/c|0)*h,r+o,s+h,ya(a),ya(n))))}function Rb(t,i=z(1),s){K(Qb(t),i.scale(1/I),-1,E,s,void 0,void 0,void 0)}function Sb(t){return Tb||da(t.g,t.size,H,Ub)}function Vb(t,i){!t.ba||B(t.U)||t.ib.active()||1==t.H&&C-t.T<2||(i?(t.U.set(t.Fa*r(1.5,1)),i=new Ab(z(),1,0,60,e,0,void 0,new v(1,1,0),new v(1,.5,.5),new v(1,0,0),new v(1,.5,.1),.5,.5,.1,.01,.1,.95,.1,-.05,e,.5,.5,0,1),t.Y=i,Wa(t,t.Y)):B(t.Ea)||t.Ea.set(t.xb*r(1.5,1)))}function Wb(t){return ca(Aa(t.U),.2,1)}function Xb(t){t.Y&&0==t.Y.X||(t.ib.set(.1),A(t.U),A(t.Ea),t.Y&&t.Y.o(),t.Y=0)}class Yb extends Ya{constructor(t,i,s,h){super(t,i,s,h,void 0),this.oa=1,this.P=0,this.xb=.1,this.Fa=3,this.va=new D,this.Ea=new D,this.U=new D,this.ib=new D,this.color=new v,this.aa=new v(0,0,0,0)}update(){var t;(this.parent||this.R||!this.B||Sb(this))&&super.update(),this.mb||(!this.i()&&B(this.va)?(t=.5*q(this.va.get(),0,.15),this.aa=new v(t,t,t,0)):this.aa=new v(0,0,0,0)),!this.parent&&this.g.y<-1?(this.K(),this.R||this.o()):this.Fa&&(B(this.U)?C>this.U.time?(this.K(),this.Y&&(this.Y.X=0)):r()<.01&&Pa(this.g,2,t=>t.oa&&Vb(t)):C>this.Ea.time&&Vb(this,1))}S(){K(this.g,this.size,this.F,this.G,this.color.scale(Wb(this),1),this.angle,this.s,this.aa)}C(t,i){if(this.i())return 0;this.va.set();for(const s of this.children)s.va&&s.va.set();return(t=ba(this.P-t,0))||this.K(i),this.P-(this.P=t)}i(){return!this.P}K(){this.o()}W(t){if(t.mb&&this.ba){if(Tb)return this.o(),1;Vb(this)}return 1}}class $b extends Yb{constructor(i){var s;super(i),this.type=9*r()**2|0,i=5,this.F=16,(this.ka=0)==this.type?(this.color=new v(1,.5,0),this.ba=1):2==this.type?(this.color=new v(.9,.9,1),i=10):1==this.type?(this.color=new v(.2,.8,.2),this.ba=1,this.ka=2,i=1e3):5==this.type?(this.F=17,this.color=new v(.9,.9,1),i=10):3==this.type?(this.F=17,this.color=new v(.2,.8,.2),this.ba=1,this.ka=2,i=1e3):6==this.type?(this.F=17,this.color=new v(1,.1,.1),this.ba=1,this.ka=3,this.Fa=r(.5,.1),i=1e3):4==this.type?(this.F=17,this.color=new v(0,.6,1),i=.01):7!=this.type&&8!=this.type||(this.F=18,this.color=va(new v(.8,.8,.8),.2),i=30,this.l*=4,r()<.2&&(i=99,this.l*=4,this.size=this.size.scale(2),this.g.y+=.5),this.Hb=1,8==this.type&&(this.color=new v(1,.9,0),this.aa=new v(1,0,0),this.mb=1)),this.angle=(0|r(4))*e/2,r()<.5&&(s=this.size,this.size=new t(s.y,s.x)),this.s=r()<.5,this.P=i,Xa(this,1,1)}update(){var t=this.h.L();super.update(),.05<(t=pa(this.h.j(t)))&&this.C(2*t)}C(t,i){(this.ka||0==this.type&&r()<.1)&&Vb(this),super.C(t,i)}K(){this.M||(4==this.type&&ac(this.g),this.o(),bc(this.g,this.color.scale(Wb(this),1)),this.ka?cc(this.g,this.ka):J(dc,this.g))}}let W,ec,fc=new D;class gc extends Yb{constructor(s){super(sa(s).add(z(.5))),this.A=-1001,this.Gb=1;for(let i=3;i--;)for(let t=6;t--;)bb(s.j(z(i-1,1-t)),t?0:1)}update(){if(Sb(this))for(const t of X)t&&!t.i()&&qa(this.g,t.g)<1&&this.setActive()}setActive(){ec==this||Tb||J(hc,this.g),W=this.g,ec=this,fc.set(.1)}S(){var t=ec==this?new v(1,0,0):new v,i=Math.sin(4*C+this.g.x);K(this.g.add(z(.5,3.2-.03*i)),z(1,.6),14,void 0,t,.06*i),K(this.g.add(z(0,1.5)),z(.1,4),-1,E,new v(.9,.9,.9),void 0)}}class ic extends Yb{constructor(t){super(t,z(.2),5,z(8)),this.P=1e3,this.eb=new D(1),this.J=.3,this.Ka=.9,this.ia=.96,this.A=1e8,Xa(this)}update(){super.update(),3<C-this.T?(cc(this.g,3),this.o()):(C>this.eb.time&&(J(jc,this.g),this.eb.set(1)),kc(this.g,this.g))}S(){K(this.g,z(.5),this.F,this.G,this.color,this.angle);var t=C-this.T;Bb(1),K(this.g,z(2),0,z(16),new v(1,0,0,.2-.2*Math.cos(2*t*e))),K(this.g,z(1),0,z(16),new v(1,0,0,.2-.2*Math.cos(2*t*e))),K(this.g,z(.5),0,z(16),new v(1,1,1,.2-.2*Math.cos(2*t*e))),Bb(0)}}class lc extends Ya{constructor(t,i){super(t,z(.6),4,z(8)),this.da=this.N=0,this.ab=new D,Wa(this,this.Pa=new Ab(z(),0,0,0,.1,void 0,void 0,new v(1,.8,.5),new v(.9,.7,.5),new v(1,.8,.5),new v(.9,.7,.5),3,.1,.1,.15,.1,1,.95,1,0,0,.1,1)),this.Pa.J=.5,this.Pa.Za=mc,this.A=i.A+1,i.I=this,Wa(i,this,this.Kb=z(.55,0))}update(){if(super.update(),this.s=this.parent.s,this.da+=Ba,this.ab.active()&&(this.N=ca(Aa(this.ab),0,this.N)),this.ub)for(var t=.5*(this.parent.Ma?1:.5);0<this.da;this.da-=.125)this.N=-r(.2,.15),this.ab.set(r(.4,.3)),new nc(this.g,this.parent).h=z(Va(this,t),0).rotate(r(.1,-.1)),this.Pa.N=-.8*Va(this),wb(this.Pa),J(oc,this.g),this.parent.Ma&&kc(this.g,this.g);else this.da=aa(this.da,0)}}class nc extends Ya{constructor(t,i){super(t,z(0)),this.color=new v(1,1,0,1),this.ob=this.h,Xa(this),this.C=this.ja=1,this.ea=0,this.H=i.H,this.A=1e9,this.$a=8}update(){this.ob=this.h,super.update(),this.$a-=this.h.length(),this.$a<0?(new Ab(this.g,.2,.1,100,e,0,void 0,new v(1,1,0,.5),new v(1,1,1,.5),new v(1,1,0,0),new v(1,1,1,0),.1,.5,.1,.1,.1,1,1,.5,e,.1,.5,0,1),this.o()):Pa(this.g,this.size,t=>{t.oa&&!t.parent&&t.H!=this.H&&(t.D&&t.D.active()||this.W(t))})}W(t){var i;return t.oa&&(t.C(this.C,this),i=this.h.scale(.1).scale(1/t.l),t.h=t.h.add(i),t.Xa?(J(pc,this.g),this.o()):this.K()),1}Sa(t,i){return t<=0?0:(r()<(6==t?1:2==t?.2:.05)&&qc(i),this.K(),1)}K(){var t;this.M||((t=new Ab(this.g,0,.1,100,.5,void 0,void 0,new v(1,1,0),new v(1,0,0),new v(1,1,0),new v(1,0,0),.2,.2,0,.1,.1,1,1,.5,e,.1,.5,1,1)).ta=1,t.angle=this.ob.angle()+e,t.J=.3,this.o())}S(){var t=new v(1,1,1,.5),i=this.h.angle();K(this.g,z(.4,.5),-1,E,t,i),t=this.h.angle(),K(this.g,z(.2,.5),-1,E,this.color,t)}}class rc extends Yb{constructor(t){super(t,z(.6,.95).scale(1),32),this.Qa=this.P=this.ba=this.Xa=1,this.fa=new D,this.pa=new D,this.Z=new D,this.rb=new D,this.D=new D,this.wa=new D,this.Ja=new D,this.Ra=new D,this.m=z(),this.jb=new v(0,0,0,0),this.color=new v,this.la=new v,this.Da=3,this.Va=2,this.A=10,this.Ya=this.ma=this.ha=0,this.kb=new D,Xa(this)}update(){if(this.Ib=this.g.L(),this.ea=1,this.i()||!Sb(this)&&!this.R)super.update();else{var t=this.m.L(),i=0;for(let t=2;t--;){var s=this.g.add(z(0,t+.1*this.m.y-.5*this.size.y));i|=-1==N(s)}i?this.m.y&&(this.ca=1):this.ca=0,this.D.active()?(this.angle=Va(this,2*e*Aa(this.D)),this.B&&(this.h.x+=Va(this,.1)),Pa(this.g,this.size,t=>{t.Xa&&t.H!=this.H&&!t.i()&&t.C(1,this)})):this.angle=0,this.ca?(this.ea=this.V=this.B=0,A(this.pa),A(this.fa),this.h=this.h.multiply(z(.85)).add(z(0,.02*t.y)),this.h.x+=.02*(.5+(0|this.g.x)-this.g.x)*f(t.x?0:t.y),t.x*=.2,this.ca=0<=t.y||N(this.g.j(z(0,1)))<=0):((this.B||this.V)&&this.fa.set(.1),!this.fa.active()||this.D.active()||!this.Z.active()||this.pa.active()||this.rb.active()||(this.V?this.h.y=.25:(this.h.y=.15,this.pa.set(.2)),this.rb.set(.5),J(sc,this.g)),this.pa.active()&&!this.V&&(A(this.fa),this.La&&0<this.h.y&&this.pa.active()&&(this.h.y+=.017)),this.B||(t.x=(t.x<0?-1:1)==(this.h.x<0?-1:1)?.1*t.x:.2*t.x,this.h.y<0&&(this.h.y+=-.002))),!this.za||this.D.active()||this.wa.active()||(this.D.set(.4),this.wa.set(2),A(this.pa),Xb(this),J(tc,this.g),!this.B&&.2<C-this.T&&(this.h.y+=.2)),this.h.x=h(this.h.x+.042*t.x,.2,-.2),t=this.h.L(),super.update(),this.Ma||this.D.active()||.1<(t=pa(this.h.j(t)))&&this.C(10*t),this.ca||this.fa.active()&&!this.D.active()?(t=this.h.length(),this.ha+=.5*t,this.ha=.01<t?(this.ha%1+1)%1:0):this.ha=0,this.I.ub=this.lb&&!this.D.active(),this.D.active()||(0<this.ma&&this.Oa&&!this.Rb&&!this.kb.active()&&(--this.ma,(t=new ic(this.g)).h=this.h.add(z(Va(this),r(.8,.7)).normalize(.25+r(.02))),t.O=Va(this)*r(.8,.5),J(sc,this.g),this.kb.set(1)),this.Rb=this.Oa),this.m.x&&!this.D.active()&&(this.s=this.m.x<0),this.g.x=h(this.g.x,Y.x-2,2),r()<.005&&this.Ra.set(r(.2,.1))}}S(){var t,i,s,h;da(this.g,this.size,H,uc)&&(this.F=this.i()?this.Da:this.ca||this.fa.active()?this.Da+2*this.ha|0:this.Da+1,t=this.aa.add(this.jb),this.Ma&&!this.i()&&C>this.wa.time&&this.wa.get()<.2&&(i=.6-3*this.wa.get(),t=ua(t.add(new v(0,i,i,0)))),i=this.Qa,s=this.color.scale(Wb(this),1),h=this.la.scale(Wb(this),1),K(this.g.add(z(0,.06*Math.sin(this.ha*e)-.1).scale(i)),z(i),this.F,this.G,s,this.angle,this.s,t),K(this.g.add(z(Va(this,.05),.46).scale(i).rotate(-this.angle)),z(i/2),this.Va,z(8),s,this.angle,this.s,t),t=this.yb?this.i()?.3:.5+.5*Math.cos(Aa(this.Ra)*e*2):1,K(this.g.add(z(Va(this,.05),.46).scale(i).rotate(-this.angle)),z(i/2,t*i/2),this.Va+1,z(8),h,this.angle,this.s,this.aa))}C(t,i){this.M||1==this.H&&C-this.T<2||(this.i()&&!this.R&&(this.Ya+=t,5<this.Ya&&(vc(this.g,300),this.o())),this.Ra.set(r(.5,.4)),vc((i||this).g),super.C(t,i))}K(t){this.i()||(Tb?this.o():(this.Ja.set(),this.size=this.size.scale(.5),vc(this.g,300),J(wc,this.g),this.P=this.H=0,this.O=(t?t.h.x<0?-1:1:2*(0|r(2))-1)*r(.22,.14),this.ia=.9,this.I&&this.I.o(),this.A=1))}Sa(t,i){if(t)return-1==t?i.y+1>this.Ib.y-.5*this.size.y||N(i.add(z(0,1)))&&(!N(i.add(z(1,0)))||!N(i.add(z(1,0))))?void 0:!this.ca:(t=i.y-this.g.y,!this.ca&&.1<this.h.y&&0<t&&t<.5*this.size.y&&qc(i)?void(this.h.y=0):1)}W(t){return this.i()||.04<pa(t.h)&&(i=25*t.l*pa(t.h.j(this.h)),!t.B&&t.Hb&&!this.R&&t.h.y<0&&this.g.y<t.g.y-t.size.y/2&&f(t.g.x-this.g.x)<.5*t.size.x?(this.C(1e3,t),this.i()&&(vc(this.g,300),this.o())):1<i&&this.C(4*i|0,t)),super.W(t);var i}}function kc(t,i){Pa(t,4,t=>{2==t.H&&t.alert&&t.alert(i)})}class xc extends rc{constructor(t){super(t),this.H=2,this.ga=new D,this.ra=new D,this.ya=new D,this.na=new D,this.$=new D,this.Na=12,this.type=x()**3*aa(yc+1,5)|0,t=1+this.type,this.la=new v(1,.5,0),0==this.type?(this.color=new v(0,1,0),this.size=this.size.scale(this.Qa=.9)):1==this.type?this.color=new v(0,.4,1):2==this.type?(this.color=new v(1,0,0),this.la=new v(1,1,0)):3==this.type?(this.color=new v(1,1,1),this.la=new v(1,0,0),this.Na=15):4==this.type&&(this.color=new v(.7,0,1),this.la=new v(0,0,0),this.ma=3,this.ba=0),(this.Wa=x()<.05)&&(this.size=this.size.scale(this.Qa=1.3),t*=2,this.ma*=10,this.Na=15,--zc),this.P=t,this.color=va(this.color),this.s=r()<.5,new lc(this.g,this),--zc,this.Ob=0|r(9)}update(){if(Tb||this.i()||!Sb(this))this.I&&(this.I.ub=0),super.update();else{if(this.I&&(this.I.pb=this.I.Kb.scale(this.Qa)),Fa%9==this.Ob){var t=B(this.ga)&&this.ga.get()<5,i=(t?1.2*this.Na:this.Na)**2;for(const s of X)if(s&&!s.i()&&(t||Va(this)==(s.g.x-this.g.x<0?-1:1))&&(t||f(s.g.x-this.g.x)>f(s.g.y-this.g.y))&&qa(this.g,s.g)<i&&!cb(this.g,s.g)){this.alert(s.g,1);break}t&&kc(this.g,this.sa)}this.za=this.V=this.Oa=0,B(this.U)?(A(this.ya),r()<.005&&(this.Z.set(.05),this.na.set(r(.05))),r()<.05&&(this.m.x=(2*(0|r(2))-1)*r(.6,.3)),this.m.y=0,3==this.type?this.za=1:this.B&&(this.za=r()<.005)):B(this.ga)&&this.ga.get()<10?(2<=this.type&&this.m.x&&!this.h.x&&this.h.y<0&&(this.h.y*=.8,this.V=1,this.Z.set(.1),this.na.set(r(.2))),t=this.ga.get(),this.I.N*=.8,this.ra.active()?this.m.x=0:t<5?(this.D.active()||(i=this.sa.x-this.g.x<0?-1:1,4==this.type&&r()<.002&&Va(this)==i&&(this.Oa=1),r()<.05&&this.ya.set(r(2,.5)),r()<(this.type<2?5e-4:.005)&&(this.Z.set(.1),this.na.set(r(.2))),r()<(this.Wa?.05:.02)?this.m.x=0:r()<.01&&(this.m.x=r()<.6?i*r(.5,.2):-i*r(.4,.2)),r()<.03&&(this.m.y=r()<.5?0:(2*(0|r(2))-1)*r(.4,.2)),f(this.sa.y-this.g.y)<4&&(!B(this.$)||1<this.$.get())&&r()<(0<this.type?.02:.01)&&this.$.set(this.Wa?r(2,1):.05)),3==this.type&&(this.za=r()<.01&&t<.5)):(r()<.04&&this.ya.set(r(2,.5)),r()<.02?this.m.x=0:r()<.01&&(this.m.x=(2*(0|r(2))-1)*r(.4,.2)),r()<(this.sa.y>this.g.y?.002:.001)&&(this.Z.set(.1),this.na.set(r(.2))),(!B(this.$)||5<this.$.get())&&r()<.001&&this.$.set(r(.2,.1)),this.m.y=h(this.sa.y-this.g.y,.5,-.5))):(r()<.03?this.m.x=0:r()<.005?this.m.x=(2*(0|r(2))-1)*r(.2,.1):r()<.001&&(this.m.x=1e-9*(2*(0|r(2))-1)),this.I.N=ca(.1,.7,this.I.N),A(this.ra)),this.Wa&&3!=this.type&&(A(this.Z),A(this.na)),this.lb=this.$.active(),this.La=this.na.active(),super.update(),!this.ya.active()||this.D.active()||this.ra.active()||(this.s=this.sa.x<this.g.x)}}alert(t,i){!i&&B(this.ga)||(B(this.ra)||(this.ra.set(r(1,.5)*(0==this.type?2:1)),this.ya.set(r(2,1)),this.B&&r()<.2&&(this.h.y+=.1)),this.ga.set(),this.sa=t)}C(t,i){super.C(t,i),this.i()||(this.alert(i?i.g.j(i.h.normalize()):this.g,1),this.ra.set(r(1,.5)),A(this.$))}K(t){this.i()||(super.K(t),Tb||++Ac)}}class Bc extends rc{constructor(t,i=0){super(t),this.ma=3,this.Fa=2,this.la=za(.6*-i,1,.5),i&&(this.color=za(.3*i-.3,.5,.5),this.jb=za(.3*i-.3,1,.1,0)),this.Da=5,this.Va=18,this.v=i,this.A=20+10*i,this.Ba=0,this.H=this.R=this.vb=this.yb=this.Ma=1,new lc(this.g,this),(X[i]=this).h.y=.2,this.s=i%2,--Cc}update(){if(this.i()){if(this.R&&Cc)if(1==X.length)2<this.Ja.get()&&(this.R=0,new Bc(W,this.v),J(sc,H));else{var i=0;let t=1e3;for(const s of X)s&&(t=aa(t,s.i()?s.Ja.get():1e3),i|=!s.i()&&.1<C-s.T);2<t&&(i?fc.active()&&(this.R=0,new Bc(W,this.v),J(sc,H)):(this.R=0,new Bc(W.add(z(1-this.v/2,0)),this.v),this.v||J(sc,H)))}super.update()}else if(this.V=0,this.m.x&&!this.h.x&&this.h.y<0&&(this.h.y*=.8,this.V=1),this.m.x=qb||this.v?tb(this.v).x:nb(39)-nb(37),this.m.y=qb||this.v?tb(this.v).y:nb(38)-nb(40),(this.La=!this.v&&nb(38)||R(0,this.v))?this.vb&&!this.V||this.Z.set(.3):A(this.Z),this.vb=this.La,this.lb=!this.v&&(nb(0)||nb(90))||R(2,this.v),this.Oa=!this.v&&(nb(2)||nb(67))||R(1,this.v),this.za=!this.v&&(nb(1)||nb(88))||R(3,this.v),super.update(),this.Ba+=f(this.h.x),.01<f(this.h.x)&&this.fa.active()&&!this.D.active()?1<this.Ba&&(this.Ba=0,J(pc,this.g)):this.Ba=.5,1<X.length&&!this.i()&&!da(this.g,this.size,H,Dc))if(cb(this.g,z(this.g.x,0)))for(i of X)i&&i!=this&&!i.i()&&(this.g=i.g.L(),this.h=z(),J(sc,this.g));else this.K()}}const oc=[,,90,,.01,.03,4,,,,,,,9,50,.2,,.2,.01],dc=[.5,,1e3,.02,,.2,1,3,.1,,,,,1,-30,.5,,.5],wc=[.5,.4,126,.05,,.2,1,2.09,,-4,,,1,1,1,.4,.03],sc=[.4,.2,250,.04,,.04,,,1,,,,,3],tc=[.4,.2,150,.05,,.05,,,-1,,,,,4,,,,,.02],pc=[.3,.1,70,,,.01,4,,,,-9,.1,,,,,,.5],Ec=[2,.2,72,.01,.01,.2,4,,,,,,,1,,.5,.1,.5,.02],hc=[.6,0,500,,.04,.3,1,2,,,570,.02,.02,,,,.04],Fc=[.02,,1e3,2,,2,,,,,,,,99],Gc=[.01,.3,2e3,2,1,2,,,,,,,1,2,,,,,,.1],jc=[.5,.01,300,,,.02,3,.22,,,-9,.2,,,,,,.5],mc=t=>{t.B&&kb(t.g,t.size,t.F,t.G,t.color,t.angle,t.s)};function vc(t,i=50){new Ab(t,1,.1,i,e,void 0,void 0,new v(1,0,0),new v(.5,0,0),new v(1,0,0),new v(.5,0,0),3,.1,.1,.1,.1,1,.95,.7,e,0,.5,1).Za=mc}function bc(t,i=new v){var s=i.qa(new v,.5);(t=new Ab(t,1,.1,100,e,void 0,void 0,i,s,i,s,3,.2,.2,.1,.05,1,.95,.4,e,0,.5,1)).J=.3,t.Za=mc}function ac(s){new Ab(s,1,.05,400,e,0,void 0,new v(1,1,1,.5),new v(.5,1,1,.2),new v(1,1,1,.5),new v(.5,1,1,.2),.5,.5,2,.1,.05,.9,1,0,e,.5,.5,0,0,0,1e9);const t=new Ab(s,1,.1,400,e,0,void 0,new v(.8,1,1,.6),new v(.5,.5,1,.2),new v(.8,1,1,.6),new v(.5,.5,1,.2),2,.1,.1,.2,0,.99,1,.5,e,.2,.5,1);t.J=.2,t.ta=2,Pa(s,3,t=>{var i;t.oa&&(B(t.U)&&Xb(t),i=t.g.j(s).normalize(3*q(qa(t.g,s)**.5,1.5,3)*.2).scale(1/t.l),t.h=t.h.add(i),t.i&&t.i()&&(t.O+=(2*(0|r(2))-1)*r(.75,.3)))})}function cc(h,a=2){if(!Tb){for(var n=2*a,i=-a;i<a;++i)for(var s=(a**2-i**2)**.5,c=-s;c<=s;++c)qc(h.add(z(i,c)),0,0);for(s=-(i=a+1);s<i;++s)for(let t=-(c=(i**2-s**2)**.5);t<c;++t)Hc(sa(h.add(z(s,t))));Pa(h,3*a,t=>{var i=qa(t.g,h)**.5;t.oa&&(i<a&&t.C(n),i<1.5*a&&Vb(t));var i=q(i,a,2*a),s=t.g.j(h).normalize(i*a*.2).scale(1/t.l);t.h=t.h.add(s),t.i&&t.i()&&(t.O+=(2*(0|r(2))-1)*r(i*a/4,.3))}),J(Ec,h),new Ab(h,a/2,.2,50*a,e,0,void 0,new v(0,0,0),new v(0,0,0),new v(0,0,0,0),new v(0,0,0,0),1,.5,2,.1,.05,.9,1,-.3,e,.1,.5,0,0,0,1e8),new Ab(h,a/2,.1,100*a,e,0,void 0,new v(1,.5,.1),new v(1,.1,.1),new v(1,.5,.1,0),new v(1,.1,.1,0),.5,.5,2,.1,.05,.9,1,0,e,.05,.5,0,1,0,1e9)}}class Ic extends Ya{constructor(t,i=1,s=0){super(t,z()),this.zb=i,this.Eb=new D(s?.05:r(.3,.1))}update(){C>this.Eb.time&&(qc(this.g,1,1,this.zb),this.o())}}function Hc(h){var a=N(h);if(a<=0)a||P.setData(h,new db,1);else if(!(2!=a&3!=a&5!=a&4!=a&1!=a))for(let s=4;s--;)if(N(h.add(ka(z(),s*e/2)))!=a){let i=2==a?z(r(16,8),2):z(16,1);1&s&&(i=new t(i.y,i.x)),P.context.fillStyle=xa(2==a?va(Lc,.1):new v(.1,.1,.1));var n=h.scale(16);2==a?P.context.fillRect(n.x+((1==s?14:0)+(1&s?0:8-i.x/2))|0,P.canvas.height-n.y+((0==s?-14:0)-(1&s?8-i.y/2:0))|0,0|i.x,0|-i.y):P.context.fillRect(n.x+(1==s?15:0)|0,P.canvas.height-n.y+(0==s?-15:0)|0,0|i.x,0|-i.y)}}function qc(t,i=1,s=1,h=1){t=sa(t);var a=N(t);if(!a)return 1;if(1==a)return 0;var e=t.add(z(.5)),n=P.getData(t);if(n){if(bc(e,va(n.color)),i&&J(dc,e),bb(t,0),P.setData(t,new db,1),s)for(i=-1;i<=1;++i)for(s=-1;s<=1;++s)Hc(t.add(z(i,s)));6==a?(h=1,N(t.add(z(0,-1)))==a&&new Ic(t.add(z(0,-1)),1,1)):2!=a&&(h=0),r()<h&&N(t.add(z(0,1)))==a&&new Ic(t.add(z(0,1)),.4*h,6==a)}return 1}function Mc(){var t,i;Nc&&(t=H.add(z(r(-40,40),0)),(i=cb(z(t.x,Y.y),z(t.x,0)))&&i.y>H.y+10&&(t=i),Nc.g=t.add(z(0,20)),r()<.002&&(Nc.X=h(Nc.X+r(200,-200),500),Nc.angle=h(Nc.angle+r(.3,-.3),e+.5,e-.5)),Tb||Oc.active()||(Oc.set(r(2,1)),J(Pc?Fc:Gc,t,20,Nc.X/1e3),r()<.1&&J(Gc,t,20,r(Nc.X/1e3))))}let Qc=[];function Rc(){Qc.forEach((t,i)=>{var s=4+i;i=z(150,30).scale(i*i+1),i=na(H.j(Y.scale(.5)),na(Y.scale(-.5),i)),t.scale=z(s/I),t.g=H.j(t.size.multiply(t.scale).scale(.5)).add(i.scale(1/I)).j(z(0,150/I))})}let X=[],Cc,P,Sc,Ac,Y,yc,Tc,zc,Tb,Uc,Vc,Wc,Lc,Nc,Pc,Oc=new D,Xc=new D,Yc=new D,Zc=new D,$c;const ad=(t,i=0)=>{ta(t,M)&&($c[(0|t.y)*M.x+t.x|0]=i)},bd=t=>ta(t,M)?$c[(0|t.y)*M.x+t.x|0]:0;function cd(t){5<f(W.x-t.x)&&(new $b(t),x()<.2?(new $b(t.add(z(1.02,0))),x()<.2&&new $b(t.add(z(.51,1.02)))):x()<.2&&(new $b(t.add(z(0,1.02))),x()<.2&&new $b(t.add(z(0,2.04)))))}function dd(){A(Zc);for(var s of Da)s.o();Da=[],Ea=[],s=Y,$c=[],M=s,$a=[];for(var t=$a.length=M.x*M.y;t--;)$a[t]=0;for(var i=t=r(40,60),a=r(.5,-.5),e=0,n=0,c=0,o=0;o<s.x;o++){i+=a=r()<.05?r(.5,-.5):a+(t-i)/1e3,r()<.04&&(i+=r(9,-9)),r()<.03&&(a=r(9,-9),t=h(t+a,80,20),i+=a,a=r(.5,-.5)),--e,r()<.005&&(e=r(7,2)),n+=c,r()<.1&&(n=r(3,-1)),r()<.1&&(n=0),r()<.1&&(c=r(1,-1));for(var n=h(n,3,-1),i=h(i,99,30),b=0;b<s.y;b++){var l=z(o,b),d=0;b<i&&e<=0&&(d=2);var v=b<i+n?2:0;bb(l,d),ad(l,v)}}for(s=Y.x;s--;)for(t=z(r(Y.x),r(Y.y-19,19)),i=0|r(9,1);--i;)for(e=0|r(9,1);--e;)bb(t.add(z(i,e)),0);for(s=99;!u;){if(!s--)return 1;W=z(Y.x/2+(Y.x/2-10-x(9))*(x()<.5?-1:1)|0,Y.y);var u=cb(W,z(W.x,0))}for(W=u.add(z(0,1)),u=99;0<zc;){if(!(s=!u--))t:{for(i=void 0,s=99;!i;){if(!s--){s=1;break t}t=z(x(Y.x-40,40),Y.y),30<f(W.x-t.x)&&(i=cb(t,z(t.x,0)))}for(t=r()<.5,s=sa(i),e=0|x(20,9),i=t?1:0|x(6,1),n=0|x(t?7:4,0),(s=s.j(z(0,6*n))).y=ba(s.y,9),n=-n;n<=i;++n){for(o=n==i,c=!n,c=(b=t?r()<.8|(0==n&&r()<.6):0)?0|x(9,2):o?0:c?0|x(9,4):0|x(7,2),a=o?4:ba(c-1,0),l=r()<.5,d=r(4,2),v=-e;v<=e;++v){var g=!b&&x()<.3;b||x(),t?l=0:r()<.1&&(l=!l),t&&r()<.2&&(c=h(c+r(3,-3)|0,9,2));for(let i=-1;i<c;++i){var y,w=s.add(z(v,i));let t=0;b?(i<0|i==c-1&&(t=2),ad(w,2)):((y=i<0|i==c-1)&&(t=4),(v<0?-v:v)==e&&(t=y?3:g?6:5),y=0<t||c<3?7:3,l&&0<i&&i<c-d&&(v<0?-v:v)<e-2&&(y=8),ad(w,y)),bb(w,t)}}if(!t||!o)for(b=x(2)+1|0;b--;)for(l=0|x(e-1,1-e),s.add(z(l,-2)),d=0;d<Y.y&&!((v=s.add(z(l,-d-1))).y<2);++d)if(d&&0<N(v)&&N(v.add(z(0,1)))<=0){for(;d--;)v=s.add(z(l,-d-1)),bb(v,-1);break}for(l=b=0|x(e/2);l--;)cd(s.add(z(x(e-2,2-e),.5)));if(o||1<a)for(o=b;o--;)a=s.add(z(x(e-1,1-e),.7)),new xc(a);o=e,e=0|ba(e+x(8,-8),9),s.y+=c,s.x+=0|x(o-e+1)}for(t=20;0<zc&&t--;)(i=cb(e=z(s.x+x(99,-99),Y.y),z(e.x,0)))&&20<f(W.x-e.x)&&(i=i.add(z(0,2)),x()<.7?new xc(i):cd(i));s=void 0}if(s)return 1}for(s=0;s<Y.x-9;)s+=r(100,70),(u=cb(t=z(s,Y.y),z(t.x,0)))&&50<f(W.x-t.x)&&(u=u.add(z(0,1)),new gc(u))}function ed(){P=new lb(Y),P.A=-1e3,Sc=new lb(Y),Sc.A=-2e3;for(var t=Y.x;t--;)for(var i=Y.y;i--;){var s,h,a,n,c=z(t,i),o=N(c);if(o&&(s=0|r(4),h=0|r(2),a=void 0,n=8,2==o?(n=10+2*r()**3|0,a=va(Uc,.03)):4==o?(n=13,s=1):5==o?(n=13,s=0):6==o?(n=13,s=0,a=new v(0,1,1,.5)):3==o?n=12:-1==o&&(n=15,s=h=0),P.setData(c,new db(n,s,h,a))),o=bd(c)){s=0|r(4),h=0|r(2),n=new v;let t=8;2==o?(t=10+2*r()**3|0,n=va(Uc)):3==o?(t=14,n=n.scale(r(1,.7),1)):7==o?(t=14,n=va(n.scale(r(.5,.3),1))):8==o&&(t=0,n=new v(0,1,1,.5)),Sc.setData(c,new db(t,s,h,n.scale(.4,1)))}}for(hb(t=P),jb(t),mb(1),[Ca,F,G,I,H]=t.tb,hb(t=Sc),jb(t),mb(1),[Ca,F,G,I,H]=t.tb,i=Y.x;i--;)for(c=Y.y;--c;){if(t=z(i,c),!(bd(t)<=0))for(o=4;o--;)0<(a=bd(t.add(ka(z(),o*e/2))))|0<(s=bd(t.add(ka(z(),(o+1)%4*e/2))))||(a=sa(ka(z(),o*e/2+e/4,10)),a=sa(t.add(z(.5)).scale(16).add(a)),Sc.context.clearRect(a.x-1|0,Sc.canvas.height-a.y-1|0,2,2));Hc(z(i,c))}for(Qc=[],t=0;t<3;++t)for(i=z(600,300),c=r(99,120)+30*t,o=Qc[t]=new lb(i),a=c,s=r(1,-1),o.A=-3e3+t,o.canvas.width=i.x,h=va(Uc,.2).qa(Vc,.95-.15*t),(n=o.context.fillStyle=o.context.createLinearGradient(0,0,0,o.canvas.height=i.y)).addColorStop(0,xa(h)),n.addColorStop(1,xa(ua(va(h.j(new v(1,1,1,0)),.1)))),h=i.x;h--;)o.context.fillRect(h,a+=s=r()<.05?r(1,-1):s+(c-a)/2e3,1,i.y)}function fd(){for(Cc+=4,zc=15+aa(30*yc,300),++yc,Tc=ma=0|r(1e9),Y=z(aa(99*yc,400),200),Uc=la(new v(.2,.2,.2),new v(.8,.8,.8)),Vc=la(new v(.5,.5,.5),new v(.9,.9,.9)),Wc=ua(va(Vc.j(new v(.05,.05,.05)),.3)),Lc=ua(va(Uc).add(new v(.3,.3,.3)));dd(););Tb=1;const i=new gc(W).setActive();ed();for(let t=120;t--;)Mc(),Oa();Pa(Tb=0,0,t=>{t.oa&&t!=i&&(t.Gb?0<bd(t.g):Za(t.g,t.size))&&t.o()}),Yc.set(),X=[],new Bc(W)}let Ub,uc,Dc;!function(){Na.onload=()=>{Ma=na(z(1),La=z(Na.width,Na.height)),document.body.appendChild(F=document.createElement("canvas")),document.body.style="margin:0;overflow:hidden;background:#000",F.style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);image-rendering:crisp-edges;image-rendering:pixelated",G=F.getContext("2d"),Kb(),A(Zc),Xc.set(Ac=yc=0),fd(Cc=6),I=64,e()};const e=(t=0)=>{requestAnimationFrame(e),document.hasFocus()||(Q[0].length=0);var i=t-Ga;for(Ga=t,Ha+=i,Qb(pb),vb(),t=0,Ha<0&&-9<Ha&&(t=Ha,Ha=0),Ha=Ha<50?Ha:50;0<=Ha;Ha-=1e3/60){(()=>{uc=z(F.width,F.height).scale(1/I).add(z(5)),Dc=z(F.width,F.height).scale(.015625),Ub=Dc.add(z(30));let t=1e3;for(const i of X)t=aa(t,i&&i.i()?i.Ja.get():0);if(3<t&&(ob(90)||ob(32)||ub(0))||ob(82))A(Zc),Xc.set(Ac=yc=0),fd(Cc=6);3<Zc.get()&&fd()})(),Oa(),(()=>{if(1==X.length){var i=X[0];i.i()||(H=H.qa(i.g,h((C-i.T)/2)))}else{i=z();let t=0;for(const s of X)s&&!s.i()&&(++t,i=i.add(s.g.add(z(0,1))));t&&(H=H.qa(i.scale(1/t),.2))}for(i=4;i--;)X[i]||!ub(0,i)&&!ub(1,i)||(++Cc,new Bc(W,i));i=F.width/2/I+1,H.y=ba(H.y,F.height/2/I+2),2*i<M.x&&(H.x=h(H.x,M.x-i,i)),Rc(),Mc()})();for(var s of Q)s.map(t=>t.r=t.p=0)}Ha+=t,F.width=innerWidth<1920?innerWidth:1920,F.height=innerHeight<1200?innerHeight:1200,Ca=z(F.width,F.height),G.imageSmoothingEnabled=!1,ib(F.width,F.height),(()=>{var s=G.createLinearGradient(0,0,0,F.height);for(s.addColorStop(0,xa(Vc)),s.addColorStop(1,xa(Wc)),G.fillStyle=s,G.fillRect(0,0,F.width,F.height),ma=Tc,s=400;s--;){let t=x(6,1);var h=.9>x()?x(5):x(99,9);let i=za(x(.2,-.3),x()**9,x(1,.5),x(.9,.3));9>s&&(t=99*x()**3+9,h=x(5),i=ua(za(x(),x(),x(1,.5)).add(Vc.scale(.5))));const a=F.width+400,e=F.height+400;h=z((x(a)+C*h)%a-200,(x(e)+C*h*x(1,.2))%e-200);G.fillStyle=xa(i);9>t?G.fillRect(h.x,h.y,t,t):G.beginPath(G.fill(G.arc(h.x,h.y,t,0,9)))}})(),Da.sort((t,i)=>t.A-i.A);for(const a of Da)a.M||a.S();mb(),(()=>{G.textAlign="center";var t=q(Xc.get(),8,10),i;G.fillStyle=xa(new v(0,0,0,t)),0<t&&(G.font="1.5in impact",G.fillText("SPACE HUGGERS",F.width/2,140)),G.font=".5in impact",0<t&&G.fillText("A JS13K Game by Frank Force",F.width/2,210),t=0;for(i of Ea)if(i.Xa&&2==i.H){++t;var s=i.size.scale(20),h=i.color.scale(1,.6);Rb(z(F.width/2+30*(i.g.x-H.x),F.height-20),s,h)}t||B(Zc)||Zc.set(),G.fillStyle=xa(new v(0,0,0)),G.fillText("Level "+yc+"      Lives "+Cc+"      Enemies "+t,F.width/2,F.height-40),i=B(Zc)?q(Zc.get(),3,1):q(Yc.get(),.5,2),K(H,z(1e3),-1,E,new v(0,0,0,i),void 0)})(),mb()};Na.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABABAMAAAAg+GJMAAAAJ1BMVEUAAAD///+AgID/AAAAAACJT6T/dwBIG11mlD2i91azs7PZ2dlAQEA9UPniAAAAAXRSTlMAQObYZgAAAoRJREFUeNqsk8dZw0AQhWfNiHDbARfgVAB0sNI3LTgcfSLcbasC0o0j6panHIYMT+FX+p8y/UdECJnNJlTn6PJnft4wEvHFasCkis2JakItl9dpemjZxgniywInnhX2hWAxXug0NIwKcduwjRTpF8hVLp7PJDSEuE5X24ofFZAQV7cAEZtDQ4jLJcSKgzuAXD8DDuVDdGOFmWjNaPN0v1zdPtU0BTSIi8cQY60ZPWcQ715r2oIzeqFupBQbZqVY0xY8PT1RN6zIh7QP8TTL+lcwmiE1megkRagif1DgvB8WsAILbQpYgZ2aD8kWsGLMUSybdfMpm1tgDRiJzfr7P5MteGufDpXchoE4jGcKj32C2oBKsM5jlPUlT4VKyN9TdFuSwKsfqrLHTcE5ucQgKL8H+GZW2n0YZptZKUXSXhIUic4nfa4OXrPPNmXTxI8BwzCBFcP6DjGxfwFmmwIwBv548/sccBJqPGRK10uYu5YCtRkD/r3xc8AEELDOk6ZAn3OHXR7h19D8OAckE3ukFiAkyb7V+lPXAqecd/8DYCSAkAGK+r37W3fhDZYCQqg4ICS/HKjNQsACbuYYRHLmHLh1BFfRHikKevd0dwATAQzTW3Dv7n8DKCrsZSF51wLh2hssfCOGQTLoegvZrn/j0iIlVEyKLSDjk0VaWGVjZERCQpHLqwywcEzIlbCChLArx1SbpQBgjITB5+f88l6bw+tLnbzW2eZWJQGEOMwKk3hz4JQnuy8FIH4tw+T2QNkNzSmeA0eA7T0BgFMc8mQox9qsCiQIY+AwDO/bNSOk4zaMIxxyvi8AMAW2xwcH1o+w/hHXf+P6RVq/yo86pjXn/PT09LTsL3dlHSBbTLmdAAAAAElFTkSuQmCC"}();