const PublicGoogleSheetsParser = require('public-google-sheets-parser')
const youtube = require("youtube-search-api");
const bodyParser = require('body-parser')



const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 3000

// const spreadsheetId = '14GWuOexHCX9-t9Q6VWkIspWQIbCO96xW5JG59cGWVb8'
const parser = new PublicGoogleSheetsParser()



app.get('/getvideos/:id', async (req, res) => {

  await parser.parse(req.params.id, 'videos').then((items) => {
    var videos = items.map(item => item.videos)
    var myjson = {
      videos: videos
    }
    console.log(myjson)


    res.send(myjson)
  })


})

app.get('/search/:id', async (req, respons) => {
  youtube
  .GetListByKeyword(req.params.id, false, 20, [{ type: "video" }])
  .then((res) => {
    console.log("Page1");
    console.log(res);

    respons.send(res);

  })
  .catch((err) => {
    console.log(err);
  });

})

app.post('/next/', async (req, res) => {
  let data = req.body;
  // console.log(req)
  youtube
    .NextPage(data, false, 20)
    .then((result) => {
      console.log(result);
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(videos.items.length);

})


app.get('/getjson/:id', (req, res) => {
  parser.parse(req.params.id, 'json').then((items) => {
    res.send(items[0])
  })


})

//update



app.listen(port, () => console.log(`Example app listening on port ${port}!`))




