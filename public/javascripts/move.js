/**
 * Created by lianheguo on 2016/9/2.
 */
var pic_top_ul = query('.house-pic .top-pic ul'),
    pic_img = queryAll('.house-pic .top-pic img'),
    pic_top_li = queryAll('.house-pic .top-pic li'),
    pic_bot_li = queryAll('.house-pic .bot-pic li'),
    house_fixed=query('.house-fixed'),
    left,
    startLeft = 0,
    curT = 0,
    step = 0, count = pic_img.length,
    item_lists = query('.item-lists'),
    outerWidth = document.body.clientWidth || document.documentElement.clientWidth,
    duration = 500,
    time = 0,
    timer,
    timer2,
    targetObj = {},
    changeObj = {},
    beginObj = {},
    ary_item = 0,
    dix;
pic_top_ul.style.width = pic_img.length * outerWidth + 'px';
for (var i = 0; i < pic_bot_li.length; i++) {
    pic_bot_li[i].style.width = 100 / pic_bot_li.length + '%';
    (function (i) {
        pic_bot_li[i].setAttribute('pic_img_length', pic_top_li[i].querySelectorAll('img').length);
        pic_bot_li[i].addEventListener('click', function () {
                                           var st = 0;
                                           prevAll(pic_top_li[i]).forEach(function (o) {
                                               st += o.querySelectorAll('img').length;
                                           });
                                           targetObj = {left: -st * outerWidth};
                                           step = st;
                                           move();
                                           changeList();
                                           changeTip();
                                       }
        )
    })(i)
}

