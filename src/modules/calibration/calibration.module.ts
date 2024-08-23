import { Module } from '@nestjs/common';
import { CalibrationController } from './calibration.controller';
import { CalibrationService } from './calibration.service';

@Module({
  controllers: [CalibrationController], // Add the controller here
  providers: [CalibrationService], // Add the service here
})
export class CalibrationModule {}
