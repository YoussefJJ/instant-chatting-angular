import { Component } from '@angular/core';
import { InstantChatService } from './instant-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'instant-chatting';
  user:String = '';
  room: String = '';
  messageText: String = "";
  messageArray: Array<{user:string,message:string}> = [];

  constructor(private instantChatService: InstantChatService){
    this.instantChatService.newUserJoined().subscribe((data:any) => this.messageArray.push(data))
    this.instantChatService.userLeftRoom().subscribe((data:any) => this.messageArray.push(data))
    this.instantChatService.newMessageReceived().subscribe((data:any) => this.messageArray.push(data))
  }

  join(){
    const element = document.createElement("div");
    element.id = "#username-form"
    element.innerHTML = "username must not be empty";
    element.setAttribute("role","alert");
    element.classList.add("alert","alert-danger");

    if (this.user.length === 0){
      if (!document.getElementById("#username-form"))
        document.getElementById("#container")?.insertBefore(element,document.getElementById('#message-box'));
    }
    else{
    this.instantChatService.joinRoom({user: this.user, room:this.room})
    if (document.getElementById("#username-form")){
      const alertElement = document.getElementById("#username-form");
      alertElement?.remove();
    }
  }
  }

  leave(){
    this.instantChatService.leaveRoom({user: this.user, room:this.room})
  }

  sendMessage(){
    const element = document.createElement("div");
    element.id = "#message-form"
    element.innerHTML = "message must not be empty";
    element.setAttribute("role","alert");
    element.classList.add("alert","alert-danger");
    if (this.messageText.length === 0 ){
      if (!document.getElementById("#message-form"))
        document.getElementById("#container")?.appendChild(element);
    }
    else{
    this.instantChatService.sendMessage({user:this.user, room:this.room, message:this.messageText})
    this.messageText="";
    if(document.getElementById("#message-form")){
      const alertElement = document.getElementById("#message-form");
      alertElement?.remove();
    }
    }
  }
}
