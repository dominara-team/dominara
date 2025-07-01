# dominara-frontend

---

## Overview

The `dominara-frontend` is the main game client for Dominara, delivering an immersive 3D MOBA experience with real-time multiplayer gameplay and comprehensive user interface features.

---

## Responsibilities

- Rendering 3D game scenes and UI overlays  
- Handling player input and managing local game state  
- Managing authentication and player sessions  
- Establishing and maintaining WebSocket connection to the event-service for real-time events  
- Interacting with a unified API gateway for all backend REST API calls (authentication, profile, matchmaking, shop, admin)  
- Displaying matchmaking queues, player profiles, shops, social features, and administrative notifications  

---

## Architecture

- **API Gateway:**  
  The frontend communicates exclusively with a single unified API gateway, which internally routes requests to appropriate backend microservices.  
- **Real-time Events:**  
  WebSocket connections to the `event-service` provide live game updates, chat, notifications, and system announcements.  
- **State Management:**  
  Local state tracks gameplay, UI, network status, and session info.  
- **Authentication:**  
  Supports OAuth login flows, two-factor authentication, and session handling via the API gateway.  

---

## API Usage

- All REST API calls are proxied through the unified API gateway endpoint.  
- The gateway abstracts the backend microservice complexity from the client.  
- WebSocket connection to the `event-service` remains a direct connection for event streaming.  

---

## WebSocket Events

The frontend listens to real-time events broadcast by the `event-service`, including:

| Event Name           | Description                                |
| -------------------- | ------------------------------------------|
| `match_found`        | Notification of a match being found        |
| `match_ready`        | Countdown to match start                    |
| `currency_updated`   | Player currency updates                     |
| `game_state_update`  | Live game session updates                   |
| `chat_message`       | Incoming chat messages                       |
| `system_announcement`| Global announcements                        |
| `friend_invite`      | Friend requests and notifications          |
| `player_purchased_item` | Item purchase confirmations              |

---

## Environment Variables

| Variable             | Description                                    |
|----------------------|------------------------------------------------|
| `VITE_API_BASE_URL`  | Base URL for the unified API gateway REST endpoints |
| `VITE_WS_URL`        | WebSocket URL for connecting to the event-service   |

---

## License

This project and its source code are proprietary and owned by Eloy Bermejo.  
Unauthorized use, copying, or distribution is prohibited.

For inquiries or permissions, contact: [eloybercast@gmail.com](mailto:eloybercast@gmail.com)
