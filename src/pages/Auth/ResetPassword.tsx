/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import imageAsset from '../../assets/imageAsset';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

const ResetPassword = () => {
  // const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (!password) return {
      length: false,
      uppercase: false,
      number: false,
      specialChar: false,
    };

    return {
      length: password.length >= 8 && password.length <= 20,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const passwordValidation = validatePassword(formData.password);

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
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const validation = !formData.confirmPassword || !formData.password || 
                      !passwordValidation.length || !passwordValidation.uppercase || 
                      !passwordValidation.number || !passwordValidation.specialChar;

  return (
    <div className="md:flex items-center justify-center">
      <div className="md:w-1/2 h-[100dvh] grid place-items-center bg-white overflow-y-auto md:p-12 mx-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-4 flex flex-col items-center">
            <img src={imageAsset.loginlogo} alt="logo" className="w-18" />
            <h1 className="text-2xl font-semibold text-gray-800">Reset Password</h1>
            <p className="text-gray-600 text-xs mt-2">Enter a new password</p>
          </div>

          {loginError && (
            <div className="mb-2 p-4 bg-red-100 text-red-700 rounded-lg">{loginError}</div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <FaCheck className="mr-2" />
              Logged in successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="md:space-y-2 space-y-8">
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
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <EyeIcon
                      size={18}
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOffIcon
                      size={18}
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              
              {/* Password validation indicators */}
              <div className="mt-2 text-xs text-gray-600">
                <p className={passwordValidation.length ? "text-green-500" : "text-gray-500"}>
                  {passwordValidation.length ? "✓" : "•"} 8-20 characters
                </p>
                <p className={passwordValidation.uppercase ? "text-green-500" : "text-gray-500"}>
                  {passwordValidation.uppercase ? "✓" : "•"} At least one uppercase letter
                </p>
                <p className={passwordValidation.number ? "text-green-500" : "text-gray-500"}>
                  {passwordValidation.number ? "✓" : "•"} At least one number
                </p>
                <p className={passwordValidation.specialChar ? "text-green-500" : "text-gray-500"}>
                  {passwordValidation.specialChar ? "✓" : "•"} At least one special character
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
                    } outline-none focus:border-primary py-2 px-4`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showConfirmPassword ? (
                    <EyeIcon
                      size={18}
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <EyeOffIcon
                      size={18}
                      className="cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </div>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                  Resetting in...
                </>
              ) : 'Reset'}
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-screen bg-primary hidden md:block">
        <img src={imageAsset.loginImage} alt="loginImg" className="w-full h-full " />
      </div>
    </div>
  );
};

export default ResetPassword;