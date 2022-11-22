export class Path {
	speed: number;
	limit: number;
	duration: number;
	initSpeed: number;
	initLimit: number;
	initDuration: number;
	options: any;
	steps = 0;
	count = 0;

	constructor(speed: number, limit: number, duration: number, options: any) {
		this.speed = speed;
		this.limit = limit;
		this.duration = duration;
		this.initSpeed = this.speed;
		this.initLimit = this.limit;
		this.initDuration = this.duration;
		this.options = options;
		this.steps = 0;
		this.count = 0;
	}

	/**
	 * Set options object. Can contain anything that could be used in animations(blend mode, )
	 * @param {*} options options object. Can be anything
	 */
	public setOptions(options: any) {
		this.options = options;
	};

	/**
	 * Return options object. Can be anything
	 */
	public getOptions() {
		return this.options;
	};

	/**
	 * Increments until path has been reached or time has run out.
	 */
	public animateToPath() {
		if (this.steps < this.limit && this.steps + this.speed <= this.limit) {
			this.steps += this.speed;
		} else if (this.steps > this.limit && this.steps - this.speed >= this.limit) {
			this.steps -= this.speed;
		} else {
			this.steps = this.limit;
		}

		if (this.steps === this.limit || (this.duration != null && this.count >= this.duration)) {
			this.steps = 0;
			this.count = 0;
			this.speed = this.initSpeed;
			this.limit = this.initLimit;
			this.duration = this.initDuration;
			return true;
		}
		this.count++;
		return false;
	};
}
