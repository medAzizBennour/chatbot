"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=require("react"),e=require("@liquify/utils"),o=require("styled-components");function r(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}function t(n){if(n&&n.__esModule)return n;var e=Object.create(null);return n&&Object.keys(n).forEach((function(o){if("default"!==o){var r=Object.getOwnPropertyDescriptor(n,o);Object.defineProperty(e,o,r.get?r:{enumerable:!0,get:function(){return n[o]}})}})),e.default=n,Object.freeze(e)}var c=t(n),a=r(n),l=r(o),i=function(){return i=Object.assign||function(n){for(var e,o=1,r=arguments.length;o<r;o++)for(var t in e=arguments[o])Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n},i.apply(this,arguments)};function u(n,e){return Object.defineProperty?Object.defineProperty(n,"raw",{value:e}):n.raw=e,n}var d,s,b,f,p,h,g=l.default.button(d||(d=u(["\n  text-transform: uppercase;\n  height: ","px;\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  justify-content: center;\n  margin: 0;\n  padding: 5px 16px;\n  vertical-align: middle;\n  text-align: left;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  & > svg {\n    width: ","px;\n    height: ","px;\n  }\n  & > * {\n    flex-grow: 0;\n    flex-shrink: 0;\n  }\n  &:before,\n  & > * {\n    margin-right: 7px;\n  }\n\n  &:empty:before,\n  & > :last-child {\n    margin-right: 0;\n  }\n  &:disabled {\n    transition: none;\n    cursor: not-allowed;\n    * {\n      pointer-events: none;\n    }\n  }\n"],["\n  text-transform: uppercase;\n  height: ","px;\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  justify-content: center;\n  margin: 0;\n  padding: 5px 16px;\n  vertical-align: middle;\n  text-align: left;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  & > svg {\n    width: ","px;\n    height: ","px;\n  }\n  & > * {\n    flex-grow: 0;\n    flex-shrink: 0;\n  }\n  &:before,\n  & > * {\n    margin-right: 7px;\n  }\n\n  &:empty:before,\n  & > :last-child {\n    margin-right: 0;\n  }\n  &:disabled {\n    transition: none;\n    cursor: not-allowed;\n    * {\n      pointer-events: none;\n    }\n  }\n"])),(function(n){return n.size?n.size:36}),(function(n){return n.size?n.size-20:20}),(function(n){return n.size?n.size-20:20})),m=l.default(g)(s||(s=u(["\n  ","\n  background-color: ",";\n  color: ",";\n\n  &:hover:enabled,\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n  }\n"],["\n  ","\n  background-color: ",";\n  color: ",";\n\n  &:hover:enabled,\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n  }\n"])),(function(n){return n.theme.font.primaryCTA}),(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.super}),(function(n){return n.theme.colors.robin}),(function(n){return n.theme.colors.shadow}),(function(n){return n.theme.colors.drax})),x=l.default(g)(b||(b=u(["\n  ","\n  background-color: ",";\n  color: ",";\n  &:hover:enabled {\n    background-color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n  }\n"],["\n  ","\n  background-color: ",";\n  color: ",";\n  &:hover:enabled {\n    background-color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n  }\n"])),(function(n){return n.theme.font.secondaryCTA}),"none",(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.nova}),(function(n){return n.theme.colors.nova}),"none",(function(n){return n.theme.colors.drax})),y=l.default(g)(f||(f=u(["\n  ","\n  background-color: ",";\n  color: ",";\n  border: 1px solid ",";\n\n  &:hover:enabled {\n    background-color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n    border: 1px solid ",";\n  }\n"],["\n  ","\n  background-color: ",";\n  color: ",";\n  border: 1px solid ",";\n\n  &:hover:enabled {\n    background-color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    background-color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n    border: 1px solid ",";\n  }\n"])),(function(n){return n.theme.font.secondaryCTA}),(function(n){return n.theme.colors.super}),(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.nova}),(function(n){return n.theme.colors.nova}),"none",(function(n){return n.theme.colors.drax}),(function(n){return n.theme.colors.drax})),v=l.default(g)(p||(p=u(["\n  ","\n  background-color: ",";\n  color: ",";\n"],["\n  ","\n  background-color: ",";\n  color: ",";\n"])),(function(n){return n.theme.font.primaryCTA}),(function(n){return n.theme.colors.hulk}),(function(n){return n.theme.colors.super})),k=l.default.span(h||(h=u(["\n  align-self: center;\n"],["\n  align-self: center;\n"])));function z(n){var e,o=n.icon,r=n.label,t=n.size,a=n.disabled,l=n.type,u=function(n,e){var o={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(o[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var t=0;for(r=Object.getOwnPropertySymbols(n);t<r.length;t++)e.indexOf(r[t])<0&&Object.prototype.propertyIsEnumerable.call(n,r[t])&&(o[r[t]]=n[r[t]])}return o}(n,["icon","label","size","disabled","type"]);switch(l){case"success":e=v;break;case"tertiary":e=y;break;case"secondary":e=x;break;default:e=m}return c.createElement(e,i({size:t,disabled:a,onClick:function(e){var o=n.onClick;o&&o(e)}},u),o,c.createElement(k,{size:t},r))}z.defaultProps={type:"primary",size:36,disabled:!1},z.displayName="".concat(e.DISPLAYNAME_PREFIX,".IconLabelButton");var w=function(n){var e=n.type,o=n.label,r=n.size,t=n.disabled,a=n.tabIndex,l=n.autoFocus,i=n.onClick;return c.createElement(z,{size:r,disabled:t,onClick:i,tabIndex:a,autoFocus:l,label:o,type:e})};w.defaultProps={type:"primary",size:36,disabled:!1,autoFocus:!1},w.displayName="".concat(e.DISPLAYNAME_PREFIX,".LabelButton");var j,O,P,I=l.default.button(j||(j=u(["\n  background-color: ",";\n  color: ",";\n  text-transform: uppercase;\n  height: ","px;\n  width: ","px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &:hover:enabled {\n    background-color: ",";\n    color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    border: 1px solid ",";\n    color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n    transition: none;\n    cursor: not-allowed;\n  }\n"],["\n  background-color: ",";\n  color: ",";\n  text-transform: uppercase;\n  height: ","px;\n  width: ","px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  &:hover:enabled {\n    background-color: ",";\n    color: ",";\n  }\n\n  &:focus:enabled,\n  &:active:enabled {\n    border: 1px solid ",";\n    color: ",";\n  }\n\n  &:disabled {\n    background-color: ",";\n    color: ",";\n    transition: none;\n    cursor: not-allowed;\n  }\n"])),"none",(function(n){return n.theme.colors.iron}),(function(n){return n.size?n.size:36}),(function(n){return n.size?n.size:36}),(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.super}),(function(n){return n.theme.colors.bat}),(function(n){return n.theme.colors.bat}),"none",(function(n){return n.theme.colors.drax})),E=l.default.div(O||(O=u(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"],["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),A=l.default.span(P||(P=u(["\n  & svg {\n    width: ","px;\n    height: ","px;\n  }\n"],["\n  & svg {\n    width: ","px;\n    height: ","px;\n  }\n"])),(function(n){return n.size}),(function(n){return n.size}));function C(n){var e=n.icon,o=n.size,r=n.disabled,t=n.tabIndex,c=n.autoFocus,l=n.iconSize,i=a.default.createRef();return a.default.createElement(I,{size:o,disabled:r,onClick:function(e){var o=n.onClick;o&&(o(e),i.current.blur())},tabIndex:t,autoFocus:c,onMouseDown:function(e){var o=n.onMouseDown;o&&o(e)},ref:i},a.default.createElement(E,null,a.default.createElement(A,{size:l?Math.min(l,o||36):o?o/1.5:24,disabled:r},e)))}C.defaultProps={size:36,disabled:!1},C.displayName="".concat(e.DISPLAYNAME_PREFIX,".StandaloneIconButton"),exports.IconLabelButton=z,exports.LabelButton=w,exports.StandaloneIconButton=C;
