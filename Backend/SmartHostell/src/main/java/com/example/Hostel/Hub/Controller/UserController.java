package com.example.Hostel.Hub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.LoginRequest;
import com.example.Hostel.Hub.Model.LoginResponse;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Model.UserUpdateDto;
import com.example.Hostel.Hub.Security.JwtUtil;
import com.example.Hostel.Hub.Service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;
	
	@Autowired
	JwtUtil  jwtutil;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {

	    try {
	        // 🔐 Authenticate user via service
	        User user = userService.login(request.getEmail(), request.getPassword());

	        // 🔥 Generate JWT token
	        String token = jwtutil.generateToken(
	                user.getEmail(),
	                user.getUserid(),
	                user.getRole()
	        );

	        // 📦 Return response (DON'T expose password or full user object)
	        LoginResponse response = new LoginResponse(
	                token,
	                user.getRole(),
	                user.getUserid(),
	                user.getName()
	        );

	        return ResponseEntity.ok(response);

	    } catch (RuntimeException e) {

	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(e.getMessage());
	    }
	}
	

	@PostMapping("insert")
	public User insertUser(@RequestBody User user) {
		return userService.insertUser(user);
	}

	@GetMapping("allusers")
	public List<User> Users() {
		return userService.getUsers();
	}

	@GetMapping("userById/{id}")
	public User UserById(@PathVariable int id) {
		return userService.getUserById(id);
	}

	@PatchMapping("/{id}")
	public User updateUserById(@PathVariable int id, @RequestBody UserUpdateDto dto){
	    return userService.updateById(id, dto);
	}

	@DeleteMapping("deleteById/{id}")
	public String deleteById(@PathVariable("id") int id) {
		return userService.deleteById(id);
	}

}
