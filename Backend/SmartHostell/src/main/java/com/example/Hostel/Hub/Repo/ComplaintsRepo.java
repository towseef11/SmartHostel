package com.example.Hostel.Hub.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Hostel.Hub.Model.Complaints;
import com.example.Hostel.Hub.Model.User;

public interface ComplaintsRepo extends JpaRepository<Complaints,Integer> {

    List<Complaints> findByUserid(long userid);

}
