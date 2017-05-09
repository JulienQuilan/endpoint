import Helmet from 'react-helmet';
import isJSON from 'is-json';
import LoadingHOC from 'react-loading-hoc';
import React from 'react';

import Container from './container';
import {Primary, PrimaryInline} from '../../styles/fonts';
import {Margin} from '../../styles/margin';
import Splash from './splash';

import {ErrorAlert, WarningAlert} from './ui/alert';
import Button from './ui/button';
import TextArea from './ui/textarea';
import TextField from './ui/text-field';

import browser from '../util/browser';

const ERROR_NETWORK_FAILURE = 'errorNetworkFailure';
const ERROR_TOO_LARGE = 'errorTooLarge';
const ERROR_BAD_INPUT = 'errorBadInput';
const ERROR_CONFLICT = 'errorConflict';
const ERROR_SERVER = 'errorServer';
const WARN_INCOMPLETE_PARAMS = 'warnIncompleteParams';
const WARN_INVALID_JSON = 'errorInvalidJSON';
const WARN_INVALID_STATUS_CODE = 'warnInvalidStatusCode';
const WARN_INVALID_DELAY = 'warnInvalidDelay';

/**
 * Main interface for submitting a new endpoint.
 */
export class Main extends React.Component {
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
      return this.setState({warn: WARN_INVALID_JSON});
    }

    // Validation that the status code and delay are proper integers
    if (statusCodeRaw && Number.isNaN(statusCode)) {
      return this.setState({warn: WARN_INVALID_STATUS_CODE});
    }
    if (delayRaw && (Number.isNaN(delay) || delay < 0 || delay > 60000)) {
      return this.setState({warn: WARN_INVALID_DELAY});
    }

    return this.props.loading((done) => browser.fetch('/api/endpoint/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        data: JSON.parse(data),
        ...(statusCode && {statusCode}),
        ...(delay && {delay})
      })
    }).then((resp = {}) => {
      const errors = {
        400: ERROR_BAD_INPUT,
        409: ERROR_CONFLICT,
        413: ERROR_TOO_LARGE,
        500: ERROR_SERVER
      };

      this.setState({error: errors[resp.status]});

      return resp.json();
    }, () => this.setState({error: ERROR_NETWORK_FAILURE})).then((body = {}) => {
      if (body.success) {
        return browser.push(`/endpoint/${name}`);
      }

      return done();
    }));
  }

  renderAlert() {
    const {error, warn} = this.state;

    const errorMessages = {
      [ERROR_NETWORK_FAILURE]: 'there was an undefined network failure. try again?',
      [ERROR_TOO_LARGE]: 'the server rejected your json data because it was too large.',
      [ERROR_CONFLICT]: 'an endpoint with this name already exists. please choose another name.',
      [ERROR_BAD_INPUT]: 'the endpoint name must be between 1 and 30 characters in length, and ' +
        'must consist only of letters, numbers, dashes, and underscores.',
      [ERROR_SERVER]: 'there was an undefined server-side error. sorry.'
    };
    const warnMessages = {
      [WARN_INVALID_JSON]: 'the json data does not appear to be valid.',
      [WARN_INCOMPLETE_PARAMS]: 'both the api endpoint url and json data must be supplied.',
      [WARN_INVALID_STATUS_CODE]: 'the http status code is invalid.',
      [WARN_INVALID_DELAY]: 'the requested endpoint delay is invalid. please choose a number ' +
        'between 0 and 60000.'
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

    const parsedURL = browser.parseURL();
    const endpointPrefix = `${parsedURL.protocol}//${parsedURL.host}/endpoint/`;

    return (
      <Container>
        <Helmet title="endpoint" />

        {isLoading && <Splash />}

        {this.renderAlert()}

        <Margin size="huge" bottom>
          <Margin bottom>
            <Margin size="small" bottom>
              <Primary color="gray40" bold>api endpoint url</Primary>
            </Margin>

            <div style={{display: 'table'}}>
              <PrimaryInline
                className="endpoint-prefix"
                size="epsilon"
                style={{
                  display: 'table-cell',
                  width: '1%',
                  whiteSpace: 'nowrap'
                }}
              >
                {endpointPrefix}
              </PrimaryInline>
              <TextField
                ref={(elem) => {
                  this.endpointField = elem;
                }}
                style={{
                  display: 'table-cell',
                  width: '100%'
                }}
                size="epsilon"
              />
            </div>
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
            <PrimaryInline>response http status code: </PrimaryInline>
            <TextField
              ref={(elem) => {
                this.statusCodeField = elem;
              }}
              placeholder="200"
              style={{width: '50px'}}
            />
          </div>

          <div>
            <PrimaryInline>response delay (ms): </PrimaryInline>
            <TextField
              ref={(elem) => {
                this.delayField = elem;
              }}
              placeholder="0"
              style={{width: '75px'}}
            />
          </div>
        </Margin>

        <Button
          className="btn-submit-endpoint"
          onClick={this.handleSubmit.bind(this)}
          style={{width: '100%'}}
        >
          <Primary color="gray5" bold>Submit</Primary>
        </Button>
      </Container>
    );
  }
}

export default LoadingHOC(Main);
