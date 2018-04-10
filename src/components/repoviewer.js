import React from 'react';
import Service from '../service';
import RepoInfo from './repoinfo';
import SimpleTextInputField from './simpletextinputfield';

export default class RepoViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repoName: '',
            repo: null,
            commits: null
        };
        this.searchTimeout = null;
        this.onRepoNameChange = this.onRepoNameChange.bind(this);
    }

    onRepoNameChange(repoName) {
        if (this.searchTimeout != null) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }

        this.setState({
            repo: null
        });

        this.searchTimeout = setTimeout(() => {
            let service = new Service();
            service.getRepo(repoName)
                .then((repo) => {
                    this.setState({
                        repo: repo
                    });
                    return service.getCommits(repo.full_name);
                })
                .then((commits) => {
                    this.setState({
                        commits: commits
                    });
                })
                .catch((err) => {
                    console.error(err.message);
                    this.setState({
                        repo: null
                    });
                })
                .finally(() => {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = null;
                });
        }, 3000);
    }

    render() {
        const repo = this.state.repo;
        const commits = this.state.commits;

        return (
            <div className="repo-viewer">
                <SimpleTextInputField label="Repository name: " onChange={this.onRepoNameChange}/>
                <RepoInfo repo={repo} commits={commits} />
            </div>
        );
    }
}