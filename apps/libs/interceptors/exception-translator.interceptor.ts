import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionTranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(
          () =>
            new HttpException(
              err.message || 'Error desconocido del microservicio.',
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
