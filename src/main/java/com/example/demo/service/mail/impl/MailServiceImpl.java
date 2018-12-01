package com.example.demo.service.mail.impl;

import com.example.demo.model.MailModel;
import com.example.demo.service.mail.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @Author: wen
 * @Date: 18-11-28 下午10:15
 */
@Service
public class MailServiceImpl implements IMailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;

    /**
     * 发送邮件
     *
     * @param mailModel
     */
    @Override
    public void sendMail(MailModel mailModel) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        //默认发送方为自己
        simpleMailMessage.setFrom(sender);
        simpleMailMessage.setTo(mailModel.getTo());
        simpleMailMessage.setSentDate(new Date());
        simpleMailMessage.setSubject(mailModel.getSubject());
        simpleMailMessage.setText(mailModel.getContent());
        mailSender.send(simpleMailMessage);
    }
}
