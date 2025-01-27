require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Bağlantısı
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

// Veritabanı Bağlantısını Test Etme
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL bağlantısı başarılı.');
  } catch (error) {
    console.error('❌ Veritabanı bağlantısı başarısız:', error.message);
  }
}

testConnection();

// Temel Rota
app.get('/', (req, res) => {
  res.json({ message: 'Backend API çalışıyor.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`);
});
