import{r as f,R as _}from"./jsx-runtime-96806aeb.js";import{g as G,j as J}from"./index-dcd7ef69.js";var V=f.createContext({});const R=V;function b(n,e,r){return e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function A(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(o){return Object.getOwnPropertyDescriptor(n,o).enumerable})),r.push.apply(r,t)}return r}function s(n){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?A(Object(r),!0).forEach(function(t){b(n,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(r,t))})}return n}function X(n){if(Array.isArray(n))return n}function Z(n,e){var r=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(r!=null){var t=[],o=!0,a=!1,i,c;try{for(r=r.call(n);!(o=(i=r.next()).done)&&(t.push(i.value),!(e&&t.length===e));o=!0);}catch(l){a=!0,c=l}finally{try{!o&&r.return!=null&&r.return()}finally{if(a)throw c}}return t}}function N(n,e){(e==null||e>n.length)&&(e=n.length);for(var r=0,t=new Array(e);r<e;r++)t[r]=n[r];return t}function nn(n,e){if(!!n){if(typeof n=="string")return N(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);if(r==="Object"&&n.constructor&&(r=n.constructor.name),r==="Map"||r==="Set")return Array.from(n);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return N(n,e)}}function en(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function z(n,e){return X(n)||Z(n,e)||nn(n,e)||en()}function rn(n,e){if(n==null)return{};var r={},t=Object.keys(n),o,a;for(a=0;a<t.length;a++)o=t[a],!(e.indexOf(o)>=0)&&(r[o]=n[o]);return r}function D(n,e){if(n==null)return{};var r=rn(n,e),t,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(o=0;o<a.length;o++)t=a[o],!(e.indexOf(t)>=0)&&(!Object.prototype.propertyIsEnumerable.call(n,t)||(r[t]=n[t]))}return r}function y(n){return y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(n)}var I={};function tn(n,e){}function on(n,e,r){!e&&!I[r]&&(n(!1,r),I[r]=!0)}function an(n,e){on(tn,n,e)}function cn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function ln(n,e){if(!n)return!1;if(n.contains)return n.contains(e);for(var r=e;r;){if(r===n)return!0;r=r.parentNode}return!1}var E="data-rc-order",un="rc-util-key",h=new Map;function L(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.mark;return e?e.startsWith("data-")?e:"data-".concat(e):un}function T(n){if(n.attachTo)return n.attachTo;var e=document.querySelector("head");return e||document.body}function sn(n){return n==="queue"?"prependQueue":n?"prepend":"append"}function M(n){return Array.from((h.get(n)||n).children).filter(function(e){return e.tagName==="STYLE"})}function B(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!cn())return null;var r=e.csp,t=e.prepend,o=document.createElement("style");o.setAttribute(E,sn(t)),r!=null&&r.nonce&&(o.nonce=r==null?void 0:r.nonce),o.innerHTML=n;var a=T(e),i=a.firstChild;if(t){if(t==="queue"){var c=M(a).filter(function(l){return["prepend","prependQueue"].includes(l.getAttribute(E))});if(c.length)return a.insertBefore(o,c[c.length-1].nextSibling),o}a.insertBefore(o,i)}else a.appendChild(o);return o}function fn(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=T(e);return M(r).find(function(t){return t.getAttribute(L(e))===n})}function dn(n,e){var r=h.get(n);if(!r||!ln(document,r)){var t=B("",e),o=t.parentNode;h.set(n,o),n.removeChild(t)}}function mn(n,e){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},t=T(r);dn(t,r);var o=fn(e,r);if(o){var a,i;if(((a=r.csp)===null||a===void 0?void 0:a.nonce)&&o.nonce!==((i=r.csp)===null||i===void 0?void 0:i.nonce)){var c;o.nonce=(c=r.csp)===null||c===void 0?void 0:c.nonce}return o.innerHTML!==n&&(o.innerHTML=n),o}var l=B(n,r);return l.setAttribute(L(r),e),l}function yn(n,e){an(n,"[@ant-design/icons] ".concat(e))}function j(n){return y(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(y(n.icon)==="object"||typeof n.icon=="function")}function P(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,r){var t=n[r];switch(r){case"class":e.className=t,delete e.class;break;default:e[r]=t}return e},{})}function w(n,e,r){return r?_.createElement(n.tag,s(s({key:e},P(n.attrs)),r),(n.children||[]).map(function(t,o){return w(t,"".concat(e,"-").concat(n.tag,"-").concat(o))})):_.createElement(n.tag,s({key:e},P(n.attrs)),(n.children||[]).map(function(t,o){return w(t,"".concat(e,"-").concat(n.tag,"-").concat(o))}))}function H(n){return G(n)[0]}function W(n){return n?Array.isArray(n)?n:[n]:[]}var gn=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,vn=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:gn,r=f.useContext(R),t=r.csp,o=r.prefixCls,a=e;o&&(a=a.replace(/anticon/g,o)),f.useEffect(function(){mn(a,"@ant-design-icons",{prepend:!0,csp:t})},[])},pn=["icon","className","onClick","style","primaryColor","secondaryColor"],m={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Cn(n){var e=n.primaryColor,r=n.secondaryColor;m.primaryColor=e,m.secondaryColor=r||H(e),m.calculated=!!r}function bn(){return s({},m)}var g=function(e){var r=e.icon,t=e.className,o=e.onClick,a=e.style,i=e.primaryColor,c=e.secondaryColor,l=D(e,pn),d=m;if(i&&(d={primaryColor:i,secondaryColor:c||H(i)}),vn(),yn(j(r),"icon should be icon definiton, but got ".concat(r)),!j(r))return null;var u=r;return u&&typeof u.icon=="function"&&(u=s(s({},u),{},{icon:u.icon(d.primaryColor,d.secondaryColor)})),w(u.icon,"svg-".concat(u.name),s({className:t,onClick:o,style:a,"data-icon":u.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},l))};g.displayName="IconReact";g.getTwoToneColors=bn;g.setTwoToneColors=Cn;const O=g;function q(n){var e=W(n),r=z(e,2),t=r[0],o=r[1];return O.setTwoToneColors({primaryColor:t,secondaryColor:o})}function hn(){var n=O.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var wn=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];q("#1890ff");var v=f.forwardRef(function(n,e){var r,t=n.className,o=n.icon,a=n.spin,i=n.rotate,c=n.tabIndex,l=n.onClick,d=n.twoToneColor,u=D(n,wn),x=f.useContext(R),S=x.prefixCls,p=S===void 0?"anticon":S,K=x.rootClassName,Q=J(K,p,(r={},b(r,"".concat(p,"-").concat(o.name),!!o.name),b(r,"".concat(p,"-spin"),!!a||o.name==="loading"),r),t),C=c;C===void 0&&l&&(C=-1);var U=i?{msTransform:"rotate(".concat(i,"deg)"),transform:"rotate(".concat(i,"deg)")}:void 0,Y=W(d),k=z(Y,2),$=k[0],F=k[1];return f.createElement("span",s(s({role:"img","aria-label":o.name},u),{},{ref:e,tabIndex:C,onClick:l,className:Q}),f.createElement(O,{icon:o,primaryColor:$,secondaryColor:F,style:U}))});v.displayName="AntdIcon";v.getTwoToneColor=hn;v.setTwoToneColor=q;const xn=v;export{xn as A,s as _};
