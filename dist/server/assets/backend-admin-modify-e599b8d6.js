import{_ as C}from"./a-input-a46fa5e4.js";import{defineComponent as U,toRef as T,reactive as M,watch as h,ref as B,resolveComponent as D,mergeProps as N,withCtx as u,unref as n,withDirectives as w,createVNode as o,vModelText as $,createTextVNode as P,useSSRContext as j}from"vue";import{ssrRenderAttrs as F,ssrRenderComponent as c,ssrRenderAttr as x}from"vue/server-renderer";import"../entry-server.js";import{u as R}from"./use-backend-admin-store-e7da12c2.js";import{useRoute as H,useRouter as q}from"vue-router";import{storeToRefs as z}from"pinia";import{useToggle as E}from"@vueuse/core";import{useHead as G}from"@vueuse/head";import"node:path";import"@vue/server-renderer";import"js-cookie";import"@lincy/utils";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const A=U({name:"BackendAdminModify",asyncData(l){const{store:i,route:r,api:f}=l;return R(i).getAdminItem({id:r.params.id,path:r.fullPath},f)},__name:"backend-admin-modify",__ssrInlineRender:!0,setup(l){const i=H();q();const r=R(),f=z(r),y=T(f,"item");E(!1);const e=M({id:i.params.id,username:"",email:"",password:""});h(y.value,p=>{p.data&&(e.username=p.data.username,e.email=p.data.email)});const k=B("编辑管理员 - M.M.F 小屋");return G({title:k,meta:[{name:"description",content:k}]}),(p,s,d,V)=>{const _=C,S=D("router-link");s(`<div${F(N({class:"card settings-main"},V))}><div class="settings-main-content"><form>`),s(c(_,{title:"昵称"},{default:u((b,t,v,a)=>{if(t)t(`<input${x("value",n(e).username)} type="text" placeholder="昵称" class="base-input" name="username"${a}><span class="input-info error"${a}>请输入昵称</span>`);else return[w(o("input",{"onUpdate:modelValue":m=>n(e).username=m,type:"text",placeholder:"昵称",class:"base-input",name:"username"},null,8,["onUpdate:modelValue"]),[[$,n(e).username]]),o("span",{class:"input-info error"},"请输入昵称")]}),_:1},d)),s(c(_,{title:"邮箱"},{default:u((b,t,v,a)=>{if(t)t(`<input${x("value",n(e).email)} type="text" placeholder="邮箱" class="base-input" name="email"${a}><span class="input-info error"${a}>请输入邮箱</span>`);else return[w(o("input",{"onUpdate:modelValue":m=>n(e).email=m,type:"text",placeholder:"邮箱",class:"base-input",name:"email"},null,8,["onUpdate:modelValue"]),[[$,n(e).email]]),o("span",{class:"input-info error"},"请输入邮箱")]}),_:1},d)),s(c(_,{title:"密码"},{default:u((b,t,v,a)=>{if(t)t(`<input${x("value",n(e).password)} type="password" placeholder="密码" class="base-input" name="password"${a}><span class="input-info error"${a}>请输入密码</span>`);else return[w(o("input",{"onUpdate:modelValue":m=>n(e).password=m,type:"password",placeholder:"密码",class:"base-input",name:"password"},null,8,["onUpdate:modelValue"]),[[$,n(e).password]]),o("span",{class:"input-info error"},"请输入密码")]}),_:1},d)),s('</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">编辑管理员</a>'),s(c(S,{to:"/backend/admin/list",class:"btn btn-blue"},{default:u((b,t,v,a)=>{if(t)t("返回");else return[P("返回")]}),_:1},d)),s("</div></div>")}}}),g=A.setup;A.setup=(l,i)=>{const r=j();return(r.modules||(r.modules=new Set)).add("src/pages/backend-admin-modify.vue"),g?g(l,i):void 0};export{A as default};
