require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT;
const app = express();

require('./config/mongo.config');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('dist'));
app.use(express.json());

app.use('/api', require('./routes/index.routes'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // app.use(express.static(path.join(__dirname, 'dist')));
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
