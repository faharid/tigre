
//INJECTABLE PERMITE QUE SE PUEDA SER USADO EN UN COMPONENT (EN ESTE CASO EN chat-form)
import { Injectable, DebugElement, OnInit } from '@angular/core';

//FIREBASE
import * as firebase from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

//OTHER - NECESITADO POR FIREBASE
import { Observable } from 'rxjs';

//MESSAGE
import { ChatMessage } from '../models/chat-message.model';

import { User } from '../models/user.model';
import { $ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: AngularFireList<ChatMessage>
  chatMessage: ChatMessage;
  userData: Observable<any>;
  adminData: Observable<any>;
  userName = "";


  //CHAT
  currentMessage = '';

  //IMAGES TO PRELOAD
  imgs = new Array();

  constructor(private db: AngularFireDatabase) {
    this.chatMessages = this.getMessages();
  }


  getUser() {
    //CONSULTAR USUARIO
    const path = `/users/`;
    return this.db.object(path).valueChanges();
  }


  getUsers() {
    //CONSULTAR LISTA DE USUARIOS
    return this.db.list('users', ref => {
      return ref;
    });
  }


  //GENERAL CHAT
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();

    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
    });

    console.log('SEND MESSAGE FROM: ' + this.userName);
  }

  getMessages(): AngularFireList<ChatMessage> {
    //QUERY PARA OBTENER MENSAJES DE LA BASE DE DATOS DE FIREBASE
    return this.db.list('messages', ref => {
      ref.orderByValue;
      ref.limitToFirst(3);
      return ref;
    });
  }

  getAllMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.limitToLast(25).orderByKey()
    );
  }

  //USER CHAT
  sendMessageToUserChat(msg: string) {

    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessagesFromUserChat();

    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
    });

    console.log('SEND MESSAGE FROM: ' + this.userName);
  }

  getMessagesFromUserChat(): AngularFireList<ChatMessage> {
    return this.db.list('messages/', ref => {
      ref.limitToLast(3);
      ref.orderByChild;
      return ref;
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate()
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds()
    return (date + ' ' + time);
  }

  setCurrentMessage(message: string) {
    this.currentMessage = message;
  }

  getCurrentMessage(): string {
    return this.currentMessage;
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("async"));
  }

}
