import { Component, OnInit } from '@angular/core';
import { faCat, faDog, faFish } from '@fortawesome/free-solid-svg-icons';
import { OrdersComponent, Order } from './advanced-data';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog.component';

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
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        categories: this.ordersComponent.categories,
        cpuList: this.ordersComponent.cpuList,
        motherBoardList: this.ordersComponent.motherBoardList,
        videoCardList: this.ordersComponent.videoCardList,
        memoryList: this.ordersComponent.memoryList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.ordersComponent.orders.push(result);
    });
  }
}
