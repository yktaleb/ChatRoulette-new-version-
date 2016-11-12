package com.chatroulette.model;

public class Message {

    public static final String JSON_NAME_NICK_NAME = "nickname";
    public static final String JSON_NAME_CONTENT = "content";

    private String nickName;
    private String content;

    public Message() {
    }

    public Message(String nickName, String content) {
        this.nickName = nickName;
        this.content = content;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
