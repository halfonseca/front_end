/**
 * Componente Contacto - Formulario reactivo con validaciones
 * Implementa: FormGroup, FormBuilder, Validators, Two-way binding vía formControlName
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactoForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactoForm.valid) {
      this.enviado = true;
      this.contactoForm.reset();
      setTimeout(() => {
        this.enviado = false;
      }, 4000);
    } else {
      Object.keys(this.contactoForm.controls).forEach(key => {
        this.contactoForm.get(key)?.markAsTouched();
      });
    }
  }
}
