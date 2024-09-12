"use strict";(self.webpackChunkforokiwi=self.webpackChunkforokiwi||[]).push([[371],{4771:(e,n,i)=>{i.d(n,{o:()=>m});var t=i(2691),o=i(9900),d=i(7170),l=i(7419),r=i(8860),A=i(1645),a=i(903),s=i(481),c=i(7021),g=i(1690),h=i(5043),u=i(9092),E=i(8494),v=i(5215),Q=i(4723),j=i(2595),p=i(6971),x=i(579);const{Link:B,Text:y}=o.A,m=e=>{let{text:n,dTag:i,loadingAuthors:o}=e;const{token:{colorBgLayout:m,colorTextSecondary:f,colorBgContainerDisabled:b}}=d.A.useToken(),{authors:k,comments:C}=(0,h.useContext)(g.gH),{t:S}=(0,u.B)(),I=(0,p.Zp)(),w={a:e=>/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(e.href)?(0,x.jsx)(l.A,{justify:"center",children:(0,x.jsx)(r.A,{src:e.href,fallback:"data:image/png;base64,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"})}):(0,x.jsx)(B,{target:"_blank",href:e.href,children:e.children}),img:e=>(0,x.jsx)(l.A,{justify:"center",children:(0,x.jsx)(r.A,{src:e.src,fallback:"data:image/png;base64,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"})}),code:e=>(0,x.jsxs)(A.A,{span:24,children:[(0,x.jsx)(l.A,{style:{backgroundColor:b},justify:"center",children:(0,x.jsx)(A.A,{span:23,children:(0,x.jsx)(y,{children:S("components.markDown.code")})})}),(0,x.jsx)(l.A,{justify:"center",children:(0,x.jsx)(a.A,{style:{background:m,padding:25,marginBottom:10,overflowX:"auto",width:300},children:e.children})})]})},N=e=>{let n;if(i){var o,d;const l=null===(o=(0,t.uL)(e))||void 0===o||null===(d=o["#e"])||void 0===d?void 0:d[0];n=C[i].find((e=>e.id===l))}return(0,x.jsx)(a.A,{style:{background:m,padding:25,marginBottom:10,borderLeftColor:f,borderLeftWidth:5,borderLeftStyle:"solid"},children:(0,x.jsx)(l.A,{children:(0,x.jsx)(A.A,{children:(0,x.jsx)(s.A,{active:!0,loading:!n,children:n})})})})},J=(e,n)=>{if("npub"===e||"nprofile"===e)return(e=>{var n,i,d;const l=new t.VT({npub:e}),r=null!==(n=null===k||void 0===k?void 0:k[l.pubkey])&&void 0!==n?n:null===l||void 0===l?void 0:l.profile,A=null!==(i=null!==(d=null===r||void 0===r?void 0:r.displayName)&&void 0!==d?d:null===r||void 0===r?void 0:r.name)&&void 0!==i?i:S("shared.events.anonymous");return o?(0,x.jsx)(s.A.Input,{size:"small",active:!0}):(0,x.jsx)(B,{strong:!0,href:`https://njump.me/${e}`,target:"_blank",children:A})})(n);if("nevent"===e)return N(n);if("note1"===e)return g=n,(0,x.jsx)(a.A,{style:{background:m,padding:25,marginBottom:10,borderLeftColor:f,borderLeftWidth:5,borderLeftStyle:"solid"},children:(0,x.jsx)(l.A,{children:(0,x.jsx)(A.A,{children:(0,x.jsx)(B,{strong:!0,href:`https://njump.me/${g}`,target:"_blank",children:S("components.markDown.seeNote")})})})});if("naddr"===e){const e=j.Qe.decode(n);return 30023===e.data.kind?(d=n,(r=e.data.identifier)&&r!==i?(0,x.jsx)(l.A,{children:(0,x.jsx)(A.A,{children:(0,x.jsx)(c.Ay,{type:"link",onClick:()=>I(`/topic/${d}`),children:S("components.markDown.identifier",{identifier:r})})})}):(0,x.jsx)(x.Fragment,{})):N(n)}return(0,x.jsx)(x.Fragment,{});var d,r,g};return(0,x.jsx)(E.o,{remarkPlugins:[v.A,()=>e=>{(0,Q.YR)(e,"text",(e=>{const n=/(?:nostr:)?((naddr|nevent|npub|nprofile|note1)[a-zA-Z0-9]+)/g.exec(e.value);n&&(e.type="root",e.children=[],e.children.push({type:"custom",value:J(n[2],n[1])}),e.children.push({type:"text",value:e.value.replace(n[0],"")}))}))}],className:"markdown-container",components:w,children:n.replace(/<img\s+src="([^"]+)"\s*[^>]*>/g,((e,n)=>`![Image](${n})`))})}},7532:(e,n,i)=>{i.r(n),i.d(n,{Topic:()=>D});var t=i(2691),o=i(2177),d=i(6520),l=i(1667),r=i(835),A=i(9900),a=i(7170),s=i(7419),c=i(1645),g=i(8125),h=i(481),u=i(2245),E=i(5043),v=i(8139),Q=i.n(v),j=i(2915),p=i(7892),x=i(4414),B=i(8855),y=i(8446);const m=e=>{const{componentCls:n,sizePaddingEdgeHorizontal:i,colorSplit:t,lineWidth:o,textPaddingInline:d,orientationMargin:l,verticalMarginInline:r}=e;return{[n]:Object.assign(Object.assign({},(0,x.dF)(e)),{borderBlockStart:`${(0,p.zA)(o)} solid ${t}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:r,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${(0,p.zA)(o)} solid ${t}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${(0,p.zA)(e.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${n}-with-text`]:{display:"flex",alignItems:"center",margin:`${(0,p.zA)(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${t}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${(0,p.zA)(o)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${n}-with-text-left`]:{"&::before":{width:`calc(${l} * 100%)`},"&::after":{width:`calc(100% - ${l} * 100%)`}},[`&-horizontal${n}-with-text-right`]:{"&::before":{width:`calc(100% - ${l} * 100%)`},"&::after":{width:`calc(${l} * 100%)`}},[`${n}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:d},"&-dashed":{background:"none",borderColor:t,borderStyle:"dashed",borderWidth:`${(0,p.zA)(o)} 0 0`},[`&-horizontal${n}-with-text${n}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${n}-dashed`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:"none",borderColor:t,borderStyle:"dotted",borderWidth:`${(0,p.zA)(o)} 0 0`},[`&-horizontal${n}-with-text${n}-dotted`]:{"&::before, &::after":{borderStyle:"dotted none none"}},[`&-vertical${n}-dotted`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${n}-with-text`]:{color:e.colorText,fontWeight:"normal",fontSize:e.fontSize},[`&-horizontal${n}-with-text-left${n}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${n}-inner-text`]:{paddingInlineStart:i}},[`&-horizontal${n}-with-text-right${n}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${n}-inner-text`]:{paddingInlineEnd:i}}})}},f=(0,B.OF)("Divider",(e=>{const n=(0,y.oX)(e,{dividerHorizontalWithTextGutterMargin:e.margin,dividerHorizontalGutterMargin:e.marginLG,sizePaddingEdgeHorizontal:0});return[m(n)]}),(e=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:e.marginXS})),{unitless:{orientationMargin:!0}});var b=function(e,n){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(i[t]=e[t]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(t=Object.getOwnPropertySymbols(e);o<t.length;o++)n.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(i[t[o]]=e[t[o]])}return i};const k=e=>{const{getPrefixCls:n,direction:i,divider:t}=E.useContext(j.QO),{prefixCls:o,type:d="horizontal",orientation:l="center",orientationMargin:r,className:A,rootClassName:a,children:s,dashed:c,variant:g="solid",plain:h,style:u}=e,v=b(e,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","variant","plain","style"]),p=n("divider",o),[x,B,y]=f(p),m=!!s,k="left"===l&&null!=r,C="right"===l&&null!=r,S=Q()(p,null===t||void 0===t?void 0:t.className,B,y,`${p}-${d}`,{[`${p}-with-text`]:m,[`${p}-with-text-${l}`]:m,[`${p}-dashed`]:!!c,[`${p}-${g}`]:"solid"!==g,[`${p}-plain`]:!!h,[`${p}-rtl`]:"rtl"===i,[`${p}-no-default-orientation-margin-left`]:k,[`${p}-no-default-orientation-margin-right`]:C},A,a),I=E.useMemo((()=>"number"===typeof r?r:/^\d+$/.test(r)?Number(r):r),[r]),w=Object.assign(Object.assign({},k&&{marginLeft:I}),C&&{marginRight:I});return x(E.createElement("div",Object.assign({className:S,style:Object.assign(Object.assign({},null===t||void 0===t?void 0:t.style),u)},v,{role:"separator"}),s&&"vertical"!==d&&E.createElement("span",{className:`${p}-inner-text`,style:w},s)))};var C=i(7021),S=i(5448),I=i(1690),w=i(3007),N=i(2393),J=i(9092),z=i(6971),T=i(4771),R=i(798),K=i(1875),L=i(9997),U=i(7763),M=i(2595),H=i(579);const{Title:Y,Text:P,Link:F}=A.A,D=()=>{var e,n,i,A,v,Q,j,p,x,B,y,m,f,b,D,Z,G,O,q,W,X,$,V,_,ee,ne,ie;const{turtleMode:te}=(0,E.useContext)(U.BR),{ndk:oe,authors:de,saveAuthors:le,reactions:re,saveReactions:Ae,comments:ae,saveComments:se,topics:ce,saveTopics:ge,forums:he,saveForums:ue,getBaseRelays:Ee}=(0,E.useContext)(I.gH),{naddr:ve}=(0,z.g)(),Qe=(0,z.Zp)(),{t:je}=(0,J.B)(),{token:{colorBgContainer:pe,borderRadiusLG:xe,colorPrimary:Be,colorBgLayout:ye,colorTextSecondary:me,colorSuccess:fe}}=a.A.useToken(),[be,ke]=(0,E.useState)(),[Ce,Se]=(0,E.useState)(),[Ie,we]=(0,E.useState)(),[Ne,Je]=(0,E.useState)(!0),[ze,Te]=(0,E.useState)(!0),[Re,Ke]=(0,E.useState)(!0),[Le,Ue]=(0,E.useState)(!1),[Me,He]=(0,E.useState)(),[Ye,Pe]=(0,E.useState)();(0,E.useEffect)((()=>{if(ve){var e;if(ce[ve]){const e=ce[ve].pubkey;Se(ce[ve]),de[e]&&we(de[e])}oe.fetchEvent(ve,{closeOnEose:!0},Fe()).then((e=>{if(e){var n;Se(e),e.dTag&&ge({[e.dTag]:e});const i=e.tags.find((e=>"a"===e[0]&&e[1].startsWith("34550:"))),o=null===i||void 0===i||null===(n=i[1].split(":"))||void 0===n?void 0:n[2];o?(he[o]&&ke(he[o]),oe.fetchEvents({"#d":[o]},{closeOnEose:!0},Fe()).then((e=>{const n=[...e][0];n?(ke(n),ue({[n.encode()]:n,[o]:n})):ke(new t.QB)}))):ke(new t.QB)}else ke(new t.QB)}));const n=(0,t.bY)(ve),i=null===n||void 0===n||null===(e=n["#a"])||void 0===e?void 0:e[0].split(":")[2],o=[1];te||o.push(7),i&&oe.fetchEvents({...n,kinds:o},{},Fe()).then((e=>{const n=[],o=[];e.forEach((e=>{switch(e.kind){case 1:n.push(e);break;case 7:o.push(e)}})),oe.fetchEvents({kinds:[0],authors:n.map((e=>e.pubkey))},{closeOnEose:!0},Fe()).then((e=>{const n={};e.forEach((e=>{n[e.pubkey]=(0,t.o_)(e)})),le(n),Je(!1)})),se({[i]:n}),Ae({[i]:o}),Ke(!1),Te(!1)}))}return()=>{Se(void 0)}}),[]),(0,E.useEffect)((()=>{if(Ce){var e;if(null===(e=Ce.dTag)||void 0===e?void 0:e.toString()){Je(!0);const e=[...Ce.getMatchingTags("p").map((e=>e[1])),Ce.pubkey];oe.fetchEvents({kinds:[0],authors:e},{closeOnEose:!0},Fe()).then((e=>{const n={};e.forEach((e=>{n[e.pubkey]=(0,t.o_)(e),n[e.pubkey]&&we(n[e.pubkey])})),le(n),Je(!1)}))}}}),[Ce]);const Fe=()=>{let e=Ee();if(be&&be.onRelays.forEach((n=>e.push(n.url))),ve){var n,i;const t=M.Qe.decode(ve);e=[...e,...null!==(n=null===(i=t.data)||void 0===i?void 0:i.relays)&&void 0!==n?n:[]]}return t.P0.fromRelayUrls(e,oe,!0)};return(0,H.jsx)(S.UC,{children:(0,H.jsxs)(s.A,{justify:"space-between",children:[(0,H.jsx)(c.A,{xs:24,md:16,children:(0,H.jsxs)(s.A,{gutter:[0,10],children:[(0,H.jsx)(c.A,{span:24,children:(0,H.jsx)(s.A,{children:(0,H.jsx)(g.A,{items:[{title:(0,H.jsx)("a",{children:"Home"}),onClick:()=>Qe("/")},{title:be?(0,H.jsx)("a",{children:null!==(e=null!==(n=null===be||void 0===be?void 0:be.tagValue("name"))&&void 0!==n?n:null===be||void 0===be?void 0:be.tagValue("d"))&&void 0!==e?e:"All"}):(0,H.jsx)(h.A,{paragraph:{rows:1,width:55,style:{marginTop:0}},title:!1}),onClick:()=>Qe(`/forum/${null!==be&&void 0!==be&&be.kind?be.encode():"all"}`)},{title:null!==(i=null!==(A=null===Ce||void 0===Ce?void 0:Ce.tagValue("title"))&&void 0!==A?A:null===Ce||void 0===Ce?void 0:Ce.tagValue("d"))&&void 0!==i?i:(0,H.jsx)(h.A,{paragraph:{rows:1,width:55,style:{marginTop:0}},title:!1})}]})})}),(0,H.jsx)(c.A,{span:"24",children:(0,H.jsx)(S.Ay,{style:{background:pe,borderTopLeftRadius:xe,borderTopRightRadius:xe,paddingBottom:15},children:(0,H.jsx)(s.A,{justify:"space-around",children:(0,H.jsx)(c.A,{span:"22",children:(0,H.jsx)(h.A,{active:!0,loading:!Ce,paragraph:{rows:0},style:{marginTop:34},children:(0,H.jsx)(Y,{children:null===Ce||void 0===Ce?void 0:Ce.tagValue("title")})})})})})}),(0,H.jsx)(c.A,{span:"24",children:(0,H.jsx)(S.Ay,{style:{padding:"15px 0",background:pe,borderLeftColor:Be,borderLeftWidth:5,borderLeftStyle:"solid"},children:(0,H.jsx)(s.A,{justify:"space-around",children:(0,H.jsxs)(c.A,{span:"22",children:[(0,H.jsxs)(s.A,{children:[(0,H.jsx)(c.A,{style:{width:80},children:(0,H.jsx)(u.A,{size:64,src:null===Ie||void 0===Ie?void 0:Ie.image,icon:!(null!==Ie&&void 0!==Ie&&Ie.image)&&(0,H.jsx)(o.A,{style:{fontSize:"45px"}}),alt:null!==(v=null!==(Q=null===Ie||void 0===Ie?void 0:Ie.displayName)&&void 0!==Q?Q:null===Ie||void 0===Ie?void 0:Ie.name)&&void 0!==v?v:je("shared.events.anonymous")})}),(0,H.jsx)(c.A,{style:{width:"calc(100% - 80px)"},children:(0,H.jsx)(s.A,{justify:"start",children:(0,H.jsx)(c.A,{span:24,children:(0,H.jsxs)(s.A,{justify:"space-between",children:[(0,H.jsx)(h.A,{active:!0,loading:void 0===!Ie,paragraph:{rows:1,width:100},style:{marginTop:-10,marginBottom:-9,width:100},title:!1,children:(0,H.jsx)(F,{strong:!0,href:`https://njump.me/${null===Ce||void 0===Ce?void 0:Ce.author.npub}`,target:"_blank",children:null!==(j=null!==(p=null===Ie||void 0===Ie?void 0:Ie.displayName)&&void 0!==p?p:null===Ie||void 0===Ie?void 0:Ie.name)&&void 0!==j?j:je("shared.events.anonymous")})}),(0,H.jsx)(h.A,{active:!0,loading:!Ce,paragraph:{rows:1,width:100},style:{marginTop:-10,marginBottom:-9,width:100},title:!1,children:(0,H.jsx)(P,{strong:!0,children:je("shared.events.published_at",{date:(0,w.m)((0,N.S)(parseInt(null!==(x=null!==(B=null===Ce||void 0===Ce?void 0:Ce.tagValue("published_at"))&&void 0!==B?B:null===Ce||void 0===Ce||null===(y=Ce.created_at)||void 0===y?void 0:y.toString())&&void 0!==x?x:"0",10)),{addSuffix:!0})})})})]})})})})]}),(0,H.jsx)(k,{}),(0,H.jsx)(s.A,{children:(0,H.jsx)(c.A,{span:24,children:(0,H.jsx)(h.A,{active:!0,loading:!Ce,paragraph:{rows:6},title:!1,children:(0,H.jsx)(T.o,{text:null!==(m=null===Ce||void 0===Ce?void 0:Ce.content)&&void 0!==m?m:"",loadingAuthors:Ne,dTag:null===Ce||void 0===Ce?void 0:Ce.dTag})})})}),(0,H.jsx)(k,{}),(0,H.jsx)(s.A,{children:(0,H.jsx)(c.A,{span:24,children:(0,H.jsxs)(s.A,{justify:"end",children:[!te&&(0,H.jsx)(c.A,{style:{width:63,marginRight:16},children:(0,H.jsx)(P,{type:"secondary",children:(0,H.jsx)(h.A,{active:!0,loading:!(null!==re&&void 0!==re&&re[null!==(f=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==f?f:""])&&Re,paragraph:{rows:1,width:55},title:!1,children:(0,H.jsx)(s.A,{justify:"space-between",children:(0,H.jsx)(C.Ay,{icon:(0,H.jsx)(d.A,{color:null!==re&&void 0!==re&&null!==(b=re[null!==(D=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==D?D:""])&&void 0!==b&&b.find((e=>{var n;return e.pubkey===(null===(n=oe.activeUser)||void 0===n?void 0:n.pubkey)}))?"error":"inherit"}),loading:Le,onClick:()=>(()=>{var e,n;Ue(!0);const i=null===Ce||void 0===Ce?void 0:Ce.dTag,t=null===re||void 0===re||null===(e=re[null!==(n=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==n?n:""])||void 0===e?void 0:e.find((e=>{var n;return e.pubkey===(null===(n=oe.activeUser)||void 0===n?void 0:n.pubkey)}));i&&!t?Ce.react("+",!0).then((e=>{e&&Ae({[i]:[e]}),Ue(!1)})):Ue(!1)})(),children:null!==(Z=null===re||void 0===re||null===(G=re[null!==(O=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==O?O:""])||void 0===G?void 0:G.length)&&void 0!==Z?Z:0})})})})}),(0,H.jsx)(c.A,{style:{width:63,marginLeft:16},children:(0,H.jsx)(P,{type:"secondary",children:(0,H.jsx)(h.A,{active:!0,loading:!(null!==ae&&void 0!==ae&&ae[null!==(q=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==q?q:""])&&ze,paragraph:{rows:1,width:55},title:!1,children:(0,H.jsx)(s.A,{justify:"space-between",children:(0,H.jsx)(C.Ay,{icon:(0,H.jsx)(l.A,{color:null!==ae&&void 0!==ae&&null!==(W=ae[null!==(X=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==X?X:""])&&void 0!==W&&W.find((e=>{var n;return e.pubkey===(null===(n=oe.activeUser)||void 0===n?void 0:n.pubkey)}))?"success":"inherit"}),children:null!==($=null===ae||void 0===ae||null===(V=ae[null!==(_=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==_?_:""])||void 0===V?void 0:V.length)&&void 0!==$?$:0})})})})})]})})})]})})})}),(0,H.jsx)(c.A,{span:"24",children:!ae[null!==(ee=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==ee?ee:""]&&ze?(0,H.jsx)(H.Fragment,{}):(0,H.jsx)(s.A,{gutter:[0,10],children:null===(ne=ae[null!==(ie=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==ie?ie:""])||void 0===ne?void 0:ne.map(((e,n)=>{var i,t,d,l,r,A,a,g,E;const v=de[e.pubkey],Q=null!==(i=null!==(t=null===v||void 0===v?void 0:v.displayName)&&void 0!==t?t:null===v||void 0===v?void 0:v.name)&&void 0!==i?i:je("shared.events.anonymous"),j=e.getMatchingTags("e"),p=null===(d=j[j.length-1])||void 0===d?void 0:d[1],x=p!==(null===Ce||void 0===Ce?void 0:Ce.id)?ae[null!==(l=null===Ce||void 0===Ce?void 0:Ce.dTag)&&void 0!==l?l:""].find((e=>e.id===p)):null;return(0,H.jsx)(c.A,{span:24,children:(0,H.jsx)(S.Ay,{style:{padding:"15px 0",background:pe,borderLeftColor:fe,borderLeftWidth:e.pubkey===(null===(r=oe.activeUser)||void 0===r?void 0:r.pubkey)?5:0,borderLeftStyle:"solid"},children:(0,H.jsx)(s.A,{justify:"space-around",children:(0,H.jsxs)(c.A,{span:"22",children:[(0,H.jsxs)(s.A,{children:[(0,H.jsx)(c.A,{style:{width:80},children:(0,H.jsx)(u.A,{size:64,src:null===v||void 0===v?void 0:v.image,icon:!(null!==v&&void 0!==v&&v.image)&&(0,H.jsx)(o.A,{style:{fontSize:"45px"}}),alt:Q})}),(0,H.jsx)(c.A,{style:{width:"calc(100% - 80px)"},children:(0,H.jsx)(s.A,{justify:"start",children:(0,H.jsxs)(c.A,{span:24,children:[(0,H.jsxs)(s.A,{justify:"space-between",children:[(0,H.jsx)(h.A,{active:!0,loading:void 0===v&&Ne,paragraph:{rows:1,width:100},style:{marginTop:-10,marginBottom:-9,width:100},title:!1,children:(0,H.jsx)(F,{strong:!0,href:`https://njump.me/${null===e||void 0===e?void 0:e.author.npub}`,target:"_blank",children:Q})}),(0,H.jsx)(P,{strong:!0,children:je("shared.events.published_at",{date:(0,w.m)((0,N.S)(null!==(A=e.created_at)&&void 0!==A?A:0),{addSuffix:!0})})})]}),(0,H.jsx)(s.A,{justify:"end",children:(0,H.jsx)(C.Ay,{type:"link",onClick:()=>Pe(e),children:je("pages.topic.reply")})})]})})})]}),(0,H.jsx)(k,{}),(0,H.jsx)(s.A,{children:(0,H.jsxs)(c.A,{span:24,children:[x&&(0,H.jsx)(S.Ay,{style:{background:ye,padding:25,marginBottom:10,borderLeftColor:me,borderLeftWidth:5,borderLeftStyle:"solid"},children:(0,H.jsx)(s.A,{children:(0,H.jsx)(c.A,{children:(0,H.jsx)(T.o,{text:x.content,loadingAuthors:Ne,dTag:null===Ce||void 0===Ce||null===(a=Ce.dTag)||void 0===a?void 0:a.toString()})})})}),(0,H.jsx)(T.o,{text:null!==(g=e.content)&&void 0!==g?g:"",loadingAuthors:Ne,dTag:null===Ce||void 0===Ce||null===(E=Ce.dTag)||void 0===E?void 0:E.toString()})]})})]})})})},n)}))})}),(0,H.jsx)(c.A,{span:"24",children:(0,H.jsx)(S.Ay,{style:{background:pe,padding:"15px 0"},children:(0,H.jsxs)(s.A,{justify:"space-around",gutter:[0,10],children:[(0,H.jsx)(c.A,{span:"22",children:(0,H.jsx)(s.A,{children:Ye&&(0,H.jsxs)(S.Ay,{style:{background:ye,padding:25,marginBottom:10,borderLeftColor:me,borderLeftWidth:5,borderLeftStyle:"solid"},children:[(0,H.jsx)(s.A,{children:(0,H.jsx)(c.A,{children:(0,H.jsx)(T.o,{text:Ye.content,loadingAuthors:Ne,dTag:null===Ce||void 0===Ce?void 0:Ce.dTag})})}),(0,H.jsx)(s.A,{justify:"end",children:(0,H.jsx)(c.A,{style:{position:"relative"},children:(0,H.jsx)(C.Ay,{type:"link",onClick:()=>Pe(void 0),children:je("pages.topic.removeReply")})})})]})})}),(0,H.jsx)(c.A,{span:"22",children:(0,H.jsx)(s.A,{children:(0,H.jsx)(R.A,{rows:6,content:Me,onChange:e=>He(e.target.value)})})}),(0,H.jsx)(c.A,{span:"22",children:(0,H.jsx)(s.A,{justify:"end",children:(0,H.jsx)(C.Ay,{onClick:async()=>{const e=null===Ce||void 0===Ce?void 0:Ce.dTag;if(Ce&&e&&ve&&Me&&""!==Me){const n=new t.QB(oe);n.kind=1,n.content=Me,n.tags.push(Ce.tagReference()),Ce.tags.forEach((e=>{"a"===e[0]&&n.tags.push(e)})),be&&n.tags.push(["a",be.tagReference()[1]]),Ye&&Ye.referenceTags().forEach((e=>n.tags.push(e))),n.publish(Fe()).then((i=>{i&&se({[e]:[n]}),Pe(void 0),He("")}))}},disabled:!Me||""===Me,type:"primary",htmlType:"submit",size:"large",icon:(0,H.jsx)(r.A,{}),iconPosition:"end",children:je("pages.topic.createComment")})})})]})})})]})}),(0,H.jsx)(c.A,{xs:0,md:7,children:(0,H.jsxs)(s.A,{gutter:[0,10],children:[(0,H.jsx)(c.A,{span:24,children:(0,H.jsx)(K.G,{})}),(0,H.jsx)(c.A,{span:24,children:(0,H.jsx)(L.O,{})})]})})]})})}},835:(e,n,i)=>{var t=i(4994);n.A=void 0;var o=t(i(39)),d=i(579);n.A=(0,o.default)((0,d.jsx)("path",{d:"M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM18 14H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"}),"Comment")},9194:(e,n,i)=>{i.d(n,{A:()=>A});var t=i(8168),o=i(5043);const d={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"};var l=i(2575),r=function(e,n){return o.createElement(l.A,(0,t.A)({},e,{ref:n,icon:d}))};const A=o.forwardRef(r)},4903:(e,n,i)=>{i.d(n,{A:()=>o});var t=i(7950);function o(e,n,i,o){var d=t.unstable_batchedUpdates?function(e){t.unstable_batchedUpdates(i,e)}:i;return null!==e&&void 0!==e&&e.addEventListener&&e.addEventListener(n,d,o),{remove:function(){null!==e&&void 0!==e&&e.removeEventListener&&e.removeEventListener(n,d,o)}}}},8419:(e,n,i)=>{i.d(n,{A3:()=>o,XV:()=>t});function t(){return{width:document.documentElement.clientWidth,height:window.innerHeight||document.documentElement.clientHeight}}function o(e){var n=e.getBoundingClientRect(),i=document.documentElement;return{left:n.left+(window.pageXOffset||i.scrollLeft)-(i.clientLeft||document.body.clientLeft||0),top:n.top+(window.pageYOffset||i.scrollTop)-(i.clientTop||document.body.clientTop||0)}}}}]);
//# sourceMappingURL=371.6f51ae34.chunk.js.map