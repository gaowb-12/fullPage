var page=document.querySelector(".page");
var colors=['red','green','blue','pink','yellow'];
var items=page.querySelectorAll(".page-item");
var height=document.body.offsetHeight;
var index=0;
var flag=false;//假设动画是否执行。
// 设置背景
for(var i=0;i<items.length;i++){
    items[i].style.backgroundColor=colors[i];
}

document.onwheel=function(e){
    if(flag) return;
    flag=true;
    if(e.wheelDelta<0){
        index++;
        if(index>=items.length) {
            flag=false;
            index=items.length-1;
            return;
        };
        animate(page,"top",-height*index,function(){
            flag=false;
        });
    }else{
        if(index<=0) {
            flag=false;
            return;
        };
        index--;
        animate(page,"top",-height*index,function(){
            flag=false;
        });
    }
}

document.onkeyup=function(e){
    if(e.keyCode==38){//up
        console.log("up")
    }
    if(e.keyCode==40){//down
        console.log("down")
    }
}

// 封装滑动动画
function animate(dom,attr,target,func){
    var timer=setInterval(function(){
        var pageTop=parseInt(getStyle(dom,attr))||0;
        var step=8;
        step=target>pageTop?step:-step;
        if(Math.abs(pageTop-target)>=step){
            pageTop+=step;
            page.style.top=pageTop+"px";
        }else{
            page.style.top=target+"px";
            clearInterval(timer);
            func();
        };
    },5);
}
// 获取计算后的样式
function getStyle(dom,attr){
    return window.getComputedStyle ? window.getComputedStyle(dom)[attr] : dom.currentStyle[attr];
}