import request from "@/utils/request";
import type { AxiosRequestConfig } from "axios";

export const upload = (data: any, config?: AxiosRequestConfig<any>) => {
  return request.post("/upload", data, config);
};
