import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT id, name, image_url, sound_url, sort_order FROM skins ORDER BY sort_order");
    return Response.json({ ok: true, data: rows });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
