import{basename as Oe}from"node:path";import{renderToString as Ue}from"@vue/server-renderer";import{createHead as He,renderHeadToString as Xe}from"@vueuse/head";import{reactive as q,toRefs as I,ref as M,defineComponent as E,unref as v,mergeProps as N,useSSRContext as W,onMounted as xe,computed as G,createElementBlock as qe,getCurrentInstance as ze,watch as De,toRef as K,resolveComponent as Pe,withCtx as C,createVNode as k,resolveDynamicComponent as ge,Transition as Ve,openBlock as Q,createBlock as ee,KeepAlive as Je,Suspense as Ze,createSSRApp as Ge}from"vue";import{createPinia as Te,defineStore as Me,storeToRefs as ae}from"pinia";import Ce from"js-cookie";import{createRouter as Ke,createMemoryHistory as Ye,useRoute as Be,onBeforeRouteLeave as Qe,useRouter as et}from"vue-router";import{isBrowser as Ae,strLen as he}from"@lincy/utils";import{ssrRenderAttrs as F,ssrRenderAttr as L,ssrRenderComponent as _,ssrRenderSuspense as tt,ssrRenderVNode as nt}from"vue/server-renderer";import{useWindowSize as ot,useRafFn as st,useWindowScroll as at,useToggle as rt}from"@vueuse/core";import O from"axios";import Le from"qs";import{ElMessage as Ee,ElLoading as it,ElMessageBox as V}from"element-plus";import se from"md5";import{LRUCache as ct}from"lru-cache";Te();const re=Me("appShellStore",()=>{const e=q({needPageTransition:!0,isPageSwitching:!1,pageTransitionName:"",historyPageScrollTop:{}}),n=()=>{e.needPageTransition=!0},t=()=>{e.needPageTransition=!1},s=a=>{e.isPageSwitching=a},r=a=>{const{path:i,scrollTop:c}=a;e.historyPageScrollTop[i]=c},o=a=>{e.pageTransitionName=a};return{...I(e),enablePageTransition:n,disablePageTransition:t,setPageSwitching:s,saveScrollTop:r,setPageTransitionName:o}}),lt=()=>import("./assets/404-90861fa9.js"),J=()=>import("./assets/frontend-index-696685ee.js"),dt=()=>import("./assets/frontend-article-719873b5.js"),pt=()=>import("./assets/frontend-about-9a9668df.js"),ut=()=>import("./assets/frontend-user-a0c94a48.js"),mt=()=>import("./assets/frontend-user-account-f293ac6e.js"),ft=()=>import("./assets/frontend-user-password-6f664c7a.js"),gt=()=>import("./assets/backend-login-b9054f33.js"),ht=()=>import("./assets/backend-index-00512a28.js"),vt=()=>import("./assets/backend-article-list-38710f67.js"),wt=()=>import("./assets/backend-article-insert-c2744f27.js"),kt=()=>import("./assets/backend-article-modify-cd8d04eb.js"),_t=()=>import("./assets/backend-article-comment-e1caa75e.js"),yt=()=>import("./assets/backend-category-list-61e9d5b4.js"),bt=()=>import("./assets/backend-category-insert-00859d7b.js"),St=()=>import("./assets/backend-category-modify-229f9db2.js"),Rt=()=>import("./assets/backend-admin-list-6a9702c1.js"),$t=()=>import("./assets/backend-admin-modify-e599b8d6.js"),xt=()=>import("./assets/backend-user-list-7b70f36f.js"),Pt=()=>import("./assets/backend-user-modify-33b2727e.js");function Tt(e,n,t){const s=Ce.get("user");Ae&&!s?t("/"):t()}function Mt(e,n,t){const s=Ce.get("b_user");Ae&&!s?t("/backend/login"):t()}const b={meta:{index:1,path:"/backend"},beforeEnter:Mt},Ct=[{path:"/index.html",redirect:"/"},{name:"index",path:"/",component:J,meta:{index:1}},{name:"trending",path:"/trending/:by",component:J,meta:{index:1}},{name:"category",path:"/category/:id",component:J,meta:{index:1}},{name:"search",path:"/search/:key",component:J,meta:{index:1}},{name:"article",path:"/article/:id",component:dt,meta:{index:2}},{name:"about",path:"/about",component:pt,meta:{index:1}},{name:"account",path:"/user",component:ut,meta:{index:1},beforeEnter:Tt,children:[{path:"account",component:mt,meta:{path:"/user"}},{path:"password",component:ft,meta:{path:"/user"}}]},{name:"backend",path:"/backend",component:ht,redirect:"/backend/article/list",children:[{name:"login",path:"login",component:gt},{name:"admin_list",path:"admin/list",component:Rt,...b},{name:"admin_modify",path:"admin/modify/:id",component:$t,...b},{name:"article_list",path:"article/list",component:vt,...b},{name:"article_insert",path:"article/insert",component:wt,...b},{name:"article_modify",path:"article/modify/:id",component:kt,...b},{name:"article_comment",path:"article/comment/:id",component:_t,...b},{name:"category_list",path:"category/list",component:yt,...b},{name:"category_insert",path:"category/insert",component:bt,...b},{name:"category_modify",path:"category/modify/:id",component:St,...b},{name:"user_list",path:"user/list",component:xt,...b},{name:"user_modify",path:"user/modify/:id",component:Pt,...b}]},{name:"404",path:"/:catchAll(.*)",component:lt}];function Bt(e){const n=Ke({history:Ye(),routes:Ct}),t="slide-left",s="slide-right";return n.beforeEach((r,o,a)=>{const i=re(e),{needPageTransition:c}=ae(i);if(c.value){let l;!o.meta.index||r.meta.index===o.meta.index?l="fade":r.meta.index>o.meta.index?l=t:l=s,i.setPageTransitionName(l)}a()}),n}function At(e={}){const{immediate:n=!1,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e;let i,c;const l=async(S=!0)=>{await c};async function h(){if("serviceWorker"in navigator){const{Workbox:S}=await import("./assets/workbox-window.prod.es5-799c7be9.js");i=new S("/sw.js",{scope:"/",type:"classic"}),i.addEventListener("activated",m=>{(m.isUpdate||m.isExternal)&&window.location.reload()}),i.addEventListener("installed",m=>{m.isUpdate||s==null||s()}),i.register({immediate:n}).then(m=>{o?o("/sw.js",m):r==null||r(m)}).catch(m=>{a==null||a(m)})}}return c=h(),l}function Lt(e={}){const{immediate:n=!0,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e,i=M(!1),c=M(!1);return{updateServiceWorker:At({immediate:n,onNeedRefresh(){i.value=!0,t==null||t()},onOfflineReady(){c.value=!0,s==null||s()},onRegistered:r,onRegisteredSW:o,onRegisterError:a}),offlineReady:c,needRefresh:i}}const ie=E({name:"ReloadPrompt",__name:"reload-prompt",__ssrInlineRender:!0,setup(e){const{offlineReady:n,needRefresh:t,updateServiceWorker:s}=Lt();return(r,o,a,i)=>{v(t)?o(`<div${F(N({id:"app-refresh",class:"app-refresh"},i))}><div class="app-refresh-wrap"><label>新内容可用，单击刷新按钮更新</label><span>刷新</span><span>关闭</span></div></div>`):o("<!---->")}}}),ve=ie.setup;ie.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/reload-prompt.vue"),ve?ve(e,n):void 0};const Et="#88888825",ce=E({__name:"bg-plum",__ssrInlineRender:!0,setup(e){const n=Math.PI,t=Math.PI/2,s=Math.PI/12,r=M(null),{random:o}=Math,a=q(ot()),i=M(()=>{}),c=M(4),l=M(6),h=M(!1);function S(d,f=400,p=400,R){const g=d.getContext("2d"),$=window.devicePixelRatio||1,B=g.webkitBackingStorePixelRatio||g.mozBackingStorePixelRatio||g.msBackingStorePixelRatio||g.oBackingStorePixelRatio||g.backingStorePixelRatio||1,w=R||$/B;return d.style.width=`${f}px`,d.style.height=`${p}px`,d.width=w*f,d.height=w*p,g.scale(w,w),{ctx:g,dpi:w}}function m(d=0,f=0,p=0,R=0){const g=p*Math.cos(R),$=p*Math.sin(R);return[d+g,f+$]}xe(async()=>{const d=r.value,{ctx:f}=S(d,a.width,a.height),{width:p,height:R}=d;let g=[],$=[],B=0;const w=(P,j,Y)=>{const Ie=o()*l.value,[H,X]=m(P,j,Ie,Y);f.beginPath(),f.moveTo(P,j),f.lineTo(H,X),f.stroke();const Ne=Y+o()*s,Fe=Y-o()*s;H<-100||H>a.width+100||X<-100||X>a.height+100||((B<=c.value||o()>.5)&&g.push(()=>w(H,X,Ne)),(B<=c.value||o()>.5)&&g.push(()=>w(H,X,Fe)))};let U=performance.now();const D=1e3/40;let A;A=st(()=>{performance.now()-U<D||(B+=1,$=g,g=[],U=performance.now(),$.length||(A.pause(),h.value=!0),$.forEach(P=>P()))},{immediate:!1}),i.value=()=>{A.pause(),B=0,f.clearRect(0,0,p,R),f.lineWidth=1,f.strokeStyle=Et,$=[],g=[()=>w(o()*a.width,0,t),()=>w(o()*a.width,a.height,-t),()=>w(0,o()*a.height,0),()=>w(a.width,o()*a.height,n)],a.width<500&&(g=g.slice(0,2)),A.resume(),h.value=!1},i.value()});const u=G(()=>"radial-gradient(circle, transparent, black);");return(d,f,p,R)=>{f(`<div${F(N({class:"pointer-events-none fixed bottom-0 left-0 right-0 top-0",style:[{"z-index":"-1"},`mask-image: ${v(u)};--webkit-mask-image: ${v(u)};`]},R))}><canvas width="400" height="400"></canvas></div>`)}}}),we=ce.setup;ce.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/bg-plum.vue"),we?we(e,n):void 0};const le=E({name:"ClientOnly",props:{fallback:String,placeholder:String,placeholderTag:String,fallbackTag:String},setup(e,{slots:n}){const t=M(!1);return xe(()=>{t.value=!0}),s=>{var i;if(t.value)return(i=n.default)==null?void 0:i.call(n);const r=n.fallback||n.placeholder;if(r)return r();const o=s.fallback||s.placeholder||"",a=s.fallbackTag||s.placeholderTag||"span";return qe(a,null,o)}}}),ke=le.setup;le.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/client-only.vue"),ke?ke(e,n):void 0};const de=E({name:"BackTop",__name:"back-top",__ssrInlineRender:!0,setup(e){const{y:n}=at();return(t,s,r,o)=>{s(`<div${F(N({style:v(n)>500?null:{display:"none"},class:"back-top"},o))}><a href="javascript:;"></a></div>`)}}}),_e=de.setup;de.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/back-top.vue"),_e?_e(e,n):void 0};const Z={api:"/api/",timeout:3e4};function Wt(e){return e.use(it),e.config.globalProperties.$msgbox=V,e.config.globalProperties.$alert=V.alert,e.config.globalProperties.$confirm=V.confirm,e.config.globalProperties.$prompt=V.prompt,e.config.globalProperties.$message=Ee,e}const jt=Ee;function T(e){let n,t;e?typeof e=="string"?(n=e,t="error"):(n=e.content,t=e.type):(n="接口返回数据错误",t="error"),jt[t](n)}O.interceptors.request.use(e=>e,e=>Promise.reject(e));O.interceptors.response.use(e=>e,e=>Promise.resolve(e.response));function te(e){return e&&(e.status===200||e.status===304)?e.data:{code:-404,message:e&&e.statusText||"未知错误",data:""}}function ne(e){return e.code===-500?window.location.href="/backend":e.code===-400?window.location.href="/":e.code!==200&&T(e.message),e}function It(){return{async file(e,n){const t=await O({method:"post",url:e,data:n,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=te(t);return ne(s)},async post(e,n){const t=await O({method:"post",url:Z.api+e,data:Le.stringify(n),timeout:Z.timeout,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}),s=te(t);return ne(s)},async get(e,n){const t=await O({method:"get",url:Z.api+e,params:n,timeout:Z.timeout,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=te(t);return ne(s)}}}const We=It(),z=Me("globalStore",()=>{const e=q({loading:!1,cookies:{},showLoginModal:!1,showRegisterModal:!1,ISDEV:!1,ISPRE:!1,ISPROD:!0}),n=r=>{e.showLoginModal=r},t=r=>{e.showRegisterModal=r},s=r=>{e.cookies=r};return{...I(e),setLoginModal:n,setRegisterModal:t,setCookies:s}});function ln(){const e=ze(),n=e.appContext.config.globalProperties,t=e.type;return{ctx:n,options:t}}function je(e,n="auto"){const[t,s]=rt(!1);return async(...r)=>{if(!t.value){s(!0);try{const o=await e(...r);(n===!0||n==="auto"&&o!==!1)&&s(!1)}catch(o){throw s(!1),o}}}}function dn(){const e=Be(),n=re(),{historyPageScrollTop:t}=ae(n);De(()=>e.fullPath,async s=>{const r=t.value[s]||0;setTimeout(()=>{window.scrollTo(0,r)},350)}),Qe((s,r,o)=>{n.saveScrollTop({path:r.fullPath,scrollTop:Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop)}),o()})}function oe(e,n){return e=e||"123456",e=decodeURIComponent(e),n=n||256,`https://cravatar.cn/avatar/${se(e)}?s=${n}&d=identicon&r=g`}const pe=E({name:"SignUp",__name:"sign-up",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=I(e),s=K(t,"show"),r=z(),o=q({username:"",email:"",password:"",re_password:""});function a(){r.setLoginModal(!0),r.setRegisterModal(!1)}return je(async()=>{const i=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i;if(!o.username||!o.password||!o.email)return T("请将表单填写完整!");if(he(o.username)<4)return T("用户长度至少 2 个中文或 4 个英文!");if(i.test(o.email)){if(he(o.password)<8)return T("密码长度至少 8 位!");if(o.password!==o.re_password)return T("两次输入的密码不一致!")}else return T("邮箱格式错误!");const{code:c,message:l}=await We.post("frontend/user/insert",o);c===200&&(T({type:"success",content:l}),a())}),(i,c,l,h)=>{c(`<div${F(N({class:["modal-wrap modal-signup-wrap",s.value?"active":""]},h))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">注册</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${L("value",v(o).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).email)} type="text" placeholder="邮箱" class="base-input" name="email"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).re_password)} type="password" placeholder="重复密码" class="base-input" autocomplete="off" name="re_password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认注册</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">直接登录</a></form></div></div></div>`)}}}),ye=pe.setup;pe.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/sign-up.vue"),ye?ye(e,n):void 0};const ue=E({name:"SignIn",__name:"sign-in",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=I(e),s=K(t,"show");z();const r=q({username:"",password:""});return je(async()=>{if(!r.username||!r.password)return T("请将表单填写完整!");const{code:o,message:a}=await We.post("frontend/user/login",r);o===200&&(T({type:"success",content:a}),window.location.reload())}),(o,a,i,c)=>{a(`<div${F(N({class:["modal-wrap modal-sign-in-wrap",s.value?"active":""]},c))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">登录</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${L("value",v(r).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(r).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认登录</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">我要注册</a></form></div></div></div>`)}}}),be=ue.setup;ue.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/sign-in.vue"),be?be(e,n):void 0};const me=E({name:"GlobalNavigation",__name:"global-navigation",__ssrInlineRender:!0,props:{isBackend:{type:Boolean}},setup(e){const t=I(e),s=K(t,"isBackend"),r=z(),o=I(r),a=K(o,"cookies"),i=G(()=>!!a.value.user);return et(),(c,l,h,S)=>{const m=Pe("router-link");l(`<nav${F(N({class:"global-nav"},S))}><div class="wrap"><div class="left-part">`),l(_(m,{to:"/","active-class":"current",exact:"",class:"logo-link"},{default:C((u,d,f,p)=>{if(d)d(`<i class="icon icon-nav-logo"${p}></i><span class="hidden"${p}>M.M.F 小屋</span>`);else return[k("i",{class:"icon icon-nav-logo"}),k("span",{class:"hidden"},"M.M.F 小屋")]}),_:1},h)),l('<div class="main-nav">'),l(_(m,{to:"/","active-class":"current",exact:"",class:"nav-link"},{default:C((u,d,f,p)=>{if(d)d(`<i class="icon icon-nav-home"${p}></i><span class="text"${p}>首页</span>`);else return[k("i",{class:"icon icon-nav-home"}),k("span",{class:"text"},"首页")]}),_:1},h)),l(_(m,{to:"/trending/visit","active-class":"current",class:"nav-link"},{default:C((u,d,f,p)=>{if(d)d(`<i class="icon icon-nav-explore"${p}></i><span class="text"${p}>热门</span>`);else return[k("i",{class:"icon icon-nav-explore"}),k("span",{class:"text"},"热门")]}),_:1},h)),l(_(m,{to:"/about","active-class":"current",class:"nav-link"},{default:C((u,d,f,p)=>{if(d)d(`<i class="icon icon-nav-features"${p}></i><span class="text"${p}>关于</span>`);else return[k("i",{class:"icon icon-nav-features"}),k("span",{class:"text"},"关于")]}),_:1},h)),l('<a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link"><i class="icon icon-nav-game"></i><span class="text">汉兜</span></a></div></div>'),s.value?l("<!---->"):(l('<div class="right-part"><span class="nav-search"><i class="icon icon-search-white"></i><input placeholder="记得按回车哦" name="search" class="nav-search-input"></span>'),v(i)?(l('<span class="nav-me">'),l(_(m,{to:"/user/account",class:"nav-me-link"},{default:C((u,d,f,p)=>{if(d)d(`<img${L("src",("useAvatar"in c?c.useAvatar:v(oe))(a.value.useremail,100))} class="nav-avatar-img"${p}>`);else return[k("img",{src:("useAvatar"in c?c.useAvatar:v(oe))(a.value.useremail,100),class:"nav-avatar-img"},null,8,["src"])]}),_:1},h)),l("</span>")):l(`<span class="nav-me"><a href="javascript:;" class="nav-me-link"><img${L("src",("useAvatar"in c?c.useAvatar:v(oe))("noavatar"))} class="nav-avatar-img"></a></span>`),l("</div>")),l("</div></nav>")}}}),Se=me.setup;me.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/components/global-navigation.vue"),Se?Se(e,n):void 0};const fe=E({name:"AppRoot",__name:"app",__ssrInlineRender:!0,setup(e){const n=z(),{showLoginModal:t,showRegisterModal:s}=I(n),r=re(),{pageTransitionName:o}=ae(r),a=M("frontend-index,frontend-about"),i=Be(),c=G(()=>(i.meta.path||i.path).replace(/\//g,"_")),l=G(()=>i.path.includes("backend"));function h(){r.setPageSwitching(!0)}function S(){r.setPageSwitching(!1)}return(m,u,d,f)=>{const p=me,R=Pe("router-view"),g=ue,$=pe,B=de,w=le,U=ce,D=ie;u(`<div${F(N({class:l.value?"backend":"frontend"},f))}>`),u(_(p,{"is-backend":l.value},null,d)),u(_(R,{class:"app-view relative"},{default:C(({Component:A},x,P,j)=>{if(x)x(""),tt(x,{default:()=>{nt(x,k(ge(A),{key:c.value},null),P,j)},_:2});else return[k(Ve,{name:v(o),mode:"out-in",onBeforeEnter:h,onAfterEnter:S},{default:C(()=>[(Q(),ee(Je,{key:c.value,include:a.value},[(Q(),ee(Ze,null,{default:C(()=>[(Q(),ee(ge(A),{key:c.value}))]),_:2},1024))],1032,["include"]))]),_:2},1032,["name"])]}),_:1},d)),u(_(g,{show:v(t)},null,d)),u(_($,{show:v(s)},null,d)),u(_(B,null,null,d)),u(_(w,null,{default:C((A,x,P,j)=>{if(x)x(_(U,null,null,P,j)),x(_(D,null,null,P,j));else return[k(U),k(D)]}),_:1},d)),u("</div>")}}}),Re=fe.setup;fe.setup=(e,n)=>{const t=W();return(t.modules||(t.modules=new Set)).add("src/app.vue"),Re?Re(e,n):void 0};function Nt(e){Wt(e)}const Ft={install:Nt};console.log("当前环境: production");function Ot(){const e=Ge(fe),n=Te(),t=Bt(n),s=He();return e.use(n).use(t).use(s).use(Ft),{app:e,router:t,store:n,head:s}}const Ut="http://localhost:4000",Ht=new ct({max:1e3})||null,y={api:`${Ut}/api/`,port:8080,timeout:3e4,cached:Ht};function Xt(e){if(!e)return"";let n="";return Object.keys(e).forEach(t=>{n+=`${t}=${e[t]}; `}),n}function qt(e){return{cookies:e,api:O.create({baseURL:y.api,headers:{"X-Requested-With":"XMLHttpRequest",cookie:Xt(e)},timeout:y.timeout}),getCookies(){return this.cookies},async post(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"post",url:n,data:Le.stringify(t),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data},async get(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"get",url:n,params:t,headers:{...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data}}}function $e(e){return e.endsWith(".js")?`<link rel="modulepreload" crossorigin href="${e}">`:e.endsWith(".css")?`<link rel="stylesheet" href="${e}">`:e.endsWith(".woff")?` <link rel="preload" href="${e}" as="font" type="font/woff" crossorigin>`:e.endsWith(".woff2")?` <link rel="preload" href="${e}" as="font" type="font/woff2" crossorigin>`:e.endsWith(".gif")?` <link rel="preload" href="${e}" as="image" type="image/gif">`:e.endsWith(".jpg")||e.endsWith(".jpeg")?` <link rel="preload" href="${e}" as="image" type="image/jpeg">`:e.endsWith(".png")?` <link rel="preload" href="${e}" as="image" type="image/png">`:""}function zt(e,n){let t="";const s=new Set;return e.forEach(r=>{const o=n[r];o&&o.forEach(a=>{if(!s.has(a)){s.add(a);const i=Oe(a);if(n[i])for(const c of n[i])t+=$e(c),s.add(c);t+=$e(a)}})}),t}function Dt(e){return e.replace(/<script(.*?)>/gi,"&lt;script$1&gt;").replace(/<\/script>/g,"&lt;/script&gt;")}async function pn(e,n,t){const{app:s,router:r,store:o,head:a}=Ot();s.component("ReloadPrompt",{render:()=>null}).component("VMdEditor",{render:()=>null}),r.push(e),await r.isReady(),r.currentRoute.value.matched.length;const i=r.currentRoute.value.matched.flatMap(u=>Object.values(u.components));z(o).setCookies(t.cookies);try{await Promise.all(i.map(u=>u.asyncData?u.asyncData({store:o,route:r.currentRoute.value,req:t,api:qt(t&&t.cookies)}):null).filter(Boolean))}catch(u){console.log(u)}const l={};let h=await Ue(s,l);const{headTags:S}=await Xe(a);h+=`<script>window.__INITIAL_STATE__ = ${Dt(JSON.stringify(o.state.value))}<\/script>`;const m=zt(l.modules,n);return[h,m,S,o]}export{le as _,z as a,je as b,We as c,oe as d,ln as e,re as f,pn as render,T as s,dn as u};
