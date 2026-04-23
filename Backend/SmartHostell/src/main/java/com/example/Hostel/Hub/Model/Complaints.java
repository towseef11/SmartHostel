package com.example.Hostel.Hub.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="complaints")
public class Complaints {

     @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
     private int id;

     private String description;
     private long userid;

     @ManyToOne(fetch = FetchType.EAGER)
     @JoinColumn(name="room_id")
     private Rooms room;

     private String status;
     private String response;
     private LocalDateTime time;
}