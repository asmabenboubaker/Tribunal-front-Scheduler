export interface Audience {
    title: string;
    startDate: Date;
    endDate: Date;
    dayLong: boolean; // If the event lasts the whole day (all-day event)
    recurrence?: string; // Recurrence rule for recurring events (optional)
  }