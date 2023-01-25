import{I as c}from"./index-dcd7ef69.js";var s=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,u=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,m="".concat(s," ").concat(u).split(/[\s\n]+/),h="aria-",p="data-";function d(o,e){return o.indexOf(e)===0}function v(o){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n;e===!1?n={aria:!0,data:!0,attr:!0}:e===!0?n={aria:!0}:n=c({},e);var t={};return Object.keys(o).forEach(function(a){(n.aria&&(a==="role"||d(a,h))||n.data&&d(a,p)||n.attr&&m.includes(a))&&(t[a]=o[a])}),t}var i;function g(o){if(typeof document>"u")return 0;if(o||i===void 0){var e=document.createElement("div");e.style.width="100%",e.style.height="200px";var n=document.createElement("div"),t=n.style;t.position="absolute",t.top="0",t.left="0",t.pointerEvents="none",t.visibility="hidden",t.width="200px",t.height="150px",t.overflow="hidden",n.appendChild(e),document.body.appendChild(n);var a=e.offsetWidth;n.style.overflow="scroll";var r=e.offsetWidth;a===r&&(r=n.clientWidth),document.body.removeChild(n),i=a-r}return i}function l(o){var e=o.match(/^(.*)px$/),n=Number(e==null?void 0:e[1]);return Number.isNaN(n)?g():n}function y(o){if(typeof document>"u"||!o||!(o instanceof Element))return{width:0,height:0};var e=getComputedStyle(o,"::-webkit-scrollbar"),n=e.width,t=e.height;return{width:l(n),height:l(t)}}function w(){var o=document.documentElement.clientWidth,e=window.innerHeight||document.documentElement.clientHeight;return{width:o,height:e}}function C(o){var e=o.getBoundingClientRect(),n=document.documentElement;return{left:e.left+(window.pageXOffset||n.scrollLeft)-(n.clientLeft||document.body.clientLeft||0),top:e.top+(window.pageYOffset||n.scrollTop)-(n.clientTop||document.body.clientTop||0)}}export{w as a,C as b,y as c,g,v as p};
