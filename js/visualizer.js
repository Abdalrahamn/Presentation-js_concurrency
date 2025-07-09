// Clean, stable event loop visualizer

// Event Loop Visualizer
function startEventLoopVisualization() {
  try {
    clearVisualization();

    // Add initial message
    addToQueue("visualCallStack", "🚀 Starting visualization...");

    setTimeout(() => {
      simulateEventLoop();
    }, 500);
  } catch (error) {
    console.error("Error starting visualization:", error);
  }
}

function simulateEventLoop() {
  try {
    // Clear all queues
    clearVisualization();

    // Step 1: Add synchronous code to call stack
    addToQueue("visualCallStack", "main()");

    setTimeout(() => {
      // Step 2: Add setTimeout to macrotask queue
      addToQueue("visualTaskQueue", "setTimeout(callback, 0)");

      setTimeout(() => {
        // Step 3: Add Promise to microtask queue
        addToQueue("visualMicrotaskQueue", "Promise.resolve().then()");

        setTimeout(() => {
          // Step 4: Execute microtask first
          moveFromQueue(
            "visualMicrotaskQueue",
            "visualCallStack",
            "Promise callback"
          );

          setTimeout(() => {
            // Step 5: Remove microtask from call stack
            removeFromQueue("visualCallStack");

            setTimeout(() => {
              // Step 6: Execute macrotask
              moveFromQueue(
                "visualTaskQueue",
                "visualCallStack",
                "setTimeout callback"
              );

              setTimeout(() => {
                // Step 7: Remove macrotask from call stack
                removeFromQueue("visualCallStack");

                setTimeout(() => {
                  // Step 8: Remove main from call stack
                  removeFromQueue("visualCallStack");

                  setTimeout(() => {
                    // Show completion message
                    addToQueue("visualCallStack", "✅ Visualization complete!");

                    setTimeout(() => {
                      clearVisualization();
                    }, 2000);
                  }, 500);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  } catch (error) {
    console.error("Error in event loop simulation:", error);
  }
}

function addToQueue(queueId, text) {
  try {
    const queue = document.getElementById(queueId);
    if (!queue) {
      console.warn(`Queue element not found: ${queueId}`);
      return;
    }

    const item = document.createElement("div");
    item.className = "queue-item";
    item.textContent = text;
    item.style.opacity = "0";
    item.style.transform = "scale(0.8)";

    queue.appendChild(item);

    // Animate in
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "scale(1)";
      item.style.transition = "all 0.3s ease";
    }, 10);
  } catch (error) {
    console.error("Error adding to queue:", error);
  }
}

function removeFromQueue(queueId) {
  try {
    const queue = document.getElementById(queueId);
    if (!queue) {
      console.warn(`Queue element not found: ${queueId}`);
      return;
    }

    const items = queue.querySelectorAll(".queue-item");
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      lastItem.style.opacity = "0";
      lastItem.style.transform = "scale(0.8)";
      lastItem.style.transition = "all 0.3s ease";

      setTimeout(() => {
        if (lastItem.parentNode) {
          lastItem.parentNode.removeChild(lastItem);
        }
      }, 300);
    }
  } catch (error) {
    console.error("Error removing from queue:", error);
  }
}

function moveFromQueue(fromQueueId, toQueueId, text) {
  try {
    removeFromQueue(fromQueueId);

    setTimeout(() => {
      addToQueue(toQueueId, text);
    }, 150);
  } catch (error) {
    console.error("Error moving between queues:", error);
  }
}

function clearVisualization() {
  try {
    const queues = [
      "visualCallStack",
      "visualTaskQueue",
      "visualMicrotaskQueue",
    ];

    queues.forEach((queueId) => {
      const queue = document.getElementById(queueId);
      if (queue) {
        queue.innerHTML = "";
      }
    });
  } catch (error) {
    console.error("Error clearing visualization:", error);
  }
}

function resetVisualization() {
  try {
    clearVisualization();

    // Add helpful messages
    addToQueue("visualCallStack", "Call Stack (LIFO)");
    addToQueue("visualTaskQueue", "Macrotask Queue");
    addToQueue("visualMicrotaskQueue", "Microtask Queue");

    setTimeout(() => {
      clearVisualization();
    }, 2000);
  } catch (error) {
    console.error("Error resetting visualization:", error);
  }
}

// Simple queue visualizer for other demos
function visualizeQueue(queueId, items) {
  try {
    const queue = document.getElementById(queueId);
    if (!queue) {
      console.warn(`Queue element not found: ${queueId}`);
      return;
    }

    queue.innerHTML = "";

    items.forEach((item, index) => {
      setTimeout(() => {
        addToQueue(queueId, item);
      }, index * 200);
    });
  } catch (error) {
    console.error("Error visualizing queue:", error);
  }
}

// Export functions for global use
window.startEventLoopVisualization = startEventLoopVisualization;
window.resetVisualization = resetVisualization;
window.visualizeQueue = visualizeQueue;

console.log("🎨 Visualizer loaded successfully!");
