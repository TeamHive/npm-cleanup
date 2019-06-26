import modulesSchema from './modules.schema';
import removeSchema from './remove.schema';
import jsonSchema from './json.schema';

export default {
    type: 'object',
    definitions: {
        modules: modulesSchema,
        remove: removeSchema,
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
    }
};
