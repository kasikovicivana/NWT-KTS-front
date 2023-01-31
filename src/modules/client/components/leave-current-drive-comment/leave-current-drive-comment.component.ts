import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-current-drive-comment',
  templateUrl: './leave-current-drive-comment.component.html',
  styleUrls: ['./leave-current-drive-comment.component.css'],
})
export class LeaveCurrentDriveCommentComponent implements OnInit {
  public comment: string = '';
  constructor() {}

  ngOnInit(): void {}

  save() {}

  close() {}
}