pic_top_ul.addEventListener('touchstart', function (e) {
    startLeft = e.targetTouches[0].pageX;
    left = getCss(pic_top_ul, 'left');
    console.log(e.touches)
});
pic_top_ul.addEventListener('touchmove', function (e) {
    var endLeft = e.targetTouches[0].pageX;
    curT = endLeft - startLeft;
    pic_top_ul.style.left = left + curT + 'px'
});
pic_top_ul.addEventListener('touchend', function (e) {
    if (curT > 50) {
        if (step === 0) {
            targetObj = {left: 0};
            move();
        } else {
            step--;
            targetObj = {left: left + (outerWidth)};
            move();
            curT = 0;
            changeList();
            changeTip();
        }
    } else if (curT < -50) {
        if (step === count - 1) {
            targetObj = {left: -(pic_img.length - 1) * outerWidth};
            move();
            return;
        } else {
            step++;
            targetObj = {left: left - (outerWidth)};
            move();
            curT = 0;
            changeList();
            changeTip();
        }
    } else {
        targetObj = {left: -(step) * outerWidth};
        move();
        return;
    }
});
var bool=true;
for(var j= 0,len=pic_img.length;j<len;j++){
    (function(j){
        pic_img[j].onclick=function(){
            var litLeft=getCss(pic_top_ul,"left");
            var imgs=queryAll('.house-pic .top-pic div'),str='',dix;
            setCss(document.body||document.documentElement,'overflow','hidden')
            if(bool){
                str+='<div style="width:'+ getCss(pic_top_ul,"width")+'px;'+'left:'+  litLeft+'px" class="row absolute" id="fixUl">';
                for(var k=0;k<imgs.length;k++){
                    str+='<div style="background: url(public/images/Loading.gif) no-repeat center"><img src="'+ pic_img[k].src+'" alt="" style=";opacity: 0"></div>';
                    //str+='<div style="background: url('+pic_img[k].src+') no-repeat center;    background-size: 100%;"><img style=";display: none"></div>';
            }
                str+='</div>';
                house_fixed.innerHTML=str;
                bool=false;
                house_fixed.style.display='block';
                var oimgs=house_fixed.querySelectorAll('img');
                for(var x=0;x<len;x++){
                    (function(x){
                        oimgs[x].onload=function(){
                            var xh=getCss(oimgs[x],'height')/2+'px';
                            setCss(oimgs[x],'margin-top','-'+xh);
                            setCss(oimgs[x],'opacity',1);

                        }
                    })(x)
                    var xh=getCss(oimgs[x],'height')/2+'px';
                    setCss(oimgs[x],'margin-top','-'+xh)
                }
            }else {
                setCss(query('#fixUl'),'left',litLeft);
                house_fixed.style.display='block';
            }
            dix= query('#fixUl'),dix_img=queryAll('.house-fixed img'),step2=step;
            dix.addEventListener('touchstart', function (e) {
                e.preventDefault();
                startLeft = e.targetTouches[0].pageX;
                left = getCss(dix, 'left');
            });
            dix.addEventListener('touchmove', function (e) {
                e.preventDefault();
                var endLeft = e.targetTouches[0].pageX;
                curT = endLeft - startLeft;
                dix.style.left = left + curT + 'px'
            });
            dix.addEventListener('touchend', function (e) {
                e.preventDefault();
                if (curT > 50) {
                    if (step2 === 0) {
                        targetObj = {left: 0};
                        move2();
                    } else {
                        step2--;
                        targetObj = {left: left + (outerWidth)};
                        move2();
                        curT = 0;
                    }
                } else if (curT < -50) {
                    if (step2 === count - 1) {
                        targetObj = {left: -(dix_img.length - 1) * outerWidth};
                        move2();
                        return;
                    } else {
                        step2++;
                        targetObj = {left: left - (outerWidth)};
                        move2();
                        curT = 0;
                    }
                } else {
                    targetObj = {left: -(step2) * outerWidth};
                    move2();
                    return;
                }
            });
            function move2() {
                for (var key in targetObj) {
                    if (targetObj.hasOwnProperty(key)) {
                        beginObj[key] = getCss( dix, key);
                        changeObj[key] = targetObj[key] - beginObj[key];
                    }
                }
                window.clearTimeout(timer2);
                window.clearTimeout(timer);
                time += 10;
                if (time >= duration) {
                    for (var key in targetObj) {
                        if (targetObj.hasOwnProperty(key)) {
                            setCss( dix, key, targetObj[key]);
                        }
                    }
                    time = 0;
                    return;
                }
                for (key in targetObj) {
                    if (targetObj.hasOwnProperty(key)) {
                        var curPos = linear(time, beginObj[key], changeObj[key], duration);
                        setCss( dix, key, curPos);
                    }
                }
                timer2 = window.setTimeout(move2, 10);
            }
        }
    })(j)
}

house_fixed.onclick=function(){
    setCss(document.body||document.documentElement,'overflow','auto')
    house_fixed.style.display='none';
};
function changeList() {
    item_lists.innerHTML = step + 1 + '/' + pic_img.length
}
function changeTip() {
    for (var i = 0; i < pic_img.length; i++) {
        if (getIndex(par(par(pic_img[step]))) === i) {
            pic_bot_li[i].className = "colorWhite";
        } else {
            try {

                pic_bot_li[i].className = " ";
            } catch (e) {
            }
        }
    }
}
function move() {
    for (var key in targetObj) {
        if (targetObj.hasOwnProperty(key)) {
            beginObj[key] = getCss(pic_top_ul, key);
            changeObj[key] = targetObj[key] - beginObj[key];
        }
    }
    window.clearTimeout(timer);
    time += 10;
    if (time >= duration) {
        for (var key in targetObj) {
            if (targetObj.hasOwnProperty(key)) {
                setCss(pic_top_ul, key, targetObj[key]);
            }
        }
        time = 0;
        return;
    }
    for (key in targetObj) {
        if (targetObj.hasOwnProperty(key)) {
            var curPos = linear(time, beginObj[key], changeObj[key], duration);
            setCss(pic_top_ul, key, curPos);
        }
    }
    timer = window.setTimeout(move, 10);
}


