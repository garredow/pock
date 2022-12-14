export type PocketArticle = {
  item_id: string;
  resolved_id: string;
  given_url: string;
  given_title: string;
  favorite: '0' | '1';
  status: '0' | '1';
  time_added: string;
  time_updated: string;
  time_read: string;
  time_favorited: string;
  resolved_title: string;
  resolved_url: string;
  excerpt: string;
  is_article: string;
  is_index: string;
  has_video: string;
  has_image: string;
  word_count: string;
  lang: string;
  top_image_url: string;
  sort_id: number;
  time_to_read: number;
  listen_duration_estimate: number;
  tags: {
    [key: string]: {
      item_id: string;
      tag: string;
    };
  };
};
