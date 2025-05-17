import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  isLoggedIn: boolean;
  userType: 'teacher' | 'student' | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userType: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'student' | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 检查登录状态
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const type = localStorage.getItem('userType') as 'teacher' | 'student' | null;
    
    setIsLoggedIn(loggedIn);
    setUserType(type);

    // 如果未登录且不在登录页面，重定向到登录页
    if (!loggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router.pathname, router]);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 