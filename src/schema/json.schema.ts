export default {
    $id: '/Json',
    type: 'object',
    properties: {
        src: {
            type: 'string'
        },
        override: {
            type: 'object'
        },
        remove: {
            type: 'object'
        },
    },
    additionalProperties: false
};
