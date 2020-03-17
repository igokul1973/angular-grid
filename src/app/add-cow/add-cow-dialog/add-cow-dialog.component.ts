import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface IDialogData {
    animal: string;
    name: string;
}

@Component({
    selector: "app-add-cow-dialog",
    templateUrl: "./add-cow-dialog.component.html",
    styleUrls: ["./add-cow-dialog.component.scss"]
})
export class AddCowDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddCowDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
