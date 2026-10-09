import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/config/site";

const schema = z.object({
  parentName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(""),
  studentName: z.string().trim().max(100).optional().default(""),
  grade: z.string().trim().max(20).optional().default(""),
  intent: z.enum(["apply", "question"]).default("question"),
  tier: z.string().trim().max(20).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
  company: z.string().optional(), // honeypot: real visitors never fill this
});

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not defined in environment variables.");
    return Response.json({ error: "Email service misconfigured" }, { status: 500 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please check the form fields." }, { status: 400 });
  }
  const d = parsed.data;
  if (d.company) return Response.json({ status: "sent" }); // bot: pretend success

  const label = d.intent === "apply" ? "Application" : "Question";
  // ponytail: plain-text body, no HTML template, so user input can't inject markup.
  const text = [
    `Type: ${label}`,
    `Parent/Guardian: ${d.parentName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "-"}`,
    `Student: ${d.studentName || "-"}`,
    `Grade: ${d.grade || "-"}`,
    `Programme: ${site.tiers.find((t) => t.id === d.tier)?.name ?? "Not sure yet"}`,
    "",
    d.message || "(no message)",
  ].join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    // Same Resend account as bespokeapps.co.za. Set RESEND_FROM once the domain is verified.
    from: process.env.RESEND_FROM ?? "Bespoke Academy <onboarding@resend.dev>",
    to: [site.email],
    replyTo: d.email,
    subject: `[Academy ${label}] ${d.parentName}`,
    text,
  });

  if (error) {
    console.error("Contact email failure:", error);
    return Response.json({ error: "Could not send your message." }, { status: 502 });
  }
  return Response.json({ status: "sent", id: data?.id });
}
