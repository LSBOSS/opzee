export class Synth {
    public isPlaying: boolean = false

    private ctx: AudioContext
    private rate: number

    private osc1: OscillatorNode
    private osc1Gain: GainNode
    private envelopeGain: GainNode

    private vibratoOsc: OscillatorNode
    private vibratoOscGain: GainNode

    private tremoloOsc: OscillatorNode
    private tremoloOscGain: GainNode

    private _masterVolume = 0.125

    private _tremoloGain = 0.09
    public get tremoloGain() { return this._tremoloGain }
    public set tremoloGain(value: number) {
        this._tremoloGain = value
        this.tremoloOscGain.gain.value = this._tremoloGain
    }

    private _tremoloFreq = 5.1
    public get tremoloFreq() { return this._tremoloFreq }
    public set tremoloFreq(value: number) {
        this._tremoloFreq = value
        this.tremoloOsc.frequency.value = this._tremoloFreq
    }

    private _vibratoGain = 10
    public get vibratoGain() { return this._vibratoGain }
    public set vibratoGain(value: number) {
        this._vibratoGain = value
        this.vibratoOscGain.gain.value = this._vibratoGain
    }

    private _vibratoFreq = 5.1
    public get vibratoFreq() { return this._vibratoFreq }
    public set vibratoFreq(value: number) {
        this._vibratoFreq = value
        this.vibratoOsc.frequency.value = this._vibratoFreq
    }

    private _osc1Type: OscillatorType = "sawtooth"
    public get osc1Type() { return this._osc1Type }
    public set osc1Type(value: OscillatorType) {
        this._osc1Type = value
        this.osc1.type = this._osc1Type
    }

    constructor() {
        this.ctx = new AudioContext()
        this.rate = this.ctx.sampleRate

        this.osc1 = this.ctx.createOscillator()
        this.osc1.frequency.value = 130.81
        this.osc1.type = this._osc1Type

        this.osc1Gain = this.ctx.createGain()
        this.osc1Gain.gain.value = this._masterVolume
        this.osc1.connect(this.osc1Gain)

        this.envelopeGain = this.ctx.createGain()
        this.envelopeGain.gain.value = 0
        this.osc1Gain.connect(this.envelopeGain)

        // create modulator osc
        this.vibratoOsc = this.ctx.createOscillator()
        this.vibratoOsc.type = "sine"
        this.vibratoOsc.frequency.value = this._vibratoFreq

        this.vibratoOscGain = this.ctx.createGain()
        this.vibratoOsc.connect(this.vibratoOscGain)
        this.vibratoOscGain.gain.value = this._vibratoGain
        this.vibratoOscGain.connect(this.osc1.frequency)

        this.tremoloOsc = this.ctx.createOscillator()
        this.tremoloOsc.type = "sine"
        this.tremoloOsc.frequency.value = this._tremoloFreq

        this.tremoloOscGain = this.ctx.createGain()
        this.tremoloOsc.connect(this.tremoloOscGain)
        this.tremoloOscGain.gain.value = this._tremoloGain
        this.tremoloOscGain.connect(this.osc1Gain.gain)

        this.osc1.start(0)
        this.vibratoOsc.start(0)
        this.tremoloOsc.start(0)

        this.envelopeGain.connect(this.ctx.destination)
    }

    public stop() {
        this.noteoff()
        this.isPlaying = false
    }

    private currentEnvA = 50
    private currentEnvD = 15
    private currentEnvS = 30
    private currentEnvR = 100

    private noteoff() {
        const now = this.ctx.currentTime
        const release = now + (this.currentEnvR / 10.0)
        console.log(this.envelopeGain.gain.value)

        this.envelopeGain.gain.cancelScheduledValues(now)
        console.log(this.envelopeGain.gain.value)
        this.envelopeGain.gain.setValueAtTime(1.0, now)  // this is necessary because of the linear ramp
        this.envelopeGain.gain.setTargetAtTime(0.0, now, (this.currentEnvR / 100))
    }

    private noteon() {
        const now = this.ctx.currentTime
        const envAttackEnd = now + (this.currentEnvA / 20.0)

        //this.envelopeGain.gain.value = 1.0
        this.envelopeGain.gain.setValueAtTime(0.0, now)
        this.envelopeGain.gain.linearRampToValueAtTime(1.0, envAttackEnd)
        this.envelopeGain.gain.setTargetAtTime((this.currentEnvS / 100.0), envAttackEnd, (this.currentEnvD / 100.0) + 0.001)
    }

    public play() {
        if (this.isPlaying)
            return

        this.noteon()

        // this.envelopeGain.connect(this.ctx.destination)
        // this.ctx.resume()
        this.isPlaying = true
    }
}
