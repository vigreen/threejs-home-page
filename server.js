const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3444;
const webPath = path.join(__dirname, 'web');

app.use(cors());
app.use(express.static(webPath));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(webPath, 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});