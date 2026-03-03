import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

// Serve static files from public directory (in same folder as server)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle client joining a room
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room: ${room}`);
    socket.emit('message', { 
      type: 'system', 
      content: `Joined room: ${room}` 
    });
  });

  // Handle chat messages
  socket.on('chat-message', (data) => {
    console.log(`Message from ${socket.id}:`, data);
    
    // Broadcast to all clients in the same room
    if (data.room) {
      io.to(data.room).emit('chat-message', {
        id: socket.id,
        message: data.message,
        timestamp: new Date().toISOString()
      });
    } else {
      // Broadcast to all clients
      io.emit('chat-message', {
        id: socket.id,
        message: data.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      id: socket.id,
      username: data.username,
      room: data.room
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// REST endpoint for testing
app.get('/status', (req, res) => {
  res.json({ 
    status: 'running',
    connections: io.engine.clientsCount
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});

export default app;
