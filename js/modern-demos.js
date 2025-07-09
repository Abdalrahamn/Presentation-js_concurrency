// Modern Demos JavaScript - All Interactive Examples

// Global demo state
let demoTimers = [];
let demoIntervals = [];
let demoWorkers = [];

// Clean up function
function cleanupDemos() {
  // Clear all timers
  demoTimers.forEach((timer) => clearTimeout(timer));
  demoTimers = [];

  // Clear all intervals
  demoIntervals.forEach((interval) => clearInterval(interval));
  demoIntervals = [];

  // Terminate all workers
  demoWorkers.forEach((worker) => worker.terminate());
  demoWorkers = [];
}

// Event Loop Demo
function runEventLoopDemo() {
  const output = document.getElementById("eventLoopOutput");
  if (!output) return;

  clearOutput("eventLoopOutput");

  addToOutput("eventLoopOutput", "🚀 Starting Event Loop Demo...", "info");

  // Synchronous code
  addToOutput("eventLoopOutput", "1. Synchronous: Start", "success");

  // Macrotask (setTimeout)
  const timer1 = setTimeout(() => {
    addToOutput(
      "eventLoopOutput",
      "4. Macrotask: setTimeout executed",
      "warning"
    );
  }, 0);
  demoTimers.push(timer1);

  // Microtask (Promise)
  Promise.resolve().then(() => {
    addToOutput("eventLoopOutput", "3. Microtask: Promise resolved", "success");
  });

  // More synchronous code
  addToOutput("eventLoopOutput", "2. Synchronous: End", "success");

  // Explanation
  const timer2 = setTimeout(() => {
    addToOutput(
      "eventLoopOutput",
      "✅ Order: Sync → Microtasks → Macrotasks",
      "info"
    );
  }, 100);
  demoTimers.push(timer2);
}

// Execution Order Demo
function demonstrateExecutionOrder() {
  const output = document.getElementById("executionOutput");
  if (!output) return;

  clearOutput("executionOutput");

  addToOutput("executionOutput", "🔄 Predicting execution order...", "info");

  // First, show the prediction
  const timer1 = setTimeout(() => {
    addToOutput(
      "executionOutput",
      "🎯 Predicted order: 1-Sync, 2-Sync, 3-Micro, 4-Macro",
      "warning"
    );

    // Then show actual execution
    const timer2 = setTimeout(() => {
      addToOutput("executionOutput", "🚀 Actual execution:", "info");

      // The actual demo
      console.log("1 - Sync");
      addToOutput("executionOutput", "1 - Sync", "success");

      const timer3 = setTimeout(() => {
        console.log("4 - Macro");
        addToOutput("executionOutput", "4 - Macro", "warning");
      }, 0);
      demoTimers.push(timer3);

      Promise.resolve().then(() => {
        console.log("3 - Micro");
        addToOutput("executionOutput", "3 - Micro", "success");
      });

      console.log("2 - Sync");
      addToOutput("executionOutput", "2 - Sync", "success");

      const timer4 = setTimeout(() => {
        addToOutput(
          "executionOutput",
          "✅ Perfect! Prediction was correct!",
          "success"
        );
      }, 50);
      demoTimers.push(timer4);
    }, 1000);
    demoTimers.push(timer2);
  }, 500);
  demoTimers.push(timer1);
}

// setTimeout Demo
function demonstrateSetTimeout() {
  const output = document.getElementById("timerOutput");
  if (!output) return;

  clearOutput("timerOutput");

  addToOutput("timerOutput", "⏰ setTimeout Demo Starting...", "info");

  const startTime = Date.now();

  const timer1 = setTimeout(() => {
    const elapsed = Date.now() - startTime;
    addToOutput(
      "timerOutput",
      `⏱️ setTimeout(500ms) executed after ${elapsed}ms`,
      "success"
    );
  }, 500);
  demoTimers.push(timer1);

  const timer2 = setTimeout(() => {
    const elapsed = Date.now() - startTime;
    addToOutput(
      "timerOutput",
      `⏱️ setTimeout(1000ms) executed after ${elapsed}ms`,
      "success"
    );
  }, 1000);
  demoTimers.push(timer2);

  const timer3 = setTimeout(() => {
    const elapsed = Date.now() - startTime;
    addToOutput(
      "timerOutput",
      `⏱️ setTimeout(0ms) executed after ${elapsed}ms`,
      "warning"
    );
    addToOutput(
      "timerOutput",
      "📝 Note: setTimeout(0) has minimum 4ms delay!",
      "info"
    );
  }, 0);
  demoTimers.push(timer3);
}

// setTimeout(0) Test
function demonstrateZeroTimeout() {
  const output = document.getElementById("timerOutput");
  if (!output) return;

  clearOutput("timerOutput");

  addToOutput("timerOutput", "🧪 Testing setTimeout(0)...", "info");

  const startTime = performance.now();

  addToOutput("timerOutput", "Before setTimeout(0)", "success");

  const timer = setTimeout(() => {
    const elapsed = performance.now() - startTime;
    addToOutput(
      "timerOutput",
      `setTimeout(0) executed after ${elapsed.toFixed(2)}ms`,
      "warning"
    );
    addToOutput("timerOutput", "💡 Browser enforces minimum 4ms delay", "info");
  }, 0);
  demoTimers.push(timer);

  addToOutput("timerOutput", "After setTimeout(0)", "success");
}

// setInterval Demo
function demonstrateSetInterval() {
  const output = document.getElementById("timerOutput");
  if (!output) return;

  clearOutput("timerOutput");

  let counter = 0;
  addToOutput("timerOutput", "🔄 setInterval Demo (5 ticks)...", "info");

  const interval = setInterval(() => {
    counter++;
    addToOutput("timerOutput", `⏰ Interval tick ${counter}`, "success");

    if (counter >= 5) {
      clearInterval(interval);
      addToOutput("timerOutput", "✅ Interval completed!", "success");
    }
  }, 300);
  demoIntervals.push(interval);
}

// Promise States Demo
function demoPromiseStates() {
  const output = document.getElementById("promiseOutput");
  if (!output) return;

  clearOutput("promiseOutput");

  addToOutput("promiseOutput", "🤝 Promise States Demo...", "info");

  // Pending Promise
  const pendingPromise = new Promise((resolve) => {
    addToOutput(
      "promiseOutput",
      "⏳ Promise created - State: PENDING",
      "warning"
    );

    const timer = setTimeout(() => {
      resolve("Success!");
    }, 1000);
    demoTimers.push(timer);
  });

  // Fulfilled Promise
  pendingPromise.then((value) => {
    addToOutput(
      "promiseOutput",
      `✅ Promise resolved - State: FULFILLED - Value: ${value}`,
      "success"
    );
  });

  // Rejected Promise
  const timer = setTimeout(() => {
    const rejectedPromise = Promise.reject("Error occurred");

    rejectedPromise.catch((error) => {
      addToOutput(
        "promiseOutput",
        `❌ Promise rejected - State: REJECTED - Reason: ${error}`,
        "error"
      );
    });

    const timer2 = setTimeout(() => {
      addToOutput(
        "promiseOutput",
        "📝 Promises can only change state once!",
        "info"
      );
    }, 500);
    demoTimers.push(timer2);
  }, 1500);
  demoTimers.push(timer);
}

