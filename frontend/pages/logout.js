import React, { useEffect, useContext } from 'react'
import AuthContext from '@/context/AuthContext'
const logout = () => {
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        logout()
    })
    return (
        <div className="container mx-auto px-20 text-center mt-5">
            Please wait while signing out...
        </div>
    )
}

export default logout
