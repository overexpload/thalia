import{b as s,t as p,j as e,L as b,m as j}from"./index-C-3fXsNk.js";import{V as y,d as w,a as N,b as S}from"./functions-DunThPl9.js";function P(){const[d,c]=s.useState(!1),[a,o]=s.useState({name:"",content:""}),[l,u]=s.useState(""),[n,m]=s.useState(1),[r,x]=s.useState(0),[i,f]=s.useState([]);s.useEffect(()=>{(async function(){try{const{data:t}=await p.get(`/my-mind?search=${l}&&page=${n}`);t.success&&(f(t.contents),x(t.count))}catch(t){console.log(t)}})()},[l,n]),s.useEffect(()=>{a.content&&a.name&&c(!0)},[a]);const h=t=>m(t),g=S(t=>{u(t)},500);return e.jsxs(e.Fragment,{children:[e.jsx(y,{openModal:d,setOpenModal:c,content:a,setContent:o}),e.jsxs("div",{className:"min-h-screen relative flex flex-col items-center w-full space-y-4 bg-background pt-20 px-4 md:px-20",children:[e.jsx("h1",{className:"font-bold text-text text-4xl",children:"MY Mind"}),e.jsxs("div",{className:"flex z-20 flex-wrap items-center justify-between mt-10 w-full",children:[e.jsxs(b,{to:"/home",className:"font-bold text-white",children:[e.jsx(w,{fontSize:"small",className:"mb-1"})," Back"]}),e.jsxs("div",{className:"flex justify-center items-center ring-1 ring-gray-700 rounded-lg pe-2",children:[e.jsx("input",{onChange:t=>g(t.target.value),className:"h-8 focus:outline-none text-text focus:ring-0 rounded-lg border-0 bg-transparent",type:"text",placeholder:"search"}),e.jsx(N,{fontSize:"medium",className:"text-white/[0.3]"})]})]}),i.length>0&&i.map(t=>e.jsx(e.Fragment,{children:e.jsx("div",{onClick:()=>{o(t)},className:"w-full z-20 py-4 px-4 bg-primary/[0.3] hover:bg-secondary rounded-lg cursor-pointer",children:e.jsx("h1",{className:"font-bold text-text text-xl",children:t.name})})})),e.jsx("div",{className:"flex z-20 mypage overflow-x-auto w-[80%] sm:justify-end",children:r>0&&e.jsx(j,{currentPage:n,totalPages:parseInt(r/10),onPageChange:h})}),e.jsx("img",{src:"https://cdn.dribbble.com/users/736467/screenshots/5465876/blobs-longer.gif",className:"absolute opacity-10 top-0 hidden md:inline-block md:w-full z-10",alt:""})]})]})}export{P as default};
