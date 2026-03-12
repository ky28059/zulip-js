import { expect } from 'chai';
import linkifiers from '../../lib/resources/linkifiers';
import { config, stubNetwork } from '../common';

describe('Filters', () => {
  it('should fetch realm linkifiers', async () => {
    const output = {
      linkifiers: [
        {
          pattern: '#(?P<id>[0-9]{2,8})',
          url_template: 'https://github.com/zulip/zulip/pull/{id}',
          id: 1,
        },
      ],
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/realm/linkifiers`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('GET');
    }, output);

    const data = await linkifiers(config).retrieve();
    expect(data).to.have.property('result', 'success');
  });
});
