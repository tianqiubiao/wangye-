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
                timeList.innerHTML = '<div style="width: 2.1rem;height: .4rem; display: inline-block" class="colorG1" id='+c+'>' + this.innerText + '</div><span style="font-weight: bold" class="colorG6"><img src="../images/u30.png" alt="" style="height: .16rem;"></span>';
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
function next(curEle){
	if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var pre = curEle.nextSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.nextSibling;
    }
    console.log(pre)
    return pre;
}
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

function getBt(str){
    var char = str.match(/[^\x00-\xff]/ig);
    return str.length + (char == null ? 0 : char.length);
}

function reminder(string,link,num){
    if(!window.div_reminder_item){
        window.div_reminder_item=0;
        console.log(window.div_reminder_item)
    }
    var a="shot-box"+div_reminder_item,b="hint-box"+ div_reminder_item,c="shot-box-close"+div_reminder_item,d="shot_box_true"+div_reminder_item,z=10000+div_reminder_item;
    div_reminder_item++;
    var str='<div class="fixed shot-box " style="z-index: '+z+';top:0" id='+a+'>';
    str+='<div class="pad20 bgG8 font14 colorG4 absolute marLr20 bor-rad5" style="top: 30%;width: 3.2rem;">';
    if (getBt(string)>43){
       str+='<div class="text-left line_height25" id='+b+'>';
    }else {
       str+='<div class="text-center line_height25" id='+b+'>';
    }
    str+='<div class="sign_foot"  style="padding-bottom: 20px;word-wrap: break-word">'+string+'</div>';
    str+='<div class="row font20 marTop30">';
    if(Object.prototype.toString.call(link)==="[object Undefined]" &&  Object.prototype.toString.call(num)==="[object Undefined]"){
        str+='<button class="listBtn1 marAuto marTop30 colorWhite" id='+c+' style="width:2.8rem;">确认</button>';
    }else if(Boolean(num)==false){
        str+='<button class="left shotBtn borG6 bor-rad5 marR10 colorG3" id='+c+'>取消</button>';
        str+='<button class="left shotBtn bgLinYel bor-rad5 colorWhite" id='+d+'>确认</button>';
    }else {
        str+='<button class="listBtn1 marAuto marTop30 colorWhite" id='+d+' style="width:2.8rem;">确认</button>';
    }
    str+='</div></div></div>';
    var oDiv=document.createElement('div');
    var did='shot-box_div_item'+div_reminder_item;
    oDiv.id=did;
    oDiv.innerHTML=str;
    document.body.insertBefore(oDiv,null);
    if(Boolean(num)===false) {
        query('#' + c).onclick = function () {
            query('#' + a).style.display = 'none';
            document.body.removeChild(query('#' + did));
        }
    }
    if(query('#' + d)) {
        query('#' + d).onclick = function () {
            if (link) {
                window.location.href = link;
            }
            document.body.removeChild(query('#' + did));
        }
    }
}

function alr(string,link){
    var str='';
    str+='<div id="shot-box_div_item1">';
    str+=' <div class="fixed shot-box " style="z-index: 10000;top:0;background: rgba(0,0,0,.5)">';
    str+=' <div class="pad20 bgG8 font14 colorG4 absolute marLr20 bor-rad5" style="top: 30%;width: 3.2rem;">';
    str+='  <div class="text-center line_height25" id="hint-box0">';
    str+='  <div class="sign_foot" style="padding-bottom: 20px;word-wrap: break-word;line-height: 1.2rem;color: red;">'+string+'</div>';
    str+='</div></div></div></div>';
    window.setTimeout(function(){
        window.location.href=link;
    },1500);
    var oDiv=document.createElement('div');
    oDiv.innerHTML=str;
    document.body.insertBefore(oDiv,null);
}
