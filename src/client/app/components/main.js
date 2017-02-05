import Helmet from 'react-helmet';
import isJSON from 'is-json';
import LoadingHOC from 'react-loading-hoc';
import React from 'react';
import request from 'browser-request';

import Container from './container';
import {Primary, primaryFontStyle} from '../../styles/fonts';
import {Margin} from '../../styles/margin';
import Splash from './splash';

import {ErrorAlert, WarningAlert} from './ui/alert';
import Button from './ui/button';
import TextArea from './ui/textarea';
import TextField from './ui/text-field';

import browser from '../util/browser';

const ERROR_INVALID_JSON = 'errorInvalidJSON';
const ERROR_NETWORK_FAILURE = 'errorNetworkFailure';
const ERROR_CONFLICT = 'errorConflict';
const ERROR_SERVER = 'errorServer';
const WARN_INCOMPLETE_PARAMS = 'warnIncompleteParams';
const WARN_INVALID_STATUS_CODE = 'warnInvalidStatusCode';
const WARN_INVALID_DELAY = 'warnInvalidDelay';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      warn: null
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const name = this.endpointField.getValue();
    const data = this.jsonDataField.getValue();
    const statusCodeRaw = this.statusCodeField.getValue();
    const statusCode = parseInt(statusCodeRaw, 10);
    const delayRaw = this.delayField.getValue();
    const delay = parseInt(delayRaw, 10);

    // Validation that both endpoint name and data are supplied
    if (!name || !data) {
      return this.setState({warn: WARN_INCOMPLETE_PARAMS});
    }

    // Validation that the input data is valid JSON
    if (!isJSON.strict(data)) {
      return this.setState({error: ERROR_INVALID_JSON});
    }

    // Validation that the status code and delay are proper integers
    if (statusCodeRaw && Number.isNaN(statusCode)) {
      return this.setState({warn: WARN_INVALID_STATUS_CODE});
    }
    if (delayRaw && Number.isNaN(delay)) {
      return this.setState({warn: WARN_INVALID_DELAY});
    }

    return this.props.loading((done) => request.put({
      url: '/api/endpoint/add',
      json: {
        name,
        data: JSON.parse(data),
        ...(statusCode && {statusCode}),
        ...(delay && {delay})
      }
    }, (err, resp = {}, body = {}) => {
      if (err || resp.statusCode !== 201 || !body.success) {
        if (resp.statusCode === 409) {
          this.setState({error: ERROR_CONFLICT});
          return done();
        }

        if (resp.statusCode === 500) {
          this.setState({error: ERROR_SERVER});
          return done();
        }

        this.setState({error: ERROR_NETWORK_FAILURE});
        return done();
      }

      return browser.push(`/endpoint/${name}`);
    }));
  }

  renderAlert() {
    const {error, warn} = this.state;

    const errorMessages = {
      [ERROR_INVALID_JSON]: 'the json data does not appear to be valid.',
      [ERROR_NETWORK_FAILURE]: 'there was an undefined network failure. try again?',
      [ERROR_CONFLICT]: 'an endpoint with this name already exists. please choose another name.',
      [ERROR_SERVER]: 'there was an undefined server-side error. sorry.'
    };
    const warnMessages = {
      [WARN_INCOMPLETE_PARAMS]: 'both the api endpoint url and json data must be supplied.',
      [WARN_INVALID_STATUS_CODE]: 'the http status code is invalid.',
      [WARN_INVALID_DELAY]: 'the requested endpoint delay is invalid.'
    };

    if (error) {
      return (
        <ErrorAlert
          title={'there was an error submitting your endpoint.'}
          message={errorMessages[error]}
        />
      );
    }

    if (warn) {
      return (
        <WarningAlert
          title={'oops.'}
          message={warnMessages[warn]}
        />
      );
    }

    return null;
  }

  render() {
    const {isLoading} = this.props;

    return (
      <Container>
        <Helmet title="new endpoint - endpoint" />

        {isLoading && <Splash />}

        {this.renderAlert()}

        <Margin size="huge" bottom>
          <Margin bottom>
            <Margin size="small" bottom>
              <Primary color="gray40" bold>api endpoint url</Primary>
            </Margin>

            <span style={primaryFontStyle('epsilon')}>
              {browser.parseURL().href}
            </span>
            <TextField
              ref={(elem) => {
                this.endpointField = elem;
              }}
              size="epsilon"
            />
          </Margin>

          <Margin bottom>
            <Margin size="small" bottom>
              <Primary color="gray40" bold>json data</Primary>
            </Margin>

            <TextArea
              ref={(elem) => {
                this.jsonDataField = elem;
              }}
            />
          </Margin>

          <Margin size="small" bottom>
            <Primary color="gray40" bold>options</Primary>
          </Margin>

          <div>
            <span style={primaryFontStyle()}>response http status code: </span>
            <TextField
              ref={(elem) => {
                this.statusCodeField = elem;
              }}
              placeholder="200"
              style={{width: '50px'}}
            />
          </div>

          <div>
            <span style={primaryFontStyle()}>response delay (ms): </span>
            <TextField
              ref={(elem) => {
                this.delayField = elem;
              }}
              placeholder="0"
              style={{width: '75px'}}
            />
          </div>
        </Margin>

        <Button onClick={this.handleSubmit.bind(this)} style={{width: '100%'}}>
          <Primary color="gray5" bold>Submit</Primary>
        </Button>
      </Container>
    );
  }
}

export default LoadingHOC(Main);
