import {Button} from '@mui/material';
import React, {FC} from 'react';
import {useActions} from 'common/hooks';
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from 'features/todolists-list/todolists/model/todolists.reducer';

type Props = {
    todolist: TodolistDomainType;
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {

    const {changeTodolistFilter} = useActions(todolistsActions);

    const changeTasksFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, todolistId: todolist.id})
    }

    return (
        <>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeTasksFilterHandler('all')}
                color={'inherit'}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeTasksFilterHandler('active')}
                color={'primary'}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeTasksFilterHandler('completed')}
                color={'secondary'}
            >
                Completed
            </Button>
        </>
    )
}