package com.example.Hostel.Hub.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Hostel.Hub.Model.Complaints;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Repo.ComplaintsRepo;
import com.example.Hostel.Hub.Repo.UserRepo;

@Service
public class ComplaintsService {
	@Autowired
	ComplaintsRepo complaintsrepo;
	
	@Autowired
	UserRepo userrepo;

	// raised complaint c gets saved in the complaints table through this
	public Complaints raiseComplaints(User loggedInUser, String description) {

		Complaints c = new Complaints();

		c.setUserid(loggedInUser.getUserid());

		// Correct way to set room number
		if (loggedInUser.getRoom() != null) {
			c.setRoom(loggedInUser.getRoom());
		} else {
			c.setRoom(null); // or "NOT_ASSIGNED"
		}

		c.setDescription(description);
		c.setStatus("PENDING"); // status of complaint
		c.setResponse(null); // owner will fill this later
		c.setTime(LocalDateTime.now());

		return complaintsrepo.save(c);
	}
	
	// My Complaints
	public List<Complaints> getComplaintsByUser(String username) {

	    User user = userrepo.findByEmail(username)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    return complaintsrepo.findByUserid(user.getUserid());
	}

	
	

	// owner will be able to get all the complaints
	public List<Complaints> getAllComplaints() {
		return complaintsrepo.findAll();
	}

	// updating the responses by owner
	public Complaints updateResponse(int id, String response) {
		Complaints c = complaintsrepo.findById(id).orElseThrow(() -> new RuntimeException("Complaint not found"));

		c.setResponse(response);
		c.setStatus("RESOLVED");

		return complaintsrepo.save(c);
	}

	// deleting the complaint before owner clicks "ok"
	public void deleteIfPending(int id, long loggedInUserId) {

		Complaints c = complaintsrepo.findById(id).orElseThrow(() -> new RuntimeException("Complaint not found"));

		// Optional safety: make sure user is deleting his own complaint
		if (c.getUserid() != loggedInUserId) {
			throw new RuntimeException("You are not allowed to delete this complaint");
		}

		// Allow delete only if status is PENDING
		if (!"PENDING".equalsIgnoreCase(c.getStatus())) {
			throw new RuntimeException("Cannot delete complaint once it is resolved");
		}

		complaintsrepo.deleteById(id);
	}

}
