const conf = {
  /* TMDB Token and API Key */
  tmdbToken: String(import.meta.env.VITE_TMDB_TOKEN),
  tmdbAPIKey: String(import.meta.env.VITE_TMDB_API_KEY),
  serverURL: String(import.meta.env.VITE.VITE_SERVER_URL),
};

export default conf;
