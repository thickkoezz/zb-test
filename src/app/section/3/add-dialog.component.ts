import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order, OrdersComponent } from './advanced-data';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup;
  itemList: Map<string, any>;
  itemIndex: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderComponent: OrdersComponent) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      items: this.fb.array([
        this.fb.group({
          category: ['', Validators.required],
          name: ['', Validators.required],
          price: ['', Validators.required]
        })
      ])
    });
    this.itemList = new Map();
    this.itemList.set('CPU', this.orderComponent.cpuList);
    this.itemList.set('Motherboard', this.orderComponent.motherBoardList);
    this.itemList.set('Video Card', this.orderComponent.videoCardList);
    this.itemList.set('Memory', this.orderComponent.memoryList);
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}