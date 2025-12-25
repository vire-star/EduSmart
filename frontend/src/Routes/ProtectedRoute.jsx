import { useGetUserHook } from "@/hooks/User.hook"
import { useUserStore } from "@/Store/user.store"
import { useEffect } from "react"

import { Navigate } from "react-router-dom"

export const ProtectedRoutes =({children})=>{
    const setUser = useUserStore((state)=>state.setUser)
    const {data, isLoading, isError, error} = useGetUserHook()

    
    
    useEffect(()=>{
        if(data){
        setUser(data)
    }

    })
    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError ){
        return <Navigate to='/login' replace/>
    }
    if(!data){
        return <Navigate to='/login' replace/>
    }

    return children
}