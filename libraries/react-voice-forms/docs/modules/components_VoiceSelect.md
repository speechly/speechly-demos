[@speechly/react-voice-forms](../README.md) / components/VoiceSelect

# Module: components/VoiceSelect

## Table of contents

### Type aliases

- [VoiceSelectProps](components_VoiceSelect.md#voiceselectprops)

### Functions

- [VoiceSelect](components_VoiceSelect.md#voiceselect)

## Type aliases

### VoiceSelectProps

Ƭ **VoiceSelectProps**: `Object`

Properties for VoiceSelect component.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeOnEntityType?` | `string` \| `string`[] | Specifies how this component reacts to entity types in SpeechSegments. Undefined value reacts to any entity type. Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type. If an undefined or string value is provided changeOnEntityValue must specify an array value for the component to react to speech input. |
| `changeOnEntityValue?` | `string`[] | Specifies how this component reacts to entity values in SpeechSegments. Array of strings (entity values), one for each option, enables changing this widget's value to the option matching entity value. By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value. |
| `changeOnIntent?` | `string` \| `string`[] | Specifies how this component reacts to intents in SpeechSegments. Undefined value reacts to any intent. String value (intent name) reacts to the single specified intent, e.g. "book" Array of strings (intents), one for each option, enables changing this widget's value to the option matching the intent. If an undefined or string value is provided, changeOnEntityType or changeOnEntityValue must specify an array value for the component to react to speech input. |
| `defaultValue?` | `string` | Initially selected option. Has no effect if `value` is specified. |
| `displayNames?` | `string`[] | Array of human-fiendly display names for each option |
| `label` | `string` | The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget: e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers" |
| `options` | `string`[] | Array of option id strings. The selected id is returned by onChange. By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value. |
| `value?` | `string` | The current option. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `onChange?` | (`value`: `string`) => `void` | - |

#### Defined in

[components/VoiceSelect.tsx:11](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceSelect.tsx#L11)

## Functions

### VoiceSelect

▸ `Const` **VoiceSelect**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VoiceSelectProps`](components_VoiceSelect.md#voiceselectprops) |

#### Returns

`Element`

#### Defined in

[components/VoiceSelect.tsx:96](https://github.com/speechly/speechly-demos/blob/7b0cf0e/libraries/react-voice-forms/src/components/VoiceSelect.tsx#L96)
