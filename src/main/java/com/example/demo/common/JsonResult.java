package com.example.demo.common;

/**
 * @Author: wen
 * @Date: 18-11-28 下午11:32
 * 返回数据
 */
public class JsonResult {
    private Boolean success = false;
    private String message = "";

    private Object data = null;
    private String error;

    public JsonResult() {
    }

    public JsonResult(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public JsonResult(Boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public JsonResult(Boolean success, String message, Object data, String error) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    public Boolean getSuccess() {
        return this.success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return this.data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
