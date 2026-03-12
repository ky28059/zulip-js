import { expect } from 'chai';
import lib from '../lib/index';
import { bodyToRecord, config, stubNetwork } from './common';

const params = {
  one: '123',
  two: '456',
};

const output = {
  data: 'random',
  msg: '',
  result: 'success',
};

describe('Index', () => {
  it('should call get endpoints', async () => {
    const z = await lib(config);
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/testurl`);
      expect(options.method).to.be.equal('GET');
      expect(options).to.not.have.property('body');
      expect([...new URL(url).searchParams]).to.have.deep.members([
        ['one', params.one],
        ['two', params.two],
      ]);
    }, output);

    expect((await z.callEndpoint('/testurl', 'GET', params))).to.have.property(
      'result',
      'success',
    );
    expect((await z.callEndpoint('testurl', 'GET', params))).to.have.property(
      'result',
      'success',
    );
  });

  it('should call post endpoints', async () => {
    const z = await lib(config);
    stubNetwork((url, options) => {
      expect(url).to.contain(`${config.apiURL}/testurl`);
      expect(options.method).to.be.equal('POST');

      const body = bodyToRecord(options.body);
      expect(Object.keys(body).length).to.equal(2);
      expect(body.one).to.equal(params.one);
      expect(body.two).to.equal(params.two);
    }, output);

    expect((await z.callEndpoint('/testurl', 'POST', params))).to.have.property(
      'result',
      'success',
    );
    expect((await z.callEndpoint('testurl', 'POST', params))).to.have.property(
      'result',
      'success',
    );
  });
});
