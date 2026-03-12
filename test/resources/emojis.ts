import { expect } from 'chai';
import emojis from '../../lib/resources/emojis';
import { config, stubNetwork } from '../common';

describe('Emojis', () => {
  it('should fetch emojis', async () => {
    const output = {
      emoji: {
        green_tick: {
          source_url: '/user_avatars/1/emoji/green_tick.png',
          deactivated: false,
          author: {},
        },
      },
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/realm/emoji`);
      expect(options.method).to.equal('GET');
      expect(options.method).to.not.have.property('body');
    }, output);

    const data = await emojis(config).retrieve();
    expect(data).to.have.property('result', 'success');
  });
});
