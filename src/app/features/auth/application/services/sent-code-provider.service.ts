import { Injectable } from '@nestjs/common';
import { SentCodeEnum } from '../../@core/values/enums/sent-code.enum';
import { customAlphabet } from 'nanoid';
import { isEmail } from 'class-validator';

@Injectable()
export class SentCodeProviderService {
  public constructor(
  ) { }

  public async generateCode(
    sentCodeEnum: SentCodeEnum,
  ): Promise<string> {
    return this
      .customGenerate(
        sentCodeEnum.alphabet,
        sentCodeEnum.length,
      );
  }

  public obfuscateSentTo(
    sentTo: string,
  ): string {
    const emailCondition =
      isEmail(
        sentTo,
      );

    if (emailCondition) {
      const email = sentTo;

      const [localPart, domain] =
        email
          .split(
            '@',
          );

      const slicedLocalPart =
        localPart
          .slice(
            0,
            2,
          );

      const repeatedLocalPart =
        '*'
          .repeat(
            localPart.length - 2,
          );

      return `${slicedLocalPart}${repeatedLocalPart}@${domain}`;

    }

    const phoneNumber = sentTo;

    const slicedStart =
      phoneNumber
        .slice(
          0,
          2,
        );

    const repeatedRest =
      '*'
        .repeat(
          phoneNumber.length - 4,
        );

    const slicedEnd =
      phoneNumber
        .slice(
          0,
          2,
        );

    return `${slicedStart}${repeatedRest}${slicedEnd}`;
  }

  private async customGenerate(
    alphabet: string,
    length: number,
  ): Promise<string> {
    const code =
      customAlphabet(
        alphabet,
        length,
      );

    return code();
  }
}
