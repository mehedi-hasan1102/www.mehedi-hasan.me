import GitHubActivity from '../components/GitHubActivity';

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
          Dashboard
        </h1>
        <p className="text-lg mb-12" style={{ color: 'var(--text-secondary)' }}>
          Track my development activity and contributions.
        </p>
      </div>
      
      <GitHubActivity />
    </div>
  );
}
