


// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Library/firebase';
// import { Link } from 'react-router-dom';
// import chat from "../assets/chat2.gif"
// import { FcGoogle } from "react-icons/fc";


// const Login = () => {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { email, password } = Object.fromEntries(formData);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Login successful!");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='flex bg-blue-900'>
//     <div className="text-gray-700 flex flex-col items-start w-full max-w-lg mt-8 mx-auto p-6 sm:p-8">
//       <ToastContainer />
      
//       <div className="login flex flex-col items-start w-full p-6 sm:p-8 border rounded-lg shadow-sm">
//         <h2 className="text-left text-2xl font-semibold text-gray-800 mb-2">Welcome back!</h2>
//         <p className="text-gray-500 text-sm mb-6">Please enter your details to access your account</p>
        
//         <form
//           className="flex flex-col gap-5 w-full"
//           onSubmit={handleLogin}
//         >
//           <div className="space-y-1.5">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               name="email"
//               className="outline-none py-2.5 px-4 border border-gray-300 rounded-md w-full text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeh9lder="Enter your password"
//               name="password"
//               className="outline-none py-2.5 px-4 border border-gray-300 rounded-md w-full text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//             />
//           </div>

//           <button
//             disabled={loading}
//             className="mt-2 py-2.5 px-4 w-full rounded-md bg-[#041D56] text-white font-medium shadow-sm hover:bg-[#032d75] disabled:opacity-50 transition-colors"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </button>

//           <button
//             className="mt-2 py-2.5 px-4 w-full flex font-semibold  gap-2 items-center justify-center rounded-md  text-blue-700 border-blue-700 border shadow-sm hover:bg-[#032d75] disabled:opacity-50 transition-colors"
//           >
//             <FcGoogle className='text-2xl'/>
//                   Sign in with google
//           </button>

//           <p className="text-center text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-blue-600 font-medium hover:text-blue-700">
//           Sign up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>

// <div className="div-2 ">
// <img src={chat} alt="" className='w-[600px] h-[600px] ' />
// </div>

//     </div>
//   );
// }

// export default Login;






import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Library/firebase';
import { Link, useNavigate } from 'react-router-dom';
import chatGif from "../assets/chat2.gif";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate('/'); // Redirect after successful login
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <ToastContainer position="top-right" />
      
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center p-8">
          <img 
            src={chatGif} 
            alt="Chat illustration" 
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="px-4 text-gray-500 text-sm bg-white -mt-3">or</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300 disabled:opacity-50 gap-2"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>

            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;