// main entry point where the server starts
const app = require('./app');
const env = require('./config/env')

app.listen(env.PORT, ()=>{
    console.log(`Server is listening on ${env.PORT}`);
    
})