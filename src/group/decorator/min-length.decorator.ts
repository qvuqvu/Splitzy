import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function MinArrayLength(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minArrayLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [minLength] = args.constraints;
          return Array.isArray(value) && value.length >= minLength;
        },
        defaultMessage(args: ValidationArguments) {
          const [minLength] = args.constraints;
          return `Array must contain at least ${minLength} elements`;
        },
      },
    });
  };
}
