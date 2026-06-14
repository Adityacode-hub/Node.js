const mongoose = require("mongoose");

const uri = "mongodb://APIuser:63aRgqMC97iQKWTY@ac-3ouoddq-shard-00-00.cfxicgq.mongodb.net:27017,ac-3ouoddq-shard-00-01.cfxicgq.mongodb.net:27017,ac-3ouoddq-shard-00-02.cfxicgq.mongodb.net:27017/?ssl=true&replicaSet=atlas-ot9e3h-shard-0&authSource=admin&appName=APICLUSTURE"
    

console.log("Connecting...");

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("✅ Connected");
    process.exit(0);
})
.catch(err => {
    console.log("❌ Error:");
    console.log(err);
    process.exit(1);
});