"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodErr = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            field: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error occurred',
        errorSources,
    };
};
exports.default = handleZodErr;
