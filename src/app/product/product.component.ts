import { DepartamentService } from './../departament/departament.service';
import { Departament } from './../departament/departament';
import { ProductService } from './product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Product } from './product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit , OnDestroy {

  productForm = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    price: [0 , [Validators.required , Validators.min(0)]],
    stock: [0 , [ Validators.required , Validators.min(0)]],
    departaments: [[], [Validators.required]]
  });

  products: Product[] = [];
  departaments: Departament[] = [];
  subs = new Subscription();
  @ViewChild('form') form: NgForm;

  constructor(
    private service: ProductService,
    private fb: FormBuilder,
    private depService: DepartamentService
  ) { }

  ngOnInit(): void {
    this.subs.add(this.service.get().subscribe( (prods) => {
      this.products = prods;
    }));
    this.subs.add(this.depService.get().subscribe((deps) => {
      this.departaments = deps;
    }));
  }

  ngOnDestroy(): void {
    if (this.subs){
      this.subs.unsubscribe();
    }
  }
  save(): void {
    const data = this.productForm.value;
    if (data._id != null) {
      this.subs.add(
        this.service.update(data).subscribe((res) => {
        })
      );
    } else {
      this.subs.add(
        this.service.add(data).subscribe()
      );
    }
    this.form.resetForm();

  }
  cancel(): void {

  }
  edit(p): void{
    this.productForm.setValue(p);

  }
  delete(p): void {
    this.subs.add(
      this.service.del(p).subscribe()
    );
  }
  resetForm(): void {
    this.form.resetForm();
  }

}
