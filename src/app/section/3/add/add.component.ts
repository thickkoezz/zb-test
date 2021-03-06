import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersComponent, Item } from '../advanced-data';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  ordersComponent: OrdersComponent;
  itemList: Map<string, Item[]>;
  priceList: Map<string, Map<string, number>>;
  form: FormGroup;
  itemCategories: string[] = [''];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>) { }

  createItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  initItemList(): void {
    this.itemList = new Map();
    this.itemList.set('CPU', this.ordersComponent.cpuList);
    this.itemList.set('Motherboard', this.ordersComponent.motherBoardList);
    this.itemList.set('Video Card', this.ordersComponent.videoCardList);
    this.itemList.set('Memory', this.ordersComponent.memoryList);
  }

  initPriceList(): void {
    this.priceList = new Map();
    let prices: Map<string, number> = new Map();
    for (let p of this.ordersComponent.cpuList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('CPU', prices);

    prices = new Map();
    for (let p of this.ordersComponent.motherBoardList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Motherboard', prices);

    prices = new Map();
    for (let p of this.ordersComponent.videoCardList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Video Card', prices);

    prices = new Map();
    for (let p of this.ordersComponent.memoryList) {
      prices.set(p.name, p.price);
    }
    this.priceList.set('Memory', prices);
  }

  ngOnInit(): void {
    this.ordersComponent = new OrdersComponent();
    this.initItemList();
    this.initPriceList();

    this.form = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      items: this.fb.array([ this.createItem() ]),
      totalPrice: [0, [Validators.required]]
    });
  }

  updateName(index: number, item: Item): void {
    this.itemCategories[index] = item.category;
    this.form['controls']['items']['controls'][index]['controls'].name.patchValue(item.name);
    this.form['controls']['items']['controls'][index]['controls'].price.patchValue(item.price);
    let totalPrice = 0;
    for (let item of this.form['controls']['items']['controls']) {
      totalPrice += item['controls'].price.value;
    }
    this.form['controls'].totalPrice.patchValue(totalPrice);
  }

  updatePrice(index: number, price: number): void {
    this.form['controls']['items']['controls'][index]['controls'].price.patchValue(price);
    let totalPrice = 0;
    for (let item of this.form['controls']['items']['controls']) {
      totalPrice += item['controls'].price.value;
    }
    this.form['controls'].totalPrice.patchValue(totalPrice);
  }

  addItem(): void {
    const items: FormArray = this.form.get('items') as FormArray;
    items.push(this.createItem());
    this.itemCategories.push('');
  }

  removeItem(index: number): void {
    const items: FormArray = this.form.get('items') as FormArray;
    items.removeAt(index);
    this.itemCategories.splice(index, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}