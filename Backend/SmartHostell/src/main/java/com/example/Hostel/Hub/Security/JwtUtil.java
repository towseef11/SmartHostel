package com.example.Hostel.Hub.Security;

import java.security.Key;
import java.util.Date;


import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey"; // min 32 chars
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    // 🔹 Generate signing key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 🔥 Generate token with email, userId, role
    public String generateToken(String email, long userId, com.example.Hostel.Hub.Model.Role role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 🔹 Extract email
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 🔹 Extract userId
    public int extractUserId(String token) {
        return extractAllClaims(token).get("userId", Integer.class);
    }

    // 🔹 Extract role
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
    
    // Extract username
    public String extractUsername(String token) {
        return extractEmail(token); // same thing
    }

    // 🔹 Validate token
    public boolean validateToken(String token, String email) {
        String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }

    // 🔹 Check expiration
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // 🔹 Extract all claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
