export function getIdToken() {
    const data = JSON.parse(window.localStorage.getItem('token'))
    return data !== null ? data.idToken : undefined
}

export function setCurrentProject(project) {
    window.localStorage.setItem('currentProject', JSON.stringify(project))
}

export function getCurrentProject() {
    return JSON.parse(window.localStorage.getItem('currentProject'))
}
export function setCurrentUser(user) {
    window.localStorage.setItem('currentUser', JSON.stringify(user))
}

export function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('currentUser'))
}
export function clearCurrentUser() {
    window.localStorage.clear()
}

export function setCurrentCompareProjects(projects) {
    console.log(projects);
    window.localStorage.setItem('currentCompareProjects', JSON.stringify(projects))
}

export function getCurrentCompareProjects() {
    return JSON.parse(window.localStorage.getItem('currentCompareProjects'))
}

export function isLoggedIn() {
    return getIdToken() === undefined ? false : true
}
export const APIKey = 'AIzaSyBSx_sJAvz0AmmffTDwODGAioXfyqP4Foc'