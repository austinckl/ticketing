import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@austinticketing/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
