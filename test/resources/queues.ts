import { expect } from 'chai';
import queues from '../../lib/resources/queues';
import { bodyToRecord, config, stubNetwork } from '../common';

describe('Queues', () => {
  it('should register queue', async () => {
    const params = {
      event_types: ['message' as const],
    };
    const output = {
      max_message_id: 173,
      msg: '',
      result: 'success',
      queue_id: '1511901550:2',
      last_event_id: -1,
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/register`);
      expect(options.method).to.be.equal('POST');
      expect(options).to.have.property('body');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.be.equal(1);
      expect(body.event_types).to.be.equal('["message"]');
    }, output);

    const data = await queues(config).register(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should deregister queue', async () => {
    const params = {
      queue_id: '1511901550:2',
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/events`);
      expect(options.method).to.be.equal('DELETE');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await queues(config).deregister(params);
    expect(data).to.have.property('result', 'success');
  });
});
