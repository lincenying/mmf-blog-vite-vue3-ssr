import{e as M,c as T,_ as F}from"../entry-server.js";import{_ as j}from"./a-input-a46fa5e4.js";import{defineComponent as G,toRef as I,ref as U,reactive as N,onMounted as P,resolveComponent as q,mergeProps as E,withCtx as $,unref as t,withDirectives as h,createVNode as i,vModelText as H,openBlock as C,createBlock as b,Fragment as z,renderList as J,toDisplayString as K,vModelSelect as O,createCommentVNode as Q,useSSRContext as W}from"vue";import{ssrRenderAttrs as X,ssrRenderComponent as u,ssrRenderAttr as R,ssrIncludeBooleanAttr as Y,ssrLooseContain as Z,ssrLooseEqual as ee,ssrRenderList as te,ssrInterpolate as oe}from"vue/server-renderer";import{u as k}from"./upload-api-acac9f68.js";import{u as A}from"./use-global-category-store-9a41de21.js";import{useRouter as ae}from"vue-router";import{storeToRefs as ne}from"pinia";import{u as re}from"./use-backend-article-store-0d766600.js";import{useToggle as se}from"@vueuse/core";import{useHead as le}from"@unhead/vue";import"node:path";import"@vue/server-renderer";import"@unhead/ssr";import"js-cookie";import"@lincy/utils";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const D=G({name:"BackendArticleInsert",asyncData(p){const{store:c,route:l,api:f}=p;return A(c).getCategoryList({limit:99,path:l.fullPath},f)},__name:"backend-article-insert",__ssrInlineRender:!0,setup(p){const{ctx:c}=M();ae();const l=A(),f=ne(l),g=I(f,"lists");re();let v=U(!1);se(!1);const o=N({title:"",category:"",content:"",html:""});P(async()=>{v.value=!0});async function w(L,r,d){const _=c.$loading.show(),m=new FormData;m.append("file",d[0]);try{const{data:s}=await T.file(`${k}/ajax.php?action=upload`,m);s&&s.filepath&&r({url:`${k}/${s.filepath}`,desc:""})}catch(s){console.log(s)}_.hide()}const x=U("发布文章 - M.M.F 小屋");return le({title:x,meta:[{name:"description",content:x}]}),(L,r,d,_)=>{const m=j,s=F,V=q("v-md-editor");r(`<div${X(E({class:"settings-main card"},_))}><div class="settings-main-content">`),r(u(m,{title:"标题"},{default:$((S,a,y,n)=>{if(a)a(`<input${R("value",t(o).title)} type="text" placeholder="标题" class="base-input" name="title"${n}><span class="input-info error"${n}>请输入标题</span>`);else return[h(i("input",{"onUpdate:modelValue":e=>t(o).title=e,type:"text",placeholder:"标题",class:"base-input",name:"title"},null,8,["onUpdate:modelValue"]),[[H,t(o).title]]),i("span",{class:"input-info error"},"请输入标题")]}),_:1},d)),r(u(m,{title:"分类",classes:"select-item-wrap"},{default:$((S,a,y,n)=>{if(a)a(`<i class="icon icon-arrow-down"${n}></i><select class="select-item" name="category"${n}><option value=""${Y(Array.isArray(t(o).category)?Z(t(o).category,""):ee(t(o).category,""))?" selected":""}${n}>请选择分类</option><!--[-->`),te(g.value,e=>{a(`<option${R("value",`${e._id}|${e.cate_name}`)}${n}>${oe(e.cate_name)}</option>`)}),a(`<!--]--></select><span class="input-info error"${n}>请输入分类</span>`);else return[i("i",{class:"icon icon-arrow-down"}),h(i("select",{"onUpdate:modelValue":e=>t(o).category=e,class:"select-item",name:"category"},[i("option",{value:""},"请选择分类"),(C(!0),b(z,null,J(g.value,e=>(C(),b("option",{key:e._id,value:`${e._id}|${e.cate_name}`},K(e.cate_name),9,["value"]))),128))],8,["onUpdate:modelValue"]),[[O,t(o).category]]),i("span",{class:"input-info error"},"请输入分类")]}),_:1},d)),r('<div class="settings-section"><div id="post-content" class="settings-item-content">'),r(u(s,null,{default:$((S,a,y,n)=>{if(a)t(v)?a(u(V,{modelValue:t(o).content,"onUpdate:modelValue":e=>t(o).content=e,"disabled-menus":[],mode:"edit",height:"500px",onUploadImage:w},null,y,n)):a("<!---->");else return[t(v)?(C(),b(V,{key:0,modelValue:t(o).content,"onUpdate:modelValue":e=>t(o).content=e,"disabled-menus":[],mode:"edit",height:"500px",onUploadImage:w},null,8,["modelValue","onUpdate:modelValue"])):Q("",!0)]}),_:1},d)),r('</div></div></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">添加文章</a></div></div>')}}}),B=D.setup;D.setup=(p,c)=>{const l=W();return(l.modules||(l.modules=new Set)).add("src/pages/backend-article-insert.vue"),B?B(p,c):void 0};export{D as default};
