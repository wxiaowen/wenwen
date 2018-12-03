package com.example.demo.websocket;

import com.example.demo.model.OnlineUser;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * WebSocket业务处理
 */
public class SpringWebSocketHandler extends TextWebSocketHandler {
    /**
     * 当前在线用户
     */
    private static final ArrayList<WebSocketSession> users;
    private static final List<OnlineUser> onlineUsers;


    private static final Logger logger = LoggerFactory.getLogger(SpringWebSocketHandler.class);

    static {
        users = new ArrayList<>();
        onlineUsers = new ArrayList<>();
    }

    public SpringWebSocketHandler() {
    }

    /**
     * 连接成功时候，会触发页面上onopen方法
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String fromUserIp = session.getAttributes().get("FROM_USER_IP").toString();
        List<OnlineUser> List = getAllOnlineUsers();
        logger.info("在线{}", List);
        users.add(session);
        logger.info("{}连接到WebSocket成功......当前连接数量:" + users.size(), fromUserIp);

    }

    /**
     * 关闭连接时触发
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

        String fromUserIp = session.getAttributes().get("FROM_USER_IP").toString();
        logger.info("用户" + fromUserIp + "已退出！");
        users.remove(session);
        onlineUsers.remove(fromUserIp);
        logger.debug("{}连接已关闭......", fromUserIp);
        logger.info("剩余在线用户" + users.size());
    }

    /**
     * js调用websocket.send时候，会调用该方法
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        sendMessageToUser("", "", message);
        super.handleTextMessage(session, message);
    }

    /**
     * 处理传输错误
     */
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        logger.error("传输错误WebSocket连接已关闭......");
        users.remove(session);
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }


    /**
     * 给某个用户发送消息
     *
     * @param message
     */
    public void sendMessageToUser(String acceptUser, String sendUser, TextMessage message) {
        if (users.size() > 0) {
            //是否成功发送
            Boolean isSend = false;
            for (WebSocketSession user : users) {
                try {
                    if (user.isOpen()) {
                        //发送消息
                        user.sendMessage(message);
                        isSend = true;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }


        }
    }

    public List<OnlineUser> getAllOnlineUsers() {
        if (users.size() > 0) {
            for (WebSocketSession user : users) {
                if (user.isOpen()) {
                    String fromUserIp = user.getAttributes().get("FROM_USER_IP").toString();
                    String loginTime = user.getAttributes().get("LOGIN_TIME").toString();
                    OnlineUser onlineUser = new OnlineUser();
                    onlineUser.setIp(fromUserIp);
                    onlineUser.setLoginTime(loginTime);
                    if (!onlineUsers.contains(onlineUser)) {
                        onlineUsers.add(onlineUser);
                    }

                }
            }

        }
        return onlineUsers;

    }


    public void removeOnlineUser(String ip) {
        int size = onlineUsers.size();
        for (int i = size - 1; i >= 0; i--) {
            if (ip.equals(onlineUsers.get(i).getIp())) {
                onlineUsers.remove(i);
            }

        }

    }


}
