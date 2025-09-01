import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dpIcon.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  let { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
  let [search, setSearch] = useState(false)
  let [input, setInput] = useState("")
  let [loading, setLoading] = useState(false)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const searchInputRef = useRef(null)

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handlesearch = async () => {
    setLoading(true)
    try {
      let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (input) {
      handlesearch()
    }
  }, [input])

  useEffect(() => {
    if (search && searchInputRef.current) {
      searchInputRef.current.focus()
    }
    if (!search) {
      setInput("")
      dispatch(setSearchData([]))
    }
  }, [search, dispatch])

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearch(false)
    }
    if (e.key === "Enter") {
      e.preventDefault()
      handlesearch()
    }
  }

  return (
    <div className="lg:w-[30%] w-full h-screen flex flex-col bg-slate-200 relative transition-transform duration-500 ease-in-out
      overflow-hidden
      { !selectedUser ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' }"
    >
      {/* Header */}
      <div className='flex-shrink-0 h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
        <h1 className='text-white font-bold text-[25px]'>V2text</h1>
        <div className='w-full flex justify-between items-center'>
          <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData?.name || "user"}</h1>
          <div
            className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg hover:opacity-80'
            onClick={() => navigate("/profile")}
            title="Your profile"
          >
            <img src={userData?.image || dp} alt="" className='h-[100%]' />
          </div>
        </div>
        <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[18px]'>
          {!search && (
            <div
              className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg hover:opacity-80'
              onClick={() => setSearch(true)}
              title="Search users"
            >
              <IoIosSearch className='w-[25px] h-[25px]' />
            </div>
          )}
          {search && (
            <form
              className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative'
              onSubmit={e => e.preventDefault()}
            >
              <IoIosSearch className='w-[25px] h-[25px]' />
              <input
                ref={searchInputRef}
                type="text"
                placeholder='search users...'
                className='w-full h-full p-[10px] text-[17px] outline-none border-0'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDown={handleSearchKeyDown}
              />
              <RxCross2
                className='w-[25px] h-[25px] cursor-pointer hover:opacity-80'
                onClick={() => setSearch(false)}
                title="Close search"
              />
            </form>
          )}
          {!search && otherUsers?.map((user) => (
            onlineUsers?.includes(user._id) &&
            <div
              key={user._id}
              className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px] cursor-pointer hover:opacity-80'
              onClick={() => dispatch(setSelectedUser(user))}
              title={`Chat with ${user.name || user.userName}`}
            >
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center '>
                <img src={user.image || dp} alt="" className='w-full h-full object-cover' />
              </div>
              <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
            </div>
          ))}
        </div>
      </div>
      {/* User List/Search Results */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col">
          {search ? (
            <div className='flex flex-col items-center pt-[20px] gap-[10px] z-[150] shadow-lg bg-white'>
              {loading && (
                <div className="text-gray-500 text-[18px] py-2">Searching...</div>
              )}
              {!loading && searchData?.length === 0 && input.length > 0 && (
                <div className="text-gray-500 text-[18px] py-2">No users found</div>
              )}
              {searchData?.map((user) => (
                <div key={user._id}
                  className='w-[95%] h-[70px] flex items-center gap-[20px] px-[10px] hover:bg-[#78cae5] border-b-2 border-gray-400 cursor-pointer'
                  onClick={() => {
                    dispatch(setSelectedUser(user))
                    setInput("")
                    setSearch(false)
                  }}
                  title={`Chat with ${user.name || user.userName}`}
                  style={{ minHeight: 70, maxHeight: 80 }}
                >
                  <div className='relative flex items-center justify-center'>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-white'>
                      <img
                        src={user.image || dp}
                        alt=""
                        className='w-full h-full object-cover'
                      />
                    </div>
                    {onlineUsers?.includes(user._id) &&
                      <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1
                      className='text-gray-800 font-semibold text-[20px] break-words'
                      title={user.name || user.userName}
                      style={{ lineHeight: "1.2", whiteSpace: "normal" }}
                    >
                      {user.name || user.userName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-[20px] items-center mt-[20px]'>
              {otherUsers?.map((user) => (
                <div
                  key={user._id}
                  className={`w-[95%] h-[70px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#78cae5] cursor-pointer
                    ${selectedUser && selectedUser._id === user._id ? "ring-2 ring-[#20c7ff]" : ""}`}
                  onClick={() => dispatch(setSelectedUser(user))}
                  title={`Chat with ${user.name || user.userName}`}
                  style={{ minHeight: 70, maxHeight: 80 }}
                >
                  <div className='relative flex items-center justify-center'>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-white'>
                      <img
                        src={user.image || dp}
                        alt=""
                        className='w-full h-full object-cover'
                      />
                    </div>
                    {onlineUsers?.includes(user._id) &&
                      <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1
                      className='text-gray-800 font-semibold text-[20px] break-words'
                      title={user.name || user.userName}
                      style={{ lineHeight: "1.2", whiteSpace: "normal" }}
                    >
                      {user.name || user.userName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Logout button */}
      <div className="relative group">
        <div
          className='w-[60px] h-[60px] rounded-full flex justify-center items-center 
                     bg-[#20c7ff] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg 
                     fixed bottom-[20px] left-[10px] z-[200]
                     transition-all duration-300 ease-in-out 
                     hover:bg-[#1bb3e6] hover:scale-110 active:scale-95'
          onClick={handleLogOut}
           
        >
          <BiLogOutCircle className='w-[25px] h-[25px]' />
        </div>
        <span
          className='absolute left-[75px] bottom-[30px] px-2 py-1 rounded-md 
                     bg-black text-white text-xs opacity-0 
                     group-hover:opacity-100 transition-all duration-300 
                     transform translate-x-[-10px] group-hover:translate-x-0'
        >
          Logout
        </span>
      </div>
    </div>
  )
}

export default SideBar