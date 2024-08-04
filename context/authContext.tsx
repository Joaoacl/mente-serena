import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";

interface User {
    id: string;
    email: string;
    username: string;
    profileUrl: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: AuthCredentials) => Promise<{ success: boolean; data?: any; msg?: string }>;
    logout: () => Promise<{ success: boolean; msg?: string; error?: any }>;
    register: (credentials: RegisterCredentials) => Promise<{ success: boolean; data?: any; msg?: string }>;
}

interface AuthCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials extends AuthCredentials {
    username: string;
    profileUrl: string;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {

                await updateUserData(firebaseUser.uid, firebaseUser.email || "")
                setIsAuthenticated(true)
                
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub
    }, [])

    const updateUserData = async (userId: string, email: string) => {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            let data = docSnap.data()
            setUser({
                id: userId,
                email: email,
                username: data.username,
                profileUrl: data.profileUrl,
            })
        }
    }

    const login = async ({ email, password }: AuthCredentials) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { success: true }
        } catch (e: any) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido!'
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou senha inválidos!'
            return { success: false, msg }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            return { success: true }
        } catch (e: any) {
            return { success: false, msg: e.message, error: e }
        }
    }

    const register = async ({ email, password, username, profileUrl }: RegisterCredentials) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('response.user :', response?.user)

            //setUser(response?.user)
            //setIsAuthenticated(true)

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            })
            return { success: true, data: response?.user }
        } catch (e: any) {
            let msg = e.message
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido'
            if (msg.includes('(auth/weak-password)')) msg = 'Sua senha deve conter no mínimo 6 caractéres'
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Este e-mail já esta em uso'
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error('useAuth deve ser encapsulado dentro do AuthContextProvider')
    }
    return value
}