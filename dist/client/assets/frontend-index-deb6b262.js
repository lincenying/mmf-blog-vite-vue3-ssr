import{_ as T,C as b,a as S,b as A}from"./vue-content-loader.es-4df91236.js";import{u as k,_ as R}from"./use-frontend-article-store-b7c2ce89.js";import{v as e,a as D,s as x,b as L,c as F,u as I}from"./main-605b9724.js";import{u as $}from"./use-global-category-store-056bf978.js";const M={class:"card feed"},j={class:"feed-content"},P={class:"feed-desc-wrap"},z={class:"feed-article-content markdown-body"},G=e.defineComponent({name:"TopicsItemNone",__name:"topics-item-none",setup(r){return(o,s)=>(e.openBlock(),e.createElementBlock("div",M,[e.createElementVNode("div",j,[e.createElementVNode("div",P,[e.createElementVNode("div",z,[e.renderSlot(o.$slots,"default")])])])]))}}),H={class:"card feed"},q={class:"feed-content"},J={class:"feed-source-time"},K={class:"feed-source"},O={class:"feed-time"},Q={class:"feed-main-link-wrap"},U={class:"feed-desc-wrap"},W={class:"feed-article-content markdown-body"},X=e.defineComponent({name:"TopicsItem",__name:"topics-item",props:{item:null},setup(r){const o=r,s=e.toRefs(o),t=e.toRef(s,"item");return(l,i)=>{const c=e.resolveComponent("router-link"),n=T;return e.openBlock(),e.createElementBlock("div",H,[e.createElementVNode("div",q,[e.createElementVNode("div",J,[e.createElementVNode("span",K,[e.createTextVNode("来自分类 "),e.createVNode(c,{to:`/category/${t.value.category}`,class:"feed-minor-link"},{default:e.withCtx(()=>[e.createTextVNode(e.toDisplayString(t.value.category_name),1)]),_:1},8,["to"])]),e.createElementVNode("span",O,e.toDisplayString(t.value.update_date),1)]),e.createElementVNode("div",Q,[e.createVNode(c,{to:`/article/${t.value._id}`,class:"feed-main-link"},{default:e.withCtx(()=>[e.createTextVNode(e.toDisplayString(t.value.title),1)]),_:1},8,["to"])]),e.createElementVNode("div",U,[e.createElementVNode("div",W,e.toDisplayString(t.value.content),1)])]),e.createVNode(n,{item:t.value},null,8,["item"])])}}}),Y={class:"main wrap"},Z={class:"main-left"},ee={class:"cards-wrap home-feeds"},te={key:0,class:"card card-content-loader"},oe=e.createElementVNode("rect",{x:"70",y:"15",rx:"4",ry:"4",width:"117",height:"6.4"},null,-1),ne=e.createElementVNode("rect",{x:"70",y:"35",rx:"3",ry:"3",width:"85",height:"6.4"},null,-1),ae=e.createElementVNode("rect",{x:"0",y:"80",rx:"3",ry:"3",width:"550",height:"6.4"},null,-1),ce=e.createElementVNode("rect",{x:"0",y:"100",rx:"3",ry:"3",width:"620",height:"6.4"},null,-1),se=e.createElementVNode("rect",{x:"0",y:"120",rx:"3",ry:"3",width:"401",height:"6.4"},null,-1),re=e.createElementVNode("rect",{x:"0",y:"140",rx:"3",ry:"3",width:"501",height:"6.4"},null,-1),le=e.createElementVNode("circle",{cx:"30",cy:"30",r:"30"},null,-1),ie={class:"load-more-wrap"},de=e.createElementVNode("i",{class:"icon icon-circle-loading"},null,-1),_e={class:"main-right"},fe=e.defineComponent({name:"FrontendIndex",asyncData(r){const{store:o,route:s,api:t}=r,{params:{id:l,key:i,by:c},fullPath:n}=s,u=$(o),_=k(o);return Promise.all([u.getCategoryList({},t),_.getTrending({},t),_.getArticleList({page:1,limit:10,id:l,path:n,key:i,by:c},t)])},__name:"frontend-index",setup(r){const o=D(),s=$(),t=x(s),l=e.toRef(t,"lists"),i=k(),c=x(i),n=e.toRef(c,"lists"),u=e.toRef(c,"trending");L();const{params:{id:_,key:E,by:w},path:B}=o,[h,v]=F(!1);async function N(a=n.value.page+1){h.value||(v(!0),await i.getArticleList({page:a,limit:10,id:_,path:B,key:E,by:w}),v(!1))}e.onActivated(()=>{console.log(`frontend-index onActivated:${o.path}`),n.value.path!==o.path&&N(1)});const V=e.computed(()=>{let a="M.M.F 小屋";const{id:d,key:m,by:f}=o.params;if(d){const p=l.value.find(g=>g._id===d);p&&(a=`${p.cate_name} - ${a}`)}else m?a=`搜索: ${m} - ${a}`:f&&(a=`热门 - ${a}`);return a});return I({title:V,meta:[{name:"description",content:V}]}),(a,d)=>{const m=X,f=G,p=S,g=R,C=A;return e.openBlock(),e.createElementBlock("div",Y,[e.createElementVNode("div",Z,[e.createElementVNode("div",ee,[n.value.path?n.value.data.length>0?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.value.data,y=>(e.openBlock(),e.createBlock(m,{key:y._id,item:y},null,8,["item"]))),128)),e.createElementVNode("div",ie,[n.value.hasNext?(e.openBlock(),e.createElementBlock("a",{key:0,href:"javascript:;",class:e.normalizeClass(["load-more",e.unref(h)?"loading":""]),onClick:d[0]||(d[0]=y=>N())},[e.createTextVNode(e.toDisplayString(e.unref(h)?"加载中":"更多")+" ",1),de],2)):e.createCommentVNode("",!0)])],64)):(e.openBlock(),e.createBlock(f,{key:2},{default:e.withCtx(()=>[e.createTextVNode("当前分类还没有文章...")]),_:1})):(e.openBlock(),e.createElementBlock("div",te,[e.createVNode(e.unref(b),{height:160,width:660,speed:2,"primary-color":"#f3f3f3","secondary-color":"#ecebeb"},{default:e.withCtx(()=>[oe,e.createTextVNode(),ne,ae,e.createTextVNode(),ce,se,e.createTextVNode(),re,le]),_:1})]))])]),e.createElementVNode("div",_e,[e.createVNode(p,{category:l.value},null,8,["category"]),e.createVNode(g,{trending:u.value},null,8,["trending"]),e.createVNode(C)])])}}});export{fe as default};
