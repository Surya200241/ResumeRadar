const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;

const path = require('path')
const allowedOrigins = [
  'http://localhost:5173',
  'https://resume-radar-indol.vercel.app', // replace with your deployed frontend URL
];

require('./conn');

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
  }
}));

const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/user',UserRoutes)
app.use('/api/resume',ResumeRoutes)




app.listen(PORT,()=>{
    console.log("backend is running on port",PORT)
})
