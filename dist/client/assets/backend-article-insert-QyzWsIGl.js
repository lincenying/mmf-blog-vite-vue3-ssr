import{v as e,i as w,j as C,s as x,b as B,e as g,f as h,_ as $}from"./main-2pUIDROG.js";import{_ as S}from"./a-input.vue_vue_type_script_setup_true_lang-TnDjsuse.js";import{u as v}from"./upload-api-uVvbjo2i.js";import{u as y}from"./use-global-category-store-ne8ZBdmd.js";import{u as D}from"./use-backend-article-store-kiGyky73.js";import{u as M}from"./vue.f36acd1f-c0WRfY5W.js";const A={class:"settings-main card"},I={class:"settings-main-content"},U=e.createElementVNode("span",{class:"input-info error"},"请输入标题",-1),T=e.createElementVNode("i",{class:"icon icon-arrow-down"},null,-1),j=e.createElementVNode("option",{value:""},"请选择分类",-1),F=["value"],L=e.createElementVNode("span",{class:"input-info error"},"请输入分类",-1),R={class:"settings-section"},G={id:"post-content",class:"settings-item-content"},O=e.defineComponent({name:"BackendArticleInsert",asyncData(u){const{store:l,route:r,api:c}=u;return y(l).getCategoryList({limit:99,path:r.fullPath},c)},__name:"backend-article-insert",setup(u){const{ctx:l}=w(),r=C(),c=y(),m=x(c),V=e.toRef(m,"lists"),k=D();let p=e.ref(!1);const[E,f]=B(!1),o=e.reactive({title:"",category:"",content:"",html:""});e.onMounted(async()=>{p.value=!0});async function N(){if(!o.title||!o.category||!o.content){g("请将表单填写完整!");return}if(E.value)return;f(!0);const{code:i,data:n,message:a}=await h.post("backend/article/insert",o);f(!1),i===200&&(g({type:"success",content:a}),k.insertArticleItem(n),r.push("/backend/article/list"))}async function b(i,n,a){const d=l.$loading.show(),s=new FormData;s.append("file",a[0]);try{const{data:t}=await h.file(`${v}/ajax.php?action=upload`,s);t&&t.filepath&&n({url:`${v}/${t.filepath}`,desc:""})}catch(t){console.log(t)}d.hide()}const _=e.ref("发布文章 - M.M.F 小屋");return M({title:_,meta:[{name:"description",content:_}]}),(i,n)=>{const a=S,d=e.resolveComponent("v-md-editor"),s=$;return e.openBlock(),e.createElementBlock("div",A,[e.createElementVNode("div",I,[e.createVNode(a,{title:"标题"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[0]||(n[0]=t=>e.unref(o).title=t),type:"text",placeholder:"标题",class:"base-input",name:"title"},null,512),[[e.vModelText,e.unref(o).title]]),U]),_:1}),e.createVNode(a,{title:"分类",classes:"select-item-wrap"},{default:e.withCtx(()=>[T,e.withDirectives(e.createElementVNode("select",{"onUpdate:modelValue":n[1]||(n[1]=t=>e.unref(o).category=t),class:"select-item",name:"category"},[j,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(V.value,t=>(e.openBlock(),e.createElementBlock("option",{key:t._id,value:`${t._id}|${t.cate_name}`},e.toDisplayString(t.cate_name),9,F))),128))],512),[[e.vModelSelect,e.unref(o).category]]),L]),_:1}),e.createElementVNode("div",R,[e.createElementVNode("div",G,[e.createVNode(s,null,{default:e.withCtx(()=>[e.unref(p)?(e.openBlock(),e.createBlock(d,{key:0,modelValue:e.unref(o).content,"onUpdate:modelValue":n[2]||(n[2]=t=>e.unref(o).content=t),"disabled-menus":[],mode:"edit",height:"500px",onUploadImage:b},null,8,["modelValue"])):e.createCommentVNode("",!0)]),_:1})])])]),e.createElementVNode("div",{class:"settings-footer"},[e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:N},"添加文章")])])}}});export{O as default};