package com.example.Hostel.Hub.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Hostel.Hub.Model.WeeklyFood;

public interface WeeklyFoodRepo extends JpaRepository<WeeklyFood, Long> {

	WeeklyFood findByDayOfWeekIgnoreCase(String dayOfWeek);
}
