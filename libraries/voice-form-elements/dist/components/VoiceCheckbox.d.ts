/// <reference types="react" />
declare type Props = {
    label: string;
    intent: string;
    focused?: boolean;
    entityName?: string;
    initValue?: boolean;
    handledAudioContext?: string;
    onChange?: (value: boolean) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onFinal?: () => void;
};
export declare const VoiceCheckbox: ({ label, intent, entityName, initValue, onChange, onFinal, onBlur, onFocus, focused, handledAudioContext }: Props) => JSX.Element;
export {};
