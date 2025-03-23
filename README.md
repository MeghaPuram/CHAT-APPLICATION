## CHAT-APPLICATION
📌 Project Overview

This is a real-time chat application built using Spring Boot for the backend and React for the frontend. The application leverages WebSockets (using STOMP protocol) for real-time communication, allowing users to send and receive messages instantly. The chat app supports multiple chat rooms and provides a seamless messaging experience with WebSockets.

🚀 Features

Real-time Messaging: Messages are sent and received instantly using WebSockets.

Multi-Room Support: Users can join different chat rooms and communicate.

User Authentication: Users must log in to send messages.

Message Persistence: Chat history is stored in a database (MongoDB).

Live Updates: Messages update dynamically without refreshing the page.

UI Notifications: Users get notified when messages arrive.

Optimized WebSocket Handling: Ensures only one WebSocket connection per user.

Graceful Disconnection: Users can disconnect properly.

🛠️ Technologies Used

Backend (Spring Boot)

Spring Boot 3.x - For backend API development.

Spring WebSocket (STOMP) - Enables real-time communication.

Spring Security - Handles user authentication.

MongoDB - Stores chat messages and user details.

Spring Data MongoDB - Simplifies MongoDB interactions.

Lombok - Reduces boilerplate code.

Frontend (React.js)

React 18 - For building the UI.

SockJS & StompJS - Enables WebSocket connections.

Tailwind CSS - For modern and responsive UI design.

React Router - Handles navigation.

Axios - For API calls.

Other Tools

Postman - For API testing.

Maven - Manages dependencies.

VS Code / IntelliJ IDEA - Used for development.
