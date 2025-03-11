
export interface Store {
  id: string;
  name: string;
  image: string;
  category: string;
  url: string;
  creator: {
    name: string;
    title: string;
    quote: string;
    avatar: string;
  };
  additionalImages?: string[];
  rating: number;
  featured?: boolean;
}
