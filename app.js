const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
const wikiSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const article = mongoose.model("article", wikiSchema);

const newArticle = new article({
  title: "check",
  content: "The SunriseThe SunriseThe SunriseThe SunriseThe SunriseThe Sunrise",
});
newArticle.save().then(() => console.log("The data has been saved succefully"));

app
  .route("/articles")
  .get(async function (req, res) {
    const articles = await  article
    .find({})
    .then((articles) => res.send(articles));
  })
  .post(function (req, res) {
    const namey = req.body.name;
    const locke = req.body.location;
    const newOne = new article({
      title: namey,
      content: locke,
    });
    newOne.save().then(() => res.send("The data has been saved succefully"));
  })
  .delete(function (req, res) {
    article
      .deleteMany({})
      .then(() => res.send("The data has been deleted succefully"));
  });
  var findme='';
  app.route('/check/:articleTitle')
  
  .get(async function (req, res) {
    var findme=req.params.articleTitle;
    const specificArticle = await  article
    .findOne({title:findme})
    res.send(specificArticle)
  })
  .patch(async function (req, res) {
   await article.findOneAndUpdate({
      title:findme
    },
    {$set:{title:req.body}}).then(function (err){
      if (!err) {
        console.log('success')
      }else{
        console.log(err)
      }
    })
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
