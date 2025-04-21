export type RecurringType = 'none' | 'daily' | 'weekly' | 'monthly'

export interface Todo {
    id: string
    title: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
    createdDate: string
    dependsOn: string[]
    recurring: {
        type: RecurringType
        lastCreatedDate: string
    }
}