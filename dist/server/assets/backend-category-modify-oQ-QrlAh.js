import{_ as M}from"./a-input-wxmridTV.js";import{defineComponent as T,toRef as U,reactive as h,watch as A,onMounted as D,ref as N,resolveComponent as P,mergeProps as j,withCtx as u,unref as n,withDirectives as C,createVNode as l,vModelText as x,createTextVNode as B,useSSRContext as F}from"vue";import{ssrRenderAttrs as G,ssrRenderComponent as _,ssrRenderAttr as R}from"vue/server-renderer";import"../entry-server.js";import{u as $}from"./use-global-category-store-U2BygGah.js";import{useRoute as H,useRouter as I}from"vue-router";import{storeToRefs as q}from"pinia";import{useToggle as z}from"@vueuse/core";import{useHead as E}from"@unhead/vue";import"node:path";import"@vue/server-renderer";import"@unhead/ssr";import"js-cookie";import"@lincy/utils";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const k=T({name:"BackendCategoryModify",asyncData(i){const{store:s,route:a,api:m}=i;return $(s).getCategoryItem({path:a.fullPath,id:a.params.id},m)},__name:"backend-category-modify",__ssrInlineRender:!0,setup(i){const s=H();I();const a=$(),m=q(a),f=U(m,"item");z(!1);const e=h({id:s.params.id,cate_name:"",cate_order:""});A(f.value,c=>{c.data&&(e.cate_name=c.data.cate_name,e.cate_order=c.data.cate_order)}),D(async()=>{});const g=N("编辑分类 - M.M.F 小屋");return E({title:g,meta:[{name:"description",content:g}]}),(c,o,p,V)=>{const y=M,w=P("router-link");o(`<div${G(j({class:"settings-main card"},V))}><div class="settings-main-content">`),o(_(y,{title:"分类名称"},{default:u((b,t,v,r)=>{if(t)t(`<input${R("value",n(e).cate_name)} type="text" placeholder="分类名称" class="base-input" name="cate_name"${r}><span class="input-info error"${r}>请输入分类名称</span>`);else return[C(l("input",{"onUpdate:modelValue":d=>n(e).cate_name=d,type:"text",placeholder:"分类名称",class:"base-input",name:"cate_name"},null,8,["onUpdate:modelValue"]),[[x,n(e).cate_name]]),l("span",{class:"input-info error"},"请输入分类名称")]}),_:1},p)),o(_(y,{title:"分类排序"},{default:u((b,t,v,r)=>{if(t)t(`<input${R("value",n(e).cate_order)} type="text" placeholder="分类排序" class="base-input" name="cate_order"${r}><span class="input-info error"${r}>请输入分类排序</span>`);else return[C(l("input",{"onUpdate:modelValue":d=>n(e).cate_order=d,type:"text",placeholder:"分类排序",class:"base-input",name:"cate_order"},null,8,["onUpdate:modelValue"]),[[x,n(e).cate_order]]),l("span",{class:"input-info error"},"请输入分类排序")]}),_:1},p)),o('</div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">编辑分类</a>'),o(_(w,{to:"/backend/category/list",class:"btn btn-blue"},{default:u((b,t,v,r)=>{if(t)t("返回");else return[B("返回")]}),_:1},p)),o("</div></div>")}}}),S=k.setup;k.setup=(i,s)=>{const a=F();return(a.modules||(a.modules=new Set)).add("src/pages/backend-category-modify.vue"),S?S(i,s):void 0};export{k as default};