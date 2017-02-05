import Github from 'react-icons/lib/fa/github';
import Helmet from 'react-helmet';
import React from 'react';
import Twitter from 'react-icons/lib/fa/twitter';

import Container from './container';
import {Margin} from '../../styles/margin';
import {Primary, PrimaryInline} from '../../styles/fonts';

import BackNav from './ui/back-nav';
import Link from './ui/link';

const About = () => (
  <Container>
    <Helmet title="about - endpoint" />

    <BackNav />

    <Margin bottom>
      <Margin size="small" bottom>
        <PrimaryInline size="gamma" bold>endpoint&nbsp;</PrimaryInline>
        <PrimaryInline size="gamma">
          is a microservice for quickly creating configurable mock http endpoints that return static
          json data. that's it. that's literally all it does.
        </PrimaryInline>
      </Margin>

      <Primary size="gamma">
        it's intended to be a way to get super simple endpoints up and running with zero additional
        server overhead in order to test webhooks or client libraries in development.
      </Primary>
    </Margin>

    <Margin bottom>
      <Margin size="small" bottom>
        <Primary color="gray40" bold>faq</Primary>
      </Margin>

      <Margin size="small" bottom>
        <Primary bold>what is the response delay parameter?</Primary>
        <PrimaryInline>
          this parameter allows you to specify a <PrimaryInline bold>server-side</PrimaryInline>
          &nbsp;delay associated with serving your endpoint. this is particularly useful to test
          loading UIs or behavior under slow network conditions.
        </PrimaryInline>
      </Margin>

      <Margin size="small" bottom>
        <Primary bold>what http methods are permitted?</Primary>
        <PrimaryInline>
          endpoints will only respond to requests with GET and POST verbs.
        </PrimaryInline>
      </Margin>

      <Primary bold>will endpoints respond to ajax requests?</Primary>
      <PrimaryInline>
        every endpoint is configured with a CORS header to allow requests from any origin, so you
        can safely make requests to all endpoints in a client-side (browser) context.
      </PrimaryInline>
    </Margin>

    <Margin bottom>
      <Margin size="small" bottom>
        <Primary color="gray40" bold>meta</Primary>
      </Margin>

      <Margin size="tiny" bottom>
        <PrimaryInline>source is available on&nbsp;</PrimaryInline>
        <Link href="https://github.com/LINKIWI/endpoint">
          <PrimaryInline color={null} bold>github</PrimaryInline>
        </Link>
        <PrimaryInline>. you can self-host it on your own server, if you want.</PrimaryInline>
      </Margin>

      <PrimaryInline>endpoint was created by&nbsp;</PrimaryInline>
      <Link href="https://github.com/LINKIWI">
        <PrimaryInline color={null} bold><Github /> @LINKIWI</PrimaryInline>
      </Link>
      <PrimaryInline>&nbsp;/&nbsp;</PrimaryInline>
      <Link href="https://twitter.com/LINKIWI_">
        <PrimaryInline color={null} bold><Twitter /> @LINKIWI_</PrimaryInline>
      </Link>
      <PrimaryInline>. you should follow him; i hear he's pretty cool.</PrimaryInline>
    </Margin>
  </Container>
);

export default About;
