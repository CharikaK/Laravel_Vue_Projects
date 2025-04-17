export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Post = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  body: string;
  createdAt: string;
};

// creating and updating froms
export type postForm = {
  title: string;
  body: string;
};

export interface LaravelResponseCollection<T> {
  data: T[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  path: string;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
}
