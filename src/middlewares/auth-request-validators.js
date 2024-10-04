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

const validateIsAdminRequest = (req,res,next) => {
    if(!req.body.id) {
        return res.status(400).json({
            message: "Something went wrong",
            success: false,
            err: "User id not be given",
            data : {},
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
}