import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  // Este pipe formatará a data (recebida como parâmetro de entrada) para um outro formato p/ exibição
  transform(date: string): string {
    // Transformando a data em moment passando a date e o formato da date
    let dateOut: moment.Moment = moment(date, "YYYY-MM-DDTHH:mm:ss");

    // Após a transformação da date de string p// moment, é possível
    // formatá-la de forma que possa ser exibida p/ o usuário.
    // Como argumento, se passa uma string especificando o formato da nova formatação.
    return dateOut.format("DD-MM-YYYY HH:mm");
  }

}
