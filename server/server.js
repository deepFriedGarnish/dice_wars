const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// Basic route
app.use(express.static(path.join(__dirname, '../client')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'))
});

// Start server
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});