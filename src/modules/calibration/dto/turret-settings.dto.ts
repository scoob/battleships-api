import { IsInt, Min, Max, IsIn, Validate } from 'class-validator';
import { IsRotationEndValid } from '../../../common/validators/is-rotation-end-valid.validator';
import { ITurretSettings } from '../interfaces/turret-settings.interface';
export class TurretSettingsDto implements ITurretSettings {
  @IsInt({ message: 'Caliber must be an integer value.' })
  @Min(102, { message: 'Caliber must be at least 102mm.' })
  @Max(450, { message: 'Caliber cannot exceed 450mm.' })
  caliber: number;

  @IsInt({ message: 'Rotation start must be an integer value.' })
  @Min(0, { message: 'Rotation start must be at least 0 degrees.' })
  @Max(180, { message: 'Rotation start cannot exceed 180 degrees.' })
  rotationStart: number;

  @IsInt({ message: 'Rotation end must be an integer value.' })
  @Min(0, { message: 'Rotation end must be at least 0 degrees.' })
  @Max(180, { message: 'Rotation end cannot exceed 180 degrees.' })
  @Validate(IsRotationEndValid, {
    message: 'Rotation end must be greater than rotation start.',
  })
  rotationEnd: number;

  @IsInt({ message: 'Rotations must be an integer value.' })
  @Min(1, { message: 'There must be at least 1 rotation.' })
  rotations: number;

  @IsIn(['Bow', 'Stern'], {
    message: 'Location must be either "Bow" or "Stern".',
  })
  location: string;
}
