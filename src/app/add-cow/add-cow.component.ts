import { Component, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddCowDialogComponent } from "./add-cow-dialog/add-cow-dialog.component";

export interface DialogData {
    animal: string;
    name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
    selector: "app-add-cow",
    templateUrl: "./add-cow.component.html",
    styleUrls: ["./add-cow.component.scss"]
})
export class AddCowComponent {
    animal: string;
    name: string;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(AddCowDialogComponent, {
            width: "250px",
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed");
            this.animal = result;
        });
    }
}
