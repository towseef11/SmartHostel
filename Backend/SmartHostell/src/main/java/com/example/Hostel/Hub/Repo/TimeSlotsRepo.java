package com.example.Hostel.Hub.Repo;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Hostel.Hub.Model.TimeSlot;

public interface TimeSlotsRepo extends JpaRepository<TimeSlot, Long> {

    boolean existsBySlotDateAndUserId(LocalDate date, Long userId);

    boolean existsBySlotDateAndSlotTime(LocalDate date, LocalTime time);

    List<TimeSlot> findBySlotDate(LocalDate date);
}

