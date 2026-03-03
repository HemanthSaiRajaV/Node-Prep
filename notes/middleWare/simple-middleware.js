import express from 'express';

const app = express();
const PORT = 3005;

// ============================================
// SIMPLE MIDDLEWARE WITH TIMEOUT
// ============================================

// Middleware that adds a timeout to requests
const timeoutMiddleware = (ms) => {
  return (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request started: ${req.method} ${req.url}`);
    
    // Set timeout
    const timeoutId = setTimeout(() => {
      console.log(`[${new Date().toISOString()}] Request timed out!`);
      res.status(503).json({ error: 'Request timed out' });
    }, ms);

    // Attach timeoutId to response so we can clear it
    res.on('finish', () => {
      clearTimeout(timeoutId);
      console.log(`[${new Date().toISOString()}] Request completed`);
    });

    next();
  };
};


// ============================================
// SIMPLE MIDDLEWARE THAT RETURNS VALUE
// ============================================

// Middleware that adds current time to request
const timestampMiddleware = (req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
};

// Middleware that adds calculation result to request
const calculateMiddleware = (req, res, next) => {
  req.calculation = {
    a: 10,
    b: 20,
    sum: 10 + 20,
    product: 10 * 20
  };
  next();
};


// ============================================
// APPLY MIDDLEWARE TO ROUTES
// ============================================

// Use timeout middleware (2 seconds)
app.use(timeoutMiddleware(2000));

// Use timestamp and calculation middleware
app.use(timestampMiddleware);
app.use(calculateMiddleware);


// ============================================
// ROUTES
// ============================================

app.get('/', (req, res) => {
  res.send(`
    <h1>Simple Middleware Demo</h1>
    <p>Check the console for middleware logs!</p>
    <ul>
      <li><a href="/data">/data - Returns timestamp and calculation</a></li>
      <li><a href="/hello">/hello - Simple greeting</a></li>
    </ul>
  `);
});

app.get('/data', (req, res) => {
  // Access values added by middleware
  res.json({
    message: 'Data from middleware',
    timestamp: req.timestamp,
    calculation: req.calculation
  });
});

app.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello World!',
    timestamp: req.timestamp 
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Simple middleware demo running on http://localhost:${PORT}`);
});

export default app;
