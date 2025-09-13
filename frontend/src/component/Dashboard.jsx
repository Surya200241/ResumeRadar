import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../utils/HOC/withAuthHOC';
import { useState, useContext } from 'react';
import axios from '../utils/axios';
import { AuthContext } from '../utils/AuthContext';

const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
 const [showModal, setShowModal] = useState(false);


  const { userInfo } = useContext(AuthContext);

  const handleOnChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  };


  const handleUpload = async () => {
    // Add upload logic here
    //   console.log('Current userInfo:', userInfo);
    if (!userInfo || !userInfo._id) {
      alert('User info is not loaded. Please login again.');
      return;
    }
    console.log(userInfo._id);
    setResult(null); // Clear previous result
    if (!resumeFile || !jobDesc) {
      alert("Please upload a resume file and fill the Job Description.");
      return;
    }
    console.log(userInfo._id)
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);

    //console.log('Uploading resume with:', { resumeFile, jobDesc, userId: userInfo._id });
    setLoading(true);
    try {
      const result = await axios.post('/api/resume/addResume', formData);
      setResult(result.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-[0.8] h-screen overflow-auto p-12 justify-between bg-[whitesmoke] box-border flex-wrap lg:flex-nowrap">
      {/* LEFT PANEL */}
      <div className="w-full self-start mt-5 lg:w-[70%] p-8 bg-[#f4f6fa] rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
        {/* HEADER */}
        <div className="mb-10">
          {/* Insert header content here */}
          <div className="text-[52px]">Resume Match Screening With AI</div>
        </div>

        {/* ALERT INFO */}
        <div className="text-[16px] w-full rounded-[30px] py-[15px] px-[20px] shadow-md my-10 text-base bg-white">
          {/* Insert alert content here */}
          <div>🔔Important Instructions:</div>
          <div className="px-4.5">
            <div>💬Please paste the complete job description in the "Job Description" field before submitting.</div>
            <div>📄Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </div>

        {/* UPLOAD RESUME */}
        <div className="w-full flex flex-col lg:flex-row gap-5 lg:gap-10 items-center">
          <div className="w-full sm:w-[65%] bg-white rounded-[30px] py-[15px] px-[30px] shadow-md text-[22px] break-words">
            {uploadFiletext ? uploadFiletext : "Upload Your Resume"}
          </div>

          <div className="flex items-center mt-4">
            <label
              htmlFor="inputField"
              className="text-[18px] cursor-pointer py-[20px] px-[40px] text-white font-bold bg-gradient-to-r from-[#fca326] to-[#f94a6b] rounded-[30px] border-[3px] border-black"
            >
              Upload Resume
            </label>
            <input type="file" accept=".pdf" id="inputField" className="hidden" onChange={handleOnChangeFile} />
          </div>
        </div>


        {/* JOB DESCRIPTION & ANALYZE */}
        <div className="gap-5 flex justify-between mt-[30px] ">
          <textarea
            value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste Your Job Description"
            rows={10}
            cols={100}
            className="outline-none rounded-[20px] border-2 border-[rgb(14,14,97)] py-[10px] px-[20px] w-[65%] resize-none"
          ></textarea>

          <div onClick={handleUpload} className="cursor-pointer text-white font-bold bg-gradient-to-r from-[#fca326] to-[#f94a6b] rounded-full border-[3px] border-black flex items-center justify-center w-[180px] h-[190px] text-[19px]">
            Analyze
          </div>
        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-[25%] self-start mt-10 lg:mt-5 bg-[#f4f6fa] rounded-2xl p-6 shadow-md flex flex-col gap-6">
        {/* TOP CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex flex-col items-center">
          <div className="text-[22px] font-bold">Analyze With AI</div>
          <img
            src={userInfo?.photoUrl}
            alt="Profile"
            className="w-[85px] h-[85px] rounded-full my-5"
          />
          <h2 className="text-lg font-semibold">{userInfo?.name}</h2>
        </div>

        {/* RESULT */}

        {
          result && <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center overflow-y-auto scroll-hide h-[420px] max-w-md mx-auto">
            {/* Title */}
            <div className="text-3xl font-extrabold text-gray-800 mb-6">Result</div>

            {/* Score Section */}
            <div className="flex justify-center items-center space-x-3 text-4xl font-bold text-indigo-600">
              <h1>{result?.score}%</h1>
              <CreditScoreIcon sx={{ fontSize: 28, color: '#4F46E5' }} />
            </div>

            {/* Feedback Section */}
            <div className="mt-8 px-6 py-4 max-w-xl mx-auto bg-gray-50 rounded-lg shadow-sm text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Feedback</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {result?.feedback || 'No feedback available.'}
              </p>
            </div>
          </div>

        }

        {/* my envention */}

        {
          result &&<button
          onClick={() => setShowModal(true)}
          className="mt-4cursor-pointer text-white font-bold bg-gradient-to-r from-[#fca326] to-[#f94a6b] rounded-[30px] border-[3px] border-black flex items-center justify-center font-semibold hover:underline focus:outline-none transition text-[20px] "
        >
          View Full
        </button>
        }

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl w-[95%] max-w-2xl p-8 shadow-xl relative overflow-y-auto max-h-[90vh]">

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              >
                ✕
              </button>

              {/* Title */}
              <div className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Full Result</div>

              {/* Score */}
              <div className="flex justify-center items-center space-x-3 text-4xl font-bold text-indigo-600 mb-6">
                <h1>{result?.score}%</h1>
                <CreditScoreIcon sx={{ fontSize: 32, color: '#4F46E5' }} />
              </div>

              {/* Feedback */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base text-[22px]">
                  {result?.feedback || 'No feedback available.'}
                </p>
              </div>
            </div>
          </div>
        )}


        {/* LOADING SKELETON */}

        {loading && (<div className="flex justify-center items-center">
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: '20px' }}
            width={210}
            height={210}
          />
        </div>)}


      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);
