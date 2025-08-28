export interface ReadingModel {
  id?: number;
  deviceId: number;
  temperature: number;
  humidity: number;
  pressure?: number;
  light?: number;
  createdAt?: Date;
  updatedAt?: Date;
}