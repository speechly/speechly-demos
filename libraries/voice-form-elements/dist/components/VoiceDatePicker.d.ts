/// <reference types="react" />
declare type Props = {
    label: string;
    intent: string;
    focused?: boolean;
    entityName?: string;
    initDate?: string;
    handledAudioContext?: string;
    onChange?: (value: Date) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onFinal?: () => void;
};
export declare const VoiceDatePicker: ({ label, intent, entityName, initDate, onChange, onFinal, onBlur, onFocus, focused, handledAudioContext }: Props) => JSX.Element;
export {};
