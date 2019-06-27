import colors from 'colors/safe';
import program from 'commander';
import getPackage from './utilities/get-package';
import getSettings from './utilities/get-settings';
import npmCommand from './utilities/npm-command';
import removeFile from './utilities/remove-file';
import updateJson from './utilities/update-json';

module.exports = async () => {
    try {
        const packageJson = await getPackage();
        program
            .version(packageJson.version, '-v, --version')
            .option('-c, --config [path]', 'Path to configuration file')
            .description(`${packageJson.description}. See ${packageJson.name} for more information.`)
            .parse(process.argv);
        if (program.config) {
            const settings = await getSettings(program.config, packageJson);
            if (settings === undefined) {
                throw new Error(`No settings provided. See ${packageJson.name} for setting up the config file.`);
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
