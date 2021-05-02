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
//const routerUser =express();
let cookieParser = require('cookie-parser');
let checkNotAuthenticated = require('./authenticate.js').checkNotAuthenticated;
//const User=require("./models/user.js");
var passport = require("passport");
const flash = require('express-flash');
const session = require('express-session');
const crypto = require('crypto');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
const { nextTick } = require('process');
 
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
/*
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user', 
    failureRedirect: '/user/login', 
    failureFlash: true    
}

));
*/
router.post('/login', async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
       const useremail= await User.findOne({email:email});
       //res.send(useremail.password);
       console.log(useremail);
       if(useremail.password===password)
       {//res.status(201).render("index");
        res.redirect('/');
        //next();
    }else{ res.send("passwords are not matching!")}
    }
    catch(error){res.status(400).send("invalid email.")}
})


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
router.get('/login/forgot', (req, res)=>{
    (async ()=>{
        try {
            
            let verifyCode = req.query.verifycode;
            console.log(verifyCode);
            if(verifyCode !== undefined && req.query.reset == undefined){
                let user = await User.find({verifycode: verifyCode});
                console.log(user);
                if(user.length !== 0){
                  
                    res.redirect(`/user/login/forgot?verifycode=${verifyCode}&reset=1`);
                }
                else {
                    res.send('Verify code is incorrect or expired.');
                }
            }
            else if(verifyCode !== undefined && req.query.reset !== undefined){
                
                let user = await User.find({verifycode: verifyCode});
                if(user.length !== 0){

                    let verified = true;
                    let forgot = undefined;
                    res.render('login', {verified, forgot, verifyCode});
                }
                else {
                    
                    res.send('Verify code is incorrect or expired.');
                }
            }
            else {
                let forgot= '';
                res.render('login', {forgot});
            }
        }
        catch(error) {
            console.log(error);
        }
    })();
});

router.post('/login/forgot', (req, res)=>{
    (async ()=>{
        try {
            let verifyCode = req.query.verifycode;
            
            if(verifyCode !== undefined && req.query.reset !== undefined){
                let verifyCode = req.query.verifycode;
                if(req.body.password1 !== req.body.password2){
                    let error = 'Passwords are not equal.';
                    let verified = true;
                    let forgot = undefined;
                    res.render('login', {verified, forgot, error});
                }
                else {
                    
                    
                    await User.updateOne({verifycode: verifyCode}, {password: req.body.password1, verifycode: ''});
                    res.redirect('/user/login');
                }

            }

            else {
                let email = req.body.email;
                let search = await User.find({email: email});
                let forgot= '';
                if(search.length !== 0){
                    let verifyCode = crypto.randomBytes(20).toString('hex');
                    let success = 'Verification code successfully sent to your Email. Please check your Email address.';
                    let info = await Info.find({}).limit(1);
                    let fromEmailAddress = info[0].email;
                    let transport = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        auth: {
                            user: info[0].email,
                            pass: info[0].password
                        }
                    }))
                    let content = `<h4>Reset password</h4>
                    <p>Click the below link to verify your email address.</p>
                    <a href="${decodeURIComponent(req.protocol + '://' + req.get('host'))}/user/login/forgot?verifycode=${verifyCode}">${decodeURIComponent(req.protocol + '://' + req.get('host'))}/user/login/forgot?verifycode=${verifyCode}</a>`;
                    let mail = {
                        from: fromEmailAddress,
                        to: email,
                        subject: `${req.hostname} - Reset password`,
                        text: req.hostname,
                        html: content
                    }
                
                    transport.sendMail(mail, function(error, response){
                        if(error){
                            console.log(error);
                        }
                        transport.close();
                        
                        res.render('login', {forgot, success})
                    });
                    await User.updateOne({email: email}, {verifycode: verifyCode});
                }
                else {
                    let error = 'Email address is not found.';
                    
                    res.render('login', {error, forgot})
                }

            }     
        }
        catch(err) {
            console.log(err);
            let error = 'Something went wrong.';
            res.render('login', {error, forgot})
        }
    })();
});








module.exports = router;