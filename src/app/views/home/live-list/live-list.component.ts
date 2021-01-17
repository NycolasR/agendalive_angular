import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  // Lives que já aconteceram
  livesPrevious: Live[];
  // Lives que já ainda não aconteceram
  livesNext: Live[];

  constructor(
    public liveService: LiveService
  ) {
    this.livesPrevious = [];
    this.livesNext = [];
  }

  ngOnInit(): void {
    // Para que sempre que este componente for inicializado,
    // ele vai chamar este método:
    this.getLives();
  }

  getLives() {
    // this.liveService.getLivesWithFlag('previous') retornará um observable;
    // No subscribe() é definido o que acontece com os dados provenientes da requisição
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      // Será retornado uma paginação com as lives, daí o content.
      console.log(this.livesPrevious);
    });

    //this.liveService.getLivesWithFlag('next').subscribe(data => {
      //this.livesNext = data.content;
      // Será retornado uma paginação com as lives, daí o content.
      //console.log(this.livesNext);
    //});
  }

}
