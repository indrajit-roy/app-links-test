import { app } from ".";

app.get('/h2', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h1>Home2</h1>'));
})