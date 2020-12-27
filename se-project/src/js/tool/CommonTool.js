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

export function setCurrentCompareProjects(projects) {
    console.log(projects);
    window.sessionStorage.setItem('currentCompareProjects', JSON.stringify(projects))
}

export function getCurrentCompareProjects() {
    return JSON.parse(window.sessionStorage.getItem('currentCompareProjects'))
}
export const APIKey = 'AIzaSyBSx_sJAvz0AmmffTDwODGAioXfyqP4Foc'