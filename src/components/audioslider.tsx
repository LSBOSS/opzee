import { h, Component } from "preact"
import Typography from "preact-material-components/Typography"
import LayoutGrid from "preact-material-components/LayoutGrid"
import Slider from "preact-material-components/Slider"

import "preact-material-components/LayoutGrid/style.css"
import "preact-material-components/Typography/style.css"
import "preact-material-components/Slider/style.css"

interface IAudioSliderProps {
    text?: string
    min?: number
    max?: number
    initialValue?: number

    onChange?(value: number): void
}

interface IAudioSliderState {
    value: number
}

export default class AudioSlider extends Component<IAudioSliderProps, IAudioSliderState> {

    private onChange?(value: number): void

    constructor(props: IAudioSliderProps) {
        super(props)

        props.min = props.min || 1
        props.max = props.max || 100
        props.initialValue = props.initialValue || 50
        this.onChange = props.onChange

        this.state = {
            value: props.initialValue
        }
    }

    private onChangeInternal(e: CustomEvent) {
        const value = e.detail.value
        if (this.onChange)
            this.onChange(value)

        this.setState({value})
    }

    public render(props: IAudioSliderProps, state: IAudioSliderState) {
        return (
            <div>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols={2} align="middle">
                        <Typography caption>{props.text} ({state.value.toFixed(0)})</Typography>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell align="middle">
                        <Slider min={props.min} max={props.max} value={props.initialValue} onChange={e => this.onChangeInternal(e as CustomEvent)}></Slider>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </div>
        )
    }
}
