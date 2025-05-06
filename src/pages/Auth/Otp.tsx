/* eslint-disable no-unused-vars */
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
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

const Otp = () => {
    // const baseUrl: string = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [message, setMessage] = useState('')
    const [code, setCode] = useState(new Array(4).fill(""));
    const [enteredCode, setEnteredCode] = useState('')
    const [isResending, setIsResending] = useState(false)

    const [countdown, setCountdown] = useState(0);
    const [canResend, setCanResend] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleInput = (event, index) => {
        const { maxLength, value } = event.target;
        if (/^\d*$/.test(value)) {
            // Only allow numbers
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setEnteredCode(newCode.join(""));

            // Move focus to next input if max length reached
            if (value.length === maxLength && event.target.nextElementSibling) {
                event.target.nextElementSibling.focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && code[index] === "") {
            // Move focus to previous input when Backspace is pressed
            if (index > 0) {
                event.target.previousElementSibling.focus();
            }
        }
    };

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
        return newErrors;
    };

    const handleVerify = async () => {
        const enteredCode = code.join("");
        if (enteredCode.length < 4) {
            // setMessage("Please enter all 6 digits.");
            setLoginError("Please enter all 6 digits.");
            return;
        }
        setIsSubmitting(true);
        // setMessage("");

        try {
            const response = await axios.post(`/customer/api/User/VerifyOtp`)

            console.log(response)
            setCanResend(false);
            // nextAction();
        } catch (err) {
            const axiosError = err as AxiosError;
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

    const handleResend = async () => {
        if (!canResend) return;
        setIsResending(true);
        setMessage("");

        try {
            const res = await axios.post(`/customer/api/User/ResendOtp`);
            if (res.data.success === true) {
                setMessage("Verification code resent to your email.");
                setCanResend(false);
                setCountdown(60);
            } else {
                setMessage(res.data.message);
            }
        } catch (err) {
            setMessage(err.response.data.responseMessage);
        } finally {
            setIsResending(false);
        }
    }

    const isCodeComplete = code.every((digit) => digit !== "");

    return (
        <div className="flex items-center justify-center">
            <div className="md:w-1/2 h-[100dvh] grid place-items-center bg-white overflow-y-auto p-12">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <img src={imageAsset.loginlogo} alt="logo" className="w-18" />
                        <h1 className="text-2xl font-semibold text-gray-800">OTP Code</h1>
                        <p className="text-gray-600 mt-2">Enter your 4-digit code</p>
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

                    <div className="">
                        <div className="flex justify-center gap-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="border font-[600] text-center text-[18px] outline-primary border-[#E4E4E7] rounded-md size-12 bt:size-10"
                                />
                            ))}
                        </div>

                        <p className='pt-6 text-center text-xs'>
                            {`Didn't receive the code?`}{" "}
                            <button
                                disabled={!canResend}
                                onClick={handleResend}
                                className={`${canResend ? "text-primary font-bold cursor-pointer" : "text-gray-400"
                                    } cursor-default`}
                            >
                                {canResend ? "Resend code" : `Resend code in ${countdown}s`}
                            </button>
                        </p>

                        <div className="mt-5">
                            <button
                                onClick={handleVerify}
                                disabled={!isCodeComplete || isSubmitting}
                                className={`text-xs w-full flex items-center justify-center h-8 font-[600] rounded-lg ${isCodeComplete
                                    ? "bg-primary text-white hover:bg-primary/85"
                                    : "bg-[#F4F4F5] text-[#A1A1AA]"
                                    } ${isSubmitting ? "cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying OTP...
                                    </>
                                ) : 'Verify'}
                            </button>
                        </div>
                    </div>
                    
                    {message && <p className={`${message === 'Verification code resent to your email.' ? 'text-red-600' : 'text-red'} font-semibold text-[12px] mt-2 text-center`}>{message}</p>}

                    <div className='flex justify-center mt-2'>
                        <Link
                            to={'/login'}
                            className={`text-primary hover:text-primary/80 transition duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-1/2 h-screen bg-primary hidden md:block">
                <img src={imageAsset.loginImage} alt="loginImg" className="w-full h-full " />
            </div>
        </div>
    )
}

export default Otp