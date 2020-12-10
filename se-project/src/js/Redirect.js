import React from "react";
import queryString from 'query-string';
import { FlexboxGrid, Message } from 'rsuite'
import { linkGithub } from './api/userAPI';


function countDown(that) {
    var i = setInterval(function () {

        if (that.state.secondsRemaining > 0) {
            that.setState({ secondsRemaining: that.state.secondsRemaining - 1 });
        } else {
            clearInterval(i);
            window.close()
        }
    }, 1000);
}


class Redirect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: 5,
            type: "info",
            title: "請稍後",
            description: ""
        };
    }



    componentDidMount() {
        const { location: { search } } = this.props;
        const values = queryString.parse(search);
        console.log(values)

        var that = this

        if ("code" in values) {

            linkGithub({
                code: values.code
            }).then(response => {

                countDown(that);
                console.log(response.data)
                that.setState({ type: "success", title: "成功" })


            }).catch(err => {
                console.log(err)
                countDown(that);
                that.setState({ type: "error", title: "失敗" })
            })
        } else if ("error_description" in values) {
            that.setState({ type: "error", title: "已取消操作" })
            countDown(that);
        }

    }

    render() {

        return (

            <FlexboxGrid justify="space-around" align="middle" style={{ height: "100%", padding: "7%" }}>
                <FlexboxGrid.Item >
                    <Message
                        showIcon
                        type={this.state.type}
                        title={this.state.title}
                        description={<p>Github 連結{this.state.title}
                            <br /> 將在 {this.state.secondsRemaining} 秒內關閉</p>}
                    />
                </FlexboxGrid.Item>

            </FlexboxGrid>

        )
    }
}
export default Redirect;