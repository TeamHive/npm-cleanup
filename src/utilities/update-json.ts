import merge from 'deepmerge';
import removeProperties from './remove-propertites';
import writeJson from './write-json';
import readJson from './read-json';
import { Json } from '../types/config-schema.interface';

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

export default async (jsonConfig: Json) => {
    const originalJson = await readJson(jsonConfig.src);
    let finalJson = Object.assign({}, originalJson);
    if (jsonConfig.override) {
        finalJson = merge(originalJson, jsonConfig.override, {
            arrayMerge: overwriteMerge
        });
    }
    if (jsonConfig.remove) {
        removeProperties(finalJson, jsonConfig.remove);
    }
    await writeJson(jsonConfig.src, finalJson);
};
