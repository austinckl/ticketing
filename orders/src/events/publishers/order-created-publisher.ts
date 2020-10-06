import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@austinticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
