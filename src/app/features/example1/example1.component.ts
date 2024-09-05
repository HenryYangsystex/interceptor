import { Component } from '@angular/core';
import { Example1Service } from './example1.service';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css'],
})
export class Example1Component {
  data: any;

  constructor(private example1Service: Example1Service) {}
  getLocalFileData() {
    this.example1Service.getLocalFileData().subscribe(
      (response) => {
        this.data = response;
        console.log('Data from local file:', this.data);
      },
      (error) => {
        console.error('Error fetching local file data:', error);
      },
    );
  }
  ngOnInit(): void {
    this.getLocalFileData();
  }
}
