package com.example.Hostel.Hub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Hostel.Hub.Model.Complaints;
import com.example.Hostel.Hub.Service.ComplaintsService;

@RestController
@RequestMapping("OwnerComplaintController")

public class OwnerComplaintController {
      @Autowired
      ComplaintsService complaintservice;
      
      @GetMapping("getComplaints")
      public List<Complaints> getAllComplaints(){
    	        return complaintservice.getAllComplaints();
      }
      
      @PatchMapping("updateResponse/{id}/ok")
      public Complaints updateResponse(@PathVariable int id,@RequestParam String response) {
    	      return complaintservice.updateResponse(id,response);
      }
}

