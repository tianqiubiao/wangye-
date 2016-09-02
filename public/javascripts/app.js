/**
 * Created by tianqiubiao on 2016/8/24.
 */


/*设置根字体，自适应*/
;(function (doc, win) {
    var docEl     = doc.documentElement,statWidth = docEl.clientWidth,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc    = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth /360) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function query(ele) {
    return document.querySelector(ele)
}
function queryAll(ele) {
    return document.querySelectorAll(ele)
}

function time_list(a,b,c){
    var timeList = document.getElementById(a),
        timeLayer = document.getElementById(b),
        timeLayerLists = timeLayer.querySelectorAll('.list-layer-time div');
    timeList.addEventListener('click', function () {
        timeLayer.style.display = 'block';
    })
    for (var i = 0; i < timeLayerLists.length; i++) {
        ~function () {
            timeLayerLists[i].onclick = function () {
                timeList.innerHTML = '<div style="width: 2.1rem;height: .4rem; display: inline-block" class="colorG1" id='+c+'>' + this.innerText + '</div><span style="font-weight: bold" class="colorG6">&gt;</span>';
                timeLayer.style.display = 'none';
            }
        }(i)
    }
}

function getCss(curEle, attr) {
    var val = reg = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
    } else {
        if (attr === "opacity") {
            val = curEle.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = curEle.currentStyle[attr];
        }
    }
    reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
}

function setCss(curEle, attr, value) {
    if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
        return;
    }
    if (attr === "opacity") {
        value > 1 ? value = 1 : null;
        value < 0 ? value = 0 : null;
        curEle["style"]["opacity"] = value;
        curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        return;
    }
    var reg = /^(width|height|(padding|margin(Top|Left|Right|Bottom))|top|left|right|bottom)$/;
    if (reg.test(attr)) {
        reg = /^-?\d+(\.\d+)?$/;
        if (reg.test(value)) {
            curEle["style"][attr] = value + "px";
            return;
        }
    }
    curEle["style"][attr] = value;
}
function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};
 function prevAll(curEle) {
    var ary = [], pre = prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = prev(pre);
    }
    return ary;
};
function par(curEle) {
    var p = curEle.parentNode;
    while (p && p.nodeType !== 1) {
        p = p.parentNode;
    }
    return p;
};
 function getIndex(curEle) {
    return this.prevAll(curEle).length;
};
hasClass = function hasClass(curEle, cName) {
    var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
    return reg.test(curEle.className);
};
addClass=function addClass(curEle, cName) {
    if (!this.hasClass(curEle, cName)) {
        curEle.className += " " + cName;
    }
};

removeClass=function removeClass(curEle, cName) {
    if (this.hasClass(curEle, cName)) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        curEle.className = curEle.className.replace(reg, " ");
    }
};
 function linear(t, b, c, d) {
        return c * t / d + b;
    }
