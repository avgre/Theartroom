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
const services = data.services;
const carts = {};
const unavailableDates = [
  '2019-09-08',
  '2019-09-09',
  '2019-09-11',
  '2019-09-12',
];
app.use(cookieParser());

const reloadMagic = require('./reload-magic.js');

reloadMagic(app);

app.use('/', express.static('build')); // Needed for the HTML and JS files
app.use('/', express.static('public')); // Needed for local assets

// Your endpoints go after this line
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
  carts[username] = [];
  res.cookie('sid', sessionId);
  res.send(JSON.stringify({ success: true }));
  return;
});

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

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.post('/add-service', upload.single('img'), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const serviceName = req.body.serviceName;
  const servicePrice = req.body.servicePrice;
  const Desc = req.body.serviceDesc;
  const serviceImg = '/images/' + req.file.filename;
  services.push({
    name: serviceName,
    img: serviceImg,
    cost: servicePrice,
    desc: serviceDesc,
  });
  console.log({ seller: username, name: serviceName, img: serviceImg });
  res.send(JSON.stringify({ success: true }));
});

app.get('/api/services', (req, res) => {
  res.send(
    JSON.stringify({
      success: true,
      services: services,
    })
  );
});

app.get('/api/cart', (req, res) => {
  // session -> get username -> get cart -> send it
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const cart = carts[username];
  res.send(
    JSON.stringify({
      success: true,
      cart: cart,
    })
  );
});
app.post('/add-to-cart', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  let cart = carts[username];
  const serviceId = req.body.serviceId;
  cart.splice(0, cart.length);
  cart.push(serviceId);
  res.send(JSON.stringify({ success: true }));
});

app.get('/api/unavailabledates', (req, res) => {
  res.send(
    JSON.stringify({
      success: true,
      unavailableDates: unavailableDates,
    })
  );
});
app.post('/add-date', upload.none(), (req, res) => {
  const sessionId = req.cookies.sid;
  const username = sessions[sessionId];
  const date = req.body.date;
  unavailableDates.push({
    date,
    user: username,
  });
  console.log(date, unavailableDates);
  res.send(JSON.stringify({ success: true }));
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

app.listen(80, '0.0.0.0', () => {
  console.log('Server running on port 80');
});
