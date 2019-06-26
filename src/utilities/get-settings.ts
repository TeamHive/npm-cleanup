import readJson from './read-json';
import * as fs from 'fs';
import ajv from 'ajv';
import configSchema from '../schema/config.schema';
import { ConfigSchema } from '../types/config-schema.interface';

export default async (filePath: string): Promise<ConfigSchema | undefined> => {
    if (fs.existsSync(filePath)) {
        try {
            const settings = await readJson(filePath);
            const validator = new ajv();
            const validate = validator.compile(configSchema);
            const isValid = validate(settings);
            if (isValid) {
                // safe because we validate with the same schema that generates types
                const castedSettings = settings as ConfigSchema;
                return castedSettings;
            }
            else {
                const errors = validate.errors;
                if (errors && errors !== undefined) {
                    errors.forEach((error) => {
                        console.error(error);
                    });

                }
                throw new Error('npm-cleanup config is invalid.');
            }
        } catch (err) {
            throw err;
        }
    }
    else {
        throw new Error(`${filePath} is not a file`);
    }
};
