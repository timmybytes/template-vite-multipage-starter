import { ReactNode } from 'react';

export type SubNav = {
  order: number;
  name: ReactNode;
  link: string;
};

export type ParentNav = {
  order: number;
  name: ReactNode;
  link?: string;
  subNav?: SubNav[];
};

export const navData: ParentNav[] = [
  {
    order: 1,
    name: 'Parent',
    subNav: [{ order: 1, name: 'Child', link: '/' }],
  },
  {
    order: 2,
    name: 'Parent 2',
    subNav: [
      {
        order: 1,
        name: 'Child',
        link: '/',
      },
      {
        order: 2,
        name: 'Child 2',
        link: '/',
      },
    ],
  },
  {
    order: 3,
    name: 'Standalone Link',
    link: '/',
  },
];
