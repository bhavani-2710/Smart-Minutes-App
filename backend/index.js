import express from "express";
import { processAudio } from "./processAudio.js";
import { triggerMail } from "./triggerZapierMail.js";
import { firestore } from "./config.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("API Working!");
});

app.post("/process-audio", async (req, res) => {
  const { cloudinaryUrl, firestoreId } = req.body;
  if (!cloudinaryUrl || !firestoreId)
    return res.status(400).json({ error: "Missing required data" });

  // Send response immediately
  res.status(202).json({ success: true, message: "Processing started" });

  // Then do processing asynchronously
  try {
    const { transcript, summary } = await processAudio(cloudinaryUrl);

    // 1. Update Firestore with transcript & summary
    await firestore.collection("recordings").doc(firestoreId).update({
      transcript: transcript,
      summary: summary,
      status: "done",
      updatedAt: new Date().toISOString(),
    });

    console.log("✅ Firestore updated");
  } catch (err) {
    console.error("❌ Background processing failed:", err);
    await firestore.collection("recordings").doc(firestoreId).update({
      status: "failed",
      updatedAt: new Date().toISOString(),
    });
  }
});

app.post("/send-email", async (req, res) => {
  const { recordingId } = req.body;
  try {
    // 1. Fetch recording data
    const recordingSnap = await firestore
      .collection("recordings")
      .doc(recordingId)
      .get();
    const recording = recordingSnap.data();
    const userId = recording.userId;
    const recordingUrl = recording.url;
    const summary = recording.summary;

    // 2. Fetch user data
    const userSnap = await firestore.collection("users").doc(userId).get();
    const user = userSnap.data();
    const userEmail = user.email;

    // 3. Create new document in `mails` collection
    await triggerMail({
      summary,
      recordingUrl,
      userEmail,
      userId,
      recordingId,
    });
    return res
      .status(200)
      .json({
        status: "success",
        message: "📨 Mail document created for Zapier to pick up",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: "failed", message: "Failed to send email."})
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
