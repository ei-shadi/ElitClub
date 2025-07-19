import { useState } from 'react';
import {
  FaUserCircle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const Register = () => {
  const { createUser, setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch('password');

  const onSubmit = data => {
    const { name, email, password } = data;

    createUser(email, password, name)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully!',
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-[#FF02CB] font-bold text-2xl">${user.email}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        });
        navigate('/');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };


  return (
    <div className="min-h-screen bg-gradient-to-t from-black text-white flex items-center justify-center py-28">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          duration: 0.6,
        }}
        className="w-[90%] md:w-[70%] max-w-md"
      >
        <div className="bg-white text-black rounded-2xl shadow-xl p-10">
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-5xl text-[#FF02CB]" />
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Create Account</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <div>
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaUser className="text-[#FF02CB] text-lg" />
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: "Name is required" })}
                className={`mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF02CB] ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Your full name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-[#FF02CB] text-lg" />
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: "Email is required" })}
                className={`mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF02CB] ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaLock className="text-[#FF02CB] text-lg" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum 20 characters allowed",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "Must include uppercase, lowercase, number, and special character",
                    },
                  })}

                  className={`mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF02CB] ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute top-4 right-3 cursor-pointer bg-[#FF02CB] p-1 rounded-full text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaLock className="text-[#FF02CB] text-lg" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: "Please confirm password",
                    validate: value =>
                      value === password || "Passwords do not match",
                  })}
                  className={`mt-1 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF02CB] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute top-4 right-3 cursor-pointer bg-[#FF02CB] p-1 rounded-full text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF02CB] hover:bg-black hover:scale-105 text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer"
            >
              Register
            </button>
          </form>

          <div className="flex justify-center items-center gap-1.5 mt-4">
            <p className="text-sm text-gray-700">Already have an account?</p>
            <Link
              to="/auth/login"
              className="text-[#FF02CB] text-sm font-medium hover:text-[#FF0000] hover:underline hover:scale-105 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
