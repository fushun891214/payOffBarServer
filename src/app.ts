import express, { Express } from 'express';
import cors from 'cors';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import friendRoutes from './routes/friendRoutes';

const app: Express = express();

// Middleware
app.use(cors());  // 處理跨來源資源共用的中間件
app.use(express.json()); // 將request的JSON格式轉換成JavaScript對象
app.use(express.urlencoded({ extended: true })); // 用來解析 URL-encoded 格式的請求體
app.use('/api/users',userRoutes);
app.use('/api/friends',friendRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.API_SERVER_PORT || 8081;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();