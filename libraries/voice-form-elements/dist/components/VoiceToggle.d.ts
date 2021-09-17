/// <reference types="react" />
declare type Props = {
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
export declare const VoiceToggle: ({ intent, options, entityName, initValue, onChange, onFinal, onBlur, onFocus, focused, handledAudioContext }: Props) => JSX.Element;
export {};
