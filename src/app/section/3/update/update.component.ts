import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, Order, OrdersComponent } from '../advanced-data';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  ordersComponent: OrdersComponent;
  itemList: Map<string, Item[]>;
  priceList: Map<string, Map<string, number>>;
  form: FormGroup;
  itemCategories: string[] = [''];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order) { }

  createItem(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  initItems(index: number, category: string, name: string, price: number): void {
    const items = this.form['controls']['items'] as FormArray;
    const item = this.createItem();
    item.setValue({ category, name, price });
    items.push(item);
    this.updateName(index, item.value);
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
      customerName: [this.order.customerName, Validators.required],
      email: [this.order.email, [Validators.required, Validators.email]],
      items: this.fb.array([]),
      totalPrice: [this.order.totalPrice, [Validators.required]]
    });
    this.order.items.forEach((item, index) => { this.initItems(index, item.category, item.name, item.price) });
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