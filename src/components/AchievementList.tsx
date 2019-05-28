import * as React from 'react';
import AchieveButton from './AchieveButton';
import AchievementAdder from './AchievementAdder';
import {Achievement, Category} from '../reducers/achievements';
import styled from 'styled-components';

interface Props {
  list: Achievement[];
  category?: Category;
  toggleAchieved: (id: string) => void;
  addAchievement: (description: string, category?: Category) => void;
}

interface FormElements extends HTMLFormControlsCollection {
  achievement: HTMLInputElement;
}

const AchievementList: React.FunctionComponent<Props> = (props: Props) => {
  const {list, category, toggleAchieved, addAchievement} = props;
  const [editingId, setEditingId] = React.useState();
  const childInput = React.useRef(null);
  const achievementRef = React.useRef(null);
  React.useEffect(() => {
    if (childInput.current) {
      childInput.current.focus();
    }
  });

  const onAddCategorizedAchievement = (
    e: React.FormEvent<HTMLFormElement>,
    category: Category,
  ) => {
    e.preventDefault();
    if (achievementRef.current) {
      addAchievement(achievementRef.current.value, category);
    }
  };

  return (
    <div>
      {category && (
        <React.Fragment>
          <h3>{category.name}</h3>
          <AchievementAdder
            category={category}
            addAchievement={addAchievement}
          />
        </React.Fragment>
      )}
      <List>
        {list.map(achievement => (
          <li key={achievement.id}>
            <div>
              <AchieveButton
                isAchieved={achievement.isAchieved}
                onClick={() => toggleAchieved(achievement.id)}
              />
              <span
                onClick={() => {
                  if (achievement.id === editingId) {
                    setEditingId(null);
                  } else {
                    setEditingId(achievement.id);
                  }
                }}>
                {achievement.description}
              </span>
            </div>
          </li>
        ))}
      </List>
    </div>
  );
};

const List = styled.ul`
  list-style: none;
  margin: 0;
  margin-left: 20px;
  padding: 0;
`;

export default AchievementList;
