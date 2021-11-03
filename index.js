
const express = require('express');

const app = express();

const youtubeTags = require('youtube-tags');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const getYouTubeId = require('get-youtube-id');

var id = getYouTubeId();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post('/tagfinder', async (req,res)=>{
    // trying to  get the url fo the video  :)

   // res.sendFile(__dirname + "/result.html")
    var url = req.body.url;
    var id = getYouTubeId(url);
    console.log(id)

    //trying to get the tags of the youtube videos .. :)
    
    const tags = await youtubeTags.getYoutubeTags(id);
    console.log(tags);

    var htmlstart=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable="no" maximum-scalable=1.0>
        <title>Tags</title>
        
    <style>
    body{
        text-align: center;
        background:linear-gradient(to right, beige, rgb(201, 201, 201)) ;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1rem;
        font-style: oblique;
    }
    button{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        color: blueviolet;
        background-color: rgba(189, 189, 189, 0.856);
        border-radius: 0.3rem;
    }
    .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 140px;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 150%;
      left: 50%;
      margin-left: -75px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .tooltip .tooltiptext::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
    #myInput{
        width:80%;
        min-height:30%;
        padding:0.3rem;
        border-radius:0.6rem;
    }
    form{
        margin-top:3rem;
    }
    footer{
        margin-top:3rem;
        padding:1rem;
        background-color:black;
        color:white;
        border-radius:0.8rem;
    }
    button{
        margin-top:0.2rem;
    }
    
    </style>
    </head>
    <body>
    
    <p>Click on the button to copy the Tags ..</p>
    
    <form spellcheck="false"><textarea id="myInput" cols="30" rows="10">`
    var htmlend = `</textarea></form>

    <div class="tooltip">
    <button onclick="myFunction()" onmouseout="outFunc()">
      <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
      Copy text
      </button>
    </div>

    <footer>
       <kbd>Developed by Manojkumar</kbd>
    </footer>
    <script>
    function myFunction() {
      var copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied";
    }
    
    function outFunc() {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copy to clipboard";
    }
    </script>
    </body>
    </html>`
    res.send(`${htmlstart}${tags}${htmlend}`)
    /*var tagsForm = document.getElementById('tagsForm');
    tagsForm.innerHTML = tags;
    */
   
})

app.listen(PORT,()=>{
    console.log(`The express is working at the port ${PORT}`);
})
