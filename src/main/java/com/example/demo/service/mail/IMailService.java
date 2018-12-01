package com.example.demo.service.mail;

import com.example.demo.model.MailModel;

/**
 * @Author: wen
 * @Date: 18-11-28 下午10:07
 * 邮件接口
 */
public interface IMailService {

    /**
     * 发送邮件
     *
     * @param mailModel
     */
    void sendMail(MailModel mailModel);
}
