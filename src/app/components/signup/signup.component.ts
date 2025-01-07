import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { MainService } from '../../../core/services/main.service';
import { Router } from '@angular/router';

interface FormField {
  label: string;
  type: string;
  id: string;
  required: boolean;
  errormessage: string;
  validators: any[];  // Will include the custom validator
  options?: { label: string; value: string }[]; // options property for radio fields
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  formFields: FormField[] = [
    {
      label: 'Username:',
      type: 'text',
      id: 'username',
      required: true,
      errormessage: 'Username is required and must be only alphabets.',
      validators: [
        Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(50), 
        this.alphabeticValidator()  //custom validator for using only alphabets
      ]
    },
    {
      label: 'Email:',
      type: 'email',
      id: 'email',
      required: true,
      errormessage: 'Valid email is required.',
      validators: [Validators.required, Validators.email]
    },
    {
      label: 'Password:',
      type: 'password',
      id: 'password',
      required: true,
      errormessage: 'Password is required.',
      validators: [Validators.required]
    }
  ];

  // Specialization options for trainers
  specializationOptions = [
    { label: 'FrontEnd', value: 'FrontEnd' },
    { label: 'BackEnd', value: 'BackEnd' }
  ];

  roleFields: { role: string; fields: FormField[] }[] = [
    {
      role: 'trainee',
      fields: [
        {
          label: 'Designation:',
          type: 'text',
          id: 'designation',
          required: true,
          errormessage: 'Designation is required.',
          validators: [Validators.required]
        }
      ]
    }
  ];

  constructor(private mainService: MainService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    // Initialize the form group with dynamic controls
    this.signupForm = this.fb.group({});

    // Add common controls dynamically based on the formFields configuration
    this.formFields.forEach(field => {
      this.signupForm.addControl(field.id, new FormControl('', field.validators));
    });

    // Add role field as well
    this.signupForm.addControl('role', new FormControl('', Validators.required));

    // Add specialization control but leave it empty initially
    this.signupForm.addControl('specialization', new FormControl(''));
  }

  // Custom Validator for Alphabetic Characters Only
  alphabeticValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^[A-Za-z]+$/.test(control.value);  // Checks only alphabetic characters
      return isValid ? null : { 'alphabetic': true };  // Return error object if invalid
    };
  }

  // Method to check if the form control is invalid and touched
  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control?.invalid && control?.touched);  // Coerce to boolean
  }

  // Handling form submission
  onSignUpSubmit(): void {
    if (this.signupForm.invalid) {
      return;  // Do not proceed if the form is invalid
    }

    const user = this.signupForm.value;

    // Make sure specialization is added if role is 'trainer'
    if (user.role === 'trainer' && !user.specialization) {
      alert('Specialization is required for trainers!');
      return;
    }

    this.mainService.signup(user).subscribe({
     next: response => {
        alert('Sign Up Successful!');
        // console.log('Signed up user: ', response);
        this.router.navigate(['/login']);
      },
     error: error => {
        alert('Sign Up Failed! Please try again.');
        // console.error(error);
      }
   } );
  }

  // Reset the dynamic fields based on role selection
  onRoleChange(): void {
    const role = this.signupForm.get('role')?.value;

    // Reset fields for the current role
    this.clearRoleSpecificFields();

    const roleField = this.roleFields.find(r => r.role === role);

    if (roleField) {
      roleField.fields.forEach(field => {
        this.signupForm.addControl(field.id, new FormControl('', field.validators));
      });
    }

    // Specialization logic: add or remove validators based on the role
    const specializationControl = this.signupForm.get('specialization');

    if (role === 'trainer') {
      // Make sure specialization is required for trainers
      specializationControl?.setValidators([Validators.required]);
    } else {
      // Clear the specialization validators for other roles
      specializationControl?.clearValidators();
    }

    // Update the validity of the specialization control
    specializationControl?.updateValueAndValidity();
  }

  // Helper function to clear role-specific fields from the form
  private clearRoleSpecificFields(): void {
    this.roleFields.forEach(role => {
      role.fields.forEach(field => {
        if (this.signupForm.contains(field.id)) {
          this.signupForm.removeControl(field.id);
        }
      });
    });
  }
}
