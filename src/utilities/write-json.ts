import * as fs from 'fs';

export default (filePath: string, json: object): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(json, null, 4), (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
