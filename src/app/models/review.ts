import {IUser} from './user';
import {IOffer} from './offer';

export interface IReview {
  id: number;
  offer: IOffer;
  reviewBy: IUser;
  reviewFor: IUser;
  rating: boolean;
  description: string;
  reviewDate: Date;
}
