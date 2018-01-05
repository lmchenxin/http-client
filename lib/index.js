'use strict';

const axios = request('axios');
const lodash = require('lodash');

// 解析配置中的数据
function analysisApi(api, data) {
    
}

module.exports = {
    allApi: {},
    defaultSetting: {
        timeout: 1000,
        maxRedirects: 5,
        responseType: 'json',
    },
    setDefaultSetting: (setting) => {
        this.defaultSetting = setting;
    },
    addApi: (api) => {
        this.allApi = lodash.assign({}, this.allApi, api);
    },
    request: (api_name, data) => {
        var api = allApi.api_name;
        if (api === undefined) {
            throw 'api is not exist, api name is ' + api_name ;
        }
        var config = analysisApi(api, data);
        config = lodash.assign({}, defaultSetting, api);
        return axios(config);
    }
};