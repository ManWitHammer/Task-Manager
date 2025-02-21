export const validateDate = (date: string): string | null => {
    if (date.length < 10 || date.length > 10) {
        return "Неверный формат даты"
    }
    const [day, month, year] = date.split(".")
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
        return "Неверный формат даты"
    }
    const dayNumber = +day
    const monthNumber = +month
    const yearNumber = +year
    if (isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber)) {
        return "Неверный формат даты"
    }
    if (dayNumber < 1 || dayNumber > 31) {
        return "Неверный формат даты"
    }
    if (monthNumber < 1 || monthNumber > 12) {
        return "Неверный формат даты"
    }
    if (yearNumber < 1900 || yearNumber > 2025) {
        return "Неверный формат даты"
    }
    return null
}

export const validateTitle = (title: string): string | null => {
    if (title.length < 3) {
        return "Заголовок должен содержать минимум 3 символа"
    }
    if (title.length > 50) {
        return "Заголовок должен содержать максимум 50 символов"
    }
    return null
}

export const validateContent = (content: string): string | null => {
    if (content.length < 3) {
        return "Запись должна содержать минимум 3 символа"
    }
    if (content.length > 1000) {
        return "Запись должна содержать максимум 1000 символов"
    }
    return null
}