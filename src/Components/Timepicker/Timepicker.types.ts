export type Thetime  = 'hours' | 'minutes' | 'seconds'

export interface ITimepickerSettings {
    /** Method For triggering the data */
    onChange: (data: string) => void;
    /* Default time */
    defaultValue?: string;
}