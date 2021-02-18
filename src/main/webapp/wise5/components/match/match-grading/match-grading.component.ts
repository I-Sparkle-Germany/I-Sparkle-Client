import { Component } from '@angular/core';
import { ComponentGrading } from '../../../classroomMonitor/classroomMonitorComponents/shared/component-grading.component';

@Component({
  selector: 'match-grading',
  templateUrl: 'match-grading.component.html',
  styleUrls: ['match-grading.component.scss']
})
export class MatchGrading extends ComponentGrading {
  sourceBucketId = '0';
  sourceBucket: any;
  targetBuckets: any[] = [];
  isHorizontal: boolean = false;
  bucketWidth: number;
  hasCorrectAnswer: boolean = false;
  isCorrect: boolean = false;

  ngOnInit() {
    super.ngOnInit();
    this.initializeBuckets(this.componentState.studentData.buckets);
    this.setHasCorrectAnswer(this.hasCorrectChoices(this.componentContent));
    this.setIsCorrect(this.componentState.studentData.isCorrect);
    this.setIsHorizontal(this.componentContent.horizontal);
    this.setBucketWidth(this.calculateBucketWidth(this.targetBuckets, this.isHorizontal));
  }

  initializeBuckets(buckets: any[]): void {
    for (const bucket of buckets) {
      if (bucket.id === this.sourceBucketId) {
        this.sourceBucket = bucket;
      } else {
        this.targetBuckets.push(bucket);
      }
    }
  }

  setHasCorrectAnswer(hasCorrectAnswer: boolean): void {
    this.hasCorrectAnswer = hasCorrectAnswer;
  }

  hasCorrectChoices(componentContent: any): boolean {
    for (const bucket of componentContent.feedback) {
      for (const choice of bucket.choices) {
        if (choice.isCorrect) {
          return true;
        }
      }
    }
    return false;
  }

  setIsCorrect(isCorrect: boolean): void {
    this.isCorrect = isCorrect;
  }

  setIsHorizontal(isHorizontal: boolean): void {
    this.isHorizontal = isHorizontal;
  }

  calculateBucketWidth(buckets: any[], isHorizontal: boolean): number {
    if (isHorizontal) {
      return 100;
    } else {
      return this.calculateVerticalBucketWidth(buckets);
    }
  }

  calculateVerticalBucketWidth(buckets: any[]): number {
    const numBuckets = buckets.length;
    if (numBuckets % 3 === 0 || numBuckets > 4) {
      return Math.round(100 / 3);
    } else if (numBuckets % 2 === 0) {
      return 100 / 2;
    }
  }

  setBucketWidth(width: number): void {
    this.bucketWidth = width;
  }
}
