import{_ as f}from"./a-input.vue_vue_type_script_setup_true_lang-2210aa01.js";import{v as e,k as g,s as v,c as h,u as y,f as l,g as V}from"./main-648176ed.js";import{u as b}from"./use-global-category-store-d71a9e50.js";const x={class:"settings-main card"},E={class:"settings-main-content"},N=e.createElementVNode("span",{class:"input-info error"},"请输入分类名称",-1),k=e.createElementVNode("span",{class:"input-info error"},"请输入分类排序",-1),B=e.defineComponent({name:"BackendCategoryInsert",__name:"backend-category-insert",setup(w){const m=g(),c=b(),u=v(c),o=e.toRef(u,"item"),[_,i]=h(!1),t=e.reactive({cate_name:"",cate_order:""});e.watch(o.value,a=>{a.data&&(t.cate_name=a.data.cate_name,t.cate_order=a.data.cate_order)}),e.onMounted(()=>{o.value&&o.value.data&&(t.cate_name=o.value.data.cate_name,t.cate_order=o.value.data.cate_order)});async function p(){if(!t.cate_name||!t.cate_order){l("请将表单填写完整!");return}if(_.value)return;i(!0);const{code:a,data:n,message:s}=await V.post("backend/category/insert",t);i(!1),a===200&&(l({type:"success",content:s}),c.insertCategoryItem({...t,...n}),m.push("/backend/category/list"))}const d=e.ref("添加分类 - M.M.F 小屋");return y({title:d,meta:[{name:"description",content:d}]}),(a,n)=>{const s=f;return e.openBlock(),e.createElementBlock("div",x,[e.createElementVNode("div",E,[e.createVNode(s,{title:"分类名称"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[0]||(n[0]=r=>e.unref(t).cate_name=r),type:"text",placeholder:"分类名称",class:"base-input",name:"cate_name"},null,512),[[e.vModelText,e.unref(t).cate_name]]),N]),_:1}),e.createVNode(s,{title:"分类排序"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[1]||(n[1]=r=>e.unref(t).cate_order=r),type:"text",placeholder:"分类排序",class:"base-input",name:"cate_order"},null,512),[[e.vModelText,e.unref(t).cate_order]]),k]),_:1})]),e.createElementVNode("div",{class:"settings-footer"},[e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:p},"添加分类")])])}}});export{B as default};
