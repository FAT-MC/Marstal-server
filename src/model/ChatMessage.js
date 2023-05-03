class chatMessage {
  constructor(role, message) {
    this.role = role;
    this.message = message;
    this.timestamp = Date.now()
  }
}

module.exports = chatMessage;
