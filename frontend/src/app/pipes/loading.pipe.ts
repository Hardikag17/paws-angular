import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, Observable, map, startWith, catchError, of } from 'rxjs';

@Pipe({
  name: 'loading',
})
export class LoadingPipe implements PipeTransform {
  transform(value: Observable<any>): Observable<{
    loading: boolean;
    value?: any;
    error?: any;
  }> {
    return isObservable(value)
      ? value.pipe(
          map((value: any) => ({ loading: false, value })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : value;
  }
}
