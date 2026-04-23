package com.example.Hostel.Hub.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="weeklyFood")
@Data
public class WeeklyFood {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "day_of_week", nullable = false, unique = true)
   private String dayOfWeek;

   private String breakfast;
   private String lunch;
   private String dinner;
}

