"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
/**
 * Class implements IPlagDetector for Javascript.
 */
class JSPlagDetector {
    constructor(submission1, submission2, file1NameMap, file2NameMap) {
        this.submission1 = submission1;
        this.submission2 = submission2;
        this.file1NameMap = file1NameMap;
        this.file2NameMap = file2NameMap;
    }
    detect() {
        const result = {
            submission1: {},
            submission2: {},
            score: 0,
            similarities: {},
        };
        let totalLinesInSubmission1 = 0;
        let numberOfFilesMatched = 0;
        let numberOfLinesPlagiarised = 0;
        const submission1Nodes = this.collectNodes(this.submission1);
        const submission2Nodes = this.collectNodes(this.submission2);
        submission1Nodes.forEach((file1, index1) => {
            const codeTemp = (0, generator_1.default)(file1[0], { comments: false }).code;
            totalLinesInSubmission1 += codeTemp.replace(/^\s*\n/gm, "").split(/\n/gm).length;
            const linesPlagiarisedInFile = new Set();
            submission2Nodes.forEach((file2, index2) => {
                const lineSet1 = new Set();
                const lineSet2 = new Set();
                file1.forEach((node1) => {
                    if (this.checkConditionHelper(node1)) {
                        file2.forEach((node2) => {
                            if (this.checkConditionHelper(node2) && this.compareNodes(node1, node2)) {
                                for (let i = node1.loc.start.line; i <= node1.loc.end.line; i++) {
                                    lineSet1.add(i);
                                    linesPlagiarisedInFile.add(i);
                                }
                                for (let i = node2.loc.start.line; i <= node2.loc.end.line; i++) {
                                    lineSet2.add(i);
                                }
                            }
                        });
                    }
                });
                if (lineSet1.size && lineSet2.size) {
                    numberOfFilesMatched++;
                    const similarityObj = {
                        submission1: { file: this.file1NameMap[index1], lines: Array.from(lineSet1) },
                        submission2: { file: this.file2NameMap[index2], lines: Array.from(lineSet2) },
                    };
                    result.similarities[numberOfFilesMatched] = similarityObj;
                }
            });
            numberOfLinesPlagiarised += linesPlagiarisedInFile.size;
        });
        let score = (numberOfLinesPlagiarised / totalLinesInSubmission1) * 100;
        if (score > 100)
            score = 100;
        result.score = score;
        return result;
    }
    collectNodes(rootNodes) {
        return rootNodes.map((ele) => {
            const nodesAcrossFile = [];
            (0, traverse_1.default)(ele, { enter(path) { nodesAcrossFile.push(path.node); } });
            return nodesAcrossFile;
        });
    }
    checkConditionHelper(node) {
        const hasBody = 'body' in node || 'expression' in node || 'arguments' in node || 'declarations' in node;
        const ignoredTypes = ['ExpressionStatement', 'CallExpression'];
        return hasBody && !ignoredTypes.includes(node.type);
    }
    compareNodes(node1, node2) {
        if (node1 == null && node2 == null)
            return true;
        if (node1 == null || node2 == null)
            return false;
        const ignoredProperties = [
            "loc", "start", "range", "leadingComments", "innerComments", "trailingComments", "extra", "end", "sourceType", "interpreter", "name"
        ];
        // Handle binary expression commutativity
        if (node1.type === "BinaryExpression" && node2.type === "BinaryExpression") {
            return (this.compareNodes(node1.left, node2.left) && this.compareNodes(node1.right, node2.right))
                || (this.compareNodes(node1.left, node2.right) && this.compareNodes(node1.right, node2.left));
        }
        for (const key in node1) {
            if (ignoredProperties.includes(key))
                continue;
            if (!(key in node2))
                return false;
            const val1 = node1[key];
            const val2 = node2[key];
            if (typeof val1 === "object") {
                if (!this.compareNodes(val1, val2))
                    return false;
            }
            else if (val1 !== val2) {
                return false;
            }
        }
        for (const key in node2) {
            if (ignoredProperties.includes(key))
                continue;
            if (!(key in node1))
                return false;
        }
        return true;
    }
}
exports.default = JSPlagDetector;
