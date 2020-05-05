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
        // dataModule: state.get('dataModule').get('dataModule').toJS(),
    }
}

export default connect(mapStateToProps, null)(Index);