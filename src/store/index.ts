import { INotification } from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseSotre } from "vuex";
import { ALTER_TASK, GET_TASKS, STORE_TASK } from "./actions-type";
import { ADD_TASK, DEFINE_TASKS, EDIT_TASK, NOTIFY } from "./mutations-type";
import { project, ProjectState } from "./modules/project";
import { task, TaskState } from "./modules/task";

export interface State {
    notifications: INotification[],
    project: ProjectState,
    task: TaskState
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        project: {
            projects: []
        },
        task: {
            tasks: []
        },
        notifications: []
    },
    mutations: {
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(
                    notification => notification.id !== newNotification.id
                );
            }, 2000);
        }
    },
    actions: {},
    modules: {
        project,
        task
    }
});

export function useStore(): Store<State> {
    return vuexUseSotre(key);
}