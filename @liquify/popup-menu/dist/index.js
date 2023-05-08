"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=require("react"),e=require("@liquify/utils"),t=require("@material-ui/core/Menu"),r=require("@material-ui/core/MenuItem"),i=require("styled-components");function o(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var a=o(n),u=o(t),p=o(r),d=o(i);
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
***************************************************************************** */
function l(n,e){return Object.defineProperty?Object.defineProperty(n,"raw",{value:e}):n.raw=e,n}var c,f,h=d.default(u.default)(c||(c=l(["\n  &.MuiMenu-paper {\n    ","\n    background: ",";\n    padding-top: 8px;\n    padding-bottom: 8px;\n    box-shadow: 0px 16px 24px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n  }\n"],["\n  &.MuiMenu-paper {\n    ","\n    background: ",";\n    padding-top: 8px;\n    padding-bottom: 8px;\n    box-shadow: 0px 16px 24px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n  }\n"])),(function(n){return n.theme.font.body}),(function(n){return n.theme.colors.super})),g=d.default(p.default)(f||(f=l(["\n  &.MuiMenuItem-root {\n    ","\n    line-height: 28px;\n    padding-left: 16px;\n    padding-right: 32px;\n    min-height: auto;\n    width: ",";\n  }\n"],["\n  &.MuiMenuItem-root {\n    ","\n    line-height: 28px;\n    padding-left: 16px;\n    padding-right: 32px;\n    min-height: auto;\n    width: ",";\n  }\n"])),(function(n){return n.theme.font.body}),(function(n){return n.width?n.width:"auto"}));function x(n){var e=n.menuList,t=n.anchorEl,r=n.onClose,i=n.isOpen,o=n.anchorOriginVertical,u=n.anchorOriginHorizontal,p=n.transformOriginVertical,d=n.transformOriginHorizontal,l=n.contentAnchorEl,c=n.width,f=function(){r&&r()};return a.default.createElement(h,{anchorEl:t,keepMounted:!0,open:i,onClose:f,getContentAnchorEl:l,anchorOrigin:{vertical:o||"top",horizontal:u||"left"},transformOrigin:{vertical:p||"top",horizontal:d||"left"}},e.map((function(n,e){return a.default.createElement(g,{key:e,onClick:function(){return e=n.handler,f(),void(e&&e());var e},disabled:n.disabled,width:c},n.text)})))}x.defaultProps={anchorEl:null,isOpen:!1,anchorOriginVertical:"top",anchorOriginHorizontal:"left",transformOriginVertical:"top",transformOriginHorizontal:"left"},x.displayName="".concat(e.DISPLAYNAME_PREFIX,".PopupMenu"),exports.PopupMenu=x;
