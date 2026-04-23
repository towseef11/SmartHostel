package com.example.Hostel.Hub.Model;

import lombok.Data;

@Data
public class RoomCardDto {
     private int roomId;   // ✅ ADD THIS
     private String roomNumber;
     private int capacity;
     private int occupied;
     private int vacancy;
}

