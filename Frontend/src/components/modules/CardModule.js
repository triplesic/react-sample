import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CardModule extends React.Component {
    render() {
        return (
            <Card style={this.props.cardStyle}>
                <CardHeader
                    avatar={this.props.avatar}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    actAsExpander={false}
                    showExpandableButton={false}
                    titleStyle={{ fontSize: '1.5rem' }}
                    subtitleStyle={{ fontSize: '1.2rem' }}
                />
                <CardActions>
                    {this.props.redirect ? (
                        <Link to={this.props.redirect}>
                            <RaisedButton
                                primary={true}
                                label={this.props.buttonLabel ? this.props.buttonLabel : 'open'}
                                style={{ 'width': '100%' }}
                                onClick={this.props.onClick}
                                disabled={this.props.disabled} />
                        </Link>
                    ) : (
                            <RaisedButton
                                primary={true}
                                label={this.props.buttonLabel ? this.props.buttonLabel : 'open'}
                                style={{ 'width': '100%' }}
                                onClick={this.props.onClick}
                                disabled={this.props.disabled} />
                        )}
                </CardActions>
            </Card>
        )
    }
}

CardModule.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    avatar: PropTypes.string,
    cardStyle: PropTypes.object,
    buttonLabel: PropTypes.string,
    redirect: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}