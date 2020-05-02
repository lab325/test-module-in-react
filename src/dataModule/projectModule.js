/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:19:46
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-02 09:36:25
 */

/*
注意，此处没有使用 connect，因为在使用 connet 进行包裹后，
组件变为 function，而不是 class，无法进行继承
*/
import axios from 'axios';
import {
    projectListUrl,
} from './UrlList';
import { actionCreators } from './store';
import store from '../store'

class ProjectModule {
    constructor() {
        this._dataStructure = {
            projectID: '',
            name: '',
            code: '',
            proposal_code: '',
            contract_code: '',
            customer: '',
            budget: 0.0,
            createBy: '',
            createDate: '',
            status: 0
        };

        this._viewForm = [
            ['name', 'str', '项目名称'],
            ['code', 'str', '代码'],
            ['proposal_code', 'str', '立项号'],
            ['contract_code', 'str', '合同编号'],
            ['customer', 'str', '客户单位'],
            ['budget', 'float', '预算金额', '￥'],
            ['createBy', 'str', '创建人'],
            // 注意，此处的日期最终是 bigint 数据类型，而非 date
            ['createDate', 'date', '创建日期'],
        ];

        this._editForm = [
            ['name', 'str', '项目名称'],
            ['proposal_code', 'str', '立项号'],
            ['contract_code', 'str', '合同编号'],
            ['customer', 'str', '客户单位'],
            ['budget', 'float', '预算金额', '￥'],
        ];
    }

    _add(whetherSave = false) {
        let projectList = store.getState().get('dataModule').get('projectList').toJS();
        let newProject = this._dataStructure;
        // 此处直接使用的是原始数据结构，未作变更
        projectList.push(newProject);

        if (whetherSave) {
            const random = Math.random().toString().split('.')[1];
            axios.post(projectListUrl + `?random=${random}`, {
                newProject: newProject,
            })
                .then(function (response) {
                    // let data = response.data.project_list;
                    // store.dispatch(actionCreators.dispatchSetProjectModule(data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        // 考虑到此处是直接在前端上新增的，可能需要放在 then 中
        store.dispatch(actionCreators.dispatchSetProjectModule(projectList));
    }

    _get() {
        const random = Math.random().toString().split('.')[1];
        axios.get(projectListUrl + `?random=${random}`)
            .then(function (response) {
                let data = response.data.project_list;

                // 当 store 中已经有部分数据时，不可直接覆盖原有数据
                // 使用 concat 将数据合并到原数据中
                const projectList = store.getState().get('dataModule').get('projectList').toJS();
                if (projectList.length !== 0) {
                    data = data.concat(projectList);
                }

                // 较为合理的是在 then 中设置，而不是在此处
                store.dispatch(actionCreators.dispatchSetProjectModule(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _put(updatedProject, index) {
        let projectList = store.getState().get('dataModule').get('projectList').toJS();
        projectList[index] = updatedProject;
        store.dispatch(actionCreators.dispatchSetProjectModule(projectList));
    }
}

export default ProjectModule;