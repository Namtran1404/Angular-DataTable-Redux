import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../../service/api.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.css'
})
export class DeletemodalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletemodalComponent>,public apiService:APIService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(id: number): void {
    this.apiService.deleteUser(id)
    .subscribe(
      () => {
        console.log('User deleted successfully!');
        this.dialogRef.close(true);
        // Handle success, potentially update UI
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Handle error
      }
    );
    
  }
}
