package com.example.demo.websocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * WebSocket拦截器
 *
 * @author wxw
 */
public class SpringWebSocketHandlerInterceptor extends HttpSessionHandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        // TODO Auto-generated method stub
        if (request instanceof ServletServerHttpRequest) {
            //获取登录用户，存入websocket中
            HttpServletRequest httpServletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String fromIp = httpServletRequest.getParameter("fromIp");
            attributes.put("FROM_USER_IP", fromIp);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            attributes.put("LOGIN_TIME", sdf.format(new Date()));
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);

    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception ex) {
        super.afterHandshake(request, response, wsHandler, ex);
    }
}