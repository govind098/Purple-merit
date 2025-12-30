module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
        'utils/**/*.js',
        'middleware/**/*.js',
        'controllers/**/*.js',
        'models/**/*.js',
        '!node_modules/**'
    ],
    testTimeout: 10000
};
