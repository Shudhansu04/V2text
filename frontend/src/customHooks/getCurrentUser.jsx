import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../main.jsx"
import { setUserData } from "../redux/userSlice.js"

const getCurrentUser=()=>{
    let dispatch=useDispatch()
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
                dispatch(setUserData(null))
>>>>>>> 275dec9 (update)
                console.log(error)
=======
               dispatch(setUserData(null))
>>>>>>> 9e51c04 (Update)
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser
