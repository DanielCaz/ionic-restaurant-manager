/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Table } from 'src/app/tables/table';
import { TablesService } from 'src/app/tables/tables.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
  users: User[] = [];
  fetchedTables: Table[] = [];
  addedTables: Table[] = [];
  newUser: User = {
    _id: '',
    name: '',
    surname: '',
    password: '',
    role: '',
    tables: [],
  };
  showAddUser = false;
  edittingUser = false;

  constructor(
    private userService: UserService,
    private tableService: TablesService,
    private loadinCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?) {
    const loading = await this.loadinCtrl.create({
      message: 'Loading Users...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      loading.dismiss();
      this.loadTables();
      if (event) {
        event.target.complete();
      }
    });
  }

  async editUser(user: User) {
    const loading = await this.loadinCtrl.create({
      message: 'Loading User...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.showAddUser = true;
    this.edittingUser = true;
    this.newUser = { ...user };

    let checkboxes;
    const interval = setInterval(() => {
      checkboxes = document.querySelectorAll<HTMLIonCheckboxElement>(
        '.checkbox-user-table'
      );
      if (checkboxes.length > 0) {
        checkboxes.forEach((checkbox: HTMLIonCheckboxElement) => {
          const label = checkbox.previousSibling as HTMLLabelElement;
          const tableName = label.innerText;
          if (this.newUser.tables.find((t) => t.name === tableName)) {
            checkbox.checked = true;
          }
        });
        clearInterval(interval);
        loading.dismiss();
      }
    }, 100);
  }

  async addUser() {
    const loading = await this.loadinCtrl.create({
      message: this.edittingUser ? 'Editing user...' : 'Adding Users...',
      spinner: 'bubbles',
    });
    await loading.present();

    if (this.edittingUser) {
      this.userService.updateUser(this.newUser).subscribe((user) => {
        loading.dismiss();
        this.showAddUser = false;
        this.edittingUser = false;
        this.users = this.users.map((u) => {
          if (u._id === this.newUser._id) {
            return this.newUser;
          } else {
            return u;
          }
        });
        this.newUser = {
          _id: '',
          name: '',
          surname: '',
          password: '',
          role: '',
          tables: [],
        };
      });
    } else {
      this.userService.addUser(this.newUser).subscribe((user) => {
        this.users.push(user);
        loading.dismiss();
        this.newUser = {
          _id: '',
          name: '',
          surname: '',
          password: '',
          role: '',
          tables: [],
        };
        this.showAddUser = false;
      });
    }
  }

  async deleteUser(user: User) {
    const loading = await this.loadinCtrl.create({
      message: 'Deleting User...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.userService.deleteUser(user).subscribe(() => {
      loading.dismiss();
      this.users = this.users.filter((u) => u._id !== user._id);
    });
  }

  onClickFab() {
    this.showAddUser = !this.showAddUser;
    if (!this.showAddUser) {
      this.edittingUser = false;
      this.newUser = {
        _id: '',
        name: '',
        surname: '',
        password: '',
        role: '',
        tables: [],
      };
    }
  }

  onClickTable(table: Table, event) {
    if (!event.target.checked) {
      this.newUser.tables.push(table);
    } else {
      this.newUser.tables = this.newUser.tables.filter(
        (t) => t._id !== table._id
      );
    }
  }

  private async loadTables() {
    const loading = await this.loadinCtrl.create({
      message: 'Loading Tables...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.tableService.getTables().subscribe((tables) => {
      this.fetchedTables = tables;
      loading.dismiss();
    });
  }
}
