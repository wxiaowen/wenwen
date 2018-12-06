/*
 * 引入js
 */
document.write("<script type='text/javascript' src='../assets/js/layer/layer.js'></script>")
layer.config({
    extend: 'moon/style.css', //加载新皮肤
    skin: 'layer-ext-moon' //一旦设定，所有弹层风格都采用此主题。
});
/*
 * 公共配置
 */

var APIHOST = "/"
var PORTALHOST = "http://192.168.1.35:8000/"
var CONFIG = {
    API: {
        userTree: APIHOST + 'dept/list',
        deptTree: {
            url: APIHOST + 'dept/list',
            name: 'depttree',
            setting: {
                data: {
                    key: {
                        name: "deptname",
                    },
                    simpleData: {
                        enable: true
                    }
                },
            }
        },
        resourceTree: {
            url: APIHOST + 'resource/getResource',
            name: 'resourcetree',
            setting: {
                data: {
                    key: {
                        name: "appid",
                        pIdKey: "parentid"
                    },
                    simpleData: {
                        enable: true
                    }
                },
            }
        },
    },
}
/*
 * 初始化datatable公共配置
 */
var CONSTANT = {
    DATA_TABLES: {
        DEFAULT_OPTION: { //DataTables初始化选项
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "每页 _MENU_ 项",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
                "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页",
                    "sJump": "跳转"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            lengthMenu: [5, 10, 15, 20, 25, 50, 75, 100],
            autoWidth: true, //禁用自动调整列宽
            stripeClasses: ["odd", "even"], //为奇偶行加上样式，兼容不支持CSS伪类的场合
            order: [], //取消默认排序查询,否则复选框一列会出现小箭头
            processing: false, //隐藏加载提示,自行处理
            serverSide: true, //启用服务器端分页
            searching: true, //禁用原生搜索
            dom: '<"tabheader"f><"tabcontent"rt><"tabfooter"lip><"clear">',
        },
        NOPAGE_OPTION: {
            serverSide: false,
            paging: false,
            lengthChange: false,
            info: false,
            searching: false,
        },
        NOSEARCHING_OPTION: {
            searching: false,
        },
        COLUMN: {
            CHECKBOX: { //复选框单元格
                className: "text-center td-checkbox",
                orderable: false,
                width: "50px",
                data: null,
                title: '<label>' +
                '<input type="checkbox" class="ace"  name="table-check-all" />' +
                '<span class="lbl"></span>' +
                '</label>'
                ,
                render: function (data, type, row, meta) {
                    var check_htm = '<label>' +
                        '<input type="checkbox" class="ace" value="' + data.id + '" />' +
                        '<span class="lbl"></span>' +
                        '</label>';
                    return check_htm;
                }
            },
            OPTCOLUMN: {
                "orderable": false,
                "bSortable": false,
                "defaultContent": "",
                "width": 150,
                "sortable": false,
                "render": function (data, type, row, meta) {
                    return CONSTANT.DATA_TABLES.RENDER.OPTBUTTON(data, type, row, meta)
                }
            },
        },
        RENDER: { //常用render可以抽取出来，如日期时间、头像等
            ELLIPSIS: function (data, type, row, meta) {
                data = data || "";
                return '<span class="ellipsis" title="' + data + '">' + data + '</span>';
            },
            DATETIME: function (data, type, row, meta) {
                return dateFormat(data, "datetime");
            },
            DATE: function (data, type, row, meta) {
                return dateFormat(data);
            },
            ONEBUTTON: function (row, setting) {
                var set = {
                    type: '',
                    icon: '',
                    aClass: '',
                    aHref: '#',
                    aTitle: '',
                    data: {
                        id: "id"
                    }
                }
                $.extend(set, setting);
                switch (parseInt(set.type)) {
                    case 1:
                        set.icon = "fa-plus";
                        set.aClass = "purple js-add-row";
                        set.aTitle = '添加';
                        break;
                    case 2:
                        set.icon = "fa-trash";
                        set.aClass = "red js-del-row";
                        set.aTitle = '删除';
                        break;
                    case 3:
                        set.icon = "far fa-file-alt";
                        set.aClass = "dark js-info-row";
                        set.aTitle = '详情';
                        break;
                    case 4:
                        set.icon = "fa-pencil-alt";
                        set.aClass = "green js-edit-row";
                        set.aTitle = '编辑';
                        break;
                }
                var data_htm = '';
                for (var i in set.data) {
                    data_htm += ' data-' + i + '="' + row[set.data[i]] + '"';
                }
                var onebtn = '<a class="' + set.aClass + '" href="' + set.aHref + '" ' + data_htm + ' title="' + set.aTitle + '">' +
                    '<i class="' + set.icon + ' bigger-120"></i>' +
                    '</a>';
                var onebtn_xs = '<li>' +
                    '<a href="' + set.aHref + '" class="' + set.aClass + '" ' + data_htm + ' title="' + set.aTitle + '">' +
                    '<span class="">' +
                    '<i class="' + set.icon + ' bigger-110"></i>' +
                    '</span>' +
                    '</a>' +
                    '</li>';
                return {
                    onebtn: onebtn,
                    onebtn_xs: onebtn_xs,
                };
            },
            OPTBUTTON: function (data, type, row, meta, buttons) {
                var button_html = '', button_xs_html = '';
                if (!buttons) {
                    buttons = {
                        default: true,
                        data: []
                    }
                }
                if (buttons.default) {
                    buttons.data.push({type: 3,}, {type: 4,}, {type: 2,})
                }
                for (var i=0; i<buttons.data.length; i++) {
                    button_html += CONSTANT.DATA_TABLES.RENDER.ONEBUTTON(row, buttons.data[i]).onebtn;
                    button_xs_html += CONSTANT.DATA_TABLES.RENDER.ONEBUTTON(row, buttons.data[i]).onebtn_xs;
                }
                return data = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">' +
                    button_html +
                    '</div>' +
                    '<div class="visible-xs visible-sm hidden-md hidden-lg">' +
                    '<div class="inline position-relative">' +
                    '<button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa-caret-down icon-only bigger-130"></i>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close">' +
                    button_xs_html +
                    '</ul>' +
                    '</div>' +
                    '</div>';
            }
        }
    },
    LAYER_MODEL:{
        DEFAULT_OPTION: {
            type: 1, //0（信息框）1（页面层，默认）2（iframe层）3（加载层）4（tips层）
            title: "信息",
            skin: "layer-ext-moon",
            area: "auto",
            shade: 0.4,
            shadeClose: true,
        },
    }
};
/*
 * dataTable相关操作方法
 */

