import{defineStore as u}from"pinia";import{c}from"../entry-server.js";import{reactive as A,toRefs as g}from"vue";const v=u("backendAdminStore",()=>{const e=A({lists:{hasNext:0,hasPrev:0,path:"",page:1,data:[]},item:{data:null,path:""}}),o=async(a,t)=>{if(t||(t=c),e.lists.data.length>0&&a.path===e.lists.path&&a.page===1)return;const{code:s,data:i}=await t.get("backend/admin/list",{...a,path:void 0});if(s===200&&i){const{list:d=[],path:h,hasNext:f=0,hasPrev:x=0,page:n}={...i,path:a.path,page:a.page};e.lists={data:n===1?d:e.lists.data.concat(d),hasNext:f,hasPrev:x,page:(n||1)+1,path:h}}},l=async(a,t)=>{t||(t=c);const{code:s,data:i}=await t.get("backend/admin/item",{...a,path:void 0});s===200&&i&&(e.item={data:i,...a})},m=a=>{e.item.data=a;const t=e.lists.data.findIndex(s=>s._id===a._id);t>-1&&e.lists.data.splice(t,1,a)},r=a=>{const t=e.lists.data.findIndex(s=>s._id===a);t>-1&&e.lists.data.splice(t,1,{...e.lists.data[t],is_delete:1})},p=a=>{const t=e.lists.data.findIndex(s=>s._id===a);t>-1&&e.lists.data.splice(t,1,{...e.lists.data[t],is_delete:0})};return{...g(e),getAdminList:o,getAdminItem:l,updateAdminItem:m,deleteAdmin:r,recoverAdmin:p}}),S=v;export{S as u};