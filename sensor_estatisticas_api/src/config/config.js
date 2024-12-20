require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  sensorApiBaseUrl: process.env.SENSOR_API_BASE_URL || "http://localhost:3000/api/v1",
  useFakeData: process.env.USE_FAKE_DATA === "true",
  userApiBaseUrl: process.env.USER_API_BASE_URL || "http://localhost:5000/api/v1"
};