import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
	public async transform(
		value: any,
		{ metatype }: ArgumentMetadata,
	): Promise<any> {
		const isValid =
			this
				.toValidate(
					metatype,
				);


		if (!metatype || !isValid) {
			return value;
		}

		const object =
			plainToClass(
				metatype,
				value,
			);

		const errors =
			await validate(
				object,
			);

		if (errors.length > 0) {
			throw new BadRequestException(
				this
					.formatErrors(
						errors,
					),
			);
		}

		return value;
	}

	private toValidate(
		metatype: Function,
	): boolean {
		const types: Function[] = [
			String,
			Boolean,
			Number,
			Array,
			Object,
		];

		return !types
			.includes(
				metatype,
			);
	}

	private formatErrors(
		errors: ValidationError[],
	): Array<ValidationError> {
		return errors
			.map(
				err => (
					{
						property: err.property,
						constraints: err.constraints,
					}
				),
			);
	}
}
