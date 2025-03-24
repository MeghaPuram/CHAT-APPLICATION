package com.app.controllers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.app.entities.Message;

import com.app.repositories.RoomRepository;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
	 private RoomRepository roomRepo;

	    public ChatController(RoomRepository roomRepo) {
	        this.roomRepo = roomRepo;
	    }


	    //for sending and receiving messages
	    @MessageMapping("/sendMessage/{roomId}")// /app/sendMessage/roomId
	    @SendTo("/topic/room/{roomId}")//subscribe
	    public Message sendMessage(@Payload Message message) {
	    	System.out.println(" Message Received in Backend: " + message);
	        return message;  //  Spring automatically sends this
	    }
}
