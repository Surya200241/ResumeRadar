import { Skeleton } from '@mui/material';
import WithAuthHOC from '../utils/HOC/withAuthHOC';
import { useState, useEffect, useContext } from 'react';
import axios from '../utils/axios';
import { AuthContext } from '../utils/AuthContext';

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    setLoader(true);
    const fetchUserData = async () => {
      // Fetch logic here...
      try {
        const result = await axios.get(`/api/resume/get/${userInfo._id}`);
        //console.log("Result",result)
        setLoader(true);
        setData(result.data.resumes);
      }

      catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data. Please try again later.');
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex-[0.8] h-screen overflow-auto p-12 bg-[whitesmoke] box-border">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loader && (
          <>
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={266}
                height={200}
                sx={{ borderRadius: '20px' }}
              />
            ))}
          </>
        )}

        {!loader &&
          data.map((item) => (
            <div
              key={item._id}
              className="w-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] rounded-2xl p-5 box-border bg-white"
            >
              <div className="text-[34px] text-center font-semibold text-gray-800">
                {item.score}%
              </div>
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Resume Name:</span> {item.resume_name}
              </p>
              <p className="mt-1 text-sm text-gray-700">{item.feedback}</p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-medium">Dated:</span> {item.createdAt.slice(0, 10)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WithAuthHOC(History);
