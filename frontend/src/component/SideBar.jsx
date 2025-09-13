import React, { useContext } from 'react';
import {
  Article as ArticleIcon,
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminPanelSettings,
  ManageSearch as ManageSearchIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const SideBar = () => {
  const location = useLocation();
  const { setLogin, setUserInfo, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add your logout logic here
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    //  redirect to login page 
    navigate('/');
  };

  return (
    <div className="flex-[0.2] bg-[#0b0b5a] text-white h-screen shrink-0">
      <div className="p-5 flex flex-col items-center justify-center">
        <ArticleIcon sx={{ fontSize: 54, marginBottom: 8 }} />
        <div className="text-2xl">Resume Screening</div>
      </div>
      <div className="mt-5">

        <Link to={"/dashboard"} className={["p-5 flex gap-2.5 items-center text-[22px] cursor-pointer text-white no-underline", location.pathname === '/dashboard' ? 'bg-blue-600' : ''].join(' ')}>
          <DashboardIcon className="text-[22px]" />
          <div>Dashboard</div>
        </Link>


        <Link
          to="/history"
          className={`flex items-center gap-2 px-5 py-4 text-[22px] cursor-pointer no-underline ${location.pathname === '/history' ? 'bg-blue-600' : ''
            }`}
        >
          <ManageSearchIcon sx={{ fontSize: 22 }} />
          <span>History</span>
        </Link>


        {
          userInfo?.role === 'admin' && <Link to={"/admin"} className={["p-5 flex gap-2.5 items-center text-[22px] cursor-pointer text-white no-underline", location.pathname === '/admin' ? 'bg-blue-600' : ''].join(' ')}>
            <AdminPanelSettings className="text-[22px]" />
            <div>Admin</div>
          </Link>

        }

        <div
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-4 text-[22px] cursor-pointer"
        >
          <LogoutIcon sx={{ fontSize: 22 }} />
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
