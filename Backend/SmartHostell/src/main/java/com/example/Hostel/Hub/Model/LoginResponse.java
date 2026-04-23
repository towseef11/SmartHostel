package com.example.Hostel.Hub.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Role role;
    private Long userId;
    private String name;
}

