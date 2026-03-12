import { expect } from 'chai';
import streams from '../../lib/resources/streams';
import { config, stubNetwork } from '../common';

describe('Streams', () => {
  it('should fetch streams', async () => {
    const output = {
      result: 'success',
      msg: '',
      streams: [
        {
          name: 'Denmark',
          stream_id: 1,
          invite_only: false,
          description: 'A Scandinavian country',
        },
        {
          name: 'Rome',
          stream_id: 2,
          invite_only: false,
          description: 'Yet another Italian city',
        },
        {
          name: 'Scotland',
          stream_id: 3,
          invite_only: false,
          description: 'Located in the United Kingdom',
        },
        {
          name: 'Venice',
          stream_id: 4,
          invite_only: false,
          description: 'A northeastern Italian city',
        },
        {
          name: 'Verona',
          stream_id: 5,
          invite_only: false,
          description: 'A city in Italy',
        },
      ],
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/streams`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await streams(config).retrieve();
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch subscriptions', async () => {
    const output = {
      msg: '',
      result: 'success',
      subscriptions: [
        {
          color: '#e79ab5',
          invite_only: false,
          desktop_notifications: true,
          subscribers: [Object],
          stream_id: 1,
          pin_to_top: false,
          email_address:
            'Denmark+986326cbbaef74fcb4c77cc41d47b12c@zulipdev.com:9991',
          audible_notifications: true,
          description: 'A Scandinavian country',
          in_home_view: true,
          push_notifications: false,
          name: 'Denmark',
        },
        {
          color: '#e79ab5',
          invite_only: false,
          desktop_notifications: true,
          subscribers: [Object],
          stream_id: 3,
          pin_to_top: false,
          email_address:
            'Scotland+a3a2dc96b0406d47c826041f773ee29a@zulipdev.com:9991',
          audible_notifications: true,
          description: 'Located in the United Kingdom',
          in_home_view: true,
          push_notifications: false,
          name: 'Scotland',
        },
      ],
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/users/me/subscriptions`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await streams(config).subscriptions.retrieve();
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch stream id', async () => {
    const params = {
      stream: 'bot testing',
    };
    const output = {
      result: 'success',
      msg: '',
      stream_id: 94,
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/get_stream_id`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
      expect([...new URL(url).searchParams]).to.have.deep.members([
        ['stream', params.stream],
      ]);
    }, output);

    let data = await streams(config).getStreamId(params);
    expect(data).to.have.property('result', 'success');

    data = await streams(config).getStreamId(params.stream);
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch the topics in a stream', async () => {
    const params = {
      stream_id: 15,
    };
    const output = {
      msg: '',
      result: 'success',
      topics: [
        {
          name: 'Denmark1',
          max_id: 128,
        },
        {
          name: 'Denmark3',
          max_id: 124,
        },
        {
          name: 'Denmark2',
          max_id: 117,
        },
      ],
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(
        `${config.apiURL}/users/me/${params.stream_id}/topics`,
      );
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await streams(config).topics.retrieve(params);
    expect(data).to.have.property('result', 'success');
    expect(data).to.have.property('topics');
  });

  it('should delete stream by stream id', async () => {
    const params = {
      stream_id: 1,
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/streams/${params.stream_id}`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('DELETE');
    }, output);

    const data = await streams(config).deleteById(params);
    expect(data).to.have.property('result', 'success');
  });
});
