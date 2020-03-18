import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import ICow from "./ICow";
import { CowsService } from "./cows.service";
import { MatTableDataSource } from "@angular/material/table";
import { Validators, FormControl } from "@angular/forms";
import { inspect } from "util";

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
    dblClickedElement = null;

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
        "startDateTime",
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
        "reportingDateTime",
        "edit",
        "delete"
    ];
    displayedNewCowFormColumns: string[] = [
        "healthIndex",
        "startDateTime",
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

    public addCow(newCow: ICow) {
        newCow = this.sanitizeCow(newCow);
        this.cowsService.postCow(newCow).subscribe(
            _ => {
                this.cancelAddCowForm.emit();
                // refresh data in the grid
                this.getCows();
            },
            error => {
                // TODO: Here we can create pop-up message for failed addition
                console.error(error);
            }
        );
    }

    public editCow(updatedCow: ICow) {
        updatedCow = this.sanitizeCow(updatedCow);
        this.cowsService.patchCow(updatedCow).subscribe(
            _ => {
                this.cancelUpdateCow();
                // refresh data in the grid
                this.getCows();
            },
            error => {
                // TODO: Here we can create pop-up message for failed update
                console.error(error);
            }
        );
    }

    public deleteCow(id: number) {
        // TODO: Here the pop-up asking confirmation could be used
        this.cowsService.deleteCow(id).subscribe(
            data => {
                // refresh data in the grid
                this.getCows();
            },
            error => {
                // TODO: Here we can create pop-up message for failed deletion
                console.error(error);
            }
        );
    }

    public getRequiredErrorMessage(field) {
        return this[field].hasError("required")
            ? "You must enter a value into this field"
            : "";
    }

    public cancelAddCow() {
        this.cancelAddCowForm.emit();
    }

    public getJson(el: any) {
        return inspect(el);
    }

    public dblClicked(element: ICow, field: string) {
        this.dblClickedElement = { element, field };
    }

    public cancelUpdateCow() {
        this.dblClickedElement = null;
    }

    public sanitizeCow(cow: ICow) {
        return {
            ...cow,
            healthIndex: cow.healthIndex ? +cow.healthIndex : cow.healthIndex,
            endDate:
                cow.endDate && typeof cow.endDate !== "number"
                    ? new Date(cow.endDate).getTime() / 1000
                    : cow.endDate,
            minValueDateTime:
                cow.minValueDateTime && typeof cow.minValueDateTime !== "number"
                    ? new Date(cow.minValueDateTime).getTime() / 1000
                    : cow.minValueDateTime,
            cowId: +cow.cowId,
            eventId: +cow.eventId,
            deletable: !!+cow.deletable,
            lactationNumber: +cow.lactationNumber,
            daysInLactation: +cow.daysInLactation,
            ageInDays: +cow.ageInDays,
            startDateTime:
                cow.startDateTime && typeof cow.startDateTime !== "number"
                    ? new Date(cow.startDateTime).getTime() / 1000
                    : cow.startDateTime,
            reportingDateTime:
                cow.reportingDateTime &&
                typeof cow.reportingDateTime !== "number"
                    ? new Date(cow.reportingDateTime).getTime() / 1000
                    : cow.reportingDateTime
        };
    }
}
