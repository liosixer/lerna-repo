import React from "react";

type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  status: 'waiting'| 'success';
  obj: Object;
  dict: {
    id: string;
    title: string;
  };

  // onClick: () => void;
  /** alternative function **/ 
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type { AppProps };

// export declare interface AppInterface {
//   children: React.ReactNode;
//   children2: JSX.Element | JSX.Element[];
// }
