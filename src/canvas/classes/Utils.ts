export function getUniqueId(): string {
	return '_' + Math.random().toString(36).substr(2, 9);
}
