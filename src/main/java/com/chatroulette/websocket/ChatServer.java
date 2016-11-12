package com.chatroulette.websocket;

import com.chatroulette.model.Message;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.StringReader;

@ApplicationScoped
@ServerEndpoint("/chat")
public class ChatServer {

    @Inject
    private UserSessionHandler sessionHandler;

    @OnOpen
    public void open(Session session) {
        sessionHandler.addSessionToQueue(session);
        sessionHandler.createDialogue();
    }

    @OnClose
    public void close(Session session) {
        sessionHandler.removeSessionFromQueue(session);
        sessionHandler.removeSessionFromDialogues(session);
    }

    @OnError
    public void onError(Throwable error) {

    }

    @OnMessage
    public void handleMessage(Session session, String message) {
        if (message.equals("next")) {
            sessionHandler.nextInterlocutor(session);
        } else {
            JsonReader reader = Json.createReader(new StringReader(message));
            JsonObject jsonMessage = reader.readObject();
            Message msg = new Message(
                    jsonMessage.getString(Message.JSON_NAME_NICK_NAME),
                    jsonMessage.getString(Message.JSON_NAME_CONTENT)
            );
            sessionHandler.sendMessageToDialog(msg, session);
        }
    }
}
