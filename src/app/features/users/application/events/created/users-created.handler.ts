/** @format */

import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UsersCreatedEvent } from "./users-created.event";

@EventsHandler(UsersCreatedEvent)
export class UsersCreatedHandler implements IEventHandler<UsersCreatedEvent> {
  public async handle(event: UsersCreatedEvent): Promise<void> {
    console.log("User Created:", event.id);
  }
}
