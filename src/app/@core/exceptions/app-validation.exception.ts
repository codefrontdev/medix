import { BadRequestException } from '@nestjs/common';

export class AppValidationException extends BadRequestException {
    public constructor(
        public errors: any[],
    ) {
        super(
            'Validation error',
        );
    }
}