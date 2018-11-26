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

        console.log(`MIN: ${props.min}`)

        props.min = props.min !== undefined ? props.min : 1
        props.max = props.max !== undefined ? props.max : 100
        props.initialValue = props.initialValue !== undefined ? props.initialValue : 50
        this.onChange = props.onChange

        this.state = {
            value: props.initialValue
        }
    }

    private onChangeInternal(e: CustomEvent) {
        const value = e.detail.value
        if (typeof value === "number") {
            if (this.onChange)
                this.onChange(value)
            this.setState({ value: value })
        }
    }

    public render({ min, max, initialValue, text }: IAudioSliderProps, { value }: IAudioSliderState) {
        return (
            <div>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell cols={2} align="middle">
                        <Typography caption>{text} ({value.toFixed(1)})</Typography>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell align="middle">
                        <Slider
                            min={min}
                            max={max}
                            value={initialValue}
                            onChange={e => this.onChangeInternal(e as CustomEvent)}>
                        </Slider>
                    </LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </div>
        )
    }
}
