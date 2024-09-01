"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
require("./models/associations");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/books', book_routes_1.default);
app.use('/users', user_routes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('oops server error');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