// Async/Await Demo
function demoAsyncAwait() {
  const output = document.getElementById("asyncOutput");
  if (!output) return;

  clearOutput("asyncOutput");

  addToOutput("asyncOutput", "🎭 async/await Demo...", "info");

  // Simulate async operation
  async function fetchData() {
    try {
      addToOutput("asyncOutput", "📡 Fetching data...", "info");

      // Simulate network delay
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 1000);
        demoTimers.push(timer);
      });

      addToOutput("asyncOutput", "✅ Data fetched successfully!", "success");

      // Simulate processing
      addToOutput("asyncOutput", "⚙️ Processing data...", "info");

      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 500);
        demoTimers.push(timer);
      });

      addToOutput("asyncOutput", "🎉 Processing complete!", "success");
    } catch (error) {
      addToOutput("asyncOutput", `❌ Error: ${error.message}`, "error");
    }
  }

  fetchData();
}

// Promise.all Demo
function demoPromiseAll() {
  const output = document.getElementById("promiseAllOutput");
  if (!output) return;

  clearOutput("promiseAllOutput");

  addToOutput("promiseAllOutput", "🎯 Promise.all Demo...", "info");

  // Create multiple promises with different delays
  const promise1 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput(
        "promiseAllOutput",
        "🚀 Fast promise resolved (500ms)",
        "success"
      );
      resolve("Fast");
    }, 500);
    demoTimers.push(timer);
  });

  const promise2 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput(
        "promiseAllOutput",
        "🚗 Medium promise resolved (1000ms)",
        "success"
      );
      resolve("Medium");
    }, 1000);
    demoTimers.push(timer);
  });

  const promise3 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput(
        "promiseAllOutput",
        "🐌 Slow promise resolved (1500ms)",
        "success"
      );
      resolve("Slow");
    }, 1500);
    demoTimers.push(timer);
  });

  addToOutput("promiseAllOutput", "⏳ Waiting for all promises...", "warning");

  Promise.all([promise1, promise2, promise3]).then((results) => {
    addToOutput(
      "promiseAllOutput",
      `✅ All promises resolved! Results: [${results.join(", ")}]`,
      "success"
    );
    addToOutput(
      "promiseAllOutput",
      "📝 Promise.all waits for ALL promises to complete",
      "info"
    );
  });
}

// Promise.race Demo
function demoPromiseRace() {
  const output = document.getElementById("promiseRaceOutput");
  if (!output) return;

  clearOutput("promiseRaceOutput");

  addToOutput(
    "promiseRaceOutput",
    "🏁 Promise.race Demo - Starting the race!",
    "info"
  );

  const promise1 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput("promiseRaceOutput", "🚀 Fast promise finished!", "success");
      resolve("Fast Promise Won!");
    }, 500);
    demoTimers.push(timer);
  });

  const promise2 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput(
        "promiseRaceOutput",
        "🚗 Medium promise finished!",
        "warning"
      );
      resolve("Medium Promise");
    }, 1000);
    demoTimers.push(timer);
  });

  const promise3 = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput("promiseRaceOutput", "🐌 Slow promise finished!", "warning");
      resolve("Slow Promise");
    }, 2000);
    demoTimers.push(timer);
  });

  Promise.race([promise1, promise2, promise3]).then((winner) => {
    addToOutput("promiseRaceOutput", `🏆 Winner: ${winner}`, "success");
    addToOutput(
      "promiseRaceOutput",
      "📝 Promise.race resolves with the FIRST promise to complete",
      "info"
    );
  });
}

// Promise.allSettled Demo
function demoPromiseAllSettled() {
  const output = document.getElementById("allSettledOutput");
  if (!output) return;

  clearOutput("allSettledOutput");

  addToOutput("allSettledOutput", "⚖️ Promise.allSettled Demo...", "info");

  const successPromise = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput("allSettledOutput", "✅ Success promise resolved", "success");
      resolve("Success!");
    }, 500);
    demoTimers.push(timer);
  });

  const errorPromise = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      addToOutput("allSettledOutput", "❌ Error promise rejected", "error");
      reject(new Error("Something went wrong"));
    }, 700);
    demoTimers.push(timer);
  });

  const slowPromise = new Promise((resolve) => {
    const timer = setTimeout(() => {
      addToOutput("allSettledOutput", "🐌 Slow promise resolved", "success");
      resolve("Finally done!");
    }, 1200);
    demoTimers.push(timer);
  });

  Promise.allSettled([successPromise, errorPromise, slowPromise]).then(
    (results) => {
      addToOutput(
        "allSettledOutput",
        "📊 All promises settled! Results:",
        "info"
      );

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          addToOutput(
            "allSettledOutput",
            `  ${index + 1}. Fulfilled: ${result.value}`,
            "success"
          );
        } else {
          addToOutput(
            "allSettledOutput",
            `  ${index + 1}. Rejected: ${result.reason.message}`,
            "error"
          );
        }
      });

      addToOutput(
        "allSettledOutput",
        "📝 allSettled NEVER fails - always returns all results",
        "info"
      );
    }
  );
}

// Microtask vs Macrotask Demo
function demoMicrotaskVsMacrotask() {
  const output = document.getElementById("priorityOutput");
  if (!output) return;

  clearOutput("priorityOutput");

  addToOutput(
    "priorityOutput",
    "⚡ Microtask vs Macrotask Priority Demo...",
    "info"
  );

  // Macrotask
  const timer1 = setTimeout(() => {
    addToOutput("priorityOutput", "🕰️ Macrotask: setTimeout", "warning");
  }, 0);
  demoTimers.push(timer1);

  // Microtask
  Promise.resolve().then(() => {
    addToOutput("priorityOutput", "⚡ Microtask: Promise.then", "success");
  });

  // Another macrotask
  const timer2 = setTimeout(() => {
    addToOutput(
      "priorityOutput",
      "🕰️ Macrotask: Another setTimeout",
      "warning"
    );
  }, 0);
  demoTimers.push(timer2);

  // Another microtask
  queueMicrotask(() => {
    addToOutput("priorityOutput", "⚡ Microtask: queueMicrotask", "success");
  });

  // Explanation
  const timer3 = setTimeout(() => {
    addToOutput(
      "priorityOutput",
      "📝 Microtasks ALWAYS run before macrotasks!",
      "info"
    );
  }, 50);
  demoTimers.push(timer3);
}

