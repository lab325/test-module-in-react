/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-05-04 21:27:31
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 15:08:00
 */

import store from '../store'
import axios from 'axios';

import { dispatchSetDataModule } from './store/actionCreators'

export default class PublicRequest {

    _add(newData = null, whetherSave = false) {
        let _moduleName = this._moduleName;
        let _dataStructure = this._dataStructure;

        // 在未传入新数据的情况下，直接新增原始数据结构
        if (newData !== null) _dataStructure = newData;

        if (whetherSave) {
            axios.post(`${_moduleName}.json`, {
                [_moduleName]: _dataStructure,
            })
                .then(function (response) {
                    // let data = response.data.project_list;
                    // store.dispatch(actionCreators.dispatchSetProjectModule(data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    _get(start = 0, step = 50) {
        /**
         * start 是获取数据起始位，step 是步长，获取数据条数；
         * 在调用时，如不传入参数，则默认取 50 条；
         * 每次获取的数据直接覆盖之前的数据，其他数据的存储由各 UI 组件自行进行存储；
         * 可能需要 UI 组件在调用 _get() 时，清空原数组，用于判断是否获取成功；
         * 
         * 新数据覆盖旧数据；
         */

        let _moduleName = this._moduleName;
        const random = Math.random().toString().split('.')[1];

        let url = `${_moduleName}.json?start=${start.toString()}?step=${step.toString()}?random=${random}`;

        axios.get(url)
            .then(function (response) {
                let data = response.data.data;
                store.dispatch(dispatchSetDataModule(data, _moduleName));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _put(updatedProject, index) {
        let _moduleName = this._moduleName;
        let dataModule = store.getState().get('dataModule').get('dataModule').toJS();
        let dataList = dataModule[_moduleName]

        dataList[index] = updatedProject;
        store.dispatch(dispatchSetDataModule(dataModule));
    }

    _search(searchCondition, whetherSave = false) {
        /**
         * whetherSave 该判断条件在与后台进行对接时需要删除；
         * _search 搜索结果会直接存在 store 中；
         * 字段名是 _moduleName + Search；
         * 如 project 表，字段名就是 projectSearch；
         * 
         * 新数据直接覆盖旧数据；
         */
        let _moduleName = this._moduleName;

        if (whetherSave) {
            axios.post(`${_moduleName}.json`, {
                [`${_moduleName}Condition`]: searchCondition,
            })
                .then(function (response) {
                    let data = response.data.data;
                    store.dispatch(dispatchSetDataModule(data, `${_moduleName}Search`));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}