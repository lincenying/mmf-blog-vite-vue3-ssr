import{d as P,x as B,y as m,F as h,q as D,g as V,r as j,a2 as R,K as F,o as a,c as o,a as n,a3 as H,a8 as q,a9 as z,u as y,b,H as E,a6 as u,ab as K,L as O,M as S,a5 as C,O as G}from"./vendor-DKdHTvZr.js";import{u as A}from"./use-backend-article-store-Cxe_NP5V.js";import{f as I,u as J,c as T,s as $}from"./main-Bv-ZqgeW.js";/* empty css               */const Q={class:"settings-main card"},U={class:"settings-main-content"},W={class:"list-category"},X={class:"list-date"},Y={class:"list-action"},Z=["onClick"],ee=["onClick"],te={key:0,class:"settings-footer"},se={key:1,class:"admin-load-more",href:"javascript:;"},ne=P({name:"BackendArticleList",asyncData(_){const{store:l,route:d,api:i}=_;return A(l).getArticleList({page:1,path:d.fullPath},i)},__name:"backend-article-list",setup(_){const l=B(),d=I(),i=A(),p=m(i),r=h(p,"lists"),w=m(d),x=h(w,"historyPageScrollTop");J();const[v,f]=D(!1);async function g(s=r.value.page){v.value||(f(!0),await i.getArticleList({page:s,path:l.fullPath}),f(!1))}async function L(s){const{code:e,message:c}=await T.get("backend/article/recover",{id:s});e===200&&($({type:"success",content:c}),i.recoverArticle(s))}async function M(s){const{code:e,message:c}=await T.get("backend/article/delete",{id:s});e===200&&($({type:"success",content:c}),i.deleteArticle(s))}V(()=>{if(r.value.path==="")g(1);else{const s=x.value[l.path]||0;window.scrollTo(0,s)}});const k=j("文章列表 - M.M.F 小屋");return R({title:k,meta:[{name:"description",content:k}]}),(s,e)=>{const c=F("router-link");return a(),o("div",Q,[n("div",U,[e[3]||(e[3]=H('<div class="list-section list-header"><div class="list-title">标题</div><div class="list-category">分类</div><div class="list-date">最后更新</div><div class="list-action">操作</div></div>',1)),(a(!0),o(q,null,z(r.value.data,t=>(a(),o("div",{key:t._id,class:"list-section"},[n("div",{class:E(["list-title",t.is_delete?"text-red-500 line-through":""])},u(t.title),3),n("div",W,u(t.category_name),1),n("div",X,u(y(K)(t.update_date)),1),n("div",Y,[O(c,{to:`/backend/article/modify/${t._id}`,class:"badge badge-success"},{default:S(()=>e[1]||(e[1]=[C("编辑")])),_:2},1032,["to"]),t.is_delete?(a(),o("a",{key:0,href:"javascript:;",onClick:N=>L(t._id)},"恢复",8,Z)):(a(),o("a",{key:1,href:"javascript:;",onClick:N=>M(t._id)},"删除",8,ee)),t.comment_count>0?(a(),G(c,{key:2,to:`/backend/article/comment/${t._id}`,class:"badge badge-success"},{default:S(()=>e[2]||(e[2]=[C(" 评论 ")])),_:2},1032,["to"])):b("",!0)])]))),128))]),r.value.hasNext?(a(),o("div",te,[y(v)?(a(),o("a",se,"加载中...")):(a(),o("a",{key:0,class:"admin-load-more",href:"javascript:;",onClick:e[0]||(e[0]=t=>g())},"加载更多"))])):b("",!0)])}}});export{ne as default};