import { fieldValues, firestore } from "./config.js";

export const triggerMail = async ({
  summary,
  recordingUrl,
  userEmail,
  userId,
  recordingId,
}) => {
  await firestore.collection("mails").add({
    to: userEmail,
    subject: "Your Meeting Summary is Ready!",
    body: "Your Meeting Details are as follows: \n\n",
    attachments: {
      audioUrl: recordingUrl,
      createdAt: fieldValues.serverTimestamp(),
      summary: summary,
    },
    userId: userId,
    recordingId: recordingId,
  });
  console.log("📨 Mail document created for Zapier to pick up");
};
