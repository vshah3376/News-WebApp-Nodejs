const express = require('express');
const router = express();
const bodyParser = require('body-parser');
router.set(bodyParser.urlencoded({extended: false}));
router.set(bodyParser.json());
router.use(express.static('public'));
const path = require('path');
const pug = require('pug');
router.set("view engine", "pug");
router.set('views', path.join(__dirname, '..', '../views/user'));
router.set('view options', { pretty: true });
let pathDir = path.join(__dirname, '..', '../models/index.js');
const Contact = require(pathDir).contact;
const User = require(pathDir).user;
let checkAuthenticated = require('./authenticate.js').checkAuthenticated;
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
//const bcrypt = require("bcrypt");
const MongoStore = require('connect-mongo')(session);

router.use(flash());
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/magazine',
    })
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/register", (req, res) => {
    res.render("register");
  })

router.post("/register", async (req, res) => {
    const { name, email,password,age,gender,address } = req.body;
    // check for missing filds
    if (!name || !email || !password || !age || !gender || !address ) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExitsAlready = await User.findOne({ email });
    if (doesUserExitsAlready) {
      res.send("A user with that email already exits please try another one!");
      return;
    }

    // lets hash the password
    //const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ name, email,password,age,gender,address  });
    latestUser
      .save()
      .then(() => {
        res.send("Successfully registered!");
        return;
      })
      .catch((err) => console.log(err));
  });


module.exports = router;