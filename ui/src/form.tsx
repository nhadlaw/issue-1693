import * as Fluent from '@fluentui/react';
import React from 'react';
import { stylesheet } from 'typestyle';
import { Button, Buttons, XButtons, XStandAloneButton } from './button';
import { Checkbox, XCheckbox } from './checkbox';
import { Checklist, XChecklist } from './checklist';
import { ChoiceGroup, XChoiceGroup } from './choice_group';
import { ColorPicker, XColorPicker } from './color_picker';
import { Combobox, XCombobox } from './combobox';
import { DatePicker, XDatePicker } from './date_picker';
import { Dropdown, XDropdown } from './dropdown';
import { Expander, XExpander } from './expander';
import { FileUpload, XFileUpload } from './file_upload';
import { Label, XLabel } from './label';
import { cards } from './layout';
import { Link, XLink } from './link';
import { MessageBar, XMessageBar } from './message_bar';
import { Nav, XNav } from './nav';
import { Progress, XProgress } from './progress';
import { Separator, XSeparator } from './separator';
import { Slider, XSlider } from './slider';
import { Spinbox, XSpinbox } from './spinbox';
import { Table, XTable } from './table';
import { Tabs, XTabs } from './tabs';
import { bond, Card, Packed, unpack, xid } from './telesync';
import { Text, XText } from './text';
import { Textbox, XTextbox } from './textbox';
import { getTheme } from './theme';
import { Toggle, XToggle } from './toggle';
import { XToolTip } from './tooltip';

/** Create a component. */
export interface Component {
  /** Text block. */
  text?: Text
  /** Label. */
  label?: Label
  /** Separator. */
  separator?: Separator
  /** Progress bar. */
  progress?: Progress
  /** Message bar. */
  message_bar?: MessageBar
  /** Textbox. */
  textbox?: Textbox
  /** Checkbox. */
  checkbox?: Checkbox
  /** Toggle. */
  toggle?: Toggle
  /** Choice group. */
  choice_group?: ChoiceGroup
  /** Checklist. */
  checklist?: Checklist
  /** Dropdown. */
  dropdown?: Dropdown
  /** Combobox. */
  combobox?: Combobox
  /** Slider. */
  slider?: Slider
  /** Spinbox. */
  spinbox?: Spinbox
  /** Date picker. */
  date_picker?: DatePicker
  /** Color picker. */
  color_picker?: ColorPicker
  /** Button. */
  button?: Button
  /** Button set. */
  buttons?: Buttons
  /** File upload. */
  file_upload?: FileUpload
  /** Table. */
  table?: Table
  /** Link. */
  link?: Link
  /** Tabs. */
  tabs?: Tabs
  /** Expander. */
  expander?: Expander
  /** Navigation. */
  nav?: Nav
}

/** Create a form. */
interface State {
  /** The components in this form. */
  items: Packed<Component[]>
}


const
  theme = getTheme(),
  css = stylesheet({
    card: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
  defaults: Partial<State> = {
    items: []
  }


export const
  XComponents = ({ items }: { items: Component[] }) => {
    const components = items.map(m => <XComponent key={xid()} model={m} />)
    // TODO gap 10px between fields
    return <>{components}</>
  }

const
  XComponent = ({ model: m }: { model: Component }) => {
    if (m.text) return <XToolTip content={m.text.tooltip} expand={false}><XText model={m.text} /></XToolTip>
    if (m.label) return <XToolTip content={m.label.tooltip} expand={false}><XLabel model={m.label} /></XToolTip>
    if (m.link) return <XToolTip content={m.link.tooltip} expand={false}><XLink model={m.link} /></XToolTip>
    if (m.separator) return <XSeparator model={m.separator} />
    if (m.progress) return <XToolTip content={m.progress.tooltip}><XProgress model={m.progress} /></XToolTip>
    if (m.message_bar) return <XMessageBar model={m.message_bar} />
    if (m.textbox) return <XToolTip content={m.textbox.tooltip}><XTextbox model={m.textbox} /></XToolTip>
    if (m.checkbox) return <XToolTip content={m.checkbox.tooltip} expand={false}><XCheckbox model={m.checkbox} /></XToolTip>
    if (m.toggle) return <XToolTip content={m.toggle.tooltip} expand={false}><XToggle model={m.toggle} /></XToolTip>
    if (m.choice_group) return <XToolTip content={m.choice_group.tooltip}><XChoiceGroup model={m.choice_group} /></XToolTip>
    if (m.dropdown) return <XToolTip content={m.dropdown.tooltip}><XDropdown model={m.dropdown} /></XToolTip>
    if (m.checklist) return <XToolTip content={m.checklist.tooltip}><XChecklist model={m.checklist} /></XToolTip>
    if (m.combobox) return <XToolTip content={m.combobox.tooltip}><XCombobox model={m.combobox} /></XToolTip>
    if (m.slider) return <XToolTip content={m.slider.tooltip}><XSlider model={m.slider} /></XToolTip>
    if (m.spinbox) return <XToolTip content={m.spinbox.tooltip} expand={false}><XSpinbox model={m.spinbox} /></XToolTip>
    if (m.date_picker) return <XToolTip content={m.date_picker.tooltip}><XDatePicker model={m.date_picker} /></XToolTip>
    if (m.color_picker) return <XToolTip content={m.color_picker.tooltip}><XColorPicker model={m.color_picker} /></XToolTip>
    if (m.file_upload) return <XToolTip content={m.file_upload.tooltip}><XFileUpload model={m.file_upload} /></XToolTip>
    if (m.table) return <XToolTip content={m.table.tooltip}><XTable model={m.table} /></XToolTip>
    if (m.buttons) return <XButtons model={m.buttons} />
    if (m.tabs) return <XTabs model={m.tabs} />
    if (m.button) return <XToolTip content={m.button.tooltip} showIcon={false} expand={false}><XStandAloneButton model={m.button} /></XToolTip>
    if (m.expander) return <XExpander model={m.expander} />
    if (m.nav) return <XNav model={m.nav} />
    return <Fluent.MessageBar messageBarType={Fluent.MessageBarType.severeWarning}>This component could not be rendered.</Fluent.MessageBar>
  },
  View = bond(({ state, changed }: Card<State>) => {
    const
      render = () => {
        const
          s = theme.merge(defaults, state),
          items = unpack<Component[]>(s.items) // XXX ugly

        return (
          <div className={css.card}>
            <XComponents items={items} />
          </div>)
      }
    return { render, changed }
  })

cards.register('form', View)
