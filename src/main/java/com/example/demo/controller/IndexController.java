package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 通用访问拦截匹配
 *
 * @author wxw
 */
@Controller
public class IndexController {


//    /**
//     * 平台首页
//     */
//    @RequestMapping("/index")
//    public String index(Model model, HttpServletRequest request) {
//        User currentUser = (User) SecurityUtils.getSubject().getPrincipal();
//        if (currentUser != null) {
//            model.addAttribute("currentUser", currentUser);
//            return "index";
//        }
//        return "login";
//    }


    /**
     * 页面跳转
     *
     * @param url
     * @return
     */
    @RequestMapping("{url}.shtml")
    public String page(@PathVariable("url") String url, Model model) {
        return url;


    }

    /**
     * 页面跳转(二级目录)
     *
     * @param module
     * @param url
     * @return
     */
    @RequestMapping("{module}/{url}.shtml")
    public String page(@PathVariable("module") String module, @PathVariable("url") String url, Model model) {
        return module + "/" + url;

    }


    /**
     * 页面跳转(三级目录)
     *
     * @param module
     * @param function
     * @param url
     * @return
     */
    @RequestMapping("{function}/{module}/{url}.shtml")
    public String page(@PathVariable("function") String function, @PathVariable("module") String module, @PathVariable("url") String url, Model model) {
        return function + "/" + module + "/" + url;

    }

}
