import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Observable, map } from "rxjs";

@Injectable()
export class ExcludeFieldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => instanceToPlain(data)))
  }
}