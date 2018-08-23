//jquery cookie需要脚本文件如下：
jQuery.cookie = function(name, value, options) {
	if(typeof value != 'undefined') {
		options = options || {};
		if(value === null) {
			value = '';
			options = $.extend({}, options);
			options.expires = -1;
		}
		var expires = '';
		if(options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if(typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if(document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for(var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if(cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};
//页面调用只要引进这个文件
//$.cookie("name"); //根据cookie名字取到cookie值
//$.cookie("name", "value"); //设置cookie 名字，值
//
//$.cookie("name", value, { expires: 7 }); //设置cookie 名字，值，生命周期等属性
//$.cookie("name", null); //根据cookie名移除cookie

//$.ajax({
//					//请求方式
//					type: "GET",
//					//文件位置
//					url: "js/new_file.json",
//					//返回数据格式为json,也可以是其他格式如
//					dataType: "json",
//					//请求成功后要执行的函数，拼接html
//					success: function(data) {
//						console.log(data);
//					}
//				});