// Web Workers Demo
function startWorkerDemo() {
  const output = document.getElementById("workerOutput");
  const progressBar = document.getElementById("workerProgress");

  if (!output) return;

  clearOutput("workerOutput");
  if (progressBar) progressBar.style.width = "0%";

  addToOutput(
    "workerOutput",
    "👷 Starting heavy computation with Web Worker...",
    "info"
  );

  // Simulate heavy computation without blocking UI
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    addToOutput("workerOutput", `🔄 Processing... ${progress}%`, "info");

    if (progress >= 100) {
      clearInterval(interval);
      addToOutput("workerOutput", "✅ Heavy computation completed!", "success");
      addToOutput(
        "workerOutput",
        "📝 UI remained responsive throughout!",
        "info"
      );
    }
  }, 200);

  demoIntervals.push(interval);
}

// UI Responsiveness Test
function startUITest() {
  const output = document.getElementById("workerOutput");
  if (!output) return;

  clearOutput("workerOutput");

  addToOutput("workerOutput", "🖱️ UI Responsiveness Test...", "info");
  addToOutput(
    "workerOutput",
    "👆 Try clicking this area while test runs!",
    "info"
  );

  // Add click counter
  let clickCount = 0;
  const clickHandler = () => {
    clickCount++;
    addToOutput(
      "workerOutput",
      `🖱️ Click ${clickCount} - UI is responsive!`,
      "success"
    );
  };

  output.addEventListener("click", clickHandler);

  // Simulate background work
  let workProgress = 0;
  const workInterval = setInterval(() => {
    workProgress += 20;
    addToOutput(
      "workerOutput",
      `⚙️ Background work: ${workProgress}%`,
      "warning"
    );

    if (workProgress >= 100) {
      clearInterval(workInterval);
      output.removeEventListener("click", clickHandler);
      addToOutput(
        "workerOutput",
        "✅ Test complete! UI stayed responsive!",
        "success"
      );
    }
  }, 500);

  demoIntervals.push(workInterval);
}

// Playground Code Runner
function runPlaygroundCode() {
  const codeEditor = document.getElementById("codeEditor");
  const output = document.getElementById("playgroundOutput");

  if (!codeEditor || !output) return;

  const code = codeEditor.value.trim();
  if (!code) {
    addToOutput(
      "playgroundOutput",
      "⚠️ Please enter some code first!",
      "warning"
    );
    return;
  }

  clearOutput("playgroundOutput");
  addToOutput("playgroundOutput", "🚀 Executing code...", "info");

  // Capture console output
  const originalLog = console.log;
  const logs = [];

  console.log = (...args) => {
    logs.push(args.join(" "));
    originalLog(...args);
  };

  try {
    // Execute the code
    const result = eval(code);

    // Show captured logs
    logs.forEach((log) => {
      addToOutput("playgroundOutput", log, "success");
    });

    // Show result if it's not undefined
    if (result !== undefined) {
      addToOutput("playgroundOutput", `Result: ${result}`, "info");
    }

    addToOutput(
      "playgroundOutput",
      "✅ Code executed successfully!",
      "success"
    );
  } catch (error) {
    addToOutput("playgroundOutput", `❌ Error: ${error.message}`, "error");
  } finally {
    // Restore console.log
    console.log = originalLog;
  }
}

// Clear Playground
function clearPlayground() {
  const codeEditor = document.getElementById("codeEditor");
  const output = document.getElementById("playgroundOutput");

  if (codeEditor) {
    codeEditor.value = "";
  }

  if (output) {
    output.innerHTML =
      '<div style="opacity: 0.6; font-style: italic;">Enter code above and click "Run Code" to see results</div>';
  }
}

// Event Loop Visualizer
function startEventLoopVisualization() {
  const callStack = document.getElementById("visualCallStack");
  const taskQueue = document.getElementById("visualTaskQueue");
  const microtaskQueue = document.getElementById("visualMicrotaskQueue");

  if (!callStack || !taskQueue || !microtaskQueue) return;

  // Clear queues
  callStack.innerHTML = "";
  taskQueue.innerHTML = "";
  microtaskQueue.innerHTML = "";

  let step = 0;
  const steps = [
    {
      action: "Add main() to call stack",
      callStack: ["main()"],
      taskQueue: [],
      microtaskQueue: [],
    },
    {
      action: "Add setTimeout to task queue",
      callStack: ["main()"],
      taskQueue: ["setTimeout callback"],
      microtaskQueue: [],
    },
    {
      action: "Add Promise.then to microtask queue",
      callStack: ["main()"],
      taskQueue: ["setTimeout callback"],
      microtaskQueue: ["Promise.then callback"],
    },
    {
      action: "main() completes, stack empty",
      callStack: [],
      taskQueue: ["setTimeout callback"],
      microtaskQueue: ["Promise.then callback"],
    },
    {
      action: "Execute microtask first",
      callStack: ["Promise.then callback"],
      taskQueue: ["setTimeout callback"],
      microtaskQueue: [],
    },
    {
      action: "Microtask completes",
      callStack: [],
      taskQueue: ["setTimeout callback"],
      microtaskQueue: [],
    },
    {
      action: "Execute macrotask",
      callStack: ["setTimeout callback"],
      taskQueue: [],
      microtaskQueue: [],
    },
    {
      action: "All tasks complete",
      callStack: [],
      taskQueue: [],
      microtaskQueue: [],
    },
  ];

  function updateVisualization() {
    if (step >= steps.length) {
      return;
    }

    const currentStep = steps[step];

    // Update call stack
    callStack.innerHTML = currentStep.callStack
      .map(
        (item) =>
          `<div style="background: rgba(76, 175, 80, 0.3); padding: 5px; margin: 2px; border-radius: 3px;">${item}</div>`
      )
      .join("");

    // Update task queue
    taskQueue.innerHTML = currentStep.taskQueue
      .map(
        (item) =>
          `<div style="background: rgba(255, 193, 7, 0.3); padding: 5px; margin: 2px; border-radius: 3px;">${item}</div>`
      )
      .join("");

    // Update microtask queue
    microtaskQueue.innerHTML = currentStep.microtaskQueue
      .map(
        (item) =>
          `<div style="background: rgba(244, 67, 54, 0.3); padding: 5px; margin: 2px; border-radius: 3px;">${item}</div>`
      )
      .join("");

    step++;

    if (step < steps.length) {
      const timer = setTimeout(updateVisualization, 1500);
      demoTimers.push(timer);
    }
  }

  updateVisualization();
}

