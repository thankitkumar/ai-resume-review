import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContextType, User, TRIAL_DURATION_DAYS } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'hiringbit_auth';
const REMEMBER_KEY = 'hiringbit_remember';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const rememberMe = localStorage.getItem(REMEMBER_KEY) === 'true';
        const storage = rememberMe ? localStorage : sessionStorage;
        const storedData = storage.getItem(STORAGE_KEY);
        
        if (storedData) {
          const userData = JSON.parse(storedData);
          // Convert date strings back to Date objects
          userData.createdAt = new Date(userData.createdAt);
          userData.trialStartDate = new Date(userData.trialStartDate);
          userData.trialEndDate = new Date(userData.trialEndDate);
          userData.isTrialExpired = new Date() > userData.trialEndDate;
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading auth state');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (
    email: string, 
    password: string, 
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user exists in localStorage (mock database)
      const usersData = localStorage.getItem('hiringbit_users');
      const users: Record<string, User & { password: string }> = usersData ? JSON.parse(usersData) : {};
      
      const existingUser = Object.values(users).find(u => u.email === email);
      
      if (!existingUser) {
        return { success: false, error: 'No account found with this email address' };
      }
      
      // Simple password check (in production, this would be done server-side)
      if (existingUser.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      
      // Remove password from user object
      const { password: _, ...userData } = existingUser;
      
      // Update trial status
      userData.isTrialExpired = new Date() > new Date(userData.trialEndDate);
      
      // Store auth data
      localStorage.setItem(REMEMBER_KEY, rememberMe ? 'true' : 'false');
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY, JSON.stringify(userData));
      
      setUser({
        ...userData,
        createdAt: new Date(userData.createdAt),
        trialStartDate: new Date(userData.trialStartDate),
        trialEndDate: new Date(userData.trialEndDate),
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: {
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    role: 'hr_admin' | 'founder' | 'hiring_manager';
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for existing users
      const usersData = localStorage.getItem('hiringbit_users');
      const users: Record<string, User & { password: string }> = usersData ? JSON.parse(usersData) : {};
      
      const emailExists = Object.values(users).some(u => u.email === data.email);
      if (emailExists) {
        return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
      }
      
      const now = new Date();
      const trialEnd = new Date(now);
      trialEnd.setDate(trialEnd.getDate() + TRIAL_DURATION_DAYS);
      
      const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        email: data.email,
        fullName: data.fullName,
        companyName: data.companyName,
        role: data.role,
        password: data.password, // In production, this would be hashed server-side
        createdAt: now,
        trialStartDate: now,
        trialEndDate: trialEnd,
        isTrialExpired: false,
        isEmailVerified: false, // Would require email verification in production
      };
      
      // Store user in mock database
      users[newUser.id] = newUser;
      localStorage.setItem('hiringbit_users', JSON.stringify(users));
      
      // Auto-login after signup
      const { password: _, ...userData } = newUser;
      localStorage.setItem(REMEMBER_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
