import {Component} from '@angular/core';
import {TableModule} from "primeng/table";
import {UsersService} from "../services/users.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../models/user";
import {PaginatorModule} from "primeng/paginator";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectAllUsers, selectUser} from "../../store/user/user.selectors";
import {loadUser, loadUsers} from "../../store/user/user.actions";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    PaginatorModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: User[] = [];
  page = 1
  totalRecords: number = 10;
  searchText: number | undefined;
  users$ = this.store.select(selectAllUsers);

  constructor(private usersService: UsersService, private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.getUsers(this.page)
  }

  onPageChange($event: any) {
    this.page = $event.page + 1
    this.getUsers(this.page)
  }

  getUsers(page: number) {
    this.store.dispatch(loadUsers({page: page}));
    this.users$.subscribe((res: any) => {
      if (res) {
        this.users = res.data;
        this.totalRecords = res.total;
      }
    });
  }

  onUserClick(user: User) {
    this.router.navigate(['/user-details', user.id]);

  }

  onSearchChange($event: any) {
    if ($event.length > 0) {
      this.store.dispatch(loadUser({id: $event}));
      this.store.select(selectUser).subscribe((res: any) => {
        if (!res.error) {
          this.users = [res.selectedUser];
        } else {
          this.users = [];
        }
      });
    } else {
      this.getUsers(this.page)
    }
  }
}
