(function () {
    function bind(curEle, evenType, evenFn) {
        if ("addEventListener" in document) {
            curEle.addEventListener(evenType, evenFn, false);
            return;
        }

        var tempFn = function () {
            evenFn.call(curEle);
        };
        tempFn.photo = evenFn;

        if (!curEle["myBind" + evenType]) {
            curEle["myBind" + evenType] = [];
        }
        var ary = curEle["myBind" + evenType];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].photo === evenFn) {
                return;
            }
        }
        ary.push(tempFn);
        curEle.attachEvent("on" + evenType, tempFn);
    }

    function unbind(curEle, evenType, evenFn) {
        if ("removeEventListener" in document) {
            curEle.removeEventListener(evenType, evenFn, false);
            return;
        }

        var ary = curEle["myBind" + evenType];
        if (ary && ary instanceof Array) {
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (cur.photo === evenFn) {
                    curEle.detachEvent("on" + evenType, cur);
                    ary.splice(i, 1);
                    break;
                }
            }
        }
    }

    function on(curEle, evenType, evenFn) {
        if (!curEle["myEvent" + evenType]) {
            curEle["myEvent" + evenType] = [];
        }
        var ary = curEle["myEvent" + evenType];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === evenFn) {
                return;
            }
        }
        ary.push(evenFn);
        bind(curEle, evenType, run);
    }

    function off(curEle, evenType, evenFn) {
        var ary = curEle["myEvent" + evenType];
        if (ary && ary instanceof Array) {
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if (cur === evenFn) {
                    ary[i] = null;
                    break;
                }
            }
        }
    }

    function run(e) {
        e = e || window.event;
        var flag = e.target ? true : false;
        if (!flag) {
            e.target = e.srcElement;
            e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };
        }

        var ary = this["myEvent" + e.type];
        for (var i = 0; i < ary.length; i++) {
            var tempFn = ary[i];
            if (typeof tempFn === "function") {
                tempFn.call(this, e);
            } else {
                ary.splice(i, 1);
                i--;
            }
        }
    }

    window.AddEvent = {
        on: on,
        off: off
    };
})();
