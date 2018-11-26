import { h, Component } from "preact"
import { Button } from "preact-material-components/Button"
import LayoutGrid from "preact-material-components/LayoutGrid"
import FormField from "preact-material-components/FormField"
import Radio from "preact-material-components/Radio"

import "preact-material-components/FormField/style.css"
import "preact-material-components/Button/style.css"
import "preact-material-components/LayoutGrid/style.css"

import AudioSlider from "./audioslider"
import { Synth } from "./synth"

export default class App extends Component<{}, {}> {
  private tau: number = Math.PI * 2
  private frequency: number = 440

  private masterVolume = 0.15

  private synth: Synth = new Synth()

  public onPlayClicked() {
    this.synth.play()
  }

  public onStopClicked() {
    this.synth.stop()
  }

  public render() {
    return (
      <div>
        <Button secondary raised outlined onClick={() => this.onPlayClicked()}>Play</Button >
        <Button raised outlined onClick={() => this.onStopClicked()}>Stop</Button>
        <div>
          <FormField >
            <Radio
              id="sine"
              name="Waveform"
              checked={true}
              onChange={() => this.synth.osc1Type = "sine"} />
            <label for="sine">Sine</label>
          </FormField >
          <FormField >
            <Radio
              id="sawtooth"
              name="Waveform"
              onChange={() => this.synth.osc1Type = "sawtooth"} />
            <label for="sawtooth">Sawtooth</label>
          </FormField >
          <FormField >
            <Radio
              id="square"
              name="Waveform"
              onChange={() => this.synth.osc1Type = "square"} />
            <label for="square">Square</label>
          </FormField >
          <FormField >
            <Radio
              id="triangle"
              name="Waveform"
              onChange={() => this.synth.osc1Type = "triangle"} />
            <label for="triangle">Triangle</label>
          </FormField >
        </div>
        <div>
          <LayoutGrid>
            <AudioSlider
              text="Tremolo (Freq)"
              min={0}
              max={20}
              initialValue={this.synth.tremoloFreq}
              onChange={value => this.synth.tremoloFreq = value}
            />
          </LayoutGrid>
        </div>
        <div>
          <LayoutGrid>
            <AudioSlider
              text="Tremolo (Amount)"
              min={0}
              max={100}
              initialValue={this.synth.tremoloGain * 100}
              onChange={value => this.synth.tremoloGain = value / 100}
            />
          </LayoutGrid>
        </div>

        <div>
          <LayoutGrid>
            <AudioSlider
              text="Vibrato (Freq)"
              min={0}
              max={20}
              initialValue={this.synth.vibratoFreq}
              onChange={value => this.synth.vibratoFreq = value}
            />
          </LayoutGrid>
        </div>

        <div>
          <LayoutGrid>
            <AudioSlider
              text="Vibrato (Amount)"
              min={0}
              max={100}
              initialValue={this.synth.vibratoGain}
              onChange={value => this.synth.vibratoGain = value}
            />
          </LayoutGrid>
        </div>

      </div>
    )
  }
}
