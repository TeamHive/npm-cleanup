import * as child_process from 'child_process';
import { Modules } from '../types/config-schema.interface';

export default async (command: 'install' | 'uninstall', modules: Modules) => {
    if (modules.dependencies) {
        await runCommand(command, modules.dependencies, ['--save']);
    }
    if (modules.devDependencies) {
        await runCommand(command, modules.devDependencies, ['--saveDev']);
    }
};

const runCommand = (command: 'install' | 'uninstall', modules: string[], flags: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        const args = modules.slice();
        args.push(...flags);
        // send output to stdio
        const commandProcess = child_process.spawn('npm', [command, ...args], {
            stdio: 'inherit'
        });

        commandProcess.on('exit', () => {
            resolve();
        });
        commandProcess.on('error', (error) => {
            reject(error);
        });
    });
};
