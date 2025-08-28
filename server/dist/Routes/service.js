"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
const path_1 = __importDefault(require("path"));
const JSDetectorFactory_1 = __importDefault(require("../DetectorFactory/JSDetectorFactory"));
const PlagiarismRunner_1 = __importDefault(require("../PlagiarismRunner/PlagiarismRunner"));
const ExtractZipFiles_1 = __importDefault(require("../Extractor/ExtractZipFiles"));
// Fixed submission directories
const submission1Directory = "/Submissions/Submission1";
const submission2Directory = "/Submissions/Submission2";
const submission1Path = path_1.default.join(__dirname, "../", submission1Directory);
const submission2Path = path_1.default.join(__dirname, "../", submission2Directory);
// Max file size
const MAX_FILE_SIZE = 15 * 1024 * 1024;
function serveRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const form = (0, formidable_1.default)({
                keepExtensions: true,
                maxFileSize: MAX_FILE_SIZE,
            });
            // Parse formidable files
            const [fields, files] = yield new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err)
                        reject(err);
                    else
                        resolve([fields, files]);
                });
            });
            // Extract first file from the arrays (Files<string> → File)
            const compressedSub1 = files.submission1[0];
            const compressedSub2 = files.submission2[0];
            // Only accept zip files
            if (path_1.default.extname(compressedSub1.originalFilename || "") !== ".zip" ||
                path_1.default.extname(compressedSub2.originalFilename || "") !== ".zip") {
                res.status(400).send([{ message: "Only zip folders are accepted" }]);
                return;
            }
            try {
                const extractor = new ExtractZipFiles_1.default();
                yield extractor.extract(compressedSub1.filepath, submission1Path);
                yield extractor.extract(compressedSub2.filepath, submission2Path);
            }
            catch (err) {
                res.status(400).send([{ message: "Error in extracting files" }]);
                return;
            }
            try {
                const plagiarismRunner = new PlagiarismRunner_1.default(submission1Path, submission2Path);
                const detectorFactory = new JSDetectorFactory_1.default();
                // Run plagiarism (JSDetectorFactory now returns synchronous file paths)
                const results = [plagiarismRunner.runPlagiarism(detectorFactory)];
                res.status(200).send(results);
            }
            catch (err) {
                if (err.message === "empty directory") {
                    res.status(400).send([{
                            message: ".zip files either contain empty directories or no .js files"
                        }]);
                }
                else {
                    res.status(400).send([{ message: "Something went wrong!" }]);
                }
            }
        }
        catch (err) {
            res.status(400).send([{ message: "Max file size exceeded or invalid request" }]);
        }
    });
}
exports.default = serveRequest;
