import { compile } from 'json-schema-to-typescript';
import { JSONSchema4 } from 'json-schema';
import configSchema from '../schema/config.schema';
import * as fs from 'fs';
import * as path from 'path';
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
