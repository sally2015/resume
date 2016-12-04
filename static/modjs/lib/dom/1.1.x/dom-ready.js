/*!
 * JRaiser 2 Mobile Javascript Library
 * dom-ready - v1.1.0 (2015-03-31T17:05:32+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-ready",null,function(e,t,n){"use strict";var d,o=[],r=document,c=r.documentElement.doScroll,i="DOMContentLoaded",u=(c?/^loaded|^c/:/^loaded|^i|^c/).test(r.readyState);return u||r.addEventListener(i,d=function(){for(r.removeEventListener(i,d),u=1;d=o.shift();)d()}),function(e){u?e():o.push(e)}});