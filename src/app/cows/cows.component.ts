import { Component, OnInit, Output } from "@angular/core";
import ICow from "./ICow";
import { CowsService } from "./cows.service";
import { EventEmitter } from "protractor";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-cows",
    templateUrl: "./cows.component.html",
    styleUrls: ["./cows.component.scss"]
})
export class CowsComponent implements OnInit {
    cows = new MatTableDataSource<ICow>();
    displayedColumns: string[] = [
        "id",
        "healthIndex",
        "endDate",
        "minValueDateTime",
        "type",
        "cowId",
        "animalId",
        "eventId",
        "deletable",
        "lactationNumber",
        "daysInLactation",
        "ageInDays",
        "startDateTime",
        "reportingDateTime",
        "edit",
        "delete"
    ];

    constructor(private cowsService: CowsService) {}

    ngOnInit() {
        this.getCows();
    }

    public getCows() {
        this.cowsService.getCows().subscribe(data => {
            this.cows = new MatTableDataSource(data);
        });
    }

    public deleteCow(id: number) {
        // TODO: Here the pop-up asking confirmation could be used
        this.cowsService.deleteCow(id).subscribe(
            data => {
                // refresh data in the table
                this.getCows();
            },
            error => {
                // Here we can create message for failed deletion
                console.error(error);
            }
        );
    }

    public editCow(id: number) {
        // this.delete.emit(cow);
    }
}
