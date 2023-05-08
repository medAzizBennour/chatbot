import*as n from"react";import{Shape as e,Size as t,Intent as i,DISPLAYNAME_PREFIX as r}from"@liquify/utils";import a,{css as o,keyframes as s}from"styled-components";import{GrayScale as l}from"@liquify/theme";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var p=function(){return p=Object.assign||function(n){for(var e,t=1,i=arguments.length;t<i;t++)for(var r in e=arguments[t])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},p.apply(this,arguments)};function c(n,e){return Object.defineProperty?Object.defineProperty(n,"raw",{value:e}):n.raw=e,n}var u,f,d,h=o(f||(f=c(["\n  animation: "," 1.5s infinite cubic-bezier(0.66, 0, 0, 1);\n"],["\n  animation: "," 1.5s infinite cubic-bezier(0.66, 0, 0, 1);\n"])),s(u||(u=c(["\n    to {box-shadow: 0 0 0 6px rgba(232, 76, 61, 0);}}\n"],["\n    to {box-shadow: 0 0 0 6px rgba(232, 76, 61, 0);}}\n"])))),b=a.span(d||(d=c(["\n  ","\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: ",";\n  position: relative;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 1;\n  min-width: 1px;\n  padding: 2px 8px;\n  text-align: center;\n  ","\n  ","\n  ","\n"],["\n  ","\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: ",";\n  position: relative;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 1;\n  min-width: 1px;\n  padding: 2px 8px;\n  text-align: center;\n  ","\n  ","\n  ","\n"])),(function(n){return function(n){var e=n.theme.brand.primary.lightest,t=n.theme.brand.primary.dark;if(n.bgcolor)e=n.bgcolor,t=n.textcolor;else if(n.intent)if("default"===n.intent)e=l.LIGHT_GRAY3,t=l.GRAY1;else{var i=n.theme.brand[n.intent];e="minimal"===n.variant?i.lightest:i.base,t="minimal"===n.variant?i.dark:l.WHITE}return"\n    background: "+e+";\n    color: "+t+";\n  "}(n)}),(function(n){return n.shape?function(n){switch(n){case e.ROUNDED:return"2px";case e.RECTANGLE:return"0px";case e.PILL:return"10px";case e.CIRCLE:return"100px"}}(n.shape):null}),(function(n){return n.notify?h:""}),(function(n){return n.isSquare?function(n){var e,i,r,a;switch(n){case t.SMALL:e=16,i=11,r=2,a=500;break;case t.MEDIUM:e=20,i=13,r=4,a=500;break;case t.LARGE:e=28,i=16,r=5,a=500;break;default:e=20,i=13,r=4,a=500}return"\n    width:"+e+"px;\n    height:"+e+"px;\n    font-size:"+i+"px;\n    font-weight:"+a+";\n    border-radius: "+r+"px;\n    padding: 0;\n    line-height: unset;\n    "}(n.size):""}),(function(n){return n.isDot?"width:5px;height:5px;":""}));function x(e){var t=e.textcolor,i=e.bgcolor,r=e.notify,a=e.intent,o=e.value,s=e.isSquare,l=e.size,c=e.isDot,u=e.shape,f=e.variant,d=void 0===f?"minimal":f,h=function(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]])}return t}(e,["textcolor","bgcolor","notify","intent","value","isSquare","size","isDot","shape","variant"]);return void 0===o||""===o?null:n.createElement(b,p({bgcolor:i,textcolor:t,notify:r,intent:a,isSquare:s,size:l,isDot:c,shape:u,variant:d,"data-testid":"BadgeWrapper"},h),c?null:function(n){var e=n.max,t=void 0===e?0:e,i=n.value,r=void 0===i?0:i;return""+(t&&t<r?t+"+":r)}(e))}x.defaultProps={intent:i.PRIMARY,max:99,value:void 0,shape:e.PILL},x.displayName=r+".Badge";export{x as Badge,b as Wrapper};