// Reset Visualization
function resetVisualization() {
  const callStack = document.getElementById("visualCallStack");
  const taskQueue = document.getElementById("visualTaskQueue");
  const microtaskQueue = document.getElementById("visualMicrotaskQueue");

  if (callStack) callStack.innerHTML = "";
  if (taskQueue) taskQueue.innerHTML = "";
  if (microtaskQueue) microtaskQueue.innerHTML = "";

  // Clear any running visualization timers
  cleanupDemos();
}

// Clean up when page unloads
window.addEventListener("beforeunload", cleanupDemos);

// Export functions for global use
window.demoFunctions = {
  runEventLoopDemo,
  demonstrateExecutionOrder,
  demonstrateSetTimeout,
  demonstrateZeroTimeout,
  demonstrateSetInterval,
  demoPromiseStates,
  demoAsyncAwait,
  demoPromiseAll,
  demoPromiseAllExample,
  demoPromiseRace,
  demoPromiseAllSettled,
  demoMicrotaskVsMacrotask,
  startWorkerDemo,
  startUITest,
  runPlaygroundCode,
  clearPlayground,
  startEventLoopVisualization,
  resetVisualization,
  cleanupDemos,
};

console.log("Modern Demos loaded successfully! 🎉");

// Enhanced Event Loop Visualizer Functions

// Global state for enhanced visualizer
let currentVisualizationStep = 0;
let visualizationSteps = [];
let visualizationTimer = null;
let currentExampleIndex = 0;

