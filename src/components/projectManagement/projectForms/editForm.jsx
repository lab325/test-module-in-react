import React, { Component } from 'react';
import ProjectModule from '../../../dataModule/projectModule';

import EditForm from '../../../formComponents/editForm';

class ProjectEditForm extends Component {
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

        this.state = {
            form_data: this.props.form,
        }
    }

    submitFunction() {
        alert("editForm 提交事件");
    }

    render() {
        let { form_data } = this.state;

        return (
            <EditForm form={form_data} module={this.module} submitFunction={this.submitFunction} />
        )
    }
}

export default ProjectEditForm;