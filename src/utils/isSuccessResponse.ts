import { Response } from "src/store/api/api";

export function isSuccessResponse<T>(response: Response<T>): response is {
  success: true;
  data: T;
} {
  return response.success;
}
