// Global interfaces to be used throughout the app

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type RootStackParamList = {
  UserDetails: {userId: string};
};

export interface SectionListData {
  section: {
    title?: string;
    data?: any;
  };
}
