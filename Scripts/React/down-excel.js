
// 依赖 global.js  &&  xlsx.full.min.js 

// 20200618 add by gch down excel

//数组延时循环
Array.prototype.delayCall = function (cb, cbEnd, delay) {   //可取
    if (typeof cbEnd == "number") {
        delay = cbEnd;
        cbEnd = undefined;
    }
    var _this = this;
    var i = -1;
    var tempF = function () {
        setTimeout(function () {
            i++;
            if (i != _this.length) {
                cb(_this[i], i);
                if (i + 1 != _this.length) {
                    tempF();
                } else {
                    cbEnd && cbEnd(_this);
                }
            }
        }, delay);
    }
    tempF();
}

//数组分块
Array.prototype.partition = function (length) {
    var _this = this;
    var i = 0;
    var result = [];
    var f = true;
    while (f) {
        var thunk = _this.slice(i, i + length);
        result.push(thunk);
        i = i + length;
        if (i >= _this.length) {
            f = false;
        }
    }
    return result;
}



var downExcel = (function () {
    var tmpDown; //导出的二进制对象
    function s2ab(s) { //字符串转字符流
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    function getCharCol(n) {
        let temCol = '',
            s = '',
            m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    }
    function downloadExl(linkID, json, type) {
        console.time("down excel 用时：");
        var tmpdata = json[0];
        json.unshift({});
        var keyMap = []; //获取keys
        //keyMap =Object.keys(json[0]);
        for (var k in tmpdata) {
            keyMap.push(k);
            json[0][k] = k;
        }
        var tmpdata = [];//用来保存转换好的json 
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
            v: v.v
        });
        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        var tmpWB = {
            SheetNames: ['mySheet'], //保存的表标题
            Sheets: {
                'mySheet': Object.assign({},
                    tmpdata, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
            }
        };

        tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
            { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
        ))], {
                type: ""
            }); //创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        document.getElementById(linkID).href = href; //绑定a标签
        document.getElementById(linkID).click(); //模拟点击实现下载
        console.timeEnd("down excel 用时：");
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }


    return function (data, fileNameBundle, linkId, num, end) {  //fileNameBundle 文件名 linkId： a链接id num: 每num笔数据down进一个excel文件  end: down excel完毕时执行！
        if(typeof num == "function"){
            end = num;
            num = null;
        }
        num = num ? num : Math.floor(400000 / Object.keys(data[0]).length);   // 40万单元格
        console.log("开始下载excel...");
        console.time("共计用时");
        data.partition(num).delayCall(function (d, i) {
            var fileName = fileNameBundle + (i + 1) + ".xlsx";
            document.getElementById(linkId).download = fileName;
            //$("#down-excel").attr("download", fileName);
            console.log("download " + fileName + " start ...");
            downloadExl(linkId, d);
        }, function () {
            console.log("all excel download completed!");
            console.timeEnd("共计用时");
            end && end();
        }, 1);
    }
}())

