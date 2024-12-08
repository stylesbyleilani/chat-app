









// import React, { useState } from 'react'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../Library/firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import upload from '../Library/Upload';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [avartar, setAvartar] = useState({ file: null, url: "" });
//   const [loading, setLoading] = useState(false)

//   const handleAvartar = (e) => {
//     if (e.target.files[0]) {
//       setAvartar({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0])
//       });
//     }
//   };
    
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true)
//     const formData = new FormData(e.target);
//     const { username, email, password } = Object.fromEntries(formData);
    
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const imgUrl = await upload(avartar.file)
      
//       await setDoc(doc(db, "users", res.user.uid), {
//         username,
//         email,
//         avartar: imgUrl,
//         id: res.user.uid,
//         blocked: []
//       });

//       await setDoc(doc(db, "userchats", res.user.uid), {
//         chats: []
//       });

//       toast.success("Account created successfully! You can login now!");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//       console.error("Error creating user and storing data:", error);
//     } finally {
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="register p-6 sm:p-8 w-full max-w-lg mx-auto border rounded-lg shadow-sm bg-white">
//       <h2 className="text-left text-2xl font-semibold text-gray-800">Sign up to Lerrap</h2>
//       <p className="text-gray-500 text-left text-sm mb-6">Please enter your details to access our app</p>

//       <form
//         className="flex flex-col gap-5 w-full"
//         onSubmit={handleRegister}
//       >
//         <div className="flex items-center gap-4">
//           <label
//             htmlFor="file"
//             className="cursor-pointer text-blue-600 font-medium hover:text-blue-700 transition-colors"
//             onClick={() => document.getElementById('file').click()}
//           >
//             Upload image
//           </label>
//           <img
//             src={avartar.url || "../assets/p1.jpg"}
//             alt="Avatar"
//             className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
//           />
//         </div>
//         <input
//           type="file"
//           id="file"
//           style={{ display: "none" }}
//           onChange={handleAvartar}
//         />

//         <div className="space-y-1.5">
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             name="username"
//             className="outline-none py-2.5 px-4 border border-gray-300 rounded-md w-full text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             name="email"
//             className="outline-none py-2.5 px-4 border border-gray-300 rounded-md w-full text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Create a password"
//             name="password"
//             className="outline-none py-2.5 px-4 border border-gray-300 rounded-md w-full text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
//           />
//         </div>

//         <button
//           disabled={loading}
//           className="mt-2 py-2.5 px-4 w-full rounded-md bg-[#041D56] text-white font-medium shadow-sm hover:bg-[#032d75] disabled:opacity-50 transition-colors"
//         >
//           {loading ? "Creating account..." : "Sign up"}
//         </button>

//         <p className="text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
//             Login
//           </Link>
//         </p>
//       </form>

//       <p className="text-center text-sm text-gray-500 mt-6">
//         By signing up, you agree to our Terms of Use and Privacy Policy.
//       </p>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Register







import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Library/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../Library/Upload';
import { Link, useNavigate } from 'react-router-dom';
import chatGif from "../assets/sign.gif";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from 'lucide-react';
import { serverTimestamp } from 'firebase/firestore';
const Register = () => {
  const [avartar, setAvatar] = useState({ file: null, url: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const formData = new FormData(e.target);
  //   const { username, email, password } = Object.fromEntries(formData);
    
  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password);
  //     const imgUrl = await upload(avartar.file)
      
  //     await setDoc(doc(db, "users", res.user.uid), {
  //       username,
  //       email,
  //       avartar: imgUrl,
  //       id: res.user.uid,
  //       blocked: []
  //     });

  //     await setDoc(doc(db, "userchats", res.user.uid), {
  //       chats: []
  //     });

  //     toast.success("Account created successfully!");
  //     navigate('/');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message || "Registration failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    
    try {
      // Validate input
      if (!username || !email || !password) {
        toast.error("Please fill in all fields");
        setLoading(false);
        return;
      }
  
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // Ensure imgUrl has a default value
      const imgUrl = avartar.file ? await upload(avartar.file) : "../assets/p1.jpg";
      
      // Add more robust error checking
      if (!res.user) {
        throw new Error("User creation failed");
      }
  
      // Prepare user data with default values
      const userData = {
        username: username || "Anonymous",
        email: email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
        createdAt: serverTimestamp() // Consider adding a timestamp
      };
  
      // Validate user data before writing
      await setDoc(doc(db, "users", res.user.uid), userData);
  
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });
  
      toast.success("Account created successfully!");
      navigate('/');
    } catch (error) {
      console.error("Detailed error:", {
        code: error.code,
        message: error.message,
        name: error.name
      });
  
      // More detailed error handling
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error("Email is already registered");
          break;
        case 'auth/invalid-email':
          toast.error("Invalid email format");
          break;
        case 'auth/weak-password':
          toast.error("Password is too weak");
          break;
        default:
          toast.error(`Registration failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };



  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const res = await signInWithPopup(auth, provider);
      
      await setDoc(doc(db, "users", res.user.uid), {
        username: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
        id: res.user.uid,
        blocked: []
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: []
      });

      toast.success("Google registration successful!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google registration failed");
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

        {/* Registration Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Sign up to start using our app
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Avatar Upload */}
            <div className="flex items-center justify-center mb-4">
              <label 
                htmlFor="file" 
                className="cursor-pointer relative"
              >
                <img
                  src={avartar.url || "../assets/p1.jpg"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 hover:border-blue-300 transition-all"
                />
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleAvatar}
                />
                <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                  +
                </span>
              </label>
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="px-4 text-gray-500 text-sm bg-white -mt-3">or</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300 disabled:opacity-50 gap-2"
            >
              <FcGoogle className="text-2xl" />
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;