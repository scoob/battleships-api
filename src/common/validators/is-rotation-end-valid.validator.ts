import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isRotationEndValid', async: false })
export class IsRotationEndValid implements ValidatorConstraintInterface {
  validate(rotationEnd: number, args: ValidationArguments) {
    const { object } = args;
    return rotationEnd > object['rotationStart'];
  }

  defaultMessage(args: ValidationArguments) {
    const start = args.object['rotationStart'];
    return `Rotation end (${args.value}) must be greater than rotation start (${start}).`;
  }
}
