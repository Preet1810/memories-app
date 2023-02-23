export const isLoggedin=(req, res, next) => {
    console.log('isLoggedin middleware called');
    console.log('req.isAuthenticated():', req.isAuthenticated());
    if (!req.isAuthenticated()) {
        return res.status(409).json('You Must be Signed In First');
    }
    next();
};