import React, { Component } from 'react';

import Table from '../../../publicComponents/table';
import ProjectModule from '../../../dataModule/projectModule';

const header = [{
    title: '项目名称',
    dataIndex: 'name'
}, {
    title: '项目代码',
    dataIndex: 'code'
}, {
    title: '立项号',
    dataIndex: 'proposal_code'
}, {
    title: '合同编号',
    dataIndex: 'contract_code'
}, {
    title: '客户单位',
    dataIndex: 'customer'
}, {
    title: '预算金额',
    dataIndex: 'budget'
}, {
    title: '创建人',
    dataIndex: 'createBy'
}, {
    title: '创建日期',
    dataIndex: 'createDate'
}, {
    title: '状态',
    dataIndex: 'status'
}]

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.myModule = new ProjectModule();
    }

    render() {
        return (
            <Table myModule={this.myModule} header={header} totalNum={60} />
        )
    }
}


export default ProjectManagement;