/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:19:46
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-04 21:40:25
 */

/*
注意，此处没有使用 connect，因为在使用 connet 进行包裹后，
组件变为 function，而不是 class，无法进行继承
*/
import axios from 'axios';
import { actionCreators } from './store';
import store from '../store'

import PublicRequest from './publicRequest';

class ProjectModule extends PublicRequest {
    constructor(props) {
        super(props);
        this._moduleName = 'project';
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
}

export default ProjectModule;