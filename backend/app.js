const express=require("express");
const { rateLimit } = require("express-rate-limit");
const dotenv= require("dotenv");
const cors=require("cors");
dotenv.config();
const reply=require("./router/reply");

const app=express();

app.set("trust proxy", 1); 

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  limit: 2, // har IP ko 15 min me 100 requests
  message: {
    success: false,
    msg: "Bhai thoda dheere, bahut zyada requests aa rahi hai",
  },
});


app.use(
    cors({
      origin: "https://lovechat-pearl.vercel.app/"
    })
  );
app.use(express.json());

app.use("/chat",limiter,reply);


app.listen(process.env.PORT || 3000 ,()=>{
    console.log("server start ho gayo port 000 par");
})

