package com.example.Hostel.Hub.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Hostel.Hub.Model.Rooms;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Model.UserUpdateDto;
import com.example.Hostel.Hub.Repo.RoomRepo;
import com.example.Hostel.Hub.Repo.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	UserRepo userrepo;
	
	@Autowired
	RoomRepo roomrepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
    
	
	public User login(String email, String password) {
	    User user = userrepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid email"));

	    if (!passwordEncoder.matches(password, user.getPassword())) {
	        throw new RuntimeException("Invalid password");
	    }

	    return user;
	}  

	
	// creating user
	public User insertUser(User user) {

	    user.setPassword(passwordEncoder.encode(user.getPassword()));

	    if(user.getRoom() != null) {

	        Rooms room = roomrepo
	            .findByRoomNumber(user.getRoom().getRoomNumber())
	            .orElseThrow(() -> new RuntimeException("Room not found"));

	        user.setRoom(room);
	    }

	    return userrepo.save(user);
	}

	// reading all the users
	public List<User> getUsers() {
		return userrepo.findAll();
	}

	// reading the user
	public User getUserById(int id) {
		return userrepo.findById(id).orElseThrow(()-> new RuntimeException("No user found !"));
	}

	// updating the user
	public User updateById(int id, UserUpdateDto dto) {
		
		

	    User existUser = userrepo.findById(id)
	        .orElseThrow(() -> new RuntimeException("User not found"));
	    
	    

	    if(dto.getName() != null)
	        existUser.setName(dto.getName());

	    if(dto.getEmail() != null)
	        existUser.setEmail(dto.getEmail());

	    if(dto.getPassword() != null)
	        existUser.setPassword(passwordEncoder.encode(dto.getPassword()));

	    if(dto.getMobile() != null)
	        existUser.setMobile(dto.getMobile());

	    if(dto.getRole() != null)
	        existUser.setRole(dto.getRole());

	    if(dto.getRoomNumber() != null) {
	        Rooms room = roomrepo
	            .findByRoomNumber(dto.getRoomNumber())
	            .orElseThrow(() -> new RuntimeException("Room not found"));

	        existUser.setRoom(room);
	    }

	    return userrepo.save(existUser);
	}


    @Transactional
    public String deleteById(int id) {
        User user = userrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userrepo.delete(user);
        return "deleted user successfully";
    }

}
