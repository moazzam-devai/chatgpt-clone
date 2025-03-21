const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/v1/chat/completions', (req, res) => {
  res.json({
    choices: [{
      message: {
        content: "This is a mock response from ChatGPT."
      }
    }]
  });
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
