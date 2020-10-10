import { DepartamentService } from './departament.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Departament } from '../departament/departament';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.scss']
})
export class DepartamentComponent implements OnInit, OnDestroy {

  depName = '';

  departaments: Departament[] = [];

  depEdit: Departament = null;

  subs = new Subscription();

  constructor(
    private service: DepartamentService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  save(): void {
    if (this.depEdit) {
      this.subs.add(
        this.service.update({ name: this.depName, _id: this.depEdit._id })
          .subscribe((dep) => {
            this.clearFild();
            this.notify('Updating');
          }, (err) => {
            this.notify('Error');
          })
      );

    } else {
      this.subs.add(
        this.service.add({ name: this.depName }).subscribe((dep) => {
          console.log(dep);
          this.notify('Adding');
          this.clearFild();
        }, (err) => {
          console.error(err);
        })
      );
    }
  }

  cancel(): void {
    this.clearFild();
  }
  delete(dep: Departament): void {
    this.service.del(dep).subscribe(() => {
      this.notify('Deleted');
    }, err => this.notify(err.error.msg));
  }

  edit(dep: Departament): void {
    this.depName = dep.name;
    this.depEdit = dep;
  }
  getDepartments(): void {
    this.service.get().subscribe(deps => {
      this.departaments = deps;
    });
  }
  clearFild(): void {
    this.depName = '';
    this.depEdit = null;
  }
  notify(msg: string): void {
    this.snack.open(msg, 'ok', { duration: 4000 });
  }
  ngOnDestroy(): void{
    if (this.subs){
      this.subs.unsubscribe();
    }
  }

}
