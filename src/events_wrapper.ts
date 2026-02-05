import type { ZulipRC } from './zuliprc';
import type { ZulipEvent } from './types/events';
import queues from './resources/queues';
import events from './resources/events';

function sleep(ms: number) {
  // TODO add jitter.
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function eventsWrapper(config: ZulipRC) {
  const z = {
    queues: queues(config),
    events: events(config),
  };

  function logError(error: any) {
    console.log('zulip-js: Error while communicating with server:', error); // eslint-disable-line no-console
  }

  async function registerQueue(eventTypes?: string[]): Promise<{ queueId: string | null, lastEventId: number }> {
    let res;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const params = { event_types: eventTypes };
        res = await z.queues.register(params); // eslint-disable-line no-await-in-loop
        if (res.result === 'error') {
          logError(res.msg);
          await sleep(1000); // eslint-disable-line no-await-in-loop
        } else {
          return {
            queueId: res.queue_id,
            lastEventId: res.last_event_id,
          };
        }
      } catch (e) {
        logError(e);
      }
    }
  }

  async function callOnEachEvent(
    callback: (event: ZulipEvent) => void,
    eventTypes?: string[],
  ) {
    let queueId: string | null = null;
    let lastEventId = -1;
    const handleEvent = (event: ZulipEvent) => {
      lastEventId = Math.max(lastEventId, event.id);
      callback(event);
    };
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!queueId) {
        const queueData = await registerQueue(eventTypes); // eslint-disable-line no-await-in-loop
        queueId = queueData.queueId;
        lastEventId = queueData.lastEventId;
      }
      try {
        // eslint-disable-next-line no-await-in-loop
        const res = await z.events.retrieve({
          queue_id: queueId,
          last_event_id: lastEventId,
          dont_block: false,
        });
        if ('events' in res) {
          res.events.forEach(handleEvent);
        }
      } catch (e) {
        logError(e);
      }
      await sleep(1000); // eslint-disable-line no-await-in-loop
    }
  }

  return callOnEachEvent;
}
