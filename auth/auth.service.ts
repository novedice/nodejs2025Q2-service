import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    console.log('sign up');
  }

  login() {
    console.log('login');
  }

  refresh() {
    console.log('refresh');
  }
}
