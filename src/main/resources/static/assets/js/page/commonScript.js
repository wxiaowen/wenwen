/*
 * basic scripts
 */
document.write('<link rel="stylesheet" href="'+ BASE_HOST +'/assets/css/font-awesome-ie7.min.css" />')
/*
 * IE相关判断
 */
if(IEVersion == -1){
	document.write('<script src="http://cdn.bootcss.com/jquery/2.0.3/jquery.min.js"></script>')
	window.jQuery || document.write("<script src='"+ BASE_HOST +"/assets/js/jquery-2.0.3.min.js'></script>")
}else{
	document.write('<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>')
	window.jQuery || document.write("<script src='"+ BASE_HOST +"/assets/js/jquery-1.10.2.min.js'></script>")
}

if("ontouchend" in document) document.write("<script src='"+ BASE_HOST +"/assets/js/jquery.mobile.custom.min.js'></script>")

document.write('<script src="'+ BASE_HOST +'/assets/js/bootstrap.min.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/typeahead-bs2.min.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/jquery.dataTables.min.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/jquery.dataTables.bootstrap.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/layer/layer.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/jquery.validate.min.js"></script>')



/*
 * ace scripts
 */
document.write('<script src="'+ BASE_HOST +'/assets/js/ace-elements.min.js"></script>')
document.write('<script src="'+ BASE_HOST +'/assets/js/ace.min.js"></script>')
/*
 * my scripts
 */