const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: __dirname + '/public/images',
});
const cookieParser = require('cookie-parser');
const app = express();
const passwords = {};
const sessions = {};
const data = require('./data.js');
const items = [...data.items];
app.use(cookieParser());

const reloadMagic = require('./reload-magic.js');

reloadMagic(app);

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line
app.post('/login', upload.none(), (req, res) => {
  const username = req.body.username;
  const enteredPassword = req.body.password;
  const expectedPassword = passwords[username];
  console.log('expected password', expectedPassword);
  if (enteredPassword === expectedPassword) {
    console.log('password matches');
    const sessionId = generateId();
    console.log('generated id', sessionId);
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

const generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.post('/signup', upload.none(), (req, res) => {
  console.log("**** I'm in the signup endpoint");
  console.log('this is the body', req.body);
  const username = req.body.username;
  const enteredPassword = req.body.password;
  if (passwords[username]) {
    return res.send({ success: false, message: 'Username taken' });
  }
  passwords[username] = enteredPassword;
  console.log('passwords object', passwords);
  const sessionId = generateId();
  console.log('generated id', sessionId);
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
});

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.post('/add-item', upload.single('img'), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const itemName = req.body.itemName;
  const itemImg = '/images/' + req.file.filename;

  items.push({ seller: username, name: itemName, img: itemImg });
  console.log({ seller: username, name: itemName, img: itemImg });
  res.send(JSON.stringify({ success: true }));
});

app.get('/api/items', (req, res) => {
  res.send(
    JSON.stringify({
      success: true,
      items: items,
    })
  );
});

app.get('/session', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  if (!sessions[sessionId]) {
    return res.send(
      JSON.stringify({
        success: false,
      })
    );
  }
  res.send(
    JSON.stringify({
      success: true,
      username: username,
    })
  );
});
// Your endpoints go before this line

app.all('/*', (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000');
});
