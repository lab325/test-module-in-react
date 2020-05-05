/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:19:46
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 16:59:30
 */

/*
注意，此处没有使用 connect，因为在使用 connet 进行包裹后，
组件变为 function，而不是 class，无法进行继承
*/

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
    }
}

export default ProjectModule;