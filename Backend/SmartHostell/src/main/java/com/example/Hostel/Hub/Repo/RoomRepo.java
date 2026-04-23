package com.example.Hostel.Hub.Repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Hostel.Hub.Model.Rooms;

public interface RoomRepo extends JpaRepository<Rooms, Integer>{


	Optional<Rooms> findByRoomNumber(String roomNumber);

}