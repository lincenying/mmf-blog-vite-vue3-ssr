import{p as g,h as u,t as v}from"./vendor-DKdHTvZr.js";import{c as l}from"./main-Bv-ZqgeW.js";const b=g("backendArticleStore",()=>{const t=u({lists:{data:[],path:"",hasNext:0,hasPrev:0,page:1},item:{data:null,path:""}}),n=async(a,s=l)=>{if(t.lists.data.length>0&&a.path===t.lists.path&&a.page===1)return;const{code:e,data:i}=await s.get("backend/article/list",{...a,path:void 0});if(e===200&&i){const{list:d=[],path:f,hasNext:x=0,hasPrev:A=0,page:c}={...i,path:a.path,page:a.page};t.lists={data:c===1?d:t.lists.data.concat(d),hasNext:x,hasPrev:A,page:(c||1)+1,path:f}}},r=async(a,s=l)=>{const{code:e,data:i}=await s.get("backend/article/item",{...a,path:void 0});e===200&&i&&(t.item={data:i,...a})},o=async a=>{const s=t.lists.data.findIndex(e=>e._id===a);s>-1&&t.lists.data.splice(s,1,{...t.lists.data[s],is_delete:1})},p=async a=>{const s=t.lists.data.findIndex(e=>e._id===a);s>-1&&t.lists.data.splice(s,1,{...t.lists.data[s],is_delete:0})},h=a=>{t.lists.path&&(t.lists.data=[a].concat(t.lists.data))},m=a=>{const s=t.lists.data.findIndex(e=>e._id===a._id);s>-1&&t.lists.data.splice(s,1,a)};return{...v(t),getArticleList:n,getArticleItem:r,deleteArticle:o,recoverArticle:p,insertArticleItem:h,updateArticleItem:m}});export{b as u};