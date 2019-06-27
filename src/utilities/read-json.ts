import * as fs from 'fs';

export default (filePath: string): Promise<object> => {
    if (fs.existsSync(filePath)) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    try {
                        const parsedJson = JSON.parse(data);
                        resolve(parsedJson);
                    }
                    catch (err) {
                        reject(new Error(`error parsing json in file: ${filePath}`));
                    }
                }
            });
        });
    }
    else {
        return undefined;
    }
};
