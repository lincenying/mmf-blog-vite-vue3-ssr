import{v as e,u as b,l as C,s as m,a as N,b as V,m as x,f as v,e as f}from"./main-a340fd75.js";import{u as g}from"./use-backend-article-store-f83ea945.js";import{u as A}from"./vue.f36acd1f-0994122c.js";const T={class:"settings-main card"},w={class:"settings-main-content"},D=e.createStaticVNode('<div class="list-section list-header"><div class="list-title">标题</div><div class="list-category">分类</div><div class="list-date">最后更新</div><div class="list-action">操作</div></div>',1),$={class:"list-category"},L={class:"list-date"},M={class:"list-action"},R=["onClick"],j=["onClick"],P={key:0,class:"settings-footer"},F={key:1,class:"admin-load-more",href:"javascript:;"},G=e.defineComponent({name:"BackendArticleList",asyncData(r){const{store:l,route:i,api:s}=r;return g(l).getArticleList({page:1,path:i.fullPath},s)},__name:"backend-article-list",setup(r){const l=b(),i=C(),s=g(),d=m(s),n=e.toRef(d,"lists"),h=m(i),y=e.toRef(h,"historyPageScrollTop");N();const[u,p]=V(!1);async function _(o=n.value.page+1){u.value||(p(!0),await s.getArticleList({page:o,path:l.path}),p(!1))}async function B(o){const{code:a,message:c}=await v.get("backend/article/recover",{id:o});a===200&&(f({type:"success",content:c}),s.recoverArticle(o))}async function S(o){const{code:a,message:c}=await v.get("backend/article/delete",{id:o});a===200&&(f({type:"success",content:c}),s.deleteArticle(o))}e.onMounted(()=>{if(n.value.path==="")_(1);else{const o=y.value[l.path]||0;window.scrollTo(0,o)}});const k=e.ref("文章列表 - M.M.F 小屋");return A({title:k,meta:[{name:"description",content:k}]}),(o,a)=>{const c=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",T,[e.createElementVNode("div",w,[D,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.value.data,t=>(e.openBlock(),e.createElementBlock("div",{key:t._id,class:"list-section"},[e.createElementVNode("div",{class:e.normalizeClass(["list-title",t.is_delete?"text-red-500 line-through":""])},e.toDisplayString(t.title),3),e.createElementVNode("div",$,e.toDisplayString(t.category_name),1),e.createElementVNode("div",L,e.toDisplayString(e.unref(x)(t.update_date)),1),e.createElementVNode("div",M,[e.createVNode(c,{to:`/backend/article/modify/${t._id}`,class:"badge badge-success"},{default:e.withCtx(()=>[e.createTextVNode("编辑")]),_:2},1032,["to"]),t.is_delete?(e.openBlock(),e.createElementBlock("a",{key:0,href:"javascript:;",onClick:E=>B(t._id)},"恢复",8,R)):(e.openBlock(),e.createElementBlock("a",{key:1,href:"javascript:;",onClick:E=>S(t._id)},"删除",8,j)),t.comment_count>0?(e.openBlock(),e.createBlock(c,{key:2,to:`/backend/article/comment/${t._id}`,class:"badge badge-success"},{default:e.withCtx(()=>[e.createTextVNode(" 评论 ")]),_:2},1032,["to"])):e.createCommentVNode("",!0)])]))),128))]),n.value.hasNext?(e.openBlock(),e.createElementBlock("div",P,[e.unref(u)?(e.openBlock(),e.createElementBlock("a",F,"加载中...")):(e.openBlock(),e.createElementBlock("a",{key:0,class:"admin-load-more",href:"javascript:;",onClick:a[0]||(a[0]=t=>_())},"加载更多"))])):e.createCommentVNode("",!0)])}}});export{G as default};
