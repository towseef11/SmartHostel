package com.example.Hostel.Hub.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.Hostel.Hub.Model.SlotAvailabilityDTO;
import com.example.Hostel.Hub.Model.TimeSlot;
import com.example.Hostel.Hub.Repo.TimeSlotsRepo;
import com.example.Hostel.Hub.Repo.UserRepo;

@Service
public class TimeSlotsService {

    @Autowired
    private TimeSlotsRepo repo;
    @Autowired
    private UserRepo userRepo;

    private Long getLoggedInUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUserid();
    }

    

    public TimeSlot bookSlot(LocalDate date, LocalTime time) {

        Long userId = getLoggedInUserId();

        // ❌ Past date check
        if (date.isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot book past dates");
        }

        // ❌ Slot time range check (7 AM - 7 PM)
        if (time.isBefore(LocalTime.of(7, 0)) || time.isAfter(LocalTime.of(19, 0))) {
            throw new RuntimeException("Slot must be between 7 AM and 8 PM");
        }

        // ❌ FIXED: past hour check (IMPORTANT)
        if (date.equals(LocalDate.now()) &&
                time.getHour() < LocalTime.now().getHour()) {
            throw new RuntimeException("Cannot book past time slots");
        }

        // ❌ one slot per day per user
        if (repo.existsBySlotDateAndUserId(date, userId)) {
            throw new RuntimeException("Only one slot per day allowed");
        }

        // ❌ slot already booked
        if (repo.existsBySlotDateAndSlotTime(date, time)) {
            throw new RuntimeException("Slot already booked");
        }

        TimeSlot slot = new TimeSlot();
        slot.setSlotDate(date);
        slot.setSlotTime(time);
        slot.setUserId(userId);
        slot.setBooked(true);

        return repo.save(slot);
    }

    public List<SlotAvailabilityDTO> getAvailability(LocalDate date) {

        List<TimeSlot> bookedSlots = repo.findBySlotDate(date);

        Map<LocalTime, TimeSlot> bookedMap = bookedSlots.stream()
                .filter(TimeSlot::isBooked)
                .collect(Collectors.toMap(
                        TimeSlot::getSlotTime,
                        s -> s,
                        (a, b) -> a
                ));

        List<SlotAvailabilityDTO> result = new ArrayList<>();

        for (int hour = 7; hour <= 19; hour++) {
            LocalTime time = LocalTime.of(hour, 0);

            SlotAvailabilityDTO dto = new SlotAvailabilityDTO();
            dto.setSlotTime(time);

            if (bookedMap.containsKey(time)) {
                TimeSlot slot = bookedMap.get(time);
                dto.setBooked(true);
                dto.setBookedByUserId(slot.getUserId());
            } else {
                dto.setBooked(false);
            }

            result.add(dto);
        }

        return result;
    }
}