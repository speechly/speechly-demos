[@speechly/react-voice-forms](../README.md) / components/VoiceInput

# Module: components/VoiceInput

## Table of contents

### Type aliases

- [VoiceInputProps](components_VoiceInput.md#voiceinputprops)

### Functions

- [VoiceInput](components_VoiceInput.md#voiceinput)

## Type aliases

### VoiceInputProps

Ƭ **VoiceInputProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget: e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers" |
| `changeOnEntityType` | `string` | Specifies how this component reacts to entity types in SpeechSegments. Undefined value reacts to any entity type. Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type. |
| `value?` | `string` | The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `defaultValue?` | `string` | Initially selected option. Has no effect if `value` is specified. |
| `changeOnIntent?` | `string` | Specifies how this component reacts to intents in SpeechSegments. Undefined value reacts to any intent. String value (intent name) reacts to the single specified intent, e.g. "book" |
| `onChange?` | (`value`: `string`) => `void` | - |

#### Defined in

[components/VoiceInput.tsx:5](https://github.com/speechly/speechly-demos/blob/1339333/libraries/react-voice-forms/src/components/VoiceInput.tsx#L5)

## Functions

### VoiceInput

▸ `Const` **VoiceInput**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VoiceInputProps`](components_VoiceInput.md#voiceinputprops) |

#### Returns

`Element`

#### Defined in

[components/VoiceInput.tsx:58](https://github.com/speechly/speechly-demos/blob/1339333/libraries/react-voice-forms/src/components/VoiceInput.tsx#L58)
