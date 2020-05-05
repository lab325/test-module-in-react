/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 11:35:06
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 14:45:53
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    projectList: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.PROJECT_LIST:
            return state.set('projectList', action.data);
        default:
            return state;
    }
}