import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
      const [user, setUser] = useState(null)
    const getLoggedIn = async () => {
        try {
            const res = await axios.get('/loggedIn')
           setLoggedIn(res.data.isLoggedIn);
      setUser(res.data.user || null); // Set user data
        } catch (error) {
            console.error("Error checking login status:", error)
            setLoggedIn(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getLoggedIn()
    }, [])
    
    return (
        <AuthContext.Provider value={{ loggedIn, isLoading, getLoggedIn , user}}>
            {children}
        </AuthContext.Provider>
    )
}

// Remove the default export and only use named exports
// export default AuthContext