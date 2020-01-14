import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersComponent, Item } from './advanced-data';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  form: FormGroup;
  itemList: Map<string, Item[]>;
  priceList: Map<string, Map<string, number>>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderComponent: OrdersComponent) { }

  createItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  initItemList(): void {
    this.itemList = new Map();
    this.itemList.set('CPU', this.orderComponent.cpuList);
    this.itemList.set('Motherboard', this.orderComponent.motherBoardList);
    this.itemList.set('Video Card', this.orderComponent.videoCardList);
    this.itemList.set('Memory', this.orderComponent.memoryList);
  }

  initPriceList(): void {
    this.priceList = new Map();
    let prices: Map<string, number> = new Map();
    for (let p of this.orderComponent.cpuList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('CPU', prices);

    prices = new Map();
    for (let p of this.orderComponent.motherBoardList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Motherboard', prices);

    prices = new Map();
    for (let p of this.orderComponent.videoCardList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Video Card', prices);

    prices = new Map();
    for (let p of this.orderComponent.memoryList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Memory', prices);

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      items: this.fb.array([ this.createItem() ])
    });

    this.initItemList();
    this.initPriceList();
  }

  addItem(): void {
    const items: FormArray = this.form.get('items') as FormArray;
    items.push(this.createItem());
  }

  removeItem(index: number): void {
    const items: FormArray = this.form.get('items') as FormArray;
    items.removeAt(index);
  }

  updateName(i: number, item: Item): void {
    this.form['controls']['items']['controls'][i]['controls'].name.patchValue(item.name);
    this.form['controls']['items']['controls'][i]['controls'].price.patchValue(item.price);
  }

  updatePrice(i: number, price: number): void {
    this.form['controls']['items']['controls'][i]['controls'].price.patchValue(price);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}