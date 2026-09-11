// Every visible string on the site. Edit here, nothing else needs to change.

export const person = {
  name: "Rindrit Telaku",
  first: "Rindrit",
  last: "Telaku",
  role: "Data & AI Engineer",
  statement: "Building data systems, pipelines and intelligent software.",
  email: "rindritelaku@gmail.com",
  github: "https://github.com/RindTel",
  linkedin: "https://linkedin.com/in/rindrittelaku",
  cv: "/RindritTelakuCV.pdf",
  location: "Pristina, Kosovo",
  timezone: "GMT+1",
};

export type PipelineNode = { id: string; label: string; col: number; row: number };
export type PipelineEdge = { from: string; to: string };
export type Pipeline = { nodes: PipelineNode[]; edges: PipelineEdge[]; rows: number; cols: number };

export type Project = {
  index: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  notes: { label: string; detail: string }[];
  stack: string[];
  github: string;
  demo: string;
  image: { src: string; width: number; height: number; alt: string };
  pipeline: Pipeline;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "foviq",
    name: "FovIQ",
    category: "ETL · Analytics",
    description:
      "Local ETL pipeline that turns a photo library into EXIF analytics. Drop a file into the watched folder and the pipeline extracts the metadata, models it with dbt on DuckDB, and rebuilds the dashboard and report on its own.",
    notes: [
      { label: "Idempotent", detail: "Files keyed by name and SHA-256; a processed-files ledger means nothing is loaded twice." },
      { label: "Resilient", detail: "Missing EXIF tags become NULL instead of errors; unreadable files are logged and skipped." },
      { label: "Safe writes", detail: "Ingestion and reporting hold separate DuckDB connections; dbt runs only after ingestion closes." },
    ],
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "Plotly", "watchdog", "Pillow"],
    github: "https://github.com/RindTel/FovIQ",
    demo: "/demos/foviq.html",
    image: { src: "/projects/foviq.png", width: 3200, height: 2000, alt: "FovIQ dashboard: shots by hour of day, a capture-location map and gear tables from the DuckDB warehouse" },
    pipeline: {
      rows: 1,
      cols: 5,
      nodes: [
        { id: "photos", label: "Photos", col: 0, row: 0 },
        { id: "exif", label: "EXIF extract", col: 1, row: 0 },
        { id: "duckdb", label: "DuckDB", col: 2, row: 0 },
        { id: "dbt", label: "dbt models", col: 3, row: 0 },
        { id: "app", label: "Streamlit", col: 4, row: 0 },
      ],
      edges: [
        { from: "photos", to: "exif" },
        { from: "exif", to: "duckdb" },
        { from: "duckdb", to: "dbt" },
        { from: "dbt", to: "app" },
      ],
    },
  },
  {
    index: "02",
    slug: "transit-lens",
    name: "Transit Lens",
    category: "Data · Transit",
    description:
      "Multi-city transit analytics from public GTFS feeds. Schedules for Helsinki, Zürich, Prague and Budapest are loaded into DuckDB, modeled with dbt, and served as a delay dashboard: worst routes, busiest stops and peak-delay hours per city.",
    notes: [
      { label: "Isolation", detail: "Every table carries a city key, because route and stop IDs collide across feeds." },
      { label: "Scale", detail: "The Zürich feed alone is 172 MB and 24 million stop events, processed on a laptop with no cloud." },
      { label: "Edge cases", detail: "After-midnight GTFS times past 24:00:00 are handled as seconds since midnight; malformed rows are logged, not fatal." },
    ],
    stack: ["Python", "DuckDB", "dbt", "Streamlit", "GTFS", "Pandas"],
    github: "https://github.com/RindTel/transit-lens",
    demo: "/demos/transit-lens.html",
    image: { src: "/projects/transit-lens.png", width: 3200, height: 2000, alt: "Transit Lens dashboard for Budapest: routes, stops and delay KPIs, delay by hour, most delayed routes and a map of the busiest stops" },
    pipeline: {
      rows: 2,
      cols: 5,
      nodes: [
        { id: "static", label: "GTFS static", col: 0, row: 0 },
        { id: "rt", label: "GTFS realtime", col: 0, row: 1 },
        { id: "ingest", label: "Ingest", col: 1, row: 0.5 },
        { id: "duckdb", label: "DuckDB", col: 2, row: 0.5 },
        { id: "dbt", label: "dbt models", col: 3, row: 0.5 },
        { id: "dash", label: "Dashboard", col: 4, row: 0.5 },
      ],
      edges: [
        { from: "static", to: "ingest" },
        { from: "rt", to: "ingest" },
        { from: "ingest", to: "duckdb" },
        { from: "duckdb", to: "dbt" },
        { from: "dbt", to: "dash" },
      ],
    },
  },
  {
    index: "03",
    slug: "rag",
    name: "RAG Knowledge System",
    category: "AI · Retrieval",
    description:
      "Retrieval augmented generation that runs entirely on one machine. PDF and text documents are chunked and embedded into a persistent FAISS index; Qwen 2.5 7B answers through Ollama, and every answer shows the chunks it was built from.",
    notes: [
      { label: "Private", detail: "No API keys and no external calls; documents, index and model all stay local." },
      { label: "Persistent", detail: "The vector index survives restarts and chat history is saved, so nothing is re-embedded needlessly." },
      { label: "Grounded", detail: "Responses stream in real time with their source chunks shown alongside, so answers can be checked." },
    ],
    stack: ["Python", "LangChain", "FAISS", "Ollama", "Qwen 2.5", "Streamlit"],
    github: "https://github.com/RindTel/rag_terminal_1.0.0",
    demo: "/demos/rag.html",
    image: { src: "/projects/rag.png", width: 3200, height: 2000, alt: "RAG Knowledge System answering a question from an indexed document, with the cited source chunk expanded below" },
    pipeline: {
      rows: 2,
      cols: 5,
      nodes: [
        { id: "docs", label: "Documents", col: 0, row: 0 },
        { id: "chunk", label: "Chunk", col: 1, row: 0 },
        { id: "embed", label: "Embed", col: 2, row: 0 },
        { id: "faiss", label: "FAISS index", col: 3, row: 0 },
        { id: "query", label: "Query", col: 0, row: 1 },
        { id: "retrieve", label: "Retrieve", col: 2, row: 1 },
        { id: "llm", label: "Qwen 2.5", col: 3, row: 1 },
        { id: "answer", label: "Cited answer", col: 4, row: 1 },
      ],
      edges: [
        { from: "docs", to: "chunk" },
        { from: "chunk", to: "embed" },
        { from: "embed", to: "faiss" },
        { from: "query", to: "retrieve" },
        { from: "faiss", to: "retrieve" },
        { from: "retrieve", to: "llm" },
        { from: "llm", to: "answer" },
      ],
    },
  },
];

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  mode: string;
  current: boolean;
  summary: string;
  highlights: { label: string; detail: string }[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "ProQu",
    role: "Junior Ingestion Specialist",
    start: "May 2026",
    end: "Present",
    mode: "Remote",
    current: true,
    summary:
      "Production ingestion on AWS: data from several upstream sources normalized into one pipeline, with a batch path, a streaming path, and automated checks in front of every downstream consumer.",
    highlights: [
      { label: "Batch ETL", detail: "AWS Glue jobs that land normalized data in S3 and expose it through Athena." },
      { label: "Streaming", detail: "A streaming pipeline that turns incoming events into real-time notifications." },
      { label: "Data quality", detail: "Automated tests that reject malformed or inconsistent records before anyone downstream sees them." },
      { label: "Ownership", detail: "Designed and maintained the pipelines in production, not only built them." },
    ],
    stack: ["Python", "AWS Glue", "S3", "Athena", "SQL", "ETL"],
  },
];

export const about = {
  intro:
    "Data & AI engineer in Pristina, Kosovo. I build data pipelines end to end and care most about the parts that decide whether they survive production.",
  facts: [
    { label: "Based in", value: "Pristina, Kosovo (GMT+1)" },
    { label: "Currently", value: "Building production ingestion pipelines at ProQu" },
    { label: "Open to", value: "Remote data engineering and AI engineering roles" },
  ],
  strengths: [
    { label: "Pipeline architecture", detail: "Ingest, stage, mart, serve. Idempotent loads keyed by content hash, isolated connections, every stage logged." },
    { label: "Retrieval systems", detail: "Local RAG end to end: chunking, embeddings, a persistent FAISS index and answers that cite their chunks." },
    { label: "Data modeling", detail: "dbt on DuckDB: staging views, analytical marts, macros for messy source formats, tenant keys where IDs collide." },
  ],
  stack: ["Python", "TypeScript", "SQL", "dbt", "DuckDB", "Docker"],
  interests: ["Retrieval augmented generation", "Distributed systems", "Analytics engineering", "Data modeling"],
};

export const contact = {
  heading: "Hiring for data or AI engineering, remote or in Pristina? Send a note about what you are building and what the data looks like. I reply within a day.",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];
