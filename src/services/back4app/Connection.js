import Parse from "parse/dist/parse.min.js";

export function initializeParse({
  hostUrl,
  appId,
  javascriptKey,
  masterKey,
} = {}) {
  appId ??= import.meta.env.VITE_PARSE_APPLICATION_ID;
  javascriptKey ??= import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;
  hostUrl ??= import.meta.env.VITE_PARSE_HOST_URL;
  masterKey ??= import.meta.env.VITE_PARSE_MASTER_KEY;

  console.log("Initializing Parse...");
  Parse.initialize(appId, javascriptKey);
  Parse.serverURL = hostUrl;
  Parse.masterKey = masterKey;
  console.log("Parse initialized.");
  return Parse;
}