var tableFun = {
    currentItem: null,
    fuzzySearch: true,
    getQueryCondition: function (data) {
        var param = {};
    },
    getCheckedIds: function (table) {
        var ids = '';
        table.find(".td-checkbox").each(function () {
            var that = $(this);
            if (that.find("input[type=checkbox]").is(":checked") && that.find("input[type=checkbox]").attr("name") != "table-check-all") {
                ids = ids ? ids + "," : ids
                ids += that.find("input[type=checkbox]").val()
            }
        })
        return ids;
    },
    showItemDetail: function (params) {
        if (params && params.id) {
            $.ajax({
                type: "get",
                url: APIHOST + params.edit_url,
                data: {
                    id: params.id
                },
                success: function (result) {
                    showFormDetail(result.data, params.ele,params.setting);
                }
            });
        }
    },
    editItem: function (id, editurl) {
        if (id) {
            $.ajax({
                type: "get",
                url: APIHOST + editurl,
                data: {
                    id: id
                },
                success: function (result) {
                    showFormEdit(result.data);
                }
            });
        }
    },
    deleteItem: function (oTable, id, delurl) {
        var message;
        if (id) {
            message = "确定要删除该条记录吗?";
            /*if(selectedItems.length == 1) {
             message = "确定要删除该条记录吗?";
             } else {
             message = "确定要删除选中的" + selectedItems.length + "项记录吗?";
             }*/
            layer.confirm(message, {
                btn: ['确定', '取消'], //按钮
                icon: 2,
            }, function () {
                $.ajax({
                    type: "get",
                    url: APIHOST + delurl,
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result.success) {
                            layer.msg(result.message, {
                                icon: 1
                            });
                            oTable.clear().draw(false);
                        } else {
                            layer.msg(result.message, {
                                icon: 0
                            });
                        }
                    }
                });
            }, function () {
                layer.msg('取消成功', {
                    time: 1000,
                });
            });

        } else {
            layer.msg('请先选中要操作的行', {
                icon: 1
            });
        }
    },
    showFormDetail: function (resultdata, setting) {
        var data_set = (setting && setting.data) ? setting.data : []
        if (resultdata) {
            var html = ''
            for (var i = 0; i < data_set.length; i++) {
                data_set[i].length = data_set[i].length ? data_set[i].length : 2
                var labelWidth = "100px";
                if(data_set[i].labelWidth){
                    labelWidth = data_set[i].labelWidth;
                    if(data_set[i].labelWidth.indexOf("%") == -1) labelWidth += 'px'
                }
                if (i % data_set[i].length) html += '<div class="row">'
                var render_data = resultdata[data_set[i].data]
                if (data_set[i].render) {
                    render_data = data_set[i].render(render_data);
                }
                html += '<div class="col-sm-' + 12 / data_set[i].length + '" style="min-height: 30px;line-height: 30px;margin-bottom: 10px;">' +
                    '<label class="control-label text-right no-padding-right" style="width: '+ labelWidth +';position: absolute;left: 0;top: 0;">' + data_set[i].name + '：</label>' +
                    '<div class="" style="padding-left: '+ labelWidth +'">' + render_data + '</div>' +
                    '</div>';
                if (i % data_set[i].length == data_set[i].length - 1) html += '</div>'
            }
        }
        return html;
    },
    showTableById:function (resultdata,setting) {
        var data_set = (setting&&setting.data)?setting.data:[]
        if(resultdata && resultdata.length){
            var html = '<thead><tr>',tbody_htm = '<tbody>',param_htm='';
            for(var j=0;j<resultdata.length; j++){
                param_htm = ''
                if(setting && setting.params){
                    for (var p in setting.params){
                        param_htm +=' data-'+ setting.params[p].data +'='+ (setting.params[p].value?setting.params[p].value:(resultdata[j][setting.params[p].data]?resultdata[j][setting.params[p].data]:""))
                    }
                }
                tbody_htm +='<tr'+ param_htm +'>'
                for (var i=0;i<data_set.length;i++){
                    var render_data = resultdata[j][data_set[i].data]
                    if(data_set[i].render){
                        render_data = data_set[i].render(render_data);
                    }
                    if(j==0){
                        html +='<th '+ (data_set[i].width?'width="'+data_set[i].width + '"':'') + (data_set[i].hide?' style="display:none;"':'') +'>'+ data_set[i].name +'</th>'
                    }
                    tbody_htm +='<td align="'+ (data_set[i].textAlign?data_set[i].textAlign:"center") +'" '+ (data_set[i].width?'width="'+data_set[i].width + '"':'') + (data_set[i].hide?' style="display:none;"':'') +'>'+ render_data +'</td>'
                }
                tbody_htm +='</tr>'
            }
            html +='</tr></thead>'+tbody_htm+'</tbody>'
        }
        return html;
    },
    setChecked:function ($this,$ele,event) {
        if(!$(event.target).is(":checkbox")){
            $this.find(".td-checkbox :checkbox").prop("checked",!$this.find(".td-checkbox :checkbox").prop("checked"))
            if(!$this.find(".td-checkbox :checkbox").prop("checked")){
                $this.removeClass("active");
            }else {
                $this.addClass("active");
            }
        }
        this.isSelectAll($ele)
    },
    isSelectAll:function ($ele) {
        var checkbox = $("tbody :checkbox", $ele);
        $(":checkbox[name='table-check-all']", $ele).prop('checked', checkbox.length == checkbox.filter(':checked').length);
        $(":checkbox[name='table-check-all']", $ele.parents(".tabcontent").find(".dataTables_scrollHead")).prop('checked', checkbox.length == checkbox.filter(':checked').length);
    }
}

/*
 * 初始化dataTable
 * $ele table元素jq对象
 * opt 属性配置
 */
/**
 *
 * @param $ele
 * @param opt
 * @returns {*}
 */
function initTable($ele, opt) {
    $ele = $ele || $("#example");
    var del_url = $ele.data("delurl"), edit_url = $ele.data("editurl");
    var tab_opt = $.extend({},CONSTANT.DATA_TABLES.DEFAULT_OPTION);
    if ($ele.hasClass("nopage-table")) {
        $.extend(tab_opt, CONSTANT.DATA_TABLES.NOPAGE_OPTION)
    }

    var W_H = $ele.parents(".datatab").height(), default_len = 10;
    default_len = Math.floor(Math.floor(W_H / 40) / 5) * 5
    var default_opt = {
        "scrollY": ($(".datatab").height() - 40),
        "scrollCollapse": true,
        "rowId":"id",
        "pageLength":default_len,
        "dom": opt.dom,
        "searching": true,
        "paging": true,
    }
    $.extend(default_opt,tab_opt)
    $.extend(default_opt,opt)
    var oTable = $ele.dataTable(default_opt).api()

    $ele.parents(".tabcontent").on("change", ":checkbox", function (event) {
        if ($(this).is("[name='table-check-all']")) {
            //全选
            $(":checkbox", $ele).prop("checked", $(this).prop("checked"));
            if (!$(this).prop("checked")) {
                $("tr", $ele).removeClass("active");
            } else {
                $("tr", $ele).addClass("active");
            }
        } else {
            //一般复选
            var checkbox = $("tbody :checkbox", $ele);
            $(":checkbox[name='table-check-all']", $ele).prop('checked', checkbox.length == checkbox.filter(':checked').length);
            $(":checkbox[name='table-check-all']", $ele.parents(".tabcontent").find(".dataTables_scrollHead")).prop('checked', checkbox.length == checkbox.filter(':checked').length);
        }
        event.stopPropagation()
    }).on("click", ".td-checkbox", function (event) {
        //点击单元格即点击复选框
        !$(event.target).is(":checkbox") && $(":checkbox", this).trigger("click");
    }).on("click", ".js-info-row", function () {
        //点击查看按钮
        var myrow = oTable.row($(this).closest('tr'))
        var item = myrow.data();
        var opt_model = {};
        var content = $(this).parents(".js-table").find(".js-add-row").data("model");
        var detail_htm = '<div class="layer-model" id="' + content + '-detail">' +
            '<div class="layer-modelwrap">' +
            '<div class="row">' +
            '<div class="profile-user-info profile-user-info-striped">' +
            '</div>' +
            '</div>' +
            '</div>'
        '</div>';
        $("body").append(detail_htm)
        opt_model.content = content + "-detail";
        opt_model.full = $(this).parents(".js-table").find(".js-add-row").data("full") || "";
        opt_model.title = "查看";
        opt_model.hideBtn = true;
        var param = {
            id: myrow.id(),
            edit_url: edit_url,
            ele: content,
            setting: opt.detailRow || {}
        }
        var fg_l = 120
        if (content) fg_l = fg_l + $("#" + content).find(".form-group").length * 32;
        opt_model.area = ["600px", fg_l + "px"]

        openModel(opt_model, tableFun.showItemDetail, param)
    }).on("click", ".js-edit-row", function () {
        //点击编辑按钮
        var myrow = oTable.row($(this).closest('tr'))
        var item = myrow.data();
        tableFun.editItem(myrow.id(), edit_url)
    }).on("click", ".js-del-row", function () {
        //点击删除按钮
        var myrow = oTable.row($(this).closest('tr'))
        var item = myrow.data();
        tableFun.deleteItem(oTable, myrow.id(), del_url);
    }).on("click", "tr", function (event) {
        !$(event.target).is(":checkbox") && !$(event.target).is(".td-checkbox") && !$(event.target).is(".action-buttons *") && $(":checkbox", this).trigger("click")
    });

    return oTable;
}

/*
 * layer弹出层相关方法
 *
 */
