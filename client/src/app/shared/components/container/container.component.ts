import {Component, Input, OnInit} from '@angular/core';

type ContainerType = 'default' | 'fluid';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() type: ContainerType = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
