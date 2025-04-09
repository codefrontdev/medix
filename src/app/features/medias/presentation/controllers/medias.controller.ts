
import { Headers, Controller, Post, Body, UseGuards, UploadedFile, UseInterceptors, Get, Query, UnauthorizedException, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/features/auth/application/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppResult } from 'src/app/@core/shared/domain/shared/app-result';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasResponse } from '../contracts/response/medias.response';
import { MediasUploadCommand } from '../../application/commands/upload/medias-upload.command';
import { MediasResult } from '../../application/results/medias.result';
import { MediasUploadRequest } from '../contracts/request/medias-upload.request';
import { MediasGetFileRequest } from '../contracts/request/medias-get-file.request';
import { MediasGetQuery } from '../../application/queries/get/medias-get.query';
import { MediasGetRequest } from '../contracts/request/medias-get.request';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { getUploadsPathInPublicDirectory } from 'src/app/@core/utils/functions/miedas-functions';
import { JwtProviderService } from 'src/app/features/auth/application/services/jwt-provider.service';
import { appConstants } from 'src/app/@core/values/app-constants';
import { AppResponse } from 'src/app/@core/shared/presentation/contracts/response/app.response';


@Controller(
  {
    path: 'web/medias',
  },
)
export class MediasController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtProviderService: JwtProviderService,
  ) { }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() mediasUploadRequest: MediasUploadRequest,
  ): Promise<AppResponse<MediasResponse>> {
    const command =
      new MediasUploadCommand(
        file,
        mediasUploadRequest.isProtected,
      );

    const result =
      await this
        .commandBus
        .execute<MediasUploadCommand, AppResult<MediasResult>>(
          command,
        );

    const response =
      AppResponse
        .create<MediasResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get('get')
  public async get(
    @Query() mediasGetRequest: MediasGetRequest,
  ): Promise<AppResponse<MediasResponse>> {
    const query =
      new MediasGetQuery(
        mediasGetRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<MediasGetQuery, AppResult<MediasResult>>(
          query,
        );

    const response =
      AppResponse
        .create<MediasResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }

  @Get('getFile')
  public async getFile(
    @Query() mediasGetFileRequest: MediasGetFileRequest,
    @Headers() headers: Map<string, any>,
    @Res() res: Response,
  ): Promise<AppResponse<MediasResponse>> {
    const query =
      new MediasGetQuery(
        mediasGetFileRequest.id,
      );

    const result =
      await this
        .queryBus
        .execute<MediasGetQuery, AppResult<MediasResult>>(
          query,
        );

    if (result.isSuccess && result.data !== null) {
      const mediasResult = result.data;

      if (mediasResult.isProtected) {
        const token =
          headers[appConstants.authorizationHeader]
            ?.split(
              ' '
            )[1];

        const result =
          this
            .jwtProviderService
            .verifyAccessToken(
              token,
            );

        if (!result.isValid) {
          throw new UnauthorizedException();
        }
      }

      res
        .setHeader(
          'Content-Type',
          mediasResult.type || 'application/octet-stream',
        );

      res
        .setHeader(
          'Content-Disposition',
          `attachment; filename="${mediasResult.name}"`,
        );

      const fileStream =
        createReadStream(
          getUploadsPathInPublicDirectory(
            mediasResult.fullUrl,
          ),
        );

      fileStream
        .pipe(
          res
        );

      return;
    }

    const response =
      AppResponse
        .create<MediasResponse>(
          result.isSuccess,
          result.key,
          result.message,
          result.data,
          null,
          result.error,
        );

    return response;
  }
}