import{v as e,i as S,u as $,j as D,s as V,b as A,e as v,V as R,f as b,_ as U}from"./main-BC8QFNir.js";import{_ as T}from"./a-input.vue_vue_type_script_setup_true_lang-BtVhgINw.js";import{u as k}from"./upload-api-B8RxlIE4.js";import{u as w}from"./use-global-category-store-D8BXBR42.js";import{u as I}from"./use-backend-article-store-2qlJn__a.js";import{u as j}from"./vue.f36acd1f-CFrU0ciV.js";const F={class:"settings-main card"},H={class:"settings-main-content"},L=e.createElementVNode("span",{class:"input-info error"},"请输入标题",-1),P=e.createElementVNode("i",{class:"icon icon-arrow-down"},null,-1),G=e.createElementVNode("option",{value:""},"请选择分类",-1),q=["value"],z=e.createElementVNode("span",{class:"input-info error"},"请输入分类",-1),J={class:"settings-section"},K={id:"modify-content",class:"settings-item-content"},O={class:"settings-footer"},Q={"mr-10px":"","inline-flex":"","items-center":""},W=e.createElementVNode("span",{"ml-5px":""},"使用前端生成Html?",-1),ne=e.defineComponent({name:"BackendArticleModify",asyncData(f){const{store:m,route:r,api:u}=f;return w(m).getCategoryList({limit:99,path:r.fullPath},u)},__name:"backend-article-modify",setup(f){const{ctx:m}=S(),r=$(),u=D(),_=w(),N=V(_),g=e.toRef(N,"lists"),p=I(),E=V(p),x=e.toRef(E,"item"),[C,h]=A(!1),c=e.ref(!0),t=e.reactive({id:r.params.id,title:"",category:"",category_name:"",category_old:"",content:"",html:""});e.watch(()=>t.category,n=>{const o=g.value.find(s=>s._id===n);o&&(t.category_name=o.cate_name)}),e.watch(()=>x.value,n=>{n.data&&(t.title=n.data.title,t.category_old=n.data.category,t.category=n.data.category,t.content=n.data.content)},{deep:!0}),e.onMounted(async()=>{p.getArticleItem({id:r.params.id})});async function M(){if(!t.title||!t.category||!t.content){v("请将表单填写完整!");return}if(C.value)return;if(h(!0),c.value){const l=R.vMdParser.themeConfig.markdownParser.render(t.content);t.html=l}const{code:n,data:o,message:s}=await b.post("backend/article/modify",t);h(!1),n===200&&(v({type:"success",content:s}),p.updateArticleItem(o),u.push("/backend/article/list"))}async function B(n,o,s){const l=m.$loading.show(),d=new FormData;d.append("file",s[0]);const{data:i}=await b.file(`${k}/api/fetch/upload`,d);i&&i.filepath&&o({url:`${k}/${i.filepath}`,desc:""}),l.hide()}const y=e.ref("编辑文章 - M.M.F 小屋");return j({title:y,meta:[{name:"description",content:y}]}),(n,o)=>{const s=T,l=e.resolveComponent("v-md-editor"),d=U,i=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",F,[e.createElementVNode("div",H,[e.createVNode(s,{title:"标题"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":o[0]||(o[0]=a=>e.unref(t).title=a),type:"text",placeholder:"标题",class:"base-input",name:"title"},null,512),[[e.vModelText,e.unref(t).title]]),L]),_:1}),e.createVNode(s,{title:"分类",classes:"select-item-wrap"},{default:e.withCtx(()=>[P,e.withDirectives(e.createElementVNode("select",{"onUpdate:modelValue":o[1]||(o[1]=a=>e.unref(t).category=a),class:"select-item",name:"category"},[G,(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(g.value,a=>(e.openBlock(),e.createElementBlock("option",{key:a._id,value:a._id},e.toDisplayString(a.cate_name),9,q))),128))],512),[[e.vModelSelect,e.unref(t).category]]),z]),_:1}),e.createElementVNode("div",J,[e.createElementVNode("div",K,[e.createVNode(d,null,{default:e.withCtx(()=>[e.createVNode(l,{modelValue:e.unref(t).content,"onUpdate:modelValue":o[2]||(o[2]=a=>e.unref(t).content=a),"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:B},null,8,["modelValue"])]),_:1})])])]),e.createElementVNode("div",O,[e.createElementVNode("label",Q,[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":o[3]||(o[3]=a=>e.isRef(c)?c.value=a:null),type:"checkbox",value:"1"},null,512),[[e.vModelCheckbox,e.unref(c)]]),W]),e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:M},"编辑文章"),e.createVNode(i,{to:"/backend/article/list",class:"btn btn-blue"},{default:e.withCtx(()=>[e.createTextVNode("返回")]),_:1})])])}}});export{ne as default};
