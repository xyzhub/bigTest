// 入口函数
$(function() {
    // // 给去注册绑定点击事件
    // $('#link_reg').on('click', function() {
    //     // 将登录隐藏
    //     $('.login-box').hide();
    //     // 将注册显示
    //     $('.reg-box').show();
    // });
    // // 给去登录绑定点击事件
    // $('#link_login').on('click', function() {
    //     // 将登录显示
    //     $('.login-box').show();
    //     // 将注册显示
    //     $('.reg-box').hide();
    // });
    // 使用类
    // $('#link_reg,#link_login').on('click', function() {
    //     $('.login-box').toggleClass('active').siblings('.reg-box').toggleClass('active');
    // });
    // 直接使用toggle和并集选择器
    $('#link_reg,#link_login').on('click', function() {
        $('.login-box,.reg-box').toggle();
    });

    // 自定义校验规则
    var form = layui.form;
    form.verify({
        // 密码校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function(value, item) {
            // console.log(value, item);
            // item是调用该规则的元素结构

            // value是调用该规则的表单的值
            // 在这里就是确认密码值
            // 获取密码的值
            var pwdipt = $('.reg-box [name=password]').val();
            // 判断两次输入的密码是否一致
            if (pwdipt !== value) {
                return '两次输入密码不一致';
            }
        }
    });


    // 注册功能
    $('#form_reg').submit(function(e) {
        // 阻止默认事件
        e.preventDefault(e);
        // 获取表单数据
        var data = {
            username: $('.reg-box [name=username]').val().trim(),
            password: $('.reg-box [name=password]').val().trim(),
        }

        // console.log(data);
        // 发送ajax请求
        $.ajax({
            type: "post",
            url: "http://api-breakingnews-web.itheima.net/api/reguser",
            data: data,
            success: function(res) {
                console.log(res);
                // 判断请求是否成功
                if (res.status !== 0) {
                    return alert('注册失败');
                }
                // 调用去登录的点击事件
                $('#link_login').click();
            }
        });
    });

})