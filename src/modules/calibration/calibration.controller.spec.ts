import { Test, TestingModule } from '@nestjs/testing';
import { CalibrationController } from './calibration.controller';
import { CalibrationService } from './calibration.service';
import {
  ValidationPipe,
  ArgumentMetadata,
  INestApplication,
} from '@nestjs/common';
import { TurretSettingsDto } from './dto/turret-settings.dto';
import * as request from 'supertest';

const mockTurretSettings = {
  caliber: 102,
  rotationStart: 45,
  rotationEnd: 100,
  location: 'Bow',
  rotations: 3,
};

describe('CalibrationController', () => {
  let testapp: INestApplication;
  let controller: CalibrationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CalibrationController],
      providers: [CalibrationService],
    }).compile();

    testapp = app.createNestApplication();
    // This was the missing part
    testapp.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await testapp.init();

    controller = app.get<CalibrationController>(CalibrationController);
  });

  describe('settings', () => {
    it('should return settings when successful', async () => {
      expect(await controller.setSettings(mockTurretSettings)).toStrictEqual({
        caliber: 102,
        location: 'Bow',
        rotationEnd: 100,
        rotationStart: 45,
        rotations: 3,
      });
    });
    it('should validate the TurretSettingsDto', async () => {
      const target: ValidationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TurretSettingsDto,
        data: '',
      };
      await target.transform(<TurretSettingsDto>{}, metadata).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'Caliber cannot exceed 450mm.',
          'Caliber must be at least 102mm.',
          'Caliber must be an integer value.',
          'Rotation start cannot exceed 180 degrees.',
          'Rotation start must be at least 0 degrees.',
          'Rotation start must be an integer value.',
          'Rotation end must be greater than rotation start.',
          'Rotation end cannot exceed 180 degrees.',
          'Rotation end must be at least 0 degrees.',
          'Rotation end must be an integer value.',
          'There must be at least 1 rotation.',
          'Rotations must be an integer value.',
          'Location must be either "Bow" or "Stern".',
        ]);
      });
    });
  });
  describe('run', () => {
    it('should return report when successful', async () => {
      await controller.setSettings(mockTurretSettings);
      expect(await controller.runCalibration()).toStrictEqual({
        message: 'Calibration of Turret at Bow completed successfully',
        rotations: 3,
        totalDistance: 330,
      });
    });
    it('should return an error when unsuccessful', async () => {
      return request(testapp.getHttpServer())
        .post('/calibration/run')
        .expect(500)
        .expect({
          message: ['Weapon not set for calibration'],
          error: 'Internal Server Error',
          statusCode: 500,
        });
    });
  });
});
