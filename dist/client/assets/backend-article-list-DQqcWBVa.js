import{d as j,u as B,P as L,s as h,t as m,k as M,l as V,I as R,r as F,h as q,o as a,c as o,b as n,a as z,F as E,q as H,p as y,x as b,v as I,j as u,Q,e as G,w as S,i as C,y as J,D as w,C as A}from"./main-CTY4IKlK.js";import{u as T}from"./use-backend-article-store-BiUGPQDu.js";import{u as K}from"./vue.8fc199ce-Bmv443Wm.js";const O={class:"settings-main card"},U={class:"settings-main-content"},W={class:"list-category"},X={class:"list-date"},Y={class:"list-action"},Z=["onClick"],ee=["onClick"],te={key:0,class:"settings-footer"},se={key:1,class:"admin-load-more",href:"javascript:;"},ce=j({name:"BackendArticleList",asyncData(_){const{store:l,route:d,api:i}=_;return T(l).getArticleList({page:1,path:d.fullPath},i)},__name:"backend-article-list",setup(_){const l=B(),d=L(),i=T(),v=h(i),r=m(v,"lists"),$=h(d),x=m($,"historyPageScrollTop");M();const[p,f]=V(!1);async function g(s=r.value.page){p.value||(f(!0),await i.getArticleList({page:s,path:l.fullPath}),f(!1))}async function P(s){const{code:e,message:c}=await w.get("backend/article/recover",{id:s});e===200&&(A({type:"success",content:c}),i.recoverArticle(s))}async function D(s){const{code:e,message:c}=await w.get("backend/article/delete",{id:s});e===200&&(A({type:"success",content:c}),i.deleteArticle(s))}R(()=>{if(r.value.path==="")g(1);else{const s=x.value[l.path]||0;window.scrollTo(0,s)}});const k=F("文章列表 - M.M.F 小屋");return K({title:k,meta:[{name:"description",content:k}]}),(s,e)=>{const c=q("router-link");return a(),o("div",O,[n("div",U,[e[3]||(e[3]=z('<div class="list-section list-header"><div class="list-title">标题</div><div class="list-category">分类</div><div class="list-date">最后更新</div><div class="list-action">操作</div></div>',1)),(a(!0),o(E,null,H(r.value.data,t=>(a(),o("div",{key:t._id,class:"list-section"},[n("div",{class:I(["list-title",t.is_delete?"text-red-500 line-through":""])},u(t.title),3),n("div",W,u(t.category_name),1),n("div",X,u(y(Q)(t.update_date)),1),n("div",Y,[G(c,{to:`/backend/article/modify/${t._id}`,class:"badge badge-success"},{default:S(()=>e[1]||(e[1]=[C("编辑")])),_:2},1032,["to"]),t.is_delete?(a(),o("a",{key:0,href:"javascript:;",onClick:N=>P(t._id)},"恢复",8,Z)):(a(),o("a",{key:1,href:"javascript:;",onClick:N=>D(t._id)},"删除",8,ee)),t.comment_count>0?(a(),J(c,{key:2,to:`/backend/article/comment/${t._id}`,class:"badge badge-success"},{default:S(()=>e[2]||(e[2]=[C(" 评论 ")])),_:2},1032,["to"])):b("",!0)])]))),128))]),r.value.hasNext?(a(),o("div",te,[y(p)?(a(),o("a",se,"加载中...")):(a(),o("a",{key:0,class:"admin-load-more",href:"javascript:;",onClick:e[0]||(e[0]=t=>g())},"加载更多"))])):b("",!0)])}}});export{ce as default};
