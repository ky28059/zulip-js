import zulip from '../../lib';

if (process.argv.length < 7) {
  console.log(
    'Usage: $ts-node examples/typing-notifications/send-and-receive.ts realm-url sender-username sender-API-key recipient-username recipient-API-key',
  );
  process.exit(1);
}

const [, , realm, sender, senderAPIKey, recipientName, recipientAPIKey] =
  process.argv;

(async () => {
  const senderClient = await zulip({
    username: sender,
    apiKey: senderAPIKey,
    realm,
  });
  const recipientClient = await zulip({
    username: recipientName,
    apiKey: recipientAPIKey,
    realm,
  });

  const recipient = await recipientClient.users.me.getProfile();
  if (recipient.result === 'error')
    return console.error('recipient profile request failed:', recipient.msg);

  const res = await recipientClient.queues.register({
    event_types: ['typing'],
  });
  if (res.result === 'error')
    return console.error('queue registration failed:', res.msg);

  console.log(`Registered queue for ${recipient}`);
  const queueID = res.queue_id;

  console.log(
    await senderClient.typing.send({
      to: [recipient.user_id],
      op: 'start',
    }),
  );
  console.log(
    await recipientClient.events.retrieve({
      queue_id: queueID,
      last_event_id: -1,
    }),
  );
})();
