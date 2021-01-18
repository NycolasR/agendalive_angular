import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';

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
    public liveService: LiveService,
    public sanitizer: DomSanitizer // 
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

      // Para cada live dentro da listagem, está sendo
      // atribuído um valor para o atributo urlSafe
      this.livesPrevious.forEach(live => {
        /* this.sanitizer.bypassSecurityTrustResourceUrl(parameter):
         * método usado para montagem da URL segura para que essa
         * URL possa ser utilizada dentro do HTML e, assim, possamos
         * embutir o link do youtube dentro da interface gráfica.
         * É necessária para exibição do card com o link do youtube
        */
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });

    this.liveService.getLivesWithFlag('next').subscribe(data => {
      this.livesNext = data.content;
      // Será retornado uma paginação com as lives, daí o content.
      console.log(this.livesNext);

      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });
    //});
  }

}
