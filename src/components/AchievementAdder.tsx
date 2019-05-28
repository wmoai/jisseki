import * as React from 'react';
import {Achievement, Category} from '../reducers/achievements';
import styled from 'styled-components';

interface Props {
  category?: Category;
  addAchievement: (description: string, category?: Category) => void;
}

interface FormElements extends HTMLFormControlsCollection {
  achievement: HTMLInputElement;
}

const AchievementAdder: React.FunctionComponent<Props> = (props: Props) => {
  const {category, addAchievement} = props;
  const achievementRef = React.useRef(null);

  const onAddCategorizedAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputTarget = achievementRef.current;
    if (inputTarget) {
      addAchievement(inputTarget.value, category);
      inputTarget.value = '';
    }
  };

  return (
    <form onSubmit={e => onAddCategorizedAchievement(e)} autoComplete="off">
      <input type="text" ref={achievementRef} placeholder="Achievement" />
    </form>
  );
};

export default AchievementAdder;
