package com.example.demo.websocket;

import com.example.demo.model.OnlineUser;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * WebSocket业务处理
 */
@Service("chatHandler")
public class SpringWebSocketHandler extends TextWebSocketHandler {
    //在线用户列表
    private static final Map<String, WebSocketSession> users;

    //用户标识
    private static final String CLIENT_ID = "name";


    private static final Logger logger = LoggerFactory.getLogger(SpringWebSocketHandler.class);

    static {
        users = new HashMap<>();
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = getClientId(session);
        logger.info("{}成功建立连接", userId);
        if (userId != null) {
            users.put(userId, session);
            OnlineUser onlineUser = new OnlineUser();
            String name = (String) session.getAttributes().get("name");
            String ip = (String) session.getAttributes().get("ip");
            String loginTime = (String) session.getAttributes().get("loginTime");
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("name", name);
            jsonObject.addProperty("from", ip);
            jsonObject.addProperty("to", "");
            jsonObject.addProperty("time", loginTime);
            jsonObject.addProperty("content", "上线成功");
            jsonObject.addProperty("extra", "1");
            sendMessageToAllUsers(new TextMessage(jsonObject.toString()), name);
        }


    }

    /**
     * 关闭连接时触发
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String timeStr = sdf.format(new Date());
        String name = (String) session.getAttributes().get("name");
        String ip = (String) session.getAttributes().get("ip");
        String loginTime = (String) session.getAttributes().get("loginTime");
        long time = System.currentTimeMillis() - sdf.parse(loginTime).getTime();
        users.remove(getClientId(session));
        logger.info("连接已关闭：" + closeStatus);
        logger.info("user:{},time-count:{}毫秒,ip:{}", name, time, ip);
    }

    /**
     * js调用websocket.send时候，会调用该方法
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        logger.info(message.toString());
        try {
            session.sendMessage(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 处理传输错误
     */
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
        logger.error("连接出错");
        users.remove(getClientId(session));
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }


    /**
     * 获取用户标识
     *
     * @param session
     * @return
     */
    private String getClientId(WebSocketSession session) {
        try {
            String clientId = (String) session.getAttributes().get(CLIENT_ID);
            return clientId;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 发送信息给指定用户
     *
     * @param clientId
     * @param message
     * @return
     */
    public boolean sendMessageToUser(String clientId, TextMessage message) {
        if (users.get(clientId) == null || "".equals(users.get(clientId))) {
            return false;
        }
        WebSocketSession session = users.get(clientId);
        logger.info("sendMessage:" + session);
        if (!session.isOpen()) {
            return false;
        }
        try {
            session.sendMessage(message);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    /**
     * 广播信息
     *
     * @param message
     * @return
     */
    public boolean sendMessageToAllUsers(TextMessage message, String currentName) {
        boolean allSendSuccess = true;
        Set<String> clientIds = users.keySet();
        WebSocketSession session = null;
        for (String clientId : clientIds) {
            try {
                session = users.get(clientId);
                if (session.isOpen() && !currentName.equals(clientId)) {
                    session.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
                allSendSuccess = false;
            }
        }

        return allSendSuccess;
    }

    /**
     * 获取在线用户
     */
    public List<OnlineUser> getAllUsers() {
        Gson gson=new Gson();
        List<OnlineUser> onlineUsers = new ArrayList<>();
        if (users != null && users.size() > 0) {
            for (String user : users.keySet()) {
                OnlineUser onlineUser = new OnlineUser();
                String name = (String) users.get(user).getAttributes().get("name");
                String ip = (String) users.get(user).getAttributes().get("ip");
                String loginTime = (String) users.get(user).getAttributes().get("loginTime");
                onlineUser.setName(name);
                onlineUser.setLoginTime(loginTime);
                onlineUser.setIp(ip);
                if (!onlineUsers.contains(onlineUser)) {
                    onlineUsers.add(onlineUser);
                }

            }
        }
        logger.info("在线用户{}",gson.toJson(onlineUsers));
        return onlineUsers;
    }
}
