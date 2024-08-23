import { ITurretReport } from '../interfaces/turret-report.interface';
import { ITurretSettings } from '../interfaces/turret-settings.interface';
import { Weapon } from './weapon.model';

export class Turret extends Weapon<ITurretSettings, ITurretReport> {
  constructor(settings: ITurretSettings) {
    super(settings);
  }

  calibrate(): ITurretReport {
    const totalDistance = this.calculateTotalDistance();
    return {
      rotations: this.settings.rotations,
      totalDistance,
      message: `Calibration of Turret at ${this.settings.location} completed successfully`,
    };
  }

  private calculateTotalDistance(): number {
    const distancePerRotation =
      (this.settings.rotationEnd - this.settings.rotationStart) * 2;
    return distancePerRotation * this.settings.rotations;
  }

  getSettings(): ITurretSettings {
    return this.settings;
  }
}
