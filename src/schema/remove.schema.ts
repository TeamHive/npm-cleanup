export default {
    $id: '/Remove',
    type: 'object',
    properties: {
        meta: {
            anyOf: [
                { type: 'string' },
                { $ref: '#/definitions/remove' }
            ]
        }
    }
};
