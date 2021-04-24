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
const User = require(pathDir).user;
const Info = require(pathDir).info;
let cookieParser = require('cookie-parser');
let checkNotAuthenticated = require('./authenticate.js').checkNotAuthenticated;

var passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const crypto = require('crypto');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
 
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

(async ()=>{
    try {
        let initializePassport = require('./passport-config');    
        initializePassport(passport, (email) => {
            return (async ()=>{
                let user = await User.find({email: email});
                if(user.length === 0){
                    return null;
                }
                else {                    
                    return user;
                }
            })();
        },
        (id) => {
            return (async ()=>{
                let user = await User.find({_id: id});
                if(user.length === 0){
                    return null;
                }
                else {
                    return user;
                }
            })();
        });
        
    }
    catch(error) {
        console.log(error);
    }
})();

router.get('/login', checkNotAuthenticated, (req, res)=>{    
    res.render("login", {login_errors: req.flash().error});
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/user', 
    failureRedirect: '/user/login', 
    failureFlash: true    
}

));

// logout
router.get('/logout', (req, res)=>{
    (async ()=>{
        try {
            req.logOut();
            res.redirect('/user/login');
            
        }
        catch(error) {
            console.log(error);
        }
    })();
});



module.exports = router;