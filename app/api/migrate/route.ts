import { runMigration } from "@/lib/migrate";

export async function POST() {
  try {
    await runMigration();
    return Response.json({ ok: true, message: "Migration completed" });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
