import{_ as M}from"./a-input-BeZLXpwF.js";import{defineComponent as T,toRef as U,reactive as h,watch as P,onMounted as A,ref as D,resolveComponent as N,mergeProps as j,withCtx as u,unref as n,withDirectives as x,createVNode as m,vModelText as C,createTextVNode as B,useSSRContext as F}from"vue";import{ssrRenderAttrs as H,ssrRenderComponent as _,ssrRenderAttr as R}from"vue/server-renderer";import{u as $}from"./use-global-category-store-BpFdaCEC.js";import{useRoute as I,useRouter as q}from"vue-router";import{storeToRefs as z}from"pinia";import{useToggle as E}from"@vueuse/core";import"../entry-server.js";import{useHead as G}from"@unhead/vue";import"node:path";import"@unhead/ssr";import"@vue/server-renderer";import"element-plus";import"@lincy/utils";import"md5";import"axios";import"qs";import"js-cookie";import"lru-cache";import"node:process";const k=T({name:"BackendCategoryModify",asyncData(i){const{store:s,route:a,api:l}=i;return $(s).getCategoryItem({path:a.fullPath,id:a.params.id},l)},__name:"backend-category-modify",__ssrInlineRender:!0,setup(i){const s=I();q();const a=$(),l=z(a),f=U(l,"item");E(!1);const e=h({id:s.params.id,cate_name:"",cate_order:""});P(f.value,c=>{c.data&&(e.cate_name=c.data.cate_name,e.cate_order=c.data.cate_order)}),A(async()=>{});const g=D("编辑分类 - M.M.F 小屋");return G({title:g,meta:[{name:"description",content:g}]}),(c,o,p,V)=>{const y=M,w=N("router-link");o(`<div${H(j({class:"settings-main card"},V))}><div class="settings-main-content">`),o(_(y,{title:"分类名称"},{default:u((b,t,v,r)=>{if(t)t(`<input${R("value",n(e).cate_name)} type="text" placeholder="分类名称" class="base-input" name="cate_name"${r}><span class="input-info error"${r}>请输入分类名称</span>`);else return[x(m("input",{"onUpdate:modelValue":d=>n(e).cate_name=d,type:"text",placeholder:"分类名称",class:"base-input",name:"cate_name"},null,8,["onUpdate:modelValue"]),[[C,n(e).cate_name]]),m("span",{class:"input-info error"},"请输入分类名称")]}),_:1},p)),o(_(y,{title:"分类排序"},{default:u((b,t,v,r)=>{if(t)t(`<input${R("value",n(e).cate_order)} type="text" placeholder="分类排序" class="base-input" name="cate_order"${r}><span class="input-info error"${r}>请输入分类排序</span>`);else return[x(m("input",{"onUpdate:modelValue":d=>n(e).cate_order=d,type:"text",placeholder:"分类排序",class:"base-input",name:"cate_order"},null,8,["onUpdate:modelValue"]),[[C,n(e).cate_order]]),m("span",{class:"input-info error"},"请输入分类排序")]}),_:1},p)),o('</div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">编辑分类</a>'),o(_(w,{to:"/backend/category/list",class:"btn btn-blue"},{default:u((b,t,v,r)=>{if(t)t("返回");else return[B("返回")]}),_:1},p)),o("</div></div>")}}}),S=k.setup;k.setup=(i,s)=>{const a=F();return(a.modules||(a.modules=new Set)).add("src/pages/backend-category-modify.vue"),S?S(i,s):void 0};export{k as default};
