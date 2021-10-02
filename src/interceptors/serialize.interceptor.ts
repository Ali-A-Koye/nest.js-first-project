import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  
  import { Observable } from 'rxjs';
  
  import { map } from 'rxjs/operators';
  
  // import { UserDto } from 'src/users/dto/user.dto';
  import { plainToClass } from 'class-transformer';
  
  export function Serialize (dto:any){
  
    return UseInterceptors(new SerializeInterceptor(dto))
  
  
  }
  export class SerializeInterceptor implements NestInterceptor {
  
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
      //Run Somethin before reqest is handled by Request handler
    
      return handler.handle().pipe(
        map((data: any) => {
          return plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          });
            
          //run somethin before response is sent out
        }),
      );
    }
  }
  