import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'HemanthVanasetti1997';

// Dummy user data
const DUMMY_USER = {
  email: 'test@example.com',
  password: 'password123'
};

// POST /login - Authenticate user and return JWT token
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Check if user credentials are valid
  if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
    // Generate JWT token
    const token = jwt.sign(
      { email: DUMMY_USER.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token
    });
  }

  // Invalid user credentials
  return res.status(401).json({
    success: false,
    message: 'Invalid user'
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`JWT Authentication Server running on http://localhost:${PORT}`);
  console.log(`Test credentials - Email: ${DUMMY_USER.email}, Password: ${DUMMY_USER.password}`);
  console.log(`POST /login with email and password to get JWT token`);
});

// Export for testing
export default app;
