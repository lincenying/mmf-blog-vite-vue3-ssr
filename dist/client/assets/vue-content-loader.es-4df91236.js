import{v as e,d as x,e as N,f as m,g as v}from"./main-605b9724.js";import{u as V}from"./use-frontend-article-store-b7c2ce89.js";const w={class:"card card-other"},k=e.createStaticVNode('<div class="card-content"><ul class="other-item"><li>当前版本: v3.0.0</li><li>项目开源地址: <a href="https://github.com/lincenying/mmf-blog-vite-vue3" target="_blank">Vue3版(Spa+Pwa)</a></li><li>项目开源地址: <a href="https://github.com/lincenying/mmf-blog-vite-vue3-ssr" target="_blank">服务端渲染版(Ssr+Pwa)</a></li><li>网站备案号: <a href="http://beian.miit.gov.cn" target="_blank">浙ICP备15010753号-1</a></li></ul></div>',1),C=[k],J=e.defineComponent({name:"AsideOther",__name:"aside-other",setup(i){return(t,o)=>(e.openBlock(),e.createElementBlock("div",w,C))}}),b=""+new URL("../static/images/topic-1.png",import.meta.url).href,E={class:"card card-topics"},S=e.createElementVNode("span",{class:"avatar-link"},[e.createElementVNode("img",{src:b,class:"avatar-image",alt:""})],-1),B={class:"topic-title"},$={class:"topic-meta"},R=e.createElementVNode("i",{class:"icon icon-arrow-right"},null,-1),Q=e.defineComponent({name:"AsideCategory",__name:"aside-category",props:{category:null},setup(i){const t=i,o=e.toRefs(t),r=e.toRef(o,"category");return(l,h)=>{const s=e.resolveComponent("router-link");return e.openBlock(),e.createElementBlock("div",E,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.value,n=>(e.openBlock(),e.createBlock(s,{key:n._id,to:`/category/${n._id}`,class:"topic-item"},{default:e.withCtx(()=>[S,e.createElementVNode("div",null,[e.createElementVNode("h3",B,e.toDisplayString(n.cate_name),1),e.createElementVNode("p",$,e.toDisplayString(n.cate_num||0)+" 篇文章",1),R])]),_:2},1032,["to"]))),128))])}}}),L={class:"actions-wrap"},A=e.createElementVNode("i",{class:"icon icon-action-voteup-active"},null,-1),M={class:"text"},D=e.createElementVNode("i",{class:"icon icon-action-voteup"},null,-1),G={class:"text"},O={href:"javascript:;",class:"action-item"},P=e.createElementVNode("i",{class:"icon icon-action-comment"},null,-1),U={class:"text"},j={href:"javascript:;",class:"action-item action-item-fav"},q=e.createElementVNode("i",{class:"icon icon-action-fav"},null,-1),K={class:"text"},F=e.createElementVNode("i",{class:"icon icon-action-share"},null,-1),I=e.createElementVNode("span",{class:"text"},"分享",-1),z=[F,I],T=e.defineComponent({name:"ItemActions",__name:"item-actions",props:{item:null},setup(i){const t=i,o=e.toRefs(t),r=e.toRef(o,"item"),l=x(),h=e.toRefs(l),s=e.toRef(h,"cookies"),n=V(),f=e.computed(()=>!!s.value.user),p=N(async()=>{if(!f.value){m("请先登录!"),l.setLoginModal(!0);return}let d="frontend/like";r.value.like_status&&(d="frontend/unlike");const{code:a,message:c}=await v.get(d,{id:r.value._id});a===200&&(m({type:"success",content:c}),n.modifyLikeStatus({id:r.value._id,status:!r.value.like_status}))});function _(){const d=window.screen.height/2-250,a=window.screen.width/2-300,c=`${r.value.title} - M.M.F 小屋`,g=`https://www.mmxiaowu.com/article/${r.value._id}`;window.open(`http://service.weibo.com/share/share.php?title=${encodeURIComponent(c.replace(/&nbsp;/g," ").replace(/<br \/>/g," "))}&url=${encodeURIComponent(g)}`,"分享至新浪微博",`height=500, width=600, top=${d}, left=${a}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`)}return(d,a)=>(e.openBlock(),e.createElementBlock("div",L,[r.value.like_status?(e.openBlock(),e.createElementBlock("a",{key:0,href:"javascript:;",class:"action-item active",onClick:a[0]||(a[0]=(...c)=>e.unref(p)&&e.unref(p)(...c))},[A,e.createElementVNode("span",M,e.toDisplayString(r.value.like)+" 赞",1)])):(e.openBlock(),e.createElementBlock("a",{key:1,href:"javascript:;",class:"action-item",onClick:a[1]||(a[1]=(...c)=>e.unref(p)&&e.unref(p)(...c))},[D,e.createElementVNode("span",G,e.toDisplayString(r.value.like)+" 赞",1)])),e.createElementVNode("a",O,[P,e.createElementVNode("span",U,e.toDisplayString(r.value.comment_count)+" 评论",1)]),e.createElementVNode("a",j,[q,e.createElementVNode("span",K,e.toDisplayString(r.value.visit)+" 浏览",1)]),e.createElementVNode("a",{href:"javascript:;",class:"action-item",onClick:_},z)]))}});var y=function(){return Math.random().toString(36).substring(2)},u=e.defineComponent({name:"ContentLoader",props:{width:{type:[Number,String]},height:{type:[Number,String]},viewBox:{type:String},preserveAspectRatio:{type:String,default:"xMidYMid meet"},speed:{type:Number,default:2},baseUrl:{type:String,default:""},primaryColor:{type:String,default:"#f9f9f9"},secondaryColor:{type:String,default:"#ecebeb"},primaryOpacity:{type:Number,default:1},secondaryOpacity:{type:Number,default:1},uniqueKey:{type:String},animate:{type:Boolean,default:!0}},setup:function(t){var o=e.computed(function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idClip"):y()}),r=e.computed(function(){return t.uniqueKey?"".concat(t.uniqueKey,"-idGradient"):y()}),l=e.computed(function(){var n;return(n=t.width)!==null&&n!==void 0?n:400}),h=e.computed(function(){var n;return(n=t.height)!==null&&n!==void 0?n:130}),s=e.computed(function(){var n;return(n=t.viewBox)!==null&&n!==void 0?n:"0 0 ".concat(l.value," ").concat(h.value)});return{idClip:o,idGradient:r,computedViewBox:s}},render:function(){return e.createVNode("svg",{width:this.width,height:this.height,viewBox:this.computedViewBox,version:"1.1",preserveAspectRatio:this.preserveAspectRatio},[e.createVNode("rect",{style:{fill:"url(".concat(this.baseUrl,"#").concat(this.idGradient,")")},"clip-path":"url(".concat(this.baseUrl,"#").concat(this.idClip,")"),x:"0",y:"0",width:"100%",height:"100%"},null),e.createVNode("defs",null,[e.createVNode("clipPath",{id:this.idClip},[this.$slots.default?this.$slots.default():e.createVNode("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"100%",height:"100%"},null)]),e.createVNode("linearGradient",{id:this.idGradient},[e.createVNode("stop",{offset:"0%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?e.createVNode("animate",{attributeName:"offset",values:"-2; 1",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),e.createVNode("stop",{offset:"50%","stop-color":this.secondaryColor,"stop-opacity":this.secondaryOpacity},[this.animate?e.createVNode("animate",{attributeName:"offset",values:"-1.5; 1.5",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null]),e.createVNode("stop",{offset:"100%","stop-color":this.primaryColor,"stop-opacity":this.primaryOpacity},[this.animate?e.createVNode("animate",{attributeName:"offset",values:"-1; 2",dur:"".concat(this.speed,"s"),repeatCount:"indefinite"},null):null])])])])}});e.defineComponent(function(i,t){var o=t.attrs;return function(){return e.createVNode(u,o,{default:function(){return[e.createVNode("circle",{cx:"10",cy:"20",r:"8"},null),e.createVNode("rect",{x:"25",y:"15",rx:"5",ry:"5",width:"220",height:"10"},null),e.createVNode("circle",{cx:"10",cy:"50",r:"8"},null),e.createVNode("rect",{x:"25",y:"45",rx:"5",ry:"5",width:"220",height:"10"},null),e.createVNode("circle",{cx:"10",cy:"80",r:"8"},null),e.createVNode("rect",{x:"25",y:"75",rx:"5",ry:"5",width:"220",height:"10"},null),e.createVNode("circle",{cx:"10",cy:"110",r:"8"},null),e.createVNode("rect",{x:"25",y:"105",rx:"5",ry:"5",width:"220",height:"10"},null)]}})}});e.defineComponent(function(i,t){var o=t.attrs;return function(){return e.createVNode(u,o,{default:function(){return[e.createVNode("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"70",height:"10"},null),e.createVNode("rect",{x:"80",y:"0",rx:"3",ry:"3",width:"100",height:"10"},null),e.createVNode("rect",{x:"190",y:"0",rx:"3",ry:"3",width:"10",height:"10"},null),e.createVNode("rect",{x:"15",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),e.createVNode("rect",{x:"155",y:"20",rx:"3",ry:"3",width:"130",height:"10"},null),e.createVNode("rect",{x:"15",y:"40",rx:"3",ry:"3",width:"90",height:"10"},null),e.createVNode("rect",{x:"115",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),e.createVNode("rect",{x:"185",y:"40",rx:"3",ry:"3",width:"60",height:"10"},null),e.createVNode("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"30",height:"10"},null)]}})}});e.defineComponent(function(i,t){var o=t.attrs;return function(){return e.createVNode(u,o,{default:function(){return[e.createVNode("rect",{x:"70",y:"15",rx:"4",ry:"4",width:"117",height:"6.4"},null),e.createVNode("rect",{x:"70",y:"35",rx:"3",ry:"3",width:"85",height:"6.4"},null),e.createVNode("rect",{x:"0",y:"80",rx:"3",ry:"3",width:"350",height:"6.4"},null),e.createVNode("rect",{x:"0",y:"100",rx:"3",ry:"3",width:"380",height:"6.4"},null),e.createVNode("rect",{x:"0",y:"120",rx:"3",ry:"3",width:"201",height:"6.4"},null),e.createVNode("circle",{cx:"30",cy:"30",r:"30"},null)]}})}});e.defineComponent(function(i,t){var o=t.attrs;return function(){return e.createVNode(u,o,{default:function(){return[e.createVNode("rect",{x:"0",y:"0",rx:"3",ry:"3",width:"250",height:"10"},null),e.createVNode("rect",{x:"20",y:"20",rx:"3",ry:"3",width:"220",height:"10"},null),e.createVNode("rect",{x:"20",y:"40",rx:"3",ry:"3",width:"170",height:"10"},null),e.createVNode("rect",{x:"0",y:"60",rx:"3",ry:"3",width:"250",height:"10"},null),e.createVNode("rect",{x:"20",y:"80",rx:"3",ry:"3",width:"200",height:"10"},null),e.createVNode("rect",{x:"20",y:"100",rx:"3",ry:"3",width:"80",height:"10"},null)]}})}});e.defineComponent(function(i,t){var o=t.attrs;return function(){return e.createVNode(u,e.mergeProps(o,{viewBox:"0 0 400 480"}),{default:function(){return[e.createVNode("circle",{cx:"30",cy:"30",r:"30"},null),e.createVNode("rect",{x:"75",y:"13",rx:"4",ry:"4",width:"100",height:"13"},null),e.createVNode("rect",{x:"75",y:"37",rx:"4",ry:"4",width:"50",height:"8"},null),e.createVNode("rect",{x:"0",y:"70",rx:"5",ry:"5",width:"400",height:"400"},null)]}})}});export{u as C,T as _,Q as a,J as b};
