import{defineComponent as $,toRef as u,onMounted as w,ref as y,resolveComponent as L,mergeProps as P,unref as f,withCtx as h,createTextVNode as j,useSSRContext as M}from"vue";import{ssrRenderAttrs as I,ssrRenderList as B,ssrRenderClass as D,ssrInterpolate as l,ssrRenderComponent as N}from"vue/server-renderer";import{UTC2Date as A}from"@lincy/utils";import{f as F,u as H}from"../entry-server.js";import{u as g}from"./use-backend-user-store-80f70802.js";import{useRoute as V}from"vue-router";import{storeToRefs as _}from"pinia";import{useToggle as q}from"@vueuse/core";import{useHead as z}from"@vueuse/head";import"node:path";import"@vue/server-renderer";import"js-cookie";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const k=$({name:"BackendUserList",asyncData(r){const{store:a,route:s,api:o}=r;return g(a).getUserList({page:1,path:s.fullPath},o)},__name:"backend-user-list",__ssrInlineRender:!0,setup(r){const a=V(),s=F(),o=g(),d=_(o),i=u(d,"lists"),R=_(s),T=u(R,"historyPageScrollTop");H();const[c,m]=q(!1);async function b(n=i.value.page+1){c.value||(m(!0),await o.getUserList({page:n}),m(!1))}w(()=>{if(i.value.path==="")b(1);else{const n=T.value[a.path]||0;window.scrollTo(0,n)}});const p=y("用户列表 - M.M.F 小屋");return z({title:p,meta:[{name:"description",content:p}]}),(n,e,x,C)=>{const U=L("router-link");e(`<div${I(P({class:"settings-main card"},C))}><div class="settings-main-content"><div class="list-section list-header"><div class="list-username">用户名</div><div class="list-email">邮箱</div><div class="list-date">时间</div><div class="list-action">操作</div></div><!--[-->`),B(i.value.data,t=>{e(`<div class="list-section"><div class="${D([t.is_delete?"text-red-500 line-through":"","list-username"])}">${l(t.username)}</div><div class="list-email">${l(t.email)}</div><div class="list-date">${l(f(A)(t.update_date))}</div><div class="list-action">`),e(N(U,{to:`/backend/user/modify/${t._id}`,class:"badge badge-success"},{default:h((E,v,G,J)=>{if(v)v("编辑");else return[j("编辑")]}),_:2},x)),t.is_delete?e('<a href="javascript:;">恢复</a>'):e('<a href="javascript:;">删除</a>'),e("</div></div>")}),e("<!--]--></div>"),i.value.hasNext?(e('<div class="settings-footer">'),f(c)?e('<a class="admin-load-more" href="javascript:;">加载中...</a>'):e('<a class="admin-load-more" href="javascript:;">加载更多</a>'),e("</div>")):e("<!---->"),e("</div>")}}}),S=k.setup;k.setup=(r,a)=>{const s=M();return(s.modules||(s.modules=new Set)).add("src/pages/backend-user-list.vue"),S?S(r,a):void 0};export{k as default};
