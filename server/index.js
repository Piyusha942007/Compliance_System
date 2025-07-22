import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import complianceRoutes from './routes/compliance.js'; // ✅ Use import instead of require

dotenv.config();
console.log("📦 ENV loaded:", process.env.MONGO_URI ? "✅ Yes" : "❌ No MONGO_URI");

const app = express();
const PORT = process.env.PORT || 5000;
// At the top, before your routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb', extended: true }));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/compliance", complianceRoutes); // ✅ Moved and corrected

app.get('/', (req, res) => {
  res.send('College ERP API');
});

console.log("🔌 Trying to connect to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err.message);
  });




