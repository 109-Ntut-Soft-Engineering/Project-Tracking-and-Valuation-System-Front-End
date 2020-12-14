export function getIdToken() {
    const data = JSON.parse(window.localStorage.getItem('token'))
    return data.idToken
}

export function setCurrentProject(project) {
    window.sessionStorage.setItem('currentProject', JSON.stringify(project))
}

export function getCurrentProject() {
    return JSON.parse(window.sessionStorage.getItem('currentProject'))
}
export const APIKey = 'AIzaSyBSx_sJAvz0AmmffTDwODGAioXfyqP4Foc'