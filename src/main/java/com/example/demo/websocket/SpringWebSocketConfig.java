package com.example.demo.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;


/**
 * WebSocket配置
 *
 * @author wxw
 */
@Configuration
@EnableWebSocket
public class SpringWebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //用来注册WebSocket Server实现类，第二个参数是访问WebSocket的地址F
        registry.addHandler(webSocketHandler(), "/websocket/socketServer").addInterceptors(new SpringWebSocketHandlerInterceptor()).setAllowedOrigins("*");
//        //允许客户端使用SockJS
        registry.addHandler(webSocketHandler(), "/sockjs/socketServer").addInterceptors(new SpringWebSocketHandlerInterceptor()).withSockJS();
    }

    @Bean
    public SpringWebSocketHandler webSocketHandler() {
        return new SpringWebSocketHandler();
    }

}
