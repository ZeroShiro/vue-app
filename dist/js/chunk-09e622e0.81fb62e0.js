(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09e622e0"],{"02a2":function(t,e,n){"use strict";var i=n("be09"),r=n.n(i);r.a},"0418":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header",class:{blue:t.blue,isLeft:!t.isLeft}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isLeft,expression:"isLeft"}],staticClass:"header-button is-left"},[n("i",{staticClass:"fa fa-chevron-left"}),t.go?t._e():n("button",{on:{click:function(e){return t.$router.push(t.btn)}}},[t._v("返回")]),t.go?n("button",{on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")]):t._e()]),n("div",{staticClass:"header-title"},[t._v(t._s(t.title))])])},r=[],o={name:"Header",props:{title:String,isLeft:{type:Boolean,default:!1},btn:{type:String,default:"home"},go:{type:Boolean,default:!1},blue:{type:Boolean,default:!1}},computed:{city:function(){return this.$route.query.city}}},a=o,s=(n("02a2"),n("5511")),c=Object(s["a"])(a,i,r,!1,null,"33879d31",null);e["a"]=c.exports},"3eff":function(t,e,n){},"4eab":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pay"},[n("Header",{attrs:{title:"在线支付"}}),t.orderInfo?n("div",{staticClass:"main"},[n("div",{staticClass:"tip"},[n("p",{staticClass:"countdown-title"},[t._v("支付剩余时间")]),n("h3",{staticClass:"countdown-text"},[t._v(t._s(t.countDown))])]),n("section",{staticClass:"home"},[n("ul",{staticClass:"list info-list"},[n("li",[n("span",{staticClass:"order-name"},[t._v(t._s(t.shopData.name))]),n("span",{staticClass:"text-highlight"},[t._v("¥"+t._s(t.totalPrice))])])]),n("div",{staticClass:"title"},[t._v("在线支付")]),t._m(0)]),n("button",{staticClass:"btn-submit",attrs:{disabled:t.timeOut},on:{click:t.pay}},[t._v("确认支付")])]):t._e()],1)},r=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"list payment-list"},[i("li",{staticClass:"payment-list-item"},[i("div",{staticClass:"icon"},[i("img",{attrs:{src:n("68de"),alt:""}}),i("span",[t._v("微信")])]),i("i",{staticClass:"fa fa-check-circle selected"})])])}],o=(n("3a20"),n("7267"),n("0418")),a=n("b27f"),s={name:"Pay",data:function(){return{countDown:"00:15:00",timer:null,timeOut:!1}},beforeRouteEnter:function(t,e,n){n((function(t){t.countTimeDown()}))},computed:{orderInfo:function(){return this.$store.getters.orderInfo},totalPrice:function(){return this.$store.getters.totalPrice},userAddress:function(){return this.$store.getters.userAddress},shopData:function(){var t=JSON.parse(localStorage.getItem("shopdata"));return t}},methods:{countTimeDown:function(){var t=this,e=14,n=59;this.timer=Object(a["setInterval"])((function(){if(n--,"00"==n&&"00"==e)return t.countDown="订单已超时",Object(a["clearInterval"])(t.timer),void(t.timeOut=!0);"00"==n&&(n=59,e--,e<10&&(e="0"+e)),n<10&&(n="0"+n),t.countDown="00:"+e+":"+n}),1e3)},pay:function(){var t=this,e={body:"test",out_trade_no:(new Date).getTime().toString(),total_fee:1};alert("调用支付接口"),fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(t){return t.json()})).then((function(e){t.onBridgeReady(e)})).catch((function(e){alert("请求失败 跳转测试"),t.addOrder()}))},onBridgeReady:function(t){var e=this;WeixinJSBridge.invoke("getBrandWCPayRequest",t,(function(t){"get_brand_wcpay_request:ok"==t.err_msg&&e.addOrder()}))},addOrder:function(){var t=this,e={orderInfo:this.orderInfo,userAddress:this.userInfo,totalPrice:this.totalPrice,shopData:this.shopData};this.$axios.post("/api/user/add_order/",e).then((function(e){t.$router.push("/order")}))}},components:{Header:o["a"]}},c=s,u=(n("c493"),n("5511")),l=Object(u["a"])(c,i,r,!1,null,"4d385133",null);e["default"]=l.exports},6266:function(t,e,n){(function(t){function n(t,e){for(var n=0,i=t.length-1;i>=0;i--){var r=t[i];"."===r?t.splice(i,1):".."===r?(t.splice(i,1),n++):n&&(t.splice(i,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function i(t){"string"!==typeof t&&(t+="");var e,n=0,i=-1,r=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!r){n=e+1;break}}else-1===i&&(r=!1,i=e+1);return-1===i?"":t.slice(n,i)}function r(t,e){if(t.filter)return t.filter(e);for(var n=[],i=0;i<t.length;i++)e(t[i],i,t)&&n.push(t[i]);return n}e.resolve=function(){for(var e="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var a=o>=0?arguments[o]:t.cwd();if("string"!==typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(e=a+"/"+e,i="/"===a.charAt(0))}return e=n(r(e.split("/"),(function(t){return!!t})),!i).join("/"),(i?"/":"")+e||"."},e.normalize=function(t){var i=e.isAbsolute(t),a="/"===o(t,-1);return t=n(r(t.split("/"),(function(t){return!!t})),!i).join("/"),t||i||(t="."),t&&a&&(t+="/"),(i?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(r(t,(function(t,e){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function i(t){for(var e=0;e<t.length;e++)if(""!==t[e])break;for(var n=t.length-1;n>=0;n--)if(""!==t[n])break;return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var r=i(t.split("/")),o=i(n.split("/")),a=Math.min(r.length,o.length),s=a,c=0;c<a;c++)if(r[c]!==o[c]){s=c;break}var u=[];for(c=s;c<r.length;c++)u.push("..");return u=u.concat(o.slice(s)),u.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,i=-1,r=!0,o=t.length-1;o>=1;--o)if(e=t.charCodeAt(o),47===e){if(!r){i=o;break}}else r=!1;return-1===i?n?"/":".":n&&1===i?"/":t.slice(0,i)},e.basename=function(t,e){var n=i(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!==typeof t&&(t+="");for(var e=-1,n=0,i=-1,r=!0,o=0,a=t.length-1;a>=0;--a){var s=t.charCodeAt(a);if(47!==s)-1===i&&(r=!1,i=a+1),46===s?-1===e?e=a:1!==o&&(o=1):-1!==e&&(o=-1);else if(!r){n=a+1;break}}return-1===e||-1===i||0===o||1===o&&e===i-1&&e===n+1?"":t.slice(e,i)};var o="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n("eef6"))},"68de":function(t,e,n){t.exports=n.p+"img/wechart.0055285e.jpg"},7267:function(t,e,n){"use strict";var i=n("3d8a"),r=n("ac83"),o=n("f30e"),a=n("0618"),s="toString",c=RegExp.prototype,u=c[s],l=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=s;(l||f)&&i(RegExp.prototype,s,(function(){var t=r(this),e=String(t.source),n=t.flags,i=String(void 0===n&&t instanceof RegExp&&!("flags"in c)?a.call(t):n);return"/"+e+"/"+i}),{unsafe:!0})},b27f:function(t,e,n){(function(t){var i="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,r=Function.prototype.apply;function o(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new o(r.call(setTimeout,i,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,i,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},n("de8a"),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,n("d1c9"))},be09:function(t,e,n){},c493:function(t,e,n){"use strict";var i=n("3eff"),r=n.n(i);r.a},de8a:function(t,e,n){(function(t,e){(function(t,n){"use strict";if(!t.setImmediate){var i,r=1,o={},a=!1,s=t.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(t);c=c&&c.setTimeout?c:t,"[object process]"==={}.toString.call(t.process)?p():h()?m():t.MessageChannel?v():s&&"onreadystatechange"in s.createElement("script")?g():b(),c.setImmediate=u,c.clearImmediate=l}function u(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var a={callback:t,args:e};return o[r]=a,i(r),r++}function l(t){delete o[t]}function f(t){var e=t.callback,i=t.args;switch(i.length){case 0:e();break;case 1:e(i[0]);break;case 2:e(i[0],i[1]);break;case 3:e(i[0],i[1],i[2]);break;default:e.apply(n,i);break}}function d(t){if(a)setTimeout(d,0,t);else{var e=o[t];if(e){a=!0;try{f(e)}finally{l(t),a=!1}}}}function p(){i=function(t){e.nextTick((function(){d(t)}))}}function h(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}function m(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"===typeof n.data&&0===n.data.indexOf(e)&&d(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),i=function(n){t.postMessage(e+n,"*")}}function v(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;d(e)},i=function(e){t.port2.postMessage(e)}}function g(){var t=s.documentElement;i=function(e){var n=s.createElement("script");n.onreadystatechange=function(){d(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}function b(){i=function(t){setTimeout(d,0,t)}}})("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,n("d1c9"),n("eef6"))},eef6:function(t,e,n){e.nextTick=function(t){var e=Array.prototype.slice.call(arguments);e.shift(),setTimeout((function(){t.apply(null,e)}),0)},e.platform=e.arch=e.execPath=e.title="browser",e.pid=1,e.browser=!0,e.env={},e.argv=[],e.binding=function(t){throw new Error("No such module. (Possibly not yet loaded)")},function(){var t,i="/";e.cwd=function(){return i},e.chdir=function(e){t||(t=n("6266")),i=t.resolve(e,i)}}(),e.exit=e.kill=e.umask=e.dlopen=e.uptime=e.memoryUsage=e.uvCounters=function(){},e.features={}}}]);