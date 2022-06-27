class ClientConfig {
  constructor(config) {
    this.config = config;
    this.token = config.token;
    this.prefix = config.prefix;
  }

  get(key) {
    return this.config[key];
  }
}

module.exports = ClientConfig;
