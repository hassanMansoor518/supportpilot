import connectDb from "./src/lib/db"; (async () => { try { await connectDb(); console.log("Success!"); process.exit(0); } catch(e) { console.error(e); process.exit(1); } })();
