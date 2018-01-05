'use strict';

const axios = require('axios');
const _ = require('lodash');

// 解析配置中的数据
function analysisApi(api, data) {
    return replace(api, data);
}

function replace(object, data) {
    _.mapKeys(object, (value, key) => {
        if (_.isString(value)) {
            var compiled = _.template(value);
            object[key] = compiled(data);
        } else {
            object[key] = replace(value, data);
        }
    });
    return object;
}

var allApi = {};
var defaultSetting = {
    timeout: 1000,
    maxRedirects: 5,
    //可选值： 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json',
    baseURL: '',
};

module.exports = {
    setDefaultSetting: (setting) => {
        _.assign(defaultSetting, setting);;
    },
    addApi: (api) => {
        _.assign(allApi, api);
    },
    request: (api_name, data) => {
        var api = allApi[api_name];
        if (api === undefined) {
            throw 'api is not exist, api name is ' + api_name ;
        }
        var config = analysisApi(api, data);
        config = _.assign({}, defaultSetting, api);
        return axios(config);
    }
};