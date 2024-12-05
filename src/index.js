const {app} = require('./app');
const requireDir = require('require-dir');

app.get('/',(req,res)=>{
    res.send('home page')
})
requireDir('./controllers',{recurse:true})

app.listen(2000,(req,res)=>{
    console.log("Server running on: http://localhost:2000")
})