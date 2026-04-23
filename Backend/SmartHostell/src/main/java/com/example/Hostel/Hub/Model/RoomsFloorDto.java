package com.example.Hostel.Hub.Model;

import java.util.List;

import lombok.Data;

@Data
public class RoomsFloorDto {
   private int floorNumber;
   private List<RoomCardDto> rooms;
}