// Example code snippets for visualization
const visualizationExamples = [
  {
    title: "Basic Event Loop",
    code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');`,
    steps: [
      {
        description: "1. Execute console.log('Start')",
        callStack: ["console.log('Start')"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start"],
      },
      {
        description: "2. Schedule setTimeout callback",
        callStack: ["setTimeout()"],
        taskQueue: ["setTimeout callback"],
        microtaskQueue: [],
        output: ["Start"],
      },
      {
        description: "3. Schedule Promise.then callback",
        callStack: ["Promise.resolve().then()"],
        taskQueue: ["setTimeout callback"],
        microtaskQueue: ["Promise.then callback"],
        output: ["Start"],
      },
      {
        description: "4. Execute console.log('End')",
        callStack: ["console.log('End')"],
        taskQueue: ["setTimeout callback"],
        microtaskQueue: ["Promise.then callback"],
        output: ["Start", "End"],
      },
      {
        description: "5. Main execution complete, check microtasks",
        callStack: [],
        taskQueue: ["setTimeout callback"],
        microtaskQueue: ["Promise.then callback"],
        output: ["Start", "End"],
      },
      {
        description: "6. Execute Promise.then callback (microtask)",
        callStack: ["Promise.then callback"],
        taskQueue: ["setTimeout callback"],
        microtaskQueue: [],
        output: ["Start", "End", "Promise"],
      },
      {
        description: "7. Microtasks complete, execute macrotask",
        callStack: ["setTimeout callback"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start", "End", "Promise", "Timeout"],
      },
      {
        description: "8. All tasks complete",
        callStack: [],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start", "End", "Promise", "Timeout"],
      },
    ],
  },
  {
    title: "Nested Promises",
    code: `console.log('Start');

Promise.resolve().then(() => {
  console.log('Promise 1');
  return Promise.resolve();
}).then(() => {
  console.log('Promise 2');
});

console.log('End');`,
    steps: [
      {
        description: "1. Execute console.log('Start')",
        callStack: ["console.log('Start')"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start"],
      },
      {
        description: "2. Schedule first Promise.then",
        callStack: ["Promise.resolve().then()"],
        taskQueue: [],
        microtaskQueue: ["Promise.then callback 1"],
        output: ["Start"],
      },
      {
        description: "3. Execute console.log('End')",
        callStack: ["console.log('End')"],
        taskQueue: [],
        microtaskQueue: ["Promise.then callback 1"],
        output: ["Start", "End"],
      },
      {
        description: "4. Execute first Promise callback",
        callStack: ["Promise.then callback 1"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start", "End", "Promise 1"],
      },
      {
        description: "5. Schedule second Promise.then",
        callStack: [],
        taskQueue: [],
        microtaskQueue: ["Promise.then callback 2"],
        output: ["Start", "End", "Promise 1"],
      },
      {
        description: "6. Execute second Promise callback",
        callStack: ["Promise.then callback 2"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start", "End", "Promise 1", "Promise 2"],
      },
      {
        description: "7. All tasks complete",
        callStack: [],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start", "End", "Promise 1", "Promise 2"],
      },
    ],
  },
  {
    title: "Mixed Timers and Promises",
    code: `console.log('Start');

setTimeout(() => console.log('Timer 1'), 0);
setTimeout(() => console.log('Timer 2'), 0);

Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

console.log('End');`,
    steps: [
      {
        description: "1. Execute console.log('Start')",
        callStack: ["console.log('Start')"],
        taskQueue: [],
        microtaskQueue: [],
        output: ["Start"],
      },
      {
        description: "2. Schedule setTimeout callbacks",
        callStack: [],
        taskQueue: ["Timer 1 callback", "Timer 2 callback"],
        microtaskQueue: [],
        output: ["Start"],
      },
      {
        description: "3. Schedule Promise callbacks",
        callStack: [],
        taskQueue: ["Timer 1 callback", "Timer 2 callback"],
        microtaskQueue: ["Promise 1 callback", "Promise 2 callback"],
        output: ["Start"],
      },
      {
        description: "4. Execute console.log('End')",
        callStack: ["console.log('End')"],
        taskQueue: ["Timer 1 callback", "Timer 2 callback"],
        microtaskQueue: ["Promise 1 callback", "Promise 2 callback"],
        output: ["Start", "End"],
      },
      {
        description: "5. Execute Promise 1 (microtask)",
        callStack: ["Promise 1 callback"],
        taskQueue: ["Timer 1 callback", "Timer 2 callback"],
        microtaskQueue: ["Promise 2 callback"],
        output: ["Start", "End", "Promise 1"],
      },
      {
        description: "6. Execute Promise 2 (microtask)",
        callStack: ["Promise 2 callback"],
        taskQueue: ["Timer 1 callback", "Timer 2 callback"],
        microtaskQueue: [],
        output: ["Start", "End", "Promise 1", "Promise 2"],
      },
      {
        description: "7. Execute Timer 1 (macrotask)",
        callStack: ["Timer 1 callback"],
        taskQueue: ["Timer 2 callback"],
        microtaskQueue: [],
        output: ["Start", "End", "Promise 1", "Promise 2", "Timer 1"],
      },
      {
        description: "8. Execute Timer 2 (macrotask)",
        callStack: ["Timer 2 callback"],
        taskQueue: [],
        microtaskQueue: [],
        output: [
          "Start",
          "End",
          "Promise 1",
          "Promise 2",
          "Timer 1",
          "Timer 2",
        ],
      },
    ],
  },
];

// Enhanced Event Loop Visualization
function startEventLoopVisualization() {
  const example = visualizationExamples[currentExampleIndex];
  visualizationSteps = example.steps;
  currentVisualizationStep = 0;

  // Update code display
  const codeElement = document.getElementById("visualizerCode");
  if (codeElement) {
    codeElement.textContent = example.code;
  }

  // Clear output
  const outputElement = document.getElementById("visualizerOutput");
  if (outputElement) {
    outputElement.innerHTML = "";
  }

  // Start animation
  animateVisualization();
}

// Step through execution manually
function stepThroughExecution() {
  if (currentVisualizationStep < visualizationSteps.length) {
    updateVisualizationStep(visualizationSteps[currentVisualizationStep]);
    currentVisualizationStep++;
  }
}

// Load different example
function loadDifferentExample() {
  currentExampleIndex =
    (currentExampleIndex + 1) % visualizationExamples.length;
  const example = visualizationExamples[currentExampleIndex];

  // Update code display
  const codeElement = document.getElementById("visualizerCode");
  if (codeElement) {
    codeElement.textContent = example.code;
  }

  // Reset visualization
  resetVisualization();

  // Show example title
  const stepsElement = document.getElementById("executionSteps");
  if (stepsElement) {
    stepsElement.innerHTML = `<div class="step-item active">Loaded: ${example.title}</div>`;
  }
}

// Animate visualization automatically
function animateVisualization() {
  if (visualizationTimer) {
    clearTimeout(visualizationTimer);
  }

  currentVisualizationStep = 0;

  function nextStep() {
    if (currentVisualizationStep < visualizationSteps.length) {
      updateVisualizationStep(visualizationSteps[currentVisualizationStep]);
      currentVisualizationStep++;

      visualizationTimer = setTimeout(nextStep, 2000);
    } else {
      // Animation complete
      const eventLoopIcon = document.getElementById("eventLoopIcon");
      if (eventLoopIcon) {
        eventLoopIcon.parentElement.classList.remove("active");
      }
    }
  }

  nextStep();
}

// Update visualization step
function updateVisualizationStep(step) {
  // Update call stack
  updateQueue("visualCallStack", step.callStack, "call-stack");

  // Update task queue
  updateQueue("visualTaskQueue", step.taskQueue, "task-queue");

  // Update microtask queue
  updateQueue("visualMicrotaskQueue", step.microtaskQueue, "microtask-queue");

  // Update execution steps
  updateExecutionSteps(step.description);

  // Update console output
  updateConsoleOutput(step.output);

  // Animate event loop
  animateEventLoop();
}

// Update queue display
function updateQueue(queueId, items, queueType) {
  const queueElement = document.getElementById(queueId);
  if (!queueElement) return;

  if (items.length === 0) {
    queueElement.innerHTML = '<div class="empty-state">Empty</div>';
  } else {
    queueElement.innerHTML = items
      .map((item) => `<div class="queue-item ${queueType}">${item}</div>`)
      .join("");
  }
}

// Update execution steps
function updateExecutionSteps(description) {
  const stepsElement = document.getElementById("executionSteps");
  if (!stepsElement) return;

  const stepElement = document.createElement("div");
  stepElement.className = "step-item active";
  stepElement.textContent = description;

  // Mark previous steps as completed
  const existingSteps = stepsElement.querySelectorAll(".step-item");
  existingSteps.forEach((step) => {
    step.classList.remove("active");
    step.classList.add("completed");
  });

  stepsElement.appendChild(stepElement);
  stepsElement.scrollTop = stepsElement.scrollHeight;
}

// Update console output
function updateConsoleOutput(output) {
  const outputElement = document.getElementById("visualizerOutput");
  if (!outputElement) return;

  outputElement.innerHTML = output
    .map((line) => `<div class="console-line">${line}</div>`)
    .join("");
}

// Animate event loop indicator
function animateEventLoop() {
  const eventLoopIcon = document.getElementById("eventLoopIcon");
  const eventLoopCircle = eventLoopIcon?.parentElement;

  if (eventLoopCircle) {
    eventLoopCircle.classList.add("active");

    setTimeout(() => {
      eventLoopCircle.classList.remove("active");
    }, 1500);
  }
}

// Enhanced reset function
function resetVisualization() {
  // Stop any running animation
  if (visualizationTimer) {
    clearTimeout(visualizationTimer);
    visualizationTimer = null;
  }

  // Reset step counter
  currentVisualizationStep = 0;

  // Clear all queues
  const queues = ["visualCallStack", "visualTaskQueue", "visualMicrotaskQueue"];
  queues.forEach((queueId) => {
    const queueElement = document.getElementById(queueId);
    if (queueElement) {
      queueElement.innerHTML = '<div class="empty-state">Empty</div>';
    }
  });

  // Clear execution steps
  const stepsElement = document.getElementById("executionSteps");
  if (stepsElement) {
    stepsElement.innerHTML = "";
  }

  // Clear console output
  const outputElement = document.getElementById("visualizerOutput");
  if (outputElement) {
    outputElement.innerHTML = "";
  }

  // Reset event loop indicator
  const eventLoopIcon = document.getElementById("eventLoopIcon");
  if (eventLoopIcon) {
    eventLoopIcon.parentElement.classList.remove("active");
  }
}

// Add to global functions
window.demoFunctions = {
  ...window.demoFunctions,
  stepThroughExecution,
  loadDifferentExample,
  resetVisualization: resetVisualization,
};

console.log("Enhanced Event Loop Visualizer loaded! 🎯");

// requestAnimationFrame Demo
let rafAnimationId;
let intervalId;
let rafPosition = 0;
let intervalPosition = 0;
let rafFrameCount = 0;
let intervalFrameCount = 0;

function startRAFDemo() {
  stopRAFDemo();
  rafPosition = 0;
  intervalPosition = 0;
  rafFrameCount = 0;
  intervalFrameCount = 0;

  const rafBox = document.getElementById("rafBox");
  const intervalBox = document.getElementById("intervalBox");
  const output = document.getElementById("rafOutput");

  output.innerHTML = "";

  // requestAnimationFrame animation
  function animateRAF() {
    rafPosition += 2;
    rafFrameCount++;
    rafBox.style.left = rafPosition + "px";

    if (rafPosition < 400) {
      rafAnimationId = requestAnimationFrame(animateRAF);
    }
  }

  // setInterval animation
  intervalId = setInterval(() => {
    intervalPosition += 2;
    intervalFrameCount++;
    intervalBox.style.left = intervalPosition + "px";

    if (intervalPosition >= 400) {
      clearInterval(intervalId);
      showRAFResults();
    }
  }, 16);

  animateRAF();

  setTimeout(showRAFResults, 3000);
}

function stopRAFDemo() {
  if (rafAnimationId) {
    cancelAnimationFrame(rafAnimationId);
  }
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function showRAFResults() {
  const output = document.getElementById("rafOutput");
  output.innerHTML = `
    <div class="log-entry success">RAF Frames: ${rafFrameCount} (smooth, synced with display)</div>
    <div class="log-entry warning">setInterval Frames: ${intervalFrameCount} (may drop frames)</div>
    <div class="log-entry info">RAF provides better performance and smoother animations</div>
  `;
}

// Error Handling Demo
function demoSuccessfulPromise() {
  const output = document.getElementById("errorOutput");
  output.innerHTML =
    '<div class="log-entry info">Starting successful promise...</div>';

  // Simulate successful async operation
  fetch('data:application/json,{"success": true, "data": "Hello World"}')
    .then((response) => response.json())
    .then((data) => {
      output.innerHTML += `<div class="log-entry success">✓ Success: ${data.data}</div>`;
    })
    .catch((error) => {
      output.innerHTML += `<div class="log-entry error">✗ Error: ${error.message}</div>`;
    });
}

function demoFailedPromise() {
  const output = document.getElementById("errorOutput");
  output.innerHTML =
    '<div class="log-entry info">Starting failed promise...</div>';

  // Simulate failed async operation
  fetch("https://invalid-url-that-will-fail.com/api")
    .then((response) => response.json())
    .then((data) => {
      output.innerHTML += `<div class="log-entry success">✓ Success: ${data}</div>`;
    })
    .catch((error) => {
      output.innerHTML += `<div class="log-entry error">✗ Caught error: ${error.message}</div>`;
      output.innerHTML += `<div class="log-entry info">Error handling prevents app crash</div>`;
    });
}

function demoMixedPromises() {
  const output = document.getElementById("errorOutput");
  output.innerHTML =
    '<div class="log-entry info">Starting mixed promises with Promise.allSettled...</div>';

  const promises = [
    fetch('data:application/json,{"success": true, "data": "API 1"}').then(
      (r) => r.json()
    ),
    Promise.reject(new Error("API 2 failed")),
    fetch('data:application/json,{"success": true, "data": "API 3"}').then(
      (r) => r.json()
    ),
  ];

  Promise.allSettled(promises).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        output.innerHTML += `<div class="log-entry success">✓ Promise ${
          index + 1
        }: ${result.value.data || "Success"}</div>`;
      } else {
        output.innerHTML += `<div class="log-entry error">✗ Promise ${
          index + 1
        }: ${result.reason.message}</div>`;
      }
    });
    output.innerHTML += `<div class="log-entry info">Promise.allSettled never rejects - perfect for handling mixed results</div>`;
  });
}

// Debouncing & Throttling Demo
let eventCount = 0;
let executionCount = 0;
let throttleLastCall = 0;

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Global flag to track if performance demo is initialized
let performanceDemoInitialized = false;
let performanceDemoListeners = [];

function initPerformanceDemo() {
  const searchInput = document.getElementById("searchInput");
  const clickButton = document.getElementById("clickButton");
  const output = document.getElementById("performanceOutput");
  const typingIndicator = document.getElementById("typingIndicator");
  const searchIndicator = document.getElementById("searchIndicator");

  if (!searchInput || !clickButton) return;

  // If already initialized, don't add duplicate listeners
  if (performanceDemoInitialized) {
    return;
  }

  // Reset counters
  eventCount = 0;
  executionCount = 0;

  // Debounced search
  const debouncedSearch = debounce((value) => {
    setTimeout(() => {
      executionCount++;
      updateCountersWithAnimation();
      output.innerHTML += `<div class="log-entry info">Search executed: "${value}" (execution #${executionCount})</div>`;
    }, 100);
  }, 300);

  const inputHandler = (e) => {
    eventCount++;
    updateCountersWithAnimation();
    debouncedSearch(e.target.value);
  };

  searchInput.addEventListener("input", inputHandler);

  // Throttled click with enhanced feedback
  const throttledClick = throttle(() => {
    executionCount++;
    updateCountersWithAnimation();
    output.innerHTML += `<div class="log-entry info">Click executed (execution #${executionCount})</div>`;

    // Add button animation feedback
    clickButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      clickButton.style.transform = "";
    }, 150);
  }, 1000);

  const clickHandler = () => {
    eventCount++;
    updateCountersWithAnimation();
    throttledClick();
  };

  clickButton.addEventListener("click", clickHandler);

  // Store listeners for cleanup
  performanceDemoListeners.push(
    { element: searchInput, event: "input", handler: inputHandler },
    { element: clickButton, event: "click", handler: clickHandler }
  );

  // Mark as initialized
  performanceDemoInitialized = true;
}

