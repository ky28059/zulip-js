import { expect } from 'chai';
import messages from '../../lib/resources/messages';
import { bodyToRecord, config, stubNetwork } from '../common';

describe('Messages', () => {
  it('should send message to test stream', async () => {
    const params = {
      to: 'test stream',
      type: 'stream' as const,
      subject: 'Testing zulip-js',
      content: 'Something is wrong....',
    };
    const output = {
      result: 'success',
      msg: '',
      id: 168,
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/messages`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(4);
      expect(body.to).to.equal(params.to);
      expect(body.type).to.equal(params.type);
      expect(body.subject).to.equal(params.subject);
      expect(body.content).to.equal(params.content);
    }, output);

    const data = await messages(config).send(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch messages from test stream', async () => {
    const params = {
      stream: 'test stream',
      type: 'stream',
      anchor: 100000000,
      num_before: 1,
      num_after: 1,
    };
    const output = {
      result: 'success',
      msg: '',
      messages: [], // TODO expand test with actual API message data.
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
      expect([...new URL(url).searchParams]).to.have.deep.members([
        ['stream', params.stream],
        ['type', params.type],
        ['anchor', `${params.anchor}`],
        ['num_before', `${params.num_before}`],
        ['num_after', `${params.num_after}`],
      ]);
    }, output);

    const data = await messages(config).retrieve(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should render messages', async () => {
    const params = {
      content: 'Hello **world**',
    };
    const output = {
      result: 'success',
      msg: '',
      rendered: '<p>Hello <strong>world</strong></p>',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/messages/render`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(1);
      expect(body.content).to.equal(params.content);
    }, output);

    let data = await messages(config).render(params);
    expect(data).to.have.property('result', 'success');
    data = await messages(config).render(params.content);
    expect(data).to.have.property('result', 'success');
  });

  it('should update message', async () => {
    const params = {
      message_id: 131,
      content: 'New content',
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/131`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('PATCH');
    }, output);

    const data = await messages(config).update(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should get message by id', async () => {
    const params = {
      message_id: 1,
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/1`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('GET');
    }, output);

    const data = await messages(config).getById(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should get message history by id', async () => {
    const params = {
      message_id: 2,
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/2/history`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('GET');
    }, output);

    const data = await messages(config).getHistoryById(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should mark message as read', async () => {
    const params = {
      flag: 'read' as const,
      messages: [131],
    };

    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/flags`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(3);
      expect(body.flag).to.equal(params.flag);
      expect(body.op).to.equal('add');

      const messageList = JSON.parse(body.messages);
      expect(messageList).to.deep.equal(params.messages);
    }, output);

    const data = await messages(config).flags.add(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should mark message as unread', async () => {
    const params = {
      flag: 'read' as const,
      messages: [131],
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/flags`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(3);
      expect(body.flag).to.equal(params.flag);
      expect(body.op).to.equal('remove');

      const messageList = JSON.parse(body.messages);
      expect(messageList).to.deep.equal(params.messages);
    }, output);

    const data = await messages(config).flags.remove(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should delete reaction by message id', async () => {
    const params = {
      message_id: 1,
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/1/reactions`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('DELETE');
    }, output);

    const data = await messages(config).deleteReactionById(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should delete message by message id', async () => {
    const params = {
      message_id: 1,
    };
    const output = {
      msg: '',
      result: 'success',
    };
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/messages/1`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('DELETE');
    }, output);

    const data = await messages(config).deleteById(params);
    expect(data).to.have.property('result', 'success');
  });
});
