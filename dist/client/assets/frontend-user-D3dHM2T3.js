import{v as e,f as i,u as d}from"./main-BBnOZaJ_.js";const u={class:"card card-me"},m=e.defineComponent({name:"AsideAccount",__name:"aside-account",setup(s){async function o(){await i.post("frontend/user/logout",{}),window.location.href="/"}return(c,t)=>{const n=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",u,[e.createVNode(n,{to:"/user/account","active-class":"active",class:"side-entry"},{default:e.withCtx(()=>t[0]||(t[0]=[e.createElementVNode("i",{class:"icon icon-arrow-right"},null,-1),e.createElementVNode("i",{class:"icon icon-menu-articles"},null,-1),e.createTextVNode("帐号 ")])),_:1}),e.createVNode(n,{to:"/user/password","active-class":"active",class:"side-entry"},{default:e.withCtx(()=>t[1]||(t[1]=[e.createElementVNode("i",{class:"icon icon-arrow-right"},null,-1),e.createElementVNode("i",{class:"icon icon-menu-articles"},null,-1),e.createTextVNode("密码 ")])),_:1}),e.createElementVNode("a",{href:"javascript:;",class:"side-entry",onClick:o},t[2]||(t[2]=[e.createElementVNode("i",{class:"icon icon-arrow-right"},null,-1),e.createElementVNode("i",{class:"icon icon-menu-articles"},null,-1),e.createTextVNode("退出 ")]))])}}}),_={class:"main wrap"},p={class:"main-left"},f={class:"main-right"},N=e.defineComponent({name:"FrontendUser",__name:"frontend-user",setup(s){const o=d(),c=e.computed(()=>o.path.replace(/\//g,"_"));return(t,n)=>{const a=e.resolveComponent("router-view"),r=m;return e.openBlock(),e.createElementBlock("div",_,[e.createElementVNode("div",p,[e.createVNode(a,null,{default:e.withCtx(({Component:l})=>[(e.openBlock(),e.createBlock(e.Suspense,null,{default:e.withCtx(()=>[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(l),{key:e.unref(c)}))]),_:2},1024))]),_:1})]),e.createElementVNode("div",f,[e.createVNode(r)])])}}});export{N as default};
