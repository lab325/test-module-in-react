/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:28:33
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:28:34
 */
import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
    projectList: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.ProjectList:
            return state.set('projectList', action.data);
        default:
            return state;
    }
}
