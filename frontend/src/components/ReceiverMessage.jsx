import React, { useEffect, useRef } from 'react'
import dp from "../assets/dpIcon.webp"
import { useSelector } from 'react-redux'

function ReceiverMessage({ image, message }) {
  const scroll = useRef()
  const { selectedUser } = useSelector(state => state.user)

  const scrollToBottom = () => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [message, image])

  return (
    <div className="flex items-start gap-[10px]">
      {/* Profile Image */}
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg">
        <img 
          src={selectedUser?.image || dp} 
          alt="Profile" 
          className="h-full w-full object-cover" 
        />
      </div>

      {/* Message Bubble */}
      <div 
        ref={scroll} 
        className="w-fit max-w-[80%] md:max-w-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)] text-white text-[19px] rounded-tl-none rounded-2xl relative shadow-gray-400 shadow-lg flex flex-col gap-[10px]"
      >
        {image && (
          <img 
            src={image} 
            alt="Message Attachment" 
            className="w-[150px] rounded-lg object-cover"
            onLoad={scrollToBottom}
            onError={(e) => e.target.style.display = "none"}
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  )
}

export default ReceiverMessage
