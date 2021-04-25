// ajax的预处理函数
$.ajaxPrefilter(function(option) {
    // 统一设置请求的url地址,根路径
    console.log(option);
    // option.url = '根地址' + option.url;
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;

    // 判断是否需要添加请求头
    // 如果请求的url地址是有权限的接口,设置请求头
    // url中包含了/my/说明是有权限的接口
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // option全局配置complete项
    option.complete = function(res) {
        // console.log(res); // ajax对象
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清除token
            localStorage.removeItem('token');
            // 回到首页
            location.href = '/login.html'
        }
    }
})