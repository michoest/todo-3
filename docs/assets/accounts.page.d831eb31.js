import{a as q,Q as P}from"./QCard.1ca30de5.js";import{k as S,h as i,c as r,Q as B,i as A,e as b,M as V,x as I,g as w,E as N,u as O,r as $,A as k,B as C,C as f,D as h,a2 as _,_ as L,$ as T,a0 as j,J as D,a1 as E,K as Q}from"./index.aa543579.js";import{u as M,a as z,b as F}from"./use-checkbox.6e9b6c96.js";import{Q as H}from"./QPage.71eaf6d3.js";import{a as K,b as R}from"./QLayout.abc9e100.js";import{d as J,r as U}from"./relativeTime.a8f04470.js";import"./scroll.62d92d3c.js";const X=()=>i("div",{key:"svg",class:"q-checkbox__bg absolute"},[i("svg",{class:"q-checkbox__svg fit absolute-full",viewBox:"0 0 24 24"},[i("path",{class:"q-checkbox__truthy",fill:"none",d:"M1.73,12.91 8.1,19.28 22.79,4.59"}),i("path",{class:"q-checkbox__indet",d:"M4,14H20V10H4"})])]);var Y=S({name:"QCheckbox",props:M,emits:z,setup(e){const s=X();function o(c,a){const n=r(()=>(c.value===!0?e.checkedIcon:a.value===!0?e.indeterminateIcon:e.uncheckedIcon)||null);return()=>n.value!==null?[i("div",{key:"icon",class:"q-checkbox__icon-container absolute-full flex flex-center no-wrap"},[i(B,{class:"q-checkbox__icon",name:n.value})])]:[s]}return F("checkbox",o)}});const G={position:{type:String,default:"bottom-right",validator:e=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(e)},offset:{type:Array,validator:e=>e.length===2},expand:Boolean};function W(){const{props:e,proxy:{$q:s}}=w(),o=A(V,b);if(o===b)return console.error("QPageSticky needs to be child of QLayout"),b;const c=r(()=>{const t=e.position;return{top:t.indexOf("top")!==-1,right:t.indexOf("right")!==-1,bottom:t.indexOf("bottom")!==-1,left:t.indexOf("left")!==-1,vertical:t==="top"||t==="bottom",horizontal:t==="left"||t==="right"}}),a=r(()=>o.header.offset),n=r(()=>o.right.offset),d=r(()=>o.footer.offset),p=r(()=>o.left.offset),u=r(()=>{let t=0,g=0;const m=c.value,y=s.lang.rtl===!0?-1:1;m.top===!0&&a.value!==0?g=`${a.value}px`:m.bottom===!0&&d.value!==0&&(g=`${-d.value}px`),m.left===!0&&p.value!==0?t=`${y*p.value}px`:m.right===!0&&n.value!==0&&(t=`${-y*n.value}px`);const x={transform:`translate(${t}, ${g})`};return e.offset&&(x.margin=`${e.offset[1]}px ${e.offset[0]}px`),m.vertical===!0?(p.value!==0&&(x[s.lang.rtl===!0?"right":"left"]=`${p.value}px`),n.value!==0&&(x[s.lang.rtl===!0?"left":"right"]=`${n.value}px`)):m.horizontal===!0&&(a.value!==0&&(x.top=`${a.value}px`),d.value!==0&&(x.bottom=`${d.value}px`)),x}),v=r(()=>`q-page-sticky row flex-center fixed-${e.position} q-page-sticky--${e.expand===!0?"expand":"shrink"}`);function l(t){const g=I(t.default);return i("div",{class:v.value,style:u.value},e.expand===!0?g:[i("div",g)])}return{$layout:o,getStickyContent:l}}var Z=S({name:"QPageSticky",props:G,setup(e,{slots:s}){const{getStickyContent:o}=W();return()=>o(s)}});const ee={class:"q-pa-md"},te={class:"text-h6"},oe={class:"text-subtitle2"},ue=Object.assign({name:"TasksPage"},{__name:"accounts.page",setup(e){J.extend(U);const s=N(),o=O(),c=$(null),a=$(!1),n=r(()=>{var u;return((u=o.user)==null?void 0:u.accounts)||[]}),d=u=>{c.value=u},p=async()=>{await o.loginToAccount(c.value,a.value)&&s.push("/")};return(u,v)=>(k(),C(K,null,{default:f(()=>[h(R,null,{default:f(()=>[h(H,null,{default:f(()=>[_("div",ee,[(k(!0),L(j,null,T(n.value,l=>(k(),C(q,{key:l.id,flat:"",bordered:c.value==l.id,onClick:t=>d(l.id)},{default:f(()=>[h(P,null,{default:f(()=>[_("div",te,Q(l.description),1),_("div",oe,Q(l.id),1)]),_:2},1024)]),_:2},1032,["bordered","onClick"]))),128))]),h(Y,{modelValue:a.value,"onUpdate:modelValue":v[0]||(v[0]=l=>a.value=l)},{default:f(()=>v[1]||(v[1]=[D("Set as default account")])),_:1},8,["modelValue"]),h(Z,{position:"bottom",offset:[18,18]},{default:f(()=>[h(E,{fab:"",icon:"login",color:"accent",disable:!c.value,onClick:p},null,8,["disable"])]),_:1})]),_:1})]),_:1})]),_:1}))}});export{ue as default};
