const highlights = [
  { label: "Documents", value: "0", detail: "Upload your first source" },
  { label: "Conversations", value: "0", detail: "Your questions will live here" },
  { label: "Sources cited", value: "—", detail: "Grounded answers, not guesses" },
];

function App() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">A</span>
          <span>Atlas Assist</span>
        </div>

        <nav aria-label="Primary navigation">
          <a className="nav-item active" href="#workspace">
            <span>✦</span>
            Workspace
          </a>
          <a className="nav-item" href="#documents">
            <span>▤</span>
            Documents
          </a>
          <a className="nav-item" href="#history">
            <span>◷</span>
            History
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <span>Local workspace</span>
        </div>
      </aside>

      <section className="content" id="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">AI BUSINESS ASSISTANT</p>
            <h1>Make sense of the work.</h1>
          </div>
          <button className="avatar" aria-label="Open account menu">
            MM
          </button>
        </header>

        <section className="hero-card">
          <div className="hero-copy">
            <span className="pill">Your private knowledge layer</span>
            <h2>Ask better questions of every document.</h2>
            <p>
              Upload policies, reports, and internal notes. Atlas will find the
              relevant context and show you where every answer came from.
            </p>
            <button className="primary-button">Upload a document <span>↗</span></button>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-core">✦</div>
            <span className="orbit-label label-one">Context</span>
            <span className="orbit-label label-two">Answers</span>
            <span className="orbit-label label-three">Sources</span>
          </div>
        </section>

        <section className="stats" aria-label="Workspace summary">
          {highlights.map((item) => (
            <article className="stat-card" key={item.label}>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </section>

        <section className="empty-state" id="documents">
          <div className="empty-icon">＋</div>
          <div>
            <p className="eyebrow">START HERE</p>
            <h3>Build your first source library</h3>
            <p className="muted">
              Add a PDF or text document to make this workspace useful. The
              processing pipeline will extract, chunk, and index it for chat.
            </p>
          </div>
          <button className="secondary-button">Choose a file</button>
        </section>
      </section>
    </main>
  );
}

export default App;
