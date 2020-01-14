import { Component } from '@angular/core';
import { faCat, faDog, faFish } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-s1',
  templateUrl: './s1.component.html'
})
export class S1Component {
  faCat = faCat;
  faDog = faDog;
  faFish = faFish;
}
