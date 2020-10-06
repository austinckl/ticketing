import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@austinticketing/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'alskdfj',
    expiresAt: 'alskdjf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});

it('test', async () => {
  const transaction1 = { transactionId: 'transaction1' };
  const transaction2 = { transactionId: 'transaction2' };
  const transaction3 = { transactionId: 'transaction3' };
  const event = new Wallet('abc', 'usd', [
    transaction1,
    transaction2,
    transaction3,
  ]);
  console.log(event.getId());
  console.log(event);

  const serEvent = JSON.stringify(event);
  console.log(serEvent);

  const deserEvent = JSON.parse(serEvent);
  console.log(deserEvent);

  const walletEvent = deserEvent as Wallet;
  console.log(walletEvent);
  console.log(walletEvent.eventId);

  const walletEvent2 = deserEvent as Wallet;
  console.log(walletEvent2);
  console.log(walletEvent2.eventId);

  const wallet1 = Object.assign(new Wallet(), {
    aggregateId: 'abc',
    currencyId: 'usd',
    transactions: [
      { transactionId: 'transaction1' },
      { transactionId: 'transaction2' },
      { transactionId: 'transaction3' },
    ],
  });
  console.log(wallet1);
  console.log(wallet1.getId());
  console.log(wallet1.eventId);
});

class AggregateRoot {
  constructor(public readonly eventId: string) {}
}

interface Transaction {
  transactionId: string;
}

class Wallet extends AggregateRoot {
  constructor(
    public readonly aggregateId?: string,
    public readonly currencyId?: string,
    public readonly transactions?: Transaction[]
  ) {
    super('heyyyyy');
  }

  getId() {
    return this.aggregateId;
  }
}
