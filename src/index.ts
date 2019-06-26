import getSettings from './utilities/get-settings';
import npmCommand from './utilities/npm-command';
import updateJson from './utilities/update-json';
import colors from 'colors/safe';
import program from 'commander';
import removeFile from './utilities/remove-file';

module.exports = async () => {
    try {
        program
            .version('0.0.1')
            .option('-c, --config [path]', 'Path to configuration file')
            .description('This tool helps automate cleanup and updates of node projects.')
            .parse(process.argv);
        if (program.config) {
            const settings = await getSettings(program.config);
            if (settings === undefined) {
                throw new Error('No settings provided');
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
