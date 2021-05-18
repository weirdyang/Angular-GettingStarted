import { EventEmitter } from "@angular/core";
import { Component, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    private WIDTH: number = 75;
    // to receive from parent
    @Input() rating: number = 0;
    cropWidth: number = this.WIDTH;
    // to bubble to parent
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();


    ngOnChanges(): void {
        // set width relative to rating
        this.cropWidth = this.rating * 75 / 5;
    }

    onClick(): void {
        this.ratingClicked.emit(`${this.rating}`);
    }
}