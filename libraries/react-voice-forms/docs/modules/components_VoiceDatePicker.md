[@speechly/react-voice-forms](../README.md) / components/VoiceDatePicker

# Module: components/VoiceDatePicker

## Table of contents

### Type aliases

- [VoiceDatePickerProps](components_VoiceDatePicker.md#voicedatepickerprops)

### Functions

- [VoiceDatePicker](components_VoiceDatePicker.md#voicedatepicker)

## Type aliases

### VoiceDatePickerProps

Ƭ **VoiceDatePickerProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeOnEntityType` | `string` | Specifies how this component reacts to entity types in SpeechSegments. Undefined value reacts to any entity type. Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type. |
| `changeOnIntent?` | `string` | Specifies how this component reacts to intents in SpeechSegments. Undefined value reacts to any intent. String value (intent name) reacts to the single specified intent, e.g. "book" |
| `defaultValue?` | `Date` | Initially selected option. Has no effect if `value` is specified. |
| `label` | `string` | The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget: e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers" |
| `value?` | `Date` | The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `onChange?` | (`value`: `Date`) => `void` | - |

#### Defined in

[components/VoiceDatePicker.tsx:7](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceDatePicker.tsx#L7)

## Functions

### VoiceDatePicker

▸ `Const` **VoiceDatePicker**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VoiceDatePickerProps`](components_VoiceDatePicker.md#voicedatepickerprops) |

#### Returns

`Element`

#### Defined in

[components/VoiceDatePicker.tsx:74](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceDatePicker.tsx#L74)
