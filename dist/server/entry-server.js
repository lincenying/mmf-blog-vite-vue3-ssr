import{basename as Ue}from"node:path";import{renderToString as He}from"@vue/server-renderer";import{renderSSRHead as Xe}from"@unhead/ssr";import{reactive as z,toRefs as I,ref as M,defineComponent as W,unref as v,mergeProps as F,useSSRContext as E,onMounted as ae,computed as G,createElementBlock as qe,getCurrentInstance as ze,onActivated as Oe,toRef as K,resolveComponent as Pe,withCtx as C,createVNode as k,resolveDynamicComponent as he,Transition as De,openBlock as Q,createBlock as ee,KeepAlive as Ve,Suspense as Je,createSSRApp as Ze}from"vue";import{createPinia as Te,defineStore as Me,storeToRefs as re}from"pinia";import{createHead as Ge}from"@unhead/vue";import Ce from"js-cookie";import{createRouter as Ke,createMemoryHistory as Ye,useRoute as Be,onBeforeRouteLeave as Qe,useRouter as et}from"vue-router";import{isBrowser as Ae,strLen as ve}from"@lincy/utils";import{ssrRenderAttrs as N,ssrRenderAttr as L,ssrRenderComponent as _,ssrRenderSuspense as tt,ssrRenderVNode as nt}from"vue/server-renderer";import{useWindowSize as ot,useRafFn as st,useWindowScroll as at,useToggle as rt}from"@vueuse/core";import U from"axios";import Le from"qs";import{ElMessage as We,ElLoading as it,ElMessageBox as V}from"element-plus";import se from"md5";import{LRUCache as ct}from"lru-cache";Te();const ie=Me("appShellStore",()=>{const e=z({needPageTransition:!0,isPageSwitching:!1,pageTransitionName:"",historyPageScrollTop:{}}),n=()=>{e.needPageTransition=!0},t=()=>{e.needPageTransition=!1},s=a=>{e.isPageSwitching=a},r=a=>{const{path:i,scrollTop:c}=a;e.historyPageScrollTop[i]=c},o=a=>{e.pageTransitionName=a};return{...I(e),enablePageTransition:n,disablePageTransition:t,setPageSwitching:s,saveScrollTop:r,setPageTransitionName:o}}),lt=()=>import("./assets/404-D4QL9sm8.js"),J=()=>import("./assets/frontend-index-D-uDWm-F.js"),pt=()=>import("./assets/frontend-article-C4nMaKEz.js"),dt=()=>import("./assets/frontend-about-lrKXdQUX.js"),ut=()=>import("./assets/frontend-user-D6eAnSyL.js"),mt=()=>import("./assets/frontend-user-account-BJvIrTC9.js"),ft=()=>import("./assets/frontend-user-password-BhkRdGnM.js"),gt=()=>import("./assets/backend-login-DmX0Na77.js"),ht=()=>import("./assets/backend-index-CToHr1D5.js"),vt=()=>import("./assets/backend-article-list-DvpgHOlZ.js"),wt=()=>import("./assets/backend-article-insert-CP6oqSo3.js"),kt=()=>import("./assets/backend-article-modify-DhJtsho_.js"),_t=()=>import("./assets/backend-article-comment-RFIDWW1H.js"),yt=()=>import("./assets/backend-category-list-D9VXSxaA.js"),bt=()=>import("./assets/backend-category-insert--WrGKiaj.js"),St=()=>import("./assets/backend-category-modify-CErBcBHf.js"),$t=()=>import("./assets/backend-admin-list-DkXpfYFl.js"),xt=()=>import("./assets/backend-admin-modify-QaGFGYTg.js"),Rt=()=>import("./assets/backend-user-list-Dv3X6j5z.js"),Pt=()=>import("./assets/backend-user-modify-DrqNey72.js");function Tt(e,n,t){const s=Ce.get("user");Ae&&!s?t("/"):t()}function Mt(e,n,t){const s=Ce.get("b_user");Ae&&!s?t("/backend/login"):t()}const S={meta:{index:1,path:"/backend"},beforeEnter:Mt},Ct=[{path:"/index.html",redirect:"/"},{name:"index",path:"/",component:J,meta:{index:1}},{name:"trending",path:"/trending/:by",component:J,meta:{index:1}},{name:"category",path:"/category/:id",component:J,meta:{index:1}},{name:"search",path:"/search/:key",component:J,meta:{index:1}},{name:"article",path:"/article/:id",component:pt,meta:{index:2}},{name:"about",path:"/about",component:dt,meta:{index:1}},{name:"account",path:"/user",component:ut,meta:{index:1},beforeEnter:Tt,children:[{path:"account",component:mt,meta:{path:"/user"}},{path:"password",component:ft,meta:{path:"/user"}}]},{name:"backend",path:"/backend",component:ht,redirect:"/backend/article/list",children:[{name:"login",path:"login",component:gt},{name:"admin_list",path:"admin/list",component:$t,...S},{name:"admin_modify",path:"admin/modify/:id",component:xt,...S},{name:"article_list",path:"article/list",component:vt,...S},{name:"article_insert",path:"article/insert",component:wt,...S},{name:"article_modify",path:"article/modify/:id",component:kt,...S},{name:"article_comment",path:"article/comment/:id",component:_t,...S},{name:"category_list",path:"category/list",component:yt,...S},{name:"category_insert",path:"category/insert",component:bt,...S},{name:"category_modify",path:"category/modify/:id",component:St,...S},{name:"user_list",path:"user/list",component:Rt,...S},{name:"user_modify",path:"user/modify/:id",component:Pt,...S}]},{name:"404",path:"/:catchAll(.*)",component:lt}];function Bt(e){const n=Ke({history:Ye(),routes:Ct}),t="slide-left",s="slide-right";return n.beforeEach((r,o,a)=>{const i=ie(e),{needPageTransition:c}=re(i);if(c.value){let l;!o.meta.index||r.meta.index===o.meta.index?l="fade":r.meta.index>o.meta.index?l=t:l=s,i.setPageTransitionName(l)}a()}),n}function At(e={}){const{immediate:n=!1,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e;let i,c;const l=async(m=!0)=>{await c};async function h(){if("serviceWorker"in navigator){if(i=await import("./assets/workbox-window.prod.es5-WEjqEGHc.js").then(({Workbox:m})=>new m("/sw.js",{scope:"/",type:"classic"})).catch(m=>{a==null||a(m)}),!i)return;i.addEventListener("activated",m=>{(m.isUpdate||m.isExternal)&&window.location.reload()}),i.addEventListener("installed",m=>{m.isUpdate||s==null||s()}),i.register({immediate:n}).then(m=>{o?o("/sw.js",m):r==null||r(m)}).catch(m=>{a==null||a(m)})}}return c=h(),l}function Lt(e={}){const{immediate:n=!0,onNeedRefresh:t,onOfflineReady:s,onRegistered:r,onRegisteredSW:o,onRegisterError:a}=e,i=M(!1),c=M(!1);return{updateServiceWorker:At({immediate:n,onNeedRefresh(){i.value=!0,t==null||t()},onOfflineReady(){c.value=!0,s==null||s()},onRegistered:r,onRegisteredSW:o,onRegisterError:a}),offlineReady:c,needRefresh:i}}const ce=W({name:"ReloadPrompt",__name:"reload-prompt",__ssrInlineRender:!0,setup(e){const{offlineReady:n,needRefresh:t,updateServiceWorker:s}=Lt();return(r,o,a,i)=>{v(t)?o(`<div${N(F({id:"app-refresh",class:"app-refresh"},i))}><div class="app-refresh-wrap"><label>新内容可用，单击刷新按钮更新</label><span>刷新</span><span>关闭</span></div></div>`):o("<!---->")}}}),we=ce.setup;ce.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/reload-prompt.vue"),we?we(e,n):void 0};const Wt="#88888825",le=W({__name:"bg-plum",__ssrInlineRender:!0,setup(e){const n=Math.PI,t=Math.PI/2,s=Math.PI/12,r=M(null),{random:o}=Math,a=z(ot()),i=M(()=>{}),c=M(4),l=M(6),h=M(!1);function m(p,f=400,d=400,$){const g=p.getContext("2d"),x=window.devicePixelRatio||1,B=g.webkitBackingStorePixelRatio||g.mozBackingStorePixelRatio||g.msBackingStorePixelRatio||g.oBackingStorePixelRatio||g.backingStorePixelRatio||1,w=$||x/B;return p.style.width=`${f}px`,p.style.height=`${d}px`,p.width=w*f,p.height=w*d,g.scale(w,w),{ctx:g,dpi:w}}function b(p=0,f=0,d=0,$=0){const g=d*Math.cos($),x=d*Math.sin($);return[p+g,f+x]}ae(async()=>{const p=r.value,{ctx:f}=m(p,a.width,a.height),{width:d,height:$}=p;let g=[],x=[],B=0;const w=(P,j,Y)=>{const Ie=o()*l.value,[X,q]=b(P,j,Ie,Y);f.beginPath(),f.moveTo(P,j),f.lineTo(X,q),f.stroke();const Fe=Y+o()*s,Ne=Y-o()*s;X<-100||X>a.width+100||q<-100||q>a.height+100||((B<=c.value||o()>.5)&&g.push(()=>w(X,q,Fe)),(B<=c.value||o()>.5)&&g.push(()=>w(X,q,Ne)))};let H=performance.now();const D=1e3/40;let A;A=st(()=>{performance.now()-H<D||(B+=1,x=g,g=[],H=performance.now(),x.length||(A.pause(),h.value=!0),x.forEach(P=>P()))},{immediate:!1}),i.value=()=>{A.pause(),B=0,f.clearRect(0,0,d,$),f.lineWidth=1,f.strokeStyle=Wt,x=[],g=[()=>w(o()*a.width,0,t),()=>w(o()*a.width,a.height,-t),()=>w(0,o()*a.height,0),()=>w(a.width,o()*a.height,n)],a.width<500&&(g=g.slice(0,2)),A.resume(),h.value=!1},i.value()});const u=G(()=>"radial-gradient(circle, transparent, black);");return(p,f,d,$)=>{f(`<div${N(F({class:"pointer-events-none fixed bottom-0 left-0 right-0 top-0",style:[{"z-index":"-1"},`mask-image: ${v(u)};--webkit-mask-image: ${v(u)};`]},$))}><canvas width="400" height="400"></canvas></div>`)}}}),ke=le.setup;le.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/bg-plum.vue"),ke?ke(e,n):void 0};const pe=W({name:"ClientOnly",props:{fallback:String,placeholder:String,placeholderTag:String,fallbackTag:String},setup(e,{slots:n}){const t=M(!1);return ae(()=>{t.value=!0}),s=>{var i;if(t.value)return(i=n.default)==null?void 0:i.call(n);const r=n.fallback||n.placeholder;if(r)return r();const o=s.fallback||s.placeholder||"",a=s.fallbackTag||s.placeholderTag||"span";return qe(a,null,o)}}}),_e=pe.setup;pe.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/client-only.vue"),_e?_e(e,n):void 0};const de=W({name:"BackTop",__name:"back-top",__ssrInlineRender:!0,setup(e){const{y:n}=at();return(t,s,r,o)=>{s(`<div${N(F({style:v(n)>500?null:{display:"none"},class:"back-top"},o))}><a href="javascript:;"></a></div>`)}}}),ye=de.setup;de.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/back-top.vue"),ye?ye(e,n):void 0};const Z={api:"/api/",timeout:3e4};function Et(e){return e.use(it),e.config.globalProperties.$msgbox=V,e.config.globalProperties.$alert=V.alert,e.config.globalProperties.$confirm=V.confirm,e.config.globalProperties.$prompt=V.prompt,e.config.globalProperties.$message=We,e}const jt=We;function T(e){let n,t;e?typeof e=="string"?(n=e,t="error"):(n=e.content,t=e.type):(n="接口返回数据错误",t="error"),jt[t](n)}U.interceptors.request.use(e=>e,e=>Promise.reject(e));U.interceptors.response.use(e=>e,e=>Promise.resolve(e.response));function te(e){return e&&(e.status===200||e.status===304)?e.data:{code:-404,message:e&&e.statusText||"未知错误",data:""}}function ne(e){return e.code===-500?window.location.href="/backend":e.code===-400?window.location.href="/":e.code!==200&&T(e.message),e}function It(){return{async file(e,n){const t=await U({method:"post",url:e,data:n,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=te(t);return ne(s)},async post(e,n){const t=await U({method:"post",url:Z.api+e,data:Le.stringify(n),timeout:Z.timeout,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}),s=te(t);return ne(s)},async get(e,n){const t=await U({method:"get",url:Z.api+e,params:n,timeout:Z.timeout,headers:{"X-Requested-With":"XMLHttpRequest"}}),s=te(t);return ne(s)}}}const Ee=It(),O=Me("globalStore",()=>{const e=z({loading:!1,cookies:{},showLoginModal:!1,showRegisterModal:!1,ISDEV:!1,ISPRE:!1,ISPROD:!0}),n=r=>{e.showLoginModal=r},t=r=>{e.showRegisterModal=r},s=r=>{e.cookies=r};return{...I(e),setLoginModal:n,setRegisterModal:t,setCookies:s}});function pn(){const e=ze(),n=e.appContext.config.globalProperties,t=e.type;return{ctx:n,options:t}}function je(e,n="auto"){const[t,s]=rt(!1);return async(...r)=>{if(!t.value){s(!0);try{const o=await e(...r);(n===!0||n==="auto"&&o!==!1)&&s(!1)}catch(o){throw s(!1),o}}}}function dn(){const e=Be(),n=ie(),{historyPageScrollTop:t}=re(n);Oe(()=>{const s=t.value[e.fullPath]||0;setTimeout(()=>{window.scrollTo(0,s)},300)}),ae(()=>{const s=t.value[e.fullPath]||0;setTimeout(()=>{window.scrollTo(0,s)},300)}),Qe((s,r,o)=>{n.saveScrollTop({path:r.fullPath,scrollTop:Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop)}),o()})}function oe(e,n){return e=e||"123456",e=decodeURIComponent(e),n=n||256,`https://cravatar.cn/avatar/${se(e)}?s=${n}&d=identicon&r=g`}const ue=W({name:"SignUp",__name:"sign-up",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=I(e),s=K(t,"show"),r=O(),o=z({username:"",email:"",password:"",re_password:""});function a(){r.setLoginModal(!0),r.setRegisterModal(!1)}return je(async()=>{const i=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i;if(!o.username||!o.password||!o.email)return T("请将表单填写完整!");if(ve(o.username)<4)return T("用户长度至少 2 个中文或 4 个英文!");if(i.test(o.email)){if(ve(o.password)<8)return T("密码长度至少 8 位!");if(o.password!==o.re_password)return T("两次输入的密码不一致!")}else return T("邮箱格式错误!");const{code:c,message:l}=await Ee.post("frontend/user/insert",o);c===200&&(T({type:"success",content:l}),a())}),(i,c,l,h)=>{c(`<div${N(F({class:["modal-wrap modal-signup-wrap",s.value?"active":""]},h))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">注册</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${L("value",v(o).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).email)} type="text" placeholder="邮箱" class="base-input" name="email"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(o).re_password)} type="password" placeholder="重复密码" class="base-input" autocomplete="off" name="re_password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认注册</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">直接登录</a></form></div></div></div>`)}}}),be=ue.setup;ue.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/sign-up.vue"),be?be(e,n):void 0};const me=W({name:"SignIn",__name:"sign-in",__ssrInlineRender:!0,props:{show:{type:Boolean}},setup(e){const t=I(e),s=K(t,"show");O();const r=z({username:"",password:""});return je(async()=>{if(!r.username||!r.password)return T("请将表单填写完整!");const{code:o,message:a}=await Ee.post("frontend/user/login",r);o===200&&(T({type:"success",content:a}),window.location.reload())}),(o,a,i,c)=>{a(`<div${N(F({class:["modal-wrap modal-sign-in-wrap",s.value?"active":""]},c))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">登录</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${L("value",v(r).username)} type="text" placeholder="昵称" class="base-input" name="username"><p class="error-info input-info hidden">长度至少 6 位</p></div><div class="input-wrap"><input${L("value",v(r).password)} type="password" placeholder="密码" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">长度至少 6 位</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">确认登录</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">我要注册</a></form></div></div></div>`)}}}),Se=me.setup;me.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/sign-in.vue"),Se?Se(e,n):void 0};const fe=W({name:"GlobalNavigation",__name:"global-navigation",__ssrInlineRender:!0,props:{isBackend:{type:Boolean}},setup(e){const t=I(e),s=K(t,"isBackend"),r=O(),o=I(r),a=K(o,"cookies"),i=G(()=>!!a.value.user);return et(),(c,l,h,m)=>{const b=Pe("router-link");l(`<nav${N(F({class:"global-nav"},m))}><div class="wrap"><div class="left-part">`),l(_(b,{to:"/","active-class":"current",exact:"",class:"logo-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-logo"${d}></i><span class="hidden"${d}>M.M.F 小屋</span>`);else return[k("i",{class:"icon icon-nav-logo"}),k("span",{class:"hidden"},"M.M.F 小屋")]}),_:1},h)),l('<div class="main-nav">'),l(_(b,{to:"/","active-class":"current",exact:"",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-home"${d}></i><span class="text"${d}>首页</span>`);else return[k("i",{class:"icon icon-nav-home"}),k("span",{class:"text"},"首页")]}),_:1},h)),l(_(b,{to:"/trending/visit","active-class":"current",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-explore"${d}></i><span class="text"${d}>热门</span>`);else return[k("i",{class:"icon icon-nav-explore"}),k("span",{class:"text"},"热门")]}),_:1},h)),l(_(b,{to:"/about","active-class":"current",class:"nav-link"},{default:C((u,p,f,d)=>{if(p)p(`<i class="icon icon-nav-features"${d}></i><span class="text"${d}>关于</span>`);else return[k("i",{class:"icon icon-nav-features"}),k("span",{class:"text"},"关于")]}),_:1},h)),l('<a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link"><i class="icon icon-nav-game"></i><span class="text">汉兜</span></a></div></div>'),s.value?l("<!---->"):(l('<div class="right-part"><span class="nav-search"><i class="icon icon-search-white"></i><input placeholder="记得按回车哦" name="search" class="nav-search-input"></span>'),v(i)?(l('<span class="nav-me">'),l(_(b,{to:"/user/account",class:"nav-me-link"},{default:C((u,p,f,d)=>{if(p)p(`<img${L("src",("useAvatar"in c?c.useAvatar:v(oe))(a.value.useremail,100))} class="nav-avatar-img"${d}>`);else return[k("img",{src:("useAvatar"in c?c.useAvatar:v(oe))(a.value.useremail,100),class:"nav-avatar-img"},null,8,["src"])]}),_:1},h)),l("</span>")):l(`<span class="nav-me"><a href="javascript:;" class="nav-me-link"><img${L("src",("useAvatar"in c?c.useAvatar:v(oe))("noavatar"))} class="nav-avatar-img"></a></span>`),l("</div>")),l("</div></nav>")}}}),$e=fe.setup;fe.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/components/global-navigation.vue"),$e?$e(e,n):void 0};const ge=W({name:"AppRoot",__name:"app",__ssrInlineRender:!0,setup(e){const n=O(),{showLoginModal:t,showRegisterModal:s}=I(n),r=ie(),{pageTransitionName:o}=re(r),a=M("frontend-index,frontend-about"),i=Be(),c=G(()=>(i.meta.path||i.path).replace(/\//g,"_")),l=G(()=>i.path.includes("backend"));function h(){r.setPageSwitching(!0)}function m(){r.setPageSwitching(!1)}return(b,u,p,f)=>{const d=fe,$=Pe("router-view"),g=me,x=ue,B=de,w=pe,H=le,D=ce;u(`<div${N(F({class:l.value?"backend":"frontend"},f))}>`),u(_(d,{"is-backend":l.value},null,p)),u(_($,{class:"app-view relative"},{default:C(({Component:A},R,P,j)=>{if(R)R(""),tt(R,{default:()=>{nt(R,k(he(A),{key:c.value},null),P,j)},_:2});else return[k(De,{name:v(o),mode:"out-in",onBeforeEnter:h,onAfterEnter:m},{default:C(()=>[(Q(),ee(Ve,{key:c.value,include:a.value},[(Q(),ee(Je,null,{default:C(()=>[(Q(),ee(he(A),{key:c.value}))]),_:2},1024))],1032,["include"]))]),_:2},1032,["name"])]}),_:1},p)),u(_(g,{show:v(t)},null,p)),u(_(x,{show:v(s)},null,p)),u(_(B,null,null,p)),u(_(w,null,{default:C((A,R,P,j)=>{if(R)R(_(H,null,null,P,j)),R(_(D,null,null,P,j));else return[k(H),k(D)]}),_:1},p)),u("</div>")}}}),xe=ge.setup;ge.setup=(e,n)=>{const t=E();return(t.modules||(t.modules=new Set)).add("src/app.vue"),xe?xe(e,n):void 0};function Ft(e){Et(e)}const Nt={install:Ft};console.log("当前环境: production");function Ut(){const e=Ze(ge),n=Te(),t=Bt(n),s=Ge();return e.use(n).use(t).use(s).use(Nt),{app:e,router:t,store:n,head:s}}const Ht="http://localhost:4000",Xt=new ct({max:1e3,ttl:1e3*60*5})||null,y={api:`${Ht}/api/`,port:8080,timeout:3e4,cached:Xt};function qt(e){if(!e)return"";let n="";return Object.keys(e).forEach(t=>{n+=`${t}=${e[t]}; `}),n}function zt(e){return{cookies:e,api:U.create({baseURL:y.api,headers:{"X-Requested-With":"XMLHttpRequest",cookie:qt(e)},timeout:y.timeout}),getCookies(){return this.cookies},async post(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"post",url:n,data:Le.stringify(t),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data},async get(n,t,s={}){const o=(this.getCookies()||{}).username||"",a=se(n+JSON.stringify(t)+o);if(y.cached&&t.cache&&y.cached.has(a)){const c=y.cached.get(a);return Promise.resolve(c&&c.data)}const i=await this.api({method:"get",url:n,params:t,headers:{...s}});return y.cached&&t.cache&&y.cached.set(a,i),i&&i.data}}}function Re(e){return e.endsWith(".js")?`<link rel="modulepreload" crossorigin href="${e}">`:e.endsWith(".css")?`<link rel="stylesheet" href="${e}">`:e.endsWith(".woff")?` <link rel="preload" href="${e}" as="font" type="font/woff" crossorigin>`:e.endsWith(".woff2")?` <link rel="preload" href="${e}" as="font" type="font/woff2" crossorigin>`:e.endsWith(".gif")?` <link rel="preload" href="${e}" as="image" type="image/gif">`:e.endsWith(".jpg")||e.endsWith(".jpeg")?` <link rel="preload" href="${e}" as="image" type="image/jpeg">`:e.endsWith(".png")?` <link rel="preload" href="${e}" as="image" type="image/png">`:""}function Ot(e,n){let t="";const s=new Set;return e.forEach(r=>{const o=n[r];o&&o.forEach(a=>{if(!s.has(a)){s.add(a);const i=Ue(a);if(n[i])for(const c of n[i])t+=Re(c),s.add(c);t+=Re(a)}})}),t}function Dt(e){return e.replace(/<script(.*?)>/gi,"&lt;script$1&gt;").replace(/<\/script>/g,"&lt;/script&gt;")}async function un(e,n,t){const{app:s,router:r,store:o,head:a}=Ut();s.component("ReloadPrompt",{render:()=>null}).component("VMdEditor",{render:()=>null}),r.push(e),await r.isReady(),r.currentRoute.value.matched.length;const i=r.currentRoute.value.matched.flatMap(u=>Object.values(u.components));O(o).setCookies(t.cookies);try{await Promise.all(i.map(u=>u.asyncData?u.asyncData({store:o,route:r.currentRoute.value,req:t,api:zt(t&&t.cookies)}):null).filter(Boolean))}catch(u){console.log(u)}const l={};let h=await He(s,l);const{headTags:m}=await Xe(a);h+=`<script>window.__INITIAL_STATE__ = ${Dt(JSON.stringify(o.state.value))}<\/script>`;const b=Ot(l.modules,n);return{html:h,preloadLinks:b,headTags:m,store:o}}export{pe as _,O as a,je as b,Ee as c,oe as d,pn as e,ie as f,un as render,T as s,dn as u};
