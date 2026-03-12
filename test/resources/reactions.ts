import { expect } from 'chai';
import reactions from '../../lib/resources/reactions';
import { bodyToRecord, config, stubNetwork } from '../common';

describe('Reactions', () => {
  it('should add reaction to message', async () => {
    const params = {
      message_id: 1,
      emoji_name: 'musical_note',
      emoji_code: '1f3b5',
      reaction_type: 'unicode_emoji' as const,
    };
    const output = {
      result: 'success',
      msg: '',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/messages/${params.message_id}/reactions`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(3);
      expect(body.emoji_name).to.equal(params.emoji_name);
      expect(body.emoji_code).to.equal(params.emoji_code);
      expect(body.reaction_type).to.equal(params.reaction_type);
    }, output);

    const data = await reactions(config).add(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should remove reaction from message', async () => {
    const params = {
      message_id: 1,
      emoji_code: '1f3b5',
      reaction_type: 'unicode_emoji' as const,
    };
    const output = {
      result: 'success',
      msg: '',
    };
    stubNetwork((url, options) => {
      const path = `${config.apiURL}/messages/${params.message_id}/reactions`;
      const query = `emoji_code=${params.emoji_code}&reaction_type=${params.reaction_type}`;
      expect(url).to.equal(`${path}?${query}`);
      expect(options.method).to.be.equal('DELETE');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await reactions(config).remove(params);
    expect(data).to.have.property('result', 'success');
  });
});
