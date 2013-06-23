function checkSpace(str) {         //检测字符末尾空格并清除
    str = str.replace(/^(\s|\u00A0)+/,'');   
    for(var i = str.length-1; i >= 0; i--){   
        if(/\S/.test(str.charAt(i))){   
            str = str.substring(0, i+1);   
            break;   
        }   
    }   
    return str;   
}

module.exports = checkSpace;
