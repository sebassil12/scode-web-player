// Show a browser notification
export async function showNotification() {
  try {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification("Timer finished", {
        body: "Countdown reached 00:00:00",
      });
    } else if (Notification.permission !== "denied") {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        new Notification("Timer finished", {
          body: "Countdown reached 00:00:00",
        });
      }
    }
  } catch (e) {
    console.error("Failed to show notification", e);
  }
}
