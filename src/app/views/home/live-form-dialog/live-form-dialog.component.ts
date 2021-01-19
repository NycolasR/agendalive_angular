import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  public liveForm: FormGroup;

  constructor(
    public fb: FormBuilder,
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

  // Método usado para fechar o diálogo
  cancel(): void {
    this.dialogRef.close();
  }

}
