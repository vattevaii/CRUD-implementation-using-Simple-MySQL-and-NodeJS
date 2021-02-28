function checkLogged(req, res, next) {
    if (req.body.user == null) {
        res.status(403);
        return res.send("You need to Login before accessing this site !!!");
    }
    next();
}

module.exports = {
    checkLogged
}