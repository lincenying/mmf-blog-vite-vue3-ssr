import{defineStore as g}from"pinia";import{reactive as u,toRefs as v}from"vue";import{c as l}from"../entry-server.js";const k=g("backendArticleStore",()=>{const t=u({lists:{data:[],path:"",hasNext:0,hasPrev:0,page:1},item:{data:null,path:""}}),n=async(a,e=l)=>{if(t.lists.data.length>0&&a.path===t.lists.path&&a.page===1)return;const{code:s,data:i}=await e.get("backend/article/list",{...a,path:void 0});if(s===200&&i){const{list:d=[],path:f,hasNext:x=0,hasPrev:A=0,page:c}={...i,path:a.path,page:a.page};t.lists={data:c===1?d:t.lists.data.concat(d),hasNext:x,hasPrev:A,page:(c||1)+1,path:f}}},r=async(a,e=l)=>{const{code:s,data:i}=await e.get("backend/article/item",{...a,path:void 0});s===200&&i&&(t.item={data:i,...a})},o=async a=>{const e=t.lists.data.findIndex(s=>s._id===a);e>-1&&t.lists.data.splice(e,1,{...t.lists.data[e],is_delete:1})},p=async a=>{const e=t.lists.data.findIndex(s=>s._id===a);e>-1&&t.lists.data.splice(e,1,{...t.lists.data[e],is_delete:0})},h=a=>{t.lists.path&&(t.lists.data=[a].concat(t.lists.data))},m=a=>{const e=t.lists.data.findIndex(s=>s._id===a._id);e>-1&&t.lists.data.splice(e,1,a)};return{...v(t),getArticleList:n,getArticleItem:r,deleteArticle:o,recoverArticle:p,insertArticleItem:h,updateArticleItem:m}});export{k as u};