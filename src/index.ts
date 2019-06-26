import getSettings from './utilities/get-settings';
import npmCommand from './utilities/npm-command';
import updateJson from './utilities/update-json';
import colors from 'colors/safe';

module.exports = async () => {
    try {
        const settings = await getSettings();
        if (settings === undefined) {
            throw new Error('No settings provided');
        }
        if (settings.package) {
            if (settings.package['install-packages']) {
                await npmCommand('install', settings.package['install-packages']);
            }
            if (settings.package['remove-packages']) {
                await npmCommand('uninstall', settings.package['remove-packages']);
            }
            for (const jsonConfig of settings.json) {
                await updateJson(jsonConfig);
            }

        }
    }
    catch (err) {
        console.error(`${colors.red('Error:')} ${err.message}`);
    }
};
