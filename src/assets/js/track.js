/*
@File    :   track.js
@Contact :   lucien@lucien.ink
@License :   (C)Copyright 2019, Lucien Shui

@Modify Time      @Author    @Version    @Desciption
------------      -------    --------    -----------
2019-06-01 20:20  Lucien     1.0         None
*/
let gap = document.createElement('script');
gap.async = true;
gap.src = 'https://www.googletagmanager.com/gtag/js?id=UA-98721181-4';
let head = document.querySelector('head');
head.appendChild(gap);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-98721181-3');

(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?64c63b02e2155ca731abbd942de57d9e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
