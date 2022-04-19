import { State } from "@/store";
import { Module } from "vuex";
import http from "@/http";
import ITask from "@/interfaces/ITask";
import { ADD_TASK, DEFINE_TASKS, EDIT_TASK } from "@/store/mutations-type";
import { ALTER_TASK, GET_TASKS, STORE_TASK } from "@/store/actions-type";

export interface TaskState {
    tasks: ITask[]
}

export const task: Module<TaskState, State> = {
    mutations: {
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks;
        },
        [ADD_TASK](state, task: ITask) {
            state.tasks.push(task);
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id === task.id);
            state.tasks[index] = task;
        }
    },
    actions: {
        [GET_TASKS]({ commit }, filter: string) {
            let url = 'tarefas';

            if(filter) url += `?description=${filter}`
            
            http.get(url).then(res => commit(DEFINE_TASKS, res.data));
        },
        [STORE_TASK]({ commit }, task: ITask) {
            return http.post('tarefas', task)
                .then(res => commit(ADD_TASK, res.data));
        },
        [ALTER_TASK]({ commit }, task: ITask) {
            return http.put(`tarefas/${task.id}`, task)
                .then(res => commit(EDIT_TASK, task));
        },
    }
}