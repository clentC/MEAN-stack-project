import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users: any[] = [];
  name = '';
  email = '';
  age = 0;

  constructor(private userService: UserService) {
    this.fetchUsers();
  }

  addUser() {
    const newUser = { name: this.name, email: this.email, age: this.age };
    this.userService.addUser(newUser).subscribe(
      () => {
        this.fetchUsers(); 
        this.name = ''; 
        this.email = '';
        this.age = 0;
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}

<div>
  <h3>Add User</h3>
  <label for="name">Name:</label>
  <input id="name" [(ngModel)]="name" type="text" placeholder="Enter name" />
  <label for="email">Email:</label>
  <input id="email" [(ngModel)]="email" type="email" placeholder="Enter email" />
  <label for="age">Age:</label>
  <input id="age" [(ngModel)]="age" type="number" placeholder="Enter age" />
  <button (click)="addUser()">Add User</button>
</div>

<div>
  <h3>Existing Users</h3>
  <ul>
    <li *ngFor="let user of users">
      {{ user.name }} - {{ user.email }} - {{ user.age }}
    </li>
  </ul>
</div>