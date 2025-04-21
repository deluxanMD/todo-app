import { Todo } from "./todo.types";

export const canCompleteTask = (task: Todo, allTasks: Todo[]): boolean => {
    return task.dependsOn.every((depId) => {
      const depTask = allTasks.find((t) => t.id === depId);
      return depTask?.completed;
    });
  }

export const removeAvailableInDependency = (id: string, allTodos: Todo[]) : Todo[]=> {
    return allTodos.map((todo) => {
        if (todo.dependsOn.includes(id)) {
            return {
                ...todo,
                dependsOn: todo.dependsOn.filter(dep => dep !== id)
            }
        }

        return todo
    })
}

export const getTodoById = (id: string, allTodos: Todo[]): Todo | undefined => {
    return allTodos.find((todo) => todo.id === id)
}