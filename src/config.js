const DEFAULT_DB_URL = 'mongodb://localhost:27017/test'

export default {
  dbUrl: process.env.MONGO_URL || DEFAULT_DB_URL,
  host: process.env.DOMAIN || 'localhost:3020',
}
