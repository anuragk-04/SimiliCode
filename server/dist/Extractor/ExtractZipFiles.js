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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const extract_zip_1 = __importDefault(require("extract-zip"));
/**
 * Class implements IExtractor.
 * Extracts zip files to a given directory path.
 */
class ExtractZipFiles {
    // Clear directory if it exists
    clearDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield fs_1.promises.readdir(directoryPath);
                for (const file of files) {
                    const fullPath = path_1.default.join(directoryPath, file);
                    const stat = yield fs_1.promises.stat(fullPath);
                    if (stat.isDirectory()) {
                        yield fs_1.promises.rm(fullPath, { recursive: true, force: true });
                    }
                    else {
                        yield fs_1.promises.unlink(fullPath);
                    }
                }
            }
            catch (error) {
                if (error.code !== "ENOENT") {
                    throw new Error(`Error while clearing directory: ${error.message}`);
                }
            }
        });
    }
    // Create directory (or clear if already exists)
    createDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.mkdir(directoryPath, { recursive: true });
                yield this.clearDirectory(directoryPath);
            }
            catch (error) {
                throw new Error(`Error while creating directory: ${error.message}`);
            }
        });
    }
    // Extract the zip file
    extract(compressedFilePath, submissionPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resolvedPath = path_1.default.resolve(submissionPath);
                yield this.createDirectory(resolvedPath);
                yield (0, extract_zip_1.default)(compressedFilePath, { dir: resolvedPath });
            }
            catch (error) {
                throw new Error(`Extraction failed: ${error.message}`);
            }
        });
    }
}
exports.default = ExtractZipFiles;