function setModel(opt, successfun, params) {
    var option = $.extend(true, {}, opt);
    var form_id = '',isOriginal = false
    if(opt.isold) isOriginal = true
    if(opt.type != 2){
        if(opt.content && !isOriginal){
            option.content = $("#" + opt.content);
            if($("#" + opt.content + " form") && $("#" + opt.content + " form").length){
                form_id = $("#" + opt.content + " form").attr("id")
            }
        }
    }else {
        option.content = opt.content
    }

    //是否全屏打开 默认为否
    if (opt.full != true) {
        option.full = false
    }

    //根据size值来设置弹出框的大小
    if (opt.size) {
        var h_width = $("html").width(); // html的宽度 即iframe的宽度
        var h_height = $("html").height(); // html的高度 即iframe的高度
        var reg = /^[0-9]+.?[0-9]*$/, m_w = 0, m_h = 0; //判断是否是数字

        //如果是数字 则根据长度设置高度 默认每一行高度为55
        if (reg.test(parseInt(opt.size)) && !(opt.size instanceof Array)) {
            if (parseInt(opt.size) > 8) {
                m_h = 55 * parseInt(opt.size) * 0.5 + 180;
                m_w = h_width * 0.7
            } else {
                m_h = 50 * parseInt(opt.size) + 180;
                m_w = 600
            }
            option.size = "num"
        }

        if (form_id) {
            $("#" + form_id).find("textarea").each(function () {
                m_h = m_h + 40;
            })
        }

        if (m_h >= h_height) {
            m_h = h_height
        }

        switch (option.size) {
            case "xs"://如果是选择树结构弹出框 则展示最小的弹出框
                option.area = ["300px", "450px"];
                break;
            case "sm"://如果表单条数较少 则选择中等表单弹出框
                option.area = [h_width * 0.5 + "px", h_height * 0.5 + "px"];
                break;
            case "num"://如果表单条数较少 则选择中等表单弹出框
                option.area = [m_w + "px", m_h + "px"];
                break;
            case "md"://如果表单条数较多 则选择较大表单弹出框
                option.area = [h_width * 0.7 + "px", h_height * 0.6 + "px"];
                break;
            default:
                option.area = opt.size;
        }
    }

    //判断弹出框内容是否为页面
    if (opt.content && opt.type == 2) {
        if (opt.content.indexOf("http") == 0) {
            option.content = opt.content
        } else {
            option.content = opt.content
        }
    }

    //判断是否展示按钮
    if (!opt.hideBtn) {
        option.btn = opt.btn || ['确定', '取消']
        option.yes = opt.yes || function (index, layero) {
            //确定的回调
            if (successfun) {
                if (params && params.length) {
                    switch (params.length) {
                        case 1:
                            successfun(params[0]);
                            break;
                        case 2:
                            successfun(params[0], params[1]);
                            break;
                    }

                } else {
                    successfun();
                }
            }
        }
    }

    return $.extend({}, CONSTANT.LAYER_MODEL.DEFAULT_OPTION, option)

}
function openModel(opt, successfun, params) {
    var form_id = ''
    //判断是否使用原有content配置
    if(!opt.isold && opt.content && opt.type != 2){
        if(("#" + opt.content + " form") && ("#" + opt.content + " form").length){
            form_id = $("#" + opt.content + " form").attr("id")
        }
    }
    if (form_id && !opt.handClear) formReset("#" + form_id);
    var layer_key = opt.content;

    var index = layer.open(setModel(opt, successfun, params));
    if (opt.full) {
        layer.full(index);
    }
    if (opt.isClose) {
        window[layer_key] = index
    }

    //如果有回调 调用回调
    if (successfun && opt.hideBtn) {
        if (params) {
            successfun(params);
        } else {
            successfun();
        }
    }

}
function layerModel(opt, callback, param) {
    var form_id = opt.content && opt.type != 2 ? $("#" + opt.content + " form").attr("id") : "";
    if (form_id && !opt.handClear) formReset("#" + form_id);
    var layer_key = opt.content;

    opt.hideBtn = true;
    var index = layer.open(setModel(opt,{}, param));
    if (opt.full) {
        layer.full(index);
    }
    if (layer_key == "depttree-block") {
        window[layer_key] = index
    }
    //如果有回调 调用回调
    if (callback) {
        if (param) {
            callback(param.id, param.edit_url, param.ele,param.setting);
        } else {
            callback();
        }
    }
}
/*
 *用于表单回显
 * data类型是数组、对象或者json
 */
function showFormEdit(data) {
    if (data) {
        var field_type = '';
        for (var i in data) {
            field_type = $("[name='" + i + "']").attr("type");
            if ($("[name='" + i + "']").hasClass("date-picker")) {
                field_type = "date";
            }
            if (!field_type && $("[name='" + i + "']").length) {
                field_type = $("[name='" + i + "']")[0].tagName.toLowerCase();
            }
            switch (field_type) {
                case "radio":
                    $("[name='" + i + "'][value=" + data[i] + "]").prop("checked", "checked");
                    break;
                case "checkbox":
                    if (data[i].indexOf(",") > -1) {
                        var checkbox_arr = data[i].split(",")
                        for (var j in checkbox_arr) {
                            $("[name='" + i + "'][value=" + checkbox_arr[j] + "]").prop("checked", "checked");
                        }
                    } else {
                        $("[name='" + i + "'][value=" + data[i] + "]").prop("checked", "checked");
                    }
                    break;
                case "select":
                    if ($("[name='" + i + "']").hasClass("chosen-select") && data[i]) {
                        var temp_arr = []
                        for (var user in data[i]){
                            if(data[i][user].roleid){
                                temp_arr.push(data[i][user].roleid)
                            }else{
                                temp_arr.push(data[i][user][0])
                            }
                        }
                        $("[name='" + i + "']").val(temp_arr)
                        $("[name='" + i + "']").trigger('chosen:updated');
                    }else{
                        $("[name='" + i + "']").val(data[i]);
                    }
                    break;
                case "date":
                    if (data[i]) {
                        $("[name='" + i + "']").val(dateFormat(data[i]));
                    }
                    break;
                default:
                    $("[name='" + i + "']").val(data[i]);
            }

        }

    } else {
        return false;
    }
}

/*
 * 用于展示表格详情
 */
function showFormDetail(data, ele,setting) {
    if(!setting) setting = {}
    if (data) {
        var detail_htm = '', name = '', val = '';
        for (var i in data) {
            name = '';
            var field_type = '';
            var $name = $("#" + ele).find("[name='" + i + "']");
            if($name && $name.length){

                //如果不需要展示
                if(setting[i] && setting[i].isHidden) continue;

                //根据name获得该元素的type类型
                field_type = $name.attr("type");

                //若为日期格式
                if ($name.hasClass("date-picker")) {
                    field_type = "date";
                }
                //如果不是input类型 则获取元素标签名
                if (!field_type) {
                    field_type = $("[name='" + i + "']")[0].tagName.toLowerCase();
                }

                //获得名称
                name = $name.parents(".form-group").find("label.control-label").text().replace("*", "");

                //如果有自定义名字
                if(setting[i] && setting[i].name) name = setting[i].name

                //根据type类型或者标签名称来获取对应的值
                switch (field_type) {
                    case "hidden":
                        val = data[i];
                        break;
                    case "radio":
                        val = $("#" + ele).find("[name='" + i + "'][value=" + data[i] + "]").siblings("span.lbl").text();
                        break;
                    case "checkbox":
                        if (data[i].indexOf(",") > -1) {
                            var checkbox_arr = data[i].split(",")
                            for (var j in checkbox_arr) {
                                val = val ? val + "," : val;
                                val += $("#" + ele).find("[name='" + i + "'][value=" + checkbox_arr[j] + "]").siblings("span.lbl").text();
                            }
                        } else {
                            val = $("#" + ele).find("[name='" + i + "'][value=" + data[i] + "]").siblings("span.lbl").text();
                        }
                        break;
                    case "select":
                        if ($("[name='" + i + "']").hasClass("chosen-select") && data[i]) {
                            var temp = ''
                            for (var user in data[i]){
                                if(temp) temp+= ","
                                temp +=data[i][user].rolename
                            }
                            val = temp;
                        }else{
                            val = $("#" + ele).find("[name='" + i + "'][value=" + data[i] + "]").text();
                        }
                        break;
                    case "date":
                        if (data[i]) {
                            val = dateFormat(data[i]);
                        }
                        break;
                    default:
                        val = data[i];
                }

                //设置一行
                if (name) {
                    detail_htm += '<div class="profile-info-row">' +
                        '<div class="profile-info-name">' + name + '</div>' +
                        '<div class="profile-info-value">' +
                        '<span class="editable" id="username">' + (val ? val : "") + '</span>' +
                        '</div>' +
                        '</div>';
                }

            }else{
                continue
            }
        }

        $("#" + ele + "-detail").find(".profile-user-info").html(detail_htm);

    } else {
        return false;
    }
}

//重置表单
function formReset(form, flag) {
    $(".has-error").removeClass("has-error");
    var $form = $(form);
    if (flag) $form = form
    $form.find('input[type=text],select,input[type=hidden],textarea').each(function () {
        $(this).val('');
    });
    $form.find('input[type=checkbox]').each(function () {
        $(this).attr("checked", false);
    });
    $form.find(".chosen-select").each(function () {
        $(this).val("");
        $(this).trigger('chosen:updated');
    })

}

