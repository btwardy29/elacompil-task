const fetch = require('node-fetch');
const express = require('express')
const app = express()
const port = 4000
const data = require('../data/db.json')
const cors = require('cors');
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.use(
  cors({
    origin: 'http://localhost:3000',
    preflightContinue: true,
  }),
);


app.get('/api/v1/devices', (req, res) => {
  res.json({ data: data.devices })
})


app.get('/api/v1/devices/:id', (req, res) => {
  res.json({data: data[req.params.id]})
})


app.listen(port, () => {
  console.log(`Example app listening on port!!!! ${port}`)
})

io.on('connection', (socket) => {
  socket.on("fetchId", (id) => {
    fetch(`http://localhost:4000/api/v1/devices/${id}`)
      .then(res => res.json())
      .then(message => {
        console.log('message', message)
        io.send(message.data)
      }
    )
  })
})


server.listen(4040, () => {
  console.log('listening on *:4040');
}); 