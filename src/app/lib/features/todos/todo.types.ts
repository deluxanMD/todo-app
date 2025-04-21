export interface Todo {
    id: string
    title: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
    createdDate: Date
    dependsOn: string[]
}