import{v as e,i as x,j as C,s as B,b as M,e as g,V as $,f as v,_ as S}from"./main-C4MgA3uc.js";import{_ as D}from"./a-input.vue_vue_type_script_setup_true_lang-CNT3hv8G.js";import{u as V}from"./upload-api-B8RxlIE4.js";import{u as k}from"./use-global-category-store-dEOR1fDG.js";import{u as U}from"./use-backend-article-store-CEorPHpE.js";import{u as A}from"./vue.f36acd1f-BmZnZTrH.js";const I={class:"settings-main card"},R={class:"settings-main-content"},T=e.createElementVNode("span",{class:"input-info error"},"请输入标题",-1),F=e.createElementVNode("i",{class:"icon icon-arrow-down"},null,-1),H=e.createElementVNode("option",{value:""},"请选择分类",-1),L=["value"],P=e.createElementVNode("span",{class:"input-info error"},"请输入分类",-1),j={class:"settings-section"},G={id:"post-content",class:"settings-item-content"},q={class:"settings-footer"},z={"mr-10px":"","inline-flex":"","items-center":""},J=e.createElementVNode("span",{"ml-5px":""},"使用前端生成Html?",-1),Z=e.defineComponent({name:"BackendArticleInsert",asyncData(m){const{store:i,route:c,api:d}=m;return k(i).getCategoryList({limit:99,path:c.fullPath},d)},__name:"backend-article-insert",setup(m){const{ctx:i}=x(),c=C(),d=k(),p=B(d),y=e.toRef(p,"lists"),b=U();let f=e.ref(!1);const s=e.ref(!0),[E,_]=M(!1),o=e.reactive({title:"",category:"",content:"",html:""});e.onMounted(async()=>{f.value=!0});async function N(){if(!o.title||!o.category||!o.content){g("请将表单填写完整!");return}if(E.value)return;if(_(!0),s.value){const l=$.vMdParser.themeConfig.markdownParser.render(o.content);o.html=l}const{code:u,data:n,message:a}=await v.post("backend/article/insert",o);_(!1),u===200&&(g({type:"success",content:a}),b.insertArticleItem(n),c.push("/backend/article/list"))}async function w(u,n,a){const l=i.$loading.show(),r=new FormData;r.append("file",a[0]);try{const{data:t}=await v.file(`${V}/api/fetch/upload`,r);t&&t.filepath&&n({url:`${V}/${t.filepath}`,desc:""})}catch(t){console.log(t)}l.hide()}const h=e.ref("发布文章 - M.M.F 小屋");return A({title:h,meta:[{name:"description",content:h}]}),(u,n)=>{const a=D,l=e.resolveComponent("v-md-editor"),r=S;return e.openBlock(),e.createElementBlock("div",I,[e.createElementVNode("div",R,[e.createVNode(a,{title:"标题"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[0]||(n[0]=t=>e.unref(o).title=t),type:"text",placeholder:"标题",class:"base-input",name:"title"},null,512),[[e.vModelText,e.unref(o).title]]),T]),_:1}),e.createVNode(a,{title:"分类",classes:"select-item-wrap"},{default:e.withCtx(()=>[F,e.withDirectives(e.createElementVNode("select",{"onUpdate:modelValue":n[1]||(n[1]=t=>e.unref(o).category=t),class:"select-item",name:"category"},[H,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(y.value,t=>(e.openBlock(),e.createElementBlock("option",{key:t._id,value:`${t._id}|${t.cate_name}`},e.toDisplayString(t.cate_name),9,L))),128))],512),[[e.vModelSelect,e.unref(o).category]]),P]),_:1}),e.createElementVNode("div",j,[e.createElementVNode("div",G,[e.createVNode(r,null,{default:e.withCtx(()=>[e.unref(f)?(e.openBlock(),e.createBlock(l,{key:0,modelValue:e.unref(o).content,"onUpdate:modelValue":n[2]||(n[2]=t=>e.unref(o).content=t),"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:w},null,8,["modelValue"])):e.createCommentVNode("",!0)]),_:1})])])]),e.createElementVNode("div",q,[e.createElementVNode("label",z,[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[3]||(n[3]=t=>e.isRef(s)?s.value=t:null),type:"checkbox",value:"1"},null,512),[[e.vModelCheckbox,e.unref(s)]]),J]),e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:N},"添加文章")])])}}});export{Z as default};