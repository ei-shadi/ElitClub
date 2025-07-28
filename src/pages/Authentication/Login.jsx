import { useState } from 'react';
import {
  FaUserCircle, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAxios from '../../hooks/useAxios';




const Login = () => {
  const { logInUser, setUser } = useAuth();
  const provider = new GoogleAuthProvider();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const axiosInstance = useAxios();


  const onSubmit = data => {
    const { email, password } = data;

    // Login User
    logInUser(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully!',
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-[#FF02CB] font-bold text-2xl">${user.email}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: 'user',
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          last_login: new Date().toISOString()
        }
        setUser(user);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully with Google!',
          html: `<span class="font-bold text-green-500 text-2xl">Welcome <span class="text-[#FF02CB] font-bold text-2xl">${user.displayName}</span></span>`,
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        });
        navigate(location.state ? location.state : '/');
        await axiosInstance.post('/users', userInfo);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-black text-white flex items-center justify-center">
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
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Welcome Back</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-[#FF02CB] text-lg" />
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                  <FaLock className="text-[#FF02CB] text-lg" />
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-[#FF02CB] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute top-4 right-3 cursor-pointer bg-[#FF02CB] p-1 rounded-full text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF02CB] hover:bg-black hover:scale-105 text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#FF0000] hover:bg-black md:text-xl hover:scale-105 cursor-pointer text-white font-semibold py-3 rounded-xl transition duration-300 mt-2"
            >
              <FaGoogle className="text-xl" />
              Sign in with Google
            </button>
          </div>

          <div className="flex justify-center items-center gap-1.5 mt-4">
            <p className="text-sm text-gray-700">Don’t have an account?</p>
            <Link
              to="/auth/register"
              className="text-[#FF02CB] text-sm font-medium hover:text-[#FF0000] hover:underline hover:scale-105 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
