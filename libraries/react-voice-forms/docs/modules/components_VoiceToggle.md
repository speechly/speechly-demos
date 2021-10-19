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
| `changeOnEntityType?` | `string` \| `string`[] | `string[]` (entity types) changes this widget's option if a matched entity type is found in the SpeechSegment. The order must match that of `options`. `string` (intent) filters out all but the specified entity type. Use `changeOnEntityValue` to change the option. `undefined` disables entity type filtering. |
| `changeOnEntityValue?` | `string`[] | `string[]` (entity values) changes this widget's option if a matched entity value is found in the SpeechSegment. The order must match that of `options`. |
| `changeOnIntent?` | `string` \| `string`[] | `string[]` (intents) changes this widget's option based on the intent of the SpeechSegment. The order must match that of `options`. `string` (intent) filters out all but the specified intents. Use `changeOnEntityType` or `changeOnEntityValue` to change the option. `undefined` disables intent filtering. |
| `defaultValue?` | `string` | Initially selected option. Has no effect if `value` is specified. |
| `displayNames?` | `string`[] | Human-fiendly display names for each option. |
| `options` | `string`[] | The selected option is returned by onChange. By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value. |
| `value?` | `string` | The current option. Must match a `options` value. Provide an `onChange` handler to react to changes. |
| `onChange?` | (`value`: `string`) => `void` | - |

#### Defined in

[components/VoiceToggle.tsx:4](https://github.com/speechly/speechly-demos/blob/ad20e0c/libraries/react-voice-forms/src/components/VoiceToggle.tsx#L4)

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

[components/VoiceToggle.tsx:78](https://github.com/speechly/speechly-demos/blob/ad20e0c/libraries/react-voice-forms/src/components/VoiceToggle.tsx#L78)
