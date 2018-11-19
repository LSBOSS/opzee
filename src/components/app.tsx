import { h, Component } from "preact"
import { Button } from "preact-material-components/Button"
import LayoutGrid from "preact-material-components/LayoutGrid"
import "preact-material-components/Button/style.css"
import "preact-material-components/LayoutGrid/style.css"
import { MyWebAudio } from "./webaudio"
import AudioSlider from "./audioslider"

export default class App extends Component<{}, {}> {
  private tau: number = Math.PI * 2
  private frequency: number = 355
  private webaudio: MyWebAudio = new MyWebAudio((t, i, s) => this.sine(t))

  private lfoFreq = 25
  private lfoAmount = 1

  private volume = 0.15

  private sine(time: number) {
    const lfoMultiplier = Math.sin(time * this.tau * this.lfoFreq) * this.lfoAmount
    const value =  Math.sin(time * (this.frequency + lfoMultiplier) * this.tau)
    // const value = Math.asin(Math.sin(this.tau * (this.frequency + lfoMultiplier) * time)) * 2 / Math.PI
    return this.volume * value
  }

  public onPlayClicked() {
    console.log(this.tau)
    console.log(this.tau * this.frequency)
    console.log("Play")
    this.webaudio.play()
  }

  public onStopClicked() {
    console.log("Stop")
    this.webaudio.stop()
  }

  public onLfoChange(value: number) {
    this.lfoFreq = value
  }

  public render() {
    return (
      <div>
        <Button secondary raised outlined onClick={() => this.onPlayClicked()}>Play</Button >
        <Button raised outlined onClick={() => this.onStopClicked()}>Stop</Button>
        <div>
          <LayoutGrid>
            <AudioSlider text="Hallo" min={0} max={100} initialValue={25} onChange={value => this.onLfoChange(value)}/>
          </LayoutGrid>
        </div>
      </div>
    )
  }
}
