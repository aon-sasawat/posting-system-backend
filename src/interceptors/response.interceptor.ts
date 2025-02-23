import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        message: "Success",
        code: 200,
      })),
      catchError((error) => {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error instanceof HttpException ? error.getResponse() : "Internal server error";

        return throwError(
          () =>
            new HttpException(
              {
                data: null,
                message,
                code: status,
              },
              status,
            ),
        );
      }),
    );
  }
}
