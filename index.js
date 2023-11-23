const PublicGoogleSheetsParser = require('public-google-sheets-parser')

const express = require('express')
const app = express()
const port = 3000

// const spreadsheetId = '14GWuOexHCX9-t9Q6VWkIspWQIbCO96xW5JG59cGWVb8'
const parser = new PublicGoogleSheetsParser()




 app.get('/getvideos/:id',async  (req, res) => {
    
   await parser.parse(req.params.id,'videos').then((items) => {
        var videos = items.map(item => item.videos)
        var myjson ={
            videos: videos
        }
        console.log(myjson)


        res.send(myjson)
      })
    

})






app.get('/getjson/:id', (req, res) => {
    parser.parse(req.params.id,'json').then((items) => {       
        res.send(items[0])
      })
    

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))




