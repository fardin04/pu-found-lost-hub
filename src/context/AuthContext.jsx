import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Loader from "@/components/ui/Loader";   // 🔥 IMPORT LOADER

// 1. Create Context
const AuthContext = createContext(null);

// 2. Hook
/* eslint-disable-next-line react-refresh/only-export-components */
export function useAuth() {
    return useContext(AuthContext);
}

// 3. Provider
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Email/Password Signup ---
    async function signupUser(email, password, profileData) {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create Firestore user profile
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: profileData.displayName || '',
                varsityId: profileData.stuId || '',
                department: profileData.deptName || '',
                createdAt: serverTimestamp(),
            });

            // Send verification email
            await sendEmailVerification(user);

            return userCredential;
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // --- Email Login ---
    async function loginUser(email, password) {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // --- Google Login ---
    async function loginWithGoogle() {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                hd: 'student.presidency.edu.bd',
            });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user.email || !user.email.endsWith('@student.presidency.edu.bd')) {
                await signOut(auth);
                throw new Error("Authentication failed: Only Presidency student emails are allowed.");
            }

            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            if (!snap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || "",
                    varsityId: "",
                    department: "",
                    createdAt: serverTimestamp(),
                });
            }

            return user;
        } catch (error) {
            console.error("Google login failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // --- Logout Function ---
    async function logoutUser() {
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

    // --- Verify Email ---
    function verifyEmail() {
        const user = auth.currentUser || currentUser;
        if (user) return sendEmailVerification(user);
        return Promise.reject(new Error("No user logged in."));
    }

    // --- Reset Password ---
    async function resetPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
        }
    }

    // --- Auth Listener ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user || null);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // 4. Context value
    const value = {
        currentUser,
        loading,
        signupUser,
        loginUser,
        logoutUser,
        verifyEmail,
        resetPassword,
        loginWithGoogle,
    };

    // 🔥 SHOW FULL SCREEN LOADER WHILE AUTH INITIALIZES
    return (
        <AuthContext.Provider value={value}>
            {!loading ? (
                children
            ) : (
                <div className="h-screen flex justify-center items-center bg-pu-blue">
                    <Loader size={60} color="white" />
                </div>
            )}
        </AuthContext.Provider>
    );
}
