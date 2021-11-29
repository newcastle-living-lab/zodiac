function e(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function t(e,t){var n=e[t];if(n)return n;var r={};return e[t]=r,r}function n(e,t){return new(e.bind.apply(e,[e].concat(t)))}let r;var o=globalThis;class a{constructor(e,t){this._css=e,this.relativeToElement=t}get css(){return l.escapeSelector(this._css)}get className(){return this._css.substr(1)}get id(){return this.className()}contains(e){for(let t of this)if(t.contains(e))return!0;return!1}[Symbol.iterator](){return l.getRootNode(this.relativeToElement).querySelectorAll(this.css)[Symbol.iterator]()}}var i=function(){var e={"+":"PLUS","-":"MINUS","*":"MULTIPLY","/":"DIVIDE",".":"PERIOD","..":"ELLIPSIS","\\":"BACKSLASH",":":"COLON","%":"PERCENT","|":"PIPE","!":"EXCLAMATION","?":"QUESTION","#":"POUND","&":"AMPERSAND",$:"DOLLAR",";":"SEMI",",":"COMMA","(":"L_PAREN",")":"R_PAREN","<":"L_ANG",">":"R_ANG","<=":"LTE_ANG",">=":"GTE_ANG","==":"EQ","===":"EQQ","!=":"NEQ","!==":"NEQQ","{":"L_BRACE","}":"R_BRACE","[":"L_BRACKET","]":"R_BRACKET","=":"EQUALS"};function t(e){return i(e)||a(e)||"-"===e||"_"===e||":"===e}function n(e){return i(e)||a(e)||"-"===e||"_"===e||":"===e}function r(e){return" "===e||"\t"===e||o(e)}function o(e){return"\r"===e||"\n"===e}function a(e){return e>="0"&&e<="9"}function i(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"}function s(e,t){return"_"===e||"$"===e}function l(e,t,n){o();var r=null;function o(){for(;"WHITESPACE"===f(0,!0).type;)t.push(e.shift())}function a(e,t){u.raiseParseError(e,t)}function i(e){if(p()&&p().op&&p().value===e)return c()}function s(e,t,n,r){if(p()&&p().type&&[e,t,n,r].indexOf(p().type)>=0)return c()}function l(e,t){if(-1===d.indexOf(e))return t=t||"IDENTIFIER",p()&&p().value===e&&p().type===t?c():void 0}function c(){var n=e.shift();return t.push(n),r=n,o(),n}function m(n,r){for(var a=[],i=f(0,!0);!(null!=r&&i.type===r||null!=n&&i.value===n||"EOF"===i.type);){var u=e.shift();t.push(u),a.push(i),i=f(0,!0)}return o(),a}function f(t,n){var r,o=0;do{if(!n)for(;e[o]&&"WHITESPACE"===e[o].type;)o++;r=e[o],t--,o++}while(t>-1);return r||{type:"EOF",value:"<<<EOF>>>"}}function p(){return f(0)}var d=[];return{pushFollow:function(e){d.push(e)},popFollow:function(){d.pop()},clearFollow:function(){var e=d;return d=[],e},restoreFollow:function(e){d=e},matchAnyToken:function(e,t,n){for(var r=0;r<arguments.length;r++){var o=arguments[r],a=l(o);if(a)return a}},matchAnyOpToken:function(e,t,n){for(var r=0;r<arguments.length;r++){var o=arguments[r],a=i(o);if(a)return a}},matchOpToken:i,requireOpToken:function(e){var t=i(e);if(t)return t;a(this,"Expected '"+e+"' but found '"+p().value+"'")},matchTokenType:s,requireTokenType:function(e,t,n,r){var o=s(e,t,n,r);if(o)return o;a(this,"Expected one of "+JSON.stringify([e,t,n]))},consumeToken:c,matchToken:l,requireToken:function(e,t){var n=l(e,t);if(n)return n;a(this,"Expected '"+e+"' but found '"+p().value+"'")},list:e,consumed:t,source:n,hasMore:function(){return e.length>0},currentToken:p,lastMatch:function(){return r},token:f,consumeUntil:m,consumeUntilWhitespace:function(){return m(null,"WHITESPACE")},lastWhitespace:function(){return t[t.length-1]&&"WHITESPACE"===t[t.length-1].type?t[t.length-1].value:""},sourceFor:function(){return n.substring(this.startToken.start,this.endToken.end)},lineFor:function(){return n.split("\n")[this.startToken.line-1]}}}function c(e){if(e.length>0){var t=e[e.length-1];if("IDENTIFIER"===t.type||"CLASS_REF"===t.type||"ID_REF"===t.type)return!1;if(t.op&&(">"===t.value||")"===t.value))return!1}return!0}return{tokenize:function(u,m){var f,p=[],d=u,h=0,v=0,E=1,T="<START>",y=0;function k(){return m&&0===y}for(;h<d.length;)if("-"!==C()||"-"!==R()||!r(A())&&""!==A())if(r(C()))p.push(P());else if(M()||"."!==C()||!i(R())&&"{"!==R())if(M()||"#"!==C()||!i(R())&&"{"!==R())if("["===C()&&"@"===R())p.push(w());else if("@"===C())p.push(q());else if(i(C())||!k()&&s(C()))p.push(S());else if(a(C()))p.push(L());else if(k()||'"'!==C()&&"`"!==C())if(k()||"'"!==C()){if(e[C()])"$"===T&&"{"===C()&&y++,"}"===C()&&y--,p.push(O());else if(k()||"`"===(f=C())||"^"===f)p.push(g("RESERVED",F()));else if(h<d.length)throw Error("Unknown token: "+C()+" ")}else c(p)?p.push(I()):p.push(O());else p.push(I());else p.push(N());else p.push(b());else x();return l(p,[],d);function g(e,t){return{type:e,value:t,start:h,end:h+1,column:v,line:E}}function x(){for(;C()&&!o(C());)F();F()}function b(){var e=g("CLASS_REF"),n=F();if("{"===C()){for(e.template=!0,n+=F();C()&&"}"!==C();)n+=F();if("}"!==C())throw Error("Unterminated class reference");n+=F()}else for(;t(C());)n+=F();return e.value=n,e.end=h,e}function w(){for(var e=g("ATTRIBUTE_REF"),t=F();h<d.length&&"]"!==C();)t+=F();return"]"===C()&&(t+=F()),e.value=t,e.end=h,e}function q(){for(var e=g("ATTRIBUTE_REF"),t=F();n(C());)t+=F();return e.value=t,e.end=h,e}function N(){var e=g("ID_REF"),t=F();if("{"===C()){for(e.template=!0,t+=F();C()&&"}"!==C();)t+=F();if("}"!==C())throw Error("Unterminated id reference");F()}else for(;n(C());)t+=F();return e.value=t,e.end=h,e}function S(){for(var e=g("IDENTIFIER"),t=F();i(C())||s(C());)t+=F();return e.value=t,e.end=h,e}function L(){for(var e=g("NUMBER"),t=F();a(C());)t+=F();for("."===C()&&a(R())&&(t+=F());a(C());)t+=F();return e.value=t,e.end=h,e}function O(){for(var t=(r=void 0,(r=g(void 0,void 0)).op=!0,r),n=F();C()&&e[n+C()];)n+=F();var r;return t.type=e[n],t.value=n,t.end=h,t}function I(){for(var e,t=g("STRING"),n=F(),r="";C()&&C()!==n;)"\\"===C()&&F(),r+=F();if(C()!==n)throw Error("Unterminated string at [Line: "+(e=t).line+", Column: "+e.column+"]");return F(),t.value=r,t.end=h,t.template="`"===n,t}function C(){return d.charAt(h)}function R(){return d.charAt(h+1)}function A(){return d.charAt(h+2)}function F(){return T=C(),h++,v++,T}function M(){return i(T)||a(T)||")"===T||"}"===T||"]"===T}function P(){for(var e=g("WHITESPACE"),t="";C()&&r(C());)o(C())&&(v=0,E++),t+=F();return e.value=t,e.end=h,e}},makeTokensObject:l}}(),u=function(){var e={},t={},n={},r=[],o=[];function a(e,t,n){e.startToken=t,e.sourceFor=n.sourceFor,e.lineFor=n.lineFor,e.programSource=n.source}function i(t,n,r){var o=e[t];if(o){var i=n.currentToken(),s=o(u,l,n,r);if(s)for(a(s,i,n),s.endToken=s.endToken||n.lastMatch(),r=s.root;null!=r;)a(r,i,n),r=r.root;return s}}function s(e,t,n,r){var o=i(e,t,r);return o||f(t,n||"Expected "+e),o}function c(e,t){for(var n=0;n<e.length;n++){var r=i(e[n],t);if(r)return r}}function m(t,n){e[t]=n}function f(e,t){t=(t||"Unexpected Token : "+e.currentToken().value)+"\n\n"+function(e){var t=e.currentToken(),n=e.source.split("\n"),r=n[t&&t.line?t.line-1:n.length-1];return r+"\n"+" ".repeat(t&&t.line?t.column:r.length-1)+"^^\n\n"}(e);var n=new Error(t);throw n.tokens=e,n}function p(e){return t[e.value]}function d(e){return n[e.value]}return m("feature",function(e,t,r){if(r.matchOpToken("(")){var o=e.requireElement("feature",r);return r.requireOpToken(")"),o}var a=n[r.currentToken().value];if(a)return a(e,t,r)}),m("command",function(e,n,r){if(r.matchOpToken("(")){const t=e.requireElement("command",r);return r.requireOpToken(")"),t}var o=t[r.currentToken().value];let a;return o?a=o(e,n,r):"IDENTIFIER"===r.currentToken().type&&"("===r.token(1).value&&(a=e.requireElement("pseudoCommand",r)),a?e.parseElement("indirectStatement",r,a):a}),m("commandList",function(e,t,n){var r=e.parseElement("command",n);if(r){n.matchToken("then");const t=e.parseElement("commandList",n);return t&&(r.next=t),r}}),m("leaf",function(e,t,n){var o=c(r,n);return null==o?i("symbol",n):o}),m("indirectExpression",function(e,t,n,r){for(var a=0;a<o.length;a++){var i=o[a];r.endToken=n.lastMatch();var u=e.parseElement(i,n,r);if(u)return u}return r}),m("indirectStatement",function(e,t,n,r){if(n.matchToken("unless")){r.endToken=n.lastMatch();var o={type:"unlessStatementModifier",args:[e.requireElement("expression",n)],op:function(e,t){return t?this.next:r},execute:function(e){return t.unifiedExec(this,e)}};return r.parent=o,o}return r}),m("primaryExpression",function(e,t,n){var r=e.parseElement("leaf",n);if(r)return e.parseElement("indirectExpression",n,r);e.raiseParseError(n,"Unexpected value: "+n.currentToken().value)}),{setParent:function e(t,n){t&&(t.parent=n,e(t.next,n))},requireElement:s,parseElement:i,featureStart:d,commandStart:p,commandBoundary:function(e){return!("end"!=e.value&&"then"!=e.value&&"else"!=e.value&&")"!=e.value&&!p(e)&&!d(e)&&"EOF"!=e.type)},parseAnyOf:c,parseHyperScript:function(e){var t=i("hyperscript",e);if(e.hasMore()&&f(e),t)return t},raiseParseError:f,addGrammarElement:m,addCommand:function(n,r){var o=n+"Command",a=function(e,t,n){const a=r(e,t,n);if(a)return a.type=o,a.execute=function(e){return e.meta.command=a,t.unifiedExec(this,e)},a};e[o]=a,t[n]=a},addFeature:function(t,r){var o=t+"Feature",a=function(e,n,a){var i=r(e,n,a);if(i)return i.keyword=t,i.type=o,i};e[o]=a,n[t]=a},addLeafExpression:function(e,t){r.push(e),m(e,t)},addIndirectExpression:function(e,t){o.push(e),m(e,t)},parseStringTemplate:function(e){var t=[""];do{if(t.push(e.lastWhitespace()),"$"===e.currentToken().value){e.consumeToken();var n=e.matchOpToken("{");t.push(s("expression",e)),n&&e.requireOpToken("}"),t.push("")}else if("\\"===e.currentToken().value)e.consumeToken(),e.consumeToken();else{var r=e.consumeToken();t[t.length-1]+=r?r.value:""}}while(e.hasMore());return t.push(e.lastWhitespace()),t}}}(),s={dynamicResolvers:[],String:function(e){return e.toString?e.toString():""+e},Int:function(e){return parseInt(e)},Float:function(e){return parseFloat(e)},Number:function(e){return console.log(e),Number(e)},Date:function(e){return new Date(e)},Array:function(e){return Array.from(e)},JSON:function(e){return JSON.stringify(e)},Object:function(t){return t instanceof String&&(t=t.toString()),"string"==typeof t?JSON.parse(t):e({},t)}},l=function(){function n(e,t){var n=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return n&&n.call(e,t)}function c(e,t,n){(n=n||{}).sentBy=e;var r=function(e,t){var n;return o.Event&&"function"==typeof o.Event?(n=new Event(e,{bubbles:!0,cancelable:!0})).detail=t:(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,t),n}(t,n);return e.dispatchEvent(r)}function m(e){return Array.isArray(e)||"undefined"!=typeof NodeList&&e instanceof NodeList}function f(e){return e instanceof a||m(e)}function p(e,t){if(null==e);else if(function(e){return"object"==typeof e&&Symbol.iterator in e&&"function"==typeof e[Symbol.iterator]}(e))for(const n of e)t(n);else if(m(e))for(var n=0;n<e.length;n++)t(e[n]);else t(e)}var d={array_sentinel:!0};function h(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.asyncWrapper&&(e[t]=n.value),Array.isArray(n))for(var r=0;r<n.length;r++){var o=n[r];o.asyncWrapper&&(n[r]=o.value)}}}var v={};function E(e,t){for(;;){try{var n=T(e,t)}catch(r){if(l.registerHyperTrace(t,r),t.meta.errorHandler&&!t.meta.handlingError){t.meta.handlingError=!0,t[t.meta.errorSymmbol]=r,e=t.meta.errorHandler;continue}if(!t.meta.reject)throw r;t.meta.reject(r),n=v}if(null==n)return void console.error(e," did not return a next element to execute! context: ",t);if(n.then)return void n.then(function(e){E(e,t)}).catch(function(e){if(l.registerHyperTrace(t,e),t.meta.errorHandler&&!t.meta.handlingError)t.meta.handlingError=!0,t[t.meta.errorSymmbol]=e,E(t.meta.errorHandler,t);else{if(!t.meta.reject)throw e;t.meta.reject(e)}});if(n===v)return;e=n}}function T(e,t){var n=[t],r=!1,o=!1;if(e.args)for(var a=0;a<e.args.length;a++){var i=e.args[a];if(null==i)n.push(null);else if(Array.isArray(i)){for(var u=[],s=0;s<i.length;s++){var l=i[s];(c=l?l.evaluate(t):null)&&(c.then?r=!0:c.asyncWrapper&&(o=!0)),u.push(c)}n.push(u)}else if(i.evaluate){var c;(c=i.evaluate(t))&&(c.then?r=!0:c.asyncWrapper&&(o=!0)),n.push(c)}else n.push(i)}return r?new Promise(function(r,a){var i=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(Array.isArray(r)){t.push(d);for(var o=0;o<r.length;o++)t.push(r[o]);t.push(d)}else t.push(r)}return t}(n);Promise.all(i).then(function(t){t=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(r===d){r=e[++n];var o=[];for(t.push(o);r!==d;)o.push(r),r=e[++n]}else t.push(r)}return t}(t),o&&h(t);try{var n=e.op.apply(e,t);r(n)}catch(e){a(e)}}).catch(function(e){t.meta.errorHandler&&!t.meta.handlingError?(t.meta.handlingError=!0,t[t.meta.errorSymmbol]=e,E(t.meta.errorHandler,t)):t.meta.reject&&t.meta.reject(e)})}):(o&&h(n),e.op.apply(e,n))}let y=null;function k(){return null==y&&(y=r.config.attributes.replace(/ /g,"").split(",")),y}function g(e){for(var t=0;t<k().length;t++){var n=k()[t];if(e.hasAttribute&&e.hasAttribute(n))return e.getAttribute(n)}return e instanceof HTMLScriptElement&&"text/hyperscript"===e.type?e.innerText:null}var x=new WeakMap;function b(e){var t=x.get(e);return void 0===t&&x.set(e,t={}),t}function w(t,n){t&&(e(n,b(t)),w(t.parentElement,n))}function q(e,t,n,r){var a={meta:{parser:u,lexer:i,runtime:l,owner:e,feature:t,iterators:{}},me:n,event:r,target:r?r.target:null,detail:r?r.detail:null,body:"document"in o?document.body:null};return a.meta.ctx=a,w(e,a),a}function N(e){var t=i.tokenize(e);if(u.commandStart(t.currentToken())){for(var n=u.requireElement("commandList",t),r=n;r.next;)r=r.next;return r.next={op:function(){return v}},n}return u.featureStart(t.currentToken())?u.requireElement("hyperscript",t):u.requireElement("expression",t)}function S(e,t){if(!e.closest||!e.closest(r.config.disableSelector)){var n=O(e);if(!n.initialized){var o=g(e);if(o)try{n.initialized=!0,n.script=o;var a=i.tokenize(o),s=u.parseHyperScript(a);if(!s)return;s.apply(t||e,e),setTimeout(function(){c(t||e,"load",{hyperscript:!0})},1)}catch(t){l.triggerEvent(e,"exception",{error:t}),console.error("hyperscript errors were found on the following element:",e,"\n\n",t.message,t.stack)}}}}var L=new WeakMap;function O(e){var t=L.get(e);return void 0===t&&L.set(e,t={}),t}function I(e){var n=e.meta&&e.meta.owner;if(n){var r=O(n),o="elementScope";return e.meta.feature&&e.meta.feature.behavior&&(o=e.meta.feature.behavior+"Scope"),t(r,o)}return{}}return{typeCheck:function(e,t,n){return!(null!=e||!n)||Object.prototype.toString.call(e).slice(8,-1)===t},forEach:p,implicitLoop:function(e,t){if(f(e))for(const n of e)t(n);else t(e)},triggerEvent:c,matchesSelector:n,getScript:g,processNode:function(e){var t=l.getScriptSelector();n(e,t)&&S(e,e),e instanceof HTMLScriptElement&&"text/hyperscript"===e.type&&S(e,document.body),e.querySelectorAll&&p(e.querySelectorAll(t+", [type='text/hyperscript']"),function(e){S(e,e instanceof HTMLScriptElement&&"text/hyperscript"===e.type?document.body:e)})},evaluate:function(t,n,r){class a extends EventTarget{constructor(e){super(),this.module=e}toString(){return this.module.id}}var i="document"in o?o.document.body:new a(r&&r.module);n=e(q(i,null,i,null),n||{});var u=N(t);return u.execute?(u.execute(n),n.result):u.apply?(u.apply(i,i,r),b(i)):u.evaluate(n)},evaluateNoPromise:function(e,t){let n=e.evaluate(t);if(n.next)throw new Error(e.sourceFor()+" returned a Promise in a context that they are not allowed.");return n},parse:N,getScriptSelector:function(){return k().map(function(e){return"["+e+"]"}).join(", ")},resolveSymbol:function(e,t,n){if("me"===e||"my"===e||"I"===e)return t.me;if("it"===e||"its"===e)return t.result;if("you"===e||"your"===e||"yourself"===e)return t.beingTold;if("global"===n)return o[e];if("element"===n)return I(t)[e];if("local"===n)return t[e];if(t.meta&&t.meta.context){var r=t.meta.context[e];if(void 0!==r)return r}var a=t[e];return void 0!==a||void 0!==(a=I(t)[e])?a:o[e]},setSymbol:function(e,t,n,r){if("global"===n)o[e]=r;else if("element"===n)(a=I(t))[e]=r;else if("local"===n)t[e]=r;else{var a,i=t[e];void 0!==i?t[e]=r:void 0!==(i=(a=I(t))[e])?a[e]=r:t[e]=r}},makeContext:q,findNext:function e(t,n){if(t)return t.resolveNext?t.resolveNext(n):t.next?t.next:e(t.parent,n)},unifiedEval:T,convertValue:function(e,t){for(var n=s.dynamicResolvers,r=0;r<n.length;r++){var o=(0,n[r])(t,e);if(void 0!==o)return o}if(null==e)return null;var a=s[t];if(a)return a(e);throw"Unknown conversion : "+t},unifiedExec:E,resolveProperty:function(e,t,n){if(null!=e){var r=n&&e.getAttribute?e.getAttribute(t):e[t];if(void 0!==r)return r;if(f(e)){var o=[];for(var a of e){var i=n?a.getAttribute(t):a[t];i&&o.push(i)}return o}}},assignToNamespace:function(e,t,n,r){let a;for(a="undefined"!=typeof document&&e===document.body?o:b(e);t.length>0;){var i=t.shift(),u=a[i];null==u&&(a[i]=u={}),a=u}a[n]=r},registerHyperTrace:function(e,t){for(var n=[],r=null;null!=e;)n.push(e),r=e,e=e.meta.caller;null==r.meta.traceMap&&(r.meta.traceMap=new Map),r.meta.traceMap.get(t)||r.meta.traceMap.set(t,{trace:n,print:function(e){(e=e||console.error)("hypertrace /// ");for(var t=0,r=0;r<n.length;r++)t=Math.max(t,n[r].meta.feature.displayName.length);for(r=0;r<n.length;r++){var o=n[r];e("  ->",o.meta.feature.displayName.padEnd(t+2),"-",o.meta.owner)}}})},getHyperTrace:function(e,t){for(var n=e;n.meta.caller;)n=n.meta.caller;if(n.meta.traceMap)return n.meta.traceMap.get(t,[])},getInternalData:O,getHyperscriptFeatures:b,escapeSelector:function(e){return e.replace(/:/g,function(e){return"\\"+e})},nullCheck:function(e,t){if(null==e)throw new Error(t.sourceFor()+" is null")},isEmpty:function(e){return null==e||0===e.length},getRootNode:function(e){var t=e.getRootNode();return t instanceof Document||t instanceof ShadowRoot?t:document},hyperscriptUrl:"document"in o?import.meta.url:null,HALT:v}}();{u.addLeafExpression("parenthesized",function(e,t,n){if(n.matchOpToken("(")){var r=n.clearFollow();try{var o=e.requireElement("expression",n)}finally{n.restoreFollow(r)}return n.requireOpToken(")"),o}}),u.addLeafExpression("string",function(e,t,n){var r=n.matchTokenType("STRING");if(r){var o,a=r.value;if(r.template){var u=i.tokenize(a,!0);o=e.parseStringTemplate(u)}else o=[];return{type:"string",token:r,args:o,op:function(e){for(var t="",n=1;n<arguments.length;n++){var r=arguments[n];void 0!==r&&(t+=r)}return t},evaluate:function(e){return 0===o.length?a:t.unifiedEval(this,e)}}}}),u.addGrammarElement("nakedString",function(e,t,n){if(n.hasMore()){var r=n.consumeUntilWhitespace();return n.matchTokenType("WHITESPACE"),{type:"nakedString",tokens:r,evaluate:function(e){return r.map(function(e){return e.value}).join("")}}}}),u.addLeafExpression("number",function(e,t,n){var r=n.matchTokenType("NUMBER");if(r){var o=r,a=parseFloat(r.value);return{type:"number",value:a,numberToken:o,evaluate:function(){return a}}}}),u.addLeafExpression("idRef",function(e,t,n){var r=n.matchTokenType("ID_REF");if(r){if(r.template){var o=r.value.substr(2,r.value.length-2),a=i.tokenize(o);return{type:"idRefTemplate",args:[e.requireElement("expression",a)],op:function(e,n){return t.getRootNode(e.me).getElementById(n)},evaluate:function(e){return t.unifiedEval(this,e)}}}{const e=r.value.substr(1);return{type:"idRef",css:r.value,value:e,evaluate:function(n){return t.getRootNode(n.me).getElementById(e)}}}}}),u.addLeafExpression("classRef",function(e,t,n){var r=n.matchTokenType("CLASS_REF");if(r){if(r.template){var o=r.value.substr(2,r.value.length-2),u=i.tokenize(o);return{type:"classRefTemplate",args:[e.requireElement("expression",u)],op:function(e,t){return new a("."+t,e.me)},evaluate:function(e){return t.unifiedEval(this,e)}}}{const e=r.value;return{type:"classRef",css:e,evaluate:function(t){return new a(e,t.me)}}}}});class r extends a{constructor(e,t,n){super(e,t),this.templateParts=n,this.elements=n.filter(e=>e instanceof Element)}get css(){let e="",t=0;for(const n of this.templateParts)n instanceof Element?e+="[data-hs-query-id='"+t+++"']":e+=n;return e}[Symbol.iterator](){this.elements.forEach((e,t)=>e.dataset.hsQueryId=t);const e=super[Symbol.iterator]();return this.elements.forEach(e=>e.removeAttribute("data-hs-query-id")),e}}u.addLeafExpression("queryRef",function(e,t,n){if(n.matchOpToken("<")){var o=n.consumeUntil("/");n.requireOpToken("/"),n.requireOpToken(">");var u=o.map(function(e){return"STRING"===e.type?'"'+e.value+'"':e.value}).join("");if(u.indexOf("$")>=0)var s=!0,l=i.tokenize(u,!0),c=e.parseStringTemplate(l);return{type:"queryRef",css:u,args:c,op:function(e,...t){return s?new r(u,e.me,t):new a(u,e.me)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addLeafExpression("attributeRef",function(e,t,n){var r=n.matchTokenType("ATTRIBUTE_REF");if(r){var o=r.value;if(0===o.indexOf("["))var a=o.substring(2,o.length-1);else a=o.substring(1);var i="["+a+"]",u=a.split("="),s=u[0],l=u[1];return l&&0===l.indexOf('"')&&(l=l.substring(1,l.length-1)),{type:"attributeRef",name:s,css:i,value:l,op:function(e){var t=e.beingTold||e.me;if(t)return t.getAttribute(s)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("objectKey",function(e,t,n){var r;if(r=n.matchTokenType("STRING"))return{type:"objectKey",key:r.value,evaluate:function(){return r.value}};if(n.matchOpToken("[")){var o=e.parseElement("expression",n);return n.requireOpToken("]"),{type:"objectKey",expr:o,args:[o],op:function(e,t){return t},evaluate:function(e){return t.unifiedEval(this,e)}}}var a="";do{(r=n.matchTokenType("IDENTIFIER")||n.matchOpToken("-"))&&(a+=r.value)}while(r);return{type:"objectKey",key:a,evaluate:function(){return a}}}),u.addLeafExpression("objectLiteral",function(e,t,n){if(n.matchOpToken("{")){var r=[],o=[];if(!n.matchOpToken("}")){do{var a=e.requireElement("objectKey",n);n.requireOpToken(":");var i=e.requireElement("expression",n);o.push(i),r.push(a)}while(n.matchOpToken(","));n.requireOpToken("}")}return{type:"objectLiteral",args:[r,o],op:function(e,t,n){for(var r={},o=0;o<t.length;o++)r[t[o]]=n[o];return r},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("nakedNamedArgumentList",function(e,t,n){var r=[],o=[];if("IDENTIFIER"===n.currentToken().type)do{var a=n.requireTokenType("IDENTIFIER");n.requireOpToken(":");var i=e.requireElement("expression",n);o.push(i),r.push({name:a,value:i})}while(n.matchOpToken(","));return{type:"namedArgumentList",fields:r,args:[o],op:function(e,t){for(var n={_namedArgList_:!0},o=0;o<t.length;o++)n[r[o].name.value]=t[o];return n},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addGrammarElement("namedArgumentList",function(e,t,n){if(n.matchOpToken("(")){var r=e.requireElement("nakedNamedArgumentList",n);return n.requireOpToken(")"),r}}),u.addGrammarElement("symbol",function(e,t,n){var r="default";n.matchToken("global")?r="global":n.matchToken("element")||n.matchToken("module")?(r="element",n.matchOpToken("'")&&n.requireToken("s")):n.matchToken("local")&&(r="local");let o=n.matchOpToken(":"),a=n.matchTokenType("IDENTIFIER");if(a){var i=a.value;return o&&(i=":"+i),"default"===r&&(0===i.indexOf("$")&&(r="global"),0===i.indexOf(":")&&(r="element")),{type:"symbol",token:a,scope:r,name:i,evaluate:function(e){return t.resolveSymbol(i,e,r)}}}}),u.addGrammarElement("implicitMeTarget",function(e,t,n){return{type:"implicitMeTarget",evaluate:function(e){return e.beingTold||e.me}}}),u.addLeafExpression("boolean",function(e,t,n){var r=n.matchToken("true")||n.matchToken("false");if(!r)return;const o="true"===r.value;return{type:"boolean",evaluate:function(e){return o}}}),u.addLeafExpression("null",function(e,t,n){if(n.matchToken("null"))return{type:"null",evaluate:function(e){return null}}}),u.addLeafExpression("arrayLiteral",function(e,t,n){if(n.matchOpToken("[")){var r=[];if(!n.matchOpToken("]")){do{var o=e.requireElement("expression",n);r.push(o)}while(n.matchOpToken(","));n.requireOpToken("]")}return{type:"arrayLiteral",values:r,args:[r],op:function(e,t){return t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addLeafExpression("blockLiteral",function(e,t,n){if(n.matchOpToken("\\")){var r=[],o=n.matchTokenType("IDENTIFIER");if(o)for(r.push(o);n.matchOpToken(",");)r.push(n.requireTokenType("IDENTIFIER"));n.requireOpToken("-"),n.requireOpToken(">");var a=e.requireElement("expression",n);return{type:"blockLiteral",args:r,expr:a,evaluate:function(e){return function(){for(var t=0;t<r.length;t++)e[r[t].value]=arguments[t];return a.evaluate(e)}}}}}),u.addGrammarElement("timeExpression",function(e,t,n){var r=e.requireElement("expression",n),o=1;return n.matchToken("s")||n.matchToken("seconds")?o=1e3:n.matchToken("ms")||n.matchToken("milliseconds"),{type:"timeExpression",time:r,factor:o,args:[r],op:function(e,t){return t*o},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addIndirectExpression("propertyAccess",function(e,t,n,r){if(n.matchOpToken(".")){var o=n.requireTokenType("IDENTIFIER");return e.parseElement("indirectExpression",n,{type:"propertyAccess",root:r,prop:o,args:[r],op:function(e,n){return t.resolveProperty(n,o.value,!1)},evaluate:function(e){return t.unifiedEval(this,e)}})}}),u.addIndirectExpression("of",function(e,t,n,r){if(n.matchToken("of")){for(var o=e.requireElement("expression",n),a=null,i=r;i.root;)a=i,i=i.root;"symbol"!==i.type&&"attributeRef"!==i.type&&e.raiseParseError(n,"Cannot take a property of a non-symbol: "+i.type);var u="attributeRef"===i.type,s=i.name,l={type:"ofExpression",prop:i.token,root:o,attribute:u,expression:r,args:[o],op:function(e,n){return t.resolveProperty(n,s,u)},evaluate:function(e){return t.unifiedEval(this,e)}};return"attributeRef"===i.type&&(l.attribute=i),a?(a.root=l,a.args=[l]):r=l,e.parseElement("indirectExpression",n,r)}}),u.addIndirectExpression("possessive",function(e,t,n,r){if(!e.possessivesDisabled){var o=n.matchOpToken("'");if(o||"symbol"===r.type&&("my"===r.name||"its"===r.name||"your"===r.name)&&"IDENTIFIER"===n.currentToken().type){o&&n.requireToken("s");var a=e.parseElement("attributeRef",n);if(null==a)var i=n.requireTokenType("IDENTIFIER");return e.parseElement("indirectExpression",n,{type:"possessive",root:r,attribute:a,prop:i,args:[r],op:function(e,n){if(a)var r=t.resolveProperty(n,a.name,!0);else r=t.resolveProperty(n,i.value,!1);return r},evaluate:function(e){return t.unifiedEval(this,e)}})}}}),u.addIndirectExpression("inExpression",function(e,t,n,r){if(n.matchToken("in")){if("idRef"!==r.type&&"queryRef"===r.type||"classRef"===r.type)var o=!0;var a=e.requireElement("expression",n),i={type:"inExpression",root:r,args:[o?null:r,a],op:function(e,n,a){var i=[];return o?t.forEach(a,function(e){for(var t=e.querySelectorAll(r.css),n=0;n<t.length;n++)i.push(t[n])}):t.forEach(n,function(e){t.forEach(a,function(t){e===t&&i.push(e)})}),i.length>0?i:null},evaluate:function(e){return t.unifiedEval(this,e)}};return e.parseElement("indirectExpression",n,i)}}),u.addIndirectExpression("asExpression",function(e,t,n,r){if(n.matchToken("as")){n.matchToken("a")||n.matchToken("an");var o=e.requireElement("dotOrColonPath",n).evaluate();return e.parseElement("indirectExpression",n,{type:"asExpression",root:r,args:[r],op:function(e,n){return t.convertValue(n,o)},evaluate:function(e){return t.unifiedEval(this,e)}})}}),u.addIndirectExpression("functionCall",function(e,t,n,r){if(n.matchOpToken("(")){var o=[];if(!n.matchOpToken(")")){do{o.push(e.requireElement("expression",n))}while(n.matchOpToken(","));n.requireOpToken(")")}if(r.root)var a={type:"functionCall",root:r,argExressions:o,args:[r.root,o],op:function(e,n,o){t.nullCheck(n,r.root);var a=n[r.prop.value];return t.nullCheck(a,r),a.hyperfunc&&o.push(e),a.apply(n,o)},evaluate:function(e){return t.unifiedEval(this,e)}};else a={type:"functionCall",root:r,argExressions:o,args:[r,o],op:function(e,n,o){return t.nullCheck(n,r),n.hyperfunc&&o.push(e),n.apply(null,o)},evaluate:function(e){return t.unifiedEval(this,e)}};return e.parseElement("indirectExpression",n,a)}}),u.addIndirectExpression("attributeRefAccess",function(e,t,n,r){var o=e.parseElement("attributeRef",n);if(o)return{type:"attributeRefAccess",root:r,attribute:o,args:[r],op:function(e,n){return t.resolveProperty(n,o.name,!0)},evaluate:function(e){return l.unifiedEval(this,e)}}}),u.addIndirectExpression("arrayIndex",function(e,t,n,r){if(n.matchOpToken("[")){var o=!1,a=!1,i=null,s=null;n.matchOpToken("..")?(o=!0,i=e.requireElement("expression",n)):(i=e.requireElement("expression",n),n.matchOpToken("..")&&(a=!0,"R_BRACKET"!==n.currentToken().type&&(s=e.parseElement("expression",n)))),n.requireOpToken("]");var c={type:"arrayIndex",root:r,firstIndex:i,secondIndex:s,args:[r,i,s],op:function(e,t,n,r){return o?t.slice(0,n+1):a?null!=r?t.slice(n,r+1):t.slice(n):t[n]},evaluate:function(e){return l.unifiedEval(this,e)}};return u.parseElement("indirectExpression",n,c)}}),u.addGrammarElement("postfixExpression",function(e,t,n){var r=e.parseElement("primaryExpression",n);if(n.matchOpToken(":")){var o=n.requireTokenType("IDENTIFIER"),a=!n.matchOpToken("!");return{type:"typeCheck",typeName:o,nullOk:a,args:[r],op:function(e,n){if(t.typeCheck(n,o.value,a))return n;throw new Error("Typecheck failed!  Expected: "+o.value)},evaluate:function(e){return t.unifiedEval(this,e)}}}return r}),u.addGrammarElement("logicalNot",function(e,t,n){if(n.matchToken("not")){var r=e.requireElement("unaryExpression",n);return{type:"logicalNot",root:r,args:[r],op:function(e,t){return!t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("noExpression",function(e,t,n){if(n.matchToken("no")){var r=e.requireElement("unaryExpression",n);return{type:"noExpression",root:r,args:[r],op:function(e,n){return t.isEmpty(n)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("negativeNumber",function(e,t,n){if(n.matchOpToken("-")){var r=e.requireElement("unaryExpression",n);return{type:"negativeNumber",root:r,args:[r],op:function(e,t){return-1*t},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("unaryExpression",function(e,t,n){return e.parseAnyOf(["logicalNot","relativePositionalExpression","positionalExpression","noExpression","negativeNumber","postfixExpression"],n)});var c=function(e,t,n,r){var o=[];l.forEach(t,function(t){(t.matches(n)||t===e)&&o.push(t)});for(var a=0;a<o.length-1;a++)if(o[a]===e)return o[a+1];if(r){var i=o[0];if(i&&i.matches(n))return i}};function m(e,t,n){if(t.contains)return t.contains(n);if(t.includes)return t.includes(n);throw Error("The value of "+e.sourceFor()+" does not have a contains or includes method on it")}function f(e,t,n){if(t.match)return!!t.match(n);if(t.matches)return t.matches(n);throw Error("The value of "+e.sourceFor()+" does not have a match or matches method on it")}u.addGrammarElement("relativePositionalExpression",function(e,t,n){var r=n.matchAnyToken("next","previous");if(r){if("next"===r.value)var o=!0;var a=e.parseElement("expression",n);if(n.matchToken("from")){n.pushFollow("in");try{var i=e.requireElement("expression",n)}finally{n.popFollow()}}else i=e.requireElement("implicitMeTarget",n);var u,s=!1;if(n.matchToken("in")){s=!0;var l=e.requireElement("expression",n)}else u=n.matchToken("within")?e.requireElement("expression",n):document.body;var m=!1;return n.matchToken("with")&&(n.requireToken("wrapping"),m=!0),{type:"relativePositionalExpression",from:i,forwardSearch:o,inSearch:s,wrapping:m,inElt:l,withinElt:u,operator:r.value,args:[a,i,l,u],op:function(e,t,n,r,a){var i,u,l=t.css;if(null==l)throw"Expected a CSS value";if(s){if(r)return o?c(n,r,l,m):(i=l,u=m,c(n,Array.from(r).reverse(),i,u))}else if(a)return o?function(e,t,n,r){for(var o=t.querySelectorAll(n),a=0;a<o.length;a++){var i=o[a];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_PRECEDING)return i}if(r)return o[0]}(n,a,l,m):function(e,t,n,r){for(var o=t.querySelectorAll(n),a=o.length-1;a>=0;a--){var i=o[a];if(i.compareDocumentPosition(e)===Node.DOCUMENT_POSITION_FOLLOWING)return i}if(r)return o[o.length-1]}(n,a,l,m)},evaluate:function(e){return t.unifiedEval(this,e)}}}}),u.addGrammarElement("positionalExpression",function(e,t,n){var r=n.matchAnyToken("first","last","random");if(!r)return;n.matchAnyToken("in","from","of");var o=e.requireElement("unaryExpression",n);const a=r.value;return{type:"positionalExpression",rhs:o,operator:r.value,args:[o],op:function(e,t){if(t&&!Array.isArray(t)&&(t=t.children?t.children:Array.from(t)),t){if("first"===a)return t[0];if("last"===a)return t[t.length-1];if("random"===a)return t[Math.floor(Math.random()*t.length)]}},evaluate:function(e){return t.unifiedEval(this,e)}}}),u.addGrammarElement("mathOperator",function(e,t,n){var r,o=e.parseElement("unaryExpression",n),a=null;for(r=n.matchAnyOpToken("+","-","*","/","%");r;){var i=r.value;(a=a||r).value!==i&&e.raiseParseError(n,"You must parenthesize math operations with different operators");var u=e.parseElement("unaryExpression",n);o={type:"mathOperator",lhs:o,rhs:u,operator:i,args:[o,u],op:function(e,t,n){return"+"===i?t+n:"-"===i?t-n:"*"===i?t*n:"/"===i?t/n:"%"===i?t%n:void 0},evaluate:function(e){return t.unifiedEval(this,e)}},r=n.matchAnyOpToken("+","-","*","/","%")}return o}),u.addGrammarElement("mathExpression",function(e,t,n){return e.parseAnyOf(["mathOperator","unaryExpression"],n)}),u.addGrammarElement("comparisonOperator",function(e,t,n){var r=e.parseElement("mathExpression",n),o=n.matchAnyOpToken("<",">","<=",">=","==","===","!=","!=="),a=o?o.value:null,i=!0,u=!1;if(null==a&&(n.matchToken("is")||n.matchToken("am")?n.matchToken("not")?n.matchToken("in")?a="not in":n.matchToken("a")?(a="not a",u=!0):n.matchToken("empty")?(a="not empty",i=!1):a="!=":n.matchToken("in")?a="in":n.matchToken("a")?(a="a",u=!0):n.matchToken("empty")?(a="empty",i=!1):n.matchToken("less")?(n.requireToken("than"),n.matchToken("or")?(n.requireToken("equal"),n.requireToken("to"),a="<="):a="<"):n.matchToken("greater")?(n.requireToken("than"),n.matchToken("or")?(n.requireToken("equal"),n.requireToken("to"),a=">="):a=">"):a="==":n.matchToken("matches")||n.matchToken("match")?a="match":n.matchToken("contains")||n.matchToken("contain")?a="contain":n.matchToken("includes")||n.matchToken("include")?a="include":(n.matchToken("do")||n.matchToken("does"))&&(n.requireToken("not"),n.matchToken("matches")||n.matchToken("match")?a="not match":n.matchToken("contains")||n.matchToken("contain")?a="not contain":n.matchToken("include")?a="not include":e.raiseParseError(n,"Expected matches or contains"))),a){if(u)var s=n.requireTokenType("IDENTIFIER"),l=!n.matchOpToken("!");else if(i){var c=e.requireElement("mathExpression",n);"match"!==a&&"not match"!==a||(c=c.css?c.css:c)}var p=r;r={type:"comparisonOperator",operator:a,typeName:s,nullOk:l,lhs:r,rhs:c,args:[r,c],op:function(e,n,r){if("=="===a)return n==r;if("!="===a)return n!=r;if("match"===a)return null!=n&&f(p,n,r);if("not match"===a)return null==n||!f(p,n,r);if("in"===a)return null!=r&&m(c,r,n);if("not in"===a)return null==r||!m(c,r,n);if("contain"===a)return null!=n&&m(p,n,r);if("not contain"===a)return null==n||!m(p,n,r);if("include"===a)return null!=n&&m(p,n,r);if("not include"===a)return null==n||!m(p,n,r);if("==="===a)return n===r;if("!=="===a)return n!==r;if("<"===a)return n<r;if(">"===a)return n>r;if("<="===a)return n<=r;if(">="===a)return n>=r;if("empty"===a)return t.isEmpty(n);if("not empty"===a)return!t.isEmpty(n);if("a"===a)return t.typeCheck(n,s.value,l);if("not a"===a)return!t.typeCheck(n,s.value,l);throw"Unknown comparison : "+a},evaluate:function(e){return t.unifiedEval(this,e)}}}return r}),u.addGrammarElement("comparisonExpression",function(e,t,n){return e.parseAnyOf(["comparisonOperator","mathExpression"],n)}),u.addGrammarElement("logicalOperator",function(e,t,n){var r,o=e.parseElement("comparisonExpression",n),a=null;for(r=n.matchToken("and")||n.matchToken("or");r;){(a=a||r).value!==r.value&&e.raiseParseError(n,"You must parenthesize logical operations with different operators");var i=e.requireElement("comparisonExpression",n);const u=r.value;o={type:"logicalOperator",operator:u,lhs:o,rhs:i,args:[o,i],op:function(e,t,n){return"and"===u?t&&n:t||n},evaluate:function(e){return t.unifiedEval(this,e)}},r=n.matchToken("and")||n.matchToken("or")}return o}),u.addGrammarElement("logicalExpression",function(e,t,n){return e.parseAnyOf(["logicalOperator","mathExpression"],n)}),u.addGrammarElement("asyncExpression",function(e,t,n){return n.matchToken("async")?{type:"asyncExpression",value:e.requireElement("logicalExpression",n),evaluate:function(e){return{asyncWrapper:!0,value:this.value.evaluate(e)}}}:e.parseElement("logicalExpression",n)}),u.addGrammarElement("expression",function(e,t,n){return n.matchToken("the"),e.parseElement("asyncExpression",n)}),u.addGrammarElement("assignableExpression",function(e,t,n){n.matchToken("the");var r=e.parseElement("primaryExpression",n);return!r||"symbol"!==r.type&&"ofExpression"!==r.type&&"propertyAccess"!==r.type&&"attributeRefAccess"!==r.type&&"attributeRef"!==r.type&&"possessive"!==r.type?(u.raiseParseError(n,"A target expression must be writable.  The expression type '"+(r&&r.type)+"' is not."),r):r}),u.addGrammarElement("hyperscript",function(e,t,n){var r=[];if(n.hasMore())for(;e.featureStart(n.currentToken())||"("===n.currentToken().value;){var o=e.requireElement("feature",n);r.push(o),n.matchToken("end")}return{type:"hyperscript",features:r,apply:function(e,t,n){for(const o of r)o.install(e,t,n)}}});var p=function(e){var t=[];if("("===e.token(0).value&&(")"===e.token(1).value||","===e.token(2).value||")"===e.token(2).value)){e.matchOpToken("(");do{t.push(e.requireTokenType("IDENTIFIER"))}while(e.matchOpToken(","));e.requireOpToken(")")}return t};function d(e,t,n,r){var o=t.requireElement("eventName",r),a=t.parseElement("namedArgumentList",r);if("send"===e&&r.matchToken("to")||"trigger"===e&&r.matchToken("on"))var i=t.requireElement("expression",r);else i=t.requireElement("implicitMeTarget",r);var u={eventName:o,details:a,to:i,args:[i,o,a],op:function(e,t,r,o){return n.forEach(t,function(e){n.triggerEvent(e,r,o||{})}),n.findNext(u,e)}};return u}u.addFeature("on",function(t,n,r){if(r.matchToken("on")){var o=!1;r.matchToken("every")&&(o=!0);var a=[],i=null;do{var u=t.requireElement("eventName",r,"Expected event name").evaluate();i=i?i+" or "+u:"on "+u;var s=p(r),c=null;if(r.matchOpToken("[")&&(c=t.requireElement("expression",r),r.requireOpToken("]")),"NUMBER"===r.currentToken().type){var m=r.consumeToken(),f=parseInt(m.value);if(r.matchToken("to"))var d=r.consumeToken(),h=parseInt(d.value);else if(r.matchToken("and")){var v=!0;r.requireToken("on")}}if("intersection"===u){var E={};if(r.matchToken("with")&&(E.with=t.requireElement("expression",r).evaluate()),r.matchToken("having"))do{r.matchToken("margin")?E.rootMargin=t.requireElement("stringLike",r).evaluate():r.matchToken("threshold")?E.threshold=t.requireElement("expression",r).evaluate():t.raiseParseError(r,"Unknown intersection config specification")}while(r.matchToken("and"))}else if("mutation"===u){var T={};if(r.matchToken("of"))do{if(r.matchToken("anything"))T.attributes=!0,T.subtree=!0,T.characterData=!0,T.childList=!0;else if(r.matchToken("childList"))T.childList=!0;else if(r.matchToken("attributes"))T.attributes=!0,T.attributeOldValue=!0;else if(r.matchToken("subtree"))T.subtree=!0;else if(r.matchToken("characterData"))T.characterData=!0,T.characterDataOldValue=!0;else if("ATTRIBUTE_REF"===r.currentToken().type){var y=r.consumeToken();null==T.attributeFilter&&(T.attributeFilter=[]),0==y.value.indexOf("@")?T.attributeFilter.push(y.value.substring(1)):t.raiseParseError(r,"Only shorthand attribute references are allowed here")}else t.raiseParseError(r,"Unknown mutation config specification")}while(r.matchToken("or"));else T.attributes=!0,T.characterData=!0,T.childList=!0}var k=null,g=!1;if(r.matchToken("from")&&(r.matchToken("elsewhere")?g=!0:(k=t.parseElement("expression",r))||t.raiseParseError(r,'Expected either target value or "elsewhere".')),null===k&&!1===g&&r.matchToken("elsewhere")&&(g=!0),r.matchToken("in"))var x=t.parseAnyOf(["idRef","queryRef","classRef"],r);if(r.matchToken("debounced")){r.requireToken("at");var b=t.requireElement("timeExpression",r).evaluate({})}else if(r.matchToken("throttled")){r.requireToken("at");var w=t.requireElement("timeExpression",r).evaluate({})}a.push({execCount:0,every:o,on:u,args:s,filter:c,from:k,inExpr:x,elsewhere:g,startCount:f,endCount:h,unbounded:v,debounceTime:b,throttleTime:w,mutationSpec:T,intersectionSpec:E,debounced:void 0,lastExec:void 0})}while(r.matchToken("or"));var q=[],N=!0;if(!o&&r.matchToken("queue"))if(r.matchToken("all"))N=!1;else if(r.matchToken("first"))var S=!0;else if(r.matchToken("none"))var L=!0;else r.requireToken("last");var O=t.parseElement("commandList",r),I={type:"implicitReturn",op:function(e){return e.meta.resolve(),n.HALT},execute:function(e){}};if(O){for(var C=O,R=C;R.next;)R=R.next;R.next=I}else C=I;var A={displayName:i,events:a,start:C,every:o,executing:!1,execCount:0,queue:q,execute:function(e){if(this.executing&&!1===o){if(L||S&&q.length>0)return;return N&&(A.queue.length=0),void A.queue.push(e)}A.execCount++,this.executing=!0,e.meta.resolve=function(){A.executing=!1;var e=A.queue.shift();e&&setTimeout(function(){A.execute(e)},1)},e.meta.reject=function(t){console.error(t.message?t.message:t);var r=n.getHyperTrace(e,t);r&&r.print(),n.triggerEvent(e.me,"exception",{error:t}),A.executing=!1;var o=A.queue.shift();o&&setTimeout(function(){A.execute(o)},1)},C.execute(e)},install:function(t,r){for(const r of A.events){var o;o=r.elsewhere?[document]:r.from?r.from.evaluate(n.makeContext(t,A,t,null)):[t],n.forEach(o,function(o){var a=r.on;if(r.mutationSpec&&(a="hyperscript:mutation",new MutationObserver(function(e,t){console.log(o,e),A.executing||l.triggerEvent(o,a,{mutationList:e,observer:t})}).observe(o,r.mutationSpec)),r.intersectionSpec){a="hyperscript:insersection";const t=new IntersectionObserver(function(n){for(const i of n){var r={observer:t};(r=e(r,i)).intersecting=i.isIntersecting,l.triggerEvent(o,a,r)}},r.intersectionSpec);t.observe(o)}(o.addEventListener||o.on).call(o,a,function e(i){if("undefined"!=typeof Node&&t instanceof Node&&o!==t&&!t.isConnected)o.removeEventListener(a,e);else{var u=n.makeContext(t,A,t,i);if(!r.elsewhere||!t.contains(i.target)){r.from&&(u.result=o);for(const e of r.args)u[e.value]=u.event[e.value]||("detail"in u.event?u.event.detail[e.value]:null);if(r.filter){var s=u.meta.context;u.meta.context=u.event;try{if(!r.filter.evaluate(u))return}finally{u.meta.context=s}}if(r.inExpr)for(var l=i.target;;){if(l.matches&&l.matches(r.inExpr.css)){u.result=l;break}if(null==(l=l.parentElement))return}if(r.execCount++,r.startCount)if(r.endCount){if(r.execCount<r.startCount||r.execCount>r.endCount)return}else if(r.unbounded){if(r.execCount<r.startCount)return}else if(r.execCount!==r.startCount)return;if(r.debounceTime)return r.debounced&&clearTimeout(r.debounced),void(r.debounced=setTimeout(function(){A.execute(u)},r.debounceTime));if(r.throttleTime){if(r.lastExec&&Date.now()<r.lastExec+r.throttleTime)return;r.lastExec=Date.now()}A.execute(u)}}})})}}};return t.setParent(C,A),A}}),u.addFeature("def",function(e,t,n){if(n.matchToken("def")){var r=e.requireElement("dotOrColonPath",n).evaluate(),o=r.split("."),a=o.pop(),i=[];if(n.matchOpToken("("))if(n.matchOpToken(")"));else{do{i.push(n.requireTokenType("IDENTIFIER"))}while(n.matchOpToken(","));n.requireOpToken(")")}var u=e.requireElement("commandList",n);if(n.matchToken("catch"))var s=n.requireTokenType("IDENTIFIER").value,l=e.parseElement("commandList",n);var c={displayName:a+"("+i.map(function(e){return e.value}).join(", ")+")",name:a,args:i,start:u,errorHandler:l,errorSymbol:s,install:function(e,n){var m=function(){var r=t.makeContext(n,c,e,null);r.meta.errorHandler=l,r.meta.errorSymmbol=s;for(var o=0;o<i.length;o++){var a=i[o],m=arguments[o];a&&(r[a.value]=m)}r.meta.caller=arguments[i.length],r.meta.caller&&(r.meta.callingCommand=r.meta.caller.meta.command);var f,p=null,d=new Promise(function(e,t){f=e,p=t});return u.execute(r),r.meta.returned?r.meta.returnValue:(r.meta.resolve=f,r.meta.reject=p,d)};m.hyperfunc=!0,m.hypername=r,t.assignToNamespace(e,o,a,m)}},m={type:"implicitReturn",op:function(e){return e.meta.returned=!0,e.meta.resolve&&e.meta.resolve(),t.HALT},execute:function(e){}};if(u){for(var f=u;f.next;)f=f.next;f.next=m}else c.start=m;if(l){for(f=l;f.next;)f=f.next;f.next=m}return e.setParent(u,c),c}}),u.addFeature("set",function(e,t,n){let r=e.parseElement("setCommand",n);var o={type:"implicitReturn",op:function(e){return t.HALT},execute:function(e){}};if(r){"element"!==r.target.scope&&e.raiseParseError(n,"variables declared at the feature level must be element scoped.");let a={start:r,install:function(e,n){r&&r.execute(t.makeContext(e,a,e,null))}};return r.next=o,a}}),u.addFeature("init",function(e,t,n){if(n.matchToken("init")){var r=e.parseElement("commandList",n),o={start:r,install:function(e,n){setTimeout(function(){r&&r.execute(t.makeContext(e,o,e,null))},0)}},a={type:"implicitReturn",op:function(e){return t.HALT},execute:function(e){}};if(r){for(var i=r;i.next;)i=i.next;i.next=a}else o.start=a;return e.setParent(r,o),o}}),u.addFeature("worker",function(e,t,n){n.matchToken("worker")&&e.raiseParseError(n,"In order to use the 'worker' feature, include the _hyperscript worker plugin. See https://hyperscript.org/features/worker/ for more info.")}),u.addFeature("behavior",function(e,n,r){if(r.matchToken("behavior")){var a=e.requireElement("dotOrColonPath",r).evaluate(),i=a.split("."),u=i.pop(),s=[];if(r.matchOpToken("(")&&!r.matchOpToken(")")){do{s.push(r.requireTokenType("IDENTIFIER").value)}while(r.matchOpToken(","));r.requireOpToken(")")}for(var l=e.requireElement("hyperscript",r),c=0;c<l.features.length;c++)l.features[c].behavior=a;return{install:function(e,r){n.assignToNamespace(o.document&&o.document.body,i,u,function(e,r,o){for(var i=t(n.getInternalData(e),a+"Scope"),u=0;u<s.length;u++)i[s[u]]=o[s[u]];l.apply(e,r)})}}}}),u.addFeature("install",function(e,t,n){if(n.matchToken("install")){var r,a=e.requireElement("dotOrColonPath",n).evaluate(),i=a.split("."),u=e.parseElement("namedArgumentList",n);return r={install:function(e,n){t.unifiedEval({args:[u],op:function(t,r){for(var u=o,s=0;s<i.length;s++)if("object"!=typeof(u=u[i[s]])&&"function"!=typeof u)throw new Error("No such behavior defined as "+a);if(!(u instanceof Function))throw new Error(a+" is not a behavior");u(e,n,r)}},t.makeContext(e,r,e))}}}}),u.addGrammarElement("jsBody",function(e,t,n){for(var r=n.currentToken().start,o=n.currentToken(),a=[],i="",u=!1;n.hasMore();){o=n.consumeToken();var s=n.token(0,!0);if("IDENTIFIER"===s.type&&"end"===s.value)break;u?"IDENTIFIER"===o.type||"NUMBER"===o.type?i+=o.value:(""!==i&&a.push(i),i="",u=!1):"IDENTIFIER"===o.type&&"function"===o.value&&(u=!0)}return{type:"jsBody",exposedFunctionNames:a,jsSource:n.source.substring(r,o.end+1)}}),u.addFeature("js",function(t,n,r){if(r.matchToken("js")){var a=t.requireElement("jsBody",r),i=a.jsSource+"\nreturn { "+a.exposedFunctionNames.map(function(e){return e+":"+e}).join(",")+" } ",u=new Function(i);return{jsSource:i,function:u,exposedFunctionNames:a.exposedFunctionNames,install:function(){e(o,u())}}}}),u.addCommand("js",function(e,t,r){if(r.matchToken("js")){var a=[];if(r.matchOpToken("("))if(r.matchOpToken(")"));else{do{var i=r.requireTokenType("IDENTIFIER");a.push(i.value)}while(r.matchOpToken(","));r.requireOpToken(")")}var u=e.requireElement("jsBody",r);r.matchToken("end");var s=n(Function,a.concat([u.jsSource]));return{jsSource:u.jsSource,function:s,inputs:a,op:function(e){var n=[];a.forEach(function(r){n.push(t.resolveSymbol(r,e,"default"))});var r=s.apply(o,n);return r&&"function"==typeof r.then?new Promise(function(n){r.then(function(r){e.result=r,n(t.findNext(this,e))})}):(e.result=r,t.findNext(this,e))}}}}),u.addCommand("async",function(e,t,n){if(n.matchToken("async")){if(n.matchToken("do")){for(var r=o=e.requireElement("commandList",n);r.next;)r=r.next;r.next=t.HALT,n.requireToken("end")}else var o=e.requireElement("command",n);return{body:o,op:function(e){return setTimeout(function(){o.execute(e)}),t.findNext(this,e)}}}}),u.addCommand("tell",function(e,t,n){var r=n.currentToken();if(n.matchToken("tell")){var o=e.requireElement("expression",n),a=e.requireElement("commandList",n);n.hasMore()&&!e.featureStart(n.currentToken())&&n.requireToken("end");var i="tell_"+r.start,u={value:o,body:a,args:[o],resolveNext:function(e){var n=e.meta.iterators[i];return n.index<n.value.length?(e.beingTold=n.value[n.index++],a):(e.beingTold=n.originalBeingTold,this.next?this.next:t.findNext(this.parent,e))},op:function(e,t){return null==t?t=[]:Array.isArray(t)||t instanceof NodeList||(t=[t]),e.meta.iterators[i]={originalBeingTold:e.beingTold,index:0,value:t},this.resolveNext(e)}};return e.setParent(a,u),u}}),u.addCommand("wait",function(e,t,n){if(n.matchToken("wait")){var r,o;if(n.matchToken("for")){n.matchToken("a");var a=[];do{var i=n.token(0);a.push("NUMBER"===i.type||"L_PAREN"===i.type?{time:e.requireElement("timeExpression",n).evaluate()}:{name:u.requireElement("dotOrColonPath",n,"Expected event name").evaluate(),args:p(n)})}while(n.matchToken("or"));if(n.matchToken("from"))var s=e.requireElement("expression",n);return r={event:a,on:s,args:[s],op:function(e,n){var r=n||e.me;if(!(r instanceof EventTarget))throw new Error("Not a valid event target: "+this.on.sourceFor());return new Promise(n=>{var o=!1;for(const u of a){var i=r=>{e.result=r;for(const t of u.args)e[t.value]=r[t.value]||(r.detail?r.detail[t.value]:null);o||(o=!0,n(t.findNext(this,e)))};u.name?r.addEventListener(u.name,i,{once:!0}):u.time&&setTimeout(i,u.time,u.time)}})}},r}return n.matchToken("a")?(n.requireToken("tick"),o=0):o=u.requireElement("timeExpression",n),{type:"waitCmd",time:o,args:[o],op:function(e,n){return new Promise(r=>{setTimeout(()=>{r(t.findNext(this,e))},n)})},execute:function(e){return t.unifiedExec(this,e)}}}}),u.addGrammarElement("dotOrColonPath",function(e,t,n){var r=n.matchTokenType("IDENTIFIER");if(r){var o=[r.value],a=n.matchOpToken(".")||n.matchOpToken(":");if(a)do{o.push(n.requireTokenType("IDENTIFIER").value)}while(n.matchOpToken(a.value));return{type:"dotOrColonPath",path:o,evaluate:function(){return o.join(a?a.value:"")}}}}),u.addGrammarElement("eventName",function(e,t,n){var r;return(r=n.matchTokenType("STRING"))?{evaluate:function(){return r.value}}:e.parseElement("dotOrColonPath",n)}),u.addCommand("trigger",function(e,t,n){if(n.matchToken("trigger"))return d("trigger",e,t,n)}),u.addCommand("send",function(e,t,n){if(n.matchToken("send"))return d("send",e,t,n)});var h=function(e,t,n,r){if(r)var o=e.requireElement("expression",n);var a={value:o,args:[o],op:function(e,n){var r=e.meta.resolve;return e.meta.returned=!0,r?n?r(n):r():(e.meta.returned=!0,e.meta.returnValue=n),t.HALT}};return a};u.addCommand("return",function(e,t,n){if(n.matchToken("return"))return h(e,t,n,!0)}),u.addCommand("exit",function(e,t,n){if(n.matchToken("exit"))return h(e,t,n,!1)}),u.addCommand("halt",function(e,t,n){if(n.matchToken("halt")){if(n.matchToken("the")){n.requireToken("event"),n.matchOpToken("'")&&n.requireToken("s");var r=!0}if(n.matchToken("bubbling"))var o=!0;else if(n.matchToken("default"))var a=!0;var i=h(e,t,n,!1);return{keepExecuting:!0,bubbling:o,haltDefault:a,exit:i,op:function(e){if(e.event)return o?e.event.stopPropagation():(a||e.event.stopPropagation(),e.event.preventDefault()),r?t.findNext(this,e):i}}}}),u.addCommand("log",function(e,t,n){if(n.matchToken("log")){for(var r=[e.parseElement("expression",n)];n.matchOpToken(",");)r.push(e.requireElement("expression",n));if(n.matchToken("with"))var o=e.requireElement("expression",n);var a={exprs:r,withExpr:o,args:[o,r],op:function(e,n,r){return n?n.apply(null,r):console.log.apply(null,r),t.findNext(this,e)}};return a}}),u.addCommand("throw",function(e,t,n){if(n.matchToken("throw")){var r=e.requireElement("expression",n),o={expr:r,args:[r],op:function(e,n){t.registerHyperTrace(e,n);var r=e.meta&&e.meta.reject;if(r)return r(n),t.HALT;throw n}};return o}});var v=function(e,t,n){var r=e.requireElement("expression",n),o={expr:r,args:[r],op:function(e,n){return e.result=n,t.findNext(o,e)}};return o};u.addCommand("call",function(e,t,n){if(n.matchToken("call")){var r=v(e,t,n);return r.expr&&"functionCall"!==r.expr.type&&e.raiseParseError(n,"Must be a function invocation"),r}}),u.addCommand("get",function(e,t,n){if(n.matchToken("get"))return v(e,t,n)}),u.addCommand("make",function(e,t,r){if(r.matchToken("make")){r.matchToken("a")||r.matchToken("an");var o,a=e.requireElement("expression",r),i=[];if("queryRef"!==a.type&&r.matchToken("from"))do{i.push(e.requireElement("expression",r))}while(r.matchOpToken(","));if(r.matchToken("called"))var u=r.requireTokenType("IDENTIFIER").value;return"queryRef"===a.type?o={op:function(e){for(var n,r,o="div",i=[],s=/(?:(^|#|\.)([^#\. ]+))/g;n=s.exec(a.css);)""===n[1]?o=n[2].trim():"#"===n[1]?r=n[2].trim():i.push(n[2].trim());var l=document.createElement(o);void 0!==r&&(l.id=r);for(var c=0;c<i.length;c++)l.classList.add(i[c]);return e.result=l,u&&(e[u]=l),t.findNext(this,e)}}:(o={args:[a,i],op:function(e,r,o){return e.result=n(r,o),u&&(e[u]=e.result),t.findNext(this,e)}},o)}}),u.addGrammarElement("pseudoCommand",function(e,t,n){try{var r=e.requireElement("primaryExpression",n)}finally{n.popFollow()}"functionCall"!==r.type&&"symbol"!==r.root.type&&null!=r.root.root&&e.raiseParseError(n,"Implicit function calls must start with a simple function");var o=r.root.name;if(n.matchAnyToken("the","to","on","with","into","from","at"))var a=e.requireElement("expression",n);else n.matchToken("me")&&(a=e.requireElement("implicitMeTarget",n));var i={type:"pseudoCommand",expr:r,args:[a,r.argExressions],op:function(e,n,r){if(n)var a=n[o];else a=t.resolveSymbol(o,e);a.hyperfunc&&r.push(e);var u=a.apply(n,r);return e.result=u,t.findNext(i,e)},execute:function(e){return t.unifiedExec(this,e)}};return i});var E=function(e,t,n,r,o){var a="symbol"===r.type,i="attributeRef"===r.type;i||a||null!=r.root||e.raiseParseError(n,"Can only put directly into symbols, not references");var u=null,s=null;if(a);else if(i){u=e.requireElement("implicitMeTarget",n);var l=r}else s=r.prop?r.prop.value:null,l=r.attribute,u=r.root;var c={target:r,symbolWrite:a,value:o,args:[u,o],op:function(e,n,o){return a?t.setSymbol(r.name,e,r.scope,o):t.implicitLoop(n,function(e){l?null==o?e.removeAttribute(l.name):e.setAttribute(l.name,o):e[s]=o}),t.findNext(this,e)}};return c};u.addCommand("default",function(e,t,n){if(n.matchToken("default")){var r=e.requireElement("assignableExpression",n);n.requireToken("to");var o=e.requireElement("expression",n),a=E(e,t,n,r,o),i={target:r,value:o,setter:a,args:[r],op:function(e,n){return n?t.findNext(this,e):a}};return a.parent=i,i}}),u.addCommand("set",function(t,n,r){if(r.matchToken("set")){if("L_BRACE"===r.currentToken().type){var o=t.requireElement("objectLiteral",r);r.requireToken("on");var a={objectLiteral:o,target:i=t.requireElement("expression",r),args:[o,i],op:function(t,r,o){return e(o,r),n.findNext(this,t)}};return a}try{r.pushFollow("to");var i=t.requireElement("assignableExpression",r)}finally{r.popFollow()}r.requireToken("to");var u=t.requireElement("expression",r);return E(t,n,r,i,u)}}),u.addCommand("if",function(e,t,n){if(n.matchToken("if")){var r=e.requireElement("expression",n);n.matchToken("then");var o=e.parseElement("commandList",n);if(n.matchToken("else"))var a=e.parseElement("commandList",n);n.hasMore()&&n.requireToken("end");var i={expr:r,trueBranch:o,falseBranch:a,args:[r],op:function(e,n){return n?o:a||t.findNext(this,e)}};return e.setParent(o,i),e.setParent(a,i),i}});var T=function(e,t,n,r){var o,a=t.currentToken();if(t.matchToken("for")||r){var i=t.requireTokenType("IDENTIFIER");o=i.value,t.requireToken("in");var s=e.requireElement("expression",t)}else if(t.matchToken("in"))o="it",s=e.requireElement("expression",t);else if(t.matchToken("while"))var l=e.requireElement("expression",t);else if(t.matchToken("until")){var c=!0;if(t.matchToken("event")){var m=u.requireElement("dotOrColonPath",t,"Expected event name");if(t.matchToken("from"))var f=e.requireElement("expression",t)}else l=e.requireElement("expression",t)}else if(t.matchTokenType("NUMBER")){var p=parseFloat(a.value);t.requireToken("times")}else{t.matchToken("forever");var d=!0}if(t.matchToken("index"))var h=(i=t.requireTokenType("IDENTIFIER")).value;var v=e.parseElement("commandList",t);if(v&&m){for(var E=v;E.next;)E=E.next;var T={type:"waitATick",op:function(){return new Promise(function(e){setTimeout(function(){e(n.findNext(T))},0)})}};E.next=T}if(t.hasMore()&&t.requireToken("end"),null==o)var y=o="_implicit_repeat_"+a.start;else y=o+"_"+a.start;var k={identifier:o,indexIdentifier:h,slot:y,expression:s,forever:d,times:p,until:c,event:m,on:f,whileExpr:l,resolveNext:function(){return this},loop:v,args:[l],op:function(e,t){var r=e.meta.iterators[y],a=!1,i=null;if(this.forever)a=!0;else if(this.until)a=m?!1===e.meta.iterators[y].eventFired:!0!==t;else if(l)a=t;else if(p)a=r.index<this.times;else{var u=r.iterator.next();a=!u.done,i=u.value}return a?(e.result=r.value?e[o]=i:r.index,h&&(e[h]=r.index),r.index++,v):(e.meta.iterators[y]=null,n.findNext(this.parent,e))}};e.setParent(v,k);var g={name:"repeatInit",args:[s,m,f],op:function(e,t,n,r){var o={index:0,value:t,eventFired:!1};return e.meta.iterators[y]=o,t&&t[Symbol.iterator]&&(o.iterator=t[Symbol.iterator]()),m&&(r||e.me).addEventListener(n,function(t){e.meta.iterators[y].eventFired=!0},{once:!0}),k},execute:function(e){return n.unifiedExec(this,e)}};return e.setParent(k,g),g};u.addCommand("repeat",function(e,t,n){if(n.matchToken("repeat"))return T(e,n,t,!1)}),u.addCommand("for",function(e,t,n){if(n.matchToken("for"))return T(e,n,t,!0)}),u.addCommand("continue",function(e,t,n){if(n.matchToken("continue"))return{op:function(t){for(var r=this.parent;;r=r.parent)if(null==r&&e.raiseParseError(n,"Command `continue` cannot be used outside of a `repeat` loop."),null!=r.loop)return r.resolveNext(t)}}}),u.addGrammarElement("stringLike",function(e,t,n){return u.parseAnyOf(["string","nakedString"],n)}),u.addCommand("append",function(e,t,n){if(n.matchToken("append")){var r=null,o=null,a=e.requireElement("expression",n);if(n.matchToken("to")&&(r=e.requireElement("expression",n)),null==r)o="result";else if("symbol"===r.type)o=r.name;else{if("propertyAccess"!==r.type)throw"Unable to append to "+r.type;o=r.prop.value}var i={value:a,target:r,args:[a],op:function(e,n){if(Array.isArray(e[o]))e[o].push(n);else if(e[o]instanceof Element){if("string"!=typeof n)throw"Don't know how to append non-strings to an HTML Element yet.";e[o].innerHTML+=n}else e[o]+=n;return t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}};return i}}),u.addCommand("increment",function(e,t,n){if(n.matchToken("increment")){var r,o=e.parseElement("assignableExpression",n);n.matchToken("by")&&(r=e.requireElement("expression",n));var a={target:o,args:[o,r],op:function(r,a,i){var u=(a=a?parseFloat(a):0)+(i=i?parseFloat(i):1),s=E(e,t,n,o,u);return r.result=u,s.parent=this,s},execute:function(e){return t.unifiedExec(this,e)}};return a}}),u.addCommand("decrement",function(e,t,n){if(n.matchToken("decrement")){var r,o=e.parseElement("assignableExpression",n);n.matchToken("by")&&(r=e.requireElement("expression",n));var a={target:o,args:[o,r],op:function(r,a,i){var u=(a=a?parseFloat(a):0)-(i=i?parseFloat(i):1),s=E(e,t,n,o,u);return r.result=u,s.parent=this,s},execute:function(e){return t.unifiedExec(this,e)}};return a}}),u.addCommand("fetch",function(e,t,n){if(n.matchToken("fetch")){var r=e.requireElement("stringLike",n);if(n.matchToken("with"))var o=e.parseElement("nakedNamedArgumentList",n);else o=e.parseElement("objectLiteral",n);var a,i="text";n.matchToken("as")&&(n.matchToken("a")||n.matchToken("an"),n.matchToken("json")||n.matchToken("Object")?i="json":n.matchToken("response")?i="response":n.matchToken("html")?i="html":n.matchToken("text")||(a=e.requireElement("dotOrColonPath",n).evaluate()));var u={url:r,argExpressions:o,args:[r,o],op:function(e,n,r){var o=r||{};return o.sentBy=e.me,t.triggerEvent(e.me,"hyperscript:beforeFetch",o),r=o,fetch(n,r).then(function(n){return"response"===i?(e.result=n,t.findNext(u,e)):"json"===i?n.json().then(function(n){return e.result=n,t.findNext(u,e)}):n.text().then(function(n){return a&&(n=t.convertValue(n,a)),"html"===i&&(n=t.convertValue(n,"Fragment")),e.result=n,t.findNext(u,e)})}).catch(function(n){throw t.triggerEvent(e.me,"fetch:error",{reason:n}),n})}};return u}})}if("document"in o){var y=Array.from(document.querySelectorAll("script[type='text/hyperscript'][src]"));Promise.all(y.map(function(e){return fetch(e.src).then(function(e){return e.text()}).then(function(e){return l.evaluate(e)})})).then(function(){var t;t=function(){var t,n;(n=(t=document.querySelector('meta[name="htmx-config"]'))?function(e){try{return JSON.parse(e)}catch(e){return t=e,console.error?console.error(t):console.log&&console.log("ERROR: ",t),null}var t}(t.content):null)&&(r.config=e(r.config,n)),l.processNode(document.documentElement),document.addEventListener("htmx:load",function(e){l.processNode(e.detail.elt)})},"loading"!==document.readyState?setTimeout(t):document.addEventListener("DOMContentLoaded",t)})}var k,g=r=e(function(e,t){return l.evaluate(e,t)},{internals:{lexer:i,parser:u,runtime:l},ElementCollection:a,addFeature:function(e,t){u.addFeature(e,t)},addCommand:function(e,t){u.addCommand(e,t)},addLeafExpression:function(e,t){u.addLeafExpression(e,t)},addIndirectExpression:function(e,t){u.addIndirectExpression(e,t)},evaluate:l.evaluate.bind(l),parse:l.parse.bind(l),processNode:l.processNode.bind(l),config:{attributes:"_, script, data-script",defaultTransition:"all 500ms ease-in",disableSelector:"[disable-scripting], [data-disable-scripting]",conversions:s}});function x(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}function b(e){return new WebSocket(e.evaluate())}function w(e){return e.replace(/(?:^|\n)([^@]*)@?/gm,function(e,t){return"\ncall __ht_template_result.push(`"+(" "+t).replace(/([^\\])\$\{/g,"$1$${escape html ").substring(1)+"`)\n"})}(t=>{t.addCommand("settle",function(e,t,n){if(n.matchToken("settle")){if(e.commandBoundary(n.currentToken()))r=e.requireElement("implicitMeTarget",n);else var r=e.requireElement("expression",n);var o={type:"settleCmd",args:[r],op:function(e,n){var r=null,a=!1,i=new Promise(function(e){r=e});return n.addEventListener("transitionstart",function(){a=!0},{once:!0}),setTimeout(function(){a||r(t.findNext(o,e))},500),n.addEventListener("transitionend",function(){r(t.findNext(o,e))},{once:!0}),i},execute:function(e){return t.unifiedExec(this,e)}};return o}}),t.addCommand("add",function(e,t,n){if(n.matchToken("add")){var r=e.parseElement("classRef",n),o=null,a=null;if(null==r)null==(o=e.parseElement("attributeRef",n))&&null==(a=e.parseElement("styleLiteral",n))&&e.raiseParseError(n,"Expected either a class reference or attribute expression");else for(var i=[r];r=e.parseElement("classRef",n);)i.push(r);if(n.matchToken("to"))var u=e.requireElement("expression",n);else u=e.parseElement("implicitMeTarget",n);return i?{classRefs:i,to:u,args:[u,i],op:function(e,n,r){return t.forEach(r,function(e){t.implicitLoop(n,function(t){t instanceof Element&&t.classList.add(e.className)})}),t.findNext(this,e)}}:o?{type:"addCmd",attributeRef:o,to:u,args:[u],op:function(e,n,r){return t.implicitLoop(n,function(e){e.setAttribute(o.name,o.value)}),t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}}:{type:"addCmd",cssDeclaration:a,to:u,args:[u,a],op:function(e,n,r){return t.implicitLoop(n,function(e){e.style.cssText+=r}),t.findNext(this,e)},execute:function(e){return t.unifiedExec(this,e)}}}}),t.internals.parser.addGrammarElement("styleLiteral",function(e,t,n){if(n.matchOpToken("{")){for(var r=[""],o=[];n.hasMore();){if(n.matchOpToken("\\"))n.consumeToken();else{if(n.matchOpToken("}"))break;if(n.matchToken("$")){var a=n.matchOpToken("{"),i=e.parseElement("expression",n);a&&n.requireOpToken("}"),o.push(i),r.push("")}else{var u=n.consumeToken();r[r.length-1]+=n.source.substring(u.start,u.end)}}r[r.length-1]+=n.lastWhitespace()}return{type:"styleLiteral",args:[o],op:function(e,t){var n="";return r.forEach(function(e,r){n+=e,r in t&&(n+=t[r])}),n},evaluate:function(e){return t.unifiedEval(this,e)}}}}),t.addCommand("remove",function(e,t,n){if(n.matchToken("remove")){var r=e.parseElement("classRef",n),o=null,a=null;if(null==r)null==(o=e.parseElement("attributeRef",n))&&null==(a=e.parseElement("expression",n))&&e.raiseParseError(n,"Expected either a class reference, attribute expression or value expression");else for(var i=[r];r=e.parseElement("classRef",n);)i.push(r);if(n.matchToken("from"))var u=e.requireElement("expression",n);else u=e.requireElement("implicitMeTarget",n);return a?{elementExpr:a,from:u,args:[a],op:function(e,n){return t.implicitLoop(n,function(e){e.parentElement&&e.parentElement.removeChild(e)}),t.findNext(this,e)}}:{classRefs:i,attributeRef:o,elementExpr:a,from:u,args:[i,u],op:function(e,n,r){return n?t.forEach(n,function(e){t.implicitLoop(r,function(t){t.classList.remove(e.className)})}):t.implicitLoop(r,function(e){e.removeAttribute(o.name)}),t.findNext(this,e)}}}}),t.addCommand("toggle",function(e,t,n){if(n.matchToken("toggle")){if(n.matchToken("between")){var r=!0,o=e.parseElement("classRef",n);n.requireToken("and");var a=e.requireElement("classRef",n)}else{o=e.parseElement("classRef",n);var i=null;if(null==o)null==(i=e.parseElement("attributeRef",n))&&e.raiseParseError(n,"Expected either a class reference or attribute expression");else for(var u=[o];o=e.parseElement("classRef",n);)u.push(o)}if(n.matchToken("on"))var s=e.requireElement("expression",n);else s=e.requireElement("implicitMeTarget",n);if(n.matchToken("for"))var l=e.requireElement("timeExpression",n);else if(n.matchToken("until")){var c=e.requireElement("dotOrColonPath",n,"Expected event name");if(n.matchToken("from"))var m=e.requireElement("expression",n)}var f={classRef:o,classRef2:a,classRefs:u,attributeRef:i,on:s,time:l,evt:c,from:m,toggle:function(e,n,o,a){r?t.implicitLoop(e,function(e){e.classList.contains(n.className)?(e.classList.remove(n.className),e.classList.add(o.className)):(e.classList.add(n.className),e.classList.remove(o.className))}):a?t.forEach(a,function(n){t.implicitLoop(e,function(e){e.classList.toggle(n.className)})}):t.forEach(e,function(e){e.hasAttribute(i.name)?e.removeAttribute(i.name):e.setAttribute(i.name,i.value)})},args:[s,l,c,m,o,a,u],op:function(e,n,r,o,a,i,u,s){return r?new Promise(function(o){f.toggle(n,i,u,s),setTimeout(function(){f.toggle(n,i,u,s),o(t.findNext(f,e))},r)}):o?new Promise(function(r){(a||e.me).addEventListener(o,function(){f.toggle(n,i,u,s),r(t.findNext(f,e))},{once:!0}),f.toggle(n,i,u,s)}):(this.toggle(n,i,u,s),t.findNext(f,e))}};return f}});var n={display:function(e,n,r){if(r)n.style.display=r;else if("hide"===e){const e=t.internals.runtime.getInternalData(n);null==e.originalDisplay&&(e.originalDisplay=n.style.display),n.style.display="none"}else{const e=t.internals.runtime.getInternalData(n);e.originalDisplay?n.style.display=e.originalDisplay:n.style.removeProperty("display")}},visibility:function(e,t,n){t.style.visibility=n||("hide"===e?"hidden":"visible")},opacity:function(e,t,n){t.style.opacity=n||("hide"===e?"0":"1")}},r=function(e,t,n){var r=n.currentToken();return"when"===r.value||"with"===r.value||e.commandBoundary(r)?e.parseElement("implicitMeTarget",n):e.parseElement("expression",n)},o=function(r,o,a){var i=t.config.defaultHideShowStrategy,u=n;t.config.hideShowStrategies&&(u=e(u,t.config.hideShowStrategies));var s=u[a=a||i||"display"];return null==s&&r.raiseParseError(o,"Unknown show/hide strategy : "+a),s};function a(e,n,r,o){if(r)var a=e.resolveSymbol(r,n);else a=n;if(a instanceof Element||a instanceof HTMLDocument){for(;a.firstChild;)a.removeChild(a.firstChild);a.append(t.internals.runtime.convertValue(o,"Fragment"))}else{if(!r)throw"Don't know how to put a value into "+typeof n;e.setSymbol(r,n,null,o)}}function i(e,t,n){var r;if(n.matchToken("the")||n.matchToken("element")||n.matchToken("elements")||"CLASS_REF"===n.currentToken().type||"ID_REF"===n.currentToken().type||n.currentToken().op&&"<"===n.currentToken().value){e.possessivesDisabled=!0;try{r=e.parseElement("expression",n)}finally{delete e.possessivesDisabled}n.matchOpToken("'")&&n.requireToken("s")}else if("IDENTIFIER"===n.currentToken().type&&"its"===n.currentToken().value){var o=n.matchToken("its");r={type:"pseudopossessiveIts",token:o,name:o.value,evaluate:function(e){return t.resolveSymbol("it",e)}}}else n.matchToken("my")||n.matchToken("me"),r=e.parseElement("implicitMeTarget",n);return r}t.addCommand("hide",function(e,t,n){if(n.matchToken("hide")){var a=r(e,0,n),i=null;n.matchToken("with")&&(i=n.requireTokenType("IDENTIFIER").value);var u=o(e,n,i);return{target:a,args:[a],op:function(e,n){return t.implicitLoop(n,function(e){u("hide",e)}),t.findNext(this,e)}}}}),t.addCommand("show",function(e,t,n){if(n.matchToken("show")){var a=r(e,0,n),i=null;n.matchToken("with")&&(i=n.requireTokenType("IDENTIFIER").value);var u=null;if(n.matchOpToken(":")){var s=n.consumeUntilWhitespace();n.matchTokenType("WHITESPACE"),u=s.map(function(e){return e.value}).join("")}if(n.matchToken("when"))var l=e.requireElement("expression",n);var c=o(e,n,i);return{target:a,when:l,args:[a],op:function(e,n){return t.implicitLoop(n,function(n){l?(e.result=n,t.evaluateNoPromise(l,e)?c("show",n,u):c("hide",n),e.result=null):c("show",n,u)}),t.findNext(this,e)}}}}),t.addCommand("take",function(e,t,n){if(n.matchToken("take")){var r=e.parseElement("classRef",n);if(n.matchToken("from"))var o=e.requireElement("expression",n);else o=r;if(n.matchToken("for"))var a=e.requireElement("expression",n);else a=e.requireElement("implicitMeTarget",n);var i={classRef:r,from:o,forElt:a,args:[r,o,a],op:function(e,n,r,o){var a=n.className;return t.implicitLoop(r,function(e){e.classList.remove(a)}),t.implicitLoop(o,function(e){e.classList.add(a)}),t.findNext(this,e)}};return i}}),t.addCommand("put",function(e,t,n){if(n.matchToken("put")){var r=e.requireElement("expression",n),o=n.matchAnyToken("into","before","after");null==o&&n.matchToken("at")&&(n.matchToken("the"),o=n.matchAnyToken("start","end"),n.requireToken("of")),null==o&&e.raiseParseError(n,"Expected one of 'into', 'before', 'at start of', 'at end of', 'after'");var i=e.requireElement("expression",n),u=o.value,s=!1,l=null,c=null;if(i.prop&&i.root&&"into"===u)c=i.prop.value,l=i.root;else if("symbol"===i.type&&"into"===u)s=!0,c=i.name;else if("attributeRef"===i.type&&"into"===u){var m=!0;c=i.name,l=e.requireElement("implicitMeTarget",n)}else i.attribute&&"into"===u?(m=!0,c=i.attribute.name,l=i.root):l=i;return{target:i,operation:u,symbolWrite:s,value:r,args:[l,r],op:function(e,n,r){if(s)a(t,e,c,r);else if("into"===u)t.implicitLoop(n,m?function(e){e.setAttribute(c,r)}:function(e){a(t,e,c,r)});else{var o="before"===u?Element.prototype.before:"after"===u?Element.prototype.after:"start"===u?Element.prototype.prepend:Element.prototype.append;n&&t.implicitLoop(n,function(e){o.call(e,r instanceof Node?r:t.convertValue(r,"Fragment"))})}return t.findNext(this,e)}}}}),t.addCommand("transition",function(e,n,r){if(r.matchToken("transition")){for(var o=i(e,n,r),a=[],u=[],s=[],l=r.currentToken();!e.commandBoundary(l)&&"over"!==l.value&&"using"!==l.value;)a.push(e.requireElement("stringLike",r)),r.matchToken("from")?u.push(e.requireElement("stringLike",r)):u.push(null),r.requireToken("to"),s.push(e.requireElement("stringLike",r)),l=r.currentToken();if(r.matchToken("over"))var c=e.requireElement("timeExpression",r);else if(r.matchToken("using"))var m=e.requireElement("expression",r);var f={to:s,args:[o,a,u,s,m,c],op:function(e,r,o,a,i,u,s){var l=[];return n.implicitLoop(r,function(e){var r=new Promise(function(r,l){var c=e.style.transition;e.style.transition=s?"all "+s+"ms ease-in":u||t.config.defaultTransition;for(var m=n.getInternalData(e),f=getComputedStyle(e),p={},d=0;d<f.length;d++){var h=f[d];p[h]=f[h]}for(m.initalStyles||(m.initalStyles=p),d=0;d<o.length;d++){var v=o[d],E=a[d];e.style[v]="computed"===E||null==E?p[v]:E}var T=!1,y=!1;e.addEventListener("transitionend",function(){y||(e.style.transition=c,y=!0,r())},{once:!0}),e.addEventListener("transitionstart",function(){T=!0},{once:!0}),setTimeout(function(){y||T||(e.style.transition=c,y=!0,r())},100),setTimeout(function(){for(var t=0;t<o.length;t++){var n=o[t],r=i[t];e.style[n]="initial"===r?m.initalStyles[n]:r}},0)});l.push(r)}),Promise.all(l).then(function(){return n.findNext(f,e)})}};return f}}),t.addCommand("measure",function(e,t,n){if(n.matchToken("measure")){var r=i(e,t,n),o=[];if(!e.commandBoundary(n.currentToken()))do{o.push(n.matchTokenType("IDENTIFIER").value)}while(n.matchOpToken(","));return{properties:o,args:[r],op:function(e,n){0 in n&&(n=n[0]);var r=n.getBoundingClientRect(),a={top:n.scrollTop,left:n.scrollLeft,topMax:n.scrollTopMax,leftMax:n.scrollLeftMax,height:n.scrollHeight,width:n.scrollWidth};return e.result={x:r.x,y:r.y,left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height,bounds:r,scrollLeft:a.left,scrollTop:a.top,scrollLeftMax:a.leftMax,scrollTopMax:a.topMax,scrollWidth:a.width,scrollHeight:a.height,scroll:a},t.forEach(o,function(t){if(!(t in e.result))throw"No such measurement as "+t;e[t]=e.result[t]}),t.findNext(this,e)}}}}),t.addLeafExpression("closestExpr",function(e,t,n){if(n.matchToken("closest")){if(n.matchToken("parent"))var r=!0;var o=null;if("ATTRIBUTE_REF"===n.currentToken().type){var a=e.parseElement("attributeRefAccess",n,null);o="["+a.attribute.name+"]"}if(null==o){var i=e.parseElement("expression",n);null==i.css?e.raiseParseError(n,"Expected a CSS expression"):o=i.css}if(n.matchToken("to"))var u=e.parseElement("expression",n);else u=e.parseElement("implicitMeTarget",n);var s={type:"closestExpr",parentSearch:r,expr:i,css:o,to:u,args:[u],op:function(e,t){if(null!=t&&t instanceof Element){if(r)var n=t.parentElement?t.parentElement.closest(o):null;else n=t.closest(o);return n}return null},evaluate:function(e){return t.unifiedEval(this,e)}};return a?(a.root=s,a.args=[s],a):s}}),t.addCommand("go",function(e,t,n){if(n.matchToken("go")){if(n.matchToken("back"))var r=!0;else if(n.matchToken("to"),n.matchToken("url")){var o=e.requireElement("stringLike",n),a=!0;if(n.matchToken("in")){n.requireToken("new"),n.requireToken("window");var i=!0}}else{n.matchToken("the");var u=n.matchAnyToken("top","bottom","middle"),s=n.matchAnyToken("left","center","right");(u||s)&&n.requireToken("of"),o=e.requireElement("expression",n);var l=n.matchAnyToken("smoothly","instantly"),c={};u&&("top"===u.value?c.block="start":"bottom"===u.value?c.block="end":"middle"===u.value&&(c.block="center")),s&&("left"===s.value?c.inline="start":"center"===s.value?c.inline="center":"right"===s.value&&(c.inline="end")),l&&("smoothly"===l.value?c.behavior="smooth":"instantly"===l.value&&(c.behavior="instant"))}var m={target:o,args:[o],op:function(e,n){return r?window.history.back():a?n&&(0!==n.indexOf("#")||i?window.open(n,i?"_blank":null):window.location.href=n):t.forEach(n,function(e){e.scrollIntoView(c)}),t.findNext(m)}};return m}}),t.config.conversions.Values=function(e){var n={};return(0,t.internals.runtime.implicitLoop)(e,function(e){var t=o(e);void 0===t?null!=e.querySelectorAll&&e.querySelectorAll("input,select,textarea").forEach(r):n[t.name]=t.value}),n;function r(e){var t=o(e);null!=t&&(null!=n[t.name]?Array.isArray(n[t.name])&&Array.isArray(t.value)&&(n[t.name]=[].concat(n[t.name],t.value)):n[t.name]=t.value)}function o(e){try{var t={name:e.name,value:e.value};if(null==t.name||null==t.value)return;if("radio"==e.type&&0==e.checked)return;if("checkbox"==e.type&&(0==e.checked?t.value=void 0:"string"==typeof t.value&&(t.value=[t.value])),"select-multiple"==e.type){var n=e.querySelectorAll("option[selected]");t.value=[];for(var r=0;r<n.length;r++)t.value.push(n[r].value)}return t}catch(e){return}}},t.config.conversions.HTML=function(e){return function e(t){if(t instanceof Array)return t.map(function(t){return e(t)}).join("");if(t instanceof HTMLElement)return t.outerHTML;if(t instanceof NodeList){for(var n="",r=0;r<t.length;r++){var o=t[r];o instanceof HTMLElement&&(n+=o.outerHTML)}return n}return t.toString?t.toString():""}(e)},t.config.conversions.Fragment=function(e){var n=document.createDocumentFragment();return t.internals.runtime.implicitLoop(e,function(e){if(e instanceof Node)n.append(e);else{var t=document.createElement("template");t.innerHTML=e,n.append(t.content)}}),n}})(g),(e=>{var t=0,n="("+function(e){e.onmessage=function(t){switch(t.data.type){case"init":e.importScripts(t.data._hyperscript),e.importScripts.apply(e,t.data.extraScripts);const a=e._hyperscript;var n=a.internals.lexer.makeTokensObject(t.data.tokens,[],t.data.source),r=a.internals.parser.parseElement("hyperscript",n);r.apply(e,e),postMessage({type:"didInit"});break;case"call":try{var o=e._hyperscript.internals.runtime.getHyperscriptFeatures(e)[t.data.function].apply(e,t.data.args);Promise.resolve(o).then(function(e){postMessage({type:"resolve",id:t.data.id,value:e})}).catch(function(e){postMessage({type:"reject",id:t.data.id,error:e.toString()})})}catch(e){postMessage({type:"reject",id:t.data.id,error:e.toString()})}}}}.toString()+")(self)",r=new Blob([n],{type:"text/javascript"}),o=URL.createObjectURL(r);e.addFeature("worker",function(e,n,r){if(r.matchToken("worker")){var a=e.requireElement("dotOrColonPath",r).evaluate().split("."),i=a.pop(),u=[];if(r.matchOpToken("("))if(r.matchOpToken(")"));else{do{var s=r.requireTokenType("STRING").value,l=new URL(s,location.href).href;u.push(l)}while(r.matchOpToken(","));r.requireOpToken(")")}var c=[],m=r.consumed.length,f=r.consumed.length;do{var p=e.parseAnyOf(["defFeature","jsFeature"],r);if(!p)break;if("defFeature"===p.type)c.push(p.name),f=r.consumed.length;else if(r.hasMore())continue}while(r.matchToken("end")&&r.hasMore());var d=r.consumed.slice(m,f+1),h=new Worker(o);h.postMessage({type:"init",_hyperscript:n.hyperscriptUrl,extraScripts:u,tokens:d,source:r.source});var v=new Promise(function(e,t){h.addEventListener("message",function(t){"didInit"===t.data.type&&e()},{once:!0})}),E={};return c.forEach(function(e){console.log(e),E[e]=function(){var n=arguments;return new Promise(function(r,o){var a=t++;h.addEventListener("message",function e(t){t.data.id===a&&(h.removeEventListener("message",e),"resolve"===t.data.type?r(t.data.value):o(t.data.error))}),v.then(function(){h.postMessage({type:"call",function:e,args:Array.from(n),id:a})})})}}),{name:i,worker:h,install:function(e){n.assignToNamespace(e,a,i,E)}}}})})(g),k=["then","catch","length","asyncWrapper","toJSON"],g.addFeature("socket",function(t,n,r){if(r.matchToken("socket")){var o=t.requireElement("dotOrColonPath",r).evaluate().split("."),a=o.pop(),i={},u=t.requireElement("stringLike",r),s=1e4;if(r.matchToken("with")&&(r.requireToken("timeout"),s=t.requireElement("timeExpression",r).evaluate()),r.matchToken("on")){if(r.requireToken("message"),r.matchToken("as")){r.requireToken("json");var l=!0}for(var c=t.requireElement("commandList",r),m={type:"implicitReturn",op:function(e){return n.HALT},execute:function(e){}},f=c;f.next;)f=f.next;f.next=m}var p=b(u),d=function e(t){return new Proxy({},{get:function(n,r){return k.indexOf(r)>=0?null:"noTimeout"===r?e(-1):"timeout"===r?function(t){return e(parseInt(t))}:function(){for(var e=x(),n=[],o=0;o<arguments.length;o++)n.push(arguments[o]);var a={iid:e,function:r,args:n};(p=p||b(u)).send(JSON.stringify(a));var s=new Promise(function(t,n){i[e]={resolve:t,reject:n}});return t>=0&&setTimeout(function(){i[e]&&i[e].reject("Timed out"),delete i[e]},t),s}}})}(s),h={raw:p,dispatchEvent:function(t){var n=t.detail;delete n.sentBy,delete n._namedArgList_,p.send(JSON.stringify(e({type:t.type},n)))},rpc:d},v={name:a,socket:h,install:function(e){n.assignToNamespace(e,o,a,h)}};return p.onmessage=function(e){var t=e.data;try{var r=JSON.parse(t)}catch(e){}if(r&&r.iid&&(r.throw?i[r.iid].reject(r.throw):i[r.iid].resolve(r.return),delete i[r.iid]),c){var o=n.makeContext(h,v,h);if(l){if(!r)throw"Received non-JSON message from socket: "+t;o.message=r,o.result=r}else o.message=t,o.result=t;c.execute(o)}},p.addEventListener("close",function(e){p=null}),v}}),g.addFeature("eventsource",function(e,t,n){if(n.matchToken("eventsource")){var r,o=!1,a=e.requireElement("dotOrColonPath",n).evaluate().split("."),i=a.pop();n.matchToken("from")&&(r=e.requireElement("stringLike",n)),n.matchToken("with")&&n.matchToken("credentials")&&(o=!0);for(var u={eventSource:null,listeners:[],retryCount:0,open:function(e){if(null==e){if(null==u.eventSource||null==u.eventSource.url)throw"no url defined for EventSource.";e=u.eventSource.url}if(null!=u.eventSource)if(e!=u.eventSource.url)u.eventSource.close();else if(u.eventSource.readyState!=EventSource.CLOSED)return;u.eventSource=new EventSource(e,{withCredentials:o}),u.eventSource.addEventListener("open",function(e){u.retryCount=0}),u.eventSource.addEventListener("error",function(e){if(u.eventSource.readyState==EventSource.CLOSED){u.retryCount=Math.min(7,u.retryCount+1);var t=Math.random()*(2^u.retryCount)*500;window.setTimeout(u.open,t)}});for(var t=0;t<u.listeners.length;t++){var n=u.listeners[t];u.eventSource.addEventListener(n.type,n.handler,n.options)}},close:function(){null!=u.eventSource&&u.eventSource.close(),u.retryCount=0},addEventListener:function(e,t,n){u.listeners.push({type:e,handler:t,options:n}),null!=u.eventSource&&u.eventSource.addEventListener(e,t,n)}},s={name:i,object:u,install:function(e){t.assignToNamespace(e,a,i,u)}};n.matchToken("on");){var l=e.requireElement("stringLike",n,"Expected event name").evaluate(),c="";n.matchToken("as")&&(c=e.requireElement("stringLike",n,"Expected encoding type").evaluate());var m=e.requireElement("commandList",n);p(m),n.requireToken("end"),u.listeners.push({type:l,handler:f(c,m)})}return n.requireToken("end"),null!=r&&u.open(r.evaluate()),s;function f(e,n){return function(r){var o=function(e,t){return"json"==t?JSON.parse(e):e}(r.data,e),a=t.makeContext(u,s,u);a.event=r,a.result=o,n.execute(a)}}function p(e){if(e.next)return p(e.next);e.next={type:"implicitReturn",op:function(e){return t.HALT},execute:function(e){}}}}}),(e=>{e.addCommand("render",function(t,n,r){if(r.matchToken("render")){var o=t.requireElement("expression",r),a={};return r.matchToken("with")&&(a=t.parseElement("namedArgumentList",r)),{args:[o,a],op:function(t,r,a){if(!(r instanceof Element))throw new Error(o.sourceFor()+" is not an element");return console.log(w(r.innerHTML)),t.result=function(t,n){var r=[];return e.evaluate(t,Object.assign({__ht_template_result:r},n)),r.join("")}(w(r.innerHTML),a),n.findNext(this,t)}}}}),e.addLeafExpression("escape",function(e,t,n){if(n.matchToken("escape")){var r=n.matchTokenType("IDENTIFIER").value,o=n.matchToken("unescaped");return{args:[e.requireElement("expression",n)],op:function(e,t){if(o)return t;if(void 0===t)return"";if("html"===r)return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\x22/g,"&quot;").replace(/\x27/g,"&#039;");throw new Error("Unknown escape: "+r)},evaluate:function(e){return t.unifiedEval(this,e)}}}})})(g),(e=>{function t(t,n,r){this.ctx=t,this.runtime=n,this.cmd=r,this._hyperscript=e,this.bus=new EventTarget}e.addCommand("breakpoint",function(e,n,r){var o;if(r.matchToken("breakpoint"))return{op:function(e){globalThis.hdb=o=new t(e,n,this);try{return o.break(e)}catch(e){console.error(e,e.stack)}}}}),t.prototype.break=function(e){return console.log("=== HDB///_hyperscript/debugger ==="),this.ui(),new Promise((t,n)=>{this.bus.addEventListener("continue",()=>{if(this.ctx!==e){for(var n in e)delete e[n];Object.assign(e,this.ctx)}delete window.hdb,t(this.runtime.findNext(this.cmd,this.ctx))},{once:!0})})},t.prototype.continueExec=function(){this.bus.dispatchEvent(new Event("continue"))},t.prototype.stepOver=function(){if(!this.cmd)return this.continueExec();var e=this.cmd&&"breakpointCommand"===this.cmd.type?this.runtime.findNext(this.cmd,this.ctx):this.runtime.unifiedEval(this.cmd,this.ctx);return"implicitReturn"===e.type?this.stepOut():e&&e.then instanceof Function?e.then(e=>{this.cmd=e,this.bus.dispatchEvent(new Event("step")),this.logCommand()}):void(e.halt_flag?this.bus.dispatchEvent(new Event("continue")):(this.cmd=e,this.bus.dispatchEvent(new Event("step")),this.logCommand()))},t.prototype.stepOut=function(){if(!this.ctx.meta.caller)return this.continueExec();var e=this.ctx.meta.callingCommand,t=this.ctx.me;this.ctx=this.ctx.meta.caller,console.log("[hdb] stepping out into "+this.ctx.meta.feature.displayName),this.ctx.me instanceof Element&&this.ctx.me!==t&&console.log("[hdb] me: ",this.ctx.me),this.cmd=this.runtime.findNext(e,this.ctx),this.cmd=this.runtime.findNext(this.cmd,this.ctx),this.logCommand(),this.bus.dispatchEvent(new Event("step"))},t.prototype.skipTo=function(e){this.cmd=e,this.bus.dispatchEvent(new Event("skip"))},t.prototype.rewrite=function(t,n){const r=t.parent;let o=r.start;for(;o.next!==t;)o=o.next;const a=t.next,i=e.internals.lexer.tokenize(n),u=e.internals.parser.requireElement("command",i);console.log(u),u.startToken=t.startToken,u.endToken=t.endToken,u.programSource=t.programSource,u.sourceFor=function(){return n},o.next=u,u.next=a,u.parent=r,this.bus.dispatchEvent(new Event("step"))},t.prototype.logCommand=function(){var e=this.cmd.sourceFor instanceof Function?this.cmd.sourceFor():"-- "+this.cmd.type;console.log("[hdb] current command: "+e)},t.prototype.ui=function(){var t=document.createElement("div"),n=t.attachShadow({mode:"open"});t.style.cssText="all: initial",n.innerHTML='\n<div class="hdb" _="\n\ton load trigger update \n\ton step from hdb.bus trigger update\n\ton skip from hdb.bus trigger update\n\ton continue from hdb.bus log \'done\' then remove me.getRootNode().host">\n\n\t<script type="text/hyperscript">\n\n\tdef escapeHTML(unsafe)\n\t\tjs(unsafe) return unsafe\n\t\t\t.replace(/&/g, "&amp;")\n\t\t\t.replace(/</g, "&lt;")\n\t\t\t.replace(/>/g, "&gt;")\n\t\t\t.replace(/\\x22/g, "&quot;")\n\t\t\t.replace(/\\x27/g, "&#039;") end\n\t\treturn it\n\tend\n\n\tdef highlightDebugCode\n\t\tset rv to []\n\t\tset hdb.uiCommandMap to []\n\t\tset cmd to hdb.cmd.parent.start\n\t\tappend escapeHTML(hdb.cmd.programSource.substring(0, cmd.startToken.start)) to rv\n\t\trepeat until cmd.halt_flag or cmd.type is \'implicitReturn\'\n\t\t\tpush(cmd) on hdb.uiCommandMap\n\t\t\tset cmdNo to hdb.uiCommandMap\'s length-1\n\t\t\tif global HYPERSCRIPT_HDB_EXPERIMENTAL\n\t\t\t\tappend `<button class="skip" data-cmd="${cmdNo}">skip</button>` to rv\n\t\t\t\tappend `<button class="rewrite" data-cmd="${cmdNo}">rewrite</button>` to rv\n\t\t\tend\n\t\t\tset src to escapeHTML(cmd.sourceFor())\n\t\t\tif cmd is hdb.cmd\n\t\t\t\tappend \'<u class="current"><span data-cmd="\' + cmdNo + \'">\' + src + \'</span></u>\' to rv\n\t\t\telse\n\t\t\t\tappend \'<span data-cmd="\' + cmdNo + \'">\' + src + \'</span>\' to rv\n\t\t\tend\n\t\t\tappend escapeHTML(hdb.cmd.programSource.substring(cmd.endToken.end, cmd.next.startToken.start)) to rv\n\t\t\tset cmd to cmd.next\n\t\tend\n\t\treturn rv.join(\'\')\n\t\t-- set start to hdb.cmd.startToken.start\n\tend\n\n\tdef truncate(str, len)\n\t\tif str.length <= len return str end\n\t\treturn str.substr(0, len) + \'…\'\n\n\tdef prettyPrint(obj)\n\t\tif obj is null      return \'null\'      end\n\t\tif Element.prototype.isPrototypeOf(obj)\n\t\t\tset rv to \'&lt;<span class="token tagname">\' +\n\t\t\t\tobj.tagName.toLowerCase() + "</span>"\n\t\t\tfor attr in Array.from(obj.attributes)\n\t\t\t\tif attr.specified\n\t\t\t\t\tset rv to rv +\n\t\t\t\t\t\t\' <span class="token attr">\' + attr.nodeName +\n\t\t\t\t\t\t\'</span>=<span class="token string">"\' + truncate(attr.textContent, 10) +\n\t\t\t\t\t\t\'"</span>\'\n\t\t\t\tend\n\t\t\tend\n\t\t\tset rv to rv + \'>\'\n\t\t\treturn rv\n\t\telse if obj.call\n\t\t\tif obj.hyperfunc\n\t\t\t\tget "def " + obj.hypername + \' ...\'\n\t\t\telse\n\t\t\t\tget "function "+obj.name+"(...) {...}"\n\t\t\tend\n\t\telse if obj.toString\n\t\t\tcall obj.toString()\n\t\tend\n\t\treturn escapeHTML((it or \'undefined\').trim())\n\tend\n\t<\/script>\n\n\t<header _="\n\ton pointerdown(clientX, clientY)\n\t\thalt the event\n\t\tcall event.stopPropagation()\n\t\tget first .hdb\n\t\tmeasure its x, y\n\t\tset xoff to clientX - x\n\t\tset yoff to clientY - y\n\t\trepeat until event pointerup from document\n\t\t\twait for pointermove or pointerup from document\n\t\t\tadd {\n\t\t\t\tleft: ${its clientX - xoff}px;\n\t\t\t\ttop:  ${its clientY - yoff}px;\n\t\t\t} to .hdb\n\t\tend\n\t">\n\t\t<h2 class="titlebar">HDB</h2>\n\t\t<ul role="toolbar" class="toolbar" _="on pointerdown halt">\n\t\t\t<li><button _="on click call hdb.continueExec()">\n\t\t\t\t&#x23F5; Continue\n\t\t\t</button>\n\t\t\t<li><button _="on click call hdb.stepOver()">\n\t\t\t\t&#8631; Step Over\n\t\t\t</button>\n\t\t</ul>\n\t</header>\n\n\t<section class="sec-code">\n\n\t\t<div class="code-container">\n\t\t\t<pre class="code language-hyperscript" _="\n\t\t\t\ton update from .hdb if hdb.cmd.programSource\n\t\t\t    \tput highlightDebugCode() into me\n\t\t\t    \tif Prism\n\t\t\t    \t\tcall Prism.highlightAllUnder(me)\n\t\t\t    \tend\n\t\t\t        go to bottom of .current in me\n\t\t\t\tend\n\n\t\t\t\ton click\n\t\t\t\t\tif target matches .skip\n\t\t\t\t\t\tget (target\'s @data-cmd) as Int\n\t\t\t\t\t\tcall hdb.skipTo(hdb.uiCommandMap[result])\n\t\t\t\t\tend\n\t\t\t\t\tif target matches .rewrite\n\t\t\t\t\t\tset cmdNo to (target\'s @data-cmd) as Int\n\t\t\t\t\t\tset span to the first <span[data-cmd=\'${cmdNo}\'] />\n\t\t\t\t\t\tput `<form class=rewrite><input id=cmd></form>` into the span\n\t\t\t\t\tend\n\t\t\t\tend\n\n\t\t\t\ton submit\n\t\t\t\t\thalt the event\n\t\t\t\t\tget (closest @data-cmd to target) as Int\n\t\t\t\t\tlog \'cmd no\', it\n\t\t\t\t\tcall hdb.rewrite(hdb.uiCommandMap[result], #cmd\'s value)\n\t\t\t\tend\n\t\t\t"><code></code></pre>\n\t\t</div>\n\t</section>\n\n\t<section class="sec-console" _="\n\t\t-- Print context at startup\n\t\tinit repeat for var in Object.keys(hdb.ctx) if var is not \'meta\'\n\t\t\tsend hdbUI:consoleEntry(input: var, output: hdb.ctx[var]) to #console">\n\n\t\t<ul id="console" role="list" _="\n\t\t\ton hdbUI:consoleEntry(input, output)\n\t\t\t\tif no hdb.consoleHistory set hdb.consoleHistory to [] end\n\t\t\t\tpush(input) on hdb.consoleHistory\n\t\t\t\tset node to #tmpl-console-entry.content.cloneNode(true)\n\t\t\t\tput the node at end of me\n\t\t\t\tset entry to my lastElementChild\n\t\t\t\tgo to bottom of the entry\n\t\t\t\tput escapeHTML(input) into .input in the entry\n\t\t\t\tif no output\n\t\t\t\t\tcall _hyperscript.internals.runtime.parse(input)\n\t\t\t\t\tif its execute is not undefined then call its execute(hdb.ctx)\n\t\t\t\t\telse call its evaluate(hdb.ctx)\n\t\t\t\t\tend\n\t\t\t\t\tset output to it\n\t\t\t\tend\n\t\t\t\tput prettyPrint(output) as Fragment into .output in the entry\n\t\t\t">\n\t\t\t<template id="tmpl-console-entry">\n\t\t\t\t<li class="console-entry">\n\t\t\t\t\t<kbd><code class="input"></code></kbd>\n\t\t\t\t\t<samp class="output"></samp>\n\t\t\t\t</li>\n\t\t\t</template>\n\t\t</ul>\n\n\t\t<form id="console-form" data-hist="0" _="on submit\n\t\t\t\tsend hdbUI:consoleEntry(input: #console-input\'s value) to #console\n\t\t\t\tset #console-input\'s value to \'\'\n\t\t\t\tset @data-hist to 0\n\t\t\t\tset element oldContent to null\n\t\t\t\thalt\n\t\t\ton keydown[key is \'ArrowUp\' or key is \'ArrowDown\']\n\t\t\t\tif no hdb.consoleHistory or exit end\n\t\t\t\tif element oldContent is null set element oldContent to #console-input.value end\n\t\t\t\tif event.key is \'ArrowUp\' and hdb.consoleHistory.length > -@data-hist\n\t\t\t\t\tdecrement @data-hist\n\t\t\t\telse if event.key is \'ArrowDown\' and @data-hist < 0\n\t\t\t\t\tincrement @data-hist\n\t\t\t\tend end\n\t\t\t\tset #console-input.value to hdb.consoleHistory[hdb.consoleHistory.length + @data-hist as Int]\n\t\t\t\t\tor oldContent\n\t\t\t\thalt default\n\t\t\ton input if @data-hist is \'0\' set element oldContent to #console-input.value">\n\t\t\t<input id="console-input" placeholder="Enter an expression&hellip;"\n\t\t\t\tautocomplete="off">\n\t\t</form>\n\t</section>\n\n\t<style>\n\t.hdb {\n\t\tborder: 1px solid #888;\n\t\tborder-radius: .3em;\n\t\tbox-shadow: 0 .2em .3em #0008;\n\t\tposition: fixed;\n\t\ttop: .5em; right: .5em;\n\t\twidth: min(40ch, calc(100% - 1em));\n\t\tmax-height: calc(100% - 1em);\n\t\tbackground-color: white;\n\t\tfont-family: sans-serif;\n\t\topacity: .9;\n\t\tz-index: 2147483647;\n\t\tcolor: black;\n\t\tdisplay: flex;\n\t\tflex-flow: column;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\theader {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tpadding: .4em;\n\t}\n\n\t.titlebar {\n\t\tmargin: 0;\n\t\tfont-size: 1em;\n\t\ttouch-action: none;\n\t}\n\n\t.toolbar {\n\t\tdisplay: flex;\n\t\tgap: .35em;\n\n\t\tlist-style: none;\n\t\tpadding-left: 0;\n\t\tmargin: 0;\n\t}\n\n\t.toolbar a, .toolbar button {\n\t\tbackground: #2183ff;\n\t\tborder: 1px solid #3465a4;\n\t\tbox-shadow: 0 1px #b3c6ff inset, 0 .06em .06em #000;\n\t\tborder-radius: .2em;\n\t\tfont: inherit;\n\t\tpadding: .2em .3em;\n\t\tcolor: white;\n\t\ttext-shadow: 0 1px black;\n\t\tfont-weight: bold;\n\t}\n\n\t.toolbar a:hover .toolbar a:focus, .toolbar button:hover, .toolbar button:focus {\n\t\tbackground: #94c8ff;\n\t}\n\n\t.toolbar a:active, .toolbar button:active {\n\t\tbackground: #3465a4;\n\t}\n\n\t.sec-code {\n\t\tborder-radius: .3em;\n\t\toverflow: hidden;\n\t\tbox-shadow: 0 1px white inset, 0 .06em .06em #0008;\n\t\tbackground: #bdf;\n\t\tmargin: 0 .4em;\n\t\tborder: 1px solid #3465a4;\n\t}\n\n\t.hdb h3 {\n\t\tmargin: 0;\n\t\tfont-size: 1em;\n\t\tpadding: .2em .4em 0 .4em;\n\t}\n\n\t.code-container {\n\t\tdisplay: grid;\n\t\tline-height: 1.2em;\n\t\theight: calc(12 * 1.2em);\n\t\tborder-radius: 0 0 .2em .2em;\n\t\toverflow: auto;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: #0003 transparent;\n\t}\n\n\t.code, #console, #console-input {\n\t\tfont-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;\n\t}\n\n\t.code {\n\t\twidth: 0;\n\t\tmargin: 0;\n\t\tpadding-left: 1ch;\n\t\ttab-size: 2;\n\t\t-moz-tab-size: 2;\n\t\t-o-tab-size: 2;\n\t}\n\n\t.current {\n\t\tfont-weight: bold;\n\t\tbackground: #abf;\n\t}\n\n\t#console {\n\t\toverflow-y: scroll;\n\t\tscrollbar-width: thin;\n\t\tscrollbar-color: #afc2db transparent;\n\t\theight: calc(12 * 1.2em);\n\t\tlist-style: none;\n\t\tpadding-left: 0;\n\t\tmargin: 0 .4em .4em .4em;\n\t\tposition: relative;\n\t\tword-wrap: break-word;\n\t}\n\n\t#console>*+* {\n\t\tmargin-top: .5em;\n\t}\n\n\t.console-entry>* {\n\t\tdisplay: block;\n\t}\n\n\t.console-entry .input  { color: #3465a4; }\n\t.console-entry .output { color: #333; }\n\n\t.console-entry .input:before  { content: \'>> \' }\n\t.console-entry .output:before { content: \'<- \' }\n\n\t#console-form {\n\t\tmargin: 0 .4em .4em .4em;\n\t}\n\n\t#console-input {\n\t\twidth: 100%;\n\t\tfont-size: inherit;\n\t}\n\n\t.token.tagname { font-weight: bold; }\n\t.token.attr, .token.builtin, .token.italic { font-style: italic; }\n\t.token.string { opacity: .8; }\n\t.token.keyword { color: #3465a4; }\n\t.token.bold, .token.punctuation, .token.operator { font-weight: bold; }\n\t</style>\n\t</div>\n\t',document.body.appendChild(t),e.processNode(n.querySelector(".hdb"))}})(g);export{g as default};
//# sourceMappingURL=_hyperscript_w9y.modern.js.map

//AMD insanity
(function (root, factory) {
    //@ts-ignore
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        //@ts-ignore
        define([], factory);
    } else {
        // Browser globals
        root.htmx = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
return (function () {
        'use strict';

        // Public API
        var htmx = {
            onLoad: onLoadHelper,
            process: processNode,
            on: addEventListenerImpl,
            off: removeEventListenerImpl,
            trigger : triggerEvent,
            ajax : ajaxHelper,
            find : find,
            findAll : findAll,
            closest : closest,
            values : function(elt, type){
                var inputValues = getInputValues(elt, type || "post");
                return inputValues.values;
            },
            remove : removeElement,
            addClass : addClassToElement,
            removeClass : removeClassFromElement,
            toggleClass : toggleClassOnElement,
            takeClass : takeClassForElement,
            defineExtension : defineExtension,
            removeExtension : removeExtension,
            logAll : logAll,
            logger : null,
            config : {
                historyEnabled:true,
                historyCacheSize:10,
                refreshOnHistoryMiss:false,
                defaultSwapStyle:'innerHTML',
                defaultSwapDelay:0,
                defaultSettleDelay:20,
                includeIndicatorStyles:true,
                indicatorClass:'htmx-indicator',
                requestClass:'htmx-request',
                addedClass:'htmx-added',
                settlingClass:'htmx-settling',
                swappingClass:'htmx-swapping',
                allowEval:true,
                attributesToSettle:["class", "style", "width", "height"],
                withCredentials:false,
                timeout:0,
                wsReconnectDelay: 'full-jitter',
                disableSelector: "[hx-disable], [data-hx-disable]",
                useTemplateFragments: false,
                scrollBehavior: 'smooth',
            },
            parseInterval:parseInterval,
            _:internalEval,
            createEventSource: function(url){
                return new EventSource(url, {withCredentials:true})
            },
            createWebSocket: function(url){
                return new WebSocket(url, []);
            },
            version: "1.6.1"
        };

        var VERBS = ['get', 'post', 'put', 'delete', 'patch'];
        var VERB_SELECTOR = VERBS.map(function(verb){
            return "[hx-" + verb + "], [data-hx-" + verb + "]"
        }).join(", ");

        //====================================================================
        // Utilities
        //====================================================================

		function parseInterval(str) {
			if (str == undefined)  {
				return undefined
			}
			if (str.slice(-2) == "ms") {
				return parseFloat(str.slice(0,-2)) || undefined
			}
			if (str.slice(-1) == "s") {
				return (parseFloat(str.slice(0,-1)) * 1000) || undefined
			}
			return parseFloat(str) || undefined
        }

        function getRawAttribute(elt, name) {
            return elt.getAttribute && elt.getAttribute(name);
        }

        // resolve with both hx and data-hx prefixes
        function hasAttribute(elt, qualifiedName) {
            return elt.hasAttribute && (elt.hasAttribute(qualifiedName) ||
                elt.hasAttribute("data-" + qualifiedName));
        }

        function getAttributeValue(elt, qualifiedName) {
            return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, "data-" + qualifiedName);
        }

        function parentElt(elt) {
            return elt.parentElement;
        }

        function getDocument() {
            return document;
        }

        function getClosestMatch(elt, condition) {
            if (condition(elt)) {
                return elt;
            } else if (parentElt(elt)) {
                return getClosestMatch(parentElt(elt), condition);
            } else {
                return null;
            }
        }

        function getClosestAttributeValue(elt, attributeName) {
            var closestAttr = null;
            getClosestMatch(elt, function (e) {
                return closestAttr = getAttributeValue(e, attributeName);
            });
            if (closestAttr !== "unset") {
                return closestAttr;
            }
        }

        function matches(elt, selector) {
            // noinspection JSUnresolvedVariable
            var matchesFunction = elt.matches ||
                elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector
                || elt.webkitMatchesSelector || elt.oMatchesSelector;
            return matchesFunction && matchesFunction.call(elt, selector);
        }

        function getStartTag(str) {
            var tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
            var match = tagMatcher.exec( str );
            if (match) {
                return match[1].toLowerCase();
            } else {
                return "";
            }
        }

        function parseHTML(resp, depth) {
            var parser = new DOMParser();
            var responseDoc = parser.parseFromString(resp, "text/html");
            var responseNode = responseDoc.body;
            while (depth > 0) {
                depth--;
                // @ts-ignore
                responseNode = responseNode.firstChild;
            }
            if (responseNode == null) {
                // @ts-ignore
                responseNode = getDocument().createDocumentFragment();
            }
            return responseNode;
        }

        function makeFragment(resp) {
            if (htmx.config.useTemplateFragments) {
                var documentFragment = parseHTML("<body><template>" + resp + "</template></body>", 0);
                return documentFragment.querySelector('template').content;
            } else {
                var startTag = getStartTag(resp);
                switch (startTag) {
                    case "thead":
                    case "tbody":
                    case "tfoot":
                    case "colgroup":
                    case "caption":
                        return parseHTML("<table>" + resp + "</table>", 1);
                    case "col":
                        return parseHTML("<table><colgroup>" + resp + "</colgroup></table>", 2);
                    case "tr":
                        return parseHTML("<table><tbody>" + resp + "</tbody></table>", 2);
                    case "td":
                    case "th":
                        return parseHTML("<table><tbody><tr>" + resp + "</tr></tbody></table>", 3);
                    case "script":
                        return parseHTML("<div>" + resp + "</div>", 1);
                    default:
                        return parseHTML(resp, 0);
                }
            }
        }

        function maybeCall(func){
            if(func) {
                func();
            }
        }

        function isType(o, type) {
            return Object.prototype.toString.call(o) === "[object " + type + "]";
        }

        function isFunction(o) {
            return isType(o, "Function");
        }

        function isRawObject(o) {
            return isType(o, "Object");
        }

        function getInternalData(elt) {
            var dataProp = 'htmx-internal-data';
            var data = elt[dataProp];
            if (!data) {
                data = elt[dataProp] = {};
            }
            return data;
        }

        function toArray(arr) {
            var returnArr = [];
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    returnArr.push(arr[i]);
                }
            }
            return returnArr
        }

        function forEach(arr, func) {
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    func(arr[i]);
                }
            }
        }

        function isScrolledIntoView(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            return elemTop < window.innerHeight && elemBottom >= 0;
        }

        function bodyContains(elt) {
            return getDocument().body.contains(elt);
        }

        function splitOnWhitespace(trigger) {
            return trigger.trim().split(/\s+/);
        }

        function mergeObjects(obj1, obj2) {
            for (var key in obj2) {
                if (obj2.hasOwnProperty(key)) {
                    obj1[key] = obj2[key];
                }
            }
            return obj1;
        }

        function parseJSON(jString) {
            try {
                return JSON.parse(jString);
            } catch(error) {
                logError(error);
                return null;
            }
        }

        //==========================================================================================
        // public API
        //==========================================================================================

        function internalEval(str){
            return maybeEval(getDocument().body, function () {
                return eval(str);
            });
        }

        function onLoadHelper(callback) {
            var value = htmx.on("htmx:load", function(evt) {
                callback(evt.detail.elt);
            });
            return value;
        }

        function logAll(){
            htmx.logger = function(elt, event, data) {
                if(console) {
                    console.log(event, elt, data);
                }
            }
        }

        function find(eltOrSelector, selector) {
            if (selector) {
                return eltOrSelector.querySelector(selector);
            } else {
                return find(getDocument(), eltOrSelector);
            }
        }

        function findAll(eltOrSelector, selector) {
            if (selector) {
                return eltOrSelector.querySelectorAll(selector);
            } else {
                return findAll(getDocument(), eltOrSelector);
            }
        }

        function removeElement(elt, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){removeElement(elt);}, delay)
            } else {
                elt.parentElement.removeChild(elt);
            }
        }

        function addClassToElement(elt, clazz, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){addClassToElement(elt, clazz);}, delay)
            } else {
                elt.classList && elt.classList.add(clazz);
            }
        }

        function removeClassFromElement(elt, clazz, delay) {
            elt = resolveTarget(elt);
            if (delay) {
                setTimeout(function(){removeClassFromElement(elt, clazz);}, delay)
            } else {
                if (elt.classList) {
                    elt.classList.remove(clazz);
                    // if there are no classes left, remove the class attribute
                    if (elt.classList.length === 0) {
                        elt.removeAttribute("class");
                    }
                }
            }
        }

        function toggleClassOnElement(elt, clazz) {
            elt = resolveTarget(elt);
            elt.classList.toggle(clazz);
        }

        function takeClassForElement(elt, clazz) {
            elt = resolveTarget(elt);
            forEach(elt.parentElement.children, function(child){
                removeClassFromElement(child, clazz);
            })
            addClassToElement(elt, clazz);
        }

        function closest(elt, selector) {
            elt = resolveTarget(elt);
            if (elt.closest) {
                return elt.closest(selector);
            } else {
                do{
                    if (elt == null || matches(elt, selector)){
                        return elt;
                    }
                }
                while (elt = elt && parentElt(elt));
            }
        }

        function querySelectorAllExt(elt, selector) {
		    if (selector.indexOf("closest ") === 0) {
                return [closest(elt, selector.substr(8))];
            } else if (selector.indexOf("find ") === 0) {
                return [find(elt, selector.substr(5))];
            } else if (selector === 'document') {
                return [document];
            } else if (selector === 'window') {
                return [window];
            } else {
                return getDocument().querySelectorAll(selector);
            }
        }

        function querySelectorExt(eltOrSelector, selector) {
            if (selector) {
                return querySelectorAllExt(eltOrSelector, selector)[0];
            } else {
                return querySelectorAllExt(getDocument().body, eltOrSelector)[0];
            }
        }

        function resolveTarget(arg2) {
            if (isType(arg2, 'String')) {
                return find(arg2);
            } else {
                return arg2;
            }
        }

        function processEventArgs(arg1, arg2, arg3) {
            if (isFunction(arg2)) {
                return {
                    target: getDocument().body,
                    event: arg1,
                    listener: arg2
                }
            } else {
                return {
                    target: resolveTarget(arg1),
                    event: arg2,
                    listener: arg3
                }
            }

        }

        function addEventListenerImpl(arg1, arg2, arg3) {
            ready(function(){
                var eventArgs = processEventArgs(arg1, arg2, arg3);
                eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener);
            })
            var b = isFunction(arg2);
            return b ? arg2 : arg3;
        }

        function removeEventListenerImpl(arg1, arg2, arg3) {
            ready(function(){
                var eventArgs = processEventArgs(arg1, arg2, arg3);
                eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
            })
            return isFunction(arg2) ? arg2 : arg3;
        }

        //====================================================================
        // Node processing
        //====================================================================

        function getTarget(elt) {
            var explicitTarget = getClosestMatch(elt, function(e){return getAttributeValue(e,"hx-target") !== null});
            if (explicitTarget) {
                var targetStr = getAttributeValue(explicitTarget, "hx-target");
                if (targetStr === "this") {
                    return explicitTarget;
                } else {
                    return querySelectorExt(elt, targetStr)
                }
            } else {
                var data = getInternalData(elt);
                if (data.boosted) {
                    return getDocument().body;
                } else {
                    return elt;
                }
            }
        }

        function shouldSettleAttribute(name) {
            var attributesToSettle = htmx.config.attributesToSettle;
            for (var i = 0; i < attributesToSettle.length; i++) {
                if (name === attributesToSettle[i]) {
                    return true;
                }
            }
            return false;
        }

        function cloneAttributes(mergeTo, mergeFrom) {
            forEach(mergeTo.attributes, function (attr) {
                if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
                    mergeTo.removeAttribute(attr.name)
                }
            });
            forEach(mergeFrom.attributes, function (attr) {
                if (shouldSettleAttribute(attr.name)) {
                    mergeTo.setAttribute(attr.name, attr.value);
                }
            });
        }

        function isInlineSwap(swapStyle, target) {
            var extensions = getExtensions(target);
            for (var i = 0; i < extensions.length; i++) {
                var extension = extensions[i];
                try {
                    if (extension.isInlineSwap(swapStyle)) {
                        return true;
                    }
                } catch(e) {
                    logError(e);
                }
            }
            return swapStyle === "outerHTML";
        }

        function oobSwap(oobValue, oobElement, settleInfo) {
            var selector = "#" + oobElement.id;
            var swapStyle = "outerHTML";
            if (oobValue === "true") {
                // do nothing
            } else if (oobValue.indexOf(":") > 0) {
                swapStyle = oobValue.substr(0, oobValue.indexOf(":"));
                selector  = oobValue.substr(oobValue.indexOf(":") + 1, oobValue.length);
            } else {
                swapStyle = oobValue;
            }

            var target = getDocument().querySelector(selector);
            if (target) {
                var fragment;
                fragment = getDocument().createDocumentFragment();
                fragment.appendChild(oobElement); // pulls the child out of the existing fragment
                if (!isInlineSwap(swapStyle, target)) {
                    fragment = oobElement; // if this is not an inline swap, we use the content of the node, not the node itself
                }
                swap(swapStyle, target, target, fragment, settleInfo);
            } else {
                oobElement.parentNode.removeChild(oobElement);
                triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", {content: oobElement})
            }
            return oobValue;
        }

        function handleOutOfBandSwaps(fragment, settleInfo) {
            forEach(findAll(fragment, '[hx-swap-oob], [data-hx-swap-oob]'), function (oobElement) {
                var oobValue = getAttributeValue(oobElement, "hx-swap-oob");
                if (oobValue != null) {
                    oobSwap(oobValue, oobElement, settleInfo);
                }
            });
        }

        function handlePreservedElements(fragment) {
            forEach(findAll(fragment, '[hx-preserve], [data-hx-preserve]'), function (preservedElt) {
                var id = getAttributeValue(preservedElt, "id");
                var oldElt = getDocument().getElementById(id);
                if (oldElt != null) {
                    preservedElt.parentNode.replaceChild(oldElt, preservedElt);
                }
            });
        }

        function handleAttributes(parentNode, fragment, settleInfo) {
            forEach(fragment.querySelectorAll("[id]"), function (newNode) {
                if (newNode.id && newNode.id.length > 0) {
                    var oldNode = parentNode.querySelector(newNode.tagName + "[id='" + newNode.id + "']");
                    if (oldNode && oldNode !== parentNode) {
                        var newAttributes = newNode.cloneNode();
                        cloneAttributes(newNode, oldNode);
                        settleInfo.tasks.push(function () {
                            cloneAttributes(newNode, newAttributes);
                        });
                    }
                }
            });
        }

        function makeAjaxLoadTask(child) {
            return function () {
                removeClassFromElement(child, htmx.config.addedClass);
                processNode(child);
                processScripts(child);
                processFocus(child)
                triggerEvent(child, 'htmx:load');
            };
        }

        function processFocus(child) {
            var autofocus = "[autofocus]";
            var autoFocusedElt = matches(child, autofocus) ? child : child.querySelector(autofocus)
            if (autoFocusedElt != null) {
                autoFocusedElt.focus();
            }
        }

        function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
            handleAttributes(parentNode, fragment, settleInfo);
            while(fragment.childNodes.length > 0){
                var child = fragment.firstChild;
                addClassToElement(child, htmx.config.addedClass);
                parentNode.insertBefore(child, insertBefore);
                if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                    settleInfo.tasks.push(makeAjaxLoadTask(child));
                }
            }
        }

        function cleanUpElement(element) {
            var internalData = getInternalData(element);
            if (internalData.webSocket) {
                internalData.webSocket.close();
            }
            if (internalData.sseEventSource) {
                internalData.sseEventSource.close();
            }
            if (internalData.listenerInfos) {
                forEach(internalData.listenerInfos, function(info) {
                    if (element !== info.on) {
                        info.on.removeEventListener(info.trigger, info.listener);
                    }
                });
            }
            if (element.children) { // IE
                forEach(element.children, function(child) { cleanUpElement(child) });
            }
        }

        function swapOuterHTML(target, fragment, settleInfo) {
            if (target.tagName === "BODY") {
                return swapInnerHTML(target, fragment, settleInfo);
            } else {
                var eltBeforeNewContent = target.previousSibling;
                insertNodesBefore(parentElt(target), target, fragment, settleInfo);
                if (eltBeforeNewContent == null) {
                    var newElt = parentElt(target).firstChild;
                } else {
                    var newElt = eltBeforeNewContent.nextSibling;
                }
                getInternalData(target).replacedWith = newElt; // tuck away so we can fire events on it later
                settleInfo.elts = [] // clear existing elements
                while(newElt && newElt !== target) {
                    if (newElt.nodeType === Node.ELEMENT_NODE) {
                        settleInfo.elts.push(newElt);
                    }
                    newElt = newElt.nextElementSibling;
                }
                cleanUpElement(target);
                parentElt(target).removeChild(target);
            }
        }

        function swapAfterBegin(target, fragment, settleInfo) {
            return insertNodesBefore(target, target.firstChild, fragment, settleInfo);
        }

        function swapBeforeBegin(target, fragment, settleInfo) {
            return insertNodesBefore(parentElt(target), target, fragment, settleInfo);
        }

        function swapBeforeEnd(target, fragment, settleInfo) {
            return insertNodesBefore(target, null, fragment, settleInfo);
        }

        function swapAfterEnd(target, fragment, settleInfo) {
            return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo);
        }

        function swapInnerHTML(target, fragment, settleInfo) {
            var firstChild = target.firstChild;
            insertNodesBefore(target, firstChild, fragment, settleInfo);
            if (firstChild) {
                while (firstChild.nextSibling) {
                    cleanUpElement(firstChild.nextSibling)
                    target.removeChild(firstChild.nextSibling);
                }
                cleanUpElement(firstChild)
                target.removeChild(firstChild);
            }
        }

        function maybeSelectFromResponse(elt, fragment) {
            var selector = getClosestAttributeValue(elt, "hx-select");
            if (selector) {
                var newFragment = getDocument().createDocumentFragment();
                forEach(fragment.querySelectorAll(selector), function (node) {
                    newFragment.appendChild(node);
                });
                fragment = newFragment;
            }
            return fragment;
        }

        function swap(swapStyle, elt, target, fragment, settleInfo) {
            switch (swapStyle) {
                case "none":
                    return;
                case "outerHTML":
                    swapOuterHTML(target, fragment, settleInfo);
                    return;
                case "afterbegin":
                    swapAfterBegin(target, fragment, settleInfo);
                    return;
                case "beforebegin":
                    swapBeforeBegin(target, fragment, settleInfo);
                    return;
                case "beforeend":
                    swapBeforeEnd(target, fragment, settleInfo);
                    return;
                case "afterend":
                    swapAfterEnd(target, fragment, settleInfo);
                    return;
                default:
                    var extensions = getExtensions(elt);
                    for (var i = 0; i < extensions.length; i++) {
                        var ext = extensions[i];
                        try {
                            var newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
                            if (newElements) {
                                if (typeof newElements.length !== 'undefined') {
                                    // if handleSwap returns an array (like) of elements, we handle them
                                    for (var j = 0; j < newElements.length; j++) {
                                        var child = newElements[j];
                                        if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                                            settleInfo.tasks.push(makeAjaxLoadTask(child));
                                        }
                                    }
                                }
                                return;
                            }
                        } catch (e) {
                            logError(e);
                        }
                    }
                    swapInnerHTML(target, fragment, settleInfo);
            }
        }

        function findTitle(content) {
            if (content.indexOf('<title') > -1) {
                var contentWithSvgsRemoved = content.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, '');
                var result = contentWithSvgsRemoved.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);

                if (result) {
                    return result[2];
                }
            }
        }

        function selectAndSwap(swapStyle, target, elt, responseText, settleInfo) {
            var title = findTitle(responseText);
            if(title) {
                var titleElt = find("title");
                if(titleElt) {
                    titleElt.innerHTML = title;
                } else {
                    window.document.title = title;
                }
            }
            var fragment = makeFragment(responseText);
            if (fragment) {
                handleOutOfBandSwaps(fragment, settleInfo);
                fragment = maybeSelectFromResponse(elt, fragment);
                handlePreservedElements(fragment);
                return swap(swapStyle, elt, target, fragment, settleInfo);
            }
        }

        function handleTrigger(xhr, header, elt) {
            var triggerBody = xhr.getResponseHeader(header);
            if (triggerBody.indexOf("{") === 0) {
                var triggers = parseJSON(triggerBody);
                for (var eventName in triggers) {
                    if (triggers.hasOwnProperty(eventName)) {
                        var detail = triggers[eventName];
                        if (!isRawObject(detail)) {
                            detail = {"value": detail}
                        }
                        triggerEvent(elt, eventName, detail);
                    }
                }
            } else {
                triggerEvent(elt, triggerBody, []);
            }
        }

        var WHITESPACE = /\s/;
        var WHITESPACE_OR_COMMA = /[\s,]/;
        var SYMBOL_START = /[_$a-zA-Z]/;
        var SYMBOL_CONT = /[_$a-zA-Z0-9]/;
        var STRINGISH_START = ['"', "'", "/"];
        var NOT_WHITESPACE = /[^\s]/;
        function tokenizeString(str) {
            var tokens = [];
            var position = 0;
            while (position < str.length) {
                if(SYMBOL_START.exec(str.charAt(position))) {
                    var startPosition = position;
                    while (SYMBOL_CONT.exec(str.charAt(position + 1))) {
                        position++;
                    }
                    tokens.push(str.substr(startPosition, position - startPosition + 1));
                } else if (STRINGISH_START.indexOf(str.charAt(position)) !== -1) {
                    var startChar = str.charAt(position);
                    var startPosition = position;
                    position++;
                    while (position < str.length && str.charAt(position) !== startChar ) {
                        if (str.charAt(position) === "\\") {
                            position++;
                        }
                        position++;
                    }
                    tokens.push(str.substr(startPosition, position - startPosition + 1));
                } else {
                    var symbol = str.charAt(position);
                    tokens.push(symbol);
                }
                position++;
            }
            return tokens;
        }

        function isPossibleRelativeReference(token, last, paramName) {
            return SYMBOL_START.exec(token.charAt(0)) &&
                token !== "true" &&
                token !== "false" &&
                token !== "this" &&
                token !== paramName &&
                last !== ".";
        }

        function maybeGenerateConditional(elt, tokens, paramName) {
            if (tokens[0] === '[') {
                tokens.shift();
                var bracketCount = 1;
                var conditionalSource = " return (function(" + paramName + "){ return (";
                var last = null;
                while (tokens.length > 0) {
                    var token = tokens[0];
                    if (token === "]") {
                        bracketCount--;
                        if (bracketCount === 0) {
                            if (last === null) {
                                conditionalSource = conditionalSource + "true";
                            }
                            tokens.shift();
                            conditionalSource += ")})";
                            try {
                                var conditionFunction = maybeEval(elt,function () {
                                    return Function(conditionalSource)();
                                    },
                                    function(){return true})
                                conditionFunction.source = conditionalSource;
                                return conditionFunction;
                            } catch (e) {
                                triggerErrorEvent(getDocument().body, "htmx:syntax:error", {error:e, source:conditionalSource})
                                return null;
                            }
                        }
                    } else if (token === "[") {
                        bracketCount++;
                    }
                    if (isPossibleRelativeReference(token, last, paramName)) {
                            conditionalSource += "((" + paramName + "." + token + ") ? (" + paramName + "." + token + ") : (window." + token + "))";
                    } else {
                        conditionalSource = conditionalSource + token;
                    }
                    last = tokens.shift();
                }
            }
        }

        function consumeUntil(tokens, match) {
            var result = "";
            while (tokens.length > 0 && !tokens[0].match(match)) {
                result += tokens.shift();
            }
            return result;
        }

        var INPUT_SELECTOR = 'input, textarea, select';
        function getTriggerSpecs(elt) {
            var explicitTrigger = getAttributeValue(elt, 'hx-trigger');
            var triggerSpecs = [];
            if (explicitTrigger) {
                var tokens = tokenizeString(explicitTrigger);
                do {
                    consumeUntil(tokens, NOT_WHITESPACE);
                    var initialLength = tokens.length;
                    var trigger = consumeUntil(tokens, /[,\[\s]/);
                    if (trigger !== "") {
                        if (trigger === "every") {
                            var every = {trigger: 'every'};
                            consumeUntil(tokens, NOT_WHITESPACE);
                            every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
                            consumeUntil(tokens, NOT_WHITESPACE);
                            var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                            if (eventFilter) {
                                every.eventFilter = eventFilter;
                            }
                            triggerSpecs.push(every);
                        } else if (trigger.indexOf("sse:") === 0) {
                            triggerSpecs.push({trigger: 'sse', sseEvent: trigger.substr(4)});
                        } else {
                            var triggerSpec = {trigger: trigger};
                            var eventFilter = maybeGenerateConditional(elt, tokens, "event");
                            if (eventFilter) {
                                triggerSpec.eventFilter = eventFilter;
                            }
                            while (tokens.length > 0 && tokens[0] !== ",") {
                                consumeUntil(tokens, NOT_WHITESPACE)
                                var token = tokens.shift();
                                if (token === "changed") {
                                    triggerSpec.changed = true;
                                } else if (token === "once") {
                                    triggerSpec.once = true;
                                } else if (token === "consume") {
                                    triggerSpec.consume = true;
                                } else if (token === "delay" && tokens[0] === ":") {
                                    tokens.shift();
                                    triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                                } else if (token === "from" && tokens[0] === ":") {
                                    tokens.shift();
                                    let from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                                    if (from_arg === "closest" || from_arg === "find") {
                                        tokens.shift();
                                        from_arg +=
                                            " " +
                                            consumeUntil(
                                                tokens,
                                                WHITESPACE_OR_COMMA
                                            );
                                    }
                                    triggerSpec.from = from_arg;
                                } else if (token === "target" && tokens[0] === ":") {
                                    tokens.shift();
                                    triggerSpec.target = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                                } else if (token === "throttle" && tokens[0] === ":") {
                                    tokens.shift();
                                    triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                                } else if (token === "queue" && tokens[0] === ":") {
                                    tokens.shift();
                                    triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                                } else if ((token === "root" || token === "threshold") && tokens[0] === ":") {
                                    tokens.shift();
                                    triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                                } else {
                                    triggerErrorEvent(elt, "htmx:syntax:error", {token:tokens.shift()});
                                }
                            }
                            triggerSpecs.push(triggerSpec);
                        }
                    }
                    if (tokens.length === initialLength) {
                        triggerErrorEvent(elt, "htmx:syntax:error", {token:tokens.shift()});
                    }
                    consumeUntil(tokens, NOT_WHITESPACE);
                } while (tokens[0] === "," && tokens.shift())
            }

            if (triggerSpecs.length > 0) {
                return triggerSpecs;
            } else if (matches(elt, 'form')) {
                return [{trigger: 'submit'}];
            } else if (matches(elt, INPUT_SELECTOR)) {
                return [{trigger: 'change'}];
            } else {
                return [{trigger: 'click'}];
            }
        }

        function cancelPolling(elt) {
            getInternalData(elt).cancelled = true;
        }

        function processPolling(elt, verb, path, spec) {
            var nodeData = getInternalData(elt);
            nodeData.timeout = setTimeout(function () {
                if (bodyContains(elt) && nodeData.cancelled !== true) {
                    if (!maybeFilterEvent(spec, makeEvent('hx:poll:trigger', {triggerSpec:spec}))) {
                        issueAjaxRequest(verb, path, elt);
                    }
                    processPolling(elt, verb, getAttributeValue(elt, "hx-" + verb), spec);
                }
            }, spec.pollInterval);
        }

        function isLocalLink(elt) {
            return location.hostname === elt.hostname &&
                getRawAttribute(elt,'href') &&
                getRawAttribute(elt,'href').indexOf("#") !== 0;
        }

        function boostElement(elt, nodeData, triggerSpecs) {
            if ((elt.tagName === "A" && isLocalLink(elt) && elt.target === "") || elt.tagName === "FORM") {
                nodeData.boosted = true;
                var verb, path;
                if (elt.tagName === "A") {
                    verb = "get";
                    path = getRawAttribute(elt, 'href');
                    nodeData.pushURL = true;
                } else {
                    var rawAttribute = getRawAttribute(elt, "method");
                    verb = rawAttribute ? rawAttribute.toLowerCase() : "get";
                    if (verb === "get") {
                        nodeData.pushURL = true;
                    }
                    path = getRawAttribute(elt, 'action');
                }
                triggerSpecs.forEach(function(triggerSpec) {
                    addEventListener(elt, verb, path, nodeData, triggerSpec, true);
                });
            }
        }

        function shouldCancel(evt, elt) {
            if (evt.type === "submit" || evt.type === "click") {
                if (elt.tagName === "FORM") {
                    return true;
                }
                if (matches(elt, 'input[type="submit"], button') && closest(elt, 'form') !== null) {
                    return true;
                }
                if (elt.tagName === "A" && elt.href &&
                    (elt.getAttribute('href') === '#' || elt.getAttribute('href').indexOf("#") !== 0)) {
                    return true;
                }
            }
            return false;
        }

        function ignoreBoostedAnchorCtrlClick(elt, evt) {
            return getInternalData(elt).boosted && elt.tagName === "A" && evt.type === "click" && (evt.ctrlKey || evt.metaKey);
        }

        function maybeFilterEvent(triggerSpec, evt) {
            var eventFilter = triggerSpec.eventFilter;
            if(eventFilter){
                try {
                    return eventFilter(evt) !== true;
                } catch(e) {
                    triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {error: e, source:eventFilter.source});
                    return true;
                }
            }
            return false;
        }

        function addEventListener(elt, verb, path, nodeData, triggerSpec, explicitCancel) {
            var eltsToListenOn;
            if (triggerSpec.from) {
                eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
            } else {
                eltsToListenOn = [elt];
            }
            forEach(eltsToListenOn, function (eltToListenOn) {
                var eventListener = function (evt) {
                    if (!bodyContains(elt)) {
                        eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
                        return;
                    }
                    if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
                        return;
                    }
                    if (explicitCancel || shouldCancel(evt, elt)) {
                        evt.preventDefault();
                    }
                    if (maybeFilterEvent(triggerSpec, evt)) {
                        return;
                    }
                    var eventData = getInternalData(evt);
                    eventData.triggerSpec = triggerSpec;
                    if (eventData.handledFor == null) {
                        eventData.handledFor = [];
                    }
                    var elementData = getInternalData(elt);
                    if (eventData.handledFor.indexOf(elt) < 0) {
                        eventData.handledFor.push(elt);
                        if (triggerSpec.consume) {
                            evt.stopPropagation();
                        }
                        if (triggerSpec.target && evt.target) {
                            if (!matches(evt.target, triggerSpec.target)) {
                                return;
                            }
                        }
                        if (triggerSpec.once) {
                            if (elementData.triggeredOnce) {
                                return;
                            } else {
                                elementData.triggeredOnce = true;
                            }
                        }
                        if (triggerSpec.changed) {
                            if (elementData.lastValue === elt.value) {
                                return;
                            } else {
                                elementData.lastValue = elt.value;
                            }
                        }
                        if (elementData.delayed) {
                            clearTimeout(elementData.delayed);
                        }
                        if (elementData.throttle) {
                            return;
                        }

                        if (triggerSpec.throttle) {
                            if (!elementData.throttle) {
                                issueAjaxRequest(verb, path, elt, evt);
                                elementData.throttle = setTimeout(function () {
                                    elementData.throttle = null;
                                }, triggerSpec.throttle);
                            }
                        } else if (triggerSpec.delay) {
                            elementData.delayed = setTimeout(function () {
                                issueAjaxRequest(verb, path, elt, evt);
                            }, triggerSpec.delay);
                        } else {
                            issueAjaxRequest(verb, path, elt, evt);
                        }
                    }
                };
                if (nodeData.listenerInfos == null) {
                    nodeData.listenerInfos = [];
                }
                nodeData.listenerInfos.push({
                    trigger: triggerSpec.trigger,
                    listener: eventListener,
                    on: eltToListenOn
                })
                eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
            })
        }

        var windowIsScrolling = false // used by initScrollHandler
        var scrollHandler = null;
        function initScrollHandler() {
            if (!scrollHandler) {
                scrollHandler = function() {
                    windowIsScrolling = true
                };
                window.addEventListener("scroll", scrollHandler)
                setInterval(function() {
                    if (windowIsScrolling) {
                        windowIsScrolling = false;
                        forEach(getDocument().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function (elt) {
                            maybeReveal(elt);
                        })
                    }
                }, 200);
            }
        }

        function maybeReveal(elt) {
            if (!hasAttribute(elt,'data-hx-revealed') && isScrolledIntoView(elt)) {
                elt.setAttribute('data-hx-revealed', 'true');
                var nodeData = getInternalData(elt);
                if (nodeData.initialized) {
                    issueAjaxRequest(nodeData.verb, nodeData.path, elt);
                } else {
                    // if the node isn't initialized, wait for it before triggering the request
                    elt.addEventListener("htmx:afterProcessNode",
                        function () {
                            issueAjaxRequest(nodeData.verb, nodeData.path, elt);
                        }, {once: true});
                }
            }
        }

        function processWebSocketInfo(elt, nodeData, info) {
            var values = splitOnWhitespace(info);
            for (var i = 0; i < values.length; i++) {
                var value = values[i].split(/:(.+)/);
                if (value[0] === "connect") {
                    ensureWebSocket(elt, value[1], 0);
                }
                if (value[0] === "send") {
                    processWebSocketSend(elt);
                }
            }
        }

        function ensureWebSocket(elt, wssSource, retryCount) {
            if (!bodyContains(elt)) {
                return;  // stop ensuring websocket connection when socket bearing element ceases to exist
            }

            if (wssSource.indexOf("/") == 0) {  // complete absolute paths only
                var base_part = location.hostname + (location.port ? ':'+location.port: '');
                if (location.protocol == 'https:') {
                    wssSource = "wss://" + base_part + wssSource;
                } else if (location.protocol == 'http:') {
                    wssSource = "ws://" + base_part + wssSource;
                }
            }
            var socket = htmx.createWebSocket(wssSource);
            socket.onerror = function (e) {
                triggerErrorEvent(elt, "htmx:wsError", {error:e, socket:socket});
                maybeCloseWebSocketSource(elt);
            };

            socket.onclose = function (e) {
                if ([1006, 1012, 1013].indexOf(e.code) >= 0) {  // Abnormal Closure/Service Restart/Try Again Later
                    var delay = getWebSocketReconnectDelay(retryCount);
                    setTimeout(function() {
                        ensureWebSocket(elt, wssSource, retryCount+1);  // creates a websocket with a new timeout
                    }, delay);
                }
            };
            socket.onopen = function (e) {
                retryCount = 0;
            }

            getInternalData(elt).webSocket = socket;
            socket.addEventListener('message', function (event) {
                if (maybeCloseWebSocketSource(elt)) {
                    return;
                }

                var response = event.data;
                withExtensions(elt, function(extension){
                    response = extension.transformResponse(response, null, elt);
                });

                var settleInfo = makeSettleInfo(elt);
                var fragment = makeFragment(response);
                var children = toArray(fragment.children);
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    oobSwap(getAttributeValue(child, "hx-swap-oob") || "true", child, settleInfo);
                }

                settleImmediately(settleInfo.tasks);
            });
        }

        function maybeCloseWebSocketSource(elt) {
            if (!bodyContains(elt)) {
                getInternalData(elt).webSocket.close();
                return true;
            }
        }

        function processWebSocketSend(elt) {
            var webSocketSourceElt = getClosestMatch(elt, function (parent) {
                return getInternalData(parent).webSocket != null;
            });
            if (webSocketSourceElt) {
                elt.addEventListener(getTriggerSpecs(elt)[0].trigger, function (evt) {
                    var webSocket = getInternalData(webSocketSourceElt).webSocket;
                    var headers = getHeaders(elt, webSocketSourceElt);
                    var results = getInputValues(elt, 'post');
                    var errors = results.errors;
                    var rawParameters = results.values;
                    var expressionVars = getExpressionVars(elt);
                    var allParameters = mergeObjects(rawParameters, expressionVars);
                    var filteredParameters = filterValues(allParameters, elt);
                    filteredParameters['HEADERS'] = headers;
                    if (errors && errors.length > 0) {
                        triggerEvent(elt, 'htmx:validation:halted', errors);
                        return;
                    }
                    webSocket.send(JSON.stringify(filteredParameters));
                    if(shouldCancel(evt, elt)){
                        evt.preventDefault();
                    }
                });
            } else {
                triggerErrorEvent(elt, "htmx:noWebSocketSourceError");
            }
        }

        function getWebSocketReconnectDelay(retryCount) {
            var delay = htmx.config.wsReconnectDelay;
            if (typeof delay === 'function') {
                // @ts-ignore
                return delay(retryCount);
            }
            if (delay === 'full-jitter') {
                var exp = Math.min(retryCount, 6);
                var maxDelay = 1000 * Math.pow(2, exp);
                return maxDelay * Math.random();
            }
            logError('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
        }

        //====================================================================
        // Server Sent Events
        //====================================================================

        function processSSEInfo(elt, nodeData, info) {
            var values = splitOnWhitespace(info);
            for (var i = 0; i < values.length; i++) {
                var value = values[i].split(/:(.+)/);
                if (value[0] === "connect") {
                    processSSESource(elt, value[1]);
                }

                if ((value[0] === "swap")) {
                    processSSESwap(elt, value[1])
                }
            }
        }

        function processSSESource(elt, sseSrc) {
            var source = htmx.createEventSource(sseSrc);
            source.onerror = function (e) {
                triggerErrorEvent(elt, "htmx:sseError", {error:e, source:source});
                maybeCloseSSESource(elt);
            };
            getInternalData(elt).sseEventSource = source;
        }

        function processSSESwap(elt, sseEventName) {
            var sseSourceElt = getClosestMatch(elt, hasEventSource);
            if (sseSourceElt) {
                var sseEventSource = getInternalData(sseSourceElt).sseEventSource;
                var sseListener = function (event) {
                    if (maybeCloseSSESource(sseSourceElt)) {
                        sseEventSource.removeEventListener(sseEventName, sseListener);
                        return;
                    }

                    ///////////////////////////
                    // TODO: merge this code with AJAX and WebSockets code in the future.

                    var response = event.data;
                    withExtensions(elt, function(extension){
                        response = extension.transformResponse(response, null, elt);
                    });

                    var swapSpec = getSwapSpecification(elt)
                    var target = getTarget(elt)
                    var settleInfo = makeSettleInfo(elt);

                    selectAndSwap(swapSpec.swapStyle, elt, target, response, settleInfo)
                    settleImmediately(settleInfo.tasks)
                    triggerEvent(elt, "htmx:sseMessage", event)
                };

                getInternalData(elt).sseListener = sseListener;
                sseEventSource.addEventListener(sseEventName, sseListener);
            } else {
                triggerErrorEvent(elt, "htmx:noSSESourceError");
            }
        }

        function processSSETrigger(elt, verb, path, sseEventName) {
            var sseSourceElt = getClosestMatch(elt, hasEventSource);
            if (sseSourceElt) {
                var sseEventSource = getInternalData(sseSourceElt).sseEventSource;
                var sseListener = function () {
                    if (!maybeCloseSSESource(sseSourceElt)) {
                        if (bodyContains(elt)) {
                            issueAjaxRequest(verb, path, elt);
                        } else {
                            sseEventSource.removeEventListener(sseEventName, sseListener);
                        }
                    }
                };
                getInternalData(elt).sseListener = sseListener;
                sseEventSource.addEventListener(sseEventName, sseListener);
            } else {
                triggerErrorEvent(elt, "htmx:noSSESourceError");
            }
        }

        function maybeCloseSSESource(elt) {
            if (!bodyContains(elt)) {
                getInternalData(elt).sseEventSource.close();
                return true;
            }
        }

        function hasEventSource(node) {
            return getInternalData(node).sseEventSource != null;
        }

        //====================================================================

        function loadImmediately(elt, verb, path, nodeData, delay) {
            var load = function(){
                if (!nodeData.loaded) {
                    nodeData.loaded = true;
                    issueAjaxRequest(verb, path, elt);
                }
            }
            if (delay) {
                setTimeout(load, delay);
            } else {
                load();
            }
        }

        function processVerbs(elt, nodeData, triggerSpecs) {
            var explicitAction = false;
            forEach(VERBS, function (verb) {
                if (hasAttribute(elt,'hx-' + verb)) {
                    var path = getAttributeValue(elt, 'hx-' + verb);
                    explicitAction = true;
                    nodeData.path = path;
                    nodeData.verb = verb;
                    triggerSpecs.forEach(function(triggerSpec) {
                        if (triggerSpec.sseEvent) {
                            processSSETrigger(elt, verb, path, triggerSpec.sseEvent);
                        } else if (triggerSpec.trigger === "revealed") {
                            initScrollHandler();
                            maybeReveal(elt);
                        } else if (triggerSpec.trigger === "intersect") {
                            var observerOptions = {};
                            if (triggerSpec.root) {
                                observerOptions.root = querySelectorExt(elt, triggerSpec.root)
                            }
                            if (triggerSpec.threshold) {
                                observerOptions.threshold = parseFloat(triggerSpec.threshold);
                            }
                            var observer = new IntersectionObserver(function (entries) {
                                for (var i = 0; i < entries.length; i++) {
                                    var entry = entries[i];
                                    if (entry.isIntersecting) {
                                        triggerEvent(elt, "intersect");
                                        break;
                                    }
                                }
                            }, observerOptions);
                            observer.observe(elt);
                            addEventListener(elt, verb, path, nodeData, triggerSpec);
                        } else if (triggerSpec.trigger === "load") {
                            loadImmediately(elt, verb, path, nodeData, triggerSpec.delay);
                        } else if (triggerSpec.pollInterval) {
                            nodeData.polling = true;
                            processPolling(elt, verb, path, triggerSpec);
                        } else {
                            addEventListener(elt, verb, path, nodeData, triggerSpec);
                        }
                    });
                }
            });
            return explicitAction;
        }

        function evalScript(script) {
            if (script.type === "text/javascript" || script.type === "") {
                var newScript = getDocument().createElement("script");
                forEach(script.attributes, function (attr) {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = script.textContent;
                newScript.async = false;
                var parent = script.parentElement;

                try {
                    parent.insertBefore(newScript, script);
                } catch (e) {
                    logError(e);
                } finally {
                    parent.removeChild(script);
                }
            }
        }

        function processScripts(elt) {
            if (matches(elt, "script")) {
                evalScript(elt);
            }
            forEach(findAll(elt, "script"), function (script) {
                evalScript(script);
            });
        }

        function isBoosted() {
            return document.querySelector("[hx-boost], [data-hx-boost]");
        }

        function findElementsToProcess(elt) {
            if (elt.querySelectorAll) {
                var boostedElts = isBoosted() ? ", a, form" : "";
                var results = elt.querySelectorAll(VERB_SELECTOR + boostedElts + ", [hx-sse], [data-hx-sse], [hx-ws]," +
                    " [data-hx-ws], [hx-ext], [hx-data-ext]");
                return results;
            } else {
                return [];
            }
        }

        function initButtonTracking(form){
            var maybeSetLastButtonClicked = function(evt){
                if (matches(evt.target, "button, input[type='submit']")) {
                    var internalData = getInternalData(form);
                    internalData.lastButtonClicked = evt.target;
                }
            };

            // need to handle both click and focus in:
            //   focusin - in case someone tabs in to a button and hits the space bar
            //   click - on OSX buttons do not focus on click see https://bugs.webkit.org/show_bug.cgi?id=13724

            form.addEventListener('click', maybeSetLastButtonClicked)
            form.addEventListener('focusin', maybeSetLastButtonClicked)
            form.addEventListener('focusout', function(evt){
                var internalData = getInternalData(form);
                internalData.lastButtonClicked = null;
            })
        }

        function initNode(elt) {
            if (elt.closest && elt.closest(htmx.config.disableSelector)) {
                return;
            }
            var nodeData = getInternalData(elt);
            if (!nodeData.initialized) {
                nodeData.initialized = true;
                triggerEvent(elt, "htmx:beforeProcessNode")

                if (elt.value) {
                    nodeData.lastValue = elt.value;
                }

                var triggerSpecs = getTriggerSpecs(elt);
                var explicitAction = processVerbs(elt, nodeData, triggerSpecs);

                if (!explicitAction && getClosestAttributeValue(elt, "hx-boost") === "true") {
                    boostElement(elt, nodeData, triggerSpecs);
                }

                if (elt.tagName === "FORM") {
                    initButtonTracking(elt);
                }

                var sseInfo = getAttributeValue(elt, 'hx-sse');
                if (sseInfo) {
                    processSSEInfo(elt, nodeData, sseInfo);
                }

                var wsInfo = getAttributeValue(elt, 'hx-ws');
                if (wsInfo) {
                    processWebSocketInfo(elt, nodeData, wsInfo);
                }
                triggerEvent(elt, "htmx:afterProcessNode");
            }
        }

        function processNode(elt) {
            elt = resolveTarget(elt);
            initNode(elt);
            forEach(findElementsToProcess(elt), function(child) { initNode(child) });
        }

        //====================================================================
        // Event/Log Support
        //====================================================================

        function kebabEventName(str) {
            return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        }

        function makeEvent(eventName, detail) {
            var evt;
            if (window.CustomEvent && typeof window.CustomEvent === 'function') {
                evt = new CustomEvent(eventName, {bubbles: true, cancelable: true, detail: detail});
            } else {
                evt = getDocument().createEvent('CustomEvent');
                evt.initCustomEvent(eventName, true, true, detail);
            }
            return evt;
        }

        function triggerErrorEvent(elt, eventName, detail) {
            triggerEvent(elt, eventName, mergeObjects({error:eventName}, detail));
        }

        function ignoreEventForLogging(eventName) {
            return eventName === "htmx:afterProcessNode"
        }

        function withExtensions(elt, toDo) {
            forEach(getExtensions(elt), function(extension){
                try {
                    toDo(extension);
                } catch (e) {
                    logError(e);
                }
            });
        }

        function logError(msg) {
            if(console.error) {
                console.error(msg);
            } else if (console.log) {
                console.log("ERROR: ", msg);
            }
        }

        function triggerEvent(elt, eventName, detail) {
            elt = resolveTarget(elt);
            if (detail == null) {
                detail = {};
            }
            detail["elt"] = elt;
            var event = makeEvent(eventName, detail);
            if (htmx.logger && !ignoreEventForLogging(eventName)) {
                htmx.logger(elt, eventName, detail);
            }
            if (detail.error) {
                logError(detail.error);
                triggerEvent(elt, "htmx:error", {errorInfo:detail})
            }
            var eventResult = elt.dispatchEvent(event);
            var kebabName = kebabEventName(eventName);
            if (eventResult && kebabName !== eventName) {
                var kebabedEvent = makeEvent(kebabName, event.detail);
                eventResult = eventResult && elt.dispatchEvent(kebabedEvent)
            }
            withExtensions(elt, function (extension) {
                eventResult = eventResult && (extension.onEvent(eventName, event) !== false)
            });
            return eventResult;
        }

        //====================================================================
        // History Support
        //====================================================================
        var currentPathForHistory = location.pathname+location.search;

        function getHistoryElement() {
            var historyElt = getDocument().querySelector('[hx-history-elt],[data-hx-history-elt]');
            return historyElt || getDocument().body;
        }

        function saveToHistoryCache(url, content, title, scroll) {
            var historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var i = 0; i < historyCache.length; i++) {
                if (historyCache[i].url === url) {
                    historyCache.splice(i, 1);
                    break;
                }
            }
            historyCache.push({url:url, content: content, title:title, scroll:scroll})
            while (historyCache.length > htmx.config.historyCacheSize) {
                historyCache.shift();
            }
            while(historyCache.length > 0){
                try {
                    localStorage.setItem("htmx-history-cache", JSON.stringify(historyCache));
                    break;
                } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:historyCacheError", {cause:e, cache: historyCache})
                    historyCache.shift(); // shrink the cache and retry
                }
            }
        }

        function getCachedHistory(url) {
            var historyCache = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var i = 0; i < historyCache.length; i++) {
                if (historyCache[i].url === url) {
                    return historyCache[i];
                }
            }
            return null;
        }

        function cleanInnerHtmlForHistory(elt) {
            var className = htmx.config.requestClass;
            var clone = elt.cloneNode(true);
            forEach(findAll(clone, "." + className), function(child){
                removeClassFromElement(child, className);
            });
            return clone.innerHTML;
        }

        function saveHistory() {
            var elt = getHistoryElement();
            var path = currentPathForHistory || location.pathname+location.search;
            triggerEvent(getDocument().body, "htmx:beforeHistorySave", {path:path, historyElt:elt});
            if(htmx.config.historyEnabled) history.replaceState({htmx:true}, getDocument().title, window.location.href);
            saveToHistoryCache(path, cleanInnerHtmlForHistory(elt), getDocument().title, window.scrollY);
        }

        function pushUrlIntoHistory(path) {
            if(htmx.config.historyEnabled)  history.pushState({htmx:true}, "", path);
            currentPathForHistory = path;
        }

        function settleImmediately(tasks) {
            forEach(tasks, function (task) {
                task.call();
            });
        }

        function loadHistoryFromServer(path) {
            var request = new XMLHttpRequest();
            var details = {path: path, xhr:request};
            triggerEvent(getDocument().body, "htmx:historyCacheMiss", details);
            request.open('GET', path, true);
            request.setRequestHeader("HX-History-Restore-Request", "true");
            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", details);
                    var fragment = makeFragment(this.response);
                    // @ts-ignore
                    fragment = fragment.querySelector('[hx-history-elt],[data-hx-history-elt]') || fragment;
                    var historyElement = getHistoryElement();
                    var settleInfo = makeSettleInfo(historyElement);
                    // @ts-ignore
                    swapInnerHTML(historyElement, fragment, settleInfo)
                    settleImmediately(settleInfo.tasks);
                    currentPathForHistory = path;
                    triggerEvent(getDocument().body, "htmx:historyRestore", {path:path});
                } else {
                    triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", details);
                }
            };
            request.send();
        }

        function restoreHistory(path) {
            saveHistory();
            path = path || location.pathname+location.search;
            var cached = getCachedHistory(path);
            if (cached) {
                var fragment = makeFragment(cached.content);
                var historyElement = getHistoryElement();
                var settleInfo = makeSettleInfo(historyElement);
                swapInnerHTML(historyElement, fragment, settleInfo)
                settleImmediately(settleInfo.tasks);
                document.title = cached.title;
                window.scrollTo(0, cached.scroll);
                currentPathForHistory = path;
                triggerEvent(getDocument().body, "htmx:historyRestore", {path:path});
            } else {
                if (htmx.config.refreshOnHistoryMiss) {
                    window.location.reload(true);
                } else {
                    loadHistoryFromServer(path);
                }
            }
        }

        function shouldPush(elt) {
            var pushUrl = getClosestAttributeValue(elt, "hx-push-url");
            return (pushUrl && pushUrl !== "false") ||
                (getInternalData(elt).boosted && getInternalData(elt).pushURL);
        }

        function getPushUrl(elt) {
            var pushUrl = getClosestAttributeValue(elt, "hx-push-url");
            return (pushUrl === "true" || pushUrl === "false") ? null : pushUrl;
        }

        function addRequestIndicatorClasses(elt) {
            var indicator = getClosestAttributeValue(elt, 'hx-indicator');
            if (indicator) {
                var indicators = querySelectorAllExt(elt, indicator);
            } else {
                indicators = [elt];
            }
            forEach(indicators, function (ic) {
                ic.classList["add"].call(ic.classList, htmx.config.requestClass);
            });
            return indicators;
        }

        function removeRequestIndicatorClasses(indicators) {
            forEach(indicators, function (ic) {
                ic.classList["remove"].call(ic.classList, htmx.config.requestClass);
            });
        }

        //====================================================================
        // Input Value Processing
        //====================================================================

        function haveSeenNode(processed, elt) {
            for (var i = 0; i < processed.length; i++) {
                var node = processed[i];
                if (node.isSameNode(elt)) {
                    return true;
                }
            }
            return false;
        }

        function shouldInclude(elt) {
            if(elt.name === "" || elt.name == null || elt.disabled) {
                return false;
            }
            // ignore "submitter" types (see jQuery src/serialize.js)
            if (elt.type === "button" || elt.type === "submit" || elt.tagName === "image" || elt.tagName === "reset" || elt.tagName === "file" ) {
                return false;
            }
            if (elt.type === "checkbox" || elt.type === "radio" ) {
                return elt.checked;
            }
            return true;
        }

        function processInputValue(processed, values, errors, elt, validate) {
            if (elt == null || haveSeenNode(processed, elt)) {
                return;
            } else {
                processed.push(elt);
            }
            if (shouldInclude(elt)) {
                var name = getRawAttribute(elt,"name");
                var value = elt.value;
                if (elt.multiple) {
                    value = toArray(elt.querySelectorAll("option:checked")).map(function (e) { return e.value });
                }
                // include file inputs
                if (elt.files) {
                    value = toArray(elt.files);
                }
                // This is a little ugly because both the current value of the named value in the form
                // and the new value could be arrays, so we have to handle all four cases :/
                if (name != null && value != null) {
                    var current = values[name];
                    if(current) {
                        if (Array.isArray(current)) {
                            if (Array.isArray(value)) {
                                values[name] = current.concat(value);
                            } else {
                                current.push(value);
                            }
                        } else {
                            if (Array.isArray(value)) {
                                values[name] = [current].concat(value);
                            } else {
                                values[name] = [current, value];
                            }
                        }
                    } else {
                        values[name] = value;
                    }
                }
                if (validate) {
                    validateElement(elt, errors);
                }
            }
            if (matches(elt, 'form')) {
                var inputs = elt.elements;
                forEach(inputs, function(input) {
                    processInputValue(processed, values, errors, input, validate);
                });
            }
        }

        function validateElement(element, errors) {
            if (element.willValidate) {
                triggerEvent(element, "htmx:validation:validate")
                if (!element.checkValidity()) {
                    errors.push({elt: element, message:element.validationMessage, validity:element.validity});
                    triggerEvent(element, "htmx:validation:failed", {message:element.validationMessage, validity:element.validity})
                }
            }
        }

        function getInputValues(elt, verb) {
            var processed = [];
            var values = {};
            var formValues = {};
            var errors = [];

            // only validate when form is directly submitted and novalidate is not set
            var validate = matches(elt, 'form') && elt.noValidate !== true;

            // for a non-GET include the closest form
            if (verb !== 'get') {
                processInputValue(processed, formValues, errors, closest(elt, 'form'), validate);
            }

            // include the element itself
            processInputValue(processed, values, errors, elt, validate);

            // if a button or submit was clicked last, include its value
            var internalData = getInternalData(elt);
            if (internalData.lastButtonClicked) {
                var name = getRawAttribute(internalData.lastButtonClicked,"name");
                if (name) {
                    values[name] = internalData.lastButtonClicked.value;
                }
            }

            // include any explicit includes
            var includes = getClosestAttributeValue(elt, "hx-include");
            if (includes) {
                var nodes = querySelectorAllExt(elt, includes);
                forEach(nodes, function(node) {
                    processInputValue(processed, values, errors, node, validate);
                    // if a non-form is included, include any input values within it
                    if (!matches(node, 'form')) {
                        forEach(node.querySelectorAll(INPUT_SELECTOR), function (descendant) {
                            processInputValue(processed, values, errors, descendant, validate);
                        })
                    }
                });
            }

            // form values take precedence, overriding the regular values
            values = mergeObjects(values, formValues);

            return {errors:errors, values:values};
        }

        function appendParam(returnStr, name, realValue) {
            if (returnStr !== "") {
                returnStr += "&";
            }
            returnStr += encodeURIComponent(name) + "=" + encodeURIComponent(realValue);
            return returnStr;
        }

        function urlEncode(values) {
            var returnStr = "";
            for (var name in values) {
                if (values.hasOwnProperty(name)) {
                    var value = values[name];
                    if (Array.isArray(value)) {
                        forEach(value, function(v) {
                            returnStr = appendParam(returnStr, name, v);
                        });
                    } else {
                        returnStr = appendParam(returnStr, name, value);
                    }
                }
            }
            return returnStr;
        }

        function makeFormData(values) {
            var formData = new FormData();
            for (var name in values) {
                if (values.hasOwnProperty(name)) {
                    var value = values[name];
                    if (Array.isArray(value)) {
                        forEach(value, function(v) {
                            formData.append(name, v);
                        });
                    } else {
                        formData.append(name, value);
                    }
                }
            }
            return formData;
        }

        //====================================================================
        // Ajax
        //====================================================================

        function getHeaders(elt, target, prompt) {
            var headers = {
                "HX-Request" : "true",
                "HX-Trigger" : getRawAttribute(elt, "id"),
                "HX-Trigger-Name" : getRawAttribute(elt, "name"),
                "HX-Target" : getAttributeValue(target, "id"),
                "HX-Current-URL" : getDocument().location.href,
            }
            getValuesForElement(elt, "hx-headers", false, headers)
            if (prompt !== undefined) {
                headers["HX-Prompt"] = prompt;
            }
            if (getInternalData(elt).boosted) {
                headers["HX-Boosted"] = "true";
            }
            return headers;
        }

        function filterValues(inputValues, elt) {
            var paramsValue = getClosestAttributeValue(elt, "hx-params");
            if (paramsValue) {
                if (paramsValue === "none") {
                    return {};
                } else if (paramsValue === "*") {
                    return inputValues;
                } else if(paramsValue.indexOf("not ") === 0) {
                    forEach(paramsValue.substr(4).split(","), function (name) {
                        name = name.trim();
                        delete inputValues[name];
                    });
                    return inputValues;
                } else {
                    var newValues = {}
                    forEach(paramsValue.split(","), function (name) {
                        name = name.trim();
                        newValues[name] = inputValues[name];
                    });
                    return newValues;
                }
            } else {
                return inputValues;
            }
        }

        function isAnchorLink(elt) {
          return getRawAttribute(elt, 'href') && getRawAttribute(elt, 'href').indexOf("#") >=0
        }

        function getSwapSpecification(elt) {
            var swapInfo = getClosestAttributeValue(elt, "hx-swap");
            var swapSpec = {
                "swapStyle" : getInternalData(elt).boosted ? 'innerHTML' : htmx.config.defaultSwapStyle,
                "swapDelay" : htmx.config.defaultSwapDelay,
                "settleDelay" : htmx.config.defaultSettleDelay
            }
            if (getInternalData(elt).boosted && !isAnchorLink(elt)) {
              swapSpec["show"] = "top"
            }
            if (swapInfo) {
                var split = splitOnWhitespace(swapInfo);
                if (split.length > 0) {
                    swapSpec["swapStyle"] = split[0];
                    for (var i = 1; i < split.length; i++) {
                        var modifier = split[i];
                        if (modifier.indexOf("swap:") === 0) {
                            swapSpec["swapDelay"] = parseInterval(modifier.substr(5));
                        }
                        if (modifier.indexOf("settle:") === 0) {
                            swapSpec["settleDelay"] = parseInterval(modifier.substr(7));
                        }
                        if (modifier.indexOf("scroll:") === 0) {
                            var scrollSpec = modifier.substr(7);
                            var splitSpec = scrollSpec.split(":");
                            var scrollVal = splitSpec.pop();
                            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                            swapSpec["scroll"] = scrollVal;
                            swapSpec["scrollTarget"] = selectorVal;
                        }
                        if (modifier.indexOf("show:") === 0) {
                            var showSpec = modifier.substr(5);
                            var splitSpec = showSpec.split(":");
                            var showVal = splitSpec.pop();
                            var selectorVal = splitSpec.length > 0 ? splitSpec.join(":") : null;
                            swapSpec["show"] = showVal;
                            swapSpec["showTarget"] = selectorVal;
                        }
                    }
                }
            }
            return swapSpec;
        }

        function encodeParamsForBody(xhr, elt, filteredParameters) {
            var encodedParameters = null;
            withExtensions(elt, function (extension) {
                if (encodedParameters == null) {
                    encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt);
                }
            });
            if (encodedParameters != null) {
                return encodedParameters;
            } else {
                if (getClosestAttributeValue(elt, "hx-encoding") === "multipart/form-data" ||
                    (matches(elt, "form") && getRawAttribute(elt, 'enctype') === "multipart/form-data")) {
                    return makeFormData(filteredParameters);
                } else {
                    return urlEncode(filteredParameters);
                }
            }
        }

        function makeSettleInfo(target) {
            return {tasks: [], elts: [target]};
        }

        function updateScrollState(content, swapSpec) {
            var first = content[0];
            var last = content[content.length - 1];
            if (swapSpec.scroll) {
                var target = null;
                if (swapSpec.scrollTarget) {
                    target = querySelectorExt(first, swapSpec.scrollTarget);
                }
                if (swapSpec.scroll === "top" && (first || target)) {
                    target = target || first;
                    target.scrollTop = 0;
                }
                if (swapSpec.scroll === "bottom" && (last || target)) {
                    target = target || last;
                    target.scrollTop = target.scrollHeight;
                }
            }
            if (swapSpec.show) {
                var target = null;
                if (swapSpec.showTarget) {
                    var targetStr = swapSpec.showTarget;
                    if (swapSpec.showTarget === "window") {
                        targetStr = "body";
                    }
                    target = querySelectorExt(first, targetStr);
                }
                if (swapSpec.show === "top" && (first || target)) {
                    target = target || first;
                    target.scrollIntoView({block:'start', behavior: htmx.config.scrollBehavior});
                }
                if (swapSpec.show === "bottom" && (last || target)) {
                    target = target || last;
                    target.scrollIntoView({block:'end', behavior: htmx.config.scrollBehavior});
                }
            }
        }

        function getValuesForElement(elt, attr, evalAsDefault, values) {
            if (values == null) {
                values = {};
            }
            if (elt == null) {
                return values;
            }
            var attributeValue = getAttributeValue(elt, attr);
            if (attributeValue) {
                var str = attributeValue.trim();
                var evaluateValue = evalAsDefault;
                if (str.indexOf("javascript:") === 0) {
                    str = str.substr(11);
                    evaluateValue = true;
                } else if (str.indexOf("js:") === 0) {
                    str = str.substr(3);
                    evaluateValue = true;
                }
                if (str.indexOf('{') !== 0) {
                    str = "{" + str + "}";
                }
                var varsValues;
                if (evaluateValue) {
                    varsValues = maybeEval(elt,function () {return Function("return (" + str + ")")();}, {});
                } else {
                    varsValues = parseJSON(str);
                }
                for (var key in varsValues) {
                    if (varsValues.hasOwnProperty(key)) {
                        if (values[key] == null) {
                            values[key] = varsValues[key];
                        }
                    }
                }
            }
            return getValuesForElement(parentElt(elt), attr, evalAsDefault, values);
        }

        function maybeEval(elt, toEval, defaultVal) {
            if (htmx.config.allowEval) {
                return toEval();
            } else {
                triggerErrorEvent(elt, 'htmx:evalDisallowedError');
                return defaultVal;
            }
        }

        function getHXVarsForElement(elt, expressionVars) {
            return getValuesForElement(elt, "hx-vars", true, expressionVars);
        }

        function getHXValsForElement(elt, expressionVars) {
            return getValuesForElement(elt, "hx-vals", false, expressionVars);
        }

        function getExpressionVars(elt) {
            return mergeObjects(getHXVarsForElement(elt), getHXValsForElement(elt));
        }

        function safelySetHeaderValue(xhr, header, headerValue) {
            if (headerValue !== null) {
                try {
                    xhr.setRequestHeader(header, headerValue);
                } catch (e) {
                    // On an exception, try to set the header URI encoded instead
                    xhr.setRequestHeader(header, encodeURIComponent(headerValue));
                    xhr.setRequestHeader(header + "-URI-AutoEncoded", "true");
                }
            }
        }

        function getResponseURL(xhr) {
            // NB: IE11 does not support this stuff
            if (xhr.responseURL && typeof(URL) !== "undefined") {
                try {
                    var url = new URL(xhr.responseURL);
                    return url.pathname + url.search;
                } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", {url: xhr.responseURL});
                }
            }
        }

        function hasHeader(xhr, regexp) {
            return xhr.getAllResponseHeaders().match(regexp);
        }

        function ajaxHelper(verb, path, context) {
            verb = verb.toLowerCase();
            if (context) {
                if (context instanceof Element || isType(context, 'String')) {
                    return issueAjaxRequest(verb, path, null, null, {
                        targetOverride: resolveTarget(context),
                        returnPromise: true
                    });
                } else {
                    return issueAjaxRequest(verb, path, resolveTarget(context.source), context.event,
                        {
                            handler : context.handler,
                            headers : context.headers,
                            values : context.values,
                            targetOverride: resolveTarget(context.target),
                            returnPromise: true
                        });
                }
            } else {
                return issueAjaxRequest(verb, path, null, null, {
                        returnPromise: true
                });
            }
        }

        function hierarchyForElt(elt) {
            var arr = [];
            while (elt) {
                arr.push(elt);
                elt = elt.parentElement;
            }
            return arr;
        }

        function issueAjaxRequest(verb, path, elt, event, etc) {
            var resolve = null;
            var reject = null;
            etc = etc != null ? etc : {};
            if(etc.returnPromise && typeof Promise !== "undefined"){
                var promise = new Promise(function (_resolve, _reject) {
                    resolve = _resolve;
                    reject = _reject;
                });
            }
            if(elt == null) {
                elt = getDocument().body;
            }
            var responseHandler = etc.handler || handleAjaxResponse;

            if (!bodyContains(elt)) {
                return; // do not issue requests for elements removed from the DOM
            }
            var target = etc.targetOverride || getTarget(elt);
            if (target == null) {
                triggerErrorEvent(elt, 'htmx:targetError', {target: getAttributeValue(elt, "hx-target")});
                return;
            }
            var eltData = getInternalData(elt);
            if (eltData.requestInFlight) {
                var queueStrategy = 'last';
                if (event) {
                    var eventData = getInternalData(event);
                    if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
                        queueStrategy = eventData.triggerSpec.queue;
                    }
                }
                if (eltData.queuedRequests == null) {
                    eltData.queuedRequests = [];
                }
                if (queueStrategy === "first" && eltData.queuedRequests.length === 0) {
                    eltData.queuedRequests.push(function () {
                        issueAjaxRequest(verb, path, elt, event, etc)
                    });
                } else if (queueStrategy === "all") {
                    eltData.queuedRequests.push(function () {
                        issueAjaxRequest(verb, path, elt, event, etc)
                    });
                } else if (queueStrategy === "last") {
                    eltData.queuedRequests = []; // dump existing queue
                    eltData.queuedRequests.push(function () {
                        issueAjaxRequest(verb, path, elt, event, etc)
                    });
                }
                return;
            } else {
                eltData.requestInFlight = true;
            }
            var endRequestLock = function(){
                eltData.requestInFlight = false
                if (eltData.queuedRequests != null &&
                    eltData.queuedRequests.length > 0) {
                    var queuedRequest = eltData.queuedRequests.shift();
                    queuedRequest();
                }
            }
            var promptQuestion = getClosestAttributeValue(elt, "hx-prompt");
            if (promptQuestion) {
                var promptResponse = prompt(promptQuestion);
                // prompt returns null if cancelled and empty string if accepted with no entry
                if (promptResponse === null ||
                    !triggerEvent(elt, 'htmx:prompt', {prompt: promptResponse, target:target})) {
                    maybeCall(resolve);
                    endRequestLock();
                    return promise;
                }
            }

            var confirmQuestion = getClosestAttributeValue(elt, "hx-confirm");
            if (confirmQuestion) {
                if(!confirm(confirmQuestion)) {
                    maybeCall(resolve);
                    endRequestLock()
                    return promise;
                }
            }

            var xhr = new XMLHttpRequest();

            var headers = getHeaders(elt, target, promptResponse);
            if (etc.headers) {
                headers = mergeObjects(headers, etc.headers);
            }
            var results = getInputValues(elt, verb);
            var errors = results.errors;
            var rawParameters = results.values;
            if (etc.values) {
                rawParameters = mergeObjects(rawParameters, etc.values);
            }
            var expressionVars = getExpressionVars(elt);
            var allParameters = mergeObjects(rawParameters, expressionVars);
            var filteredParameters = filterValues(allParameters, elt);

            if (verb !== 'get' && getClosestAttributeValue(elt, "hx-encoding") == null) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }

            // behavior of anchors w/ empty href is to use the current URL
            if (path == null || path === "") {
                path = getDocument().location.href;
            }

            var requestAttrValues = getValuesForElement(elt, 'hx-request');

            var requestConfig = {
                parameters: filteredParameters,
                unfilteredParameters: allParameters,
                headers:headers,
                target:target,
                verb:verb,
                errors:errors,
                withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
                timeout:  etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
                path:path,
                triggeringEvent:event
            };

            if(!triggerEvent(elt, 'htmx:configRequest', requestConfig)){
                maybeCall(resolve);
                endRequestLock();
                return promise;
            }

            // copy out in case the object was overwritten
            path = requestConfig.path;
            verb = requestConfig.verb;
            headers = requestConfig.headers;
            filteredParameters = requestConfig.parameters;
            errors = requestConfig.errors;

            if(errors && errors.length > 0){
                triggerEvent(elt, 'htmx:validation:halted', requestConfig)
                maybeCall(resolve);
                endRequestLock();
                return promise;
            }

            var splitPath = path.split("#");
            var pathNoAnchor = splitPath[0];
            var anchor = splitPath[1];
            if (verb === 'get') {
                var finalPathForGet = pathNoAnchor;
                var values = Object.keys(filteredParameters).length !== 0;
                if (values) {
                    if (finalPathForGet.indexOf("?") < 0) {
                        finalPathForGet += "?";
                    } else {
                        finalPathForGet += "&";
                    }
                    finalPathForGet += urlEncode(filteredParameters);
                    if (anchor) {
                        finalPathForGet += "#" + anchor;
                    }
                }
                xhr.open('GET', finalPathForGet, true);
            } else {
                xhr.open(verb.toUpperCase(), path, true);
            }

            xhr.overrideMimeType("text/html");
            xhr.withCredentials = requestConfig.withCredentials;
            xhr.timeout = requestConfig.timeout;

            // request headers
            if (requestAttrValues.noHeaders) {
                // ignore all headers
            } else {
                for (var header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        var headerValue = headers[header];
                        safelySetHeaderValue(xhr, header, headerValue);
                    }
                }
            }

            var responseInfo = {xhr: xhr, target: target, requestConfig: requestConfig, pathInfo:{
                  path:path, finalPath:finalPathForGet, anchor:anchor
                }
            };

            xhr.onload = function () {
                try {
                    var hierarchy = hierarchyForElt(elt);
                    responseHandler(elt, responseInfo);
                    removeRequestIndicatorClasses(indicators);
                    triggerEvent(elt, 'htmx:afterRequest', responseInfo);
                    triggerEvent(elt, 'htmx:afterOnLoad', responseInfo);
                    // if the body no longer contains the element, trigger the even on the closest parent
                    // remaining in the DOM
                    if (!bodyContains(elt)) {
                        var secondaryTriggerElt = null;
                        while (hierarchy.length > 0 && secondaryTriggerElt == null) {
                            var parentEltInHierarchy = hierarchy.shift();
                            if (bodyContains(parentEltInHierarchy)) {
                                secondaryTriggerElt = parentEltInHierarchy;
                            }
                        }
                        if (secondaryTriggerElt) {
                            triggerEvent(secondaryTriggerElt, 'htmx:afterRequest', responseInfo);
                            triggerEvent(secondaryTriggerElt, 'htmx:afterOnLoad', responseInfo);
                        }
                    }
                    maybeCall(resolve);
                    endRequestLock();
                } catch (e) {
                    triggerErrorEvent(elt, 'htmx:onLoadError', mergeObjects({error:e}, responseInfo));
                    throw e;
                }
            }
            xhr.onerror = function () {
                removeRequestIndicatorClasses(indicators);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:sendError', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            xhr.onabort = function() {
                removeRequestIndicatorClasses(indicators);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:sendAbort', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            xhr.ontimeout = function() {
                removeRequestIndicatorClasses(indicators);
                triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
                triggerErrorEvent(elt, 'htmx:timeout', responseInfo);
                maybeCall(reject);
                endRequestLock();
            }
            if(!triggerEvent(elt, 'htmx:beforeRequest', responseInfo)){
                maybeCall(resolve);
                endRequestLock()
                return promise
            }
            var indicators = addRequestIndicatorClasses(elt);

            forEach(['loadstart', 'loadend', 'progress', 'abort'], function(eventName) {
                forEach([xhr, xhr.upload], function (target) {
                    target.addEventListener(eventName, function(event){
                        triggerEvent(elt, "htmx:xhr:" + eventName, {
                            lengthComputable:event.lengthComputable,
                            loaded:event.loaded,
                            total:event.total
                        });
                    })
                });
            });
            triggerEvent(elt, 'htmx:beforeSend', responseInfo);
            xhr.send(verb === 'get' ? null : encodeParamsForBody(xhr, elt, filteredParameters));
            return promise;
        }

        function handleAjaxResponse(elt, responseInfo) {
            var xhr = responseInfo.xhr;
            var target = responseInfo.target;

            if (!triggerEvent(elt, 'htmx:beforeOnLoad', responseInfo)) return;

            if (hasHeader(xhr, /HX-Trigger:/i)) {
                handleTrigger(xhr, "HX-Trigger", elt);
            }

            if (hasHeader(xhr,/HX-Push:/i)) {
                var pushedUrl = xhr.getResponseHeader("HX-Push");
            }

            if (hasHeader(xhr, /HX-Redirect:/i)) {
                window.location.href = xhr.getResponseHeader("HX-Redirect");
                return;
            }

            if (hasHeader(xhr,/HX-Refresh:/i)) {
                if ("true" === xhr.getResponseHeader("HX-Refresh")) {
                    location.reload();
                    return;
                }
            }

            if (hasHeader(xhr,/HX-Retarget:/i)) {
                responseInfo.target = getDocument().querySelector(xhr.getResponseHeader("HX-Retarget"));
            }

            var shouldSaveHistory = shouldPush(elt) || pushedUrl;

            // by default htmx only swaps on 200 return codes and does not swap
            // on 204 'No Content'
            // this can be ovverriden by responding to the htmx:beforeSwap event and
            // overriding the detail.shouldSwap property
            var shouldSwap = xhr.status >= 200 && xhr.status < 400 && xhr.status !== 204;
            var serverResponse = xhr.response;
            var isError = xhr.status >= 400;
            var beforeSwapDetails = mergeObjects({shouldSwap: shouldSwap, serverResponse:serverResponse, isError:isError}, responseInfo);
            if (!triggerEvent(target, 'htmx:beforeSwap', beforeSwapDetails)) return;

            target = beforeSwapDetails.target; // allow re-targeting
            serverResponse = beforeSwapDetails.serverResponse; // allow updating content
            isError = beforeSwapDetails.isError; // allow updating error
		
            responseInfo.failed = isError; // Make failed property available to response events
            responseInfo.successful = !isError; // Make successful property available to response events		

            if (beforeSwapDetails.shouldSwap) {
                if (xhr.status === 286) {
                    cancelPolling(elt);
                }

                withExtensions(elt, function (extension) {
                    serverResponse = extension.transformResponse(serverResponse, xhr, elt);
                });

                // Save current page
                if (shouldSaveHistory) {
                    saveHistory();
                }

                var swapSpec = getSwapSpecification(elt);

                target.classList.add(htmx.config.swappingClass);
                var doSwap = function () {
                    try {

                        var activeElt = document.activeElement;
                        var selectionInfo = {};
                        try {
                            selectionInfo = {
                                elt: activeElt,
                                // @ts-ignore
                                start: activeElt ? activeElt.selectionStart : null,
                                // @ts-ignore
                                end: activeElt ? activeElt.selectionEnd : null
                            };
                        } catch (e) {
                            // safari issue - see https://github.com/microsoft/playwright/issues/5894
                        }

                        var settleInfo = makeSettleInfo(target);
                        selectAndSwap(swapSpec.swapStyle, target, elt, serverResponse, settleInfo);

                        if (selectionInfo.elt &&
                            !bodyContains(selectionInfo.elt) &&
                            selectionInfo.elt.id) {
                            var newActiveElt = document.getElementById(selectionInfo.elt.id);
                            if (newActiveElt) {
                                // @ts-ignore
                                if (selectionInfo.start && newActiveElt.setSelectionRange) {
                                    // @ts-ignore
                                    newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end);
                                }
                                newActiveElt.focus();
                            }
                        }

                        target.classList.remove(htmx.config.swappingClass);
                        forEach(settleInfo.elts, function (elt) {
                            if (elt.classList) {
                                elt.classList.add(htmx.config.settlingClass);
                            }
                            triggerEvent(elt, 'htmx:afterSwap', responseInfo);
                        });
                        if (responseInfo.pathInfo.anchor) {
                            location.hash = responseInfo.pathInfo.anchor;
                        }

                        if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                            var finalElt = elt;
                            if (!bodyContains(elt)) {
                                finalElt = getDocument().body;
                            }
                            handleTrigger(xhr, "HX-Trigger-After-Swap", finalElt);
                        }

                        var doSettle = function () {
                            forEach(settleInfo.tasks, function (task) {
                                task.call();
                            });
                            forEach(settleInfo.elts, function (elt) {
                                if (elt.classList) {
                                    elt.classList.remove(htmx.config.settlingClass);
                                }
                                triggerEvent(elt, 'htmx:afterSettle', responseInfo);
                            });
                            // push URL and save new page
                            if (shouldSaveHistory) {
                                var pathToPush = pushedUrl || getPushUrl(elt) || getResponseURL(xhr) || responseInfo.pathInfo.finalPath || responseInfo.pathInfo.path;
                                pushUrlIntoHistory(pathToPush);
                                triggerEvent(getDocument().body, 'htmx:pushedIntoHistory', {path: pathToPush});
                            }
                            updateScrollState(settleInfo.elts, swapSpec);

                            if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                                var finalElt = elt;
                                if (!bodyContains(elt)) {
                                    finalElt = getDocument().body;
                                }
                                handleTrigger(xhr, "HX-Trigger-After-Settle", finalElt);
                            }
                        }

                        if (swapSpec.settleDelay > 0) {
                            setTimeout(doSettle, swapSpec.settleDelay)
                        } else {
                            doSettle();
                        }
                    } catch (e) {
                        triggerErrorEvent(elt, 'htmx:swapError', responseInfo);
                        throw e;
                    }
                };

                if (swapSpec.swapDelay > 0) {
                    setTimeout(doSwap, swapSpec.swapDelay)
                } else {
                    doSwap();
                }
            }
            if (isError) {
                triggerErrorEvent(elt, 'htmx:responseError', mergeObjects({error: "Response Status Error Code " + xhr.status + " from " + responseInfo.pathInfo.path}, responseInfo));
            }
        }

        //====================================================================
        // Extensions API
        //====================================================================
        var extensions = {};
        function extensionBase() {
            return {
                onEvent : function(name, evt) {return true;},
                transformResponse : function(text, xhr, elt) {return text;},
                isInlineSwap : function(swapStyle) {return false;},
                handleSwap : function(swapStyle, target, fragment, settleInfo) {return false;},
                encodeParameters : function(xhr, parameters, elt) {return null;}
            }
        }

        function defineExtension(name, extension) {
            extensions[name] = mergeObjects(extensionBase(), extension);
        }

        function removeExtension(name) {
            delete extensions[name];
        }

        function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
            if (elt == undefined) {
                return extensionsToReturn;
            }
            if (extensionsToReturn == undefined) {
                extensionsToReturn = [];
            }
            if (extensionsToIgnore == undefined) {
                extensionsToIgnore = [];
            }
            var extensionsForElement = getAttributeValue(elt, "hx-ext");
            if (extensionsForElement) {
                forEach(extensionsForElement.split(","), function(extensionName){
                    extensionName = extensionName.replace(/ /g, '');
                    if (extensionName.slice(0, 7) == "ignore:") {
                        extensionsToIgnore.push(extensionName.slice(7));
                        return;
                    }
                    if (extensionsToIgnore.indexOf(extensionName) < 0) {
                        var extension = extensions[extensionName];
                        if (extension && extensionsToReturn.indexOf(extension) < 0) {
                            extensionsToReturn.push(extension);
                        }
                    }
                });
            }
            return getExtensions(parentElt(elt), extensionsToReturn, extensionsToIgnore);
        }

        //====================================================================
        // Initialization
        //====================================================================

        function ready(fn) {
            if (getDocument().readyState !== 'loading') {
                fn();
            } else {
                getDocument().addEventListener('DOMContentLoaded', fn);
            }
        }

        function insertIndicatorStyles() {
            if (htmx.config.includeIndicatorStyles !== false) {
                getDocument().head.insertAdjacentHTML("beforeend",
                    "<style>\
                      ." + htmx.config.indicatorClass + "{opacity:0;transition: opacity 200ms ease-in;}\
                      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1}\
                      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1}\
                    </style>");
            }
        }

        function getMetaConfig() {
            var element = getDocument().querySelector('meta[name="htmx-config"]');
            if (element) {
                // @ts-ignore
                return parseJSON(element.content);
            } else {
                return null;
            }
        }

        function mergeMetaConfig() {
            var metaConfig = getMetaConfig();
            if (metaConfig) {
                htmx.config = mergeObjects(htmx.config , metaConfig)
            }
        }

        // initialize the document
        ready(function () {
            mergeMetaConfig();
            insertIndicatorStyles();
            var body = getDocument().body;
            processNode(body);
            window.onpopstate = function (event) {
                if (event.state && event.state.htmx) {
                    restoreHistory();
                }
            };
            setTimeout(function () {
                triggerEvent(body, 'htmx:load', {}); // give ready handlers a chance to load up before firing this event
            }, 0);
        })

        return htmx;
    }
)()
}));
