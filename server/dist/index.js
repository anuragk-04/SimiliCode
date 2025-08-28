"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_ts_1 = __importDefault(require("./Routes/service.ts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const UI_ENDPOINT = "https://jade-mooncake-3dc735.netlify.app/";
app.use(express_1.default.json({ limit: "2mb" }));
const corsOptions = {
    origin: UI_ENDPOINT,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.post("/api/plagiarism", service_ts_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
