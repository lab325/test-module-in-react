import React, { Component } from 'react';
import ProjectModule from '../../../dataModule/projectModule';

import ViewForm from '../../../formComponents/viewForm';

class ProjectViewForm extends Component {
    constructor(props) {
        super(props);
        this.module = new ProjectModule();
        this.module._viewForm = [
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
        this.state = {
            form_data: this.props.form,
        }
    }

    render() {
        let { form_data } = this.state;
        return (
            <ViewForm form={form_data} module={this.module} />
        )
    }
}

export default ProjectViewForm;