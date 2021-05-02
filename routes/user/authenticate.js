function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');    
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    next();
}

module.exports = {checkAuthenticated, checkNotAuthenticated}