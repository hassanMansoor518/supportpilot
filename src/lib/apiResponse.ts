import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown[];
}

export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  errors?: unknown[]
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function unauthorizedResponse(
  message = "Unauthorized"
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, message }, { status: 401 });
}

export function notFoundResponse(
  message = "Not found"
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, message }, { status: 404 });
}

export function serverErrorResponse(
  message = "Internal server error"
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, message }, { status: 500 });
}
