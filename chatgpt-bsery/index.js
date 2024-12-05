const express = require ("express");

const app = express();

const bodyParser = require ("body-parser");
app.use(bodyParser.json());

/* const chatGPTRoutes = require ("./routes.chatGPT");
app.use("/chatgpt",chatGPTRoutes); */

app.post("/",(req,res)=>{
    res.status(200).send({message:"helooo"});
});
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("internal server error");
});

app.listen(3000,()=>{
    console.log("startedd");
});