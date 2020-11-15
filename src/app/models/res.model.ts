export interface Res<T> {
  status: string;
  message: string;
  count?: number;
  data: T;
}
