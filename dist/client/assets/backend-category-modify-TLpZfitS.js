import{_ as V}from"./a-input.vue_vue_type_script_setup_true_lang-CsH4OfB8.js";import{v as e,u as v,j as C,s as x,b as N,e as p,f as k}from"./main-BBnOZaJ_.js";import{u as f}from"./use-global-category-store-BpjaM1BR.js";import{u as h}from"./vue.8fc199ce-DvXPQa2A.js";const w={class:"settings-main card"},E={class:"settings-main-content"},M={class:"settings-footer"},D=e.defineComponent({name:"BackendCategoryModify",asyncData(d){const{store:i,route:n,api:r}=d;return f(i).getCategoryItem({path:n.fullPath,id:n.params.id},r)},__name:"backend-category-modify",setup(d){const i=v(),n=C(),r=f(),l=x(r),_=e.toRef(l,"item"),[g,u]=N(!1),a=e.reactive({id:i.params.id,cate_name:"",cate_order:""});e.watch(_.value,o=>{o.data&&(a.cate_name=o.data.cate_name,a.cate_order=o.data.cate_order)}),e.onMounted(async()=>{});async function y(){if(!a.cate_name||!a.cate_order){p("请将表单填写完整!");return}if(g.value)return;u(!0);const{code:o,data:t,message:s}=await k.post("backend/category/modify",a);u(!1),o===200&&(p({type:"success",content:s}),r.updateCategoryItem(t),n.push("/backend/category/list"))}const m=e.ref("编辑分类 - M.M.F 小屋");return h({title:m,meta:[{name:"description",content:m}]}),(o,t)=>{const s=V,b=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",w,[e.createElementVNode("div",E,[e.createVNode(s,{title:"分类名称"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":t[0]||(t[0]=c=>e.unref(a).cate_name=c),type:"text",placeholder:"分类名称",class:"base-input",name:"cate_name"},null,512),[[e.vModelText,e.unref(a).cate_name]]),t[2]||(t[2]=e.createElementVNode("span",{class:"input-info error"},"请输入分类名称",-1))]),_:1}),e.createVNode(s,{title:"分类排序"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":t[1]||(t[1]=c=>e.unref(a).cate_order=c),type:"text",placeholder:"分类排序",class:"base-input",name:"cate_order"},null,512),[[e.vModelText,e.unref(a).cate_order]]),t[3]||(t[3]=e.createElementVNode("span",{class:"input-info error"},"请输入分类排序",-1))]),_:1})]),e.createElementVNode("div",M,[e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:y},"编辑分类"),e.createVNode(b,{to:"/backend/category/list",class:"btn btn-blue"},{default:e.withCtx(()=>t[4]||(t[4]=[e.createTextVNode("返回")])),_:1})])])}}});export{D as default};
