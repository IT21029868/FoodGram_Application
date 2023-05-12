package com.zos.services;

import java.util.List;

import com.zos.exception.ReeelException;
import com.zos.exception.UserException;
import com.zos.model.Reels;

public interface ReelService {
	
	public Reels createReels(Reels reel, Integer userId)throws UserException;
	public Reels findReelById(Integer reelId) throws ReeelException;
	
	public String deleteReels(Integer reelId, Integer userId)throws UserException, ReeelException;
	
	public Reels editReels(Reels reel, Integer userId) throws ReeelException;
	
	public List<Reels> getAllReels() throws ReeelException;

}
