import{n as c,o as l,a2 as v,a as e,M as g,w as t,Q as w,$ as h,a1 as b,a3 as T,u as x,J as r,c as d,L as u,K as V,I as f}from"./index.6a2e76bf.js";import{Q,a as k}from"./QTable.769fbca3.js";import"./QVirtualScroll.e04732f7.js";import"./QList.ed3bcae4.js";import"./use-virtual-scroll.d9a7d35f.js";import"./rtl.276c3f1b.js";import"./QSelect.6c695fe4.js";import"./QItemLabel.fa8563a5.js";import"./QItem.a0938a99.js";import"./QMenu.94dae428.js";import"./selection.6e8843f8.js";const y={__name:"TransactionView",setup(m){const a=c(!1),n=()=>{a.value=!0};return(p,s)=>(l(),v(T,null,[e(g,{color:"accent",icon:"visibility",size:"md",flat:"",round:"",dense:"",onClick:n}),e(b,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=o=>a.value=o)},{default:t(()=>[e(w,{class:"my-card"},{default:t(()=>[h(" this is a report dialog ")]),_:1})]),_:1},8,["modelValue"])],64))}},B={__name:"TransactionTable",setup(m){const a=c(""),n=c(!0);x(a,()=>{n.value=!0,setTimeout(()=>{n.value=!1})});const p=[{name:"name",label:"Transactions Name",align:"left",field:o=>o.name,format:o=>`${o}`,sortable:!0},{name:"date",align:"center",label:"Date",field:"date",sortable:!0},{name:"view",align:"right",label:"View",field:"view",sortable:!0}],s=[{name:"Transactions 1",date:"4/4/24"},{name:"Transactions 2",date:"4/4/24"},{name:"Transactions 3",date:"4/4/24"},{name:"Transactions 4",date:"4/4/24"}];return(o,_)=>(l(),v(T,null,[r("div",null,[e(V,{rounded:"",outlined:"",dense:"",debounce:"300",modelValue:a.value,"onUpdate:modelValue":_[0]||(_[0]=i=>a.value=i),placeholder:"Search",style:{width:"500px","max-width":"1500px","min-width":"100px"}},{append:t(()=>[n.value?(l(),d(u,{key:1,thickness:2,color:"teal",size:"1em"})):(l(),d(u,{key:0,name:"search"}))]),_:1},8,["modelValue"])]),r("div",null,[e(k,{filter:a.value,flat:"",columns:p,rows:s,"row-key":"name"},{"body-cell-view":t(i=>[e(Q,{props:i},{default:t(()=>[r("div",null,[e(y)])]),_:2},1032,["props"])]),_:1},8,["filter"])])],64))}},C={class:"text-h6 text-white"},K={__name:"TransactionPage",setup(m){return(a,n)=>(l(),d(w,{flat:""},{default:t(()=>[e(f,{style:{"background-color":"#ef4444"}},{default:t(()=>[r("div",C,[e(u,{name:"manufacturing"}),h(" Transaction ")])]),_:1}),e(f,null,{default:t(()=>[e(B)]),_:1})]),_:1}))}};export{K as default};