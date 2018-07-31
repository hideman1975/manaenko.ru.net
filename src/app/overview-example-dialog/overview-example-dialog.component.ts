import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-overview-example-dialog',
  templateUrl: './overview-example-dialog.component.html',
  styleUrls: ['./overview-example-dialog.component.css']
})
export class OverviewExampleDialogComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogDataExampleComponent, {
      data: {
        icon: 'gagagagagagag'
      },
      // width: '450px',
      // height: '200px',
      disableClose: true,
      autoFocus: false
    });
  }

}

@Component({
  selector: 'app-data-example-component',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./overview-example-dialog.component.css']
})
export class DialogDataExampleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  chose(choice) {
    console.log('user chose: ', choice);
  }
}
