package com.example.Hostel.Hub.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "rooms")
@Data

public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;   
    private int floorNumber;
    
    @Column(unique = true)
    private String roomNumber;

    private int capacity;
}
