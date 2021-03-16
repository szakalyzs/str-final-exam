import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //users$: Observable<User[]> = this.userService.getAll();
  users$: BehaviorSubject<User[]> = this.userService.list$;
  phrase: string = '';
  sortby: string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  setOrder(key: string): void {
    this.sortby = key;
  }

  onDelete(user: User): void {
    if (confirm(`Are you sure to delete ${user.name}?`)) {
      this.userService.remove(user);
    }
  }

}
