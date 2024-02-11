export interface Photo {
  author: string;
  date: string;
  url: string;
  comments: string[];
};

export interface PhotosData {
  photos: Photo[];
};
