interface AppData {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  img_url: string;
  SHA: string;
  version: number;
  publication_date: string;
  creator: string;
  owned: boolean;
  myRating?: number;
}

export default AppData;
