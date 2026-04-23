package com.example.Hostel.Hub.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    private String name;
    private String email;
    private String password;
    private long mobile;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_number", referencedColumnName = "roomNumber")
    private Rooms room;

    @Enumerated(EnumType.STRING)
    private Role role;

	
}