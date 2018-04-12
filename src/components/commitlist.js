import React from 'react';
import CommitListItem from './commitlistitem';

export default class CommitList extends React.Component {
    render() {
        let commits = [];

        if (this.props.commits != null) {
            commits = this.props.commits.map((commit) => {
                return (<CommitListItem key={commit.sha} commit={commit} />);
            });
        }

        if (commits.length > 0) {
            return (
                <div className="commit-list">
                    {commits}
                </div>
            );
        } else {
            return (
                <div>No commits.</div>
            );
        }
    }
}