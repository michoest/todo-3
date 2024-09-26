// utils/jwtUtils.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(userId, accountId) {
    return jwt.sign({ userId, accountId }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}