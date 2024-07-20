import type { RequestHandler } from "@sveltejs/kit";

const parserHtml = "https://www.fflogs.com/desktop-client/parser";
const parserRegex =
  /(https:\/\/assets.rpglogs.com\/js\/log-parsers\/parser-ff\.[a-f0-9]+\.js)/;
const ua = "malefic/0.0.1 (+https://github.com/NotNite/malefic)";

let parser: string | null = null;

async function get() {
  console.log("Fetching parser");
  const resp = await fetch(parserHtml, {
    headers: {
      "User-Agent": ua
    }
  });
  if (!resp.ok) throw new Error("Failed to fetch FF Logs parser site");

  const parserUrl = parserRegex.exec(await resp.text())?.[1];
  if (!parserUrl) throw new Error("Failed to find parser URL");
  console.log("Got parser URL", parserUrl);

  const parserResp = await fetch(parserUrl, {
    headers: {
      "User-Agent": ua
    }
  });
  if (!parserResp.ok) throw new Error("Failed to fetch FF Logs parser script");

  parser = await parserResp.text();
}

export const GET: RequestHandler = async () => {
  try {
    if (!parser) await get();
    return new Response(parser, {
      headers: {
        "Content-Type": "application/javascript"
      }
    });
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};
