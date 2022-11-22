export class AudioVisual {

	public source: any
	public analyser: any
	public freqByteData: Uint8Array | undefined;
	public freqData: number = 0;
	private detail: number = 4096;

	constructor(private audioSource: any) {
		this.setupAudio();
	}

	private setupAudio() {
		//sound stuff
		//var audioElm = document.getElementsByTagName('audio')[0];
		var AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
		let audioCtx = new AudioContext();
		this.analyser = audioCtx.createAnalyser();
		this.analyser.fftSize = this.detail;
		this.source = audioCtx.createMediaElementSource(this.audioSource);
		this.source.connect(this.analyser);
		this.analyser.connect(audioCtx.destination);
	}

	update() {
		this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);
		this.analyser.getByteFrequencyData(this.freqByteData);

		let sum = 0;
		for (let value of this.freqByteData as any) {
			sum += value;
		}
		this.freqData = (sum / this.freqByteData.length) / 100;
		// this.freqByteData = this.freqByteData.slice(0, this.freqByteData.length / 3);
		// freqByteData = freqByteData.filter(function (e) { return e }); // filter out empty values
	}

}