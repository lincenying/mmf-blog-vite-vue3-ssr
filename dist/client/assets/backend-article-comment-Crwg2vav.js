import{c as d,d as j,s as k}from"./main-Bv-ZqgeW.js";import{d as M,x as D,y as L,F as N,q as S,g as $,r as x,a2 as A,K as B,o,c as n,a as e,L as R,M as T,a5 as V,a8 as F,a9 as P,u,b as q,a6 as _,ab as E}from"./vendor-DKdHTvZr.js";import{u as C}from"./use-global-comment-store-1KkG4N2M.js";/* empty css               */const H={class:"card"},K={class:"comments"},z={class:"comment-back"},G={class:"comment-items-wrap"},I={href:"javascript:;",class:"comment-author-avatar-link"},J=["src"],O={class:"comment-content-wrap"},Q={class:"comment-author-wrap"},U={href:"javascript:;",class:"comment-author"},W={class:"comment-content"},X={class:"comment-footer"},Y={class:"comment-time"},Z=["onClick"],ee=["onClick"],te={key:0,class:"load-more-wrap"},se={key:1,href:"javascript:;",class:"comments-load-more"},re=M({name:"BackendArticleComment",asyncData(p){const{store:m,route:c,api:l}=p;return C(m).getCommentList({page:1,path:c.fullPath,all:1,id:c.params.id},l)},__name:"backend-article-comment",setup(p){const m=D(),c=C(),l=L(c),r=N(l,"lists"),[f,h]=S(!1);async function v(t=r.value.page){f.value||(h(!0),await c.getCommentList({page:t,path:m.fullPath,all:1,id:m.params.id},d),h(!1))}async function y(t){const{code:a,message:i}=await d.get("frontend/comment/recover",{id:t});a===200&&(k({type:"success",content:i}),c.recoverComment(t))}async function b(t){const{code:a,message:i}=await d.get("frontend/comment/delete",{id:t});a===200&&(k({type:"success",content:i}),c.deleteComment(t))}$(()=>{r.value.path===""&&v(1)});const g=x("评论列表 - M.M.F 小屋");return A({title:g,meta:[{name:"description",content:g}]}),(t,a)=>{const i=B("router-link");return o(),n("div",H,[e("div",K,[e("div",z,[R(i,{to:"/backend/article/list",class:"btn btn-blue"},{default:T(()=>a[1]||(a[1]=[V("返回")])),_:1})]),e("div",G,[(o(!0),n(F,null,P(r.value.data,s=>(o(),n("div",{key:s._id,class:"comment-item"},[e("a",I,[e("img",{src:("useAvatar"in t?t.useAvatar:u(j))(s.email),alt:"",class:"avatar-img"},null,8,J)]),e("div",O,[e("span",Q,[e("a",U,_(s.username),1)]),e("div",W,_(s.content),1),e("div",X,[e("span",Y,_(u(E)(`${s.timestamp}`)),1),s.is_delete?(o(),n("a",{key:0,href:"javascript:;",class:"comment-action-item comment-reply",onClick:w=>y(s._id)},"恢复",8,Z)):(o(),n("a",{key:1,href:"javascript:;",class:"comment-action-item comment-reply",onClick:w=>b(s._id)},"删除",8,ee))])])]))),128))]),r.value.hasNext?(o(),n("div",te,[u(f)?(o(),n("a",se,"加载中...")):(o(),n("a",{key:0,href:"javascript:;",class:"comments-load-more",onClick:a[0]||(a[0]=s=>v())},"加载更多"))])):q("",!0)])])}}});export{re as default};
