package com.example.Hostel.Hub.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Hostel.Hub.Model.RoomCardDto;
import com.example.Hostel.Hub.Model.Rooms;
import com.example.Hostel.Hub.Model.RoomsFloorDto;
import com.example.Hostel.Hub.Model.User;
import com.example.Hostel.Hub.Repo.RoomRepo;
import com.example.Hostel.Hub.Repo.UserRepo;

@Service
public class RoomService {

	@Autowired
	RoomRepo roomRepo;

	@Autowired
	UserRepo userRepo;
	
	public Rooms addRoom(Rooms room) {
	    return roomRepo.save(room);
	}

	public List<RoomsFloorDto> getFloorWiseRooms() {

		List<Rooms> allRooms = roomRepo.findAll();

		Map<Integer, List<Rooms>> floorMap = allRooms.stream()
				.collect(Collectors.groupingBy(Rooms::getFloorNumber));

		List<RoomsFloorDto> result = new ArrayList<>();

		for (Map.Entry<Integer, List<Rooms>> entry : floorMap.entrySet()) {

			RoomsFloorDto floorDto = new RoomsFloorDto();
			floorDto.setFloorNumber(entry.getKey());

			List<RoomCardDto> roomCards = new ArrayList<>();

			for (Rooms room : entry.getValue()) {
				long occupied = userRepo.countByRoomId(room.getId());

				RoomCardDto card = new RoomCardDto();
				card.setRoomNumber(room.getRoomNumber());
				card.setCapacity(room.getCapacity());
				card.setOccupied((int) occupied);
				card.setRoomId(room.getId()); // ✅ ADD THIS
				card.setVacancy(room.getCapacity() - (int) occupied);

				roomCards.add(card);
			}

			floorDto.setRooms(roomCards);
			result.add(floorDto);
		}

		return result;
	}

	public List<User> getUsersInRoom(Long roomId) {
	    return userRepo.findByRoomId(roomId);
	}

}
