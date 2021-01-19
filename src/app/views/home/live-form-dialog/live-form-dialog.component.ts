import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';

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
      liveDate: ['2020-08-01T20:00:00', [Validators.required]],
      liveTime: ['', [Validators.required]],
    });
  }

  crateLive() {
    // Salvando a live recuperando-a do liveForm
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    // Fechando a caixa de diálogo e resetando o form
    this.cancel();
  }

  // Método usado para fechar e resetar o diálogo
  cancel(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
