const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 80;

db.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
