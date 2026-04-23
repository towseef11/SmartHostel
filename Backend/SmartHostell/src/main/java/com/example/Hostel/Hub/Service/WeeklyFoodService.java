package com.example.Hostel.Hub.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Hostel.Hub.Model.WeeklyFood;
import com.example.Hostel.Hub.Repo.WeeklyFoodRepo;

@Service
public class WeeklyFoodService {
	@Autowired
	WeeklyFoodRepo weeklyfoodrepo;

	public List<WeeklyFood> getWeeklySchedule() {
		return weeklyfoodrepo.findAll();
	}

	public WeeklyFood updateWeeklySchedule(String dayofweek, WeeklyFood payload) {
		dayofweek = dayofweek.toUpperCase();
		WeeklyFood existing = weeklyfoodrepo.findByDayOfWeekIgnoreCase(dayofweek);

		if (existing == null) {
			payload.setDayOfWeek(dayofweek);
			return weeklyfoodrepo.save(payload);
		}
        
		existing.setBreakfast(payload.getBreakfast());
        existing.setLunch(payload.getLunch());
        existing.setDinner(payload.getDinner());
        return weeklyfoodrepo.save(existing);
	}

}
