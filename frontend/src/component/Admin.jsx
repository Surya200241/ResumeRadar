import React, { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../utils/HOC/withAuthHOC';
import axios from '../utils/axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);
      try {
        const result = await axios.get('api/resume/get');
        setData(result.data.resumes);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
      } finally {
        setLoader(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex flex-[0.8] h-screen overflow-auto p-12 justify-between bg-whitesmoke box-border">
      <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {loader && (
          <>
            <Skeleton variant="rectangular" width={266} height={400} sx={{ borderRadius: '20px' }} />
            <Skeleton variant="rectangular" width={266} height={400} sx={{ borderRadius: '20px' }} />
            <Skeleton variant="rectangular" width={266} height={400} sx={{ borderRadius: '20px' }} />
          </>
        )}

        {
          data.map((item,index) => {
            return (
              <div key={index} className="w-full h-94 overflow-y-auto scroll-hide shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-[20px] p-5 box-border">
                <h2 className="text-2xl font-semibold">{item?.user?.name}</h2>
                <p className="text-blue-600">{item?.user?.email}</p>
                <h3 className="text-lg font-medium mt-2">Score: {item?.score}</h3>
                <p className="mt-2">{item?.feedback}</p>
              </div>
            );
          })
        }

      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);
