import express from 'express'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import twilio from 'twilio';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TWILIO_SID = "ACedef0a14f96fda0bd901ea8e519df7a4"
const TWILIO_TOKEN = "e4ad19da2ff52bafd198cf8016b7d6f7"

const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN)

const app = express()

const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.redirect("https://www.flexofficial.in/testRedirect")
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
})

app.get('/location-href-auto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/location-href-auto.html'));
})

app.get('/open-auto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/open-auto.html'));
})

app.get('/location-href', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/location-href.html'));
})

app.get('/open', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/open.html'));
})

app.get('/smartinvesting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/smartinvesting.html'));
})

app.get('/deep-link-blocked', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/deep-link-blocked.html'));
})

app.get('/amal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/amal.html'));
})

app.get('/amal2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/amal2.html'));
})

app.get('/connect-pro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/connect-pro.html'));
  // res.redirect("https://www.flexofficial.in/testRedirect")
})

app.get('/redirect', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<h1>Redirected!!</h1>'));
})

app.get('/testRedirect', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/testRedirect.html'));
})

app.get('/testRedirect2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/testRedirect2.html'));
})


app.get('/applinkstest/.well-known/assetlinks', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-known/assetlinks.json'));
})

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-know/assetlinks.json'));
})

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-know/apple-app-site-association'));
})

app.get('/sms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/sms.html'));
})

app.post('/send-sms', function (request, response) {

  console.log(`send-sms hit! ${JSON.stringify(request.query)}`);
  let dummyOTP = "9876"
  const codeParam = request.query['code']
  if (codeParam !== undefined) {
    if (codeParam.length > 0) {
      dummyOTP = codeParam
    }
  }

  let body = `The hash of the app goes with code - ${dummyOTP}`
  const bodyParam = request.query['body']
  if (bodyParam !== undefined) {
    if (bodyParam.length > 0) {
      body = bodyParam
    }
  }

  let targetPhone = '+918334030949'
  const phoneParam = request.query['phone']
  if (phoneParam !== undefined) {
    if (phoneParam.length > 0) {
      targetPhone = request.query['phone']
    }
  }

  twilioClient.messages
    .create({
      body: body,
      to: targetPhone, // Text this number
      from: '+12673883981', // From a valid Twilio number
    })
    .then((message) => {
      console.log(message.sid)
      response.status(200)
      response.send('<h1>SMS sent!</h1>')
    }).catch((ex) => {
      console.log(message.sid)
      console.log(ex)
      response.status(500)
      response.send(`<h1>ERROR!! ${ex} </h1>`)
    });
});

app.post('/apple-asa', function (request, respond) {
  let body = '';
  console.log(`post enter ${request}`);

  const filePath = path.join(__dirname, '/public/.well-know/apple-app-site-association');
  console.log(`post enter after filePath ${request.body}`);
  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    console.log(`on end body : ${body}`);
    fs.writeFile(filePath, body, function () {
      console.log(`post after write to ${filePath}`);
      respond.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export { app }
