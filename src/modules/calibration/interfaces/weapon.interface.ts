export interface IWeapon<T, R> {
  settings: T;
  calibrate(): R;
}
