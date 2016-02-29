window.onload = function() {
    var contain = document.getElementById('contain');
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;
    var len = 3; //修改处。。。。轮播图片的数量
    var pic_Width = 1000; //修改处。。。。轮播图片的宽度，此处为绝对值无单位
    var animated = false; //当动画在进行中时，屏蔽按键翻页效果
    var timer;


    function animate(offset) { //左右按键切换图片实现函数

        if (offset == 0) return;
        animated = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 250; //动画总时间
        var inteval = 10; //动画间隔时间
        var speed = offset / (time / inteval); //每次间隔移动距离
        go();

        function go() {
            if ((speed > 0 && newLeft > parseInt(list.style.left)) || (speed < 0 && newLeft < parseInt(list.style.left))) {
                list.style.left = parseInt(list.style.left) + speed + "px";
                setTimeout(go, inteval);

            } else { //无限滚动图片复位,当运行到这里时，说明动画结束

                list.style.left = newLeft + "px";
                if (newLeft > -pic_Width) {
                    list.style.left = -pic_Width * len + "px";
                }
                if (newLeft < -pic_Width * len) {
                    list.style.left = -pic_Width + "px";
                }
                animated = false;

            }
        }
    }

    function play() { //自动播放--自动触发next按钮而已
        timer = setInterval(function() {
            next.onclick();
        }, 3000)
    }

    function stop() { //停止自动播放

        clearInterval(timer);
    }

    function showButton() { //按钮切换显示实现函数
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
                break;
            }
        }
        buttons[index - 1].className = "on";
    }

    prev.onclick = function() { //前进按钮点击触发事件
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 3;
        } else {
            index--;
        }
        animate(pic_Width);
        showButton();

    }
    next.onclick = function() { //后退按钮点击触发事件
        if (animated) {
            return;
        }
        if (index == 3) {
            index = 1;
        } else {
            index++;
        }
        animate(-pic_Width);
        showButton();
    }
    for (var i = 0; i < buttons.length; i++) { //序列按钮点击事件实现
        if (this.className == "on") return;
        buttons[i].onclick = function() {
            if (animated) {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -pic_Width * (myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
        }

    }

    contain.onmouseover = stop;
    contain.onmouseout = play;


    play();

    /*tabSwitch*/
    function tabSwitch() {
        var ulist = document.getElementById('tab').getElementsByTagName('a');
     
        for (var i = 0; i < ulist.length; i++) {
            ulist[i].onclick = function() {
                for (var n = 0; n < ulist.length; n++) {//清楚所有a标签中的tabswitch类
                    if (ulist[n].className == "tabswitch") {
                        ulist[n].className = "";
                   
                        break;
                    }
                    
                }
                this.className = "tabswitch";
            }
        }
    }
   
}
