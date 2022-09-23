const { MongoClient, ServerApiVersion } = require("mongodb");

class MongoDB {
  uri = "";
  dbName = null;
  client = null;

  constructor(uri, dbName = null) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async connect() {
    if (this.client) return;

    try {
      const client = new MongoClient(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        maxPoolSize: 10,
        minPoolSize: 1,
        ssl: true,
      });

      await client.connect();
      this.client = client;

      return;
    } catch (error) {
      console.log("connection error. retrying ...");
      return await this.connect();
    }
  }

  async getDB(name = null) {
    await this.connect();
    return this.client.db(name || this.dbName);
  }
}

module.exports = MongoDB;
