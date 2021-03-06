import { _p, Pragma, _e, util } from 'pragmajs'
import { Setting } from './setting'
import { slider, input, withLabel, idler } from '../../extensions/index'
import css from '../../styles/styles.json'

const list = [1, 2, 3, 4, 5]

let defaultContent = pragma =>
    `
    <div data-setting-target='display' class="slider-display">
        8
    </div>
    <div data-setting-target='slider'> =====|-- </div>
`.trim()

export class SettingSlider extends Setting {
    init(
        settings,
        setting,
        conf = {
            contentTemplate: defaultContent,
        }
    ) {
        // this.createWire('setting')

        super.init(...arguments)

        this.slider = _p()
            .run(slider) // label
            // .do(actions.changeFovea)
            .run(function () {
                if (conf.min && conf.max) {
                    this.setRange(conf.min, conf.max)
                }
            })
            .do(() => {
                // when the slider changes value set the current setting
                // value to the same as the slider
                this[setting] = this.slider.value
            })

        this.editor._setContent(defaultContent(this))

        this.editor.element.findAll("[data-setting-target='slider']").forEach(slider => {
            slider.html('')
            this.slider.appendTo(slider)
        })

        this.on('input', value => {
            this.setData({ value: value })
            this.parent.update(this.getData('setting'), value, this)
            this.slider.updateTo(value)
        })

        // console.log(this.element.findAll(`[data-setting-target='display']`))
    }
}
