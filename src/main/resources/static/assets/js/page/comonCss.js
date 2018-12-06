var BASE_HOST = ".."
var host_level = 2;
//console.log(document.getElementById("configjs"))
if (document.getElementById("configjs")) {
    if (document.getElementById("configjs").getAttribute("level")) {
        host_level = document.getElementById("configjs").getAttribute("level");
        switch (host_level) {
            case 1:
                BASE_HOST = "";
                break;
            case 3:
                BASE_HOST = "../.."
        }
    }
}
/*
 * basic styles
 */
document.write('<link href="' + BASE_HOST + '/assets/css/bootstrap.min.css" rel="stylesheet" />')
document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/font-awesome.min.css" />')
document.write('<link href="' + BASE_HOST + '/assets/css/bootstrap.min.css" media="all" rel="stylesheet" />')
/*
 *datapicker
 * */
document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/bootstrap-timepicker.css" />')
document.write('<link href="' + BASE_HOST + '/assets/css/daterangepicker.css" rel="stylesheet" />')
/*
 * font
 */
document.write('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />')

/*
 * ace styles
 */

document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/ace.min.css" />')
document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/ace-rtl.min.css" />')
document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/ace-skins.min.css" />')

/*
 * my css
 */

document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/style.css" />')
document.write('<script rel="stylesheet" src="' + BASE_HOST + '/assets/js/page/comConfig.js" ></script>')

/*
 * ace settings handler
 */
document.write('<script src="' + BASE_HOST + '/assets/js/ace-extra.min.js"></script>')

/*
 * ie浏览器加载
 */
if (IEVersion == 7) {
    document.write('<link rel="stylesheet" href="' + BASE_HOST + '/assets/css/font-awesome-ie7.min.css" />')
}
if (IEVersion <= 8) {
    document.write('<link href="' + BASE_HOST + '/assets/css/bootstrap.min.css" rel="stylesheet" />')
}
//HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries
if (IEVersion < 9) {
    document.write('<script src="' + BASE_HOST + '/assets/js/html5shiv.js"></script>')
    document.write('<script src="' + BASE_HOST + '/assets/js/respond.min.js"></script>')
}

//判断是否为ie浏览器
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}
