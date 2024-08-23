import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ITurretReport } from './interfaces/turret-report.interface';
import { ITurretSettings } from './interfaces/turret-settings.interface';
import { Turret } from './models/turret.model';

@Injectable()
export class CalibrationService {
  private weapon: Turret;

  setWeapon(settings: ITurretSettings): ITurretSettings {
    try {
      this.weapon = new Turret(settings);
      return this.weapon.getSettings();
    } catch (error) {
      throw new InternalServerErrorException([
        `Error setting calibration settings: ${error}`,
      ]);
    }
  }

  runCalibration(): ITurretReport {
    if (!this.weapon) {
      throw new InternalServerErrorException([
        'Weapon not set for calibration',
      ]);
    }
    return this.weapon.calibrate();
  }
}
