import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Departament } from './departament';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  readonly url = 'http://localhost:3000/departaments';

  private departamentSubject$: BehaviorSubject<Departament[]> = new BehaviorSubject(null);
  private load = false;

  constructor( private http: HttpClient) { }

  get(): Observable<Departament[]> {
    if (!this.load) {
       this.http.get<Departament[]>(this.url)
       .pipe(
         tap((dep) => console.log(dep))
       )
       .subscribe(this.departamentSubject$);
       this.load = true;
    }
    return this.departamentSubject$.asObservable();
  }

  add(d: Departament): Observable<Departament>{
    return this.http.post<Departament>(this.url , d)
    .pipe(
      tap((dep: Departament) => this.departamentSubject$.getValue().push(dep))
    );
  }

  del( dep: Departament): Observable<any>{
    return this.http.delete<any>(this.url + '/' + dep._id)
      .pipe(
        tap(() => {
          const departaments = this.departamentSubject$.getValue();
          const i = departaments.findIndex(d => d._id === dep._id);
          if (i >= 0){
            departaments.splice( i , 1);
          }
        })
      );
  }

  update(dep: Departament): Observable<Departament> {
    return this.http.patch<Departament>(this.url + '/' + dep._id, dep)
    .pipe(
      tap((d) => {
        const departaments = this.departamentSubject$.getValue();
        const i = departaments.findIndex(d => d._id === dep._id);
        if (i >= 0){
          departaments[i].name = d.name;
        }
      })
    );
  }
}
