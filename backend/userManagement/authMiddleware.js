// backend/middleware/authMiddleware.js
// Protects routes with authentication

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(400).json({ success: false, message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        res.status(401).json({ success: false, message: 'Invalid Token' });
    }
};
