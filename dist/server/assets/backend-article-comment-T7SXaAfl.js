import{d as w,c as S}from"../entry-server.js";import{defineComponent as $,toRef as j,onMounted as A,ref as _,resolveComponent as x,mergeProps as y,withCtx as L,createTextVNode as M,unref as i,useSSRContext as P}from"vue";import{ssrRenderAttrs as T,ssrRenderComponent as h,ssrRenderList as D,ssrRenderAttr as I,ssrInterpolate as c}from"vue/server-renderer";import{getDateDiff as N}from"@lincy/utils";import{u as v}from"./use-global-comment-store-BhNjELEy.js";import{useRoute as B}from"vue-router";import{storeToRefs as F}from"pinia";import{useToggle as H}from"@vueuse/core";import{useHead as V}from"@unhead/vue";import"node:path";import"@unhead/ssr";import"@vue/server-renderer";import"element-plus";import"md5";import"axios";import"qs";import"js-cookie";import"lru-cache";import"node:process";const g=$({name:"BackendArticleComment",asyncData(s){const{store:a,route:t,api:n}=s;return v(a).getCommentList({page:1,path:t.fullPath,all:1,id:t.params.id},n)},__name:"backend-article-comment",__ssrInlineRender:!0,setup(s){const a=B(),t=v(),n=F(t),r=j(n,"lists"),[l,d]=H(!1);async function C(m=r.value.page){l.value||(d(!0),await t.getCommentList({page:m,path:a.fullPath,all:1,id:a.params.id},S),d(!1))}A(()=>{r.value.path===""&&C(1)});const p=_("评论列表 - M.M.F 小屋");return V({title:p,meta:[{name:"description",content:p}]}),(m,e,b,R)=>{const k=x("router-link");e(`<div${T(y({class:"card"},R))}><div class="comments"><div class="comment-back">`),e(h(k,{to:"/backend/article/list",class:"btn btn-blue"},{default:L((o,f,q,z)=>{if(f)f("返回");else return[M("返回")]}),_:1},b)),e('</div><div class="comment-items-wrap"><!--[-->'),D(r.value.data,o=>{e(`<div class="comment-item"><a href="javascript:;" class="comment-author-avatar-link"><img${I("src",("useAvatar"in m?m.useAvatar:i(w))(o.email))} alt="" class="avatar-img"></a><div class="comment-content-wrap"><span class="comment-author-wrap"><a href="javascript:;" class="comment-author">${c(o.username)}</a></span><div class="comment-content">${c(o.content)}</div><div class="comment-footer"><span class="comment-time">${c(i(N)(`${o.timestamp}`))}</span>`),o.is_delete?e('<a href="javascript:;" class="comment-action-item comment-reply">恢复</a>'):e('<a href="javascript:;" class="comment-action-item comment-reply">删除</a>'),e("</div></div></div>")}),e("<!--]--></div>"),r.value.hasNext?(e('<div class="load-more-wrap">'),i(l)?e('<a href="javascript:;" class="comments-load-more">加载中...</a>'):e('<a href="javascript:;" class="comments-load-more">加载更多</a>'),e("</div>")):e("<!---->"),e("</div></div>")}}}),u=g.setup;g.setup=(s,a)=>{const t=P();return(t.modules||(t.modules=new Set)).add("src/pages/backend-article-comment.vue"),u?u(s,a):void 0};export{g as default};