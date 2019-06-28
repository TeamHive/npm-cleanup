import * as fs from 'fs';

export default (path: string) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        }
    });
};
