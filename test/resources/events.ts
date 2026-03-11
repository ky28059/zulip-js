import chai from 'chai';
import events from '../../lib/resources/events';
import { config, stubNetwork } from '../common';

chai.should();

describe('Events', () => {
  it('should fetch events', async () => {
    const params = {
      last_event_id: -1,
      dont_block: true,
    };
    const output = {
      events: [
        {
          id: 0,
          message: [Object],
          type: 'message',
          flags: [Object],
        },
      ],
      result: 'success',
      msg: '',
      queue_id: '1511901550:3',
    };
    stubNetwork((url, options) => {
      url.should.contain(`${config.apiURL}/events`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
      [...new URL(url).searchParams].should.have.deep.members([
        ['last_event_id', `${params.last_event_id}`],
        ['dont_block', `${params.dont_block}`],
      ]);
    }, output);

    const data = await events(config).retrieve(params);
    data.should.have.property('result', 'success');
  });
});
