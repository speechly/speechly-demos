[@speechly/react-voice-forms](../README.md) / components/VoiceCheckbox

# Module: components/VoiceCheckbox

## Table of contents

### Type aliases

- [VoiceCheckboxProps](components_VoiceCheckbox.md#voicecheckboxprops)

### Functions

- [VoiceCheckbox](components_VoiceCheckbox.md#voicecheckbox)

## Type aliases

### VoiceCheckboxProps

Ƭ **VoiceCheckboxProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeOnEntityType` | `string` | Specifies how this component reacts to entity types in SpeechSegments. Undefined value reacts to any entity type. Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type. |
| `changeOnIntent?` | `string` | Specifies how this component reacts to intents in SpeechSegments. Undefined value reacts to any intent. String value (intent name) reacts to the single specified intent, e.g. "book" |
| `defaultValue?` | `boolean` | Initial checked state. Has no effect if `value` is specified. |
| `label` | `string` | The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget: e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers" |
| `value?` | `boolean` | The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `onChange?` | (`value`: `boolean`) => `void` | - |

#### Defined in

[components/VoiceCheckbox.tsx:5](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceCheckbox.tsx#L5)

## Functions

### VoiceCheckbox

▸ `Const` **VoiceCheckbox**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VoiceCheckboxProps`](components_VoiceCheckbox.md#voicecheckboxprops) |

#### Returns

`Element`

#### Defined in

[components/VoiceCheckbox.tsx:58](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceCheckbox.tsx#L58)
