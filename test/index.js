'use strict';

const assert = require('assert');
const httpClient = require('../lib');


describe('GET', function() {

	it('#not found api', async function() {
		try {
			await httpClient.request('qq_pay', {});
			assert.ok(false);
		} catch (err) {
			assert.equal(err, 'api is not exist, api name is qq_pay');
		}
	})


	it('#sample', async function() {
		httpClient.setDefaultSetting({});
	  	httpClient.addApi({
	  		'baidu_home': {
	  			method: 'GET',
	  			url: 'http://www.baidu.com/',
	  			responseType: 'document',
	  		}
	  	});
	  	const response = await httpClient.request('baidu_home', {});
	  	assert.equal(response.status, 200);
	})

	it('#with params', async function() {
	  	httpClient.addApi({
	  		'zhihu_question': {
	  			method: 'GET',
	  			url: 'https://www.zhihu.com/question/<%= question_id %>/',
	  			responseType: 'document',
	  		}
	  	});
	  	const response = await httpClient.request('zhihu_question', {question_id: 37644888});
	  	assert.equal(response.status, 200);
	})

	it('#with query', async function() {
	  	httpClient.addApi({
	  		'baidu_search': {
	  			method: 'GET',
	  			url: 'http://www.baidu.com/s',
	  			responseType: 'document',
	  			params: {
	  				wd: '<%= wd %>'
	  			}
	  		}
	  	});
	  	const response = await httpClient.request('baidu_search', {wd: 'node.js'});
		assert.equal(response.status, 200);
	})
  	
});