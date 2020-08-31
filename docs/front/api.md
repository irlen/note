# 原生api
### FileReader
```
const reader = new FileReader();

```
1.调用 FileReader对象的方法;
方法名 | 参数 | 描述
---|:--:|--:
abort | none | 中断读取
readAsBinaryString | file | 将文件读取为二进制码
readAsDataURL | file | 将文件读取为DataURL(即base64位编码格式)
readAsText | file | [encoding]将文件读取为文本

readAsText：该方法有两个参数，其中第二个参数是文本的编码方式，默认值为 UTF-8。这个方法非常容易理解，将文件以文本方式读取，读取的结果即是这个文本文件中的内容。
readAsBinaryString：该方法将文件读取为二进制字符串，通常我们将它传送到后端，后端可以通过这段字符串存储文件。
readAsDataURL：这是例子程序中用到的方法，该方法将文件读取为一段以 data: 开头的字符串，这段字符串的实质就是 Data URL，Data URL是一种将小文件直接嵌入文档的方案。这里的小文件通常是指图像与 html 等格式的文件。

2.事件
onabort 中断时触发
onerror 出错时触发
onload  文件读取成功完成时触发
onloadend 读取完成触发，无论成功或失败
onloadstart 读取开始时触发
onprogress 读取中

3.前端图片数据加载显示
```
<progress id="Progress" value="0" max="100"></progress>
<input type="file" name="file" onchange="showPreview(this)" />
<img id="portrait" src="" width="70" height="75">

function showPreview(source) {
    var file = source.files[0];
    console.log(file);
    if(window.FileReader) {
        var fr = new FileReader();
        fr.onloadend = function(e) {
            console.log(this.result);
            document.getElementById("portrait").src = e.target.result;
        };
        //给FileReader对象一个读取完成的方法,使用readAsDataURL会返回一个url,这个值就保存在事件对象的result里,img通过加载这个地址,完成图片的加载
        fr.readAsDataURL(file);


        var total = source.files[0].size;
        fr.onprogress = function(ev) {
            // 简单测试了一下 大概12M左右的传输速度
            // 推荐测试的时候用一个视频
            console.log(ev.loaded / total);
            var loading = (ev.loaded / total)*100;
            document.getElementById("Progress").value = loading;
        }
    }
}
```
4.base64与后台交互
```
<input type="file" id="upload-file">
document.getElementById("upload-file").addEventListener("change", function(){
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        var reader = new FileReader();
        reader.onload = function (ev) {
            console.log(ev);
            console.log(ev.target.result);
            var base64Str = ev.target.result.split(",")[1];
            //console.log(base64Str)
            $.ajax({
                url: "reImg.php",
                data: {
                    "base64file": base64Str
                },
                type: "post",
                success: function (res) {
                    createImg(res);
                }
            })
        }
        reader.readAsDataURL(file);
    }
});

function createImg(imgSrc){
    var theImg = document.createElement("img");
    theImg.src = imgSrc;
    document.body.appendChild(theImg);
    theImg.className = "imgC";
}

```
