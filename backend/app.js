const express=require("express");
const dotenv= require("dotenv");
const cors=require("cors");
dotenv.config();
const reply=require("./router/reply");

const app=express();
app.use(
    cors({
      origin: "http://localhost:5173"
    })
  );
app.use(express.json());

app.use("/chat",reply);


app.listen(3000,()=>{
    console.log("server start ho gayo port 000 par");
})

