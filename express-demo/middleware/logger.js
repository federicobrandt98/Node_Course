function authenticate(req,res,next) {
    console.log('Authenticating..');
    next();
}

function log(req,res,next) {
    console.log('Logging...');
    next();
}

module.exports = {
    log,
    authenticate
}