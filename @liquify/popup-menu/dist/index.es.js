import n from"react";import{DISPLAYNAME_PREFIX as r}from"@liquify/utils";import t from"@material-ui/core/Menu";import o from"@material-ui/core/MenuItem";import i from"styled-components";
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
***************************************************************************** */function e(n,r){return Object.defineProperty?Object.defineProperty(n,"raw",{value:r}):n.raw=r,n}var a,p,u=i(t)(a||(a=e(["\n  &.MuiMenu-paper {\n    ","\n    background: ",";\n    padding-top: 8px;\n    padding-bottom: 8px;\n    box-shadow: 0px 16px 24px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n  }\n"],["\n  &.MuiMenu-paper {\n    ","\n    background: ",";\n    padding-top: 8px;\n    padding-bottom: 8px;\n    box-shadow: 0px 16px 24px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n  }\n"])),(function(n){return n.theme.font.body}),(function(n){return n.theme.colors.super})),d=i(o)(p||(p=e(["\n  &.MuiMenuItem-root {\n    ","\n    line-height: 28px;\n    padding-left: 16px;\n    padding-right: 32px;\n    min-height: auto;\n    width: ",";\n  }\n"],["\n  &.MuiMenuItem-root {\n    ","\n    line-height: 28px;\n    padding-left: 16px;\n    padding-right: 32px;\n    min-height: auto;\n    width: ",";\n  }\n"])),(function(n){return n.theme.font.body}),(function(n){return n.width?n.width:"auto"}));function l(r){var t=r.menuList,o=r.anchorEl,i=r.onClose,e=r.isOpen,a=r.anchorOriginVertical,p=r.anchorOriginHorizontal,l=r.transformOriginVertical,c=r.transformOriginHorizontal,h=r.contentAnchorEl,m=r.width,f=function(){i&&i()};return n.createElement(u,{anchorEl:o,keepMounted:!0,open:e,onClose:f,getContentAnchorEl:h,anchorOrigin:{vertical:a||"top",horizontal:p||"left"},transformOrigin:{vertical:l||"top",horizontal:c||"left"}},t.map((function(r,t){return n.createElement(d,{key:t,onClick:function(){return n=r.handler,f(),void(n&&n());var n},disabled:r.disabled,width:m},r.text)})))}l.defaultProps={anchorEl:null,isOpen:!1,anchorOriginVertical:"top",anchorOriginHorizontal:"left",transformOriginVertical:"top",transformOriginHorizontal:"left"},l.displayName="".concat(r,".PopupMenu");export{l as PopupMenu};
