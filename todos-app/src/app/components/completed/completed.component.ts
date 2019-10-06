import { Component, OnInit, Input } from '@angular/core';
import { CompletedTask } from 'src/app/interfaces/completedTask';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  @Input() completedTask: CompletedTask = {
    all: 0,
    done: 0,
    undone: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
