import { INotification, NotificationType } from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseSotre } from "vuex";
import { ADD_PROJECT, EDIT_PROJECT, NOTIFY, REMOVE_PROJECT } from "./mutations-type";

interface State {
    projects: IProject[],
    notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject;

            state.projects.push(project);
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id);
            state.projects[index] = project;
        },
        [REMOVE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(proj => proj.id !== id);
        },
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);

            setTimeout(() => {
                state.notifications = state.notifications.filter(
                    notification => notification.id !== newNotification.id
                );
            }, 2000);
        }
    }
});

export function useStore(): Store<State> {
    return vuexUseSotre(key);
}