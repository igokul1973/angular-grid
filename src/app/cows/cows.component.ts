import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import ICow from "./ICow";
import { CowsService } from "./cows.service";
import { MatTableDataSource } from "@angular/material/table";
import { Validators, FormControl } from "@angular/forms";
import { inspect } from "util";
import { subscribeOn } from "rxjs/operators";

const addCow = (): Partial<ICow>[] => {
    return [
        {
            id: null,
            healthIndex: null,
            endDate: null,
            minValueDateTime: null,
            type: null,
            cowId: null,
            animalId: null,
            eventId: null,
            deletable: null,
            lactationNumber: null,
            daysInLactation: null,
            ageInDays: null,
            startDateTime: null,
            reportingDateTime: null
        }
    ];
};

@Component({
    selector: "app-cows",
    templateUrl: "./cows.component.html",
    styleUrls: ["./cows.component.scss"]
})
export class CowsComponent implements OnInit {
    @Input() showAddCowForm = false;
    @Output() cancelAddCowForm = new EventEmitter();
    cows = new MatTableDataSource<ICow>();
    newCows = new MatTableDataSource<Partial<ICow>>(addCow());

    // Add Cow form fields with error messages
    healthIndex = new FormControl("");
    endDate = new FormControl("");
    minValueDateTime = new FormControl("");
    type = new FormControl("", [Validators.required]);
    cowId = new FormControl("", [Validators.required]);
    animalId = new FormControl("", [Validators.required]);
    eventId = new FormControl("", [Validators.required]);
    deletable = new FormControl("", [Validators.required]);
    lactationNumber = new FormControl("", [Validators.required]);
    daysInLactation = new FormControl("", [Validators.required]);
    ageInDays = new FormControl("", [Validators.required]);
    startDateTime = new FormControl("", [Validators.required]);
    reportingDateTime = new FormControl("", [Validators.required]);

    displayedGridColumns: string[] = [
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
    displayedNewCowFormColumns: string[] = [
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
        "submit",
        "cancel"
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

    public editCow(id: number) {
        // this.delete.emit(cow);
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

    public getRequiredErrorMessage(field) {
        return this[field].hasError("required")
            ? "You must enter a value into this field"
            : "";
    }

    public submitAddCowForm(newCow: ICow) {
        this.cowsService.postCow(newCow).subscribe(
            data => {
                this.cancelAddCowForm.emit();
                this.getCows();
            },
            error => {
                // Here we can create message for failed update
                console.error(error);
            }
        );
    }

    public cancelAddCow() {
        this.cancelAddCowForm.emit();
    }

    public getJson(el: any) {
        return inspect(el);
    }
}
