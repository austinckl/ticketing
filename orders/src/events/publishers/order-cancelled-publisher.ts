import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@austinticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
