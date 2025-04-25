import React from 'react';
import { LogIn } from 'lucide-react';
import { signInWithGoogle } from '../../services/auth';
import { useApp } from '../../context/AppContext';

const LoginButton: React.FC = () => {
  const { setCurrentUser } = useApp();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          photoURL: user.photoURL || '',
          interests: [],
          savedEvents: [],
          attendedEvents: []
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <LogIn size={18} />
      <span>Sign in with Google</span>
    </button>
  );
};

export default LoginButton;