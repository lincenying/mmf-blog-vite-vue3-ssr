import{e as q,c as F,_ as H}from"../entry-server.js";import{_ as I}from"./a-input-BeZLXpwF.js";import{defineComponent as N,toRef as j,ref as b,reactive as E,onMounted as G,resolveComponent as z,mergeProps as J,withCtx as h,unref as e,withDirectives as U,createVNode as s,vModelText as K,openBlock as x,createBlock as k,Fragment as O,renderList as Q,toDisplayString as W,vModelSelect as X,createCommentVNode as Y,useSSRContext as Z}from"vue";import{ssrRenderAttrs as ee,ssrRenderComponent as u,ssrRenderAttr as A,ssrIncludeBooleanAttr as R,ssrLooseContain as D,ssrLooseEqual as te,ssrRenderList as oe,ssrInterpolate as ae}from"vue/server-renderer";import{u as L}from"./upload-api-CDhSk3CP.js";import{u as M}from"./use-global-category-store-BpFdaCEC.js";import{useRouter as re}from"vue-router";import{storeToRefs as ne}from"pinia";import{u as ie}from"./use-backend-article-store-BMOF_Kc5.js";import{useToggle as le}from"@vueuse/core";import{useHead as se}from"@unhead/vue";import"node:path";import"@unhead/ssr";import"@vue/server-renderer";import"element-plus";import"@lincy/utils";import"md5";import"axios";import"qs";import"js-cookie";import"lru-cache";import"node:process";import"@kangc/v-md-editor";import"@kangc/v-md-editor/lib/plugins/line-number/index.js";import"@kangc/v-md-editor/lib/theme/vuepress.js";import"prismjs";import"prismjs/components/prism-json.js";import"prismjs/components/prism-javascript.js";import"prismjs/components/prism-typescript.js";import"prismjs/components/prism-markup-templating.js";import"prismjs/components/prism-php.js";import"prismjs/components/prism-twig.js";import"prismjs/components/prism-css.js";import"prismjs/components/prism-sass.js";import"prismjs/components/prism-less.js";import"prismjs/components/prism-bash.js";const P=N({name:"BackendArticleInsert",asyncData(d){const{store:c,route:l,api:f}=d;return M(c).getCategoryList({limit:99,path:l.fullPath},f)},__name:"backend-article-insert",__ssrInlineRender:!0,setup(d){const{ctx:c}=q();re();const l=M(),f=ne(l),g=j(f,"lists");ie();let v=b(!1);const y=b(!0);le(!1);const o=E({title:"",category:"",content:"",html:""});G(async()=>{v.value=!0});async function C(T,n,m){const _=c.$loading.show(),p=new FormData;p.append("file",m[0]);try{const{data:i}=await F.file(`${L}/api/fetch/upload`,p);i&&i.filepath&&n({url:`${L}/${i.filepath}`,desc:""})}catch(i){console.log(i)}_.hide()}const w=b("发布文章 - M.M.F 小屋");return se({title:w,meta:[{name:"description",content:w}]}),(T,n,m,_)=>{const p=I,i=H,V=z("v-md-editor");n(`<div${ee(J({class:"settings-main card"},_))}><div class="settings-main-content">`),n(u(p,{title:"标题"},{default:h((S,a,$,r)=>{if(a)a(`<input${A("value",e(o).title)} type="text" placeholder="标题" class="base-input" name="title"${r}><span class="input-info error"${r}>请输入标题</span>`);else return[U(s("input",{"onUpdate:modelValue":t=>e(o).title=t,type:"text",placeholder:"标题",class:"base-input",name:"title"},null,8,["onUpdate:modelValue"]),[[K,e(o).title]]),s("span",{class:"input-info error"},"请输入标题")]}),_:1},m)),n(u(p,{title:"分类",classes:"select-item-wrap"},{default:h((S,a,$,r)=>{if(a)a(`<i class="icon icon-arrow-down"${r}></i><select class="select-item" name="category"${r}><option value=""${R(Array.isArray(e(o).category)?D(e(o).category,""):te(e(o).category,""))?" selected":""}${r}>请选择分类</option><!--[-->`),oe(g.value,t=>{a(`<option${A("value",`${t._id}|${t.cate_name}`)}${r}>${ae(t.cate_name)}</option>`)}),a(`<!--]--></select><span class="input-info error"${r}>请输入分类</span>`);else return[s("i",{class:"icon icon-arrow-down"}),U(s("select",{"onUpdate:modelValue":t=>e(o).category=t,class:"select-item",name:"category"},[s("option",{value:""},"请选择分类"),(x(!0),k(O,null,Q(g.value,t=>(x(),k("option",{key:t._id,value:`${t._id}|${t.cate_name}`},W(t.cate_name),9,["value"]))),128))],8,["onUpdate:modelValue"]),[[X,e(o).category]]),s("span",{class:"input-info error"},"请输入分类")]}),_:1},m)),n('<div class="settings-section"><div id="post-content" class="settings-item-content">'),n(u(i,null,{default:h((S,a,$,r)=>{if(a)e(v)?a(u(V,{modelValue:e(o).content,"onUpdate:modelValue":t=>e(o).content=t,"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:C},null,$,r)):a("<!---->");else return[e(v)?(x(),k(V,{key:0,modelValue:e(o).content,"onUpdate:modelValue":t=>e(o).content=t,"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:C},null,8,["modelValue","onUpdate:modelValue"])):Y("",!0)]}),_:1},m)),n(`</div></div></div><div class="settings-footer"><label mr-10px inline-flex items-center><input${R(Array.isArray(e(y))?D(e(y),"1"):e(y))?" checked":""} type="checkbox" value="1"><span ml-5px>使用前端生成Html?</span></label><a href="javascript:;" class="btn btn-yellow">添加文章</a></div></div>`)}}}),B=P.setup;P.setup=(d,c)=>{const l=Z();return(l.modules||(l.modules=new Set)).add("src/pages/backend-article-insert.vue"),B?B(d,c):void 0};export{P as default};
