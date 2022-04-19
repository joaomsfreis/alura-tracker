import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { ALTER_PROJECT, GET_PROJECTS, STORE_PROJECT } from "@/store/actions-type";
import { ADD_PROJECT, DEFINE_PROJECT, EDIT_PROJECT, REMOVE_PROJECT } from "@/store/mutations-type";
import { Module } from "vuex";
import http from "@/http";

export interface ProjectState {
    projects: IProject[]
}

export const project: Module<ProjectState, State> = {
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
        [DEFINE_PROJECT](state, projects: IProject[]) {
            state.projects = projects;
        }
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get('projetos').then(res => commit(DEFINE_PROJECT, res.data));
        },
        [STORE_PROJECT](context, projectName: string) {
            return http.post('projetos', {
                name: projectName
            });
        },
        [ALTER_PROJECT](context, project: IProject) {
            return http.put(`projetos/${project.id}`, {
                name: project.name
            });
        },
        async [REMOVE_PROJECT]({ commit }, id: string) {
            await http.delete(`projetos/${id}`);
            return commit(REMOVE_PROJECT, id);
        }
    }
}