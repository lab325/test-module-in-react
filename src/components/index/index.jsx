import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectManagement from '../../components/projectManagement'
import BoneViewForm from '../../publicComponents/boneViewForm';
import BoneEditForm from '../../publicComponents/boneEditForm';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                {/* <ProjectManagement /> */}
                <BoneViewForm url={'test/'} params={{}}/>
                <BoneEditForm url={'test/'} submitUrl={'test/'} params={{}}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // dataModule: state.get('dataModule').get('dataModule').toJS(),
    }
}

export default connect(mapStateToProps, null)(Index);