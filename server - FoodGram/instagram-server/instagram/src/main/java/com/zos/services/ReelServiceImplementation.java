package com.zos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zos.dto.UserDto;
import com.zos.exception.ReeelException;
import com.zos.exception.UserException;
import com.zos.model.Reels;
import com.zos.model.User;
import com.zos.repository.ReelRepository;
import com.zos.repository.UserRepository;

@Service
public class ReelServiceImplementation implements ReelService {
	
	@Autowired
	private ReelRepository reelRepository;

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Reels createReels(Reels reel, Integer userId) throws UserException {
		
		User user = userService.findUserById(userId);
		
		UserDto userDto=new UserDto();
		
		userDto.setEmail(user.getEmail());
		userDto.setUsername(user.getUsername());
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setUserImage(user.getImage());
		
		reel.setUser(userDto);
		
		
		
			Reels createdReels =reelRepository.save(reel);
			
		
		return createdReels;
	}
	

	@Override
	public String deleteReels(Integer reelId, Integer userId) throws UserException, ReeelException{
		Reels reels =findReelById(reelId);
		
		User user=userService.findUserById(userId);
		System.out.println(reels.getUser().getId()+" ------ "+user.getId());
		if(reels.getUser().getId().equals(user.getId())) {
			System.out.println("inside delete");
			reelRepository.deleteById(reelId);
		
		return "Reel Deleted Successfully";
		}
		
		
		throw new ReeelException("You Dont have access to delete this reel");
		
	}

	@Override
	public Reels editReels(Reels reel, Integer userId) throws ReeelException {
		Reels iReels=findReelById(reel.getId());
		
		if(reel.getCaption()!=null) {
			iReels.setCaption(reel.getCaption());
		}
		
		
		return reelRepository.save(iReels);
		
	}


	@Override
	public List<Reels> getAllReels() throws ReeelException {
		List<Reels> reels=reelRepository.findAll();
		return reels;
	}


	@Override
	public Reels findReelById(Integer reelId) throws ReeelException {
		Optional<Reels> opt = reelRepository.findById(reelId);
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new ReeelException("Reel not exist with id: "+reelId);
	}


	

	





	

}
