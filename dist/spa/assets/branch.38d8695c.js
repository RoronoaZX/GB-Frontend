import{d,n as l,g as i,N as r,P as c}from"./index.c0815fe7.js";import{u as m}from"./warehouse.27456a7f.js";import{api as t}from"./axios.950c72e0.js";import{u as f}from"./employee.fae363d3.js";const F=d("branches",()=>{const h=l(null),s=l([]),p=f();i(()=>p.employees);const u=m(),y=i(()=>u.warehouses);console.log("warehouses",y.value);const o=async()=>{const e=await t.get("/api/branches");s.value=e.data,console.log("response",e.data)};return{branch:h,branches:s,fetchBranches:o,createBranches:async e=>{console.log("Data parameters being sent:",e);try{const a=await t.post("/api/branches",e);console.log("create branch",a.data),s.value.unshift(a.data),o(),r.create({type:"positive",message:"Branch created successfully",timeout:1e3})}catch(a){console.log(a),r.create({type:"negative",icon:"error",message:"Failed to create branch"})}},updateBranches:async(e,a)=>{c.show();try{const n=await t.put(`/api/branches/${e}`,a);s.value=n.data,o(),r.create({type:"positive",message:"Branch updated successfully"})}catch(n){console.log("updateBranches",n),r.create({type:"negative",icon:"error",message:"Failed to update branch"})}finally{c.hide()}},deleteBranches:async e=>{c.show();try{await t.delete(`/api/branches/${e}`),s.value=s.value.filter(a=>a.id!==e),r.create({type:"positive",message:"Branch successfully delete"})}catch{r.create({type:"negative",icon:"error",message:"Failed to delete branch"})}finally{c.hide()}},fetchWarehouseName:async e=>{c.show();try{return(await t.get(`/api/branches/${e}`)).data.name}catch{return null}finally{c.hide()}},fetchBranchesById:async e=>{const a=await t.get(`/api/branches/${e}`);h.value=a.data},fetchBranchWithEmployee:async()=>{const e=await t.get("/api/fetchBranchWithEmployee");s.value=e.data}}});export{F as u};