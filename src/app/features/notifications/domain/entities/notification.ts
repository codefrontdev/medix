import { AggregateRoot } from '@nestjs/cqrs';

export class Notification extends AggregateRoot {
  id: string;
  displayOrder: number;
  isVisible: boolean;
  public constructor(
    public readonly _id: string,
    public readonly userId: string,
    public readonly type: string,
    public message: string,
    public isRead: boolean,
    public readonly createdAt: Date,
    public updatedAt?: Date,
    public readonly deletedAt?: Date,
    public readonly createdBy?: string,
    public readonly updatedBy?: string,
    public readonly deletedBy?: string,
  ) {
    super();
  }

  // Domain-specific methods
  markAsRead(): void {
    this.isRead = true;
    this.apply({ event: 'NotificationRead', id: this._id, timestamp: new Date() });
  }

  updateMessage(newMessage: string): void {
    this.message = newMessage;
    this.updatedAt = new Date();
    this.apply({ event: 'NotificationUpdated', id: this._id, newMessage });
  }
}
