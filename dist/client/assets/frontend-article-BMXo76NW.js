import{_ as I,a as G,b as K}from"./item-actions.vue_vue_type_script_setup_true_lang-C4gOOdAV.js";import{u as q,_ as U}from"./use-frontend-article-store-CY49C_lP.js";import{a as z,b as J,s as A,c as O,d as N,u as Q}from"./main-Bv-ZqgeW.js";import{d as D,t as R,F as f,q as W,x as X,h as Y,k,o as n,c,a as t,u,w as Z,G as tt,a8 as B,a9 as et,b as st,a6 as b,y as T,g as ot,a2 as at,K as nt,L as d,M as F,a5 as w,a7 as ct}from"./vendor-DKdHTvZr.js";import{u as P}from"./use-global-comment-store-1KkG4N2M.js";import{u as V}from"./use-global-category-store-DvT7TdiO.js";/* empty css               */const rt={class:"card"},it={class:"comments"},lt={class:"comment-post-wrap"},mt=["src"],dt={class:"comment-post-input-wrap base-textarea-wrap"},ut={class:"comment-post-actions"},_t={class:"comment-items-wrap"},pt={href:"javascript:;",class:"comment-author-avatar-link"},ht=["src"],vt={class:"comment-content-wrap"},gt={class:"comment-author-wrap"},ft={href:"javascript:;",class:"comment-author"},yt={class:"comment-content"},$t={class:"comment-footer"},wt={class:"comment-time"},kt=["onClick"],bt={key:0,class:"load-more-wrap"},Ct={key:1,href:"javascript:;",class:"comments-load-more"},xt=D({name:"FrontendComment",__name:"frontend-comment",props:{comments:{}},setup(C){const y=R(C),a=f(y,"comments"),_=z(),p=R(_),h=f(p,"cookies"),v=P(),[$,s]=W(!1),x=X(),m=Y({id:x.params.id,content:""}),L=k(()=>h.value.user),M=k(()=>h.value.useremail);async function S(){s(!0),await v.getCommentList({id:x.params.id,page:a.value.page+1,limit:10}),s(!1)}const r=J(async()=>{if(!L.value)A("请先登录!"),_.setLoginModal(!0);else if(m.content==="")A("请输入评论内容!");else{const{code:o,data:l}=await O.post("frontend/comment/insert",m);o===200&&(m.content="",A({type:"success",content:"评论发布成功!"}),v.insertCommentItem(l))}});function i(o){var e;m.content=`回复 @${(e=o.userid)==null?void 0:e.username}: `,document.querySelector("#content").focus()}return(o,l)=>(n(),c("div",rt,[t("div",it,[t("div",lt,[t("img",{src:("useAvatar"in o?o.useAvatar:u(N))(M.value),alt:"",class:"avatar-img"},null,8,mt),t("div",dt,[Z(t("textarea",{id:"content","onUpdate:modelValue":l[0]||(l[0]=e=>u(m).content=e),class:"base-input textarea-input",cols:"30",rows:"4"},null,512),[[tt,u(m).content]])]),t("div",ut,[t("a",{href:"javascript:;",class:"btn btn-blue",onClick:l[1]||(l[1]=(...e)=>u(r)&&u(r)(...e))},"发表评论")])]),t("div",_t,[(n(!0),c(B,null,et(a.value.data,e=>(n(),c("div",{key:e._id,class:"comment-item"},[t("a",pt,[t("img",{src:("useAvatar"in o?o.useAvatar:u(N))(e.userid.email),alt:"",class:"avatar-img"},null,8,ht)]),t("div",vt,[t("span",gt,[t("a",ft,b(e.userid.username),1)]),t("div",yt,b(e.content),1),t("div",$t,[t("span",wt,b(e.creat_date),1),t("a",{href:"javascript:;",class:"comment-action-item comment-reply",onClick:j=>i(e)},"回复",8,kt)])])]))),128))]),a.value.hasNext?(n(),c("div",bt,[u($)?(n(),c("a",Ct,"加载中...")):(n(),c("a",{key:0,href:"javascript:;",class:"comments-load-more",onClick:S},"加载更多"))])):st("",!0)])]))}}),St={class:"main wrap"},Lt={class:"main-left"},Mt={key:0,class:"card card-content-loader"},At={class:"card card-question-head"},Tt={class:"question-content"},Ft={class:"question-title"},Pt={class:"card card-answer"},jt={class:"answer-content"},qt=["innerHTML"],Nt={key:2,class:"card card-answer"},Rt={class:"main-right"},Kt=D({name:"FrontendArticle",asyncData(C){const{store:g,route:y,api:a}=C,{fullPath:_,params:{id:p}}=y,h=V(g),v=q(g),$=P(g);return Promise.all([h.getCategoryList({},a),v.getTrending(void 0,a),$.getCommentList({id:p,path:_,page:1,limit:10},a),v.getArticleItem({id:p,path:_},a)])},__name:"frontend-article",setup(C){const g=V(),y=T(g),a=f(y,"lists"),_=q(),p=T(_),h=f(p,"item"),v=f(p,"trending"),$=k(()=>h.value.isLoad),s=k(()=>h.value.data),x=P(),m=T(x),L=f(m,"lists");Q();function M(r){return r?r.replace(/<a(.*?)href="http/g,'<a$1target="_blank" href="http'):""}ot(()=>{});const S=k(()=>{var i;let r="M.M.F 小屋";return r=(i=s.value)!=null&&i.title?`${s.value.title} - M.M.F 小屋`:"M.M.F 小屋",r});return at({title:S,meta:[{name:"description",content:S}]}),(r,i)=>{const o=nt("router-link"),l=I,e=xt,j=G,H=U,E=K;return n(),c("div",St,[t("div",Lt,[$.value?s.value?(n(),c(B,{key:1},[t("div",At,[t("div",Tt,[d(o,{to:`/category/${s.value.category}`,class:"topic-link-item"},{default:F(()=>[w(b(s.value.category_name),1)]),_:1},8,["to"]),t("h2",Ft,[d(o,{to:`/article/${s.value._id}`,class:"question-title-link"},{default:F(()=>[w(b(s.value.title),1)]),_:1},8,["to"])])])]),t("div",Pt,[t("div",jt,[t("div",{class:"markdown-body vuepress-markdown-body github-markdown-body article-content",innerHTML:M(s.value.html)},null,8,qt)]),d(l,{item:s.value},null,8,["item"])]),d(e,{comments:L.value},null,8,["comments"])],64)):(n(),c("div",Nt,i[1]||(i[1]=[t("div",{class:"answer-content"},"该文章不存在, 或者该文章已经被删除",-1)]))):(n(),c("div",Mt,[d(u(ct),{height:160,width:660,speed:2,"primary-color":"#f3f3f3","secondary-color":"#ecebeb"},{default:F(()=>i[0]||(i[0]=[t("rect",{x:"70",y:"15",rx:"4",ry:"4",width:"117",height:"6.4"},null,-1),w(),t("rect",{x:"70",y:"35",rx:"3",ry:"3",width:"85",height:"6.4"},null,-1),t("rect",{x:"0",y:"80",rx:"3",ry:"3",width:"550",height:"6.4"},null,-1),w(),t("rect",{x:"0",y:"100",rx:"3",ry:"3",width:"620",height:"6.4"},null,-1),t("rect",{x:"0",y:"120",rx:"3",ry:"3",width:"401",height:"6.4"},null,-1),w(),t("rect",{x:"0",y:"140",rx:"3",ry:"3",width:"501",height:"6.4"},null,-1),t("circle",{cx:"30",cy:"30",r:"30"},null,-1)])),_:1})]))]),t("div",Rt,[d(j,{category:a.value},null,8,["category"]),d(H,{trending:v.value},null,8,["trending"]),d(E)])])}}});export{Kt as default};