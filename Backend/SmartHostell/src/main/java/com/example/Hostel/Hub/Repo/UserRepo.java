package com.example.Hostel.Hub.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Hostel.Hub.Model.User;

public interface UserRepo extends JpaRepository<User, Integer> {

	long countByRoomId(int i); 

	List<User> findByRoomId(Long roomId);

	Optional<User> findByEmail(String email);
}
