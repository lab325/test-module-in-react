/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:28:48
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 10:08:03
 */

import * as constants from './constants';
import { fromJS } from 'immutable';

export const dispatchSetDataModule = (data, key) => ({
    type: constants.DataModule,
    data: fromJS(data),
    key: key,
});