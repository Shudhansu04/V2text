import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dpIcon.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice.js';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage.jsx';
import ReceiverMessage from './ReceiverMessage.jsx';
import axios from 'axios';
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice.js';

function MessageArea() {
  let {selectedUser,userData,socket}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let [showPicker,setShowPicker]=useState(false)
  let [input,setInput]=useState("")
  let [frontendImage,setFrontendImage]=useState(null)
  let [backendImage,setBackendImage]=useState(null)
  let [loading, setLoading] = useState(false)
  let [isTyping, setIsTyping] = useState(false)
  let image=useRef()
  let inputRef = useRef()
  let messagesEndRef = useRef()
  let {messages}=useSelector(state=>state.message)

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showPicker]);

  // Typing indicator logic
  useEffect(() => {
    if (!socket || !selectedUser) return;
    socket.on("typing", (fromId) => {
      if (fromId === selectedUser._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      }
    });
    return () => socket.off("typing");
  }, [socket, selectedUser]);

  // Emit typing event
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (socket && selectedUser) {
      socket.emit("typing", selectedUser._id);
    }
  };

  const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setFrontendImage(null)
    setBackendImage(null)
  }

  const handleSendMessage=async (e)=>{
    e.preventDefault()
    if(input.length===0 && backendImage==null){
      return 
    }
    setLoading(true)
    try {
      let formData=new FormData()
      formData.append("message",input)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus()
      }, 100)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const onEmojiClick =(emojiData)=>{
    setInput(prevInput=>prevInput+emojiData.emoji)
    setShowPicker(false)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 100)
  }

  // Enter to send, Shift+Enter for newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  useEffect(()=>{
    if (!socket) return;
    socket.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=>socket.off("newMessage")
  },[messages,setMessages,socket,dispatch])

  return (
    <div className={`lg:w-[70%] relative   ${selectedUser?"flex":"hidden"} lg:flex  w-full h-full bg-slate-200 border-l-2 border-gray-300 overflow-hidden`}>
      {selectedUser && 
      <div className='w-full h-[100vh] flex flex-col overflow-hidden gap-[20px] items-center'>
        <div className='w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg gap-[20px] flex items-center px-[20px] '>
          <div className='cursor-pointer hover:opacity-80' title="Back" onClick={()=>dispatch(setSelectedUser(null))}>
            <IoIosArrowRoundBack className='w-[40px] h-[40px] text-white'/>
          </div>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' >
            <img src={ selectedUser?.image || dp} alt="" className='h-[100%]'/>
          </div>
          <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "user"}</h1>
        </div>

        <div className='w-full h-[70%] flex flex-col py-[30px]  px-[20px] overflow-auto gap-[20px] '>
          {showPicker && 
            <div className='absolute bottom-[120px] left-[20px] z-[100]'>
              <EmojiPicker width={250} height={350} className='shadow-lg' onEmojiClick={onEmojiClick}/>
            </div> 
          }

          {messages && messages.map((mess, idx)=>(
            mess.sender===userData._id
              ? <SenderMessage key={idx} image={mess.image} message={mess.message}/>
              : <ReceiverMessage key={idx} image={mess.image} message={mess.message}/>
          ))}
          {/* Typing indicator */}
          {isTyping && (
            <div className="text-gray-500 text-[16px] px-2">Typing...</div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div> 
      }
      {selectedUser && 
        <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center '>
          {/* Image preview with remove option */}
          {frontendImage && (
            <div className='absolute bottom-[100px] right-[20%] flex items-center'>
              <img src={frontendImage} alt="" className='w-[80px] rounded-lg shadow-gray-400 shadow-lg'/>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="ml-[-20px] bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center shadow hover:opacity-80"
                title="Remove image"
                style={{marginLeft: '-20px', zIndex: 10}}
              >
                <span className="text-gray-700 text-[18px] font-bold">&times;</span>
              </button>
            </div>
          )}
          <form className='w-[95%] lg:w-[70%] h-[60px] bg-[rgb(23,151,194)] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px] relative' onSubmit={handleSendMessage}>
            <div onClick={()=>setShowPicker(prev=>!prev)} className="hover:opacity-80" title="Emoji">
              <RiEmojiStickerLine  className='w-[25px] h-[25px] text-white cursor-pointer'/>
            </div>
            <input type="file" accept="image/*" ref={image} hidden onChange={handleImage}/>
            <input
              ref={inputRef}
              type="text"
              className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white bg-transparent placeholder-white'
              placeholder='Message'
              onChange={handleInputChange}
              value={input}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <div onClick={()=>image.current.click()} className="hover:opacity-80" title="Attach image">
              <FaImages className='w-[25px] h-[25px] cursor-pointer text-white'/>
            </div>
            {(input.length>0  ||  backendImage!=null) && (
              <button type="submit" disabled={loading} title="Send">
                {loading
                  ? <span className="text-white text-[16px] px-2">Sending...</span>
                  : <RiSendPlane2Fill className='w-[25px] cursor-pointer h-[25px] text-white'/>
                }
              </button>
            )}
          </form>
        </div>
      }
      {!selectedUser && 
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to V2text</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Chat Friendly !</span>
        </div>
      }
    </div>
  )
}

export default MessageArea