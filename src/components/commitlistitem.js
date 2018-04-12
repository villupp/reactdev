import React from 'react';

export default class CommitListItem extends React.Component {
    render() {
        const commit = this.props.commit;

        return (
            <div className="commit-list">
                <h4>{commit.sha}</h4>
                <div>{commit.commit.author.name}</div>
                <div>{commit.commit.author.email}</div>
                <div>{commit.commit.message}</div>
            </div>
        );
    }
}