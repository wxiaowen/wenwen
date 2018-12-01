package com.example.demo.controller;

import com.example.demo.common.JsonResult;
import com.example.demo.model.MailModel;
import com.example.demo.service.mail.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: wen
 * @Date: 18-11-28 下午9:13
 * 首页控制
 */
@Controller
@CrossOrigin
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private IMailService mailService;

    /**
     * 发送邮件
     *
     * @param to
     * @return
     */
    @RequestMapping("/send/{to}")
    @ResponseBody
    public Object sendMail(@PathVariable("to") String to) {
        JsonResult jsonResult = new JsonResult();
        try {
            MailModel mailModel = new MailModel();
            mailModel.setContent("测试邮件");
            mailModel.setSubject("第一封邮件");
            mailModel.setTo(to);
            mailService.sendMail(mailModel);
            jsonResult.setSuccess(true);
        } catch (Exception e) {
            e.printStackTrace();
            jsonResult.setError(e.getMessage());
        }

        return jsonResult;
    }
}
