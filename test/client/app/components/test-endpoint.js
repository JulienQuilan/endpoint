/* global window */

import jsdom from 'jsdom';
import React from 'react';
import request from 'browser-request';
import sinon from 'sinon';
import test from 'tape';

import {
  Endpoint,
  __RewireAPI__ as EndpointRewire
} from '../../../../src/client/app/components/endpoint';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Endpoint component rendering', (t) => {
  const endpoint = mountWithStyletron(
    <Endpoint
      isLoading={false}
      loading={(func) => func(() => {})}
      params={{
        endpoint: 'endpoint'
      }}
    />
  );

  t.equal(endpoint.find('SuccessAlert').length, 1, 'SuccessAlert is rendered');
  t.equal(endpoint.find('.btn-test-endpoint').length, 1, 'Test endpoint button is visible');
  t.equal(endpoint.find('.btn-copy-endpoint').length, 1, 'Copy endpoint button is visible');

  t.end();
});

test('Copying endpoint URL to the clipboard', (t) => {
  jsdom.changeURL(window, 'https://endpoint.example.com/endpoint/endpoint');

  const copySpy = sinon.spy();
  EndpointRewire.__Rewire__('copy', copySpy);

  const endpoint = mountWithStyletron(
    <Endpoint
      isLoading={false}
      loading={(func) => func(() => {})}
      params={{
        endpoint: 'endpoint'
      }}
    />
  );

  endpoint.find('.btn-copy-endpoint').simulate('click');

  t.ok(copySpy.calledWith('https://endpoint.example.com/endpoint/endpoint'),
    'Current browser URL is copied');

  EndpointRewire.__ResetDependency__('copy');
  t.end();
});

test('Testing endpoint with successful response', (t) => {
  jsdom.changeURL(window, 'https://endpoint.example.com/endpoint/endpoint');

  const requestStub = sinon.stub(request, 'post', (opts, cb) => {
    t.equal(opts.url, 'https://endpoint.example.com/endpoint/endpoint',
      'Endpoint URL is copied from browser location href');
    t.deepEqual(opts.json, {}, 'No JSON data is passed');

    const resp = {
      getAllResponseHeaders: () => 'response headers'
    };
    return cb(null, resp, {stuff: true});
  });
  const endpoint = mountWithStyletron(
    <Endpoint
      isLoading={false}
      loading={(func) => func(() => {})}
      params={{
        endpoint: 'endpoint'
      }}
    />
  );

  endpoint.find('.btn-test-endpoint').simulate('click');

  t.ok(requestStub.called, 'Network request is made');
  t.notOk(endpoint.find('.btn-test-endpoint').length, 'Test endpoint button disappears');

  request.post.restore();
  t.end();
});

test('Testing endpoint with error 404 response', (t) => {
  jsdom.changeURL(window, 'https://endpoint.example.com/endpoint/endpoint');

  const requestStub = sinon.stub(request, 'post', (opts, cb) => {
    t.equal(opts.url, 'https://endpoint.example.com/endpoint/endpoint',
      'Endpoint URL is copied from browser location href');
    t.deepEqual(opts.json, {}, 'No JSON data is passed');

    return cb('error', {statusCode: 404});
  });
  const endpoint = mountWithStyletron(
    <Endpoint
      isLoading={false}
      loading={(func) => func(() => {})}
      params={{
        endpoint: 'endpoint'
      }}
    />
  );

  endpoint.find('.btn-test-endpoint').simulate('click');

  t.ok(requestStub.called, 'Network request is made');
  const alert = endpoint.find('ErrorAlert');
  t.equal(alert.length, 1, 'Error alert is displayed');
  t.equal(alert.props().message, 'no such endpoint with this name exists.',
    'Error about nonexistent endpoint');

  request.post.restore();
  t.end();
});

test('Testing endpoint with error 404 response', (t) => {
  jsdom.changeURL(window, 'https://endpoint.example.com/endpoint/endpoint');

  const requestStub = sinon.stub(request, 'post', (opts, cb) => {
    t.equal(opts.url, 'https://endpoint.example.com/endpoint/endpoint',
      'Endpoint URL is copied from browser location href');
    t.deepEqual(opts.json, {}, 'No JSON data is passed');

    return cb('error', {statusCode: 500});
  });
  const endpoint = mountWithStyletron(
    <Endpoint
      isLoading={false}
      loading={(func) => func(() => {})}
      params={{
        endpoint: 'endpoint'
      }}
    />
  );

  endpoint.find('.btn-test-endpoint').simulate('click');

  t.ok(requestStub.called, 'Network request is made');
  const alert = endpoint.find('ErrorAlert');
  t.equal(alert.length, 1, 'Error alert is displayed');
  t.equal(alert.props().message, 'there was an undefined server-side there. sorry.',
    'Error about undefined error');

  request.post.restore();
  t.end();
});
