import{_ as C}from"./a-input-Dz__SNyu.js";import{defineComponent as M,toRef as T,reactive as h,watch as A,onMounted as B,ref as D,resolveComponent as N,mergeProps as P,withCtx as c,unref as r,withDirectives as y,createVNode as i,vModelText as U,createTextVNode as j,useSSRContext as F}from"vue";import{ssrRenderAttrs as H,ssrRenderComponent as f,ssrRenderAttr as $}from"vue/server-renderer";import"../entry-server.js";import{u as x}from"./use-backend-user-store-BOvJfOJQ.js";import{useRoute as q,useRouter as z}from"vue-router";import{storeToRefs as E}from"pinia";import{useToggle as G}from"@vueuse/core";import{useHead as I}from"@unhead/vue";import"node:path";import"@vue/server-renderer";import"@unhead/ssr";import"js-cookie";import"@lincy/utils";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const g=M({name:"BackendUserModify",asyncData(p){const{store:l,route:s,api:_}=p;return x(l).getUserItem({id:s.params.id,path:s.fullPath,from:"backend"},_)},__name:"backend-user-modify",__ssrInlineRender:!0,setup(p){const l=q();z();const s=x(),_=E(s),o=T(_,"item");G(!1);const e=h({id:l.params.id,username:"",email:"",password:""});A(o.value,u=>{u.data&&(e.username=u.data.username,e.email=u.data.email)}),B(async()=>{o.value&&o.value.data&&(e.username=o.value.data.username,e.email=o.value.data.email)});const k=D("用户编辑 - M.M.F 小屋");return I({title:k,meta:[{name:"description",content:k}]}),(u,n,d,V)=>{const v=C,S=N("router-link");n(`<div${H(P({class:"settings-main card"},V))}><div class="settings-main-content"><form>`),n(f(v,{title:"昵称"},{default:c((b,t,w,a)=>{if(t)t(`<input${$("value",r(e).username)} type="text" placeholder="昵称" class="base-input" name="username"${a}><span class="input-info error"${a}>请输入昵称</span>`);else return[y(i("input",{"onUpdate:modelValue":m=>r(e).username=m,type:"text",placeholder:"昵称",class:"base-input",name:"username"},null,8,["onUpdate:modelValue"]),[[U,r(e).username]]),i("span",{class:"input-info error"},"请输入昵称")]}),_:1},d)),n(f(v,{title:"邮箱"},{default:c((b,t,w,a)=>{if(t)t(`<input${$("value",r(e).email)} type="text" placeholder="邮箱" class="base-input" name="email"${a}><span class="input-info error"${a}>请输入邮箱</span>`);else return[y(i("input",{"onUpdate:modelValue":m=>r(e).email=m,type:"text",placeholder:"邮箱",class:"base-input",name:"email"},null,8,["onUpdate:modelValue"]),[[U,r(e).email]]),i("span",{class:"input-info error"},"请输入邮箱")]}),_:1},d)),n(f(v,{title:"密码"},{default:c((b,t,w,a)=>{if(t)t(`<input${$("value",r(e).password)} type="password" placeholder="密码" class="base-input" name="password"${a}><span class="input-info error"${a}>请输入密码</span>`);else return[y(i("input",{"onUpdate:modelValue":m=>r(e).password=m,type:"password",placeholder:"密码",class:"base-input",name:"password"},null,8,["onUpdate:modelValue"]),[[U,r(e).password]]),i("span",{class:"input-info error"},"请输入密码")]}),_:1},d)),n('</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">编辑用户</a>'),n(f(S,{to:"/backend/user/list",class:"btn btn-blue"},{default:c((b,t,w,a)=>{if(t)t("返回");else return[j("返回")]}),_:1},d)),n("</div></div>")}}}),R=g.setup;g.setup=(p,l)=>{const s=F();return(s.modules||(s.modules=new Set)).add("src/pages/backend-user-modify.vue"),R?R(p,l):void 0};export{g as default};