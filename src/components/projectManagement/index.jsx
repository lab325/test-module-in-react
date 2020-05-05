import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

import { dispatchProjectList } from './store/actionCreators';
import { dispatchSetDataModule } from '../../dataModule/store/actionCreators';
import ProjectModule from '../../dataModule/projectModule';
import EditForm from './publicComponents/editForm';
import ViewForm from './publicComponents/viewForm';

import './style.less';
import store from '../../store';

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

    componentDidUpdate() {
        /**
         * 在调用 _get() 获取到数据后，现获取数据，并将 dataModule 内对应的数据归零；
         * 在对应数据长度大于零的情况下，更新 UI 的 store；
         */
        let { projectList, project } = this.props;
        projectList = projectList.toJS();
        project = project.toJS();

        if (project.length !== 0) {
            store.dispatch(dispatchSetDataModule([], this.ProjectModule._moduleName))
            store.dispatch(dispatchProjectList(projectList.concat(project)))
        }
    }

    render() {
        let {
            projectList,
        } = this.props;
        projectList = projectList.toJS()

        if (projectList.length === 0) return null;

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
        project: state.get('dataModule').get('project'),
        projectList: state.get('projectManagement').get('projectList'),
    }
}

export default connect(mapStateToProps, null)(ProjectManagement);
