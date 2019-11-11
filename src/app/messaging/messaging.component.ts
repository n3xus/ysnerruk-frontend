import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MessagingService} from './messaging.service';
import {IMessage} from '../models/message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: IMessage[];
  errorMessage: string;

  constructor(private messasgeService: MessagingService, private authservice: AuthService) {}

  ngOnInit() {
    this.id = setInterval(() => {
      this.getMessages();
    }, 1000)
  }

  ngOnDestroy(){
    if(this.id){
      clearInterval(this.id)
    }
  }

  getMessages(){
    console.log("getting messages")
    this.messasgeService.getMessages().subscribe(
      messages => {
        this.messages = messages;
        this.buildSenderArray(messages)
        if(this.selectedUser){
          this.buildConversationArray(messages, this.selectedUserName)
        }
      },
      error => this.errorMessage = error as any
    );
  }

  selectConversation(username, id){
      this.selectedUser = id
      this.selectedUserName = username
      this.buildConversationArray(this.messages, username)
  } 

  sendText(text: String){
    if(text != undefined){
      console.log(text);
    let textCheck = text.replace(/ /g, '')
    if(textCheck != ""){
      let messageObject = {
        "message": text,
        "type":"sent"
      }
      this.selectedConversation.push(messageObject)
      console.log("After processing:", text)
      this.messasgeService.sendMessage(this.selectedUser, text).subscribe()
      this.text = ""
    }
  }
    
  }

  buildConversationArray(messages, username){
    this.selectedConversation = []
    for(let message of messages){
      if(message.senderUserName == username){
        let messageObbject = {
          "message": message.message,
          "date": message.date,
          "type": "received"
        }
        this.selectedConversation.push(messageObbject)
      } else if (message.receiverUserName == username){
        let messageObbject = {
          "message": message.message,
          "date": message.date,
          "type": "sent"
        }
        this.selectedConversation.push(messageObbject)
      }
    }
    console.log(this.selectedConversation)
    return messages
  }

  buildSenderArray(messages){
    this.senders = []
    let currentuser = this.authservice.getCurrentUser()
    for(let message of messages){
      if(message.sender.username === currentuser){
        if (!this.senders.some(e => e.username === message.receiver.username)) {
          let senderObject = {
            "username": message.receiver.username,
            "id": message.receiver.id
          }
          this.senders.push(senderObject)
        }
      } else if(message.receiver.username === currentuser){
        if (!this.senders.some(e => e.username === message.sender.username)) {
          let senderObject = {
            "username": message.sender.username,
            "id": message.sender.id
          }
          this.senders.push(senderObject)
        }
      }

    }
    // return messages
  }
  
  selectedConversation: any
  selectedUser: string
  selectedUserName: string
  conversations: any
  text: String
  senders: any
  id: any
}
