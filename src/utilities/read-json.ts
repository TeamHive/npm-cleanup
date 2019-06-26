import * as fs from 'fs';

export default (filePath: string): Promise<object> => {
    if (fs.existsSync(filePath)) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    else {
        return undefined;
    }
};
