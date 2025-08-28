"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Class implements IFilePathGetter interface.
 * Takes a directory and fetches all .js files in nested directories.
 */
class FilePathGetter {
    // Method to get all file paths in directory and subdirectories (synchronous)
    getFilePaths(directoryPath) {
        const arrayOfFiles = [];
        return this.getDeepFilePaths(directoryPath, arrayOfFiles);
    }
    // Helper method to recursively fetch .js files
    getDeepFilePaths(directoryPath, arrayOfFiles) {
        const files = fs_1.default.readdirSync(directoryPath, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path_1.default.join(directoryPath, file.name);
            if (file.isDirectory()) {
                this.getDeepFilePaths(fullPath, arrayOfFiles);
            }
            else if (file.isFile() && file.name.endsWith(".js")) {
                arrayOfFiles.push(fullPath);
            }
        }
        return arrayOfFiles;
    }
}
exports.default = FilePathGetter;
