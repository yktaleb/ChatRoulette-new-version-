 //при загрузке страницы вызываем setNickname();
window.onload = initialization;
//никнейм по умолчанию
var nickname = "Anonymous";
var serviceLocation = "ws://localhost:8080/ChatRoulette_war_exploded/chat";
var socket;

function receiveMessage(event) {
    // clearWindow();
    if (event.data == "NoFreeCompanion") {
        messageNoFreeCompanion();
    } else {
        var message = JSON.parse(event.data);
        addNewMessageToWindow(message);
    }
}

//обработчик на кнопке сменить собеседника
function nextInterlocutor() {
    socket.send("next");
}

//обработчик события на кнопке Send
function sendMessage() {
    //елемент input
    var messageBox = document.getElementById("messageBox");
    //содержимое input
    var messageContent = messageBox.value;
    //объект сообщения
    var message = {
        nickname: nickname,
        content: messageContent
    };
    //отпрявляет на сервер объект сообщения в виде JSON-строки
    socket.send(JSON.stringify(message));
    //очистка input
    messageBox.value = "";
}

function addNewMessageToWindow(message) {
    var messagesArea = document.getElementById("messages");
    var messageLine = document.createElement("li");
    messageLine.innerHTML = "<b>" + message.nickname + ": </b>" + message.content;
    messagesArea.appendChild(messageLine);
}

function messageNoFreeCompanion() {
    var messagesArea = document.getElementById("messages");
    var messageLine = document.createElement("h1");
    messageLine.innerHTML = "<b>" + "No free companion :(" +"</b>";
    messagesArea.appendChild(messageLine);
}

// function clearWindow() {
 //     document.getElementById("messages").clearAttributes();
 // }

function initialization() {
    nickname = prompt("Please enter your nickname", nickname);

    //соединяем с нашим сервиром
    socket = new WebSocket(serviceLocation);
    //при получении сообщения от сервера вызываем receiveMessage()
    socket.onmessage = receiveMessage;
}

//при нажатии на Enter срабатывает sendMessage()
function handleEnterKey() {
    sendMessage();
    return false;
}