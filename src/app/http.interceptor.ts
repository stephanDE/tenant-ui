import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ToastrHttpInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && evt.body.name) {
                        this.toasterService.success('Mieter erstellt');
                    }
                    if(evt.body && evt.body.moveDate) {
                        this.toasterService.success('Mieter umgezogen');
                    }
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                        this.toasterService.error(err.error.message, err.error.title);
                    } catch(e) {
                        this.toasterService.error('An error occurred', '');
                    }
                }
                throw(err);
            }));
    
      }
      
}