/* global window */
/* eslint-disable no-alert */

import atomOneDark from 'react-syntax-highlighter/dist/styles/atom-one-dark';
import copy from 'copy-to-clipboard';
import Helmet from 'react-helmet';
import LoadingHOC from 'react-loading-hoc';
import Paste from 'react-icons/lib/md/content-paste';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/light';

import Container from './container';
import {Primary, primaryFontStyle} from '../../styles/fonts';
import {Margin, marginStyle} from '../../styles/margin';
import {colors} from '../../styles/colors';
import Splash from './splash';

import Button from './ui/button';
import Link from './ui/link';
import {ErrorAlert, SuccessAlert} from './ui/alert';

import browser from '../util/browser';

const ERROR_GENERIC = 'errorGeneric';

/**
 * Endpoint metadata page shown after successful submission of an endpoint.
 */
export class Endpoint extends React.Component {
  constructor() {
    super();

    this.state = {
      responseHeaders: [],
      responseStatusCode: null,
      responseJSON: null,
      error: null
    };
  }

  handleTestEndpoint(evt) {
    evt.preventDefault();

    return this.props.loading((done) => browser.fetch(browser.parseURL().href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp = {}) => {
      this.setState({
        responseHeaders: [...resp.headers].map((header) => `${header[0]}: ${header[1]}`),
        responseStatusCode: resp.status || 'Unknown'
      });

      return resp.json();
    }, () => this.setState({error: ERROR_GENERIC})).then((responseJSON) => {
      this.setState({responseJSON});
      return done();
    }));
  }

  handleClipboardCopy() {
    copy(browser.parseURL().href);

    window.alert(`${browser.parseURL().href} is copied to your clipboard.`);
  }

  renderAlert() {
    const {error} = this.state;

    const errorMessages = {
      [ERROR_GENERIC]: 'there was an undefined server-side error. sorry.'
    };

    return error && (
      <ErrorAlert
        title={'there was an error in testing your endpoint.'}
        message={errorMessages[error]}
      />
    );
  }

  render() {
    const {isLoading, params} = this.props;
    const {responseHeaders, responseStatusCode, responseJSON} = this.state;

    const curlTemplate = `curl -X POST ${browser.parseURL().href}`;

    return (
      <Container>
        <Helmet title="success - endpoint" />

        {isLoading && <Splash />}

        <SuccessAlert
          title={'your endpoint was submitted successfully!'}
          message={'test your endpoint below using curl or through this browser.'}
        />

        {this.renderAlert()}

        <Margin bottom>
          <Margin size="small" bottom>
            <Primary color="gray40" bold>url</Primary>
          </Margin>
          <span style={marginStyle('default', 'right')}>
            <Link href={`/endpoint/${params.endpoint}`} style={primaryFontStyle('gamma', null)}>
              {browser.parseURL().href}
            </Link>
          </span>
          <span>
            <Paste
              className="btn-copy-endpoint"
              onClick={this.handleClipboardCopy.bind(this)}
              style={{
                color: colors.gray70,
                cursor: 'pointer'
              }}
            />
          </span>
        </Margin>

        <Margin bottom>
          <Margin size="small" bottom>
            <Primary color="gray40" bold>curl</Primary>
          </Margin>
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {curlTemplate}
          </SyntaxHighlighter>
        </Margin>

        <Margin bottom>
          <Margin size="small" bottom>
            <Primary color="gray40" bold>endpoint test</Primary>
          </Margin>

          {
            !responseJSON && (
              <Margin size="small" bottom>
                <Button className="btn-test-endpoint" onClick={this.handleTestEndpoint.bind(this)}>
                  <Primary color="gray5" bold>Test Endpoint</Primary>
                </Button>
              </Margin>
            )
          }

          {
            responseJSON && (
              <div>
                <Margin size="small" bottom>
                  <Margin size="small" bottom>
                    <Primary size="kilo" bold>http status code</Primary>
                    <Primary size="kilo">{responseStatusCode}</Primary>
                  </Margin>

                  <Margin size="tiny" bottom>
                    <Primary size="kilo" bold>http headers</Primary>
                    {responseHeaders.map((header, idx) => (
                      <Primary size="kilo" key={`header_${idx}`}>{header}</Primary>)
                    )}
                  </Margin>
                </Margin>
                <SyntaxHighlighter language="javascript" style={atomOneDark}>
                  {JSON.stringify(responseJSON, null, 2)}
                </SyntaxHighlighter>
              </div>
            )
          }
        </Margin>
      </Container>
    );
  }
}

export default LoadingHOC(Endpoint);
