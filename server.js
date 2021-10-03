import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards';
//app config
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://admin:IjItRMW02vD4nQCB@cluster0.3q6ql.mongodb.net/tinderdb?retryWrites=true&w=majority"
//Middlewares
app.use(express.json())
app.use(Cors());
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
})
//API Endpoints
app.get('/',(req,res)=>res.status(200).send('Hello Cleaver Programmers'));
app.post('/tinder/card',(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})
app.get('/tinder/cards',(req,res)=>{
    Cards.find(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})
// Listener
app.listen(port,()=>console.log(`Listening on local host : ${port}`));

