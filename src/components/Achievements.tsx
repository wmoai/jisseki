import * as React from 'react';
import {Achievement, Category} from '../reducers/achievements';
import AchievementAdder from './AchievementAdder';
import AchievementList from './AchievementList';
import styled from 'styled-components';

interface Props {
  achievedList: Achievement[];
  unachievedList: Achievement[];
  categorizedList: {
    category: Category;
    achievements: Achievement[];
  }[];
  addAchievement: (description: string, category?: Category) => void;
  toggleAchieved: (id: string) => void;
  addCategory: (name: string) => void;
}

const Achievements: React.FunctionComponent<Props> = (props: Props) => {
  const {
    achievedList,
    unachievedList,
    categorizedList,
    addAchievement,
    toggleAchieved,
    addCategory,
  } = props;
  const achievementRef = React.useRef(null);
  const categoryRef = React.useRef(null);
  const onAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (achievementRef.current) {
      addAchievement(achievementRef.current.value);
    }
  };
  const onAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryRef.current) {
      addCategory(categoryRef.current.value);
    }
  };
  return (
    <div>
      <form onSubmit={e => onAddCategory(e)} autoComplete="off">
        <input type="text" ref={categoryRef} placeholder="Category" />
      </form>
      <AchievementAdder addAchievement={addAchievement} />
      <Container>
        <AchievementList
          list={unachievedList}
          toggleAchieved={toggleAchieved}
          addAchievement={addAchievement}
        />
        <AchievementList
          list={achievedList}
          toggleAchieved={toggleAchieved}
          addAchievement={addAchievement}
        />
      </Container>
      {categorizedList.map(({category, achievements}) => (
        <AchievementList
          key={category ? category.id : 0}
          list={achievements}
          category={category}
          toggleAchieved={toggleAchieved}
          addAchievement={addAchievement}
        />
      ))}
    </div>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Achievements;
