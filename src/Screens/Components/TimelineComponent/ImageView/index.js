import React, { Component } from 'react';
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data || {},
            date_format: this.props.date_format,
            time_foramt: this.props.time_format,
            archive : this.props.archive,
            loggedinUser : this.props.loggedinUser
        };
    }

  componentDidUpdate = (prevProps) => {
        if (prevProps.data !== this.props.data || prevProps.loggedinUser !== this.props.loggedinUser) {
            this.setState({   item: this.props.data, loggedinUser : this.props.loggedinUser})
        }
    }

    render() {
        var item = this.state.item;
        return (
            <div>
                {this.props.type==='mp4' ?
                    <video className="VideoPlay"   controls>
                        <source src={this.props.new_image} type="video/mp4" />
                    </video>
                    :
                    <iframe src={this.props.new_image} frameborder="0" allowtransparency="true" allowfullscreen></iframe>
                }
            </div>   
        )
    }
}

export default Index;