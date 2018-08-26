import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-fp-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnChanges {
    @Input() private currentSavings: number;
    @Input() private goalSavings: number;
    private percentage: number;
    fontWeight: number;

    ngOnChanges(): void {
        if (this.currentSavings == null
            || this.goalSavings == null
            || this.goalSavings <= 0) {
            this.percentage = null;
        } else {
            this.percentage = this.currentSavings / this.goalSavings;
        }
        this.fontWeight = this.calculateFontWeight();
    }

    calculateFontWeight(): number {
        if (this.percentage == null) {
            return null;
        } else if (this.percentage >= 1) {
            return 700;
        } else if (this.percentage < 0.1) {
            return 200;
        } else if (this.percentage >= 0.1 && this.percentage < 0.25) {
            return 300;
        } else if (this.percentage >= 0.25 && this.percentage < 0.5) {
            return 400;
        } else if (this.percentage >= 0.5 && this.percentage < 0.75) {
            return 500;
        } else if (this.percentage >= 0.75 && this.percentage < 1) {
            return 600;
        }
    }
}
