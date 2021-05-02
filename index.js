const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const router = require('./routes/index.js');
const routerAdmin = require('./routes/admin/index.js');
const routerUser = require('./routes/user/index.js');
const fs = require('fs');
app.use(router);
app.use('/admin', routerAdmin);
app.use('/user', routerUser);
const path = require('path');
// push notification
const webpush = require('web-push');

const publicVapidKey = "BHgGAd6jeeY7fPVqyTn5cnB-tGaNrJSpU5hgY1D-urC01IFLT-gnoktdsvhPeeeBb_7WoDKQHouRr6zXqefprXE";
const privateVapidKey  = "wwbat6OsBT4ezfKhhsPdO9sXAkhzp7jrUTLfMoXQQ-8";
webpush.setVapidDetails('mailto:vshah3376@gmail.com', publicVapidKey, privateVapidKey);

fs.writeFileSync(path.join(__dirname, '/public/publickey.txt'), publicVapidKey);

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if(err) throw err;
    console.log(`server running on port: ${port}`);
});