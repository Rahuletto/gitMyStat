export interface ThemeType {
  [key: string]: {
    color: string;
    accent: string;
    background: string;
    border: string;
    radius: number;
    padding: number;
    tip: string;
  };
}

export interface ThemeData {
  user: string;
  color: string;
  accent: string;
  background: string;
  border: string;
  radius: number;
  padding: number;
  tip?: string;
}
