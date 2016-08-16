import { Component, OnInit } from '@angular/core';
import { FlexDirective }  from '../flex.directive';
import { LayoutDirective }  from '../layout.directive';

@Component({
  templateUrl: './app/playerTable/playerTable.component.html',
    directives: [FlexDirective,
                LayoutDirective]
})
export class PlayerTableComponent  {

}