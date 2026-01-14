import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: false, error: "Missing webhook env" }, { status: 500 });

  const { date, time1, time2, comment } = (await req.json()) as {
    date: string;        // YYYY-MM-DD
    time1: string;       // HH:MM
    time2?: string | ""; // HH:MM or empty
    comment?: string;
  };

  if (!date || !time1) {
    return NextResponse.json({ ok: false, error: "Missing date/time1" }, { status: 400 });
  }

  // "14/1"
  const [, mm, dd] = date.split("-"); // YYYY-MM-DD
  const dateLine = `${Number(dd)}/${Number(mm)}`;

  // "01:50" or "01:50-04:34"
  const timeLine = time2?.trim() ? `${time1}-${time2.trim()}` : time1;

  const title = "⚠️ strömavbrott ⚠️";
  const commentLine = comment?.trim() ? `${comment.trim()}` : "";

  const content = [title, timeLine, dateLine, commentLine].filter(Boolean).join("\n");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) return NextResponse.json({ ok: false, error: await res.text() }, { status: 500 });

  return NextResponse.json({ ok: true });
}
