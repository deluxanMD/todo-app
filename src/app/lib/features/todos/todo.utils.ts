import { RecurringType, Todo } from "./todo.types";

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

export const recurringTask = (recurring: {
    type: RecurringType;
    lastCreatedDate: string;
  }): boolean => {
    const now = new Date();
    const last = new Date(recurring.lastCreatedDate);
  
    switch (recurring.type) {
      case 'daily':
        return now.getDate() !== last.getDate() || now.getTime() - last.getTime() >= (1000 * 60 * 60 * 24);
      case 'weekly':
        const daysDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff >= 7;
      case 'monthly':
        return now.getMonth() !== last.getMonth() || now.getFullYear() !== last.getFullYear();
      default:
        return false;
    }
  }
  