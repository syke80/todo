export interface Task {
  id: number | null;
  label: string;
  description: string;
  category: string;
  done: boolean | string;
}
