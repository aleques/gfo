import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ErrorModalComponent} from '../error-modal/error-modal.component';

@Component({
  selector: 'app-armazem-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './armazem-inventory.component.html',
  styleUrls: ['./armazem-inventory.component.scss']
})
export class ArmazemInventoryComponent implements OnDestroy {
  form!: FormGroup;
  responseData: any[] = [];
  isListening: boolean = false;
  subscription: Subscription | null = null;

  options = [
    { label: 'Opção 1', value: 'opcao1' },
    { label: 'Opção 2', value: 'opcao2' },
    { label: 'Opção 3', value: 'opcao3' }
  ];

  constructor(private fb: FormBuilder, private dataService: DataService, private dialog: MatDialog) {
    this.form = this.fb.group({
      selectedOption: [''],
      selectedDate: ['']
    });
  }

  onSubmit(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.responseData = [];
    if (this.form.valid) {
      this.isListening = true;

      this.subscription = this.dataService.fetchPesoStream().subscribe(
        (data) => this.responseData.push(data),
        (error) => {
          this.stopListening()
          this.openErrorModal('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
          console.error('Erro ao conectar ao backend:', error);
        }
      );
    }
  }

  stopListening(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.isListening = false;
  }

  openErrorModal(message: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: { message },
      width: '400px',
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
