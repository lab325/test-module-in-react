import ProjectModule from '../../../dataModule/projectModule';
import EditForm from '../../../formComponents/editForm';

class ProjectEditFormExtends extends EditForm {
    constructor(props) {
        super(props);
        this.module = new ProjectModule();
        // 定义编辑条目
        this.module._editForm = [
            ['name', 'str', '项目名称'],
            ['proposal_code', 'str', '立项号'],
            ['contract_code', 'str', '合同编号'],
            ['customer', 'str', '客户单位'],
            ['budget', 'float', '预算金额', '￥'],
        ];
    }

    submitFunction() {
        alert("editForm 提交事件");
    }
}

export default ProjectEditFormExtends;