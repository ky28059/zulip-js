import { expect } from 'chai';
import users from '../../lib/resources/users';
import { bodyToRecord, config, stubNetwork } from '../common';

describe('Users', () => {
  it('should fetch users', async () => {
    const output = {
      msg: '',
      result: 'success',
      members: [
        {
          email: 'iago@zulip.com',
          user_id: 5,
          full_name: 'Iago',
          bot_type: null,
          is_bot: false,
          is_admin: true,
          is_active: true,
          avatar_url:
            'https://secure.gravatar.com/avatar/af4f06322c177ef4e1e9b2c424986b54?d=identicon&version=1',
        },
        {
          email: 'cordelia@zulip.com',
          user_id: 3,
          full_name: 'Cordelia Lear',
          bot_type: null,
          is_bot: false,
          is_admin: false,
          is_active: true,
          avatar_url:
            'https://secure.gravatar.com/avatar/77c3871a68c8d70356156029fd0a4999?d=identicon&version=1',
        },
      ],
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await users(config).retrieve();
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch user profile', async () => {
    const output = {
      short_name: 'sample-bot',
      result: 'success',
      msg: '',
      is_bot: true,
      email: 'sample-bot@localhost',
      pointer: -1,
      max_message_id: 131,
      full_name: 'Sample',
      user_id: 45,
      client_id: '77431db17e4f32068756902d7c09c8bb',
      is_admin: false,
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users/me`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
    }, output);

    const data = await users(config).me.getProfile();
    expect(data).to.have.property('result', 'success');
  });

  it('should subscribe user to stream', async () => {
    const params = {
      subscriptions: [{ name: 'off topic' }],
    };
    const output = {
      already_subscribed: {},
      result: 'success',
    };

    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users/me/subscriptions`);
      expect(options.method).to.be.equal('POST');
      expect(options).to.have.property('body');
      
      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(1);
      expect(JSON.parse(body.subscriptions)).to.deep.equal(params.subscriptions);
    }, output);

    const data = await users(config).me.subscriptions.add(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should remove subscriptions', async () => {
    const params = {
      subscriptions: ['Verona'],
    };
    const output = {
      result: 'success',
      not_subscribed: [],
      msg: '',
      removed: JSON.stringify(['Verona']),
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users/me/subscriptions?subscriptions=%5B%22Verona%22%5D`);
      expect(options.method).to.be.equal('DELETE');
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('DELETE');
    }, output);

    const data = await users(config).me.subscriptions.remove(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should create a new user', async () => {
    const params = {
      email: 'newbie@zulip.com',
      password: 'temp',
      full_name: 'New User',
      short_name: 'newbie',
    };
    const output = {
      result: 'success',
      msg: '',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users`);
      expect(options).to.have.property('body');
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(4);
      expect(body.email).to.equal(params.email);
      expect(body.password).to.equal(params.password);
      expect(body.full_name).to.equal(params.full_name);
      expect(body.short_name).to.equal(params.short_name);
    }, output);

    const data = await users(config).create(params);
    expect(data).to.have.property('result', 'success');
  });

  it('should fetch users alert words', async () => {
    const output = {
      result: 'success',
      msg: '',
    };
    stubNetwork((url, options) => {
      expect(url).to.equal(`${config.apiURL}/users/me/alert_words`);
      expect(options).to.not.have.property('body');
      expect(options.method).to.be.equal('GET');
    }, output);

    const data = await users(config).me.alertWords.retrieve();
    expect(data).to.have.property('result', 'success');
  });
});
