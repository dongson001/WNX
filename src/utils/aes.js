export function encrypt(password) {
	return btoa(password)
}

export function decode(password) {
	return atob(password)
}