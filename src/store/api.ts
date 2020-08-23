import { createAction } from "@reduxjs/toolkit";

type apiPayload = {
  // /bugs
  // PATCH /bugs/1
  url: string,
  method?: string,
  data?: any,
  onSuccess: string,
  onStart?: string,
  onError?: string
}

export const apiCallBegan = createAction<apiPayload>("api/callBegan");
export const apiCallSuccess = createAction<any>("api/callSuccess");
export const apiCallFailed = createAction<any>("api/callFailed");