//返回layer弹出层的配置对象
function layerOpt(ele) {
    var opt = {
        "content": ele.data("model") || '',
        "title": ele.text() || '操作',
        "full": ele.data("full") == true ? true : false,
    };
    return opt;
}

/*
 * 特有表单元素初始化 如：下拉框 日期插件
 */
function initForm() {
    //带搜索下拉框初始化
    if ($(".chosen-select") && $(".chosen-select").length) {
        $(".chosen-select").chosen({
            width: "100%"
        });
    }

    //日期初始化
    if ($('.date-picker') && $('.date-picker').length) {
        $('.date-picker').datepicker({
            autoclose: true,
            language: 'cn',
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    }

    //日期范围初始化
    if ($('.date-range-picker') && $('.date-range-picker').length) {
        $('.date-range-picker').daterangepicker({}).prev().on(ace.click_event, function () {
            $(this).next().focus();
        });
    }

    //时间格式化
    if ($('.timepicker') && $('.timepicker').length) {
        $('.timepicker').timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: false
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
    }

}

/*
 * wangEditor富文本编辑器 初始化
 * editor_id 编辑器id
 * $text 如果绑定到textarea上需要传textarea的jq对象 默认是绑定到div上
 */
function initEditor(editor_id, $text) {
    var E = window.wangEditor

    var editor = new E(editor_id)
    editor.customConfig.lang = {
        '设置标题': 'title',
        '正文': 'p',
        '链接文字': 'link text',
        '链接': 'link',
        '上传图片': 'upload image',
        '上传': 'upload',
        '创建': 'init'
    }
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    // 配置服务器端地址
    //editor.customConfig.uploadImgServer = '/upload'

    editor.customConfig.onchange = function (html) {
        // 监控变化，同步更新到 textarea
        if (!$(html).text()) html = '';
        if ($text) $text.val(html)
    }
    editor.create()

    //if($text && editor.txt.text()) $text.val(editor.txt.html())

    if ($text) editor.txt.html($text.val())

    return editor;
}


/*
 * 树相关的操作方法
 */
function beforeClick(treeId, treeNode) {
    if (treeNode.level == 0) {
        var zTree = $.fn.zTree.getZTreeObj(treeId);
        zTree.expandNode(treeNode);
        return false;
    }
    return true;
}

function treeCheck(e, treeId, treeNode, fun_param) {
    var zTree = $.fn.zTree.getZTreeObj(treeId),
        nodes = zTree.getCheckedNodes(true);
    return getSelectNodes(nodes, fun_param);
}
//树点击事件返回
function treeClcik(e, treeId, treeNode, fun_param) {
    var zTree = $.fn.zTree.getZTreeObj(treeId),
        nodes = zTree.getSelectedNodes();
    return getSelectNodes(nodes, fun_param);
}

/*
 *获得选择的节点信息
 * 返回一个对象
 * {v_ids：用‘,’逗号隔开的id字符串, v:用‘;’分号隔开的（id,name）字符串, v_arr: 返回{id:id,name:name}作为元素的数组}
 */
function getSelectNodes(nodes, fun_param) {
    var v = "",
        v_ids = "",
        v_name = "",
        v_arr = [],
        name = 'name';
    if (fun_param && fun_param.name) name = fun_param.name

    for (var i = 0, l = nodes.length; i < l; i++) {
        //console.log(nodes);
        if (v) v = v + ";"
        if (v_ids) v_ids = v_ids + ","
        if (v_name) v_name = v_name + ","
        v_ids += nodes[i].id
        v_name += nodes[i][name]
        v += nodes[i].id + "," + nodes[i][name];
        v_arr[i] = {};
        v_arr[i].id = nodes[i].id;
        v_arr[i].name = nodes[i][name];

    }
    return {
        v_ids: v_ids,
        v_name: v_name,
        v: v,
        v_arr: v_arr,
    };
}

/*
 * 菜单型分类展示列表
 * ele 菜单渲染容器jq对象
 * data 数据源 数组
 * key 键值 默认为name
 */
function fileUlList(ele, data, key) {
    var li_htm = '';
    var key_temp;
    if (!key) {
        key_temp = {
            id: "id",
            name: "name"
        }
    }
    if (data && data.length) {
        for (var i = 0; i < data.length; i++) {
            li_htm += '<li class="ui-menu-item" data-id="' + ((key && key.id) ? data[i][key.id] : data[i][key_temp.id]) + '"><a href="javascript:;">' + ((key && key.name) ? data[i][key.name] : data[i][key_temp.name]) + '</a></li>'
        }
        ele.html(li_htm);
        //ele.menu();
    }
}

/*
 * 人员选择弹出框 人员表格复选框选择后回调方法
 *
 */
function treeUserCkecked(ele, id, flag, v_obj) {
    var userids = ele.find("[name=userids]").val();
    var id_arr = [], user_arr = [];
    if (id.indexOf(",") > -1) {
        id_arr = id.split(",");
    } else if (id) {
        id_arr.push(id);
    }

    if (userids.indexOf(",") > -1) {
        user_arr = userids.split(",");
    } else if (userids) {
        user_arr.push(userids);
    }

    for (var i = 0; i < id_arr.length; i++) {
        //加入id
        if (user_arr.indexOf(id_arr[i]) == -1 && !flag) {
            user_arr.push(id_arr[i])
            ele.find(".usercon").append('<span class="label" style="margin: 2px 3px;" data-id="'+ id_arr[i] +'">'+ v_obj[id_arr[i]] +'</span>')
        }
        //删除id
        if (user_arr.indexOf(id_arr[i]) > -1 && flag) {
            user_arr.splice(user_arr.indexOf(id_arr[i]), 1)
            ele.find(".usercon span[data-id='"+ id_arr[i] +"']").remove();
        }
    }
    if (user_arr.length) {
        if (user_arr.length > 1) {
            userids = user_arr.join(",")
        } else {
            userids = user_arr[0]
        }
    } else {
        userids = ''
    }
    ele.find("[name=userids]").val(userids);
}

/*
 * 获取地址栏参数
 * name 必传 参数名称
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/*
 * 格式化日期
 * str 日期字符串
 * formatStr 时间格式 'yyy-MM-dd HH:mm:ss'
 * 几种常用格式formatStr只需传类型标识 date 日期('yyyy-MM-dd') 中文日期('yyyy年MM月dd日') 带时分秒的日期('yyy-MM-dd HH:mm:ss')
 */
function dateFormat(str, formatStr) {
    var d = new Date(str.replace(/-/g,'/').replace(/T|Z/g,' ').replace(/\.000\+0800/g,'').trim());
    switch (formatStr) {
        case "date":
            formatStr = 'yyyy-MM-dd';
            break;
        case "datech":
            formatStr = 'yyyy年MM月dd日';
            break;
        case "datetime":
            formatStr = 'yyyy-MM-dd HH:mm:ss'
            break;
    }
    if (!formatStr) {
        formatStr = 'yyyy-MM-dd';
    }
    return d.format(formatStr);
}
//设置树表格表头宽
function setTreeHead() {
    if($(".treetable")[0].scrollHeight > $(".treetable").height()){
        var scrollWidth = $(".treetable")[0].offsetWidth - $(".treetable")[0].scrollWidth
        $(".tree-datatab li.head").width($(".treetable").width()-scrollWidth)
    }
}
Date.prototype.format = function (formatStr) {
    var date = this;
    /*
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return date.getDate();
            case 'dd':
                return zeroize(date.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return zeroize(date.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy':
                return new String(date.getFullYear()).substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return zeroize(date.getHours() % 12 || 12);
            case 'H':
                return date.getHours();
            case 'HH':
                return zeroize(date.getHours());
            case 'm':
                return date.getMinutes();
            case 'mm':
                return zeroize(date.getMinutes());
            case 's':
                return date.getSeconds();
            case 'ss':
                return zeroize(date.getSeconds());
            case 'l':
                return date.getMilliseconds();
            case 'll':
                return zeroize(date.getMilliseconds());
            case 'tt':
                return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return date.getHours() < 12 ? 'AM' : 'PM';
        }
    });
}

//表单提交验证简单封装
$.fn.formValidate = function (options) {
    var _that = $(this);
    //时间验证
    jQuery.validator.addMethod("isValid", function (value, element) {
        var date = new Date();
        var newDay = date.getYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return value&&value < newDay;

    },"日期");
    // 手机号验证
    jQuery.validator.addMethod("isphoneNum", function (value, element) {
        var length = value.length;
        var mobile = /^1[3|5|8]{1}[0-9]{9}$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号");

    var submitHandler = function (form) {
        if (options.submit) {
            options.submit(form);
        }
    }
    if (options.submitHandler) {
        submitHandler = options.submitHandler
    }

    var validform = function () {
        return _that.validate({
            errorElement: 'div',
            errorClass: 'help-block',
            focusInvalid: true,
            onkeyup: function (element) {
                $(element).valid();
            },
            rules: options.rules,
            messages: options.messages,
            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },
            highlight: function (e) {
                $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
            },
            success: function (e) {
                $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
                $(e).remove();
            },
            errorPlacement: function (error, element) {
                if (element.is(':checkbox') || element.is(':radio')) {
                    var controls = element.closest('div[class*="col-"]');
                    if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                    else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                } else if (element.is('.select2')) {
                    error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                } else if (element.is('.chosen-select')) {
                    error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                } else error.appendTo(element.parents(".form-group"));
            },
            invalidHandler: function (form) {
            }
        })
    }
    $(validform())

    if (validform().form()) {
        submitHandler()
    }

    $(".js-add-row,.js-edit-row,.js-clear-valid").click(function () {
        $(".has-error").removeClass("has-error");
        validform().resetForm();
        formReset(_that, 1)
    })

    return validform;

}
/**
 * 上传文件简单封装
 * @param options
 * dropzone = Dropzone.forElement(".dropzone") 获得dropzone对象
 * dropzone.removeAllFiles() 文件删除
 * var proFile = { name: row_data.files[i].name, //需要显示给用户的图片名 type: '.jpg,.png,.jpeg,.docx,.doc'//图片文件类型};
 * dropzone.addFile.call(dropzone, proFile);//添加mock图片到显示区域
 * dropzone.options.thumbnail.call(dropzone, proFile, row_data.files[i].url);//添加数据源给mock图片
 * dropzone.on("complete", function (file) {});
 * dropzone.on("success", function (file, response) {})
 */
$.fn.myDropzone = function (options) {
    Dropzone.autoDiscover = false;
    var _that = $(this);
    var default_option = {
        url:APIHOST + 'project/upload',
        paramName: "file", // 文件名 默认为file
        maxFilesize: 0.4, // MB

        addRemoveLinks : true,
        dictDefaultMessage :'<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传文件</span> 也可将文件拖拽至此处 <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
        dictResponseError: '上传失败!',

        //上传预览图
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">"+
        "<div class=\"dz-details\">"+
        "<div class=\"dz-filename\"><span data-dz-name></span></div>"+
        "<div class=\"dz-size\" data-dz-size></div>"+
        "<img data-dz-thumbnail />"+
        "</div>"+
        "<div class=\"progress progress-small progress-striped active\">"+
        "<div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div>"+
        "</div>"+
        "<div class=\"dz-success-mark\"><span></span></div>"+
        "<div class=\"dz-error-mark\"><span></span></div>"+
        "<div class=\"dz-error-message\"><span data-dz-errormessage></span></div>"+
        "</div>",
        dictRemoveFile:"移除",
        dictInvalidInputType:"不支持该文件",
        dictFileTooBig:"文件过大",
        dictCancelUploadConfirmation:"取消",
        dictCancelUpload:"取消",
    }
    $.extend(default_option,options)
    return  _that.dropzone(default_option);
    /*try {
    } catch(e) {
       // alert('浏览器版本太低!');
    }*/
}
/**
 * 工具类方法
 */
var util = {
    //字符串操作
    tmStr:{
        /**
         * 字符串转数组
         * @param str 字符串
         * @param character 分割字符
         * @returns {*} 返回数组
         */
        strToArray: function (str,character) {
            if(str.indexOf(character) != -1){
                return str.split(character)
            }
            return [str]
        }
    }
}
/**
 * ajax文件上传
 * @param uploadopt 上传配置
 * uploadopt{
 *      paramName："文件input名",
 *      url:"上传地址",
 *      success:function(){成功回调},
 *      error:function(){失败回调},
 * }
 */
var uploadFile = function(uploadopt) {
    var formData = new FormData();
    //默认配置
    var default_opt = {
        paramName: "file",
        url: APIHOST + 'upload/fileupload',
        autoupload:true,
        success:function (data) {

        },
        error:function () {
            layer.msg("上传失败！");
        },
        removeFile:function () {

        }
    };
    $.extend(default_opt,uploadopt)
    var $ele = $('#'+ default_opt.paramName).parents(".files-input-group")
    /**
     * 初始化
     */
    this.init = function () {
        var that = this
        this.setFile()
        if(default_opt.autoupload){
            this.submit()
        }
        $ele.on("click",".js_removefile",function () {
            that.removeFile($(this).parents("li"))
        })
    }
    /**
     * 设置formdata对象
     */
    this.setFile = function () {
        if(default_opt.autoupload){
            formData.append("file", document.getElementById(default_opt.paramName).files[0]);
        }else{
            formData.append("file[]", document.getElementById(default_opt.paramName).files);
        }
    }
    /**
     * 回显文件
     * @param filename 文件名称
     * @param filepath 文件路径
     * @param callback($ele) 回调方法 $ele 当前一行元素对象
     */
    this.showUploadFile = function (filename,filepath,callback) {
        var li_htm ='<li>'+
                        '<div class="filename">'+ filename +'</div>'+
                        '<a class="filepath filesbtn" href="'+ filepath +'" target="_blank"><i class="ace-icon fa fa-download bigger-110"></i>下载</a>'+
                        '<a class="filesbtn js_removefile" href="javascript:;"><i class="ace-icon fa fa-trash-alt"></i>移除</a>'+
                    '</li>';
        $ele.find(".fileslist").append(li_htm)
        if(callback){
            callback($ele.find(".fileslist li:last-child"))
        }
    }
    /**
     * 创建文件操作按钮
     * @param btnopt 按钮配置
     * @returns {string} 返回按钮html
     */
    this.createOptBtn = function (btnopt) {
        //默认按钮配置
        var default_btn = {
            aClass:"",
            aHref:"javascript:;",
            icon:"",
            title:"操作"
        }
        $.extend(default_btn,btnopt)
        return btn_htm = '<a class="filesbtn '+ default_btn.aClass +
            '" href="'+default_btn.aHref +'">'+
            (default_btn.icon?'<i class="ace-icon fa '+ default_btn.icon +'"></i>':'') +
            default_btn.title + '</a>';
    }
    /**
     * 移除文件
     * @param $li 当前文件行元素对象
     */
    this.removeFile = function ($li) {
        $li.remove()
        if(default_opt.removeFile) default_opt.removeFile()
    }
    /**
     * 清除文件列表
     */
    this.clear = function () {
        $ele.find(".fileslist").html("")
    }
    /**
     * 获得所有已上传文件
     * @returns {Array} 返回文件数组[{filename:"文件名",filepath:"文件路径"}]
     */
    this.getUploadFiles = function () {
        var files = []
        $ele.find(".fileslist li").each(function () {
            var file = {
                filename:$(this).find(".filename").html(),
                filepath:$(this).find(".filepath").attr("href")
            }
            files.push(file);
        })
        return files;
    }
    /**
     * 文件上传
     */
    this.submit = function () {
        $.ajax({
            url: default_opt.url,
            type: "POST",
            data: formData,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            success: default_opt.success,
            error:default_opt.error
        });
    }
}

/**
 * 树表格 节点类
 * @param Node 树节点
 * @param Tree 树对象
 * @constructor
 */
var MyNode = function (Node, Tree) {
    var $ele = $("#" + Node.tId + "_a");
    this.bind = function (key, fnc) {

    }
    /**
     * 节点删除
     */
    this.delete = function () {
        Tree.getZTree().removeNode(Node);
    }
    /**
     * 树节点更新
     */
    this.update = function () {
        Tree.getZTree().updateNode(Node);
    }
    /**
     * 获得节点
     * @returns {*} 节点对象
     */
    this.getNode = function () {
        return Node;
    }
    /**
     * 通过节点tId获得节点对象
     * @returns {*} 节点对象
     */
    this.getNodeByTId = function () {
        return Tree.getZTree().getNodeByTId(Node.tId)
    }
    /**
     * 获得节点树对象
     * @returns {jQuery|HTMLElement} 树对象元素
     */
    this.getEle = function () {
        return $ele;
    }
    /**
     * 更新节点信息
     * @param cols 节点对象
     */
    this.updateNode = function (cols) {
        var node_id = Node.tId;
        for (var i in  cols.data) {
            if (!cols.key && cols.data[i].data) {
                var render_htm = ''
                var data_name = cols.data[i].data; //节点对象键值
                //如果键值列存在渲染回调函数，则应用键值对应列回调渲染
                if(cols.data[i].render){
                    render_htm = cols.data[i].render(Node[cols.data[i].data]);
                }
                //若不存在回调渲染，则默认使用以下渲染
                if(cols.data[i].data && !cols.data[i].render){
                    //判断键值是否为一个对象
                    if(cols.data[i].data.indexOf(".")>0){
                        data_name = data_name.replace(".","_")
                        var data_arr = cols.data[i].data.split(".")
                        render_htm = Node[data_arr[0]]
                        for (var index=1; index<data_arr.length; index++){
                            render_htm = render_htm[data_arr[index]]
                        }
                    }else{
                        render_htm = Node[cols.data[i].data]
                    }
                }
                //将回调渲染的html写入到具体的列中
                $("#" + node_id).find("[data-name=" + data_name + "]").html(render_htm)
            }
        }
    }
    /**
     * 节点样式渲染 表格型树
     * @param cols 节点对象
     */
    this.renderNode = function (cols) {
        var spaceWidth = 15; //相邻层级之间间距，单位px
        var liObj = $("#" + Node.tId); //默认节点元素
        var aObj = $("#" + Node.tId + "_a"); //默认节点a元素
        var switchObj = $("#" + Node.tId + "_switch"); //默认节点切换图标元素
        var icoObj = $("#" + Node.tId + "_ico"); //默认图标元素
        var spanObj = $("#" + Node.tId + "_span"); //
        var checkObj = $("#" + Node.tId + "_check"); //默认选择框元素
        var editStr = ''; //节点列元素
        var key_col = '', opt_col = '',check_col = ''; //主键列，操作列，选择框列
        //宽度需要和表头保持一致 循环节点列
        for (var i in  cols.data) {
            var render_htm = ''
            //如果节点列存在回调渲染
            if(cols.data[i].render){
                render_htm = cols.data[i].render(Node[cols.data[i].data]);
            }
            //判断是否特别设置节点主键
            if ((i > 0 && !cols.key) || (cols.key && (cols.key != cols.data[i].data))) {
                //如果是操作列，加入divTopt标识类名
                if (cols.data[i].optCol) opt_col = 'divTopt'
                //如果是选择框列
                if(cols.data[i].checkCol) {
                    check_col = '<div class="' + (cols.data[i].class ? cols.data[i].class : cols.divClass) + ' divTcheck" style="width:' + (cols.data[i].width ? cols.data[i].width : (100 / cols.data.length + "100%")) + ';text-align: ' + (cols.data[i].textAlign ? cols.data[i].textAlign : "center") + '"></div>'
                }else {
                    var data_name = cols.data[i].data;
                    if(cols.data[i].data && !cols.data[i].render){
                        //判断键值是否为对象
                        if(cols.data[i].data.indexOf(".")>0){
                            data_name = data_name.replace(".","_")
                            var data_arr = cols.data[i].data.split(".")
                            render_htm = Node[data_arr[0]]
                            for (var index=1; index<data_arr.length; index++){
                                render_htm = render_htm[data_arr[index]]
                            }
                        }else{
                            render_htm = Node[cols.data[i].data]
                        }
                    }
                    if(opt_col && !cols.data[i].render){
                        render_htm = '<div class="action-buttons"></div>'
                    }
                    editStr += '<div data-name="' + data_name +
                        '" class="' + (cols.data[i].class ? cols.data[i].class : cols.divClass) + ' ' + opt_col + '" ' +
                        'style="width: ' + (cols.data[i].width ? cols.data[i].width : (100 / cols.data.length + "100%")) +
                        ';text-align: ' + (cols.data[i].textAlign ? cols.data[i].textAlign : "center") + '">' +
                        render_htm + '</div>';
                }
            } else {
                key_col = '<div class="' + (cols.data[i].class ? cols.data[i].class : cols.divClass) + ' swich divTkey fnt" style="width:' + (cols.data[i].width ? cols.data[i].width : (100 / cols.data.length + "100%")) + ';text-align: ' + (cols.data[i].textAlign ? cols.data[i].textAlign : "center") + '"></div>'
            }
        }

        aObj.attr('title', '');
        aObj.append(check_col);
        aObj.append(key_col);
        var div = $(liObj).find('div.divTkey').eq(0);
        var div_check = $(liObj).find('div.divTcheck').eq(0);
        //从默认的位置移除
        switchObj.remove();
        spanObj.remove();
        icoObj.remove();
        checkObj.remove();
        //在指定的div中添加
        div.append(switchObj);
        div.append(spanObj);
        div_check.append(checkObj);
        //隐藏了层次的span
        var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * Node.level) + "px'></span>";
        switchObj.before(spaceStr);
        //图标垂直居中
        switchObj.after(icoObj);

        $ele.append(editStr);
    }
    /**
     * 节点样式渲染 菜单型树
     * @param cols 节点对象
     */
    this.renderNode1 = function(cols){
        var spaceWidth = 10;
        var switchObj = $("#" + Node.tId + "_switch"),
            icoObj = $("#" + Node.tId + "_ico");
        switchObj.remove();
        icoObj.before(switchObj);

        if(Node.level > 1) {
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * Node.level) + "px'></span>";
            switchObj.before(spaceStr);
        }
    }
    /**
     * 设置操作列中的操作按钮
     * @param opt 操作按钮对象
     * opt{
     *      aClass："a元素类名",
     *      aHref:"a连接地址，默认#",
     *      icon:"按钮图标样式类名",
     *      name:"按钮名称",
     *      callback:"点击按钮回调函数",
     * }
     */
    this.setOpt = function (opt) {
        for (var j in opt) {
            var opt_one = opt[j];
            var $opt = $('<a class="' + (opt_one.aClass ? opt_one.aClass : "blue") + '" href="' + (opt_one.aHref ? opt_one.aHref : "#") + '" title="' + opt_one.name + '">' +
                '<i class="' + (opt_one.icon ? opt_one.icon : "fa-edit") + ' bigger-130"></i>' +
                '</a>');
            $ele.find('div.divTopt .action-buttons').eq(0).append($opt);
            if (opt_one.callback) {
                var that = this;
                (function (opt_one) {
                    $opt.click(function () {
                        opt_one.callback.call(that);
                    });
                })(opt_one)
            }
        }
    }

}
/**
 * 树类
 * @param $ele 树渲染元素jq对象
 * @param setting 树源配置
 * @param data 树数据源 如果不是异步 则传入data数据
 * @constructor
 */
var Tree = function ($ele, setting, data) {
    var zTree = null;
    var MyNodes = {};
    var setNodeHtmlCallback;
    //cols表头数据格式
    var cols = {
        liClass: "head",
        divClass: "divTd",
        aClass: "",
        data: [],
        viewType:0,//默认0 树表格 1 菜单树 2 普通树
    }
    /**
     * 设置树表格表头
     * @param colsopt 列配置
     * colsopt{
     *      data:{
     *          data:"键值",
     *          class:"列类名",
     *          width:"列宽",
     *      }
     *      divClass:"列类名默认",
     *      liClass:"li类名",
     *      aClass:"a类名",
     * }
     */
    this.setHeader = function (colsopt) {
        var col_data = ''
        for (var i in  cols.data) {
            col_data += '<div class="' + (cols.data[i].class ? cols.data[i].class : cols.divClass) + '" style="width: ' + (cols.data[i].width ? cols.data[i].width : (100 / cols.data.length + "100%")) + '">' + (cols.data[i].name?cols.data[i].name:"") + '</div>'
        }
        var li_head = ' <li class="' + cols.liClass + '"><a class="' + cols.aClass + '">' + col_data + '</a></li>';
        var rows = $ele.find('li');
        if (rows.length > 0) {
            rows.eq(0).before(li_head)
        } else {
            $ele.append(li_head);
            //$ele.append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
        }
    }
    /**
     * 通过树节点对象获得MyNode类对象
     * @param Node 节点对象
     * @returns {*|MyNode} MyNode类对象
     */
    this.getMyNodeByNode = function (Node) {
        if (MyNodes[Node.tId]) {
            var rs = MyNodes[Node.tId];
        } else {
            var rs = new MyNode(Node, this);
            MyNodes[Node.tId] = rs;
        }
        return rs;
    }
    /**
     * 设置表格行操作按钮及特殊树配置
     * @param opt 参数配置
     */
    this.setOpt = function (opt) {
        //如果是需要自定义样式的树
        if (!setting.view && cols.viewType != 2) {
            setting.view = {};
        }
        var that = this;
        if(cols.viewType != 2){
            setting.view.addDiyDom = function (treeId, treeNode) {
                var MyNode = that.getMyNodeByNode(treeNode);
                //根据viewType类型来选择具体的节点渲染方法
                switch (cols.viewType){
                    case 1:
                        MyNode.renderNode1(cols); // 菜单型树
                        break;
                    default:
                        MyNode.renderNode(cols); //表格树
                }
                MyNode.setOpt(opt);
                //如果有行回调，则调用行回调
                if (setNodeHtmlCallback) {
                    setNodeHtmlCallback.call(MyNode);
                }
            };
        }

    }
    /**
     * 通过更新节点更新树 主要针对编辑和删除操作
     * @param node 节点对象
     */
    this.updateTree = function (node) {
        var current_node = new MyNode(node, this);
        current_node.update(node); //更新节点
        current_node.updateNode(cols); //更新节点渲染
    }
    /**
     * 树刷新
     */
    this.refresh = function () {
        zTree.refresh();
    }
    /**
     * 获得当前ztree树对象
     * @returns {*} 树对象
     */
    this.getZTree = function () {
        return zTree;
    }
    /**
     * 创建树
     */
    this.build = function () {
        if (data) {
            zTree = $.fn.zTree.init($ele, setting, data);
        } else {
            zTree = $.fn.zTree.init($ele, setting);
        }
        if(!cols.viewType){
            this.setHeader(cols);
        }
    }
    /**
     * 设置节点 即行数据
     * @param colsopt 行配置
     * @param callback 行回调
     */
    this.setNodeHtml = function (colsopt, callback) {
        $.extend(cols, colsopt)
        setNodeHtmlCallback = callback;
    }

}
/**
 * 选择人员方法
 */
function initSelUser(idarr, callback, initOpt) {
    var head_htm = ''
    if (initOpt && initOpt.tabHead) {
        for (var key in initOpt.tabHead) {
            var item = initOpt.tabHead[key]
            head_htm += '<th ' + (item.width ? 'width="' + item.width + '"' : '') + '>' + (item.html ? item.html : '') + '</th>'
        }
    } else {
        head_htm = '<th width="80">' +
            '<label>' +
            '<input type="checkbox" value="" class="ace" name="tab-check-all" />' +
            '<span class="lbl"></span>' +
            '</label>' +
            '</th>' +
            '<th>姓名</th>';
    }
    var lay_con = '<div class="layer-model" id="seluser-block">' +
        '<div class="layer-modelwrap">' +
        '<input type="hidden" name="userids" value="">' +
        '<div class="layer-btn"><p class="usercon"></p><a class="btn btn-success btn-xs js-save-user">确定</a></div>' +
        '<div class="row"  style="height: 330px;">' +
        '<div class="col-sm-4">' +
        '<ul id="user-depttree" class="ztree"></ul>' +
        '</div>' +
        '<div class="col-sm-8" style="height: 100%;overflow-y: auto;">' +
        '<div class="table-responsive">' +
        '<table class="table table-striped table-bordered table-hover">' +
        '<thead>' +
        '<tr>' +
        head_htm +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>'
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

    if (!$("#seluser-block").length) {
        $("body").append(lay_con);
    } else {
        $("#seluser-block").find("[name=userids]").val("")
        $("#seluser-block").find(".usercon").html("")
        $("#seluser-block").find("table tbody").html("");
    }
    if (idarr) {
        $("#seluser-block").find("[name=userids]").val(idarr)
    }
    var layer_opt = {
        title: "选择人员",
        content: "seluser-block",
        area: ['700px', '450px'],
        hideBtn: true,
    }
    if (initOpt && initOpt.layerOpt) {
        $.extend(layer_opt, initOpt.layerOpt)
    }
    openModel(layer_opt)

    var treeIdul = "user-depttree"
    var setting = {
        data: {
            key: {
                name: "deptname",
            },
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: onClick
        },
        async: {
            enable: true,
            url: CONFIG.API.userTree,
            autoParam: ["id"],
        }
    };
    var dept_tree = new Tree($("#" + treeIdul), setting)
    dept_tree.setNodeHtml({
        viewType: 2,
    });
    dept_tree.setOpt([]);
    dept_tree.build();

    function onClick(e, treeId, treeNode) {
        var zTree = dept_tree.getZTree()
        $.ajax({
            url: PORTALHOST + "user/search",
            type: "get",
            data: {
                deptid: treeNode.deptid
            },
            success: function (result) {
                var ids = $("#seluser-block").find("[name=userids]").val(),
                    ids_arr = [];
                if (ids.indexOf(",") > -1) {
                    ids_arr = ids.split(",");
                } else {
                    ids_arr.push(ids);
                }
                if (callback) {
                    callback(treeId, ids_arr, result)
                } else {
                    var tr_htm = '';
                    if (result && result.data && result.data.length) {
                        for (var i in result.data) {
                            tr_htm += '<tr class="text-center" for="check-user-' + result.data[i].id + '">' +
                                '<td>' +
                                '<label>' +
                                '<input type="checkbox" data-name="' + result.data[i].username + '" id="check-user-' + result.data[i].id + '" value="' + result.data[i].id + '" class="ace" ' + (ids_arr.indexOf(result.data[i].id + "") > -1 ? "checked" : "") + ' />' +
                                '<span class="lbl"></span>' +
                                '</label>' +
                                '</td>' +
                                '<td>' + result.data[i].username + '</td>' +
                                '</tr>'
                        }
                    } else {
                        tr_htm = '<tr>' +
                            '<td colspan=2>暂无人员</td>' +
                            '</tr>'
                    }
                    $("#" + treeId).parents(".row").find("table tbody").html(tr_htm);

                    $("#seluser-block [name=tab-check-all]").prop("checked", false)
                }
            }
        })
    }
}


$(function () {

    //表单元素插件初始化
    initForm()


    //弹出layer表单层 表格添加、编辑操作
    $("body").on("click", ".js-layer-open", function () {

        var opt = layerOpt($(this));

        //如果弹出层为iframe
        if ($(this).hasClass("js-layer-iframe")) {
            opt.type = 2;
            opt.content = $(this).data("url")
        }
        //如果设置了大小
        if ($(this).data("size")) {
            opt.size = $(this).data("size")
        }

        layerModel(opt);

        return false;
    })

    //表单重置
    $("body").on("click", "button[type=reset]", function () {
        var form_id = $(this).parents("form").attr("id");
        if (form_id) formReset("#" + form_id)
    })

    //静态表格的全选状态监听
    $("body").on("change", ".table :checkbox", function () {
        var ele = $(this).parents(".table");
        //判断是否是人员选择弹出 flag 1 时为减
        var is_seluser = false, ids = '', flag = 1, v_obj = {};
        if ($(this).parents("#seluser-block") && $(this).parents("#seluser-block").length) {
            is_seluser = true;
        }
        if ($(this).is("[name='tab-check-all']")) {
            //全选
            $(":checkbox", ele).prop("checked", $(this).prop("checked"));
            $(":checkbox", ele).each(function () {
                ids = ids ? ids + "," : ids;
                if ($(this).val()) {

                    ids += $(this).val()
                    v_obj[$(this).val()] = $(this).data("name")
                }
            })
        } else {
            //一般复选
            var checkbox = $("tbody :checkbox", ele);
            $(":checkbox[name='tab-check-all']", ele).prop('checked', checkbox.length == checkbox.filter(':checked').length);
            if ($(this).val()) {
                ids += $(this).val()
                v_obj[$(this).val()] = $(this).data("name")
            }
        }
        if ($(this).prop("checked")) {
            flag = 0
        }

        if (is_seluser) {
            treeUserCkecked($("#seluser-block"), ids, flag, v_obj)
        }
    });

    //树选择
    $(".js-sel-tree").on("click", function () {
        var that = $(this);
        var tree_url = CONFIG.API.deptTree.url;
        var treeIdul = CONFIG.API.deptTree.name;
        var opt = layerOpt(that);
        var sel_type = "radio";//选择框类型 单选或者多选
        var set = {};//合并后的setting
        opt.area = ["300px", "450px"];
        if (that.data("tree")) {
            tree_url = CONFIG.API[that.data("tree")].url;
            treeIdul = CONFIG.API[that.data("tree")].name;
            if (CONFIG.API[that.data("tree")].area) opt.area = CONFIG.API[that.data("tree")].area;
        }

        var tree_htm = '<div class="layer-model" id="' + treeIdul + '-block">' +
            '<div class="layer-modelwrap">' +
            '<input type="hidden" name="tree_ids" value="">' +
            '<input type="hidden" name="tree_names" value="">' +
            '<div class="layer-btn"><p class="usercon"></p><a class="btn btn-success btn-xs js-save-tree">确定</a></div>' +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<ul id="' + treeIdul + '" class="ztree"></ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        if (!$("#" + treeIdul + '-block').length) $("body").append(tree_htm)
        opt.content = treeIdul + '-block';
        opt.hideBtn = true;
        opt.isClose = true
        openModel(opt)
        if (that.data("checkbox")) {
            sel_type = "checkbox"
        }
        if (that.hasClass("no-check")) {
            sel_type = ''
        }
        var setting = {
            check: {
                enable: true,
                chkStyle: sel_type,
                radioType: "all"
            },
            callback: {
                onCheck: onCheck,
                onClick: onClick,
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            async: {
                enable: true,
                url: tree_url,
                autoParam: ["id"],
            }
        };
        if ((that.data("tree") && CONFIG.API[that.data("tree")].setting) || (!that.data("tree") && CONFIG.API.deptTree.setting)) {
            set = $.extend({}, setting, CONFIG.API.deptTree.setting);
            if (that.data("tree")) set = $.extend({}, setting, CONFIG.API[that.data("tree")].setting);
        } else {
            set = setting
        }
        $(document).ready(function () {
            $.fn.zTree.init($("#" + treeIdul), set);
            /*if (ids) {
             var ids_arr = ids.split(',');
             var treeObj = $.fn.zTree.getZTreeObj(treeIdul);
             for (var i = 0; i < ids_arr.length; i++) {
             var node = treeObj.getNodeByParam("id", ids_arr[i], null);
             treeObj.checkNode(node, true, true);
             }
             }*/

        });
        var fun_param = {};
        if (set.data.key && set.data.key.name) {
            fun_param.name = set.data.key.name;
        }
        function onCheck(e, treeId, treeNode) {
            var val = treeCheck(e, treeId, treeNode, fun_param)

            $("#" + treeIdul + '-block').find("[name=tree_ids]").val(val.v_ids);
            $("#" + treeIdul + '-block').find("[name=tree_names]").val(val.v_name);
            $("#" + treeIdul + '-block').find(".usercon").html(val.v_name);
        }

        function onClick(e, treeId, treeNode) {
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            treeNode.checked = !treeNode.checked;
            treeObj.updateNode(treeNode);
            onCheck(event, treeId, treeNode)
            var children = treeNode.children;
            if (children && children.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    children[i].checked = !children[i].checked;
                    treeObj.updateNode(children[0]);
                    onCheck(event, treeId, treeNode)
                }
            }
        }
    });
    //人员机构移除操作
    $("body").on("click", ".js-remove-span", function () {
        var ipt = $(this).data("id");
        var that = $(this).parents(".meet-user-tree");
        var ipt_ids = that.siblings("input[type=hidden]");
        $(this).parent(".has-remove-span").remove();
        if (ipt_ids.val()) {
            var ipt_arr = ipt_ids.val().split(";");
            ipt_arr.splice(ipt_arr.indexOf(ipt), 1)
            ipt_ids.val(ipt_arr.join(";"));
            if (!ipt_ids.val() && that.siblings(".js-sel-user").hasClass("js-sel-noticer")) {
                $(".js-send-notice").addClass("disabled");
            }
        }
    });

    //删除弹出效果
    $("body").on("click", ".js-del", function () {
        var _that = $(this);
        var id = _that.data("id");
        if (!id) {
            layer.msg("至少选择一条记录", {icon: 0, time: 1000})
            return false;
        } else {
            tableFun.deleteItem([{id: id}])
        }
    })

    //人员树选择
    $("body").on("click", ".js-sel-user", function () {
        initSelUser($(this).data("value"))

    })
    //资源选择
    $(".js-sel-resource").on("click", function () {
        var that = $(this);
        var tree_url = CONFIG.API.resourceTree.url;
        var treeIdul = CONFIG.API.resourceTree.name;
        var opt = layerOpt(that);
        var sel_type = "checkbox";//选择框类型 单选或者多选
        var set = {};//合并后的setting
        opt.area = ["300px", "450px"];
        if (that.data("tree")) {
            tree_url = CONFIG.API[that.data("tree")].url;
            treeIdul = CONFIG.API[that.data("tree")].name;
            if (CONFIG.API[that.data("tree")].area) opt.area = CONFIG.API[that.data("tree")].area;
        }
        var tree_htm = '<div class="layer-model" id="' + treeIdul + '-block">' +
            '<div class="layer-modelwrap">' +
            '<input type="hidden" name="tree_ids" value="">' +
            '<input type="hidden" name="tree_names" value="">' +
            '<div class="layer-btn"><p class="usercon"></p><a class="btn btn-success btn-xs js-save-tree">确定</a></div>' +
            '<div class="row">' +
            '<div class="col-sm-12">' +
            '<ul id="' + treeIdul + '" class="ztree"></ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        if (!$("#" + treeIdul + '-block').length) $("body").append(tree_htm)
        opt.content = treeIdul + '-block';
        opt.hideBtn = true;
        openModel(opt)
        if (that.data("checkbox")) {
            sel_type = "checkbox"
        }
        if (that.hasClass("no-check")) {
            sel_type = ''
        }
        var setting = {
            check: {
                enable: true,
                chkStyle: sel_type,
                radioType: "all"
            },
            callback: {
                onCheck: onCheck,
                onClick: onClick,
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            async: {
                enable: true,
                url: tree_url,
                autoParam: ["appid"],
            }
        };
        if ((that.data("tree") && CONFIG.API[that.data("tree")].setting) || (!that.data("tree") && CONFIG.API.resourceTree.setting)) {
            set = $.extend({}, setting, CONFIG.API.resourceTree.setting);
            if (that.data("tree")) set = $.extend({}, setting, CONFIG.API[that.data("tree")].setting);
        } else {
            set = setting
        }
        $(document).ready(function () {
            $.fn.zTree.init($("#" + treeIdul), set);
            /*if (ids) {
             var ids_arr = ids.split(',');
             var treeObj = $.fn.zTree.getZTreeObj(treeIdul);
             for (var i = 0; i < ids_arr.length; i++) {
             var node = treeObj.getNodeByParam("id", ids_arr[i], null);
             treeObj.checkNode(node, true, true);
             }
             }*/

        });
        var fun_param = {};
        if (set.data.key && set.data.key.name) {
            fun_param.name = set.data.key.name;
        }
        function onCheck(e, treeId, treeNode) {
            var val = treeCheck(e, treeId, treeNode, fun_param)
            $("#" + treeIdul + '-block').find("[name=tree_ids]").val(val.v_ids);
            $("#" + treeIdul + '-block').find("[name=tree_names]").val(val.v_name);
            $("#" + treeIdul + '-block').find(".usercon").html(val.v_name);
        }

        function onClick(e, treeId, treeNode) {
            console.log($('this').prevObject)
            console.log(treeClcik(e, treeId, treeNode, fun_param))
        }
    });
    //iframe表格中默认高度
    if($(".datatab").length){
        if($(".datatab").data("spacing") && !isNaN($(".datatab").data("spacing"))){
            $(".datatab").height($(document).height() - $(".datatab").data("spacing"));
        }else {
            $(".datatab").height($(document).height() - 180);
        }
    }

    //解决隐藏表格表头宽度无法自适应问题
    $(".js-hidetable").on("click", function () {
        var block_id = $(this).attr("href");
        $(block_id).find(".dataTables_scrollHeadInner").width("100%");
        $(block_id).find(".dataTables_scrollHeadInner .dataTable").width("100%");
    })

    //表格复选框点击同时选择一行
    $('table').on('change',"th input:checkbox,.td-checkbox input:checkbox", function () {
        $(this).closest('tr').toggleClass('selected').toggleClass('active');
    });

})
