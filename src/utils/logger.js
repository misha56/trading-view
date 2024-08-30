class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || "debug";
  }

  getCurrentTime() {
    return new Date().toISOString();
  }

  info(message) {
    console.log(this.getCurrentTime(), `INFO: ${message}`);
  }

  debug(message) {
    if (this.logLevel !== "debug") {
      return;
    }
    console.log(this.getCurrentTime(), `DEBUG: ${message}`);
  }

  error(message, error) {
    console.error(this.getCurrentTime(), `ERROR: ${message}`);
    if (error) {
      console.error(error.stack);
    }
  }
}

module.exports = new Logger();
