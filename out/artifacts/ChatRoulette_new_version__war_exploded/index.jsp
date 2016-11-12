<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Chat Room</title>
  <link href="<c:url value="/resources/css/style.css"/>" rel="stylesheet" type="text/css"/>
  <script src="<c:url value="/resources/js/app.js"/>"> </script>
</head>
<body>
<ul id="messages"></ul>
<form onsubmit="return handleEnterKey()">
  <input id="messageBox" />
  <button type="button" onClick=sendMessage()>Send</button>
  <button type="button" onClick=nextInterlocutor()>Next</button>
</form>
</body>
</html>
