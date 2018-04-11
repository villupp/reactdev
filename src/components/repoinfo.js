import React from 'react';
import CommitList from './commitlist';

export default class RepoInfo extends React.Component {
    render() {
        const repo = this.props.repo;
        const commits = this.props.commits;

        if (repo != null) {
            return (
                <div className="repo-info">
                    <div>Name: {repo.name}</div>
                    <div>ID: {repo.id}</div>
                    <div>URL: <a href={repo.url}>{repo.url}</a></div>
                    <div>Description: {repo.description != null ? repo.description : ''}</div>
                    <hr/>
                    <CommitList commits={commits} />
                </div>
            );
        } else {
            return (
                <div>No repo given</div>
            );
        }
    }
}