import {IUser} from './user';

export interface IOffer {
  id: number;
  maker: IUser;
  taker: IUser;
  description: string;
  offerAmount: number;
  offerCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  //exchangeRate: number;
  //createDate: Date;
}
