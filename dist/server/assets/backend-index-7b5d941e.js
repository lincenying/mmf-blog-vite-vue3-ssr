import{defineComponent as R,resolveComponent as C,mergeProps as S,withCtx as a,createVNode as s,createTextVNode as u,useSSRContext as B,computed as _,resolveDynamicComponent as $,unref as f,openBlock as b,createBlock as y,Suspense as L}from"vue";import{ssrRenderAttrs as N,ssrRenderComponent as o,ssrRenderSuspense as M,ssrRenderVNode as P}from"vue/server-renderer";import{useRoute as T}from"vue-router";const k=R({name:"BackendMenu",__name:"backend-menu",__ssrInlineRender:!0,setup(m){return(l,n,t,g)=>{const c=C("router-link");n(`<div${N(S({class:"main-right"},g))}><div class="card card-me">`),n(o(c,{to:"/backend/admin/list","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>管理帐号 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("管理帐号 ")]}),_:1},t)),n(o(c,{to:"/backend/user/list","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>用户列表 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("用户列表 ")]}),_:1},t)),n('</div><div class="card card-me">'),n(o(c,{to:"/backend/category/insert","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>添加分类 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("添加分类 ")]}),_:1},t)),n(o(c,{to:"/backend/category/list","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>管理分类 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("管理分类 ")]}),_:1},t)),n(o(c,{to:"/backend/article/insert","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>发布文章 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("发布文章 ")]}),_:1},t)),n(o(c,{to:"/backend/article/list","active-class":"active",class:"side-entry"},{default:a((r,e,d,i)=>{if(e)e(`<i class="icon icon-arrow-right"${i}></i><i class="icon icon-menu-articles"${i}></i>管理文章 `);else return[s("i",{class:"icon icon-arrow-right"}),s("i",{class:"icon icon-menu-articles"}),u("管理文章 ")]}),_:1},t)),n("</div></div>")}}}),x=k.setup;k.setup=(m,l)=>{const n=B();return(n.modules||(n.modules=new Set)).add("src/components/backend-menu.vue"),x?x(m,l):void 0};const V=R({name:"BackendIndex",__name:"backend-index",__ssrInlineRender:!0,setup(m){const l=T(),n=_(()=>l.path.replace(/\//g,"_")),t=_(()=>["/backend/login","/backend/login/"].includes(l.path));return(g,c,r,e)=>{const d=C("router-view"),i=k;c(`<div${N(S({class:"wrap main"},e))}><div class="main-left"><div class="cards-wrap home-feeds">`),c(o(d,{class:"app-view"},{default:a(({Component:w},v,A,D)=>{if(v)M(v,{default:()=>{P(v,s($(w),{key:f(n)},null),A,D)},_:2});else return[(b(),y(L,null,{default:a(()=>[(b(),y($(w),{key:f(n)}))]),_:2},1024))]}),_:1},r)),c("</div></div>"),f(t)?c("<!---->"):c(o(i,null,null,r)),c("</div>")}}}),p=V.setup;V.setup=(m,l)=>{const n=B();return(n.modules||(n.modules=new Set)).add("src/pages/backend-index.vue"),p?p(m,l):void 0};export{V as default};
