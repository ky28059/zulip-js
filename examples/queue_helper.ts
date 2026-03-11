import path from 'path';
import zulip from '../lib';

const zuliprc = path.resolve('/path/to/your/zuliprc');

(async () => {
  const z = await zulip({ zuliprc });
  await z.callOnEachEvent((event) => {
    console.log('Got Event:', event);
  }, ['message']);
})();
