package com.example.demo.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(SpringWebSocketHandlerInterceptor.class);

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {

        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest httpServletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String from = httpServletRequest.getParameter("from");
            String name = httpServletRequest.getParameter("name");
            attributes.put("ip", from);
            attributes.put("name", name);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String timeStr = sdf.format(new Date());
            attributes.put("loginTime", timeStr);
            logger.info("name:{},from:{},loginTime:{}", name, from, timeStr);
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);

    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception ex) {
        super.afterHandshake(request, response, wsHandler, ex);
    }
}