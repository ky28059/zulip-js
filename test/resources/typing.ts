import { expect } from 'chai';
import typing from '../../lib/resources/typing';
import { bodyToRecord, config, stubNetwork } from '../common';

describe('Typing', () => {
  it('Should send typing started notification', async () => {
    const params = {
      to: [72],
      op: 'start' as const,
    };
    const output = {
      events: [
        {
          id: 0,
          type: 'typing',
          op: 'start',
          sender: {}, // TODO expand test with actual data
          recipients: {},
        },
      ],
      result: 'success',
      msg: '',
      handler_id: 225,
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/typing`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(2);
      expect(body.op).to.equal(params.op);
      expect(JSON.parse(body.to)).to.deep.equal(params.to);
    }, output);

    const data = await typing(config).send(params);
    expect(data).to.have.property('result', 'success');
  });

  it('Should send typing stopped notification', async () => {
    const params = {
      to: [72],
      op: 'stop' as const,
    };
    const output = {
      events: [
        {
          id: 0,
          type: 'typing',
          op: 'stop',
          sender: {},
          recipients: {},
        },
      ],
      result: 'success',
      msg: '',
      handler_id: 286,
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/typing`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(2);
      expect(body.op).to.equal(params.op);
      expect(JSON.parse(body.to)).to.deep.equal(params.to);
    }, output);

    const data = await typing(config).send(params);
    expect(data).to.have.property('result', 'success');
  });
});