function updateCountersWithAnimation() {
  const eventCountEl = document.getElementById("eventCount");
  const executionCountEl = document.getElementById("executionCount");

  if (eventCountEl) {
    eventCountEl.textContent = eventCount;
    eventCountEl.parentElement.parentElement.classList.add("updated");
    setTimeout(() => {
      eventCountEl.parentElement.parentElement.classList.remove("updated");
    }, 300);
  }

  if (executionCountEl) {
    executionCountEl.textContent = executionCount;
    executionCountEl.parentElement.parentElement.classList.add("updated");
    setTimeout(() => {
      executionCountEl.parentElement.parentElement.classList.remove("updated");
    }, 300);
  }
}

// Clear Performance Demo
function clearPerformanceDemo() {
  // Reset counters
  eventCount = 0;
  executionCount = 0;

  // Clear search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
  }

  // Clear output
  const output = document.getElementById("performanceOutput");
  if (output) {
    output.innerHTML = "";
  }

  // Hide indicators (if they exist)
  const typingIndicator = document.getElementById("typingIndicator");
  const searchIndicator = document.getElementById("searchIndicator");
  if (typingIndicator) typingIndicator.classList.remove("active");
  if (searchIndicator) searchIndicator.classList.remove("active");

  // Update counter display
  updateCountersWithAnimation();

  // Clean up event listeners
  performanceDemoListeners.forEach(({ element, event, handler }) => {
    element.removeEventListener(event, handler);
  });
  performanceDemoListeners = [];

  // Reset initialization flag
  performanceDemoInitialized = false;

  // Re-initialize to set up fresh listeners
  initPerformanceDemo();
}

