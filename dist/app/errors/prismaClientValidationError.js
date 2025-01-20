"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePrismaClientValidationError = (err) => {
    // console.log(err);
    const errorSources = err.message
        .split('\n')
        .filter((ele) => {
        if (ele.includes('Argument')) {
            return ele;
        }
    })
        .map((elem) => {
        return {
            field: elem.split(' ')[1],
            message: elem
                .split(' ')
                .filter((el) => el !== 'Argument')
                .join(),
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error occurred',
        errorSources,
    };
};
exports.default = handlePrismaClientValidationError;
