export interface Task {
  id: number;
  name: string;
  description: string;
}

export const tasks: Task[] = [
  {
    id: 1,
    name: 'Complete project proposal',
    description:
      'Write and submit project proposal document by end of the week.',
  },
  {
    id: 2,
    name: 'Meeting with client',
    description:
      'Schedule and conduct a meeting with the client to discuss project requirements.',
  },
  {
    id: 3,
    name: 'Develop feature XYZ',
    description:
      'Implement feature XYZ according to the specifications provided.',
  },
];
