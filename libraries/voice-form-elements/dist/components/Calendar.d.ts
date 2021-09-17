/// <reference types="react" />
declare type Props = {
    date?: Date;
    onDatePick?: (value: Date) => void;
};
export declare const Calendar: ({ date, onDatePick }: Props) => JSX.Element;
export {};
