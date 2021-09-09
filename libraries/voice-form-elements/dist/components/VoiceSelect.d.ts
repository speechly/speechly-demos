/// <reference types="react" />
declare type Props = {
    label: string;
    intent: string;
    options: string[];
    focused?: boolean;
    entityName?: string;
    initValue?: string;
    handledAudioContext?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onFinal?: () => void;
};
export declare const VoiceSelect: ({ label, intent, options, entityName, initValue, onChange, onFinal, onBlur, onFocus, focused, handledAudioContext }: Props) => JSX.Element;
export {};
