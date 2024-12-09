﻿import {UserData} from './user.ts';
import {Location} from './location.ts';
import {City} from './city.ts';

export type OfferCardData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  images: string[];
  previewImage: string;
}

export type OfferPageData = OfferCardData & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserData;
  images: string[];
  maxAdults: number;
}
