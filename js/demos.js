// Clean, stable interactive demos for JavaScript concurrency concepts

// Event Loop Demo
function runEventLoopDemo() {
  try {
    clearOutput("eventLoopOutput");

    logToOutput("eventLoopOutput", "🚀 Starting Event Loop Demo...", "info");
    logToOutput(
      "eventLoopOutput",
      "📋 Watch the execution order carefully!",
      "info"
    );
    logToOutput("eventLoopOutput", "", "info");

    // Synchronous code
    logToOutput(
      "eventLoopOutput",
      "1️⃣ SYNCHRONOUS CODE (runs immediately):",
      "success"
    );
    logToOutput("eventLoopOutput", "✅ Sync: Start of demo", "success");

    // Macrotask (setTimeout)
    setTimeout(() => {
      logToOutput(
        "eventLoopOutput",
        "🕰️ Macrotask: setTimeout(0) - Finally executed!",
        "info"
      );
      logToOutput(
        "eventLoopOutput",
        "💡 Macrotasks run AFTER all microtasks",
        "info"
      );
    }, 0);

    // Microtask (Promise)
    Promise.resolve().then(() => {
      logToOutput(
        "eventLoopOutput",
        "⏱️ Microtask: Promise.resolve().then()",
        "info"
      );
      logToOutput(
        "eventLoopOutput",
        "📌 Microtasks have HIGHER priority than macrotasks",
        "info"
      );
    });

    // Another microtask
    Promise.resolve().then(() => {
      logToOutput(
        "eventLoopOutput",
        "⏱️ Microtask: Another Promise microtask",
        "info"
      );
      logToOutput(
        "eventLoopOutput",
        "🔄 All microtasks complete before any macrotask",
        "info"
      );
    });

    // More sync code
    logToOutput("eventLoopOutput", "✅ Sync: End of demo setup", "success");
    logToOutput("eventLoopOutput", "", "info");
    logToOutput(
      "eventLoopOutput",
      "2️⃣ Now watch microtasks run before macrotasks...",
      "success"
    );

    // Nested operations
    setTimeout(() => {
      logToOutput("eventLoopOutput", "", "info");
      logToOutput("eventLoopOutput", "3️⃣ NESTED OPERATIONS DEMO:", "success");
      logToOutput(
        "eventLoopOutput",
        "🕰️ Inside setTimeout: Creating new async operations",
        "info"
      );

      Promise.resolve().then(() => {
        logToOutput(
          "eventLoopOutput",
          "⏱️ Nested microtask: Promise inside setTimeout",
          "info"
        );
      });

      setTimeout(() => {
        logToOutput(
          "eventLoopOutput",
          "🕰️ Nested macrotask: setTimeout inside setTimeout",
          "info"
        );
        logToOutput(
          "eventLoopOutput",
          "🎉 Demo complete! Notice the execution order.",
          "success"
        );
      }, 0);
    }, 10);
  } catch (error) {
    logToOutput("eventLoopOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Timer Demonstrations
function demonstrateSetTimeout() {
  try {
    clearOutput("timerOutput");

    logToOutput("timerOutput", "🕰️ setTimeout Demo Started", "info");
    logToOutput(
      "timerOutput",
      "Setting up multiple timers with different delays...",
      "info"
    );

    // Multiple setTimeout calls with different delays
    setTimeout(() => {
      logToOutput("timerOutput", "✅ setTimeout: 100ms completed", "success");
    }, 100);

    setTimeout(() => {
      logToOutput("timerOutput", "✅ setTimeout: 50ms completed", "success");
    }, 50);

    setTimeout(() => {
      logToOutput("timerOutput", "✅ setTimeout: 200ms completed", "success");
    }, 200);

    logToOutput(
      "timerOutput",
      "💡 Notice: Execution order depends on delay time, not call order!",
      "info"
    );
  } catch (error) {
    logToOutput("timerOutput", `Error in demo: ${error.message}`, "error");
  }
}

function demonstrateSetInterval() {
  try {
    clearOutput("timerOutput");

    logToOutput("timerOutput", "🔄 setInterval Demo Started", "info");

    let counter = 0;
    const maxRuns = 5;

    const intervalId = setInterval(() => {
      counter++;
      logToOutput("timerOutput", `⏰ setInterval run #${counter}`, "success");

      if (counter >= maxRuns) {
        clearInterval(intervalId);
        logToOutput(
          "timerOutput",
          "🛑 setInterval stopped after 5 runs",
          "info"
        );
      }
    }, 500);

    // Store interval ID for cleanup
    if (!window.demoIntervals) window.demoIntervals = [];
    window.demoIntervals.push(intervalId);
  } catch (error) {
    logToOutput("timerOutput", `Error in demo: ${error.message}`, "error");
  }
}

function demonstrateZeroTimeout() {
  try {
    clearOutput("timerOutput");

    logToOutput("timerOutput", "🤔 setTimeout(0) Demo", "info");
    logToOutput(
      "timerOutput",
      "Testing if setTimeout(0) really runs immediately...",
      "info"
    );

    logToOutput("timerOutput", "1️⃣ Before setTimeout(0)", "success");

    setTimeout(() => {
      logToOutput("timerOutput", "3️⃣ Inside setTimeout(0)", "info");
      logToOutput(
        "timerOutput",
        "💡 setTimeout(0) doesn't run immediately!",
        "info"
      );
    }, 0);

    logToOutput("timerOutput", "2️⃣ After setTimeout(0)", "success");
    logToOutput(
      "timerOutput",
      "📚 setTimeout(0) is added to the macrotask queue",
      "info"
    );
  } catch (error) {
    logToOutput("timerOutput", `Error in demo: ${error.message}`, "error");
  }
}

function runTimerOrder() {
  try {
    clearOutput("timerOutput");

    logToOutput("timerOutput", "🎯 Timer Execution Order Demo", "info");
    logToOutput(
      "timerOutput",
      "Setting up various timers to show execution order...",
      "info"
    );

    // Immediate
    logToOutput("timerOutput", "1️⃣ Immediate: Synchronous code", "success");

    // setTimeout 0
    setTimeout(() => {
      logToOutput("timerOutput", "4️⃣ setTimeout(0)", "info");
    }, 0);

    // Promise (microtask)
    Promise.resolve().then(() => {
      logToOutput("timerOutput", "2️⃣ Promise microtask", "success");
    });

    // setTimeout 1
    setTimeout(() => {
      logToOutput("timerOutput", "5️⃣ setTimeout(1)", "info");
    }, 1);

    // More sync code
    logToOutput("timerOutput", "3️⃣ More synchronous code", "success");
  } catch (error) {
    logToOutput("timerOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Promise Demonstrations
function demoPromiseStates() {
  try {
    clearOutput("promiseOutput");

    logToOutput("promiseOutput", "🤝 Promise States Demo", "info");

    // Pending Promise
    logToOutput("promiseOutput", "1️⃣ Creating pending promise...", "info");
    const pendingPromise = new Promise((resolve, reject) => {
      // This promise will remain pending
      logToOutput("promiseOutput", "⏳ Promise is PENDING", "info");
    });

    // Fulfilled Promise
    logToOutput("promiseOutput", "2️⃣ Creating fulfilled promise...", "info");
    const fulfilledPromise = Promise.resolve("Success!");
    fulfilledPromise.then((value) => {
      logToOutput(
        "promiseOutput",
        `✅ Promise FULFILLED with value: ${value}`,
        "success"
      );
    });

    // Rejected Promise
    logToOutput("promiseOutput", "3️⃣ Creating rejected promise...", "info");
    const rejectedPromise = Promise.reject("Error occurred!");
    rejectedPromise.catch((error) => {
      logToOutput(
        "promiseOutput",
        `❌ Promise REJECTED with error: ${error}`,
        "error"
      );
    });

    logToOutput(
      "promiseOutput",
      "📚 Promises have three states: pending, fulfilled, rejected",
      "info"
    );
  } catch (error) {
    logToOutput("promiseOutput", `Error in demo: ${error.message}`, "error");
  }
}

function demoPromiseAll() {
  try {
    clearOutput("patternOutput");

    logToOutput("patternOutput", "🎭 Promise.all() Demo", "info");
    logToOutput(
      "patternOutput",
      "Running multiple promises in parallel...",
      "info"
    );

    const promise1 = new Promise((resolve) =>
      setTimeout(() => resolve("First"), 1000)
    );
    const promise2 = new Promise((resolve) =>
      setTimeout(() => resolve("Second"), 500)
    );
    const promise3 = new Promise((resolve) =>
      setTimeout(() => resolve("Third"), 1500)
    );

    logToOutput(
      "patternOutput",
      "⏳ Waiting for all promises to complete...",
      "info"
    );

    Promise.all([promise1, promise2, promise3])
      .then((values) => {
        logToOutput(
          "patternOutput",
          `✅ All promises completed: [${values.join(", ")}]`,
          "success"
        );
        logToOutput(
          "patternOutput",
          "💡 Promise.all waits for ALL promises to resolve",
          "info"
        );
      })
      .catch((error) => {
        logToOutput(
          "patternOutput",
          `❌ Promise.all failed: ${error}`,
          "error"
        );
      });
  } catch (error) {
    logToOutput("patternOutput", `Error in demo: ${error.message}`, "error");
  }
}

function demoPromiseRace() {
  try {
    clearOutput("patternOutput");

    logToOutput("patternOutput", "🏃 Promise.race() Demo", "info");
    logToOutput("patternOutput", "Racing multiple promises...", "info");

    const slowPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Slow"), 2000)
    );
    const fastPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Fast"), 500)
    );
    const mediumPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Medium"), 1000)
    );

    logToOutput(
      "patternOutput",
      "⏳ Waiting for the first promise to complete...",
      "info"
    );

    Promise.race([slowPromise, fastPromise, mediumPromise])
      .then((value) => {
        logToOutput(
          "patternOutput",
          `🏆 First promise completed: ${value}`,
          "success"
        );
        logToOutput(
          "patternOutput",
          "💡 Promise.race returns the first resolved promise",
          "info"
        );
      })
      .catch((error) => {
        logToOutput(
          "patternOutput",
          `❌ Promise.race failed: ${error}`,
          "error"
        );
      });
  } catch (error) {
    logToOutput("patternOutput", `Error in demo: ${error.message}`, "error");
  }
}

function demoPromiseAllSettled() {
  try {
    clearOutput("patternOutput");

    logToOutput("patternOutput", "⚖️ Promise.allSettled() Demo", "info");
    logToOutput(
      "patternOutput",
      "Running promises with mixed success/failure...",
      "info"
    );

    const successPromise = new Promise((resolve) =>
      setTimeout(() => resolve("Success!"), 1000)
    );
    const failPromise = new Promise((resolve, reject) =>
      setTimeout(() => reject("Failed!"), 500)
    );
    const anotherSuccess = new Promise((resolve) =>
      setTimeout(() => resolve("Another success!"), 1500)
    );

    logToOutput(
      "patternOutput",
      "⏳ Waiting for all promises to settle...",
      "info"
    );

    Promise.allSettled([successPromise, failPromise, anotherSuccess]).then(
      (results) => {
        logToOutput("patternOutput", "✅ All promises settled:", "success");
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            logToOutput(
              "patternOutput",
              `  ${index + 1}. Fulfilled: ${result.value}`,
              "success"
            );
          } else {
            logToOutput(
              "patternOutput",
              `  ${index + 1}. Rejected: ${result.reason}`,
              "error"
            );
          }
        });
        logToOutput(
          "patternOutput",
          "💡 Promise.allSettled waits for ALL promises to complete (success or failure)",
          "info"
        );
      }
    );
  } catch (error) {
    logToOutput("patternOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Async/Await Demo
async function demoAsyncAwait() {
  try {
    clearOutput("promiseOutput");

    logToOutput("promiseOutput", "🔄 async/await Demo", "info");
    logToOutput("promiseOutput", "Demonstrating async/await syntax...", "info");

    // Async function
    async function fetchData() {
      logToOutput("promiseOutput", "⏳ Simulating API call...", "info");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Data received!";
    }

    logToOutput("promiseOutput", "📞 Calling async function...", "info");
    const result = await fetchData();
    logToOutput("promiseOutput", `✅ ${result}`, "success");
    logToOutput(
      "promiseOutput",
      "💡 async/await makes asynchronous code look synchronous",
      "info"
    );
  } catch (error) {
    logToOutput("promiseOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Microtask vs Macrotask Demo
function demoMicrotaskVsMacrotask() {
  try {
    clearOutput("eventLoopOutput");

    logToOutput("eventLoopOutput", "⚡ Microtask vs Macrotask Demo", "info");
    logToOutput("eventLoopOutput", "Comparing execution priorities...", "info");

    // Sync code
    logToOutput("eventLoopOutput", "1️⃣ Synchronous code", "success");

    // Macrotask
    setTimeout(() => {
      logToOutput("eventLoopOutput", "4️⃣ Macrotask (setTimeout)", "info");
    }, 0);

    // Microtask
    Promise.resolve().then(() => {
      logToOutput("eventLoopOutput", "3️⃣ Microtask (Promise)", "success");
    });

    // More sync code
    logToOutput("eventLoopOutput", "2️⃣ More synchronous code", "success");

    setTimeout(() => {
      logToOutput(
        "eventLoopOutput",
        "💡 Order: Sync → Microtasks → Macrotasks",
        "info"
      );
    }, 10);
  } catch (error) {
    logToOutput("eventLoopOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Playground functionality
function runPlaygroundCode() {
  try {
    const codeEditor = document.getElementById("codeEditor");
    const code = codeEditor ? codeEditor.value : "";

    if (!code.trim()) {
      logToOutput(
        "playgroundOutput",
        "❌ Please enter some code first!",
        "error"
      );
      return;
    }

    clearOutput("playgroundOutput");
    logToOutput("playgroundOutput", "🚀 Executing your code...", "info");

    // Execute the code safely
    executeCode(code, "playgroundOutput");
  } catch (error) {
    logToOutput(
      "playgroundOutput",
      `Error running code: ${error.message}`,
      "error"
    );
  }
}

function clearPlayground() {
  try {
    const codeEditor = document.getElementById("codeEditor");
    if (codeEditor) {
      codeEditor.value = "";
    }
    clearOutput("playgroundOutput");
  } catch (error) {
    console.error("Error clearing playground:", error);
  }
}

// Error Handling Demo
function demoErrorHandling() {
  try {
    clearOutput("promiseOutput");

    logToOutput("promiseOutput", "🛡️ Error Handling Demo", "info");
    logToOutput(
      "promiseOutput",
      "Demonstrating proper error handling...",
      "info"
    );

    // Promise with error handling
    Promise.reject("Something went wrong!").catch((error) => {
      logToOutput("promiseOutput", `✅ Caught error: ${error}`, "success");
      logToOutput(
        "promiseOutput",
        "💡 Always use .catch() for promise error handling",
        "info"
      );
    });

    // Async/await with try-catch
    async function errorDemo() {
      try {
        logToOutput(
          "promiseOutput",
          "⏳ Attempting risky operation...",
          "info"
        );
        await Promise.reject("Async error!");
      } catch (error) {
        logToOutput(
          "promiseOutput",
          `✅ Caught async error: ${error}`,
          "success"
        );
        logToOutput(
          "promiseOutput",
          "💡 Use try-catch with async/await",
          "info"
        );
      }
    }

    setTimeout(errorDemo, 1000);
  } catch (error) {
    logToOutput("promiseOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Web Worker Demo (simplified)
function startWorkerDemo() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "👷 Web Worker Demo", "info");
    logToOutput(
      "workerOutput",
      "Simulating heavy computation in background...",
      "info"
    );

    // Simulate worker computation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateProgress("workerProgress", progress);
      logToOutput("workerOutput", `🔄 Computing... ${progress}%`, "info");

      if (progress >= 100) {
        clearInterval(interval);
        logToOutput("workerOutput", "✅ Computation complete!", "success");
        logToOutput(
          "workerOutput",
          "💡 Web Workers run in separate threads",
          "info"
        );
      }
    }, 200);

    // Store interval for cleanup
    if (!window.demoIntervals) window.demoIntervals = [];
    window.demoIntervals.push(interval);
  } catch (error) {
    logToOutput("workerOutput", `Error in demo: ${error.message}`, "error");
  }
}

function startUITest() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "🖱️ UI Responsiveness Test", "info");
    logToOutput(
      "workerOutput",
      "Try clicking buttons while this runs...",
      "info"
    );

    let counter = 0;
    const maxCount = 10;

    const interval = setInterval(() => {
      counter++;
      logToOutput(
        "workerOutput",
        `⏰ UI is responsive! Count: ${counter}`,
        "success"
      );

      if (counter >= maxCount) {
        clearInterval(interval);
        logToOutput(
          "workerOutput",
          "✅ UI remained responsive throughout!",
          "success"
        );
      }
    }, 500);

    // Store interval for cleanup
    if (!window.demoIntervals) window.demoIntervals = [];
    window.demoIntervals.push(interval);
  } catch (error) {
    logToOutput("workerOutput", `Error in demo: ${error.message}`, "error");
  }
}

// Initialize default playground code
document.addEventListener("DOMContentLoaded", function () {
  try {
    const codeEditor = document.getElementById("codeEditor");
    if (codeEditor && !codeEditor.value.trim()) {
      codeEditor.value = `// Try your own async JavaScript code here...
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('End');`;
    }
  } catch (error) {
    console.error("Error initializing playground:", error);
  }
});

console.log("📚 Demos loaded successfully!");
