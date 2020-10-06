import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@austinticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
