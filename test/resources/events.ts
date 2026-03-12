import { expect } from 'chai';
import events from '../../lib/resources/events';
import { config, stubNetwork } from '../common';

describe('Events', () => {
  it('should fetch events', async () => {
    const params = {
      last_event_id: -1,
      dont_block: true,
      queue_id: 'fb67bf8a-c031-47cc-84cf-ed80accacda8'
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
      expect(url).to.contain(`${config.apiURL}/events`);
      expect(options.method).to.equal('GET');
      expect(options).to.not.have.property('body');
      expect([...new URL(url).searchParams]).to.have.deep.members([
        ['last_event_id', `${params.last_event_id}`],
        ['dont_block', `${params.dont_block}`],
        ['queue_id', params.queue_id],
      ]);
    }, output);

    const data = await events(config).retrieve(params);
    expect(data).to.have.property('result', 'success');
  });
});
