import{v as e,i as x,j as C,s as $,b as B,e as v,V as M,f as V,_ as S}from"./main-BBnOZaJ_.js";import{_ as D}from"./a-input.vue_vue_type_script_setup_true_lang-CsH4OfB8.js";import{u as h}from"./use-global-category-store-BpjaM1BR.js";import{u as U}from"./use-backend-article-store-wuXV6Y7B.js";import{u as k}from"./upload-api-B8RxlIE4.js";import{u as I}from"./vue.8fc199ce-DvXPQa2A.js";const P={class:"settings-main card"},A={class:"settings-main-content"},R=["value"],T={class:"settings-section"},F={id:"post-content",class:"settings-item-content"},H={class:"settings-footer"},L={"mr-10px":"","inline-flex":"","items-center":""},O=e.defineComponent({name:"BackendArticleInsert",asyncData(m){const{store:i,route:c,api:d}=m;return h(i).getCategoryList({limit:99,path:c.fullPath},d)},__name:"backend-article-insert",setup(m){const{ctx:i}=x(),c=C(),d=h(),p=$(d),y=e.toRef(p,"lists"),b=U();let f=e.ref(!1);const s=e.ref(!0),[E,g]=B(!1),n=e.reactive({title:"",category:"",content:"",html:""});e.onMounted(async()=>{f.value=!0});async function N(){if(!n.title||!n.category||!n.content){v("请将表单填写完整!");return}if(E.value)return;if(g(!0),s.value){const l=M.vMdParser.themeConfig.markdownParser.render(n.content);n.html=l}const{code:u,data:t,message:a}=await V.post("backend/article/insert",n);g(!1),u===200&&(v({type:"success",content:a}),b.insertArticleItem(t),c.push("/backend/article/list"))}async function w(u,t,a){const l=i.$loading.show(),r=new FormData;r.append("file",a[0]);try{const{data:o}=await V.file(`${k}/api/fetch/upload`,r);o&&o.filepath&&t({url:`${k}/${o.filepath}`,desc:""})}catch(o){console.log(o)}l.hide()}const _=e.ref("发布文章 - M.M.F 小屋");return I({title:_,meta:[{name:"description",content:_}]}),(u,t)=>{const a=D,l=e.resolveComponent("v-md-editor"),r=S;return e.openBlock(),e.createElementBlock("div",P,[e.createElementVNode("div",A,[e.createVNode(a,{title:"标题"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>e.unref(n).title=o),type:"text",placeholder:"标题",class:"base-input",name:"title"},null,512),[[e.vModelText,e.unref(n).title]]),t[4]||(t[4]=e.createElementVNode("span",{class:"input-info error"},"请输入标题",-1))]),_:1}),e.createVNode(a,{title:"分类",classes:"select-item-wrap"},{default:e.withCtx(()=>[t[6]||(t[6]=e.createElementVNode("i",{class:"icon icon-arrow-down"},null,-1)),e.withDirectives(e.createElementVNode("select",{"onUpdate:modelValue":t[1]||(t[1]=o=>e.unref(n).category=o),class:"select-item",name:"category"},[t[5]||(t[5]=e.createElementVNode("option",{value:""},"请选择分类",-1)),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(y.value,o=>(e.openBlock(),e.createElementBlock("option",{key:o._id,value:`${o._id}|${o.cate_name}`},e.toDisplayString(o.cate_name),9,R))),128))],512),[[e.vModelSelect,e.unref(n).category]]),t[7]||(t[7]=e.createElementVNode("span",{class:"input-info error"},"请输入分类",-1))]),_:1}),e.createElementVNode("div",T,[e.createElementVNode("div",F,[e.createVNode(r,null,{default:e.withCtx(()=>[e.unref(f)?(e.openBlock(),e.createBlock(l,{key:0,modelValue:e.unref(n).content,"onUpdate:modelValue":t[2]||(t[2]=o=>e.unref(n).content=o),"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:w},null,8,["modelValue"])):e.createCommentVNode("",!0)]),_:1})])])]),e.createElementVNode("div",H,[e.createElementVNode("label",L,[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":t[3]||(t[3]=o=>e.isRef(s)?s.value=o:null),type:"checkbox",value:"1"},null,512),[[e.vModelCheckbox,e.unref(s)]]),t[8]||(t[8]=e.createElementVNode("span",{"ml-5px":""},"使用前端生成Html?",-1))]),e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:N},"添加文章")])])}}});export{O as default};
