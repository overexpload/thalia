import{b as s,t as p,j as e,L as j,m as b}from"./index-C-3fXsNk.js";import{V as y,d as w,a as N,b as S}from"./functions-DunThPl9.js";function P(){const[d,c]=s.useState(!1),[a,o]=s.useState({name:"",content:""}),[r,u]=s.useState(""),[n,m]=s.useState(1),[l,x]=s.useState(0),[i,f]=s.useState([]);s.useEffect(()=>{(async function(){try{const{data:t}=await p.get(`/rights?search=${r}&&page=${n}`);t.success&&(f(t.rights),x(t.count))}catch(t){console.log(t)}})()},[r,n]),s.useEffect(()=>{a.content&&a.name&&c(!0)},[a]);const g=t=>m(t),h=S(t=>{u(t)},500);return e.jsxs(e.Fragment,{children:[e.jsx(y,{openModal:d,setOpenModal:c,content:a,setContent:o}),e.jsxs("div",{className:"min-h-screen pb-28 relative flex flex-col items-center w-full space-y-4 bg-background pt-20 px-4 md:px-20",children:[e.jsx("h1",{className:"font-bold text-text text-4xl",children:"MY Rights"}),e.jsxs("div",{className:"flex z-20 flex-wrap items-center justify-between mt-10 w-full",children:[e.jsxs(j,{to:"/home",className:"font-bold text-white",children:[e.jsx(w,{fontSize:"small",className:"mb-1"})," Back"]}),e.jsxs("div",{className:"flex justify-center items-center ring-1 ring-gray-700 rounded-lg pe-2",children:[e.jsx("input",{onChange:t=>h(t.target.value),className:"h-8 focus:outline-none text-text focus:ring-0 rounded-lg border-0 bg-transparent",type:"text",placeholder:"search"}),e.jsx(N,{fontSize:"medium",className:"text-white/[0.3]"})]})]}),i.length>0&&i.map(t=>e.jsx(e.Fragment,{children:e.jsx("div",{onClick:()=>{o(t)},className:"w-full py-4 z-20 px-4 bg-primary/[0.3] hover:bg-secondary rounded-lg cursor-pointer",children:e.jsx("h1",{className:"font-bold text-text text-xl",children:t.name})})})),e.jsx("div",{className:"flex mypage z-20 overflow-x-auto w-[80%] sm:justify-end",children:l>0&&e.jsx(b,{currentPage:n,totalPages:parseInt(l/10),onPageChange:g})}),e.jsx("img",{src:"https://i.pinimg.com/originals/44/db/93/44db938c4d86a7ea3ae51a511304a117.gif",className:"absolute opacity-10 top-0 hidden md:inline-block md:w-full z-10",alt:""})]})]})}export{P as default};
