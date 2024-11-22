const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT ;
const cors=require('cors');
const connectdb=require('./utils/databases');
const authRoute=require('./routes/auth');
connectdb();
const corsOptions = {
    origin: ['http://localhost:5173'],  
    credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoute);

app.use((req,res,next)=>{
    res.status(404).render('404',{title:'Error'});
  })
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} `);
})
