import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

import ProjectModule from '../../dataModule/projectModule';
import EditForm from './publicComponents/editForm';
import ViewForm from './publicComponents/viewForm';

import './style.less';

class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.ProjectModule = new ProjectModule();
        this.state = {
        }
    }

    componentDidMount() {
        this.ProjectModule._get();
    }

    render() {
        const {
            projectList,
        } = this.props;

        if (projectList.length === 0) {
            return null;
        };

        return (
            <div>
                <div className="main-left"></div>
                <div className="main-right">
                    <EditForm form={projectList[0]} module={this.ProjectModule} />
                    <ViewForm form={projectList[0]} module={this.ProjectModule} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectList: state.get('dataModule').get('projectList').toJS(),
    }
}

export default connect(mapStateToProps, null)(ProjectManagement);
