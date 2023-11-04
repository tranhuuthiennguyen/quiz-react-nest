import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class SnakeToCamelInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    let request = context.switchToHttp().getRequest()

    request.body = this.transformKeysToCamelCase(request.body)

    return next.handle()
  }

  private transformKeysToCamelCase(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformKeysToCamelCase(item))
    }

    const camelCaseObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase())
        camelCaseObj[camelCaseKey] = this.transformKeysToCamelCase(obj[key])
      }
    }

    return camelCaseObj
  }
}