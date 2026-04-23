package com.example.Hostel.Hub.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Entity
@Table(
    name = "washing_machine_slots",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = { "slot_date", "slot_time" }),
        @UniqueConstraint(columnNames = { "slot_date", "user_id" })
    }
)
@Data
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @Column(name = "slot_time", nullable = false)
    private LocalTime slotTime;

    @Column(name = "slot_date", nullable = false)
    private LocalDate slotDate;

    private boolean booked = true;

    @Column(name = "user_id", nullable = false)
    private Long userId;   
}
