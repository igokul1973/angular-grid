import { Component, OnInit } from "@angular/core";
import { CowsService } from "./cows/cows.service";
import ICow from "./cows/ICow";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    cows: ICow[];
    constructor(private cowsService: CowsService) {}

    title = "grid-angular";

    ngOnInit() {
        this.ping();
    }

    public ping() {
        this.cowsService.getCows().subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error(error);
            }
        );
    }
}
