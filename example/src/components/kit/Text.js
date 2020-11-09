import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Text(props) {
  const {
    type,
    children,
    styled,
    className,
    ...restProps
  } = props;
  const { t } = useTranslation();

  const text = styled ? children : t(children);

  return React.createElement(
    type,
    { ...restProps, className },
    text,
  );
}
