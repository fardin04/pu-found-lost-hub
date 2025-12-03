import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { toast } from 'react-hot-toast';
// Import Shadcn UI components
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';

// Import react-icons for eye toggle
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for toggle

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password);
      toast.success('Login successful! Welcome back!');
      navigate('/feed'); // Redirect to feed after successful login
    } catch (err) {
      const errorMessage = err.message || 'Invalid credentials. Please try again.';
      toast.error(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-secondary">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 placeholder-gray-700" 
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-secondary">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 pr-10 placeholder-gray-100" 
              />
              <span
                className="absolute right-3 top-9 transform -translate-y-1/2 cursor-pointer text-gray-500" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-light text-white mt-2 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <span
              className="text-secondary text-bold hover:underline cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
