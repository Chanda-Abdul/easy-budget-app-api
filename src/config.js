module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://notes_master@localhost/noteful-api',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/noteful-test',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api"
};