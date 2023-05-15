import t,{useContext as n}from"react";import e,{ThemeContext as o}from"styled-components";import{DISPLAYNAME_PREFIX as r}from"@liquify/utils";import a from"@material-ui/core/Tooltip";
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
***************************************************************************** */function i(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t}var p,l,m,c,d,x=e((function(n){var e=n.children,o=n.className,r=n.title,i=n.placement;return t.createElement(a,{classes:{popper:o,tooltip:"tooltip"},placement:i,title:r},e)}))(p||(p=i(["\n  .tooltip {\n    ",";\n    background-color: ",";\n    box-shadow: 0px 4px 8px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n    max-width: ",";\n    margin: 2px;\n    padding-top: 16px;\n    padding-bottom: 16px;\n    padding-left: 16px;\n    padding-right: 16px;\n    color: ",";\n  }\n\n  & .MuiTooltip-arrow {\n    color: ",";\n  }\n"],["\n  .tooltip {\n    ",";\n    background-color: ",";\n    box-shadow: 0px 4px 8px rgba(176, 190, 197, 0.48), 0px 4px 4px rgba(176, 190, 197, 0.24);\n    border-radius: 5px;\n    max-width: ",";\n    margin: 2px;\n    padding-top: 16px;\n    padding-bottom: 16px;\n    padding-left: 16px;\n    padding-right: 16px;\n    color: ",";\n  }\n\n  & .MuiTooltip-arrow {\n    color: ",";\n  }\n"])),(function(t){return t.theme.font.body}),(function(t){return t.theme.colors.super}),(function(t){return t.maxWidth?t.maxWidth:"360px"}),(function(t){return t.textColor}),(function(t){return t.theme.colors.super})),u=e.div(l||(l=i(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  margin-left: 0px;\n  margin-right: 0px;\n  background: ",";\n"],["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  margin-left: 0px;\n  margin-right: 0px;\n  background: ",";\n"])),(function(t){return t.theme.colors.super})),s=e.span(m||(m=i(["\n  ",";\n"],["\n  ",";\n"])),(function(t){return t.theme.font.subTitle})),g=e.span(c||(c=i(["\n  height: ",";\n"],["\n  height: ",";\n"])),(function(t){return t.hasTitle&&t.hasContent?"16px":"0px"})),h=e.span(d||(d=i(["\n  ",";\n"],["\n  ",";\n"])),(function(t){return t.theme.font.supportingText}));function f(e){var r=e.className,a=e.children,i=e.title,p=e.content,l=e.placement,m=e.maxWidth,c=n(o),d=e.textColor?e.textColor:c.colors.dead,f=t.createElement(t.Fragment,null,t.createElement(u,null,t.createElement(s,{"data-testid":"title"},i),t.createElement(g,{"data-testid":"spacer",hasTitle:!!i,hasContent:!!p}),t.createElement(h,{"data-testid":"content"},p)));return t.createElement(x,{"data-testid":"tooltip",className:r,title:f,placement:l||"bottom-start",textColor:d,maxWidth:m},a)}f.defaultProps={placement:"bottom-start"},f.displayName=r+".Tooltip";export{f as Tooltip};