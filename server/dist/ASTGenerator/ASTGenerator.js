"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel = __importStar(require("@babel/core"));
const fs_1 = __importDefault(require("fs"));
/**
 * Class implements IASTGenerator.
 * Generates AST nodes from JavaScript files in given paths.
 */
class ASTGenerator {
    constructor(filePaths) {
        this.fileMap = {};
        this.mapFileToContent = {};
        this.filePaths = filePaths;
    }
    // Method to generate all root nodes.
    generateASTs() {
        const nodes = [];
        this.filePaths.forEach((filePath, index) => {
            var _a;
            // Clean up path to store relative path for mapping
            const newPath = filePath.split(/Submission\d{1}[\\/]{1,2}/)[1] || filePath;
            this.fileMap[index] = newPath;
            const ast = (_a = babel.transformFileSync(filePath, { ast: true, code: false })) === null || _a === void 0 ? void 0 : _a.ast;
            if (ast)
                nodes.push(ast);
            const content = fs_1.default.readFileSync(filePath, "utf-8");
            this.mapFileToContent[newPath] = content;
        });
        return nodes;
    }
    // Method to get the map of file to its content.
    getFileContents() {
        return this.mapFileToContent;
    }
    // Method to get map of index to the file path.
    getFileMaps() {
        return this.fileMap;
    }
}
exports.default = ASTGenerator;
