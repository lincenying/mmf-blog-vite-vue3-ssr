import{_ as w}from"./a-input.vue_vue_type_script_setup_true_lang-CJXytf3M.js";import{v as e,u as N,j as k,s as v,b as x,e as p,f as g}from"./main-vEEUWzS4.js";import{u as f}from"./use-backend-admin-store-BRyXfnCo.js";import{u as E}from"./vue.f36acd1f-CR8QM_eY.js";const y={class:"card settings-main"},M={class:"settings-main-content"},A=e.createElementVNode("span",{class:"input-info error"},"请输入昵称",-1),C=e.createElementVNode("span",{class:"input-info error"},"请输入邮箱",-1),T=e.createElementVNode("span",{class:"input-info error"},"请输入密码",-1),B={class:"settings-footer"},j=e.defineComponent({name:"BackendAdminModify",asyncData(l){const{store:d,route:i,api:r}=l;return f(d).getAdminItem({id:i.params.id,path:i.fullPath},r)},__name:"backend-admin-modify",setup(l){const d=N(),i=k(),r=f(),m=v(r),_=e.toRef(m,"item"),[h,c]=x(!1),t=e.reactive({id:d.params.id,username:"",email:"",password:""});e.watch(_.value,n=>{n.data&&(t.username=n.data.username,t.email=n.data.email)});async function V(){if(!t.username||!t.email){p("请将表单填写完整!");return}if(h.value)return;c(!0);const{code:n,data:a,message:o}=await g.post("backend/admin/modify",t);c(!1),n===200&&(p({type:"success",content:o}),r.updateAdminItem(a),i.push("/backend/admin/list"))}const u=e.ref("编辑管理员 - M.M.F 小屋");return E({title:u,meta:[{name:"description",content:u}]}),(n,a)=>{const o=w,b=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",y,[e.createElementVNode("div",M,[e.createElementVNode("form",null,[e.createVNode(o,{title:"昵称"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":a[0]||(a[0]=s=>e.unref(t).username=s),type:"text",placeholder:"昵称",class:"base-input",name:"username"},null,512),[[e.vModelText,e.unref(t).username]]),A]),_:1}),e.createVNode(o,{title:"邮箱"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":a[1]||(a[1]=s=>e.unref(t).email=s),type:"text",placeholder:"邮箱",class:"base-input",name:"email"},null,512),[[e.vModelText,e.unref(t).email]]),C]),_:1}),e.createVNode(o,{title:"密码"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":a[2]||(a[2]=s=>e.unref(t).password=s),type:"password",placeholder:"密码",class:"base-input",name:"password"},null,512),[[e.vModelText,e.unref(t).password]]),T]),_:1})])]),e.createElementVNode("div",B,[e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:V},"编辑管理员"),e.createVNode(b,{to:"/backend/admin/list",class:"btn btn-blue"},{default:e.withCtx(()=>[e.createTextVNode("返回")]),_:1})])])}}});export{j as default};