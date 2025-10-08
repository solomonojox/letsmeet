import React, { useContext, useState } from 'react'
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { initiateResetPassword, resendOtp, resetPassword } from '../../Services/passwordReset';
import { AppContext } from '../../Context/AppContext';

export default function Password() {
    const user = JSON.parse(localStorage.getItem('letsmeetUser')!);
    const { notifySuccess, notifyError, showOverlay, hideOverlay } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetInitiated, setResetInitiated] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: user.email,
        passwordResetToken: "",
        password: "",
        confirmPassword: ""
    });
    const [initiateLoading, setInitiateLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleInitiateReset = async () => {
        setInitiateLoading(true);
        setError('');
        try {
            const res = await initiateResetPassword({ email: user.email });
            // console.log(res);
            setResetInitiated(true);
            setSuccess('We sent a reset token to your email. Enter it below to reset your password.');
        } catch (err: any) {
            setError(err?.response?.data?.responseMessage || 'Failed to initiate password reset.');
        } finally {
            setInitiateLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!formData.passwordResetToken || !formData.password) {
            setError('Token and password are required.');
            return;
        }
        setResetLoading(true);
        setError('');
        try {
            await resetPassword(formData);
            setSuccess('Password reset successfully!');
            setFormData({
                email: user.email,
                passwordResetToken: "",
                password: "",
                confirmPassword: ""
            });
            setResetInitiated(false); // reset flow back
        } catch (err: any) {
            setError(err?.response?.data?.responseMessage || 'Failed to reset password.');
        } finally {
            setResetLoading(false);
        }
    };

    const handleResend = async () => {
        showOverlay();
        setIsResending(true);

        try {
            const payload = {
                referenceValue: user.email,
                emailAddress: user.email,
                phoneNumber: null,
                tokenType: "PASSWORD_RESET",
                durationInMinutes: 5,
                deliveryMethod: "Email",
                customTitle: "string"
            }
            const res = await resendOtp(payload);
            if (res.data.success === true) {
                notifySuccess("Verification code resent to your email.");
            } else {
                notifySuccess(res.data.message);
            }
        } catch (err: any) {
            notifyError(err.response.data.responseMessage || 'Server error. Please try again.');
        } finally {
            setIsResending(false);
            hideOverlay();
        }
    }

    return (
        <div className="mt-10">
            {!resetInitiated ? (
                <div>
                    <button
                        type="button"
                        onClick={handleInitiateReset}
                        disabled={initiateLoading}
                        className="py-2 px-4 bg-primary hover:bg-primary/75 rounded-md text-white text-sm disabled:opacity-50"
                    >
                        {initiateLoading ? 'Initiating...' : 'Initiate Password Reset'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                </div>
            ) : (
                <>
                    <p className="text-sm text-green-600 bg-green-50 p-2 mb-4">
                        {success || 'Enter the reset token you received and your new password.'}
                    </p>

                    <div className="mb-4">
                        <label htmlFor="token" className="block text-gray-700 mb-2">
                            Reset Token
                        </label>
                        <input
                            type="text"
                            id="passwordResetToken"
                            name="passwordResetToken"
                            placeholder="Enter reset token"
                            value={formData.passwordResetToken}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                        />
                        <span>Did't recieve code? </span>
                        <button
                            type="button"
                            className={`${isResending ? 'text-gray-400' : 'text-primary hover:underline'} mt-2 font-semibold `}
                            disabled={isResending}
                            onClick={handleResend}
                        >Resend token</button>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            />
                            {showPassword ? (
                                <EyeIcon
                                    size={16}
                                    className="cursor-pointer absolute top-3 right-4"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <EyeOffIcon
                                    size={16}
                                    className="cursor-pointer absolute top-3 right-4"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            />
                            {showConfirmPassword ? (
                                <EyeIcon
                                    size={16}
                                    className="cursor-pointer absolute top-3 right-4"
                                    onClick={() => setShowConfirmPassword(false)}
                                />
                            ) : (
                                <EyeOffIcon
                                    size={16}
                                    className="cursor-pointer absolute top-3 right-4"
                                    onClick={() => setShowConfirmPassword(true)}
                                />
                            )}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={resetLoading}
                            className="w-full py-2 bg-primary hover:bg-primary/75 rounded-md text-white text-sm disabled:opacity-50"
                        >
                            {resetLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>

                    {success === 'Password reset successfully!' && (
                        <p className="text-green-500 text-sm mt-2">{success}</p>
                    )}
                </>
            )}
        </div>
    );
}
