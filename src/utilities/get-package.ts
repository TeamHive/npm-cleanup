import readJson from './read-json';
import path from 'path';
import { PackageJson } from '../types/packageJson.interface';

export default async (): Promise<PackageJson> => {
    const packagePath = path.join(__dirname, '../../package.json');
    return (await readJson(packagePath)) as PackageJson;
};
