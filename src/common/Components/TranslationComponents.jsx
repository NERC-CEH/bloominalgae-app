export const TLink = ({ children }) => {
  const link = children[0];

  const href = link.includes('https://') ? link : `https://${link}`; // eslint-disable-line

  return <a href={href}>{link}</a>;
};
