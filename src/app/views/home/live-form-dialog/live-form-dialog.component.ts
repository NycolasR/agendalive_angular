import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  public liveForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public rest: LiveService,
    public dialogRef: MatDialogRef<LiveFormDialogComponent>
  ) {
    this.liveForm = this.fb.group({
      // Inicializando a variável
    })
  }

  ngOnInit(): void {
    // Onde serão definidos os parâmetros da live
    this.liveForm = this.fb.group({
      // O formulário será composto pelos seguintes parâmetros;
      // Valor default: '' (vazio);
      // [Validators.required]: quer dizer que é um campo obrigatório;
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
    });
  }

  createLive(): void {
    // Formatando a data para que tenha a hora e possa estar no mesmo formato exigido pela API
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;

    // Salvando a live recuperando-a do liveForm
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    // Fechando a caixa de diálogo e resetando o form
    this.dialogRef.close();
    this.liveForm.reset();

    // Para que a tela seja recarregada após uma nova live ser adicionada
    window.location.reload();
  }

  // Método usado para fechar e resetar o diálogo
  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
