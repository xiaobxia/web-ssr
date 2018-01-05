/**
 * Created by xiaobxia on 2017/12/26.
 */
const fs = require('fs-extra');
const axios = require('axios');
const qs = require('qs');
const chalk = require('chalk');

axios.interceptors.response.use(function (response) {
  let data = response.data;
  if (typeof data === 'string' || data.success === false) {
    console.info('[HTTP ERROR]', response);
  }
  return response;
}, function (error) {
  console.log(chalk.yellow(`error api: ${error.config.url}`));
  console.log(chalk.yellow(`data: ${error.config.data}`));
  console.log(chalk.yellow(`status: ${error.response.status}`));
  console.log(chalk.yellow(`statusText: ${error.response.statusText}`));
  return Promise.reject(error);
});

const apiList = [
  {
    name: 'houseDetail',
    method: 'get',
    //二手房
    api: 'http://192.168.2.243:8080/house/getHouseDetailStr',
    query: {
      houseId: '8',
      houseType: '2',
      userType: 'customer'
    },
    entry: 'targetHouse',
    extraData: {
      houseType: '2',
      userType: 'customer',
      attentionState: '1'
    }
  },
  {
    name: 'communityDetail',
    method: 'post',
    api: 'http://apidev.cd121.com/index/community/communityInfo',
    form: {
      blockId: 2,
      sellInBlockeSize: '',
      city: '',
      communityAroundSize: 10,
      houseType: 2
    },
    entry: 'targetCommunity'
  }
];

(async () => {
  const name = 'index';
  const fileName = `./mock/${name}.json`;
  await fs.ensureFile(fileName);
  let fileData = {};
  fileData.file = `${name}.ftl`;
  fileData.data = {};
  await fs.writeJson(`./mock/${name}.json`, fileData, {spaces: 2});
})();

//更新数据
apiList.map(async (item) => {
  try {
    let res = null;
    if (item.method === 'get') {
      res = await axios.get(`${item.api}?${qs.stringify(item.query)}`);
    } else {
      res = await axios.post(item.api, item.form);
    }
    if ([].indexOf(item.name) !== -1) {
      console.log(res);
    }
    let data = res.data.result;
    const fileName = `./mock/${item.name}.json`;
    await fs.ensureFile(fileName);
    let fileData = {};
    fileData.file = `${item.name}.ftl`;
    fileData.data = {};
    fileData.data[item.entry] = data;
    if (item.extraData) {
      fileData.data = Object.assign(fileData.data, item.extraData);
    }
    await fs.writeJson(`./mock/${item.name}.json`, fileData, {spaces: 2});
    console.log(chalk.cyan(`${item.name} rewrite success!`))
  } catch (error) {
    console.log(error)
  }
});


