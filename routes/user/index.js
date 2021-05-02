const express = require('express');
const router = express();
const bodyParser = require('body-parser');
router.set(bodyParser.urlencoded({extended: false}));
router.set(bodyParser.json());
router.use(express.static('public'));
const path = require('path');
const pug = require('pug');
router.set("view engine", "pug");
router.set('views', path.join(__dirname, '../views'));

let login = require('./login.js');
let register = require('./register.js');
//let first = require('./first.js');
router.use(login);
router.use(register);
//router.use(first);
module.exports = router;