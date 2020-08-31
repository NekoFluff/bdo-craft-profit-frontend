import { createAction } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

type ActionPayload = {
  onStart?: string;
  onSuccess?: string;
  onError?: string;
};
export type APIPayload = AxiosRequestConfig & ActionPayload;

export const apiCallBegan = createAction<APIPayload>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
