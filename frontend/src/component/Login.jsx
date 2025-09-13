import React, { useContext } from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Login = () => {
  const { setLogin, setUserInfo,isLogin,userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
   try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    };

    // Send user data to your backend
    const response = await axios.post('/api/user', userData);
         console.log('Response:',response);
     console.log('Response data:', response.data);
    const createdUser = response.data.user;
   console.log('Created User:', createdUser);
    // Set auth context
    setUserInfo(createdUser);
    setLogin(true);
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('userInfo', JSON.stringify(createdUser));
    // Navigate after setting context
    navigate('/dashboard');
   
  } catch (error) {
    console.log(error.message);
   }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white/20 backdrop-blur-md flex items-center justify-center">
      <div className="bg-black text-white p-6 w-[30%] rounded-2xl sm:w-[80%]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <VpnKeyIcon />
        </div>

        <div
          onClick={handleLogin}
          className="bg-white text-black h-fit rounded-full py-4 px-6 w-full sm:w-auto max-w-full flex items-center justify-center gap-3 text-[12px] sm:text-[18px] lg:text-[22px] cursor-pointer"
        >
          <GoogleIcon sx={{ fontSize: 20, color: 'red' }} />
          Sign in with Google
        </div>

      </div>
    </div>
  );
};


export default Login;
