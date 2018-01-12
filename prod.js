/**
 * Created by xiaobxia on 2018/1/6.
 */
const os = require('os');
const shell = require('shelljs');

shell.exec(`npm run start -- -i ${os.cpus().length - 1}`);
