import React, { ChangeEvent, useEffect, useState } from 'react';

import './Timepicker.css';
import { ITimepickerSettings, Thetime } from './Timepicker.types';


const Timepicker = (props: ITimepickerSettings) => {
    const onSendData = props.onChange

    const defaultValue = (props.defaultValue !== undefined) ? props.defaultValue : '12:00:00';

    const defTime = defaultValue.split(':')
    const [hours, setHours] = useState(defTime[0])
    const [minutes, setMinutes] = useState(defTime[1])
    const [seconds, setSeconds] = useState(defTime[2])
    const [totalTime, setTotalTime] = useState(`${hours}:${minutes}:${seconds}`)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    function handleChange(component: Thetime, value: string): void {
        value = value.trim()
        const digsReg = /^\d+$/
        if (!digsReg.test(value)) {
            console.log('digsReg', digsReg.test(value))
            return
        }
        console.log('vv', value, typeof value, parseInt(value))
        value = (value === '') ? '0' : value

        if (component === 'hours') {
            value = (parseInt(value) > 24) ? '0' : value
        } else {
            value = (parseInt(value) > 60) ? '0' : value
        }

        value = (value === '' || isNaN(parseInt(value))) ? '0' : value
        if (value.indexOf('0', 0) === 0) value = value.substring(1)

        if (component === 'hours') {
            const correctHour = (parseInt(value) >= 0 && parseInt(value) <= 24)
            if (correctHour) setHours(value)
        } else {
            const correcMinutesOrSeconds = (parseInt(value) >= 0 && parseInt(value) < 60)
            if (correcMinutesOrSeconds)
                if (component === 'minutes') {
                    setMinutes(value)
                }
            if (component === 'seconds') {
                setSeconds(value)
            }
        }
    }

    function endEdit(): void {
        setTotalTime(joinTotalTime())
        setIsEdit(false)
    }

    function onPressUpDownChangeTime(component: Thetime, eventCode: string): string {
        let prev = 0
        switch (component) {
            case 'hours':
                prev = parseInt(hours)
                break
            case 'minutes':
                prev = parseInt(minutes)
                break
            case 'seconds':
                prev = parseInt(seconds)
                break
        }
        switch (eventCode) {
            case "ArrowUp":
                prev = prev + 1
                break;

            case "ArrowDown":
                prev = prev - 1
                break;
            case 'Backspace' || 'Delete':
                prev = (prev > 10) ? Math.floor(prev / 10) : 0
                break;
            case 'Delete':
                prev = (prev < 10) ? 0 : prev
                break;
        }
        if (component === 'hours') {
            if (prev < 0) prev = 23
            if (prev > 23) prev = 0
        } else {
            if (prev < 0) prev = 59
            if (prev > 59) prev = 0

        }
        return prev.toString()
    }

    const joinTotalTime = (): string => {
    const hhours = (hours.length === 1) ? '0' + hours : hours
    const hminutes = (minutes.length === 1) ? '0' + minutes : minutes
    const hseconds = (seconds.length === 1) ? '0' + seconds : seconds
        return (`${hhours}:${hminutes}:${hseconds}`)

    }

    function onPressDown(component: Thetime, eventCode: string): void {
        const newVal = onPressUpDownChangeTime(component, eventCode)
        switch (component) {
            case 'hours':
                setHours(newVal)
                break;

            case 'minutes':
                setMinutes(newVal)
                break;

            case 'seconds':
                setSeconds(newVal)
                break;
        }
    }


    useEffect(() => {
        onSendData(totalTime)
    }, [totalTime, onSendData])
    return (
        <div>
            <h1>Timepicker</h1>

            <div className='wrapper'>
                <div className={!isEdit ? 'tsWrapper' : 'tsWrapper '}
                    onMouseLeave={() => {
                        setTotalTime(joinTotalTime())
                        setIsEdit(false)

                    }} >
                    <div className={isEdit ? 'input editMode' : 'input'}>
                        <div className='arrow up'
                            onClick={() => {
                                setIsEdit(true)
                                onPressDown('hours', 'ArrowUp')
                            }}>&#9650;</div>

                        <input
                            type='text' value={hours}
                            placeholder='00'
                            maxLength={2}
                            title='You can use arrows Up and Down'
                            onFocus={() => setIsEdit(true)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                handleChange('hours', event.currentTarget.value)
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                onPressDown('hours', event.code)
                            }}
                            onBlur={() => endEdit()}
                        />
                        <div className='arrow'
                            onClick={() => {
                                onPressDown('hours', 'ArrowDown')
                            }}>&#9660;</div>

                    </div>

                    <div className={isEdit ? 'input editMode' : 'input'}>
                        <div className='arrow'
                            onClick={() => {
                                setIsEdit(true)
                                onPressDown('minutes', 'ArrowUp')
                            }}>&#9650;</div>
                        <input
                            maxLength={2}
                            type='text' value={minutes}
                            title='You can use arrows Up and Down'
                            placeholder='00'
                            onFocus={() => setIsEdit(true)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                handleChange('minutes', event.currentTarget.value)
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                onPressDown('minutes', event.code)
                            }}
                            onBlur={() => endEdit()}
                        />
                        <div className='arrow'
                            onClick={() => {
                                onPressDown('minutes', 'ArrowDown')
                            }}>&#9660;</div>
                    </div>

                    <div className={isEdit ? 'input editMode' : 'input'}>
                        <div className='arrow'
                            onClick={() => {
                                onPressDown('seconds', 'ArrowUp')
                            }}>&#9650;</div>
                        <input
                            maxLength={2}
                            type='text' value={seconds}
                            placeholder='00'
                            onFocus={() => setIsEdit(true)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                handleChange('seconds', event.currentTarget.value)
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                onPressDown('seconds', event.code)
                            }}
                            onBlur={() => endEdit()}
                        />
                        <div className='arrow'
                            onClick={() => {
                                onPressDown('seconds', 'ArrowDown')
                            }}>&#9660;</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Timepicker;