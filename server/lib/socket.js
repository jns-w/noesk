const {validToken} = require('./jwt')

function socket(io) {
  io.on('connection', (client) => {
    const {sessionID, user, token} = client.handshake.query

    // SUBSCRIBE
    client.on('subscribe', function (data) {
      switch (data.type) {
        case 'session':
          client.join(data.sessionID)
          break
        case 'restaurant':
          client.join('restaurant')
          break
        case 'service':
          client.join('service')
          break
        case 'kitchen':
          client.join('kitchen')
      }
    })
    // UNSUBSCRIBE
    client.on('unsubscribe', function (data) {
      switch (data.type) {
        case 'session':
          client.leave(data.sessionID)
          break
        case 'restaurant':
          client.leave('restaurant')
          break
        case 'service':
          client.leave('service')
          break
        case 'kitchen':
          client.leave('kitchen')
      }
    })
    // SESSION CONNECTIONS

    // EVENTS
    client.on("session", (data) => {
      console.log("trigger to")
      io.to(sessionID).emit("session-update", data)
    })

    // RESTAURANT CONNECTIONS
    // join restaurant
    client.on('subscribe-restaurant', function (data) {
      console.log()
      client.join('restaurant')
    })
    //leave restaurant

    client.on('disconnect', () => {
      client.leave(sessionID)
    })

  })
}

module.exports = socket