import{h as A,v as l,f as n}from"./main-C4MgA3uc.js";const g=A("backendArticleStore",()=>{const e=l.reactive({lists:{data:[],path:"",hasNext:0,hasPrev:0,page:1},item:{data:null,path:""}}),r=async(a,t)=>{if(t||(t=n),e.lists.data.length>0&&a.path===e.lists.path&&a.page===1)return;const{code:s,data:i}=await t.get("backend/article/list",{...a,path:void 0});if(s===200&&i){const{list:d=[],path:m,hasNext:u=0,hasPrev:v=0,page:c}={...i,path:a.path,page:a.page};e.lists={data:c===1?d:e.lists.data.concat(d),hasNext:u,hasPrev:v,page:(c||1)+1,path:m}}},o=async(a,t)=>{t||(t=n);const{code:s,data:i}=await t.get("backend/article/item",{...a,path:void 0});s===200&&i&&(e.item={data:i,...a})},p=async a=>{const t=e.lists.data.findIndex(s=>s._id===a);t>-1&&e.lists.data.splice(t,1,{...e.lists.data[t],is_delete:1})},h=async a=>{const t=e.lists.data.findIndex(s=>s._id===a);t>-1&&e.lists.data.splice(t,1,{...e.lists.data[t],is_delete:0})},f=a=>{e.lists.path&&(e.lists.data=[a].concat(e.lists.data))},x=a=>{const t=e.lists.data.findIndex(s=>s._id===a._id);t>-1&&e.lists.data.splice(t,1,a)};return{...l.toRefs(e),getArticleList:r,getArticleItem:o,deleteArticle:p,recoverArticle:h,insertArticleItem:f,updateArticleItem:x}}),_=g;export{_ as u};