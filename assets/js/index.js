// 首页入口函数
$(function() {
    // 获取用户数据
    getUserInfo();

    // 点击提出按钮退出首页功能
    var layer = layui.layer;
    $('#logout').on('click', function() {
        // 使用layui的confirm询问框
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 清除本地存储的token
            localStorage.removeItem('token');
            // 跳转到首页
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
        });
    })
})

// 变为全局函数,方便window对象调用
// 全局函数会成为当前window对象的方法

// 定义获取用户数据函数
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // 请求头
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            // console.log(res); // 服务器响应回来的数据
            // 判断是否获取数据成功
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败', { icon: 5 })
            }
            // 调用渲染用户头像函数
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     // console.log(res); // ajax对象
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制清除token
        //         localStorage.removeItem('token');
        //         // 回到首页
        //         location.href = '/login.html'
        //     }
        // }
    });
}
// 定义渲染用户头像函数
function renderAvatar(data) {
    // console.log(data);

    // 获取用户昵称
    // 优先昵称,之后用户名
    var name = data.nickname || data.username;
    // 渲染欢迎语
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 渲染用户头像
    // 优先图像,其次用户名首字母
    // 判断是否有头像
    if (data.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 无头像
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}