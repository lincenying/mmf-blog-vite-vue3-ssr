import{_ as V}from"./a-input-a46fa5e4.js";import{defineComponent as x,reactive as h,ref as C,mergeProps as R,withCtx as l,unref as s,withDirectives as i,createVNode as m,vModelText as c,useSSRContext as M}from"vue";import{ssrRenderAttrs as F,ssrRenderComponent as u,ssrRenderAttr as w}from"vue/server-renderer";import{b as S,s as f,c as A}from"../entry-server.js";import{useHead as P}from"@vueuse/head";import"node:path";import"@vue/server-renderer";import"pinia";import"js-cookie";import"vue-router";import"@lincy/utils";import"@vueuse/core";import"axios";import"qs";import"element-plus";import"md5";import"lru-cache";const g=x({name:"FrontendUserPassword",__name:"frontend-user-password",__ssrInlineRender:!0,setup(_){const e=h({old_password:"",password:"",re_password:""});S(async()=>{if(!e.password||!e.old_password||!e.re_password)return f("请将表单填写完整!");if(e.password!==e.re_password)return f("两次密码输入不一致!");const{code:v,message:t}=await A.post("frontend/user/password",e);v===200&&(f({type:"success",content:t}),e.old_password="",e.password="",e.re_password="")});const r=C("密码 - M.M.F 小屋");return P({title:r,meta:[{name:"description",content:r}]}),(v,t,d,U)=>{const n=V;t(`<div${F(R({class:"home-feeds cards-wrap"},U))}><div class="settings-main card"><div class="settings-main-content"><form>`),t(u(n,{title:"当前密码"},{default:l((b,o,y,a)=>{if(o)o(`<input${w("value",s(e).old_password)} type="password" placeholder="当前密码" class="base-input" name="old_password" autocomplete="off"${a}>`);else return[i(m("input",{"onUpdate:modelValue":p=>s(e).old_password=p,type:"password",placeholder:"当前密码",class:"base-input",name:"old_password",autocomplete:"off"},null,8,["onUpdate:modelValue"]),[[c,s(e).old_password]])]}),_:1},d)),t(u(n,{title:"新的密码"},{default:l((b,o,y,a)=>{if(o)o(`<input${w("value",s(e).password)} type="password" placeholder="新的密码" class="base-input" name="password" autocomplete="off"${a}>`);else return[i(m("input",{"onUpdate:modelValue":p=>s(e).password=p,type:"password",placeholder:"新的密码",class:"base-input",name:"password",autocomplete:"off"},null,8,["onUpdate:modelValue"]),[[c,s(e).password]])]}),_:1},d)),t(u(n,{title:"确认密码"},{default:l((b,o,y,a)=>{if(o)o(`<input${w("value",s(e).re_password)} type="password" placeholder="确认密码" class="base-input" name="re_password" autocomplete="off"${a}>`);else return[i(m("input",{"onUpdate:modelValue":p=>s(e).re_password=p,type:"password",placeholder:"确认密码",class:"base-input",name:"re_password",autocomplete:"off"},null,8,["onUpdate:modelValue"]),[[c,s(e).re_password]])]}),_:1},d)),t('</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">保存设置</a></div></div></div>')}}}),$=g.setup;g.setup=(_,e)=>{const r=M();return(r.modules||(r.modules=new Set)).add("src/pages/frontend-user-password.vue"),$?$(_,e):void 0};export{g as default};
