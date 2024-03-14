export interface RequestUserSignupData {
    fullName: string,
    email: string,
    phone: string,
    role: 1 | 2,
    password: string,
    confirmPassword: string
}
export interface RequestUserLoginData {
    email: string,
    password: string
}
export interface RequestRegisterVehicleData {
    vehicle: 'bike' | 'car',
    status: boolean
}

export interface RequestUserGeolocation {
    latitude: number,
    longitude: number
}

