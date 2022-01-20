import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tasks from "@/views/Tasks.vue";
import Projects from "@/views/Projects.vue";
import Form from "@/views/Projects/Form.vue";
import List from "@/views/Projects/List.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'task',
        component: Tasks
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {
                path: '',
                name: 'projects',
                component: List
            },
            {
                path: 'new',
                name: 'projects.new',
                component: Form
            },
            {
                path: ':id',
                name: 'projects.edit',
                component: Form,
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;