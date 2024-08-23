import { IWeapon } from '../interfaces/weapon.interface';

export abstract class Weapon<TSettings, TResult>
  implements IWeapon<TSettings, TResult>
{
  settings: TSettings;
  abstract calibrate(): TResult;

  constructor(settings: TSettings) {
    this.settings = settings;
  }
}
