// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaLock, FaEnvelope, FaPhone, FaUser, FaCheck } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import imageAsset from '../../assets/imageAsset';

// // const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

// interface FormData {
//     username: string;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
// }

// interface FormErrors {
//     username?: string;
//     firstName?: string;
//     lastName?: string;
//     phoneNumber?: string;
//     email?: string;
//     password?: string;
//     confirmPassword?: string;
// }

// const SignUp = () => {
//     const [formData, setFormData] = useState<FormData>({
//         username: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [errors, setErrors] = useState<FormErrors>({});
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [success, setSuccess] = useState<boolean>(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const validate = (): FormErrors => {
//         const newErrors: FormErrors = {};
//         if (!formData.username) newErrors.username = 'Username is required';
//         if (!formData.firstName) newErrors.firstName = 'First name is required';
//         if (!formData.lastName) newErrors.lastName = 'Last name is required';
//         if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 8) {
//             newErrors.password = 'Password must be at least 8 characters';
//         }
//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }
//         return newErrors;
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const res = await axios.post(`/api/users/register`, formData);

//             console.log(res);
//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 setSuccess(true);
//                 // Reset form after successful submission
//                 setFormData({
//                     username: '',
//                     firstName: '',
//                     lastName: '',
//                     phoneNumber: '',
//                     email: '',
//                     password: '',
//                     confirmPassword: ''
//                 });
//             }, 500);
//         } catch (error) {
//             console.error('Sign-up failed:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
//             <div className="w-full bg-white overflow-hidden">
//                 <div className="md:flex">
//                     {/* Left Side - Visuals */}
//                     <div className="md:w-3/5 bg-gradient-to-br from-primary/75 to-primary p-8 text-white hidden md:flex flex-col justify-center relative h-screen">
//                         <img src={imageAsset.signup} alt="" className='absolute z-0 inset-0 top-0 left-0 w-full h-full object-cover'/>
//                     </div>

//                     {/* Right Side - Form */}
//                     <div className="md:w-2/5 p-8 md:h-screen overflow-y-auto">
//                         <div className="text-center mb-8">
//                             <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
//                             <p className="text-gray-600 mt-2">Join thousands of organizations transforming through learning</p>
//                         </div>

//                         {success && (
//                             <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
//                                 <FaCheck className="mr-2" />
//                                 Account created successfully!
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                             <FaUser className="text-gray-400" />
//                                         </div>
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             value={formData.username}
//                                             onChange={handleChange}
//                                             className={`pl-10 w-full rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                             placeholder="john_doe"
//                                         />
//                                     </div>
//                                     {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                                     <input
//                                         type="text"
//                                         name="firstName"
//                                         value={formData.firstName}
//                                         onChange={handleChange}
//                                         className={`w-full rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                         placeholder="John"
//                                     />
//                                     {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                                     <input
//                                         type="text"
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleChange}
//                                         className={`w-full rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                         placeholder="Doe"
//                                     />
//                                     {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                                     <div className="relative">
//                                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                             <FaPhone className="text-gray-400" />
//                                         </div>
//                                         <input
//                                             type="tel"
//                                             name="phoneNumber"
//                                             value={formData.phoneNumber}
//                                             onChange={handleChange}
//                                             className={`pl-10 w-full rounded-lg border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                             placeholder="+234 (810) 123-4567"
//                                         />
//                                     </div>
//                                     {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <FaEnvelope className="text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                         placeholder="your@email.com"
//                                     />
//                                 </div>
//                                 {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <FaLock className="text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         className={`pl-10 w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                         placeholder="••••••••"
//                                     />
//                                 </div>
//                                 {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <FaLock className="text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="password"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         className={`pl-10 w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} outline-none focus:border-primary py-2 px-4`}
//                                         placeholder="••••••••"
//                                     />
//                                 </div>
//                                 {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                             </div>

//                             <div className="flex items-center">
//                                 <input
//                                     id="terms"
//                                     name="terms"
//                                     type="checkbox"
//                                     className="h-4 w-4 accent-primary focus:ring-primary border-gray-300 rounded"
//                                     required
//                                 />
//                                 <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                                     I agree to the <a href="#" className="text-primary hover:text-primary">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary">Privacy Policy</a>
//                                 </label>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`w-full bg-primary hover:bg-primary/80 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//                             >
//                                 {isSubmitting ? 'Creating Account...' : 'Create Account'}
//                             </button>
//                         </form>

//                         <div className="mt-6 text-center">
//                             <p className="text-sm text-gray-600">
//                                 Already have an account?{' '}
//                                 <Link to="/login" className="text-primary font-medium hover:text-primary/80">
//                                     Sign in
//                                 </Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;