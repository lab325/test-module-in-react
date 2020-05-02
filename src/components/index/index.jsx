import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProjectManagement from '../../components/projectManagement'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <ProjectManagement />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectList: state.get('dataModule').get('projectList').toJS(),
    }
}

export default connect(mapStateToProps, null)(Index);