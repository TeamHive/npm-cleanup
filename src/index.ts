import colors from 'colors/safe';
import program from 'commander';
import getSettings from './utilities/get-settings';
import npmCommand from './utilities/npm-command';
import removeFile from './utilities/remove-file';
import updateJson from './utilities/update-json';

module.exports = async () => {
    try {
        program
            .version('0.0.1', '-v, --version')
            .option('-c, --config [path]', 'Path to configuration file')
            .description('This tool helps you quickly update and cleanup node projects. See @teamhive/npm-cleanup for more information.')
            .parse(process.argv);
        if (program.config) {
            const settings = await getSettings(program.config);
            if (settings === undefined) {
                throw new Error('No settings provided. See @teamhive/npm-cleanup for setiting up the config file.');
            }
            for (const jsonConfig of settings.json) {
                await updateJson(jsonConfig);
            }
            if (settings['install-packages']) {
                await npmCommand('install', settings['install-packages']);
            }
            if (settings['remove-packages']) {
                await npmCommand('uninstall', settings['remove-packages']);
            }
            if (settings['remove-files']) {
                for (const file of settings['remove-files']) {
                    await removeFile(file);
                }
            }
        }
        else {
            program.outputHelp();
        }
    }
    catch (err) {
        console.error(`${colors.red('Error:')} ${err.message}`);
    }
};
