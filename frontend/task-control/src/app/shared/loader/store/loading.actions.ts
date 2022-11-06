import { createAction } from '@ngrx/store';

export const startLoading = createAction('[Loading] Start Loading');
export const completeLoading = createAction('[Loading] Complete Loading');
