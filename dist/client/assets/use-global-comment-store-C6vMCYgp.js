import{J as f,A as x,g as u,D as v}from"./main-CTY4IKlK.js";const g=f("globalCommentStore",()=>{const t=x({lists:{data:[],hasNext:0,hasPrev:0,page:1,path:""}}),o=async(s,a=v)=>{if(s.path===t.lists.path&&s.page===1)return;const{code:e,data:i}=await a.get("frontend/comment/list",{...s,path:void 0,cache:!0});if(e===200&&i){const{list:n=[],path:m="",hasNext:p=0,hasPrev:h=0,page:d=1}={...s,...i};t.lists={data:d===1?n:t.lists.data.concat(n),hasNext:p,hasPrev:h,page:d,path:m}}},c=s=>{t.lists.data=[s].concat(t.lists.data)},l=s=>{const a=t.lists.data.findIndex(e=>e._id===s);a>-1&&t.lists.data.splice(a,1,{...t.lists.data[a],is_delete:1})},r=s=>{const a=t.lists.data.findIndex(e=>e._id===s);a>-1&&t.lists.data.splice(a,1,{...t.lists.data[a],is_delete:0})};return{...u(t),getCommentList:o,insertCommentItem:c,deleteComment:l,recoverComment:r}});export{g as u};
