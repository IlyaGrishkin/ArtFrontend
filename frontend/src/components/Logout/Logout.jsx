import { URLS } from "../Utils/constants"

export function Logout() {
    localStorage.clear()
    window.location.href = URLS.HOME
}