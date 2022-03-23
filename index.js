import express from 'express'
const app = express()
const port = 8080
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.send('Asset links')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})