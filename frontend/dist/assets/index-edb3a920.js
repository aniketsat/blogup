import{C as N,E as R,s as Y,t as $,b as z,L as A,i as j,f as Z,o as q,a as I,g as U}from"./index-dd24fe3f.js";const b=1,D=2,F=3,M=4,B=5,L=35,H=36,J=37,K=11,ee=13;function te(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}function Oe(e){return e==9||e==10||e==13||e==32}let V=null,X=null,Q=0;function w(e,t){let n=e.pos+t;if(X==e&&Q==n)return V;for(;Oe(e.peek(t));)t++;let O="";for(;;){let a=e.peek(t);if(!te(a))break;O+=String.fromCharCode(a),t++}return X=e,Q=n,V=O||null}function x(e,t){this.name=e,this.parent=t,this.hash=t?t.hash:0;for(let n=0;n<e.length;n++)this.hash+=(this.hash<<4)+e.charCodeAt(n)+(e.charCodeAt(n)<<8)}const ne=new N({start:null,shift(e,t,n,O){return t==b?new x(w(O,1)||"",e):e},reduce(e,t){return t==K&&e?e.parent:e},reuse(e,t,n,O){let a=t.type.id;return a==b||a==ee?new x(w(O,1)||"",e):e},hash(e){return e?e.hash:0},strict:!1}),ae=new R((e,t)=>{if(e.next==60){if(e.advance(),e.next==47){e.advance();let n=w(e,0);if(!n)return e.acceptToken(B);if(t.context&&n==t.context.name)return e.acceptToken(D);for(let O=t.context;O;O=O.parent)if(O.name==n)return e.acceptToken(F,-2);e.acceptToken(M)}else if(e.next!=33&&e.next!=63)return e.acceptToken(b)}},{contextual:!0});function W(e,t){return new R(n=>{for(let O=0,a=0;;a++){if(n.next<0){a&&n.acceptToken(e);break}if(n.next==t.charCodeAt(O)){if(O++,O==t.length){a>=t.length&&n.acceptToken(e,1-t.length);break}}else O=n.next==t.charCodeAt(0)?1:0;n.advance()}})}const re=W(L,"-->"),le=W(H,"?>"),oe=W(J,"]]>"),se=Y({Text:$.content,"StartTag StartCloseTag EndTag SelfCloseEndTag":$.angleBracket,TagName:$.tagName,"MismatchedCloseTag/Tagname":[$.tagName,$.invalid],AttributeName:$.attributeName,AttributeValue:$.attributeValue,Is:$.definitionOperator,"EntityReference CharacterReference":$.character,Comment:$.blockComment,ProcessingInst:$.processingInstruction,DoctypeDecl:$.documentMeta,Cdata:$.special($.string)}),ie=z.deserialize({version:14,states:",SOQOaOOOrOxO'#CfOzOpO'#CiO!tOaO'#CgOOOP'#Cg'#CgO!{OrO'#CrO#TOtO'#CsO#]OpO'#CtOOOP'#DS'#DSOOOP'#Cv'#CvQQOaOOOOOW'#Cw'#CwO#eOxO,59QOOOP,59Q,59QOOOO'#Cx'#CxO#mOpO,59TO#uO!bO,59TOOOP'#C{'#C{O$TOaO,59RO$[OpO'#CoOOOP,59R,59ROOOQ'#C|'#C|O$dOrO,59^OOOP,59^,59^OOOS'#C}'#C}O$lOtO,59_OOOP,59_,59_O$tOpO,59`O$|OpO,59`OOOP-E6t-E6tOOOW-E6u-E6uOOOP1G.l1G.lOOOO-E6v-E6vO%UO!bO1G.oO%UO!bO1G.oO%dOpO'#CkO%lO!bO'#CyO%zO!bO1G.oOOOP1G.o1G.oOOOP1G.w1G.wOOOP-E6y-E6yOOOP1G.m1G.mO&VOpO,59ZO&_OpO,59ZOOOQ-E6z-E6zOOOP1G.x1G.xOOOS-E6{-E6{OOOP1G.y1G.yO&gOpO1G.zO&gOpO1G.zOOOP1G.z1G.zO&oO!bO7+$ZO&}O!bO7+$ZOOOP7+$Z7+$ZOOOP7+$c7+$cO'YOpO,59VO'bOpO,59VO'jO!bO,59eOOOO-E6w-E6wO'xOpO1G.uO'xOpO1G.uOOOP1G.u1G.uO(QOpO7+$fOOOP7+$f7+$fO(YO!bO<<GuOOOP<<Gu<<GuOOOP<<G}<<G}O'bOpO1G.qO'bOpO1G.qO(eO#tO'#CnOOOO1G.q1G.qO(sOpO7+$aOOOP7+$a7+$aOOOP<<HQ<<HQOOOPAN=aAN=aOOOPAN=iAN=iO'bOpO7+$]OOOO7+$]7+$]OOOO'#Cz'#CzO({O#tO,59YOOOO,59Y,59YOOOP<<G{<<G{OOOO<<Gw<<GwOOOO-E6x-E6xOOOO1G.t1G.t",stateData:")Z~OPQOSVOTWOVWOWWOXWOiXOxPO}TO!PUO~OuZOw]O~O^`Oy^O~OPQOQcOSVOTWOVWOWWOXWOxPO}TO!PUO~ORdO~P!SOseO|gO~OthO!OjO~O^lOy^O~OuZOwoO~O^qOy^O~O[vO`sOdwOy^O~ORyO~P!SO^{Oy^O~OseO|}O~OthO!O!PO~O^!QOy^O~O[!SOy^O~O[!VO`sOd!WOy^O~Oa!YOy^O~Oy^O[mX`mXdmX~O[!VO`sOd!WO~O^!]Oy^O~O[!_Oy^O~O[!aOy^O~O[!cO`sOd!dOy^O~O[!cO`sOd!dO~Oa!eOy^O~Oy^Oz!gO~Oy^O[ma`madma~O[!jOy^O~O[!kOy^O~O[!lO`sOd!mO~OW!pOX!pOz!rO{!pO~O[!sOy^O~OW!pOX!pOz!vO{!pO~O",goto:"%[wPPPPPPPPPPxxP!OP!UPP!_!iP!oxxxP!u!{#R$Z$j$p$v$|PPPP%SXWORYbXRORYb_t`qru!T!U!bQ!h!YS!o!e!fR!t!nQdRRybXSORYbQYORmYQ[PRn[Q_QQkVjp_krz!R!T!X!Z!^!`!f!i!nQr`QzcQ!RlQ!TqQ!XsQ!ZtQ!^{Q!`!QQ!f!YQ!i!]R!n!eQu`S!UqrU![u!U!bR!b!TQ!q!gR!u!qQbRRxbQfTR|fQiUR!OiSXOYTaRb",nodeNames:"⚠ StartTag StartCloseTag MissingCloseTag StartCloseTag StartCloseTag Document Text EntityReference CharacterReference Cdata Element EndTag OpenTag TagName Attribute AttributeName Is AttributeValue CloseTag SelfCloseEndTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag DoctypeDecl",maxTerm:47,context:ne,nodeProps:[["closedBy",1,"SelfCloseEndTag EndTag",13,"CloseTag MissingCloseTag"],["openedBy",12,"StartTag StartCloseTag",19,"OpenTag",20,"StartTag"]],propSources:[se],skippedNodes:[0],repeatNodeCount:8,tokenData:"IX~R!XOX$nXY&kYZ&kZ]$n]^&k^p$npq&kqr$nrs'ssv$nvw(Zw}$n}!O*l!O!P$n!P!Q,{!Q![$n![!].e!]!^$n!^!_1v!_!`Cz!`!aDm!a!bE`!b!c$n!c!}.e!}#P$n#P#QFx#Q#R$n#R#S.e#S#T$n#T#o.e#o%W$n%W%o.e%o%p$n%p&a.e&a&b$n&b1p.e1p4U$n4U4d.e4d4e$n4e$IS.e$IS$I`$n$I`$Ib.e$Ib$Kh$n$Kh%#t.e%#t&/x$n&/x&Et.e&Et&FV$n&FV;'S.e;'S;:j1p;:j;=`&e<%l?&r$n?&r?Ah.e?Ah?BY$n?BY?Mn.e?MnO$nX$uWVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$nP%dTVPOv%_w!^%_!_;'S%_;'S;=`%s<%lO%_P%vP;=`<%l%_W&OT{WOr%ysv%yw;'S%y;'S;=`&_<%lO%yW&bP;=`<%l%yX&hP;=`<%l$n_&t_VP{WyUOX$nXY&kYZ&kZ]$n]^&k^p$npq&kqr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$nZ'zTzYVPOv%_w!^%_!_;'S%_;'S;=`%s<%lO%_~(^VOp(sqs(sst)ht!](s!^;'S(s;'S;=`)b<%lO(s~(vVOp(sqs(st!](s!]!^)]!^;'S(s;'S;=`)b<%lO(s~)bOW~~)eP;=`<%l(s~)kTOp)zq!])z!^;'S)z;'S;=`*f<%lO)z~)}UOp)zq!])z!]!^*a!^;'S)z;'S;=`*f<%lO)z~*fOX~~*iP;=`<%l)zZ*sYVP{WOr$nrs%_sv$nw}$n}!O+c!O!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$nZ+jYVP{WOr$nrs%_sv$nw!^$n!^!_%y!_!`$n!`!a,Y!a;'S$n;'S;=`&e<%lO$nZ,cW|QVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$n]-SYVP{WOr$nrs%_sv$nw!^$n!^!_%y!_!`$n!`!a-r!a;'S$n;'S;=`&e<%lO$n]-{WdSVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$n_.p!O`S^QVP{WOr$nrs%_sv$nw}$n}!O.e!O!P.e!P!Q$n!Q![.e![!].e!]!^$n!^!_%y!_!c$n!c!}.e!}#R$n#R#S.e#S#T$n#T#o.e#o$}$n$}%O.e%O%W$n%W%o.e%o%p$n%p&a.e&a&b$n&b1p.e1p4U.e4U4d.e4d4e$n4e$IS.e$IS$I`$n$I`$Ib.e$Ib$Je$n$Je$Jg.e$Jg$Kh$n$Kh%#t.e%#t&/x$n&/x&Et.e&Et&FV$n&FV;'S.e;'S;:j1p;:j;=`&e<%l?&r$n?&r?Ah.e?Ah?BY$n?BY?Mn.e?MnO$n_1sP;=`<%l.eX1{W{WOq%yqr2esv%yw!a%y!a!bCd!b;'S%y;'S;=`&_<%lO%yX2j]{WOr%ysv%yw}%y}!O3c!O!f%y!f!g4e!g!}%y!}#O9t#O#W%y#W#X@Q#X;'S%y;'S;=`&_<%lO%yX3hV{WOr%ysv%yw}%y}!O3}!O;'S%y;'S;=`&_<%lO%yX4UT}P{WOr%ysv%yw;'S%y;'S;=`&_<%lO%yX4jV{WOr%ysv%yw!q%y!q!r5P!r;'S%y;'S;=`&_<%lO%yX5UV{WOr%ysv%yw!e%y!e!f5k!f;'S%y;'S;=`&_<%lO%yX5pV{WOr%ysv%yw!v%y!v!w6V!w;'S%y;'S;=`&_<%lO%yX6[V{WOr%ysv%yw!{%y!{!|6q!|;'S%y;'S;=`&_<%lO%yX6vV{WOr%ysv%yw!r%y!r!s7]!s;'S%y;'S;=`&_<%lO%yX7bV{WOr%ysv%yw!g%y!g!h7w!h;'S%y;'S;=`&_<%lO%yX7|X{WOr7wrs8isv7wvw8iw!`7w!`!a9W!a;'S7w;'S;=`9n<%lO7wP8lTO!`8i!`!a8{!a;'S8i;'S;=`9Q<%lO8iP9QOiPP9TP;=`<%l8iX9_TiP{WOr%ysv%yw;'S%y;'S;=`&_<%lO%yX9qP;=`<%l7wX9yX{WOr%ysv%yw!e%y!e!f:f!f#V%y#V#W=t#W;'S%y;'S;=`&_<%lO%yX:kV{WOr%ysv%yw!f%y!f!g;Q!g;'S%y;'S;=`&_<%lO%yX;VV{WOr%ysv%yw!c%y!c!d;l!d;'S%y;'S;=`&_<%lO%yX;qV{WOr%ysv%yw!v%y!v!w<W!w;'S%y;'S;=`&_<%lO%yX<]V{WOr%ysv%yw!c%y!c!d<r!d;'S%y;'S;=`&_<%lO%yX<wV{WOr%ysv%yw!}%y!}#O=^#O;'S%y;'S;=`&_<%lO%yX=eT{WxPOr%ysv%yw;'S%y;'S;=`&_<%lO%yX=yV{WOr%ysv%yw#W%y#W#X>`#X;'S%y;'S;=`&_<%lO%yX>eV{WOr%ysv%yw#T%y#T#U>z#U;'S%y;'S;=`&_<%lO%yX?PV{WOr%ysv%yw#h%y#h#i?f#i;'S%y;'S;=`&_<%lO%yX?kV{WOr%ysv%yw#T%y#T#U<r#U;'S%y;'S;=`&_<%lO%yX@VV{WOr%ysv%yw#c%y#c#d@l#d;'S%y;'S;=`&_<%lO%yX@qV{WOr%ysv%yw#V%y#V#WAW#W;'S%y;'S;=`&_<%lO%yXA]V{WOr%ysv%yw#h%y#h#iAr#i;'S%y;'S;=`&_<%lO%yXAwV{WOr%ysv%yw#m%y#m#nB^#n;'S%y;'S;=`&_<%lO%yXBcV{WOr%ysv%yw#d%y#d#eBx#e;'S%y;'S;=`&_<%lO%yXB}V{WOr%ysv%yw#X%y#X#Y7w#Y;'S%y;'S;=`&_<%lO%yXCkT!PP{WOr%ysv%yw;'S%y;'S;=`&_<%lO%yZDTWaQVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$n_DvW[UVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$nZEgYVP{WOr$nrs%_sv$nw!^$n!^!_%y!_!`$n!`!aFV!a;'S$n;'S;=`&e<%lO$nZF`W!OQVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$nZGPYVP{WOr$nrs%_sv$nw!^$n!^!_%y!_#P$n#P#QGo#Q;'S$n;'S;=`&e<%lO$nZGvYVP{WOr$nrs%_sv$nw!^$n!^!_%y!_!`$n!`!aHf!a;'S$n;'S;=`&e<%lO$nZHoWwQVP{WOr$nrs%_sv$nw!^$n!^!_%y!_;'S$n;'S;=`&e<%lO$n",tokenizers:[ae,re,le,oe,0,1,2,3],topRules:{Document:[0,6]},tokenPrec:0});function P(e,t){let n=t&&t.getChild("TagName");return n?e.sliceString(n.from,n.to):""}function C(e,t){let n=t&&t.firstChild;return!n||n.name!="OpenTag"?"":P(e,n)}function ye(e,t,n){let O=t&&t.getChildren("Attribute").find(l=>l.from<=n&&l.to>=n),a=O&&O.getChild("AttributeName");return a?e.sliceString(a.from,a.to):""}function _(e){for(let t=e&&e.parent;t;t=t.parent)if(t.name=="Element")return t;return null}function $e(e,t){var n;let O=U(e).resolveInner(t,-1),a=null;for(let l=O;!a&&l.parent;l=l.parent)(l.name=="OpenTag"||l.name=="CloseTag"||l.name=="SelfClosingTag"||l.name=="MismatchedCloseTag")&&(a=l);if(a&&(a.to>t||a.lastChild.type.isError)){let l=a.parent;if(O.name=="TagName")return a.name=="CloseTag"||a.name=="MismatchedCloseTag"?{type:"closeTag",from:O.from,context:l}:{type:"openTag",from:O.from,context:_(l)};if(O.name=="AttributeName")return{type:"attrName",from:O.from,context:a};if(O.name=="AttributeValue")return{type:"attrValue",from:O.from,context:a};let i=O==a||O.name=="Attribute"?O.childBefore(t):O;return(i==null?void 0:i.name)=="StartTag"?{type:"openTag",from:t,context:_(l)}:(i==null?void 0:i.name)=="StartCloseTag"&&i.to<=t?{type:"closeTag",from:t,context:l}:(i==null?void 0:i.name)=="Is"?{type:"attrValue",from:t,context:a}:i?{type:"attrName",from:t,context:a}:null}else if(O.name=="StartCloseTag")return{type:"closeTag",from:t,context:O.parent};for(;O.parent&&O.to==t&&!(!((n=O.lastChild)===null||n===void 0)&&n.type.isError);)O=O.parent;return O.name=="Element"||O.name=="Text"||O.name=="Document"?{type:"tag",from:t,context:O.name=="Element"?O:_(O)}:null}class me{constructor(t,n,O){this.attrs=n,this.attrValues=O,this.children=[],this.name=t.name,this.completion=Object.assign(Object.assign({type:"type"},t.completion||{}),{label:this.name}),this.openCompletion=Object.assign(Object.assign({},this.completion),{label:"<"+this.name}),this.closeCompletion=Object.assign(Object.assign({},this.completion),{label:"</"+this.name+">",boost:2}),this.closeNameCompletion=Object.assign(Object.assign({},this.completion),{label:this.name+">"}),this.text=t.textContent?t.textContent.map(a=>({label:a,type:"text"})):[]}}const h=/^[:\-\.\w\u00b7-\uffff]*$/;function E(e){return Object.assign(Object.assign({type:"property"},e.completion||{}),{label:e.name})}function G(e){return typeof e=="string"?{label:`"${e}"`,type:"constant"}:/^"/.test(e.label)?e:Object.assign(Object.assign({},e),{label:`"${e.label}"`})}function Se(e,t){let n=[],O=[],a=Object.create(null);for(let r of t){let m=E(r);n.push(m),r.global&&O.push(m),r.values&&(a[r.name]=r.values.map(G))}let l=[],i=[],u=Object.create(null);for(let r of e){let m=O,o=a;r.attributes&&(m=m.concat(r.attributes.map(S=>typeof S=="string"?n.find(g=>g.label==S)||{label:S,type:"property"}:(S.values&&(o==a&&(o=Object.create(o)),o[S.name]=S.values.map(G)),E(S)))));let p=new me(r,m,o);u[p.name]=p,l.push(p),r.top&&i.push(p)}i.length||(i=l);for(let r=0;r<l.length;r++){let m=e[r],o=l[r];if(m.children)for(let p of m.children)u[p]&&o.children.push(u[p]);else o.children=l}return r=>{var m;let{doc:o}=r.state,p=$e(r.state,r.pos);if(!p||p.type=="tag"&&!r.explicit)return null;let{type:S,from:g,context:f}=p;if(S=="openTag"){let s=i,y=C(o,f);if(y){let c=u[y];s=(c==null?void 0:c.children)||l}return{from:g,options:s.map(c=>c.completion),validFor:h}}else if(S=="closeTag"){let s=C(o,f);return s?{from:g,to:r.pos+(o.sliceString(r.pos,r.pos+1)==">"?1:0),options:[((m=u[s])===null||m===void 0?void 0:m.closeNameCompletion)||{label:s+">",type:"type"}],validFor:h}:null}else if(S=="attrName"){let s=u[P(o,f)];return{from:g,options:(s==null?void 0:s.attrs)||O,validFor:h}}else if(S=="attrValue"){let s=ye(o,f,g);if(!s)return null;let y=u[P(o,f)],c=((y==null?void 0:y.attrValues)||a)[s];return!c||!c.length?null:{from:g,to:r.pos+(o.sliceString(r.pos,r.pos+1)=='"'?1:0),options:c,validFor:/^"[^"]*"?$/}}else if(S=="tag"){let s=C(o,f),y=u[s],c=[],T=f&&f.lastChild;s&&(!T||T.name!="CloseTag"||P(o,T)!=s)&&c.push(y?y.closeCompletion:{label:"</"+s+">",type:"type",boost:2});let v=c.concat(((y==null?void 0:y.children)||(f?l:i)).map(d=>d.openCompletion));if(f&&(y!=null&&y.text.length)){let d=f.firstChild;d.to>r.pos-20&&!/\S/.test(r.state.sliceDoc(d.to,r.pos))&&(v=v.concat(y.text))}return{from:g,options:v,validFor:/^<\/?[:\-\.\w\u00b7-\uffff]*$/}}else return null}}const k=A.define({name:"xml",parser:ie.configure({props:[j.add({Element(e){let t=/^\s*<\//.test(e.textAfter);return e.lineIndent(e.node.from)+(t?0:e.unit)},"OpenTag CloseTag SelfClosingTag"(e){return e.column(e.node.from)+e.unit}}),Z.add({Element(e){let t=e.firstChild,n=e.lastChild;return!t||t.name!="OpenTag"?null:{from:t.to,to:n.name=="CloseTag"?n.from:e.to}}}),q.add({"OpenTag CloseTag":e=>e.getChild("TagName")})]}),languageData:{commentTokens:{block:{open:"<!--",close:"-->"}},indentOnInput:/^\s*<\/$/}});function pe(e={}){return new I(k,k.data.of({autocomplete:Se(e.elements||[],e.attributes||[])}))}export{Se as completeFromSchema,pe as xml,k as xmlLanguage};
