package com.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Message;
import com.app.entities.Room;
import com.app.repositories.RoomRepository;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

	private RoomRepository roomRepo;

	public RoomController(RoomRepository roomRepo) {
		this.roomRepo = roomRepo;
	}

	// create room
	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody String roomId) {
		if (roomRepo.findByRoomId(roomId) != null) {
			// room is already exist
			return ResponseEntity.badRequest().body("Room already exists");
		}
		// create new room
		Room room = new Room();
		room.setRoomId(roomId);
		Room savedRoom = roomRepo.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(room);
	}

	// get room
	@GetMapping("/{roomId}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomId) {

		Room room = roomRepo.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().body("Room not found!!");
		}
		return ResponseEntity.ok(room);
	}

	// get message of room
	@GetMapping("/{roomId}/messages")
	public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
			@RequestParam(value = "page", defaultValue = "0", required = false) int page,
			@RequestParam(value = "size", defaultValue = "30", required = false) int size) {
		Room room = roomRepo.findByRoomId(roomId);
		if (room == null) {
			return ResponseEntity.badRequest().build();
		}
		// get messages :
		// pagination
		List<Message> messages = room.getMessages();
		int start = Math.max(0, messages.size() - (page + 1) * size);
		int end = Math.min(messages.size(), start + size);
		List<Message> paginatedMessages = messages.subList(start, end);
		return ResponseEntity.ok(paginatedMessages);
	}
}