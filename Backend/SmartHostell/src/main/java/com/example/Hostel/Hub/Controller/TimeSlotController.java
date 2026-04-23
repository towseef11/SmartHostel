package com.example.Hostel.Hub.Controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.SlotAvailabilityDTO;
import com.example.Hostel.Hub.Model.TimeSlot;
import com.example.Hostel.Hub.Service.TimeSlotsService;

@RestController
@RequestMapping("Api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class TimeSlotController {

	@Autowired
	TimeSlotsService timeslotsService;

	@GetMapping("availability")
	public ResponseEntity<List<SlotAvailabilityDTO>> getAvailabilty(
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		if (date == null) {
			date = LocalDate.now();
		}
		return ResponseEntity.ok(timeslotsService.getAvailability(date));
	}

	@PostMapping("bookslot")
	public ResponseEntity<TimeSlot> bookslot(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,

			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
            if(date ==null) {
            	  date=LocalDate.now();
            }
            
            return ResponseEntity.ok(timeslotsService.bookSlot(date,time));
	}

}
