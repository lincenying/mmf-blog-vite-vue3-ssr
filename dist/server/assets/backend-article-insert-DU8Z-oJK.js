import{e as F,_ as H,c as I}from"../entry-server.js";import{_ as N}from"./a-input-BeZLXpwF.js";import{defineComponent as j,toRef as E,ref as b,reactive as G,onMounted as z,resolveComponent as J,mergeProps as K,withCtx as h,unref as t,withDirectives as R,createVNode as s,vModelText as O,createBlock as x,openBlock as k,Fragment as Q,renderList as W,toDisplayString as X,vModelSelect as Y,createCommentVNode as Z,useSSRContext as ee}from"vue";import{ssrRenderAttrs as te,ssrRenderComponent as u,ssrRenderAttr as L,ssrIncludeBooleanAttr as C,ssrLooseContain as w,ssrLooseEqual as D,ssrRenderList as oe,ssrInterpolate as ae}from"vue/server-renderer";import{u as M}from"./upload-api-CDhSk3CP.js";import{u as B}from"./use-global-category-store-BpFdaCEC.js";import{useRouter as re}from"vue-router";import{storeToRefs as ne}from"pinia";import{u as ie}from"./use-backend-article-store-BMOF_Kc5.js";import{useToggle as le}from"@vueuse/core";import{useHead as se}from"@unhead/vue";import"node:path";import"@unhead/ssr";import"@vue/server-renderer";import"element-plus";import"@lincy/utils";import"md5";import"axios";import"qs";import"js-cookie";import"lru-cache";import"node:process";import"@kangc/v-md-editor";import"@kangc/v-md-editor/lib/plugins/line-number/index.js";import"@kangc/v-md-editor/lib/theme/vuepress.js";import"prismjs";import"prismjs/components/prism-json.js";import"prismjs/components/prism-javascript.js";import"prismjs/components/prism-typescript.js";import"prismjs/components/prism-markup-templating.js";import"prismjs/components/prism-php.js";import"prismjs/components/prism-twig.js";import"prismjs/components/prism-css.js";import"prismjs/components/prism-sass.js";import"prismjs/components/prism-less.js";import"prismjs/components/prism-bash.js";const T=j({name:"BackendArticleInsert",asyncData(d){const{store:c,route:l,api:f}=d;return B(c).getCategoryList({limit:99,path:l.fullPath},f)},__name:"backend-article-insert",__ssrInlineRender:!0,setup(d){const{ctx:c}=F();re();const l=B(),f=ne(l),g=E(f,"lists");ie();let v=b(!1);const y=b(!0),[ce,me]=le(!1),o=G({title:"",category:"",content:"",html:""});z(async()=>{v.value=!0});async function V(q,n,m){const _=c.$loading.show(),p=new FormData;p.append("file",m[0]);try{const{data:i}=await I.file(`${M}/api/fetch/upload`,p);i&&i.filepath&&n({url:`${M}/${i.filepath}`,desc:""})}catch(i){console.log(i)}_.hide()}const A=b("发布文章 - M.M.F 小屋");return se({title:A,meta:[{name:"description",content:A}]}),(q,n,m,_)=>{const p=N,i=H,S=J("v-md-editor");n(`<div${te(K({class:"settings-main card"},_))}><div class="settings-main-content">`),n(u(p,{title:"标题"},{default:h((U,a,$,r)=>{if(a)a(`<input${L("value",t(o).title)} type="text" placeholder="标题" class="base-input" name="title"${r}><span class="input-info error"${r}>请输入标题</span>`);else return[R(s("input",{"onUpdate:modelValue":e=>t(o).title=e,type:"text",placeholder:"标题",class:"base-input",name:"title"},null,8,["onUpdate:modelValue"]),[[O,t(o).title]]),s("span",{class:"input-info error"},"请输入标题")]}),_:1},m)),n(u(p,{title:"分类",classes:"select-item-wrap"},{default:h((U,a,$,r)=>{if(a)a(`<i class="icon icon-arrow-down"${r}></i><select class="select-item" name="category"${r}><option value=""${C(Array.isArray(t(o).category)?w(t(o).category,""):D(t(o).category,""))?" selected":""}${r}>请选择分类</option><!--[-->`),oe(g.value,e=>{a(`<option${L("value",`${e._id}|${e.cate_name}`)}${C(Array.isArray(t(o).category)?w(t(o).category,`${e._id}|${e.cate_name}`):D(t(o).category,`${e._id}|${e.cate_name}`))?" selected":""}${r}>${ae(e.cate_name)}</option>`)}),a(`<!--]--></select><span class="input-info error"${r}>请输入分类</span>`);else return[s("i",{class:"icon icon-arrow-down"}),R(s("select",{"onUpdate:modelValue":e=>t(o).category=e,class:"select-item",name:"category"},[s("option",{value:""},"请选择分类"),(k(!0),x(Q,null,W(g.value,e=>(k(),x("option",{key:e._id,value:`${e._id}|${e.cate_name}`},X(e.cate_name),9,["value"]))),128))],8,["onUpdate:modelValue"]),[[Y,t(o).category]]),s("span",{class:"input-info error"},"请输入分类")]}),_:1},m)),n('<div class="settings-section"><div id="post-content" class="settings-item-content">'),n(u(i,null,{default:h((U,a,$,r)=>{if(a)t(v)?a(u(S,{modelValue:t(o).content,"onUpdate:modelValue":e=>t(o).content=e,"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:V},null,$,r)):a("<!---->");else return[t(v)?(k(),x(S,{key:0,modelValue:t(o).content,"onUpdate:modelValue":e=>t(o).content=e,"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:V},null,8,["modelValue","onUpdate:modelValue"])):Z("",!0)]}),_:1},m)),n(`</div></div></div><div class="settings-footer"><label mr-10px inline-flex items-center><input${C(Array.isArray(t(y))?w(t(y),"1"):t(y))?" checked":""} type="checkbox" value="1"><span ml-5px>使用前端生成Html?</span></label><a href="javascript:;" class="btn btn-yellow">添加文章</a></div></div>`)}}}),P=T.setup;T.setup=(d,c)=>{const l=ee();return(l.modules||(l.modules=new Set)).add("src/pages/backend-article-insert.vue"),P?P(d,c):void 0};export{T as default};
