package com.example.Hostel.Hub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.WeeklyFood;
import com.example.Hostel.Hub.Service.WeeklyFoodService;

@RestController
@RequestMapping("/weeklyfood")
public class WeeklyFoodController {
   @Autowired
   WeeklyFoodService weeklyfoodservice;
   
   //user and owner can view the schedule 
   @GetMapping("/weeklyschedule")
   public List<WeeklyFood> getMenu(){
	   return weeklyfoodservice.getWeeklySchedule();
   }
   
   //updating the menu by owner
   @PostMapping("/updateschedule/{day}")
   public WeeklyFood updateMenu(@PathVariable String day, @RequestBody WeeklyFood menu) {
	   return weeklyfoodservice.updateWeeklySchedule(day, menu);
   }
   
}
