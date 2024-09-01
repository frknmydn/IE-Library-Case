"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Kullanıcıları listeleme endpoint'i
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Kullanıcı listesi burada gösterilecek' });
});
// Yeni kullanıcı ekleme endpoint'i
router.post('/', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: Date.now(), name: name });
});
exports.default = router;
