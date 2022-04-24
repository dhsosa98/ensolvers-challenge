import { FC, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ITodoItem } from "../../interfaces/ITodoItem";
import { deleteTodoItem } from "../../services/TodoItem";
import styled from "styled-components";
import Toggle from "../Common/Toggle";
import {
  StyledDeleteButton,
  StyledEditButton,
} from "../Common/Styled-components";

interface TodoItemProps {
  item: ITodoItem;
  handleTodoList: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ item, handleTodoList }) => {
  const [todoItem, setTodoItem] = useState<ITodoItem>({ ...item });

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.currentTarget;
    setTodoItem({ ...todoItem, [name]: type !== "checkbox" ? value : checked });
  };

  const handleDelete = async () => {
    try {
      await deleteTodoItem(todoItem.id);
      handleTodoList();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <StyledCard key={todoItem.id}>
      <StyledWrapper>
        <h6>Realized</h6>
        <h6>Description</h6>
        <Toggle item={todoItem} handleChange={handleChange} isDisabled={true} />
        <ContentDescription>{item.description}</ContentDescription>
        <StyledDeleteButton onClick={handleDelete}>Delete</StyledDeleteButton>
        <ContentEdit>
          <Link to={`/todoitem/${todoItem.id}`}>
            <StyledEditButton>Edit</StyledEditButton>
          </Link>
        </ContentEdit>
      </StyledWrapper>
    </StyledCard>
  );
};

export default TodoItem;

const ContentDescription = styled.p`
  grid-area: 2 / 2 / 3 / 3;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.1fr);
  grid-template-rows: 30px 0.2fr;
  align-items: center;
  gap: 0.3rem;
`;

const StyledCard = styled.div`
  width: 100%;
`;

const ContentEdit = styled.div`
  grid-area: 2 / 4 / 3 / 5;
`;
