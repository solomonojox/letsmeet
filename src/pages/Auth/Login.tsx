/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import imageAsset from '../../assets/imageAsset';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  // const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (loginError) setLoginError('');
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/users/login`, formData);

      console.log(response);
      setLoginError('');
      setSuccess(true);
      // localStorage.setItem('authToken', response.data.token);
      // navigate('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      if (axiosError.response?.status === 401) {
        setLoginError('Invalid credentials. Please try again.');
      } else {
        setLoginError('Server error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validation = !formData.email || !formData.password;

  return (
    <div className="flex items-center justify-center">
      <div className="md:w-1/2 h-[100dvh] grid place-items-center bg-white overflow-y-auto p-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 flex flex-col items-center">
            <img src={imageAsset.loginlogo} alt="logo" className="w-18" />
            <h1 className="text-2xl font-semibold text-gray-800">Sign in to your account</h1>
            <p className="text-gray-600 mt-2">Log in with your credentials</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{loginError}</div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <FaCheck className="mr-2" />
              Logged in successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"
                    } outline-none focus:border-primary py-2 px-4`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"
                    } outline-none focus:border-primary py-2 px-4`}
                  placeholder="••••••••"
                />
                {showPassword && (
                  <EyeIcon
                    size={18}
                    className="cursor-pointer absolute top-3 right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                {!showPassword && (
                  <EyeOffIcon
                    size={18}
                    className="cursor-pointer absolute top-3 right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 accent-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-primary hover:text-primary/80">
                  Forgot password? 
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={validation || isSubmitting}
              className={`w-full flex items-center justify-center ${validation ? "bg-gray-300" : "bg-primary hover:bg-primary/80"
                } text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign-in'}
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:text-primary/80">
                Sign up
              </Link>
            </p>
          </div> */}
        </div>
      </div>

      <div className="w-1/2 h-screen bg-primary hidden md:block">
        <img src={imageAsset.loginImage} alt="loginImg" className="w-full h-full " />
      </div>
    </div>
  );
};

export default Login;