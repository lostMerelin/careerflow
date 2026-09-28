export interface CoverLetter {
    id: string
    title: string
    category: string
    content: string
    created_at: string
    update_at: string
}

export interface CoverLetterInput {
    title?: string
    category?: string
    content?: string
}