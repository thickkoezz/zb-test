import { Component } from '@angular/core';
import { faCat, faDog, faFish } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-s2',
  templateUrl: './s2.component.html',
  styleUrls: ['./s2.component.scss']
})
export class S2Component {
  faCat = faCat;
  faDog = faDog;
  faFish = faFish;
}
