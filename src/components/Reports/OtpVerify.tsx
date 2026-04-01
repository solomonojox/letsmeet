import React, { useContext, useEffect, useState } from 'react'
import { resendOtp } from '../../Services/passwordReset';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import { baseUrl } from '../../Services/baseUrl';
import { X } from 'lucide-react';
import { useAuth } from '../../Context/auth/useAuth';

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

interface OtpVerifyProps {
    onClose: () => void;
    open: boolean;
    next: (content: string) => void
    onfetch: () => void
}

const OtpVerify: React.FC<OtpVerifyProps> = ({ onClose, next, onfetch }) => {
    const { user } = useAuth();
    const { notifySuccess, notifyError, showOverlay, hideOverlay } = useContext(AppContext);
    // console.log(reference)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [message, setMessage] = useState('');
    const [code, setCode] = useState(new Array(4).fill(""));
    const [enteredCode, setEnteredCode] = useState('');
    const [isResending, setIsResending] = useState(false);

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

    const handleInput = (event: any, index: number) => {
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

    const handleKeyDown = (event: any, index: number) => {
        if (event.key === "Backspace" && code[index] === "") {
            // Move focus to previous input when Backspace is pressed
            if (index > 0) {
                event.target.previousElementSibling.focus();
            }
        }
    };

    const handleVerify = async () => {
        const enteredCode = code.join("");
        if (enteredCode.length < 4) {
            // setMessage("Please enter all 6 digits.");
            setLoginError("Please enter all 6 digits.");
            return;
        }
        setIsSubmitting(true);
        setLoginError("");

        try {
            const response = await axios.post(`${baseUrl}/api/Tokens/verify`, { tokenCode: enteredCode, referenceValue: user?.EmailAddress, tokenType: 'ACCESS' });

            if (response.data.status) {
                next('viewreport')
            }
        } catch (err: any) {
            const axiosError = err as any;
            console.log(axiosError);
            setLoginError(axiosError?.response?.data?.responseMessage || 'Server error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;
        setCode(new Array(4).fill(""));
        setIsResending(true);
        setLoginError("");
        showOverlay();

        try {
            const payload = {
                referenceValue: user?.EmailAddress,
                emailAddress: user?.EmailAddress,
                phoneNumber: null,
                tokenType: "ACCESS",
                durationInMinutes: 5,
                deliveryMethod: "Email",
                customTitle: "string"
            }
            const res = await resendOtp(payload);
            if (res.data.success === true) {
                setMessage("Verification code resent to your email.");
                setCanResend(false);
                setCountdown(60);
            } else {
                setMessage(res.data.message);
            }
        } catch (err: any) {
            setMessage(err.response.data.responseMessage || 'Server error. Please try again.');
        } finally {
            setIsResending(false);
            hideOverlay();
        }
    }

    const isCodeComplete = code.every((digit) => digit !== "");

    return (
        <div>
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn'></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full pointer-events-auto p-8 animate-scaleIn relative max-h-[90vh] overflow-y-auto space-y-4">
                    <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
                    <h2 className="text-2xl font-semibold mb-4 text-center">OTP Verification</h2>
                    <div className='border rounded-lg border-blue-500 bg-blue-100 p-2 text-blue-600'>
                        <p>A 4-digital PIN has been sent to your email! Kindly fill in it below</p>
                    </div>

                    {loginError && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{loginError}</div>
                    )}

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

                    <div className='flex gap-2'>
                        <button className='p-2 w-full border border-primary rounded-lg text-primary' onClick={onClose}>Close</button>

                        <button className={`p-2 w-full ${!isCodeComplete || isSubmitting ? 'bg-gray-500' : 'bg-primary'} rounded-lg text-white`} disabled={!isCodeComplete || isSubmitting} onClick={handleVerify}>
                            {isSubmitting ? 'Verifying...' : 'Verify'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerify