const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Something went wrong",
            success: true,
            err: "Email or password missing in the signup",
            data : {},
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
}