export function getIdToken() {
    const data = JSON.parse(window.localStorage.getItem('token'))
    return data.idToken
}
export const APIKey = 'AIzaSyBSx_sJAvz0AmmffTDwODGAioXfyqP4Foc'