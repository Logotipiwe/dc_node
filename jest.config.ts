const { jsWithTs: tsjPreset } = require('ts-jest/presets');

const config = {
    verbose: true,
    globals: {
    },
    transform: {
        ...tsjPreset.transform,
    }
};
module.exports = config