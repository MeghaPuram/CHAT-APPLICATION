package com.app.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	
	private String sender;
	private String content;
	private LocalDateTime timeStamp;
	
	public Message(String sender, String content) {
		super();
		this.sender = sender;
		this.content = content;
		this.timeStamp = LocalDateTime.now();
	}
	
}
