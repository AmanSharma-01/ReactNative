// @ts-ignore
import React from 'react';

export interface ICompleteData {
    id: string;
    area: string;
    booked: boolean;
    startTime: number;
    endTime: number;
}

export interface ICompleteDataContext {
    setCompleteData: Function;
    completeData: Array<ICompleteData>;
    getAllShiftsData: Function;
}

export const initialDataContext: ICompleteDataContext = {
    setCompleteData: () => {},
    completeData: [],
    getAllShiftsData: () => {},
};

export const CompleteDataContext = React.createContext(initialDataContext);