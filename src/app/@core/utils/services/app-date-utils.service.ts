import { Injectable } from '@nestjs/common';
import { add } from 'date-fns';

@Injectable()
export class AppDateUtilsService {
  public constructor(
  ) { }

  public getCurrentDateWithDuration(
    duration: string,
  ): Date {
    const durationMapping = {
      'd': 'days',
      'h': 'hours',
      'm': 'minutes',
      's': 'seconds'
    };

    const regex = /(\d+)([dhms])/g;

    let currentDate = new Date();

    let match: any;

    while ((match = regex.exec(duration)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = durationMapping[match[2]];

      currentDate =
        add(
          currentDate,
          { [unit]: value },
        );
    }

    return currentDate;
  }
}
