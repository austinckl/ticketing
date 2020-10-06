import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@austinticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