// Legacy updateCounters function for compatibility
function updateCounters() {
  updateCountersWithAnimation();
}

// Console Timing API Demo
function demoConsoleTimingAPI() {
  const output = document.getElementById("debugOutput");
  output.innerHTML =
    '<div class="log-entry info">🕐 Console Timing API Demo...</div>';

  // Simulate multiple operations with console.time
  console.time("operation-1");
  output.innerHTML +=
    '<div class="log-entry info">⏱️ Starting operation-1...</div>';

  setTimeout(() => {
    console.timeEnd("operation-1");
    output.innerHTML +=
      '<div class="log-entry success">✅ operation-1 completed (check console for timing)</div>';

    // Group related operations
    console.group("API Calls");
    console.time("fetch-users");
    output.innerHTML +=
      '<div class="log-entry info">📡 Fetching users...</div>';

    setTimeout(() => {
      console.timeEnd("fetch-users");
      console.log("Users fetched successfully");

      console.time("fetch-posts");
      output.innerHTML +=
        '<div class="log-entry info">📡 Fetching posts...</div>';

      setTimeout(() => {
        console.timeEnd("fetch-posts");
        console.log("Posts fetched successfully");
        console.groupEnd();

        output.innerHTML +=
          '<div class="log-entry success">✅ All API calls completed</div>';
        output.innerHTML +=
          '<div class="log-entry info">💡 Check browser console for detailed timing info</div>';
      }, 300);
    }, 500);
  }, 800);
}

// Fetch Performance Demo
function demoFetchPerformance() {
  const output = document.getElementById("debugOutput");
  output.innerHTML =
    '<div class="log-entry info">🚀 Fetch Performance Demo...</div>';

  // Clear previous marks
  performance.clearMarks();
  performance.clearMeasures();

  // Simulate fetch operations with performance measurement
  performance.mark("fetch-start");

  // Simulate multiple API calls
  const simulateAPICall = (url, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ url, data: `Data from ${url}`, timestamp: Date.now() });
      }, delay);
    });
  };

  output.innerHTML +=
    '<div class="log-entry info">📡 Starting parallel fetch operations...</div>';

  Promise.all([
    simulateAPICall("/api/users", 400),
    simulateAPICall("/api/posts", 600),
    simulateAPICall("/api/comments", 300),
  ]).then((results) => {
    performance.mark("fetch-end");
    performance.measure("total-fetch-time", "fetch-start", "fetch-end");

    const measures = performance.getEntriesByType("measure");
    const totalTime = measures.find((m) => m.name === "total-fetch-time");

    output.innerHTML += `<div class="log-entry success">✅ All fetches completed in ${totalTime.duration.toFixed(
      2
    )}ms</div>`;

    results.forEach((result, index) => {
      output.innerHTML += `<div class="log-entry info">📊 ${result.url}: ${result.data}</div>`;
    });

    output.innerHTML +=
      '<div class="log-entry info">🎯 Parallel fetching is more efficient than sequential</div>';
  });
}

// AbortController Demo
let currentController = null;

function startLongRequest() {
  const output = document.getElementById("abortOutput");
  output.innerHTML =
    '<div class="log-entry info">Starting long request...</div>';

  // Create new AbortController
  currentController = new AbortController();
  const signal = currentController.signal;

  // Simulate long request
  const longRequest = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve({ data: "Long request completed!" });
    }, 5000);

    // Listen for abort signal
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Request was aborted", "AbortError"));
    });
  });

  longRequest
    .then((result) => {
      output.innerHTML += `<div class="log-entry success">✓ ${result.data}</div>`;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        output.innerHTML += `<div class="log-entry warning">Request was cancelled</div>`;
      } else {
        output.innerHTML += `<div class="log-entry error">✗ Error: ${error.message}</div>`;
      }
    })
    .finally(() => {
      currentController = null;
    });
}

function cancelRequest() {
  const output = document.getElementById("abortOutput");

  if (currentController) {
    currentController.abort();
    output.innerHTML += `<div class="log-entry info">Abort signal sent</div>`;
  } else {
    output.innerHTML += `<div class="log-entry warning">No active request to cancel</div>`;
  }
}

function requestWithTimeout() {
  const output = document.getElementById("abortOutput");
  output.innerHTML =
    '<div class="log-entry info">Starting request with 2s timeout...</div>';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  // Simulate request that takes 3 seconds
  const request = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve({ data: "Request completed" });
    }, 3000);

    controller.signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Request timeout", "AbortError"));
    });
  });

  request
    .then((result) => {
      clearTimeout(timeoutId);
      output.innerHTML += `<div class="log-entry success">✓ ${result.data}</div>`;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        output.innerHTML += `<div class="log-entry warning">Request timed out after 2 seconds</div>`;
      } else {
        output.innerHTML += `<div class="log-entry error">✗ Error: ${error.message}</div>`;
      }
    });
}

// Performance Debugging Demo
function measureAsyncPerformance() {
  const output = document.getElementById("debugOutput");
  output.innerHTML =
    '<div class="log-entry info">Measuring async performance...</div>';

  // Clear previous marks
  performance.clearMarks();
  performance.clearMeasures();

  // Mark start
  performance.mark("async-start");

  // Simulate async operations
  Promise.resolve()
    .then(() => {
      performance.mark("promise-1");
      return new Promise((resolve) => setTimeout(resolve, 100));
    })
    .then(() => {
      performance.mark("promise-2");
      return new Promise((resolve) => setTimeout(resolve, 200));
    })
    .then(() => {
      performance.mark("async-end");

      // Create measures
      performance.measure("total-time", "async-start", "async-end");
      performance.measure("first-promise", "async-start", "promise-1");
      performance.measure("second-promise", "promise-1", "promise-2");
      performance.measure("third-promise", "promise-2", "async-end");

      // Display results
      const measures = performance.getEntriesByType("measure");
      measures.forEach((measure) => {
        output.innerHTML += `<div class="log-entry info">${
          measure.name
        }: ${measure.duration.toFixed(2)}ms</div>`;
      });

      output.innerHTML += `<div class="log-entry success">Performance measurement complete</div>`;
    });
}

function demonstrateMemoryLeak() {
  const output = document.getElementById("debugOutput");
  output.innerHTML =
    '<div class="log-entry warning">Demonstrating potential memory leak...</div>';

  // Bad: Creates closure that holds reference
  function createLeakyFunction() {
    const largeData = new Array(1000000).fill("data");

    return function () {
      console.log("Function called");
      // largeData is still referenced in closure
    };
  }

  // Good: Properly cleaned up
  function createCleanFunction() {
    let largeData = new Array(1000000).fill("data");

    return function cleanup() {
      largeData = null; // Explicit cleanup
      console.log("Function cleaned up");
    };
  }

  output.innerHTML += `<div class="log-entry error">❌ Leaky: Function holds reference to large data</div>`;
  output.innerHTML += `<div class="log-entry success">✅ Clean: Explicitly nullify references</div>`;
  output.innerHTML += `<div class="log-entry info">Use DevTools Memory tab to profile memory usage</div>`;
}

