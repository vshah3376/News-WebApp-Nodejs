const mongoose = require('mongoose');
try {
    (async ()=>{
        await mongoose.connect('mongodb://127.0.0.1:27017/magazine', { useNewUrlParser: true, useUnifiedTopology: true });
        
    })();
}catch(err){
    
    console.log(err);
}


module.exports = mongoose;