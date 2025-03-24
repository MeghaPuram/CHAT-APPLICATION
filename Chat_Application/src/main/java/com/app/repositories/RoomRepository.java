package com.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.app.entities.Room;

public interface RoomRepository extends MongoRepository<Room, String>{
	Room findByRoomId(String roomId);
}