function clearPerformanceMarks() {
  const output = document.getElementById("debugOutput");
  performance.clearMarks();
  performance.clearMeasures();
  output.innerHTML =
    '<div class="log-entry info">Performance marks and measures cleared</div>';
}

// Initialize demos when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize performance demo if elements exist
  if (document.getElementById("searchInput")) {
    initPerformanceDemo();
  }
});

// Add to existing slide initialization
function initializeSlideSpecificFeatures(slideNumber) {
  // ... existing code ...

  // Initialize new slide features
  switch (slideNumber) {
    case 24: // Debouncing & Throttling
      if (document.getElementById("searchInput")) {
        initPerformanceDemo();
      }
      break;
    case 27: // Live Code Playground
      if (typeof initializePlayground === "function") {
        initializePlayground();
      }
      break;
    case 28: // Event Loop Visualizer
      if (typeof initializeVisualizer === "function") {
        initializeVisualizer();
      }
      break;
  }
}

// Promise.all Practical Example Demo
function demoPromiseAllExample() {
  const output = document.getElementById("promiseAllExampleOutput");
  if (!output) return;

  clearOutput("promiseAllExampleOutput");

  addToOutput(
    "promiseAllExampleOutput",
    "🚀 Starting Promise.all Demo...",
    "info"
  );

  // Simulate API calls
  function fetchUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ users: ["Alice", "Bob", "Charlie"] });
      }, 800);
    });
  }

  function fetchPosts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ posts: ["Post 1", "Post 2", "Post 3"] });
      }, 600);
    });
  }

  const startTime = Date.now();

  addToOutput(
    "promiseAllExampleOutput",
    "📡 Fetching users and posts simultaneously...",
    "info"
  );

  Promise.all([fetchUsers(), fetchPosts()])
    .then(([users, posts]) => {
      const elapsed = Date.now() - startTime;
      addToOutput(
        "promiseAllExampleOutput",
        `✅ Both requests completed in ${elapsed}ms`,
        "success"
      );
      addToOutput(
        "promiseAllExampleOutput",
        `👥 Users: ${users.users.join(", ")}`,
        "success"
      );
      addToOutput(
        "promiseAllExampleOutput",
        `📝 Posts: ${posts.posts.join(", ")}`,
        "success"
      );
      addToOutput(
        "promiseAllExampleOutput",
        "🚀 Parallel execution is faster than sequential!",
        "info"
      );
    })
    .catch((error) => {
      addToOutput(
        "promiseAllExampleOutput",
        `❌ Error: ${error.message}`,
        "error"
      );
    });
}

// Promise.race Practical Example Demo
function demoPromiseRaceExample() {
  const output = document.getElementById("promiseRaceExampleOutput");
  if (!output) return;

  clearOutput("promiseRaceExampleOutput");

  addToOutput(
    "promiseRaceExampleOutput",
    "🏁 Starting Promise.race Demo...",
    "info"
  );

  // Simulate fast and slow API endpoints
  function fetchFastAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve({ data: "Fast API Response", source: "fast-api", time: 300 });
        } else {
          reject(new Error("Fast API failed"));
        }
      }, 300);
    });
  }

  function fetchSlowAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({
            data: "Slow API Response",
            source: "slow-api",
            time: 1200,
          });
        } else {
          reject(new Error("Slow API failed"));
        }
      }, 1200);
    });
  }

  const startTime = Date.now();

  addToOutput(
    "promiseRaceExampleOutput",
    "🏃‍♂️ Racing between fast API (300ms) and slow API (1200ms)...",
    "info"
  );

  Promise.race([fetchFastAPI(), fetchSlowAPI()])
    .then((winner) => {
      const elapsed = Date.now() - startTime;
      addToOutput(
        "promiseRaceExampleOutput",
        `🏆 Winner: ${winner.source} in ${elapsed}ms`,
        "success"
      );
      addToOutput(
        "promiseRaceExampleOutput",
        `📨 Data: ${winner.data}`,
        "success"
      );
      addToOutput(
        "promiseRaceExampleOutput",
        "⚡ Perfect for timeouts and redundant calls!",
        "info"
      );
    })
    .catch((error) => {
      addToOutput(
        "promiseRaceExampleOutput",
        `❌ First to fail: ${error.message}`,
        "error"
      );
    });
}

// Promise.allSettled Practical Example Demo
function demoPromiseAllSettledExample() {
  const output = document.getElementById("promiseAllSettledExampleOutput");
  if (!output) return;

  clearOutput("promiseAllSettledExampleOutput");

  addToOutput(
    "promiseAllSettledExampleOutput",
    "⚖️ Starting Promise.allSettled Demo...",
    "info"
  );

  // Simulate API calls with different outcomes
  function fetchAPI1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ data: "API 1 Success", id: 1 });
        } else {
          reject(new Error("API 1 failed"));
        }
      }, 500);
    });
  }

  function fetchAPI2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ data: "API 2 Success", id: 2 });
        } else {
          reject(new Error("API 2 failed"));
        }
      }, 700);
    });
  }

  function fetchAPI3() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.4) {
          resolve({ data: "API 3 Success", id: 3 });
        } else {
          reject(new Error("API 3 failed"));
        }
      }, 600);
    });
  }

  const startTime = Date.now();

  addToOutput(
    "promiseAllSettledExampleOutput",
    "🎯 Calling 3 APIs with different failure rates...",
    "info"
  );

  Promise.allSettled([fetchAPI1(), fetchAPI2(), fetchAPI3()]).then(
    (results) => {
      const elapsed = Date.now() - startTime;
      addToOutput(
        "promiseAllSettledExampleOutput",
        `✅ All settled in ${elapsed}ms`,
        "success"
      );

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          addToOutput(
            "promiseAllSettledExampleOutput",
            `✅ API ${index + 1}: ${result.value.data}`,
            "success"
          );
        } else {
          addToOutput(
            "promiseAllSettledExampleOutput",
            `❌ API ${index + 1}: ${result.reason.message}`,
            "error"
          );
        }
      });

      const successful = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      addToOutput(
        "promiseAllSettledExampleOutput",
        `📊 Results: ${successful} successful, ${failed} failed`,
        "info"
      );
      addToOutput(
        "promiseAllSettledExampleOutput",
        "🛡️ allSettled never rejects - perfect for partial success!",
        "info"
      );
    }
  );
}
