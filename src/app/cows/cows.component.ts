import { Component, OnInit } from "@angular/core";
import ICow from "./ICow";
import { CowsService } from "./cows.service";

@Component({
    selector: "app-cows",
    templateUrl: "./cows.component.html",
    styleUrls: ["./cows.component.scss"]
})
export class CowsComponent implements OnInit {
    cows: ICow[];
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
        "reportingDateTime"
    ];
    constructor(private cowsService: CowsService) {}

    ngOnInit() {
        this.getCows();
    }

    public getCows() {
        this.cowsService.getCows().subscribe(
            data => {
                this.cows = data;
            },
            error => {
                console.error(error);
            }
        );
    }
}
