import * as fs from 'fs';
import { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';
import * as path from 'path';
import configSchema from '../schema/config.schema';
const config = configSchema as JSONSchema4;

compile(config, 'ConfigSchema').then((types) => {
    const outPath = path.join(__dirname, '../../src/types/config-schema.interface.ts');
    console.log(outPath);
    fs.writeFile(
        outPath,
        types,
        () => {
            console.log('done');
        }
    );
});
