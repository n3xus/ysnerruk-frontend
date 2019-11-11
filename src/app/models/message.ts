import {IUser} from './user';
  
export interface IMessage {
    id: number;
    senderUserName: String;
    receiverUserName: String;
    date: Date;
    message: String;
}