import { dataUrltoBlob } from "./utils/data-urls";

export default defineBackground(() => {
  // browser.runtime.onMessage.addListener(async (message, sender) => {

  //   if (message.type === "CAPTURE_SCREENSHOT") {
  //     try {
  //       const dataUrl = await browser.tabs.captureVisibleTab();
  //       await downloadImage(dataUrl);
  //       return { success: true };
  //     } catch (error: any) {
  //       console.error(
  //         "Cannot capture screenshot of current tab",
  //         sender,
  //         error
  //       );
  //       return { success: false, error: error?.message };
  //     }
  //   }
  // });

  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "capture-screenshot",
      title: "Capture Screenshot & Download",
      contexts: ["all"], // or ['page', 'selection', ...] to be more specific
    });
  });

  // Listen for context menu clicks
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "capture-screenshot") {
      try {
        const windowId = tab?.windowId as number;
        const dataUrl = await browser.tabs.captureVisibleTab(windowId);
        await downloadImage(dataUrl); // Your screenshot/save function
      } catch (err) {
        console.error("Failed to capture:", err);
      }
    }
  });
});

async function downloadImage(dataUrl: string): Promise<void> {
  const filename = `Screenshot-${new Date()
    .toISOString()
    .replaceAll(":", "-")}.png`;
  console.log(`Downloading image: ${filename}`, { dataUrl });

  if (import.meta.env.MANIFEST_VERSION === 3) {
    await browser.downloads.download({
      url: dataUrl,
      filename,
    });
  } else {
    //using 'createObjectURL' for MV2
    const blob = dataUrltoBlob(dataUrl);
    const objectUrl = URL.createObjectURL(blob);
    await browser.downloads.download({
      url: objectUrl,
      filename,
    });
  }
}
