import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public showAddCowForm: boolean = false;
    title = "Cows Grid";
    addCowClicked() {
        this.showAddCowForm = true;
    }
    addCowRemoved() {
        this.showAddCowForm = false;
    }
}
