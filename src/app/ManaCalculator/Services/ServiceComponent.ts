import { Observable, forkJoin } from "rxjs"

export class ServiceComponent {
    
    getData(observables: Observable<boolean>[]) : Observable<boolean> {
      return new Observable<boolean>(observer => {  
          forkJoin(observables).subscribe({
            next: (val) => {
              if(val.every(result => result))
                observer.next(true)
              else
                observer.next(false)
            },
            error: (error) => observer.error(error),
            complete: () => observer.complete()
          })
      })
    }
}