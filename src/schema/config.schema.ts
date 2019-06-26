import modulesSchema from './modules.schema';
import jsonSchema from './json.schema';

export default {
    type: 'object',
    definitions: {
        modules: modulesSchema,
        json: jsonSchema
    },
    properties: {
        'json': {
            type: 'array',
            items: {
                $ref: '#/definitions/json'
            }
        },
        'install-packages': {
            $ref: '#/definitions/modules'
        },
        'remove-packages': {
            $ref: '#/definitions/modules'
        }
    },
    additionalProperties: false
};
