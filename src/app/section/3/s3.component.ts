import { Component, OnInit } from '@angular/core';
import { faCat, faDog, faFish } from '@fortawesome/free-solid-svg-icons';
import { OrdersComponent, Order } from './advanced-data';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html',
  styleUrls: ['./s3.component.scss']
})
export class S3Component implements OnInit {
  faCat = faCat;
  faDog = faDog;
  faFish = faFish;
  ordersComponent: OrdersComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ordersComponent = new OrdersComponent();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {data: {}});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) this.ordersComponent.orders.push(result);
    });
  }

  openUpdateDialog(order: Order, index: number): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {
        customerName: order.customerName,
        email: order.email,
        items: order.items,
        totalPrice: order.totalPrice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) this.ordersComponent.orders.splice(index, 1, result);
    });
  }
}
