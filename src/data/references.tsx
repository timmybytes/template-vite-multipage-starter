import React, { ReactNode } from 'react';

export const references = {
  Name: (
    <React.Fragment>
      Reference. <em>Journal.</em>
    </React.Fragment>
  ),
  Name2: (
    <React.Fragment>
      Reference. <em>Journal.</em>
    </React.Fragment>
  ),
} satisfies Record<string, ReactNode>;

export type ReferenceId = keyof typeof references;
