import{z as i}from"./useMergedState-f9769ca5.js";var l=`accept acceptCharset accessKey action allowFullScreen allowTransparency
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
    summary tabIndex target title type useMap value width wmode wrap`,c=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,d="".concat(l," ").concat(c).split(/[\s\n]+/),s="aria-",u="data-";function r(o,n){return o.indexOf(n)===0}function p(o){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,e;n===!1?e={aria:!0,data:!0,attr:!0}:n===!0?e={aria:!0}:e=i({},n);var a={};return Object.keys(o).forEach(function(t){(e.aria&&(t==="role"||r(t,s))||e.data&&r(t,u)||e.attr&&d.includes(t))&&(a[t]=o[t])}),a}function g(){var o=document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight;return{width:o,height:n}}function h(o){var n=o.getBoundingClientRect(),e=document.documentElement;return{left:n.left+(window.pageXOffset||e.scrollLeft)-(e.clientLeft||document.body.clientLeft||0),top:n.top+(window.pageYOffset||e.scrollTop)-(e.clientTop||document.body.clientTop||0)}}export{h as a,g,p};
