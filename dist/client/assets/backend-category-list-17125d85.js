import{v as e,u as S,l as b,s as m,a as N,b as V,f as r,e as p}from"./main-a340fd75.js";import{u as y}from"./use-global-category-store-f600382f.js";import{u as T}from"./vue.f36acd1f-0994122c.js";const w={class:"card settings-main"},x={class:"settings-main-content"},L=e.createElementVNode("div",{class:"list-section"},[e.createElementVNode("div",{class:"list-title"},"分类名称"),e.createElementVNode("div",{class:"list-time"},"分类排序"),e.createElementVNode("div",{class:"list-action"},"操作")],-1),M={class:"list-time"},R={class:"list-action"},$=["onClick"],D=["onClick"],z=e.defineComponent({name:"BackendCategoryList",asyncData(i){const{store:c,route:l,api:a}=i;return y(c).getCategoryList({limit:99,path:l.fullPath},a)},__name:"backend-category-list",setup(i){const c=S(),l=b(),a=y(),d=m(a),g=e.toRef(d,"lists"),k=m(l),h=e.toRef(k,"historyPageScrollTop");N();const[f,u]=V(!1);async function v(t){f.value||(u(!0),await a.getCategoryList({page:t,limit:99,path:c.path},r),u(!1))}e.onMounted(()=>{if(g.value.length===0)v(1);else{const t=h.value[c.path]||0;window.scrollTo(0,t)}});async function C(t){const{code:n,message:s}=await r.get("backend/category/recover",{id:t});n===200&&(p({type:"success",content:s}),a.recoverCategory(t))}async function E(t){const{code:n,message:s}=await r.get("backend/category/delete",{id:t});n===200&&(p({type:"success",content:s}),a.deleteCategory(t))}const _=e.ref("分类列表 - M.M.F 小屋");return T({title:_,meta:[{name:"description",content:_}]}),(t,n)=>{const s=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",w,[e.createElementVNode("div",x,[L,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(g.value,o=>(e.openBlock(),e.createElementBlock("div",{key:o._id,class:"list-section"},[e.createElementVNode("div",{class:e.normalizeClass(["list-title",o.is_delete?"text-red-500 line-through":""])},e.toDisplayString(o.cate_name),3),e.createElementVNode("div",M,e.toDisplayString(o.cate_order),1),e.createElementVNode("div",R,[e.createVNode(s,{to:`/backend/category/modify/${o._id}`,class:"badge badge-success"},{default:e.withCtx(()=>[e.createTextVNode("编辑")]),_:2},1032,["to"]),o.cate_num?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[o.is_delete?(e.openBlock(),e.createElementBlock("a",{key:0,href:"javascript:;",onClick:B=>C(o._id)},"恢复",8,$)):(e.openBlock(),e.createElementBlock("a",{key:1,href:"javascript:;",onClick:B=>E(o._id)},"删除",8,D))],64))])]))),128))])])}}});export{z as default};
