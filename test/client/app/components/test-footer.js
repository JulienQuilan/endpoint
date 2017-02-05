import React from 'react';
import test from 'tape';

import Footer from '../../../../src/client/app/components/footer';
import Link from '../../../../src/client/app/components/ui/link';
import mountWithStyletron from '../../util/mount-with-styletron';

test('Footer is rendered', (t) => {
  const footer = mountWithStyletron(
    <Footer win={{width: 1, height: 1}} />
  );

  t.equal(footer.find(Link).length, 2, 'Two outgoing links');

  t.end();
});
