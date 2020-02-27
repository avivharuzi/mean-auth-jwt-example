import { Component } from '@angular/core';

import { AuthService } from '../../../../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
  ) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get email(): string {
    return this.authService.getEmail();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
