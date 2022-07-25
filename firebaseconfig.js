var admin = require("firebase-admin");

var serviceAccount = require("./elearning-9b780-firebase-adminsdk-yw3by-443ee5d9aa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports=admin;
