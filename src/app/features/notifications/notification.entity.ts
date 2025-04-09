import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('notifications')
export class Notification {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column()
  isRead: boolean;

  @Column()
  createdAt: Date;

  constructor(userId: string, type: string, message: string, isRead: boolean, createdAt: Date) {
    this.userId = userId;
    this.type = type;
    this.message = message;
    this.isRead = isRead;
    this.createdAt = createdAt;
  }
}
