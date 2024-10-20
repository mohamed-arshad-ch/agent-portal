'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import Image from 'next/image';
import axios from 'axios';

export function LoginScreenComponent() {
  const router = useRouter(); // Initialize router
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });

      const { jwt, user } = response.data;

      // Save JWT and user details in localStorage
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login successful:', user);

      // Redirect to admin dashboard
      router.push('/admin-dash');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password. Please try again.');
    }
  };

  const LoginForm = ({ role }) => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center">
            <Image src="/Vizavostok icon.jpg" width={50} height={50} alt="Logo" />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Login as Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Admin Login</DialogTitle>
              </DialogHeader>
              <LoginForm role="Admin" />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                Login as Agent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agent Login</DialogTitle>
              </DialogHeader>
              <LoginForm role="Agent" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
