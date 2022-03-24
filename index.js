import express from 'express'
const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('35.154.173.109:3000')
})

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.send('Asset links')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
