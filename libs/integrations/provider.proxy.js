const GitHubProvider = require('./providers/github.provider');
const GitlabProvider = require('./providers/gitlab.provider');
const LinkedinProvider = require('./providers/linkedin.provider');

const ProxyProvider = (provider) => {
  switch (provider) {
    case 'github':
      return GitHubProvider;
    case 'gitlab':
      return GitlabProvider;
    case 'linkedin':
      return LinkedinProvider;
    default:
      return null;
  }
};

export default ProxyProvider;
