import {Component} from '@angular/core';
import {UsersService} from "../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {NgIf} from "@angular/common";
import {loadUser} from "../../store/user/user.actions";
import {Store} from "@ngrx/store";
import {selectUser} from "../../store/user/user.selectors";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  user: User | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadUser({id: Number(userId)}));
    this.store.select(selectUser).subscribe((user: any) => {
      this.user = user.selectedUser;
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
