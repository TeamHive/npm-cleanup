import ajv from 'ajv';
import * as fs from 'fs';
import readJson from './read-json';
import configSchema from '../schema/config.schema';
import { ConfigSchema } from '../types/config-schema.interface';
import { PackageJson } from '../types/packageJson.interface';

export default async (filePath: string, packageJson: PackageJson): Promise<ConfigSchema | undefined> => {
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
                        console.error('Error: ', error);
                    });

                }
                throw new Error(`npm-cleanup config is invalid. See ${packageJson.name} for how to properly format the config file.`);
            }
        } catch (err) {
            throw err;
        }
    }
    else {
        throw new Error(`${filePath} is not a file. See ${packageJson.name} for how to properly format the config file.`);
    }
};
