var docCookies={getItem:function(n){return n?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(n,t,i,r,u,f){if(!n||/^(?:expires|max\-age|path|domain|secure)$/i.test(n))return!1;var e="";if(i)switch(i.constructor){case Number:e=i===Infinity?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+i;break;case String:e="; expires="+i;break;case Date:e="; expires="+i.toUTCString()}return document.cookie=encodeURIComponent(n)+"="+encodeURIComponent(t)+e+(u?"; domain="+u:"")+(r?"; path="+r:"")+(f?"; secure":""),!0},removeItem:function(n,t,i){return this.hasItem(n)?(document.cookie=encodeURIComponent(n)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(i?"; domain="+i:"")+(t?"; path="+t:""),!0):!1},hasItem:function(n){return!n||/^(?:expires|max\-age|path|domain|secure)$/i.test(n)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(n).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var n=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),i=n.length,t=0;t<i;t++)n[t]=decodeURIComponent(n[t]);return n},clear:function(n,t){for(var r=this.keys(),u=r.length,i=0;i<u;i++)this.removeItem(r[i],n,t)}};typeof module!="undefined"&&typeof module.exports!="undefined"&&(module.exports=docCookies);