package com.example.Hostel.Hub.Model;

import java.time.LocalTime;

import lombok.Data;

@Data
public class SlotAvailabilityDTO {
    private LocalTime slotTime;
    private boolean booked;
    private Long bookedByUserId;   
}

