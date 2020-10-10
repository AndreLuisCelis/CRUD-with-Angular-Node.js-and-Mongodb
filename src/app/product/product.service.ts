import { DepartamentService } from './../departament/departament.service';
import { Product } from './product';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Departament } from '../departament/departament';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  loaded = false;

  constructor(
    private http: HttpClient,
    private depService: DepartamentService) { }

  get(): Observable<Product[]>{
    if (!this.loaded){
      combineLatest([
        this.http.get<Product[]>(this.url),
        this.depService.get()])
        .pipe(
          filter(([products , departaments]) => products != null && departaments != null),
           map(([products, departaments]) => {
            for ( const p of products){
              const ids = (p.departaments as string []);
              p.departaments = ids.map((id) => departaments.find(dep => dep._id === id));
            }
            return products;
           }),
           tap ((products) => console.log(products))
        )
      .subscribe(this.productsSubject$);
      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  add( prod: Product): Observable<Product> {
    const departaments = (prod.departaments as Departament[])
    .map((d) => d._id);
    return this.http.post<Product>(this.url , {...prod , departaments})
    .pipe(
      tap((p) => {
        this.productsSubject$.getValue()
        .push({...prod , _id: p._id});
      })
    );
  }

  del( prod: Product): Observable<any> {
    return this.http.delete(this.url + '/' + prod._id)
    .pipe (
      tap(() => {
        const i = this.productsSubject$.getValue()
        .findIndex((p) => p._id === prod._id );
        if (i >= 0){
          this.productsSubject$.getValue().splice(i , 1);
        }
      })
    );
  }

  update(prod: Product): Observable<Product> {
    const departaments = (prod.departaments as Departament[])
    .map((d) => d._id);
    return this.http.patch<Product>(this.url + '/' + prod._id, {...prod, departaments})
    .pipe(
      tap(() => {
        const i = this.productsSubject$.getValue()
        .findIndex((p) => p._id === prod._id );
        if (i >= 0){
          this.productsSubject$.getValue()[i] = prod;
        }
      })
    );
  }
}
