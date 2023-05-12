package com.zos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestController;

import com.zos.dto.UserDto;
import com.zos.exception.PostException;
import com.zos.exception.ReeelException;
import com.zos.exception.UserException;
import com.zos.model.Reels;
import com.zos.model.User;
import com.zos.response.MessageResponse;
import com.zos.services.ReelService;
import com.zos.services.UserService;

@RestController
@RequestMapping("/api/reels")
public class ReelController {
	
	@Autowired
	private ReelService reelService;
	
	@Autowired
	private UserService userService;
	

	
	@PostMapping("/create")
	public ResponseEntity<Reels> createPostHandler(@RequestBody Reels reel,@RequestHeader("Authorization") String token) throws UserException{
		
		
		User user=userService.findUserProfile(token);
		
		Reels createdReels = reelService.createReels(reel, user.getId());
		
		return new ResponseEntity<Reels>(createdReels, HttpStatus.CREATED);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Reels>> getAllReelHandler() throws ReeelException{
		
		
		List<Reels> reels=reelService.getAllReels();
		
		return new ResponseEntity<List<Reels>>(reels,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/delete/{reelId}")
	public ResponseEntity<MessageResponse> deleteReelHandler(@PathVariable Integer reelId, @RequestHeader("Authorization") String token) throws UserException,ReeelException{
		
		User reqUser=userService.findUserProfile(token);
		
		String message=reelService.deleteReels(reelId, reqUser.getId());
		
		MessageResponse res=new MessageResponse(message);
		
		return new ResponseEntity<MessageResponse> (res, HttpStatus.OK);
		
	}

	@PutMapping("/edit/")
	public ResponseEntity<MessageResponse> editPostHandler(@RequestBody Reels reels) throws ReeelException{
		reelService.editReels(reels, null);
		MessageResponse res=new MessageResponse("Post Updated Succefully");
		return new ResponseEntity<MessageResponse>(res,HttpStatus.OK);
	}

}
