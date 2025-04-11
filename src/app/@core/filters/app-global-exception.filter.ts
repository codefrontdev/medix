/** @format */

import {
  Injectable,
  HttpStatus,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AppLoggerService } from "../logger/app-logger.service";
import { AppError } from "../shared/domain/shared/app-error";
import { AppResult } from "../shared/domain/shared/app-result";
import { expression } from "joi";
import { AppResponse } from "../shared/presentation/contracts/response/app.response";
@Injectable()
export class AppGlobalExceptionFilter implements ExceptionFilter {
  public constructor(private readonly logger: AppLoggerService) {}

  public async catch(exception: any, host: ArgumentsHost): Promise<void> {
    this.logger.error(exception.message, exception.stack);

    const context = host.switchToHttp();

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const problemDetails = this.getProblemDetails(exception);
    // console.log("problemDetails", exception);

    let statusCode = problemDetails.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let result = null;
    if (exception instanceof AppResult) {
      statusCode = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      result = AppResponse.create(
        false,
        exception.error.code,
        exception.error.message,
        null,
        null,
        exception
      );
    } else {
      result = problemDetails;
    }

    response.status(statusCode).json(result);
  }

  private getProblemDetails(exception: any): ProblemDetails {
    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as any;

      return new ProblemDetails(
        HttpStatus.BAD_REQUEST,
        "ValidationFailure",
        "Validation error",
        "One or more validation errors occurred",
        response.message,
        exception.stack
      );
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as any;
      const status = exception.getStatus();
      const details =
        typeof response === "string" ? response : (
          response["message"] || exception.message
        );

      return new ProblemDetails(
        status,
        this.getExceptionType(status),
        exception.name,
        details,
        null,
        exception.stack
      );
    }

    console.log("exception", exception instanceof AppResult);

    return new ProblemDetails(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "ServerFailure",
      "Server error",
      exception.message,
      null,
      exception.stack
    );
  }

  private getExceptionType(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return "ValidationFailure";

      case HttpStatus.UNAUTHORIZED:
        return "Unauthorized";

      case HttpStatus.NOT_FOUND:
        return "NotFound";

      default:
        return "ServerFailure";
    }
  }
}

class ProblemDetails {
  public constructor(
    public readonly status: number,
    public readonly type: string,
    public readonly title: string,
    public readonly details: string,
    public readonly errors: any[] | null,
    public readonly stackTrace?: any
  ) {}
}
