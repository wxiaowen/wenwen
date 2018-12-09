package com.example.demo.model;

import java.util.Objects;

/**
 * @Author: wen
 * @Date: 18-12-3 下午9:56
 */
public class OnlineUser {
    private String loginTime;
    private String ip;
    private String name;

    public String getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(String loginTime) {
        this.loginTime = loginTime;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OnlineUser that = (OnlineUser) o;
        return Objects.equals(ip, that.ip) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {

        return Objects.hash(ip, name);
    }
}
