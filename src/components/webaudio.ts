import { throwStatement } from "babel-types"

type webAudioFn = (time: number, index: number, sample: number) => number


export class MyWebAudio {
    private ctx: AudioContext
    private scriptProcessor: ScriptProcessorNode
    private i: number = 0
    private t: number = 0
    private rate: number
    private duration: number = Infinity
    public isPlaying: boolean = false

    constructor(public fn: webAudioFn) {
        this.ctx = new AudioContext()
        this.rate = this.ctx.sampleRate

        this.scriptProcessor = this.ctx.createScriptProcessor(2048, 1, 1)

        this.scriptProcessor.onaudioprocess = (ape: AudioProcessingEvent) => {
            const input = ape.inputBuffer.getChannelData(0)
            const output = ape.outputBuffer.getChannelData(0)
            this.tick(output, input)
        }
    }

    private tick(output: Float32Array, input: Float32Array) {
        for (let i = 0; i < output.length; i++) {
            this.t = this.i / this.rate
            this.i++

            output[i] = this.fn(this.t, this.i, input[i])

            if (this.i >= this.duration) {
                this.stop()
                break
            }
        }
    }

    public stop() {
        this.scriptProcessor.disconnect()
        this.isPlaying = false
    }

    public play() {
        if (this.isPlaying)
            return

        this.i = this.t = 0

        this.ctx.resume()
        this.scriptProcessor.connect(this.ctx.destination)
        this.isPlaying = true
    }
}
