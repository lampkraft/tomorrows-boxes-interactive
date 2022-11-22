export function getPointDirection(x1: number, y1: number, x2: number, y2: number): number {
	return Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180;
}

export function getPointDistance(x1: number, y1: number, x2: number, y2: number): number {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

export function random(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPointCollision(x1: number, y1: number, x2: number, y2: number, w2: number, h2: number): boolean {
	return x1 <= x2 + w2 &&
		x1 >= x2 &&
		y1 <= y2 + h2 &&
		y1 >= y2;
}

export function getBoxCollision(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
	return x1 <= x2 + w2 &&
		x1 + w1 >= x2 &&
		y1 <= y2 + h2 &&
		y1 + h1 >= y2;
}

export function getUniqueId(): string {
	return '_' + Math.random().toString(36).substr(2, 9);
}

export function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}