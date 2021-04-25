$(function() {
    // 表单项数据验证
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        somePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致!'
            }
        }
    })

    // 完成重置密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 清空表单
                    $('.layui-form')[0].reset();
                    // 清空token
                    localStorage.removeItem('token');
                    // 重新登录
                    window.parent.location.href = '/login.html';
                });
            }
        });
    });

})