import express from "express"
import axios from "axios"
import bodyParser from "body-parser"


const app = express()
const port = 3000

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    try {
        const response = await axios.get("https://whiskyhunter.net/api/distilleries_info/");
        res.render('index.ejs', {infoData: response.data});
    }catch(error){
        console.log(error.message)
    }
    })

app.get("/auctions/:nameSlug", async (req, res) => {
    var nameSlug = req.params.nameSlug;
    
    try {
        const response = await axios("https://whiskyhunter.net/api/distillery_data/"+nameSlug)
        res.render("auctions-info.ejs", {auctionInfo:response.data})
    }catch(error){
        console.log(error.message)
    }
})


app.listen(port, () => {
  console.log(`Server is running on port nr: ${port}`)
})