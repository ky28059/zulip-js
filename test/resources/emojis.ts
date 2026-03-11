import chai from 'chai';
import emojis from '../../lib/resources/emojis';
import { config, stubNetwork } from '../common';

chai.should();

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
      url.should.equal(`${config.apiURL}/realm/emoji`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    }, output);

    const data = await emojis(config).retrieve();
    data.should.have.property('result', 'success');
  });
});
