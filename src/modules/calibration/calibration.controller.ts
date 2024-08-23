import { Body, Controller, HttpException, Post, Put } from '@nestjs/common';
import { CalibrationService } from './calibration.service';
import { TurretSettingsDto } from './dto/turret-settings.dto';
import { ITurretReport } from './interfaces/turret-report.interface';
import { ITurretSettings } from './interfaces/turret-settings.interface';

@Controller('calibration')
export class CalibrationController {
  constructor(private readonly calibrationService: CalibrationService) {}

  @Put('settings')
  async setSettings(
    @Body() settings: TurretSettingsDto,
  ): Promise<ITurretSettings> {
    try {
      return this.calibrationService.setWeapon(settings);
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        error.status,
      );
    }
  }

  @Post('run')
  async runCalibration(): Promise<ITurretReport> {
    return this.calibrationService.runCalibration();
  }
}
