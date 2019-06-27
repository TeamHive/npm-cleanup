import merge from 'deepmerge';
import readJson from './read-json';
import removeProps from './remove-props';
import writeJson from './write-json';
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
        removeProps(finalJson, jsonConfig.remove);
    }
    await writeJson(jsonConfig.src, finalJson);
};
