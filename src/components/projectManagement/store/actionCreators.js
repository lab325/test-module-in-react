/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 11:34:49
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 14:45:12
 */

import * as constants from './constants';
import { fromJS } from 'immutable';

export const dispatchProjectList = (data) => ({
    type: constants.PROJECT_LIST,
    data: fromJS(data),
});