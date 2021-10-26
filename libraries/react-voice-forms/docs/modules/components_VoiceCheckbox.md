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
| `label` | `string` | The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget: e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers" |
| `setOnEntityType` | `string`[] | `string[]` (entity types) sets (checks) this widget if a matched entity type is found in the SpeechSegment. |
| `clearOnEntityType` | `string`[] | `string[]` (entity types) clears (unchecks) this widget if a matched entity type is found in the SpeechSegment. |
| `value?` | `boolean` | The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler. |
| `defaultValue?` | `boolean` | Initial checked state. Has no effect if `value` is specified. |
| `intent?` | `string` | `string` (intent) filters out all but the specified intent. `undefined` sets on any intent. |
| `clearIntent?` | `string` | `string` (intent) forces clearing values both on `setOnEntityType` and `clearOnEntityType`. |
| `onChange?` | (`value`: `boolean`) => `void` | - |

#### Defined in

[components/VoiceCheckbox.tsx:5](https://github.com/speechly/speechly-demos/blob/80c3199/libraries/react-voice-forms/src/components/VoiceCheckbox.tsx#L5)

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

[components/VoiceCheckbox.tsx:68](https://github.com/speechly/speechly-demos/blob/80c3199/libraries/react-voice-forms/src/components/VoiceCheckbox.tsx#L68)
