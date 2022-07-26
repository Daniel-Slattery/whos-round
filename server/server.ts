import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import {
  allFinished,
  createNewUser,
  createUsersOnline,
  nextRoundReset,
  nextRoundSocketId,
  shuffleAssignNextRound,
  users
} from './userFunctions'

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:19006',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  users[socket.id] = {userId: socket.id}
  const userSocket = users[socket.id]
  socket.on('disconnect', () => {
    userSocket.nextRound && shuffleAssignNextRound(1)
    delete users[socket.id]
    io.emit('action', {
      type: 'users_online',
      data: createUsersOnline()
    })
  })
  socket.on('action', action => {
    switch (action.type) {
      case 'server/hello':
        socket.emit('action', {
          type: 'message',
          data: 'Good day from the server!'
        })
        break
      case 'server/join':
        createNewUser(userSocket, action)
        shuffleAssignNextRound(0)
        io.emit('action', {
          type: 'users_online',
          data: createUsersOnline()
        }) //io emit includes sender, socket emit only sends to others
        break
      case 'server/finished': //handling when beer icon is pressed
        userSocket.isFinished === 'Drinking  🍺'
          ? (userSocket.isFinished = 'Finished ✔️')
          : (userSocket.isFinished = 'Drinking  🍺')
        //check if all users are finished drinks
        if (allFinished()) {
          io.to(nextRoundSocketId()).emit('action', {
            type: 'target_buyer_socket',
            data: true
          })
          io.emit('action', {type: 'next_round', data: true})
        } else {
          io.to(nextRoundSocketId()).emit('action', {
            type: 'target_buyer_socket',
            data: false
          })
          io.emit('action', {type: 'next_round', data: false})
        }
        userSocket.isFinished === 'Finished ✔️'
          ? io.to(socket.id).emit('action', {type: 'user_finished', data: true})
          : io
              .to(socket.id)
              .emit('action', {type: 'user_finished', data: false})
        io.emit('action', {
          type: 'users_online',
          data: createUsersOnline()
        })
        break
      case 'server/nextRound':
        nextRoundReset()
        io.emit('action', {type: 'next_round', data: false})
        io.emit('action', {type: 'target_buyer_socket', data: false})
        io.emit('action', {type: 'user_finished', data: false})
        io.emit('action', {
          type: 'users_online',
          data: createUsersOnline()
        })
        break
    }
  })
})

server.listen(3002, () => {
  console.log('SERVER IS RUNNING 🚀')
})
