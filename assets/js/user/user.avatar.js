$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 头像图片选择功能
    $('#btnChooseImage').on('click', function() {
        // 触发file的点击事件
        $('#file').click();
    });

    // 绑定一个文件状态改变事件
    // 必须先选择一个图片之后才能监听到事件改变状态
    $('#file').on('change', function(e) {
        // console.log(e);
        var firstList = e.target.files;
        // console.log(firstList.length);
        if (firstList.length === 0) {
            return layui.layer.msg('请选择图片', { icon: 5 });

        }
        // 获取选择的图片
        var file = firstList[0];
        // console.log(file);
        // 把选中的文件,生成一个可以访问的文件路径
        var newImgURL = URL.createObjectURL(file);
        // 重新设置配置项
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 更新头像
    $('#btnUpload').on('click', function() {
        // 获取选择的图片列表
        var fsList = $('#file')[0].files;
        // console.log(fsList);
        if (fsList.length === 0) {
            return layui.layer.msg('请选择图片', { icon: 5 })
        }
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发送ajax请求
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res);
                // 判断是否成功
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // 更新index头像区域
                    window.parent.getUserInfo();
                });
            }
        });
    })
})