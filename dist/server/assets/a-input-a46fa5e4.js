import{defineComponent as d,toRefs as m,toRef as i,mergeProps as v,useSSRContext as _}from"vue";import{ssrRenderAttrs as f,ssrInterpolate as R,ssrRenderClass as g,ssrRenderSlot as $}from"vue/server-renderer";const r=d({name:"AInput",__name:"a-input",__ssrInlineRender:!0,props:{title:null,classes:null},setup(t){const s=m(t),l=i(s,"title"),p=i(s,"classes");return(a,e,u,c)=>{e(`<div${f(v({class:"settings-section"},c))}><div class="settings-item with-input"><h4 class="settings-title">${R(l.value)}</h4><div class="${g([p.value,"settings-item-content"])}"><div class="settings-input-wrap">`),$(a.$slots,"default",{},null,e,u),e("</div></div></div></div>")}}}),o=r.setup;r.setup=(t,n)=>{const s=_();return(s.modules||(s.modules=new Set)).add("src/components/a-input.vue"),o?o(t,n):void 0};export{r as _};
