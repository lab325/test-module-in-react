import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

import ProjectModule from '../../dataModule/projectModule';
import EditForm from './projectForms/editForm';
import ViewForm from './projectForms/viewForm';
import ProjectTable from './projectTables/projectTable'
import EditFormExtends from './projectForms/editFormExtends';

import BoneViewForm from '../../publicComponents/boneViewForm';


class ProjectManagement extends Component {
    constructor(props) {
        super(props);
        this.ProjectModule = new ProjectModule();
        this.state = {}
    }

    componentDidMount() {
        this.ProjectModule._get();
    }

    // componentDidUpdate() {
    //     /**
    //      * 在调用 _get() 获取到数据后，现获取数据，并将 dataModule 内对应的数据归零；
    //      * 在对应数据长度大于零的情况下，更新 UI 的 store；
    //      */
    //     let { projectList, project } = this.props;
    //     projectList = projectList.toJS();
    //     project = project.toJS();

    //     if (project.length !== 0) {
    //         store.dispatch(dispatchSetDataModule([], this.ProjectModule._moduleName))
    //         store.dispatch(dispatchProjectList(projectList.concat(project)))
    //     }
    // }

    render() {
        let { project } = this.props;

        if (project === undefined) return null;
        project = project.toJS()

        return (
            <div>
                <div className="main-left"></div>
                <div className="main-right">
                    {/* <EditForm form={project[0]} />
                    <ViewForm form={project[0]} />
                    <EditFormExtends form={project[0]} />
                    <ProjectTable />
                    <BoneViewForm /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.get('dataModule').get('project'),
        // projectList: state.get('projectManagement').get('projectList'),
    }
}

export default connect(mapStateToProps, null)(ProjectManagement);
