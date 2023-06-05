import { FC } from 'react';

type Props = {
  children?: any;
};

// eslint-disable-next-line import/prefer-default-export
export const TLink: FC<Props> = ({ children }) => {
  const link = children[0];

  const href = link.includes('https://') ? link : `https://${link}`; // eslint-disable-line

  return <a href={href}>{link}</a>;
};
