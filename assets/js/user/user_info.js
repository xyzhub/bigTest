// 用户信息界面入口函数
$(function() {
    // 调用获取用户信息函数
    getUserInfo();
    // 获取用户信息
    function getUserInfo() {
        // 调用接口发送ajax请求
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                console.log(res);
                // 判断用户信息是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                // 成功获取将数据渲染到表单中
                // 调用渲染函数
                // load(res.data);
                // 快速给表单赋值
                layui.form.val("formUserInfo", res.data);
            }
        });
    }
    // 重置表单信息
    $('#btnReset').on('click', function(e) {
        // 阻止重置表单的默认行为
        e.preventDefault();
        // 重新获取用户数据
        getUserInfo();
    });
    // 自定义表单校验规则
    layui.form.verify({
        nickname: function(value, item) {
            if (value.length > 6) {
                return '昵称长度不能超过6个字符'
            }
        }
    });
    // 修改表单数据
    // 绑定表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 获取表单数据
        var data = $(this).serialize();
        console.log(data);
        // 发送 ajax请求
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: data,
            success: function(res) {
                console.log(res);
                //判断是否修改成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 });
                // window.parent父页面对应的window对象,这里window.parent指的是index的window对象
                // console.log(window.parent);
                // 调用index.js下的getUserInfo()方法更新欢迎语
                window.parent.getUserInfo();
            }
        });
    });
})




// function load(data) {
//     // console.log(data);
//     // 用户名
//     $('[name=username]').val(data.username);
//     // 昵称
//     $('[name=nickname]').val(data.nickname);
//     // 邮箱
//     $('[name=email]').val(data.email);
//     // 获取用户id
//     $('[name=id]').val(data.id)
// }