/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:28:33
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-07 12:29:11
 */
import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.DataModule:
            return state.set(action.key, action.data);
        default:
            return state;
    }
}
