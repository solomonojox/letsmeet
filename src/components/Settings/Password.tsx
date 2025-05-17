import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Password() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="mt-10">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                    Change Password
                </label>
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="title"
                        name="title"
                        placeholder="Enter password"
                        // value={planData.title}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                    />

                    {showPassword && (
                        <EyeIcon
                            size={16}
                            className="cursor-pointer absolute top-3 right-4"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                    {!showPassword && (
                        <EyeOffIcon
                            size={16}
                            className="cursor-pointer absolute top-3 right-4"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 mb-2">
                    Confirm Password
                </label>
                <div className='relative'>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="price"
                        name="price"
                        placeholder="Confirm password"
                        // value={planData.price}
                        // onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                    />

                    {showConfirmPassword && (
                        <EyeIcon
                            size={16}
                            className="cursor-pointer absolute top-3 right-4"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}
                    {!showConfirmPassword && (
                        <EyeOffIcon
                            size={16}
                            className="cursor-pointer absolute top-3 right-4"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    type="button"
                    // onClick={handleSubmit}
                    className="w-full py-2 bg-primary hover:bg-primary/75 text-primary rounded-md text-white text-sm"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
