import{P as Ce,r as j,a as ee,n as P,c as C,ah as we,g as Y,i as Me,o as ae,ai as Se,aj as Ve,a6 as be,s as Re,T as Q,q as qe,v as Fe,h as R,ak as G,Q as se,al as Ae,x as te,ac as _e,d as Ee,k as Be,am as de,an as Te}from"./index.aa543579.js";import{u as ue}from"./uid.633898d2.js";import{a as $e,u as Oe}from"./QPage.71eaf6d3.js";import{u as Pe,b as Ie}from"./QCard.1ca30de5.js";function je(e){return e==null?null:e}function fe(e,t){return e==null?t===!0?`f_${ue()}`:null:e}function De({getValue:e,required:t=!0}={}){if(Ce.value===!0){const i=e!==void 0?j(je(e())):j(null);return t===!0&&i.value===null&&ee(()=>{i.value=`f_${ue()}`}),e!==void 0&&P(e,u=>{i.value=fe(u,t)}),i}return e!==void 0?C(()=>fe(e(),t)):j(`f_${ue()}`)}const ce=/^on[A-Z]/;function ze(){const{attrs:e,vnode:t}=Y(),i={listeners:j({}),attributes:j({})};function u(){const c={},f={};for(const v in e)v!=="class"&&v!=="style"&&ce.test(v)===!1&&(c[v]=e[v]);for(const v in t.props)ce.test(v)===!0&&(f[v]=t.props[v]);i.attributes.value=c,i.listeners.value=f}return we(u),u(),i}function Ne({validate:e,resetValidation:t,requiresQForm:i}){const u=Me(Se,!1);if(u!==!1){const{props:c,proxy:f}=Y();Object.assign(f,{validate:e,resetValidation:t}),P(()=>c.disable,v=>{v===!0?(typeof t=="function"&&t(),u.unbindComponent(f)):u.bindComponent(f)}),ee(()=>{c.disable!==!0&&u.bindComponent(f)}),ae(()=>{c.disable!==!0&&u.unbindComponent(f)})}else i===!0&&console.error("Parent QForm not found on useFormChild()!")}const ve=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,me=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,ge=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,le=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ne=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,re={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>ve.test(e),hexaColor:e=>me.test(e),hexOrHexaColor:e=>ge.test(e),rgbColor:e=>le.test(e),rgbaColor:e=>ne.test(e),rgbOrRgbaColor:e=>le.test(e)||ne.test(e),hexOrRgbColor:e=>ve.test(e)||le.test(e),hexaOrRgbaColor:e=>me.test(e)||ne.test(e),anyColor:e=>ge.test(e)||le.test(e)||ne.test(e)},Le=[!0,!1,"ondemand"],Ke={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],default:!1,validator:e=>Le.includes(e)}};function Ue(e,t){const{props:i,proxy:u}=Y(),c=j(!1),f=j(null),v=j(!1);Ne({validate:I,resetValidation:T});let m=0,S;const M=C(()=>i.rules!==void 0&&i.rules!==null&&i.rules.length!==0),b=C(()=>i.disable!==!0&&M.value===!0&&t.value===!1),k=C(()=>i.error===!0||c.value===!0),H=C(()=>typeof i.errorMessage=="string"&&i.errorMessage.length!==0?i.errorMessage:f.value);P(()=>i.modelValue,()=>{v.value=!0,b.value===!0&&i.lazyRules===!1&&$()});function E(){i.lazyRules!=="ondemand"&&b.value===!0&&v.value===!0&&$()}P(()=>i.reactiveRules,D=>{D===!0?S===void 0&&(S=P(()=>i.rules,E,{immediate:!0,deep:!0})):S!==void 0&&(S(),S=void 0)},{immediate:!0}),P(()=>i.lazyRules,E),P(e,D=>{D===!0?v.value=!0:b.value===!0&&i.lazyRules!=="ondemand"&&$()});function T(){m++,t.value=!1,v.value=!1,c.value=!1,f.value=null,$.cancel()}function I(D=i.modelValue){if(i.disable===!0||M.value===!1)return!0;const d=++m,N=t.value!==!0?()=>{v.value=!0}:()=>{},K=(q,V)=>{q===!0&&N(),c.value=q,f.value=V||null,t.value=!1},L=[];for(let q=0;q<i.rules.length;q++){const V=i.rules[q];let O;if(typeof V=="function"?O=V(D,re):typeof V=="string"&&re[V]!==void 0&&(O=re[V](D)),O===!1||typeof O=="string")return K(!0,O),!1;O!==!0&&O!==void 0&&L.push(O)}return L.length===0?(K(!1),!0):(t.value=!0,Promise.all(L).then(q=>{if(q===void 0||Array.isArray(q)===!1||q.length===0)return d===m&&K(!1),!0;const V=q.find(O=>O===!1||typeof O=="string");return d===m&&K(V!==void 0,V),V===void 0},q=>(d===m&&(console.error(q),K(!0)),!1)))}const $=Ve(I,0);return ae(()=>{S!==void 0&&S(),$.cancel()}),Object.assign(u,{resetValidation:T,validate:I}),be(u,"hasError",()=>k.value),{isDirtyModel:v,hasRules:M,hasError:k,errorMessage:H,validate:I,resetValidation:T}}let W=[],J=[];function ke(e){J=J.filter(t=>t!==e)}function ut(e){ke(e),J.push(e)}function it(e){ke(e),J.length===0&&W.length!==0&&(W[W.length-1](),W=[])}function ye(e){J.length===0?e():W.push(e)}function He(e){W=W.filter(t=>t!==e)}function ie(e){return e!=null&&(""+e).length!==0}const Ze={...Oe,...Ke,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String},Qe={...Ze,maxlength:[Number,String]},We=["update:modelValue","clear","focus","blur"];function Ye({requiredForAttr:e=!0,tagProp:t,changeEvent:i=!1}={}){const{props:u,proxy:c}=Y(),f=$e(u,c.$q),v=De({required:e,getValue:()=>u.for});return{requiredForAttr:e,changeEvent:i,tag:t===!0?C(()=>u.tag):{value:"label"},isDark:f,editable:C(()=>u.disable!==!0&&u.readonly!==!0),innerLoading:j(!1),focused:j(!1),hasPopupOpen:!1,splitAttrs:ze(),targetUid:v,rootRef:j(null),targetRef:j(null),controlRef:j(null)}}function Xe(e){const{props:t,emit:i,slots:u,attrs:c,proxy:f}=Y(),{$q:v}=f;let m=null;e.hasValue===void 0&&(e.hasValue=C(()=>ie(t.modelValue))),e.emitValue===void 0&&(e.emitValue=r=>{i("update:modelValue",r)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:o,onFocusout:n}),Object.assign(e,{clearValue:s,onControlFocusin:o,onControlFocusout:n,focus:V}),e.computedCounter===void 0&&(e.computedCounter=C(()=>{if(t.counter!==!1){const r=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,g=t.maxlength!==void 0?t.maxlength:t.maxValues;return r+(g!==void 0?" / "+g:"")}}));const{isDirtyModel:S,hasRules:M,hasError:b,errorMessage:k,resetValidation:H}=Ue(e.focused,e.innerLoading),E=e.floatingLabel!==void 0?C(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):C(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),T=C(()=>t.bottomSlots===!0||t.hint!==void 0||M.value===!0||t.counter===!0||t.error!==null),I=C(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),$=C(()=>`q-field row no-wrap items-start q-field--${I.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(E.value===!0?" q-field--float":"")+(d.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(b.value===!0?" q-field--error":"")+(b.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&T.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),D=C(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(b.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),d=C(()=>t.labelSlot===!0||t.label!==void 0),N=C(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&b.value!==!0?` text-${t.labelColor}`:"")),K=C(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:E.value,modelValue:t.modelValue,emitValue:e.emitValue})),L=C(()=>{const r={};return e.targetUid.value&&(r.for=e.targetUid.value),t.disable===!0&&(r["aria-disabled"]="true"),r});function q(){const r=document.activeElement;let g=e.targetRef!==void 0&&e.targetRef.value;g&&(r===null||r.id!==e.targetUid.value)&&(g.hasAttribute("tabindex")===!0||(g=g.querySelector("[tabindex]")),g&&g!==r&&g.focus({preventScroll:!0}))}function V(){ye(q)}function O(){He(q);const r=document.activeElement;r!==null&&e.rootRef.value.contains(r)&&r.blur()}function o(r){m!==null&&(clearTimeout(m),m=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,i("focus",r))}function n(r,g){m!==null&&clearTimeout(m),m=setTimeout(()=>{m=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,i("blur",r)),g!==void 0&&g())})}function s(r){Re(r),v.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),i("update:modelValue",null),e.changeEvent===!0&&i("change",null),i("clear",t.modelValue),Q(()=>{const g=S.value;H(),S.value=g})}function a(r){[13,32].includes(r.keyCode)&&s(r)}function y(){const r=[];return u.prepend!==void 0&&r.push(R("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:G},u.prepend())),r.push(R("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},h())),b.value===!0&&t.noErrorIcon===!1&&r.push(p("error",[R(se,{name:v.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?r.push(p("inner-loading-append",u.loading!==void 0?u.loading():[R(Ae,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&r.push(p("inner-clearable-append",[R(se,{class:"q-field__focusable-action",name:t.clearIcon||v.iconSet.field.clear,tabindex:0,role:"button","aria-hidden":"false","aria-label":v.lang.label.clear,onKeyup:a,onClick:s})])),u.append!==void 0&&r.push(R("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:G},u.append())),e.getInnerAppend!==void 0&&r.push(p("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&r.push(e.getControlChild()),r}function h(){const r=[];return t.prefix!==void 0&&t.prefix!==null&&r.push(R("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&r.push(e.getShadowControl()),e.getControl!==void 0?r.push(e.getControl()):u.rawControl!==void 0?r.push(u.rawControl()):u.control!==void 0&&r.push(R("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},u.control(K.value))),d.value===!0&&r.push(R("div",{class:N.value},te(u.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&r.push(R("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),r.concat(te(u.default))}function F(){let r,g;b.value===!0?k.value!==null?(r=[R("div",{role:"alert"},k.value)],g=`q--slot-error-${k.value}`):(r=te(u.error),g="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(r=[R("div",t.hint)],g=`q--slot-hint-${t.hint}`):(r=te(u.hint),g="q--slot-hint"));const w=t.counter===!0||u.counter!==void 0;if(t.hideBottomSpace===!0&&w===!1&&r===void 0)return;const A=R("div",{key:g,class:"q-field__messages col"},r);return R("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:G},[t.hideBottomSpace===!0?A:R(_e,{name:"q-transition--field-message"},()=>A),w===!0?R("div",{class:"q-field__counter"},u.counter!==void 0?u.counter():e.computedCounter.value):null])}function p(r,g){return g===null?null:R("div",{key:r,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},g)}let x=!1;return qe(()=>{x=!0}),Fe(()=>{x===!0&&t.autofocus===!0&&f.focus()}),t.autofocus===!0&&ee(()=>{f.focus()}),ae(()=>{m!==null&&clearTimeout(m)}),Object.assign(f,{focus:V,blur:O}),function(){const g=e.getControl===void 0&&u.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...L.value}:L.value;return R(e.tag.value,{ref:e.rootRef,class:[$.value,c.class],style:c.style,...g},[u.before!==void 0?R("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:G},u.before()):null,R("div",{class:"q-field__inner relative-position col self-stretch"},[R("div",{ref:e.controlRef,class:D.value,tabindex:-1,...e.controlEvents},y()),T.value===!0?F():null]),u.after!==void 0?R("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:G},u.after()):null])}}const he={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},oe={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},xe=Object.keys(oe);xe.forEach(e=>{oe[e].regex=new RegExp(oe[e].pattern)});const Ge=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+xe.join("")+"])|(.)","g"),pe=/[.*+?^${}()|[\]\\]/g,B=String.fromCharCode(1),Je={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function et(e,t,i,u){let c,f,v,m,S,M;const b=j(null),k=j(E());function H(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}P(()=>e.type+e.autogrow,I),P(()=>e.mask,o=>{if(o!==void 0)$(k.value,!0);else{const n=V(k.value);I(),e.modelValue!==n&&t("update:modelValue",n)}}),P(()=>e.fillMask+e.reverseFillMask,()=>{b.value===!0&&$(k.value,!0)}),P(()=>e.unmaskedValue,()=>{b.value===!0&&$(k.value)});function E(){if(I(),b.value===!0){const o=L(V(e.modelValue));return e.fillMask!==!1?O(o):o}return e.modelValue}function T(o){if(o<c.length)return c.slice(-o);let n="",s=c;const a=s.indexOf(B);if(a!==-1){for(let y=o-s.length;y>0;y--)n+=B;s=s.slice(0,a)+n+s.slice(a)}return s}function I(){if(b.value=e.mask!==void 0&&e.mask.length!==0&&H(),b.value===!1){m=void 0,c="",f="";return}const o=he[e.mask]===void 0?e.mask:he[e.mask],n=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",s=n.replace(pe,"\\$&"),a=[],y=[],h=[];let F=e.reverseFillMask===!0,p="",x="";o.replace(Ge,(A,l,_,Z,U)=>{if(Z!==void 0){const z=oe[Z];h.push(z),x=z.negate,F===!0&&(y.push("(?:"+x+"+)?("+z.pattern+"+)?(?:"+x+"+)?("+z.pattern+"+)?"),F=!1),y.push("(?:"+x+"+)?("+z.pattern+")?")}else if(_!==void 0)p="\\"+(_==="\\"?"":_),h.push(_),a.push("([^"+p+"]+)?"+p+"?");else{const z=l!==void 0?l:U;p=z==="\\"?"\\\\\\\\":z.replace(pe,"\\\\$&"),h.push(z),a.push("([^"+p+"]+)?"+p+"?")}});const r=new RegExp("^"+a.join("")+"("+(p===""?".":"[^"+p+"]")+"+)?"+(p===""?"":"["+p+"]*")+"$"),g=y.length-1,w=y.map((A,l)=>l===0&&e.reverseFillMask===!0?new RegExp("^"+s+"*"+A):l===g?new RegExp("^"+A+"("+(x===""?".":x)+"+)?"+(e.reverseFillMask===!0?"$":s+"*")):new RegExp("^"+A));v=h,m=A=>{const l=r.exec(e.reverseFillMask===!0?A:A.slice(0,h.length+1));l!==null&&(A=l.slice(1).join(""));const _=[],Z=w.length;for(let U=0,z=A;U<Z;U++){const X=w[U].exec(z);if(X===null)break;z=z.slice(X.shift().length),_.push(...X)}return _.length!==0?_.join(""):A},c=h.map(A=>typeof A=="string"?A:B).join(""),f=c.split(B).join(n)}function $(o,n,s){const a=u.value,y=a.selectionEnd,h=a.value.length-y,F=V(o);n===!0&&I();const p=L(F),x=e.fillMask!==!1?O(p):p,r=k.value!==x;a.value!==x&&(a.value=x),r===!0&&(k.value=x),document.activeElement===a&&Q(()=>{if(x===f){const w=e.reverseFillMask===!0?f.length:0;a.setSelectionRange(w,w,"forward");return}if(s==="insertFromPaste"&&e.reverseFillMask!==!0){const w=a.selectionEnd;let A=y-1;for(let l=S;l<=A&&l<w;l++)c[l]!==B&&A++;d.right(a,A);return}if(["deleteContentBackward","deleteContentForward"].indexOf(s)!==-1){const w=e.reverseFillMask===!0?y===0?x.length>p.length?1:0:Math.max(0,x.length-(x===f?0:Math.min(p.length,h)+1))+1:y;a.setSelectionRange(w,w,"forward");return}if(e.reverseFillMask===!0)if(r===!0){const w=Math.max(0,x.length-(x===f?0:Math.min(p.length,h+1)));w===1&&y===1?a.setSelectionRange(w,w,"forward"):d.rightReverse(a,w)}else{const w=x.length-h;a.setSelectionRange(w,w,"backward")}else if(r===!0){const w=Math.max(0,c.indexOf(B),Math.min(p.length,y)-1);d.right(a,w)}else{const w=y-1;d.right(a,w)}});const g=e.unmaskedValue===!0?V(x):x;String(e.modelValue)!==g&&(e.modelValue!==null||g!=="")&&i(g,!0)}function D(o,n,s){const a=L(V(o.value));n=Math.max(0,c.indexOf(B),Math.min(a.length,n)),S=n,o.setSelectionRange(n,s,"forward")}const d={left(o,n){const s=c.slice(n-1).indexOf(B)===-1;let a=Math.max(0,n-1);for(;a>=0;a--)if(c[a]===B){n=a,s===!0&&n++;break}if(a<0&&c[n]!==void 0&&c[n]!==B)return d.right(o,0);n>=0&&o.setSelectionRange(n,n,"backward")},right(o,n){const s=o.value.length;let a=Math.min(s,n+1);for(;a<=s;a++)if(c[a]===B){n=a;break}else c[a-1]===B&&(n=a);if(a>s&&c[n-1]!==void 0&&c[n-1]!==B)return d.left(o,s);o.setSelectionRange(n,n,"forward")},leftReverse(o,n){const s=T(o.value.length);let a=Math.max(0,n-1);for(;a>=0;a--)if(s[a-1]===B){n=a;break}else if(s[a]===B&&(n=a,a===0))break;if(a<0&&s[n]!==void 0&&s[n]!==B)return d.rightReverse(o,0);n>=0&&o.setSelectionRange(n,n,"backward")},rightReverse(o,n){const s=o.value.length,a=T(s),y=a.slice(0,n+1).indexOf(B)===-1;let h=Math.min(s,n+1);for(;h<=s;h++)if(a[h-1]===B){n=h,n>0&&y===!0&&n--;break}if(h>s&&a[n-1]!==void 0&&a[n-1]!==B)return d.leftReverse(o,s);o.setSelectionRange(n,n,"forward")}};function N(o){t("click",o),M=void 0}function K(o){if(t("keydown",o),Ee(o)===!0||o.altKey===!0)return;const n=u.value,s=n.selectionStart,a=n.selectionEnd;if(o.shiftKey||(M=void 0),o.keyCode===37||o.keyCode===39){o.shiftKey&&M===void 0&&(M=n.selectionDirection==="forward"?s:a);const y=d[(o.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(o.preventDefault(),y(n,M===s?a:s),o.shiftKey){const h=n.selectionStart;n.setSelectionRange(Math.min(M,h),Math.max(M,h),"forward")}}else o.keyCode===8&&e.reverseFillMask!==!0&&s===a?(d.left(n,s),n.setSelectionRange(n.selectionStart,a,"backward")):o.keyCode===46&&e.reverseFillMask===!0&&s===a&&(d.rightReverse(n,a),n.setSelectionRange(s,n.selectionEnd,"forward"))}function L(o){if(o==null||o==="")return"";if(e.reverseFillMask===!0)return q(o);const n=v;let s=0,a="";for(let y=0;y<n.length;y++){const h=o[s],F=n[y];if(typeof F=="string")a+=F,h===F&&s++;else if(h!==void 0&&F.regex.test(h))a+=F.transform!==void 0?F.transform(h):h,s++;else return a}return a}function q(o){const n=v,s=c.indexOf(B);let a=o.length-1,y="";for(let h=n.length-1;h>=0&&a!==-1;h--){const F=n[h];let p=o[a];if(typeof F=="string")y=F+y,p===F&&a--;else if(p!==void 0&&F.regex.test(p))do y=(F.transform!==void 0?F.transform(p):p)+y,a--,p=o[a];while(s===h&&p!==void 0&&F.regex.test(p));else return y}return y}function V(o){return typeof o!="string"||m===void 0?typeof o=="number"?m(""+o):o:m(o)}function O(o){return f.length-o.length<=0?o:e.reverseFillMask===!0&&o.length!==0?f.slice(0,-o.length)+o:o+f.slice(o.length)}return{innerValue:k,hasMask:b,moveCursorForPaste:D,updateMaskValue:$,onMaskedKeydown:K,onMaskedClick:N}}function tt(e,t){function i(){const u=e.modelValue;try{const c="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(u)===u&&("length"in u?Array.from(u):[u]).forEach(f=>{c.items.add(f)}),{files:c.files}}catch{return{files:void 0}}}return t===!0?C(()=>{if(e.type==="file")return i()}):C(i)}function lt(e){return function(i){if(i.type==="compositionend"||i.type==="change"){if(i.target.qComposing!==!0)return;i.target.qComposing=!1,e(i)}else i.type==="compositionstart"&&(i.target.qComposing=!0)}}var st=Be({name:"QInput",inheritAttrs:!1,props:{...Qe,...Je,...Pe,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...We,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:i}){const{proxy:u}=Y(),{$q:c}=u,f={};let v=NaN,m,S,M=null,b;const k=j(null),H=Ie(e),{innerValue:E,hasMask:T,moveCursorForPaste:I,updateMaskValue:$,onMaskedKeydown:D,onMaskedClick:d}=et(e,t,p,k),N=tt(e,!0),K=C(()=>ie(E.value)),L=lt(h),q=Ye({changeEvent:!0}),V=C(()=>e.type==="textarea"||e.autogrow===!0),O=C(()=>V.value===!0||["text","search","url","tel","password"].includes(e.type)),o=C(()=>{const l={...q.splitAttrs.listeners.value,onInput:h,onPaste:y,onChange:r,onBlur:g,onFocus:de};return l.onCompositionstart=l.onCompositionupdate=l.onCompositionend=L,T.value===!0&&(l.onKeydown=D,l.onClick=d),e.autogrow===!0&&(l.onAnimationend=F),l}),n=C(()=>{const l={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:H.value,...q.splitAttrs.attributes.value,id:q.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return V.value===!1&&(l.type=e.type),e.autogrow===!0&&(l.rows=1),l});P(()=>e.type,()=>{k.value&&(k.value.value=e.modelValue)}),P(()=>e.modelValue,l=>{if(T.value===!0){if(S===!0&&(S=!1,String(l)===v))return;$(l)}else E.value!==l&&(E.value=l,e.type==="number"&&f.hasOwnProperty("value")===!0&&(m===!0?m=!1:delete f.value));e.autogrow===!0&&Q(x)}),P(()=>e.autogrow,l=>{l===!0?Q(x):k.value!==null&&i.rows>0&&(k.value.style.height="auto")}),P(()=>e.dense,()=>{e.autogrow===!0&&Q(x)});function s(){ye(()=>{const l=document.activeElement;k.value!==null&&k.value!==l&&(l===null||l.id!==q.targetUid.value)&&k.value.focus({preventScroll:!0})})}function a(){k.value!==null&&k.value.select()}function y(l){if(T.value===!0&&e.reverseFillMask!==!0){const _=l.target;I(_,_.selectionStart,_.selectionEnd)}t("paste",l)}function h(l){if(!l||!l.target)return;if(e.type==="file"){t("update:modelValue",l.target.files);return}const _=l.target.value;if(l.target.qComposing===!0){f.value=_;return}if(T.value===!0)$(_,!1,l.inputType);else if(p(_),O.value===!0&&l.target===document.activeElement){const{selectionStart:Z,selectionEnd:U}=l.target;Z!==void 0&&U!==void 0&&Q(()=>{l.target===document.activeElement&&_.indexOf(l.target.value)===0&&l.target.setSelectionRange(Z,U)})}e.autogrow===!0&&x()}function F(l){t("animationend",l),x()}function p(l,_){b=()=>{M=null,e.type!=="number"&&f.hasOwnProperty("value")===!0&&delete f.value,e.modelValue!==l&&v!==l&&(v=l,_===!0&&(S=!0),t("update:modelValue",l),Q(()=>{v===l&&(v=NaN)})),b=void 0},e.type==="number"&&(m=!0,f.value=l),e.debounce!==void 0?(M!==null&&clearTimeout(M),f.value=l,M=setTimeout(b,e.debounce)):b()}function x(){requestAnimationFrame(()=>{const l=k.value;if(l!==null){const _=l.parentNode.style,{scrollTop:Z}=l,{overflowY:U,maxHeight:z}=c.platform.is.firefox===!0?{}:window.getComputedStyle(l),X=U!==void 0&&U!=="scroll";X===!0&&(l.style.overflowY="hidden"),_.marginBottom=l.scrollHeight-1+"px",l.style.height="1px",l.style.height=l.scrollHeight+"px",X===!0&&(l.style.overflowY=parseInt(z,10)<l.scrollHeight?"auto":"hidden"),_.marginBottom="",l.scrollTop=Z}})}function r(l){L(l),M!==null&&(clearTimeout(M),M=null),b!==void 0&&b(),t("change",l.target.value)}function g(l){l!==void 0&&de(l),M!==null&&(clearTimeout(M),M=null),b!==void 0&&b(),m=!1,S=!1,delete f.value,e.type!=="file"&&setTimeout(()=>{k.value!==null&&(k.value.value=E.value!==void 0?E.value:"")})}function w(){return f.hasOwnProperty("value")===!0?f.value:E.value!==void 0?E.value:""}ae(()=>{g()}),ee(()=>{e.autogrow===!0&&x()}),Object.assign(q,{innerValue:E,fieldClass:C(()=>`q-${V.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:C(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:k,emitValue:p,hasValue:K,floatingLabel:C(()=>K.value===!0&&(e.type!=="number"||isNaN(E.value)===!1)||ie(e.displayValue)),getControl:()=>R(V.value===!0?"textarea":"input",{ref:k,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...n.value,...o.value,...e.type!=="file"?{value:w()}:N.value}),getShadowControl:()=>R("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(V.value===!0?"":" text-no-wrap")},[R("span",{class:"invisible"},w()),R("span",e.shadowText)])});const A=Xe(q);return Object.assign(u,{focus:s,select:a,getNativeElement:()=>k.value}),be(u,"nativeEl",()=>k.value),A}});const dt={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ft=["beforeShow","show","beforeHide","hide"];function ct({showing:e,canShow:t,hideOnRouteChange:i,handleShow:u,handleHide:c,processOnMount:f}){const v=Y(),{props:m,emit:S,proxy:M}=v;let b;function k(d){e.value===!0?T(d):H(d)}function H(d){if(m.disable===!0||d!==void 0&&d.qAnchorHandled===!0||t!==void 0&&t(d)!==!0)return;const N=m["onUpdate:modelValue"]!==void 0;N===!0&&(S("update:modelValue",!0),b=d,Q(()=>{b===d&&(b=void 0)})),(m.modelValue===null||N===!1)&&E(d)}function E(d){e.value!==!0&&(e.value=!0,S("beforeShow",d),u!==void 0?u(d):S("show",d))}function T(d){if(m.disable===!0)return;const N=m["onUpdate:modelValue"]!==void 0;N===!0&&(S("update:modelValue",!1),b=d,Q(()=>{b===d&&(b=void 0)})),(m.modelValue===null||N===!1)&&I(d)}function I(d){e.value!==!1&&(e.value=!1,S("beforeHide",d),c!==void 0?c(d):S("hide",d))}function $(d){m.disable===!0&&d===!0?m["onUpdate:modelValue"]!==void 0&&S("update:modelValue",!1):d===!0!==e.value&&(d===!0?E:I)(b)}P(()=>m.modelValue,$),i!==void 0&&Te(v)===!0&&P(()=>M.$route.fullPath,()=>{i.value===!0&&e.value===!0&&T()}),f===!0&&ee(()=>{$(m.modelValue)});const D={show:H,hide:T,toggle:k};return Object.assign(M,D),D}export{st as Q,ut as a,ft as b,ct as c,ye as d,De as e,it as r,dt as u};
