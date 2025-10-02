/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import imageAsset from '../../assets/imageAsset';
import { AppContext } from '../../Context/AppContext';
import { jwtDecode } from 'jwt-decode';
import { baseUrl } from '../../Services/baseUrl';

interface FormData {
  reference: string;
  key: string;
}
interface FormErrors {
  reference?: string;
  key?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ reference: '', key: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showkey, setShowkey] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [token, setToken] = useState(['', '', '', '']); // 4 digits
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useContext(AppContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (loginError) setLoginError('');
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.reference) {
      newErrors.reference = 'reference is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.reference)) {
      newErrors.reference = 'reference is invalid';
    }
    if (!formData.key) {
      newErrors.key = 'key is required';
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
      const response = await axios.post(`${baseUrl}/api/User/Authenticate`, formData);
      // handle token from response if needed
      setLoginError('');
      setSuccess(true);
      notifySuccess('Otp sent to your email', 'success');
      // setShowTokenModal(true); // show modal after login
      navigate('/verify-otp', { state: { reference: formData.reference } });
    } catch (error: any) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setLoginError('Invalid credentials. Please try again.');
      } else if (error.response?.data.responseMessage) {
        setLoginError(error.response?.data.responseMessage);
      } else {
        setLoginError('Server error. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validation = !formData.reference || !formData.key; 

  // handle token input
  const handleTokenChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newToken = [...token];
      newToken[index] = value;
      setToken(newToken);
      // focus next input automatically
      if (value && index < 3) {
        const nextInput = document.getElementById(`token-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // console.log(formData.reference, token.join(''));

  const [isLoading, setIsLoading] = useState(false);
  const verifyToken = async () => {
    setIsLoading(true);
    const enteredToken = token.join('');
    try {
      const response = await axios.post(`${baseUrl}/api/User/ValidateLoginOtp`, { key: enteredToken, reference: formData.reference });
      // console.log(response);
      const token = response.data.data.token;
      localStorage.setItem('letsmeetToken', token);

      const decoded = jwtDecode<any>(token);
      const user = {
        id: decoded.UserId,
        name: decoded.name,
        email: decoded.EmailAddress,
        subject: decoded.Subject,
        username: decoded.UserName
      }
      localStorage.setItem('letsmeetUser', JSON.stringify(user));
      setShowTokenModal(false);
      notifySuccess('Login successful', 'success');
      navigate('/dashboard');
    } catch (error: any) {
      // const axiosError = error as AxiosError;
      notifyError(error.response?.data.responseMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* MAIN LOGIN SECTION */}
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
                  type="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-lg border ${errors.reference ? "border-red-500" : "border-gray-200"} outline-none focus:border-primary py-2 px-4`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.reference && <p className="mt-1 text-sm text-red-600">{errors.reference}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showkey ? "text" : "password"}
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-lg border ${errors.key ? "border-red-500" : "border-gray-200"} outline-none focus:border-primary py-2 px-4`}
                  placeholder="••••••••"
                />
                {showkey ? (
                  <EyeIcon
                    size={18}
                    className="cursor-pointer absolute top-3 right-4"
                    onClick={() => setShowkey(!showkey)}
                  />
                ) : (
                  <EyeOffIcon
                    size={18}
                    className="cursor-pointer absolute top-3 right-4"
                    onClick={() => setShowkey(!showkey)}
                  />
                )}
              </div>
              {errors.key && <p className="mt-1 text-sm text-red-600">{errors.key}</p>}
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
                <Link to="/forgot-key" className="text-primary hover:text-primary/80">
                  Forgot key?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={validation || isSubmitting}
              className={`w-full flex items-center justify-center ${validation ? "bg-gray-300" : "bg-primary hover:bg-primary/80"} text-white font-medium py-2 px-4 rounded-lg transition duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
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
        </div>
      </div>

      <div className="w-1/2 h-screen bg-primary hidden md:block">
        <img src={imageAsset.loginImage} alt="loginImg" className="w-full h-full " />
      </div>

      {/* FULL SCREEN MODAL */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md px-6 py-10 relative">
            <h2 className="text-xl font-semibold text-center mb-4">Verify Your Token</h2>
            <p className="text-gray-600 text-center mb-6">Enter the 4-digit code sent to you</p>

            <div className="flex justify-center gap-3 mb-10">
              {token.map((digit, idx) => (
                <input
                  key={idx}
                  id={`token-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleTokenChange(idx, e.target.value)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              ))}
            </div>

            <div className="flex justify-center gap-2">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-primary hover:text-white rounded-lg text-gray-700"
                onClick={() => {
                  setShowTokenModal(false);
                  setSuccess(false); // optionally reset success
                }}
              >
                Back to login
              </button>

              <button
                className="px-4 py-2 bg-primary hover:bg-primary/75 text-white rounded-lg"
                onClick={() => {
                  verifyToken();
                }}
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Verify token"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;