// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const cors = require('cors');
// const http = require("http"); 
// const cookieParser = require('cookie-parser');
// const connectToDb = require('./db/db');

// // Import routes
// const userRoutes = require('./routes/user.routes');
// const captainRoutes = require('./routes/captain.routes');
// const mapsRoutes = require('./routes/maps.routes');
// const rideRoutes = require('./routes/ride.routes');

// const { Server } = require("socket.io");

// const app = express();

// const server = http.createServer(app); 


// // ✅ CORS Configuration (Allow only your frontend)
// app.use(cors({
//     origin: "https://bookish-space-pancake-7v56597q47rpcgwv-5173.app.github.dev/",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Database Connection
// connectToDb();

// // Routes
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });
// // socket . io

// const io = new Server(server, {
//     cors: {
//         origin: "*", // Change this to your frontend URL
//         methods: ["GET", "POST"]
//     }
// });

// app.use('/users', userRoutes);
// app.use('/captains', captainRoutes);
// app.use('/maps', mapsRoutes);
// app.use('/rides', rideRoutes);

// module.exports = app;



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // Import HTTP module
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create server from express app

connectToDb();

app.use(cors({
    origin: "https://bookish-space-pancake-7v56597q47rpcgwv-5173.app.github.dev/", // Change this to frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

// ✅ FIX: Define `server` first, then use `Socket.IO`
const io = new Server(server, {
    cors: {
        origin: "*", // Change this in production
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

