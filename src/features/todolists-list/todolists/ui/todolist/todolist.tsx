import React, {FC, memo, useCallback, useEffect} from 'react';
import {TodolistDomainType} from 'features/todolists-list/todolists/model/todolists.reducer';
import {tasksThunks} from 'features/todolists-list/tasks/model/tasks.reducer';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components';
import {TaskType} from 'features/todolists-list/tasks/api/tasks.api.types';
import {
    FilterTasksButtons
} from 'features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons';
import {Tasks} from 'features/todolists-list/todolists/ui/todolist/tasks/tasks';
import {TodolistTitle} from 'features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title';

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(({todolist, tasks}) => {
    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallback = useCallback((title: string) => {
            return addTask({title, todolistId: todolist.id}).unwrap();
        },
        [todolist.id],
    );

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                <Tasks todolist={todolist} tasks={tasks}/>
            </div>
            <div style={{paddingTop: '10px'}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});
