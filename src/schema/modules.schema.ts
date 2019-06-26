const stringArray = {
    type: 'array',
    items: {
        type: 'string'
    }
};

export default {
    $id: '/Modules',
    type: 'object',
    properties: {
        dependencies: stringArray,
        devDependencies: stringArray
    },
    additionalProperties: false
};
