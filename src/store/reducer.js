/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:12:25
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:36:28
 */
import { combineReducers } from 'redux-immutable';
import { reducer as dataModule } from '../dataModule/store'

const reducer = combineReducers({
    dataModule: dataModule,
});

export default reducer;