import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail, // Added for password reset
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Custom Hook to consume the Auth Context easily
/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
    return useContext(AuthContext);
}

// 3. The Context Provider Component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Core Authentication Functions ---

    /**
     * Handles full registration:
     * 1. Creates user in Firebase Auth.
     * 2. Saves custom profile (varsityId, displayName, department) to Firestore.
     * 3. Sends email verification link.
     */
    async function signup(email, password, displayName, stuId, deptName) {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user profile data in Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: displayName,
                varsityId: stuId,
                department: deptName,
                createdAt: serverTimestamp(),
            });

            // Send verification email
            await sendEmailVerification(user);
            return userCredential;
        } catch (error) {
            console.error("Signup failed:", error);
            throw error; // Let the UI handle errors
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setLoading(true);
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // --- Added Utility Functions ---

    function verifyEmail() {
        const user = auth.currentUser || currentUser;
        if (user) {
            return sendEmailVerification(user);
        }
        return Promise.reject(new Error("No user is currently logged in to verify."));
    }

    async function resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
        }
    }

    // --- Auth State Listener ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user || null);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // 4. Context Value
    const value = {
        currentUser,
        loading,
        signup,
        login,
        logout,
        verifyEmail,
        resetPassword, // Added
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? (
                children
            ) : (
                <div className="p-8 text-center text-pu-blue">
                    Initializing secure connection...
                </div>
            )}
        </AuthContext.Provider>
    );
}
