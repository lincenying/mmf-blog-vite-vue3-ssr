import{_}from"./a-input.vue_vue_type_script_setup_true_lang-OinN8f9G.js";import{v as e,c as v,d as h,e as l,f as m}from"./main-BCpYjCEU.js";import{u as V}from"./vue.f36acd1f-ChkmMf0A.js";const w={class:"cards-wrap home-feeds"},E={class:"card settings-main"},N={class:"settings-main-content"},g=["value"],x=e.createElementVNode("span",{class:"input-info error"},"请输入昵称",-1),k=e.createElementVNode("span",{class:"input-info error"},"请输入邮箱",-1),y={class:"settings-footer"},R=e.defineComponent({name:"FrontendUserAccount",__name:"frontend-user-account",setup(b){const c=v(),f=e.toRefs(c),i=e.toRef(f,"cookies");let r=e.ref(""),t=e.ref("");async function p(){const{code:s,data:n}=await m.get("frontend/user/account",{});s===200&&(r.value=n.username,t.value=n.email)}e.onMounted(()=>{p()});const u=h(async()=>{const s=/^[\w\-.]+@[\w-]+\.[\w-]+$/;if(t.value){if(!s.test(t.value)){l("邮箱格式错误!");return}}else{l("请填写邮箱地址!");return}const{code:n,message:o}=await m.post("frontend/user/account",{email:t.value,username:r.value,id:i.value.userid});n===200&&(c.setCookies({...i.value,useremail:t.value}),l({type:"success",content:o}))}),d=e.ref("帐号 - M.M.F 小屋");return V({title:d,meta:[{name:"description",content:d}]}),(s,n)=>{const o=_;return e.openBlock(),e.createElementBlock("div",w,[e.createElementVNode("div",E,[e.createElementVNode("div",N,[e.createElementVNode("form",null,[e.createVNode(o,{title:"昵称"},{default:e.withCtx(()=>[e.createElementVNode("input",{type:"text",value:e.unref(r),placeholder:"昵称",class:"base-input",name:"username",readonly:""},null,8,g),x]),_:1}),e.createVNode(o,{title:"邮箱"},{default:e.withCtx(()=>[e.withDirectives(e.createElementVNode("input",{"onUpdate:modelValue":n[0]||(n[0]=a=>e.isRef(t)?t.value=a:t=a),type:"text",placeholder:"邮箱",class:"base-input",name:"email"},null,512),[[e.vModelText,e.unref(t)]]),k]),_:1})])]),e.createElementVNode("div",y,[e.createElementVNode("a",{href:"javascript:;",class:"btn btn-yellow",onClick:n[1]||(n[1]=(...a)=>e.unref(u)&&e.unref(u)(...a))},"保存设置")])])])}}});export{R as default};
