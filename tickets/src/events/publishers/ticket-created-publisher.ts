import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@austinticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
