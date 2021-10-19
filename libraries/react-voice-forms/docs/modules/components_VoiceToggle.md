[@speechly/react-voice-forms](../README.md) / components/VoiceToggle

# Module: components/VoiceToggle

## Table of contents

### Type aliases

- [VoiceToggleProps](components_VoiceToggle.md#voicetoggleprops)

### Functions

- [VoiceToggle](components_VoiceToggle.md#voicetoggle)

## Type aliases

### VoiceToggleProps

Ƭ **VoiceToggleProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changeOnEntityType?` | `string` \| `string`[] | Specifies how this component reacts to entity types in SpeechSegments. - Undefined value ignores the entity type (matches any value). - String value (entity type) reacts only to the single specified entity type, e.g. "passengers" - Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type. |
| `changeOnEntityValue?` | `string`[] | Specifies how this component reacts to entity values in SpeechSegments. - Array of strings (entity values), one for each option, enables changing this widget's value to the option matching entity value. |
| `changeOnIntent?` | `string` \| `string`[] | Specifies how this component reacts to intents in SpeechSegments. - Undefined value ignores the intent (matches any value). - String value (intent) reacts to the single specified intent, e.g. "book" - Array of strings (intents), one for each option, enables changing this widget's value to the option matching the intent. If an undefined or string value is provided, changeOnEntityType or changeOnEntityValue must specify an array value for the component to react to speech input. |
| `defaultValue?` | `string` | Initially selected option. Has no effect if `value` is specified. |
| `displayNames?` | `string`[] | Array of human-fiendly display names for each option |
| `options` | `string`[] | Array of option id strings. The selected id is returned by onChange. By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value. |
| `value?` | `string` | The current option. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `onChange?` | (`value`: `string`) => `void` | - |

#### Defined in

[components/VoiceToggle.tsx:4](https://github.com/speechly/speechly-demos/blob/97beb04/libraries/react-voice-forms/src/components/VoiceToggle.tsx#L4)

## Functions

### VoiceToggle

▸ `Const` **VoiceToggle**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`VoiceToggleProps`](components_VoiceToggle.md#voicetoggleprops) |

#### Returns

`Element`

#### Defined in

[components/VoiceToggle.tsx:82](https://github.com/speechly/speechly-demos/blob/97beb04/libraries/react-voice-forms/src/components/VoiceToggle.tsx#L82)
