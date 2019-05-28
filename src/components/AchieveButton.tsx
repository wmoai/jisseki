import * as React from 'react';
import styled from 'styled-components';

interface Props {
  isAchieved: boolean;
}

const AchieveButton = styled.button`
  color: ${(props: Props) => (props.isAchieved ? 'green' : '#ddd')};
  font-weight: bold;
  font-size: 1em;
  border: none;
  outline: none;
  ::before {
    content: '✔';
  }
`;

export default AchieveButton;
