import{basename as He}from"node:path";import{renderSSRHead as Xe}from"@unhead/ssr";import{renderToString as qe}from"@vue/server-renderer";import{createHead as Oe}from"@unhead/vue";import{createPinia as Pe,defineStore as Te,storeToRefs as ae}from"pinia";import{ref as M,defineComponent as W,unref as v,mergeProps as F,useSSRContext as E,reactive as O,onMounted as re,computed as K,createElementBlock as De,toRefs as j,getCurrentInstance as ze,onActivated as Ve,toRef as Y,resolveComponent as Me,withCtx as C,createVNode as _,resolveDynamicComponent as he,Transition as Je,openBlock as Z,createBlock as ee,KeepAlive as Ge,Suspense as Ke,createSSRApp as Ye}from"vue";import{ElMessage as Ce,ElLoading as Qe,ElMessageBox as V}from"element-plus";import{ssrRenderAttrs as N,ssrRenderAttr as A,ssrRenderComponent as k,ssrRenderSuspense as Ze,ssrRenderVNode as et}from"vue/server-renderer";import{useWindowSize as tt,useRafFn as nt,useWindowScroll as ot,useToggle as st}from"@vueuse/core";import{strLen as ve,isBrowser as Be}from"@lincy/utils";import se from"md5";import{useRoute as Le,onBeforeRouteLeave as at,useRouter as rt,createRouter as it,createMemoryHistory as ct}from"vue-router";import U from"axios";import Ae from"qs";import We from"js-cookie";import{LRUCache as lt}from"lru-cache";import pt from"node:process";function dt(e){return e.use(Qe),e.config.globalProperties.$msgbox=V,e.config.globalProperties.$alert=V.alert,e.config.globalProperties.$confirm=V.confirm,e.config.globalProperties.$prompt=V.prompt,e.config.globalProperties.$message=Ce,e}const ut=Ce;function mt(e){dt(e)}const ft={install:mt};function gt(e={}){const{immediate:n=!1,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e;let i,c;const l=async(m=!0)=>{await c};async function h(){if("serviceWorker"in navigator){if(i=await import("./assets/workbox-window.prod.es5-CC4K6GI8.js").then(({Workbox:m})=>new m("/sw.js",{scope:"/",type:"classic"})).catch(m=>{a==null||a(m)}),!i)return;i.addEventListener("activated",m=>{(m.isUpdate||m.isExternal)&&window.location.reload()}),i.addEventListener("installed",m=>{m.isUpdate||s==null||s()}),i.register({immediate:n}).then(m=>{o?o("/sw.js",m):r==null||r(m)}).catch(m=>{a==null||a(m)})}}return c=h(),l}function ht(e={}){const{immediate:n=!0,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e,i=M(!1),c=M(!1);return{updateServiceWorker:gt({immediate:n,onNeedRefresh(){i.value=!0,t==null||t()},onOfflineReady(){c.value=!0,s==null||s()},onRegistered:r,onRegisteredSW:o,onRegisterError:a}),offlineReady:c,needRefresh:i}}const ie=W({name:"ReloadPrompt",__name:"reload-prompt",__ssrInlineRender:!0,setup(e){const{offlineReady:n,needRefresh:t,updateServiceWorker:s}=ht();return(r,o,a,i)=>{v(t)?o(`<div${N(F({id:"app-refresh",class:"app-refresh"},i))}><div class="app-refresh-wrap"><label>新内容可用，单击刷新按钮更新</label><span>刷新</span><span>关闭</span></div></div>`):o("<!---->")}}}),we=ie.setup;ie.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/reload-prompt.vue"),we?we(e,n):void 0};const vt="#88888825",ce=W({__name:"bg-plum",__ssrInlineRender:!0,setup(e){const n=Math.PI,t=Math.PI/2,s=Math.PI/12,r=M(null),{random:o}=Math,a=O(tt()),i=M(()=>{}),c=M(4),l=M(6),h=M(!1);function m(p,f=400,d=400,x){const g=p.getContext("2d"),$=window.devicePixelRatio||1,B=g.webkitBackingStorePixelRatio||g.mozBackingStorePixelRatio||g.msBackingStorePixelRatio||g.oBackingStorePixelRatio||g.backingStorePixelRatio||1,w=$/B;return p.style.width=`${f}px`,p.style.height=`${d}px`,p.width=w*f,p.height=w*d,g.scale(w,w),{ctx:g,dpi:w}}function b(p=0,f=0,d=0,x=0){const g=d*Math.cos(x),$=d*Math.sin(x);return[p+g,f+$]}re(async()=>{const p=r.value,{ctx:f}=m(p,a.width,a.height),{width:d,height:x}=p;let g=[],$=[],B=0;const w=(P,I,Q)=>{const Fe=o()*l.value,[X,q]=b(P,I,Fe,Q);f.beginPath(),f.moveTo(P,I),f.lineTo(X,q),f.stroke();const Ne=Q+o()*s,Ue=Q-o()*s;X<-100||X>a.width+100||q<-100||q>a.height+100||((B<=c.value||o()>.5)&&g.push(()=>w(X,q,Ne)),(B<=c.value||o()>.5)&&g.push(()=>w(X,q,Ue)))};let H=performance.now();const z=1e3/40;let L;L=nt(()=>{performance.now()-H<z||(B+=1,$=g,g=[],H=performance.now(),$.length||(L.pause(),h.value=!0),$.forEach(P=>P()))},{immediate:!1}),i.value=()=>{L.pause(),B=0,f.clearRect(0,0,d,x),f.lineWidth=1,f.strokeStyle=vt,$=[],g=[()=>w(o()*a.width,0,t),()=>w(o()*a.width,a.height,-t),()=>w(0,o()*a.height,0),()=>w(a.width,o()*a.height,n)],a.width<500&&(g=g.slice(0,2)),L.resume(),h.value=!1},i.value()});const u=K(()=>"radial-gradient(circle, transparent, black);");return(p,f,d,x)=>{f(`<div${N(F({class:"pointer-events-none fixed bottom-0 left-0 right-0 top-0",style:[{"z-index":"-1"},`mask-image: ${v(u)};--webkit-mask-image: ${v(u)};`]},x))}><canvas width="400" height="400"></canvas></div>`)}}}),_e=ce.setup;ce.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/bg-plum.vue"),_e?_e(e,n):void 0};const le=W({name:"ClientOnly",props:{fallback:String,placeholder:String,placeholderTag:String,fallbackTag:String},setup(e,{slots:n}){const t=M(!1);return re(()=>{t.value=!0}),s=>{var i;if(t.value)return(i=n.default)==null?void 0:i.call(n);const r=n.fallback||n.placeholder;if(r)return r();const o=s.fallback||s.placeholder||"",a=s.fallbackTag||s.placeholderTag||"span";return De(a,null,o)}}}),ke=le.setup;le.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/client-only.vue"),ke?ke(e,n):void 0};const pe=W({name:"BackTop",__name:"back-top",__ssrInlineRender:!0,setup(e){const{y:n}=ot();return(t,s,r,o)=>{s(`<div${N(F({style:v(n)>500?null:{display:"none"},class:"back-top"},o))}><a href="javascript:;"></a></div>`)}}}),ye=pe.setup;pe.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/back-top.vue"),ye?ye(e,n):void 0};Pe();const D=Te("globalStore",()=>{const e=O({loading:!1,cookies:{},showLoginModal:!1,showRegisterModal:!1,ISDEV:!1,ISPRE:!1,ISPROD:!0}),n=r=>{e.showLoginModal=r},t=r=>{e.showRegisterModal=r},s=r=>{e.cookies=r};return{...j(e),setLoginModal:n,setRegisterModal:t,setCookies:s}}),de=Te("appShellStore",()=>{const e=O({needPageTransition:!0,isPageSwitching:!1,pageTransitionName:"",historyPageScrollTop:{}}),n=()=>{e.needPageTransition=!0},t=()=>{e.needPageTransition=!1},s=a=>{e.isPageSwitching=a},r=a=>{const{path:i,scrollTop:c}=a;e.historyPageScrollTop[i]=c},o=a=>{e.pageTransitionName=a};return{...j(e),enablePageTransition:n,disablePageTransition:t,setPageSwitching:s,saveScrollTop:r,setPageTransitionName:o}});function un(){const e=ze(),n=e.appContext.config.globalProperties,t=e.type;return{ctx:n,options:t}}function Ee(e,n="auto"){const[t,s]=st(!1);return async(...r)=>{if(!t.value){s(!0);try{const o=await e(...r);(n===!0||n==="auto"&&o!==!1)&&s(!1)}catch(o){throw s(!1),o}}}}function mn(){const e=Le(),n=de(),{historyPageScrollTop:t}=ae(n);Ve(()=>{const s=t.value[e.fullPath]||0;setTimeout(()=>{window.scrollTo(0,s)},300)}),re(()=>{const s=t.value[e.fullPath]||0;setTimeout(()=>{window.scrollTo(0,s)},300)}),at((s,r,o)=>{n.saveScrollTop({path:r.fullPath,scrollTop:Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop)}),o()})}function te(e,n){return e=e||"123456",e=decodeURIComponent(e),n=n||256,`https://cravatar.cn/avatar/${se(e)}?s=${n}&d=identicon&r=g`}function T(e){let n,t;e?typeof e=="string"?(n=e,t="error"):(n=e.content,t=e.type):(n="接口返回数据错误",t="error"),ut[t](n)}const J={api:"/api/",timeout:3e4};U.interceptors.request.use(e=>e,e=>Promise.reject(e));U.interceptors.response.use(e=>e,e=>Promise.resolve(e.response));function ne(e){return e&&(e.status===200||e.status===304)?e.data:{code:-404,message:e&&e.statusText||"未知错误",data:""}}function oe(e){return e.code===-500?window.location.href="/backend":e.code===-400?window.location.href="/":e.code!==200&&T(e.message),e}function wt(){return{async file(e,n){const t=await U({method:"post",url:e,data:n,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=ne(t);return oe(s)},async post(e,n){const t=await U({method:"post",url:J.api+e,data:Ae.stringify(n),timeout:J.timeout,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}),s=ne(t);return oe(s)},async get(e,n){const t=await U({method:"get",url:J.api+e,params:n,timeout:J.timeout,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=ne(t);return oe(s)}}}const Ie=wt(),ue=W({name:"SignUp",__name:"sign-up",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=j(e),s=Y(t,"show"),r=D(),o=O({username:"",email:"",password:"",re_password:""});function a(){r.setLoginModal(!0),r.setRegisterModal(!1)}return Ee(async()=>{const i=/^[\w\-.]+@[\w-]+\.[\w-]+$/;if(!o.username||!o.password||!o.email)return T("请将表单填写完整!");if(ve(o.username)<4)return T("用户长度至少 2 个中文或 4 个英文!");if(i.test(o.email)){if(ve(o.password)<8)return T("密码长度至少 8 位!");if(o.password!==o.re_password)return T("两次输入的密码不一致!")}else return T("邮箱格式错误!");const{code:c,message:l}=await Ie.post("frontend/user/insert",o);c===200&&(T({type:"success",content:l}),a())}),(i,c,l,h)=>{c(`<div${N(F({class:["modal-wrap modal-signup-wrap",s.value?"active":""]},h))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">注册</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${A("value",v(o).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${A("value",v(o).email)} type="text" placeholder="邮箱" class="base-input" name="email"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${A("value",v(o).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${A("value",v(o).re_password)} type="password" placeholder="重复密码" class="base-input" autocomplete="off" name="re_password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认注册</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">直接登录</a></form></div></div></div>`)}}}),be=ue.setup;ue.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/sign-up.vue"),be?be(e,n):void 0};const me=W({name:"SignIn",__name:"sign-in",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=j(e),s=Y(t,"show");D();const r=O({username:"",password:""});return Ee(async()=>{if(!r.username||!r.password)return T("请将表单填写完整!");const{code:o,message:a}=await Ie.post("frontend/user/login",r);o===200&&(T({type:"success",content:a}),window.location.reload())}),(o,a,i,c)=>{a(`<div${N(F({class:["modal-wrap modal-sign-in-wrap",s.value?"active":""]},c))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">登录</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${A("value",v(r).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${A("value",v(r).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认登录</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">我要注册</a></form></div></div></div>`)}}}),Se=me.setup;me.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/sign-in.vue"),Se?Se(e,n):void 0};const fe=W({name:"GlobalNavigation",__name:"global-navigation",__ssrInlineRender:!0,props:{isBackend:{type:Boolean}},setup(e){const t=j(e),s=Y(t,"isBackend"),r=D(),o=j(r),a=Y(o,"cookies"),i=K(()=>!!a.value.user);return rt(),(c,l,h,m)=>{const b=Me("router-link");l(`<nav${N(F({class:"global-nav"},m))}><div class="wrap"><div class="left-part">`),l(k(b,{to:"/","active-class":"current",exact:"",class:"logo-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-logo"${d}></i><span class="hidden"${d}>M.M.F 小屋</span>`);else return[_("i",{class:"icon icon-nav-logo"}),_("span",{class:"hidden"},"M.M.F 小屋")]}),_:1},h)),l('<div class="main-nav">'),l(k(b,{to:"/","active-class":"current",exact:"",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-home"${d}></i><span class="text"${d}>首页</span>`);else return[_("i",{class:"icon icon-nav-home"}),_("span",{class:"text"},"首页")]}),_:1},h)),l(k(b,{to:"/trending/visit","active-class":"current",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-explore"${d}></i><span class="text"${d}>热门</span>`);else return[_("i",{class:"icon icon-nav-explore"}),_("span",{class:"text"},"热门")]}),_:1},h)),l(k(b,{to:"/about","active-class":"current",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-features"${d}></i><span class="text"${d}>关于</span>`);else return[_("i",{class:"icon icon-nav-features"}),_("span",{class:"text"},"关于")]}),_:1},h)),l('<a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link"><i class="icon icon-nav-game"></i><span class="text">汉兜</span></a></div></div>'),s.value?l("<!---->"):(l('<div class="right-part"><span class="nav-search"><i class="icon icon-search-white"></i><input placeholder="记得按回车哦" name="search" class="nav-search-input"></span>'),v(i)?(l('<span class="nav-me">'),l(k(b,{to:"/user/account",class:"nav-me-link"},{default:C((u,p,f,d)=>{if(p)p(`<img${A("src",("useAvatar"in c?c.useAvatar:v(te))(a.value.useremail,100))} class="nav-avatar-img"${d}>`);else return[_("img",{src:("useAvatar"in c?c.useAvatar:v(te))(a.value.useremail,100),class:"nav-avatar-img"},null,8,["src"])]}),_:1},h)),l("</span>")):l(`<span class="nav-me"><a href="javascript:;" class="nav-me-link"><img${A("src",("useAvatar"in c?c.useAvatar:v(te))("noavatar"))} class="nav-avatar-img"></a></span>`),l("</div>")),l("</div></nav>")}}}),$e=fe.setup;fe.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/global-navigation.vue"),$e?$e(e,n):void 0};const ge=W({name:"AppRoot",__name:"app",__ssrInlineRender:!0,setup(e){const n=D(),{showLoginModal:t,showRegisterModal:s}=j(n),r=de(),{pageTransitionName:o}=ae(r),a=M("frontend-index,frontend-about"),i=Le(),c=K(()=>(i.meta.path||i.path).replace(/\//g,"_")),l=K(()=>i.path.includes("backend"));function h(){r.setPageSwitching(!0)}function m(){r.setPageSwitching(!1)}return(b,u,p,f)=>{const d=fe,x=Me("router-view"),g=me,$=ue,B=pe,w=le,H=ce,z=ie;u(`<div${N(F({class:l.value?"backend":"frontend"},f))}>`),u(k(d,{"is-backend":l.value},null,p)),u(k(x,{class:"app-view relative"},{default:C(({Component:L},R,P,I)=>{if(R)R(""),Ze(R,{default:()=>{et(R,_(he(L),{key:c.value},null),P,I)},_:2});else return[_(Je,{name:v(o),mode:"out-in",onBeforeEnter:h,onAfterEnter:m},{default:C(()=>[(Z(),ee(Ge,{key:c.value,include:a.value},[(Z(),ee(Ke,null,{default:C(()=>[(Z(),ee(he(L),{key:c.value}))]),_:2},1024))],1032,["include"]))]),_:2},1032,["name"])]}),_:1},p)),u(k(g,{show:v(t)},null,p)),u(k($,{show:v(s)},null,p)),u(k(B,null,null,p)),u(k(w,null,{default:C((L,R,P,I)=>{if(R)R(k(H,null,null,P,I)),R(k(z,null,null,P,I));else return[_(H),_(z)]}),_:1},p)),u("</div>")}}}),xe=ge.setup;ge.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/app.vue"),xe?xe(e,n):void 0};const _t=()=>import("./assets/404-D0w0gOYR.js"),G=()=>import("./assets/frontend-index-Dom7-Klc.js"),kt=()=>import("./assets/frontend-article-DnjYq3pu.js"),yt=()=>import("./assets/frontend-about-Bg6uE_1l.js"),bt=()=>import("./assets/frontend-user-C1jU9P6w.js"),St=()=>import("./assets/frontend-user-account-ByIbFl-L.js"),$t=()=>import("./assets/frontend-user-password-CwvfjE_V.js"),xt=()=>import("./assets/backend-login-CQH8C2qr.js"),Rt=()=>import("./assets/backend-index-CToHr1D5.js"),Pt=()=>import("./assets/backend-article-list-BMse1YoK.js"),Tt=()=>import("./assets/backend-article-insert-C_9_6yZ4.js"),Mt=()=>import("./assets/backend-article-modify-B60lrUad.js"),Ct=()=>import("./assets/backend-article-comment-T7SXaAfl.js"),Bt=()=>import("./assets/backend-category-list-BIGnbk_r.js"),Lt=()=>import("./assets/backend-category-insert-BTiMCUPY.js"),At=()=>import("./assets/backend-category-modify-CdV93Np6.js"),Wt=()=>import("./assets/backend-admin-list-BQeYowtV.js"),Et=()=>import("./assets/backend-admin-modify-CEDv1zCs.js"),It=()=>import("./assets/backend-user-list-BNT29NBI.js"),jt=()=>import("./assets/backend-user-modify-Ojxzqoyr.js");function Ft(e,n,t){const s=We.get("user");Be&&!s?t("/"):t()}function Nt(e,n,t){const s=We.get("b_user");Be&&!s?t("/backend/login"):t()}const S={meta:{index:1,path:"/backend"},beforeEnter:Nt},Ut=[{path:"/index.html",redirect:"/"},{name:"index",path:"/",component:G,meta:{index:1}},{name:"trending",path:"/trending/:by",component:G,meta:{index:1}},{name:"category",path:"/category/:id",component:G,meta:{index:1}},{name:"search",path:"/search/:key",component:G,meta:{index:1}},{name:"article",path:"/article/:id",component:kt,meta:{index:2}},{name:"about",path:"/about",component:yt,meta:{index:1}},{name:"account",path:"/user",component:bt,meta:{index:1},beforeEnter:Ft,children:[{path:"account",component:St,meta:{path:"/user"}},{path:"password",component:$t,meta:{path:"/user"}}]},{name:"backend",path:"/backend",component:Rt,redirect:"/backend/article/list",children:[{name:"login",path:"login",component:xt},{name:"admin_list",path:"admin/list",component:Wt,...S},{name:"admin_modify",path:"admin/modify/:id",component:Et,...S},{name:"article_list",path:"article/list",component:Pt,...S},{name:"article_insert",path:"article/insert",component:Tt,...S},{name:"article_modify",path:"article/modify/:id",component:Mt,...S},{name:"article_comment",path:"article/comment/:id",component:Ct,...S},{name:"category_list",path:"category/list",component:Bt,...S},{name:"category_insert",path:"category/insert",component:Lt,...S},{name:"category_modify",path:"category/modify/:id",component:At,...S},{name:"user_list",path:"user/list",component:It,...S},{name:"user_modify",path:"user/modify/:id",component:jt,...S}]},{name:"404",path:"/:catchAll(.*)",component:_t}];function Ht(e){const n=it({history:ct(),routes:Ut}),t="slide-left",s="slide-right";return n.beforeEach((r,o,a)=>{const i=de(e),{needPageTransition:c}=ae(i);if(c.value){let l;!o.meta.index||r.meta.index===o.meta.index?l="fade":r.meta.index>o.meta.index?l=t:l=s,i.setPageTransitionName(l)}a()}),n}console.log("当前环境: production");function Xt(){const e=Ye(ge),n=Pe(),t=Ht(n),s=Oe();return e.use(n).use(t).use(s).use(ft),{app:e,router:t,store:n,head:s}}const je=pt.env.API_URL||"http://127.0.0.1:4000";console.log(`当前API地址: ${je}`);const qt=new lt({max:1e3,ttl:1e3*60*5})||null,y={api:`${je}/api/`,port:8080,timeout:3e4,cached:qt};function Ot(e){if(!e)return"";let n="";return Object.keys(e).forEach(t=>{n+=`${t}=${e[t]}; `}),n}function Dt(e){return{cookies:e,api:U.create({baseURL:y.api,headers:{"X-Requested-With":"XMLHttpRequest",cookie:Ot(e)},timeout:y.timeout}),getCookies(){return this.cookies},async post(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"post",url:n,data:Ae.stringify(t),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data},async get(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"get",url:n,params:t,headers:{...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data}}}function Re(e){return e.endsWith(".js")?`<link rel="modulepreload" crossorigin href="${e}">`:e.endsWith(".css")?`<link rel="stylesheet" href="${e}">`:e.endsWith(".woff")?` <link rel="preload" href="${e}" as="font" type="font/woff" crossorigin>`:e.endsWith(".woff2")?` <link rel="preload" href="${e}" as="font" type="font/woff2" crossorigin>`:e.endsWith(".gif")?` <link rel="preload" href="${e}" as="image" type="image/gif">`:e.endsWith(".jpg")||e.endsWith(".jpeg")?` <link rel="preload" href="${e}" as="image" type="image/jpeg">`:e.endsWith(".png")?` <link rel="preload" href="${e}" as="image" type="image/png">`:""}function zt(e,n){let t="";const s=new Set;return e.forEach(r=>{const o=n[r];o&&o.forEach(a=>{if(!s.has(a)){s.add(a);const i=He(a);if(n[i])for(const c of n[i])t+=Re(c),s.add(c);t+=Re(a)}})}),t}function Vt(e){return e.replace(/<script(.*?)>/gi,"&lt;script$1&gt;").replace(/<\/script>/g,"&lt;/script&gt;")}async function fn(e,n,t){const{app:s,router:r,store:o,head:a}=Xt();s.component("ReloadPrompt",{render:()=>null}).component("VMdEditor",{render:()=>null}),r.push(e),await r.isReady(),r.currentRoute.value.matched.length;const i=r.currentRoute.value.matched.flatMap(u=>Object.values(u.components));D(o).setCookies(t.cookies);try{await Promise.all(i.map(u=>u.asyncData?u.asyncData({store:o,route:r.currentRoute.value,req:t,api:Dt(t&&t.cookies)}):null).filter(Boolean))}catch(u){console.log(u)}const l={};let h=await qe(s,l);const{headTags:m}=await Xe(a);h+=`<script>window.__INITIAL_STATE__ = ${Vt(JSON.stringify(o.state.value))}<\/script>`;const b=zt(l.modules,n);return{html:h,preloadLinks:b,headTags:m,store:o}}export{le as _,D as a,Ee as b,Ie as c,te as d,un as e,de as f,fn as render,T as s,mn as u};
