"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ASTGenerator_1 = __importDefault(require("../ASTGenerator/ASTGenerator"));
const FilePathGetter_1 = __importDefault(require("../FilePathGetter/FilePathGetter"));
const JSPlagDetector_1 = __importDefault(require("../PlagDetector/JSPlagDetector"));
/**
 * Class implements IDetectorFactory interface for JavaScript.
 */
class JSDetectorFactory {
    // Method to create instance of PathGetter object
    makeFilePathGetter() {
        return new FilePathGetter_1.default();
    }
    // Method to create instance of ASTGenerator object
    makeASTGenerator(filePaths) {
        return new ASTGenerator_1.default(filePaths);
    }
    // Method to create instance of JSPlagDetector object
    makePlagDetector(submission1, submission2, file1NameMap, file2NameMap) {
        return new JSPlagDetector_1.default(submission1, submission2, file1NameMap, file2NameMap);
    }
}
exports.default = JSDetectorFactory;
