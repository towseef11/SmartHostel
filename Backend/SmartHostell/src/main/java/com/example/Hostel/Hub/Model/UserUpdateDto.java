package com.example.Hostel.Hub.Model;

import lombok.Data;

@Data
public class UserUpdateDto {
	 private String name;
	    private String email;
	    private String password;
	    private Long mobile;
	    private String roomNumber;
	    private Role role;
}
