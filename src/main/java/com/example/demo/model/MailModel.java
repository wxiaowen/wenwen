package com.example.demo.model;

import java.io.Serializable;

/**
 * @Author: wen
 * @Date: 18-11-28 下午10:08
 */
public class MailModel implements Serializable{


    private String from;
    private String to;
    private String content;
    private String subject;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
