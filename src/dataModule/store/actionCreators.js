/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:28:48
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:35:31
 */

import * as constants from './constants';
import { fromJS } from 'immutable';

export const dispatchSetProjectModule = (data) => ({
    type: constants.ProjectList,
    data: fromJS(data),
});