/* global window */

import jsdom from 'jsdom';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import browser from '../../../../src/client/app/util/browser';
import {Main} from '../../../../src/client/app/components/main';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Incomplete params state', (t) => {
  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  t.equal(main.find('.btn-submit-endpoint').length, 1, 'Endpoint submission button is rendered');
  main.find('.btn-submit-endpoint').simulate('click');

  t.equal(main.find('WarningAlert').length, 1, 'WarningAlert is displayed');
  t.equal(main.find('WarningAlert').props().message,
    'both the api endpoint url and json data must be supplied.', 'Message about missing URL/JSON');

  t.end();
});

test('Invalid JSON data state', (t) => {
  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('invalid');

  main.find('.btn-submit-endpoint').simulate('click');

  t.equal(main.find('WarningAlert').length, 1, 'WarningAlert is displayed');
  t.equal(main.find('WarningAlert').props().message, 'the json data does not appear to be valid.',
    'Message about malformed JSON');

  t.end();
});

test('Invalid HTTP status code', (t) => {
  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('invalid');

  main.find('.btn-submit-endpoint').simulate('click');
  t.equal(main.find('WarningAlert').length, 1, 'WarningAlert is displayed');
  t.equal(main.find('WarningAlert').props().message, 'the http status code is invalid.',
    'Message about invalid status code');

  t.end();
});

test('Invalid delay value', (t) => {
  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('invalid');

  main.find('.btn-submit-endpoint').simulate('click');

  t.equal(main.find('WarningAlert').length, 1, 'WarningAlert is displayed');
  t.equal(main.find('WarningAlert').props().message, 'the requested endpoint delay is invalid. ' +
    'please choose a number between 0 and 60000.', 'Message about invalid delay');

  t.end();
});

test('Conflicting endpoint name', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }), 'JSON body is correct');

    return {
      then: (respFunc) => {
        const mockResp = {
          status: 409,
          json: () => t.pass('JSON is parsed out of response body')
        };

        respFunc(mockResp);

        return {
          then: (jsonFunc) => jsonFunc({success: false})
        };
      }
    };
  });

  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('100');

  main.find('.btn-submit-endpoint').simulate('click');

  t.ok(fetchStub.called, 'Network request is made');
  t.notOk(pushStub.called, 'No page redirect occurs');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'an endpoint with this name already exists. ' +
    'please choose another name.', 'Message about a name conflict');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});

test('Bad endpoint name', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {}
    }), 'JSON body is correct');

    return {
      then: (respFunc) => {
        const mockResp = {
          status: 400,
          json: () => t.pass('JSON is parsed out of response body')
        };

        respFunc(mockResp);

        return {
          then: (jsonFunc) => jsonFunc({success: false})
        };
      }
    };
  });

  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');

  main.find('.btn-submit-endpoint').simulate('click');

  t.ok(fetchStub.called, 'Network request is made');
  t.notOk(pushStub.called, 'No page redirect occurs');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'the endpoint name must be between 1 and 30 ' +
    'characters in length, and must consist only of letters, numbers, dashes, and underscores.',
    'Message about invalid endpoint name');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});

test('JSON request data too large', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }), 'JSON body is correct');

    return {
      then: (respFunc) => {
        const mockResp = {
          status: 413,
          json: () => t.pass('JSON is parsed out of response body')
        };

        respFunc(mockResp);

        return {
          then: (jsonFunc) => jsonFunc({success: false})
        };
      }
    };
  });

  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('100');

  main.find('.btn-submit-endpoint').simulate('click');

  t.ok(fetchStub.called, 'Network request is made');
  t.notOk(pushStub.called, 'No page redirect occurs');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'the server rejected your json data because ' +
    'it was too large.', 'Message about JSON data that is too large');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});

test('Generic internal server error', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }), 'JSON body is correct');

    return {
      then: (respFunc) => {
        const mockResp = {
          status: 500,
          json: () => t.pass('JSON is parsed out of response body')
        };

        respFunc(mockResp);

        return {
          then: (jsonFunc) => jsonFunc({success: false})
        };
      }
    };
  });

  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('100');

  main.find('.btn-submit-endpoint').simulate('click');

  t.ok(fetchStub.called, 'Network request is made');
  t.notOk(pushStub.called, 'No page redirect occurs');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'there was an undefined server-side error. ' +
    'sorry.', 'Message about an undefined server-side error');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});

test('Undefined network failure', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }), 'JSON body is correct');

    return {
      then: (respFunc, errFunc) => {
        errFunc();

        return {
          then: (jsonFunc) => jsonFunc({success: false})
        };
      }
    };
  });

  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('100');

  main.find('.btn-submit-endpoint').simulate('click');

  t.ok(fetchStub.called, 'Network request is made');
  t.notOk(pushStub.called, 'No page redirect occurs');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'there was an undefined network failure. ' +
    'try again?', 'Message about a network failure');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});

test('Successful endpoint submission', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const fetchStub = sinon.stub(browser, 'fetch', (url, opts) => {
    t.equal(url, '/api/endpoint/add', 'Endpoint URL is correct');
    t.equal(opts.method, 'PUT', 'HTTP method is PUT');
    t.equal(opts.body, JSON.stringify({
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }), 'JSON body is correct');

    return {
      then: (respFunc) => {
        const mockResp = {
          status: 201,
          json: () => t.pass('JSON is parsed out of response body')
        };

        respFunc(mockResp);

        return {
          then: (jsonFunc) => jsonFunc({success: true})
        };
      }
    };
  });

  jsdom.changeURL(window, 'https://endpoint.example.com/extraneous-path');
  const main = mountWithStyletron(
    <Main
      isLoading={false}
      loading={(func) => func(() => {})}
    />
  );

  const node = main.find(Main).node;
  node.endpointField.setValue('endpoint');
  node.jsonDataField.setValue('{}');
  node.statusCodeField.setValue('200');
  node.delayField.setValue('100');

  main.find('.btn-submit-endpoint').simulate('click');

  t.equal(main.find('.endpoint-prefix').props().children, 'https://endpoint.example.com/endpoint/',
    'Endpoint prefix is parsed from browser URL');
  t.ok(fetchStub.called, 'Network request is made');
  t.ok(pushStub.calledWith('/endpoint/endpoint'), 'Redirect to endpoint test page');

  browser.push.restore();
  browser.fetch.restore();
  t.end();
});
