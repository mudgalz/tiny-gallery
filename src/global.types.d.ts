interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  latlng: number[];
  timezones: string[];
  flag: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

interface PexelImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelResponse {
  page: number;
  per_page: number;
  total_results: number;
  photos: PexelImage[];
  next_page: string | null;
}

interface PixabayImage {
  id: number;
  pageURL: string;
  type: "photo" | "illustration" | "vector";
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
