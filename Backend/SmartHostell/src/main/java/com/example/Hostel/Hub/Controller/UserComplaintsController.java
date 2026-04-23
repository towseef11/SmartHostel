package com.example.Hostel.Hub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.Complaints;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Repo.UserRepo;
import com.example.Hostel.Hub.Security.JwtUtil;
import com.example.Hostel.Hub.Service.ComplaintsService;

@RestController
@RequestMapping("userComplaintsController")
@CrossOrigin(origins = "http://localhost:3000")
public class UserComplaintsController {

    @Autowired
    ComplaintsService complaintsService;

    @Autowired
    UserRepo userRepo;
    
    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Raise Complaint
    @PostMapping("raisecomplaint")
    public Complaints raisecomplaint(@RequestParam String description) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        // fetch logged in user from DB
        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return complaintsService.raiseComplaints(user, description);
    }
    
    // My Complaints
    @GetMapping("/mycomplaints")
    public List<Complaints> getMyComplaints(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        return complaintsService.getComplaintsByUser(username);
    }

    // 🔹 Delete Complaint
    @DeleteMapping("deletecomplaint/{id}")
    public String deleteComplaint(@PathVariable int id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        User user = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        complaintsService.deleteIfPending(id, user.getUserid());

        return "Deleted the complaint successfully!";
    }
}