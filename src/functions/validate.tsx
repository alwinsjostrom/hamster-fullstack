//Kolla om namnet är i rätt format
export const isValidName = (name: string): boolean => {
    if (name.length < 2) return false
    return true
}

//Kolla om åldern är i rätt format
export const isValidAge = (age: number): boolean => {
    if (isNaN(age)) return false
    if (age < 0) return false
    let ageString = String(age)
    if (ageString.includes(',') || ageString.includes('.')
    ) return false
    return true
}