package com.example.Hostel.Hub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.Rooms;
import com.example.Hostel.Hub.Model.RoomsFloorDto;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
   @Autowired
   RoomService roomsService;
   
   @PostMapping("/add")
   public Rooms addRoom(@RequestBody Rooms room){
       return roomsService.addRoom(room);
   }
   
   //floor wise room card 
   @GetMapping("/floors")
   public List<RoomsFloorDto> FloorWiseRooms() {
	   return roomsService.getFloorWiseRooms();
   }
   
   @GetMapping("/{roomid}/users")
   public List<User> getUserInRoom(@PathVariable Long roomid){
	   return roomsService.getUsersInRoom(roomid);
   }
   
}

