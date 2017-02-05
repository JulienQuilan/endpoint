import React from 'react';
import request from 'browser-request';
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
  const requestStub = sinon.stub(request, 'put', (opts, cb) => {
    t.equal(opts.url, '/api/endpoint/add', 'Endpoint is correct');
    t.deepEqual(opts.json, {
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }, 'JSON request body is correct');

    return cb(null, {statusCode: 409});
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

  t.ok(requestStub.called, 'Network request is made');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'an endpoint with this name already exists. ' +
    'please choose another name.', 'Message about invalid delay');

  request.put.restore();
  t.end();
});

test('JSON request data too large', (t) => {
  const requestStub = sinon.stub(request, 'put', (opts, cb) => {
    t.equal(opts.url, '/api/endpoint/add', 'Endpoint is correct');
    t.deepEqual(opts.json, {
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }, 'JSON request body is correct');

    return cb(null, {statusCode: 413});
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

  t.ok(requestStub.called, 'Network request is made');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'the server rejected your json data because ' +
    'it was too large.', 'Message about invalid delay');

  request.put.restore();
  t.end();
});

test('JSON request data too large', (t) => {
  const requestStub = sinon.stub(request, 'put', (opts, cb) => {
    t.equal(opts.url, '/api/endpoint/add', 'Endpoint is correct');
    t.deepEqual(opts.json, {
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }, 'JSON request body is correct');

    return cb(null, {statusCode: 500});
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

  t.ok(requestStub.called, 'Network request is made');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'there was an undefined server-side error. ' +
    'sorry.', 'Message about invalid delay');

  request.put.restore();
  t.end();
});

test('JSON request data too large', (t) => {
  const requestStub = sinon.stub(request, 'put', (opts, cb) => {
    t.equal(opts.url, '/api/endpoint/add', 'Endpoint is correct');
    t.deepEqual(opts.json, {
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }, 'JSON request body is correct');

    return cb('error');
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

  t.ok(requestStub.called, 'Network request is made');
  t.equal(main.find('ErrorAlert').length, 1, 'ErrorAlert is displayed');
  t.equal(main.find('ErrorAlert').props().message, 'there was an undefined network failure. ' +
    'try again?', 'Message about invalid delay');

  request.put.restore();
  t.end();
});

test('Successful endpoint submission', (t) => {
  const pushStub = sinon.stub(browser, 'push');
  const requestStub = sinon.stub(request, 'put', (opts, cb) => {
    t.equal(opts.url, '/api/endpoint/add', 'Endpoint is correct');
    t.deepEqual(opts.json, {
      name: 'endpoint',
      data: {},
      statusCode: 200,
      delay: 100
    }, 'JSON request body is correct');

    return cb(null, {statusCode: 201}, {success: true});
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

  t.ok(requestStub.called, 'Network request is made');
  t.ok(pushStub.calledWith('/endpoint/endpoint'), 'Redirect to endpoint test page');

  browser.push.restore();
  request.put.restore();
  t.end();
});
