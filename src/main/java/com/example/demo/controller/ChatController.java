package com.example.demo.controller;

import com.example.demo.common.JsonResult;
import com.example.demo.websocket.SpringWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.TextMessage;

/**
 * @Author: wen
 * @Date: 18-12-9 上午12:26
 */
@Controller
@CrossOrigin
@RequestMapping("/chat")
public class ChatController {
    @Autowired
//    @Qualifier("chatHandler")
    private SpringWebSocketHandler handler;

    @RequestMapping("/message/{name}/{message}")
    @ResponseBody
    public Object sendMessage(@PathVariable("name") String userId, @PathVariable("message") String message) {
        boolean hasSend = handler.sendMessageToUser(userId, new TextMessage(message));
        JsonResult jsonResult = new JsonResult();
        jsonResult.setSuccess(hasSend);
        return jsonResult;
    }

    @RequestMapping("/getAllOnlineUsers")
    @ResponseBody
    public Object getAllOnlineUsers() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setSuccess(true);
        jsonResult.setData(handler.getAllUsers());
        return jsonResult;
    }
}
