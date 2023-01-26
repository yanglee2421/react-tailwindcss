import{a9 as l}from"./index-d971bd58.js";var c=`accept acceptCharset accessKey action allowFullScreen allowTransparency
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
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,p="".concat(c," ").concat(u).split(/[\s\n]+/),h="aria-",m="data-";function d(a,e){return a.indexOf(e)===0}function v(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n;e===!1?n={aria:!0,data:!0,attr:!0}:e===!0?n={aria:!0}:n=l({},e);var o={};return Object.keys(a).forEach(function(t){(n.aria&&(t==="role"||d(t,h))||n.data&&d(t,m)||n.attr&&p.includes(t))&&(o[t]=a[t])}),o}var i;function g(a){if(typeof document>"u")return 0;if(a||i===void 0){var e=document.createElement("div");e.style.width="100%",e.style.height="200px";var n=document.createElement("div"),o=n.style;o.position="absolute",o.top="0",o.left="0",o.pointerEvents="none",o.visibility="hidden",o.width="200px",o.height="150px",o.overflow="hidden",n.appendChild(e),document.body.appendChild(n);var t=e.offsetWidth;n.style.overflow="scroll";var r=e.offsetWidth;t===r&&(r=n.clientWidth),document.body.removeChild(n),i=t-r}return i}function s(a){var e=a.match(/^(.*)px$/),n=Number(e==null?void 0:e[1]);return Number.isNaN(n)?g():n}function y(a){if(typeof document>"u"||!a||!(a instanceof Element))return{width:0,height:0};var e=getComputedStyle(a,"::-webkit-scrollbar"),n=e.width,o=e.height;return{width:s(n),height:s(o)}}export{y as a,g,v as p};
