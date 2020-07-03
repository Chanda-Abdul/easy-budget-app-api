module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL || 'postgres://ymzzpjmz:kUdfw2oErRwCaXcuLHqSq0mBimn9DRmm@hanno.db.elephantsql.com:5432/ymzzpjmz',
    TEST_DATABASE_URL: 'postgres://ymzzpjmz:kUdfw2oErRwCaXcuLHqSq0mBimn9DRmm@hanno.db.elephantsql.com:5432/ymzzpjmz',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/"
};