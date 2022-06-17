(function(s,e){typeof exports=="object"&&typeof module!="undefined"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(s=typeof globalThis!="undefined"?globalThis:s||self,e(s.lib={}))})(this,function(s){"use strict";var h=Object.defineProperty;var N=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var T=(s,e,t)=>e in s?h(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,l=(s,e)=>{for(var t in e||(e={}))f.call(e,t)&&T(s,t,e[t]);if(N)for(var t of N(e))C.call(e,t)&&T(s,t,e[t]);return s};var o=(s,e,t)=>(T(s,typeof e!="symbol"?e+"":e,t),t);const e={NETWORK_ERROR:"Network Error",TIMEOUT_ABORTED:"ECONNABORTED",INVALID_TOKEN:"INVALID_TOKEN",INVALID_TOKEN_CODE:413},t={PERMISSION_DENIED:3,INVALID_AUTH:8,AUTH_EXPIRED:9},A={CONTENT_lOADED_FAILED:11003,PERMISSION_DENIED:11004,INTERNAL_ERROR:11009,ACCOUNT_DEACTIVATION:11010,AUTH_EXPIRED:11005,SENSITIVE_CONTENT:11008,TRAFFIC_EXCEEDED:22005,SERVER_ERROR:22006,TOO_FREQUENT:11006,REACHED_LIMIT:11007,FORMAT_ERROR:22222};var R=l(l(l({},e),t),A);const O=class{constructor(){o(this,"handlers",new Map);o(this,"assert",new Map)}static init(n){O.errorCodes=n}registerHandlers(n){const r=Object.keys(n);for(let d=0;d<r.length;d++)this.registerHandler(r[d],n[r[d]])}registerHandler(n,r){if(!r.condition||!r.handler)throw new Error("[register errorHandler failed]: condition and handler are required parameters");this.handlers.set(n,r.handler),this.addAssert(n,r.condition)}addAssert(n,r){this.assert.set(n,r)}};let E=O;o(E,"defaultCodes",R),o(E,"errorCodes",{});const a=new E,_=(u,...n)=>{const r=Array.from(a.assert.keys());for(let d=0;d<r.length;d++){const i=r[d],D=a.assert.has(i),c=a.handlers.has(i);if(D&&c&&a.assert.get(i)){const I=a.handlers.get(i);I&&I([...n])}}};s.default=E,s.defaultCodes=R,s.doAllHandlers=_,s.errorHandler=a,Object.defineProperties(s,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});