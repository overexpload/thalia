import{t as j,b as l,j as e,M as u,B as f,S as B,m as E}from"./index-C-3fXsNk.js";import{t as T}from"./timeFormat-BEZOty4m.js";const F=async a=>{try{return(await j.get(`/admin/my-body?page=${a}`,{withCredentials:!0})).data}catch(s){return s}},M=async a=>{try{return(await j.post("/admin/my-body",a,{withCredentials:!0})).data}catch(s){return s}},S=async a=>{try{return(await j.delete(`/admin/my-body/${a}`,{withCredentials:!0})).data}catch(s){return s}},k=async(a,s)=>{try{return(await j.put(`/admin/my-body/${s}`,a)).data}catch(t){return console.log("error=>",t),t}};function A({setOpenModal:a,openModal:s,bodyDetails:t}){const[r,d]=l.useState({name:"",content:""});l.useEffect(()=>{t&&d({name:(t==null?void 0:t.name)||"",content:(t==null?void 0:t.content)||""})},[t]);const m=c=>{const{name:h,value:p}=c.target;d({...r,[h]:p})},i=async()=>{const c=await k(r,t==null?void 0:t._id);c.success===!0&&(f.success(c.message),r.name="",r.content="",a(!1))};return e.jsx(e.Fragment,{children:e.jsxs(u,{show:s,onClose:()=>a(!1),children:[e.jsx(u.Header,{className:"bg-gray-800",children:e.jsx("h1",{className:"text-white font-bold",children:"Edit Topic"})}),e.jsxs(u.Body,{className:"ring-1 bg-gray-800 rounded-b-md px-2 py-2",children:[e.jsx("div",{className:"w-full",children:e.jsxs("label",{htmlFor:"",children:[e.jsx("h1",{className:"text-white py-2",children:"Name of the Topic"}),e.jsx("input",{type:"text",className:"w-full rounded-md bg-gray-700 text-text",value:r==null?void 0:r.name,onChange:m,name:"name"})]})}),e.jsx("div",{className:"w-full mt-3",children:e.jsxs("label",{htmlFor:"",children:[e.jsx("h1",{className:"text-text py-2",children:"Topic Description"}),e.jsx("textarea",{name:"content",value:r==null?void 0:r.content,onChange:m,rows:8,className:"w-full rounded-md bg-gray-700 text-white "})]})}),e.jsx("button",{className:"text-white border-0 px-5 py-1 hover:bg-primary bg-gray-500 hover:text-black rounded-md float-end",onClick:i,children:"Update"})]})]})})}function P({openModal:a,setOpenModal:s}){const[t,r]=l.useState({name:"",content:""}),d=i=>{const{name:c,value:h}=i.target;r({...t,[c]:h})},m=()=>{(async()=>{const c=await M(t);c.success===!0&&(t.name="",t.content="",s(!1),f.success(c.message))})()};return e.jsx(e.Fragment,{children:e.jsxs(u,{show:a,onClose:()=>s(!1),children:[e.jsx(u.Header,{className:"bg-gray-800",children:e.jsx("h1",{className:"text-white font-bold",children:"Add New Topic"})}),e.jsxs(u.Body,{className:"ring-1 bg-background rounded-b-md px-2 py-2",children:[e.jsx("div",{className:"w-full",children:e.jsxs("label",{htmlFor:"",children:[e.jsx("h1",{className:"text-white py-2",children:"Name of the Topic"}),e.jsx("input",{type:"text",className:"w-full rounded-md bg-gray-800 text-text focus:ring-0",value:t.name,onChange:d,name:"name"})]})}),e.jsx("div",{className:"w-full mt-3",children:e.jsxs("label",{htmlFor:"",children:[e.jsx("h1",{className:"text-text py-2",children:"Provide the Topic Description"}),e.jsx("textarea",{name:"content",value:t.content,onChange:d,id:"",rows:8,className:"w-full rounded-md bg-gray-800 text-white focus:ring-0"})]})}),e.jsx("button",{className:"text-primary border px-5 py-1 rounded-md float-end hover:bg-primary hover:text-background",onClick:m,children:"Add Topic"})]})]})})}function H(){const[a,s]=l.useState(!1),[t,r]=l.useState([]),[d,m]=l.useState(1),[i,c]=l.useState(0),[h,p]=l.useState(),[N,g]=l.useState(!1),w=()=>{s(!0)},b=n=>m(n),v=n=>{g(!0);const o=t.find(x=>(x==null?void 0:x._id)===n);p(o)};l.useEffect(()=>{(async()=>{const o=await F(d);o.success===!0&&(r(o.contents),c(o.count))})()},[a,s,r,g,N,p,d]);const C=async n=>{const o=await S(n);o.success===!0&&(r(x=>x.filter(y=>(y==null?void 0:y._id)!==n)),f.success(o.message))};return e.jsxs(e.Fragment,{children:[e.jsx(A,{setOpenModal:g,openModal:N,bodyDetails:h||null}),e.jsx(P,{setOpenModal:s,openModal:a}),e.jsx("div",{className:"min-h-screen bg-background",children:e.jsxs("div",{className:"col-span-9",children:[e.jsxs("div",{className:"text-text flex justify-between",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-2xl py-12",children:"Body Topics"})}),e.jsx("div",{className:"px-8",children:e.jsx("button",{className:"text-xl py-12 text-pretty text-primary",onClick:w,children:"Create"})})]}),e.jsx("div",{children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right rounded",children:[e.jsx("thead",{className:"text-xs bg-secondary rounded",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3 text-primary",children:"No"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-primary",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-primary",children:"Created At"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-primary text-center",children:"Edit or Delete"})]})}),t.map((n,o)=>e.jsx(e.Fragment,{children:e.jsx("tbody",{className:"text-text",children:e.jsxs("tr",{className:"border-b border-gray-500",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 font-medium",children:o+1}),e.jsx("td",{className:"px-6 py-4",children:n==null?void 0:n.name}),e.jsx("td",{className:"px-6 py-4",children:T(n.createdAt)}),e.jsxs("td",{className:"px-6 py-4 flex justify-center",children:[e.jsx("button",{className:"border py-1 px-6 rounded hover:bg-green-500",onClick:()=>v(n==null?void 0:n._id),children:"Edit"}),e.jsx("button",{className:"border py-1 px-6 rounded ml-2 hover:bg-red-700",onClick:()=>{B.fire({title:"Are you sure",text:"are you sure wan't to delete this",showCancelButton:!0,confirmButtonText:"delete"}).then(x=>{x.isConfirmed&&C(n==null?void 0:n._id)})},children:"Delete"})]})]})},o)}))]})}),e.jsx("div",{className:"flex z-20 mypage overflow-x-auto w-[80%] sm:justify-end",children:i>10&&e.jsx(E,{currentPage:d,totalPages:Math.ceil(i/10),onPageChange:b})})]})})]})}export{H as default};
