// ajax的预处理函数
$.ajaxPrefilter(function(option) {
    // 统一设置请求的url地址,根路径
    console.log(option);
    // option.url = '根地址' + option.url;
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
})