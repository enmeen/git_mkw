$(function() {//iframe_height窗口高度和li的高度是整数呗是才能完整的实现功能，不会出现显示问题。要考虑到边框线对高度的影响
	var initialHeight = 0;
	var iframe_height = 410; //单位px iframe窗口的高度
	var content = $(".newsList_iframe_content").eq(0);
	var marginTop = parseInt(content.css("margin-top"));//该数值要置于全局变量中，被2个函数共同作用
	var divHeight = (content.height());
	$("#goforward").click(function() { //点击前进按钮
		if (marginTop >= 0) { //初始或者置顶时该按钮不起作用
			return
		} else {
			content.css("margin-top", initialHeight + iframe_height + "px");
			initialHeight = initialHeight + iframe_height;
		}
		marginTop = parseInt(content.css("margin-top"));
	})
	$("#retreat").click(function() { //点击后退按钮
		if ((marginTop - iframe_height) > -divHeight) {//当检测到时最后一页时，停止工作
			content.css("margin-top", initialHeight - iframe_height + "px");
			initialHeight = initialHeight - iframe_height;
		}else{
			return;
		}
		marginTop = parseInt(content.css("margin-top"));
		console.log("marginTop:   " + marginTop + "   " + "divHeight:" + divHeight);

	})
})