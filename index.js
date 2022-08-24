// const express=require('express')
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()
const app=express()
// const mobiles = [
//     {
//       model: "OnePlus 9 5G",
//       img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//       company: "Oneplus"
//     },
//     {
//       model: "Iphone 13 mini",
//       img:
//         "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//       company: "Apple"
//     },
//     {
//       model: "Samsung s21 ultra",
//       img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//       company: "Samsung"
//     },
//     {
//       model: "xiomi mi 11",
//       img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//       company: "xiomi"
//     }
//   ];

const MONGO_URL=process.env.MONGO_URL;
 //connection
async function createConnection(){
    const client=new MongoClient(MONGO_URL)
    await client.connect();
    console.log('mongodb is connected')
    return client;
}

const client=await createConnection();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World")
});
//getting the mobiles data
app.get("/mobiles",async (req,res)=>{
    //db.mobiles.find({})
    const mobiles=await client.db("ecommerce").collection("mobiles").find({}).toArray();

    res.send(mobiles)
});


app.post("/mobiles",async (req,res)=>{
    const data=req.body
    //send to atlas
    //db.mobiles.insertMany(data)//written in mongodb
    //write in node
    console.log(data)
    const result=await client.db("ecommerce").collection("mobiles").insertMany(data)
    // res.send(data)
    res.send(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("App started @ Port:",PORT)
})

