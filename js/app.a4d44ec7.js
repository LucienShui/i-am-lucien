(function(e){function t(t){for(var n,u,l=t[0],i=t[1],c=t[2],f=0,m=[];f<l.length;f++)u=l[f],a[u]&&m.push(a[u][0]),a[u]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);s&&s(t);while(m.length)m.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,l=1;l<r.length;l++){var i=r[l];0!==a[i]&&(n=!1)}n&&(o.splice(t--,1),e=u(u.s=r[0]))}return e}var n={},a={app:0},o=[];function u(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=e,u.c=n,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(r,n,function(t){return e[t]}.bind(null,n));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var s=i;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),a=r("bc3a"),o=r.n(a),u=r("a7fe"),l=r.n(u),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container",attrs:{id:"app"}},[r("Header"),r("router-view"),r("Footer")],1)},c=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",[r("div",{staticClass:"menu"},[r("ul",[r("li",[r("router-link",{attrs:{to:"/"}},[e._v("/")])],1),e._m(0),e._m(1),e._m(2)])])])},f=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("a",{attrs:{href:"https://www.lucien.ink/index.php",target:"_blank"}},[e._v("/blog")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("a",{attrs:{href:"https://www.lucien.ink/friends.html",target:"_blank"}},[e._v("/friends")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("li",[r("a",{attrs:{href:"https://pasteme.cn/",target:"_blank"}},[e._v("/pasteme")])])}],m={name:"Header"},p=m,v=r("2877"),d=Object(v["a"])(p,s,f,!1,null,"3228dc82",null),b=d.exports,_=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},h=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("footer",[e._v("\n    Follow me on "),r("a",{attrs:{href:"https://github.com/LucienShui",target:"_blank"}},[e._v("GitHub")])])}],g={name:"Footer"},w=g,x=Object(v["a"])(w,_,h,!1,null,"38e00eb4",null),y=x.exports,$={components:{Footer:y,Header:b}},O=$,j=Object(v["a"])(O,i,c,!1,null,"6c3e6164",null),k=j.exports,E=r("8c4f"),P=r("bb51"),S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",[r("h1",{attrs:{id:"get-in-touch"}},[e._v("Message Board")]),r("form",{on:{submit:e.onSubmit}},[r("label",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"name*:"},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]),r("label",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],attrs:{type:"email",placeholder:"email*:"},domProps:{value:e.form.email},on:{input:function(t){t.target.composing||e.$set(e.form,"email",t.target.value)}}})]),r("label",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.url,expression:"form.url"}],attrs:{type:"url",placeholder:"url:"},domProps:{value:e.form.url},on:{input:function(t){t.target.composing||e.$set(e.form,"url",t.target.value)}}})]),r("label",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.text,expression:"form.text"}],attrs:{rows:"5",placeholder:"text*:"},domProps:{value:e.form.text},on:{input:function(t){t.target.composing||e.$set(e.form,"text",t.target.value)}}})]),r("input",{attrs:{type:"submit",value:"[ submit ]"}})])])},H=[],M={name:"Contact",data:function(){return{form:{name:"",email:"",url:"",text:""}}},methods:{onSubmit:function(e){e.preventDefault(),alert("还在建设中")}}},F=M,N=Object(v["a"])(F,S,H,!1,null,"0633b915",null),C=N.exports;n["a"].use(E["a"]);var T=new E["a"]({routes:[{path:"/",name:"home",component:P["default"]},{path:"/contact",name:"contact",component:C}]});r("aede");n["a"].config.productionTip=!1,n["a"].use(l.a,o.a),new n["a"]({router:T,render:function(e){return e(k)}}).$mount("#app")},"7ad4":function(e,t,r){"use strict";var n=r("9cae"),a=r.n(n);t["default"]=a.a},"9cae":function(e,t){},aede:function(e,t,r){},baf5:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",[r("h1",{attrs:{id:"who"}},[e._v("Who")]),r("p",[e._v("Lucien，拉丁文，寓意真理，苹果粉，码农")]),r("h1",{attrs:{id:"hobby"}},[e._v("Hobby")]),r("p",[e._v("女朋友，唱歌，吉他，钢琴，小提琴，敲代码，数码产品")]),r("h1",{attrs:{id:"intro"}},[e._v("Intro")]),r("p",[e._v("无名之辈，湖北襄阳人许。")]),r("br"),r("p",[e._v("修于新，至舞象之年。升学青岛，野心颇多，而力不能及。")]),r("p",[e._v("遂迷茫，吃喝玩乐，废时颇多，悔不当初。")]),r("br"),r("p",[e._v("初至青岛，视野颇开，欲专于曲乐，遂弃课业不顾。写曲弹弦，尽惹啼笑，卖唱半载，混迹苟活。")]),r("br"),r("p",[e._v("奈何生而为人，尝八苦，铸大错，遂整日闭门黄粱梦，终婆娑请辞。以《莉莉安》一曲为终，不闻乐，不语歌，尔后至今。")]),r("p",[e._v("幸遇伯乐，推至上，众人划桨，披荆斩棘不惊。山前得势，山后迷惘。")]),r("p",[e._v("奈何妖魔鬼怪，其间琐事颇多，郁郁半载，寻医问药略有成。后遇有心人，然，负之，再遇贵人，伴随至今。")]),r("br"),r("p",[e._v("寻路甚久，起伏不定。惶惶终日，不懂文言分毫，画文于此。")]),r("br"),r("p",[e._v("终不得愿，抱憾终生。")])])}];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return a})},bb51:function(e,t,r){"use strict";var n=r("baf5"),a=r("7ad4"),o=r("2877"),u=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"3cb435a4",null);t["default"]=u.exports}});
//# sourceMappingURL=app.a4d44ec7.js.map