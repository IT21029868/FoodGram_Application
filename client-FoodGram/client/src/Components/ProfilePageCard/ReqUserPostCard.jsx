import React, { useEffect, useState } from 'react';
import "./ReqUserPostCard.css";
import {AiFillHeart} from "react-icons/ai";
import {FaComment} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CommentModal from "../Comment/CommentModal";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference,
} from "../../Config/Logic"
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../Redux/Post/Action";


const ReqUserPostCard = ({post}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [numberOfLikes, setNumberOfLike] = useState(0);
  const data = {
    jwt: token,
    postId: post.id,
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
  };
  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = (postId) => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const navigate = useNavigate();
  const handleOpenCommentModal = () => {
    navigate(`/p1/${post.id}`);
    onOpen();
  };

  return (
    <div className='p-2'>
        <div className='post w-60 h-60'>
            <img className=' cursor-pointer'src={post?.image} alt="" />
            <div className='overlay'>
                <div className='overlay-text flex justify-between '>
                    <div className='flex items-center'><AiFillHeart className='mr-2'/> <span>{post?.likedByUsers?.length}</span></div>
                    <div className='flex items-center'><FaComment className='mr-2'onClick={handleOpenCommentModal}/> <span>{post?.comments?.length}</span></div>
                </div>
            </div>
        </div>
        <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  )
}

export default ReqUserPostCard