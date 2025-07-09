// Clean, stable web worker demonstrations

// Simple worker simulation (no actual web workers to avoid complexity)
function demonstrateWorkers() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "👷 Web Worker Simulation", "info");
    logToOutput("workerOutput", "Simulating background processing...", "info");

    // Simulate heavy computation without blocking UI
    let progress = 0;
    const computationInterval = setInterval(() => {
      progress += 5;
      updateProgress("workerProgress", progress);
      logToOutput("workerOutput", `🔄 Processing... ${progress}%`, "info");

      if (progress >= 100) {
        clearInterval(computationInterval);
        logToOutput("workerOutput", "✅ Background task completed!", "success");
        logToOutput(
          "workerOutput",
          "💡 UI remained responsive during computation",
          "info"
        );
      }
    }, 100);

    // Store interval for cleanup
    if (!window.demoIntervals) window.demoIntervals = [];
    window.demoIntervals.push(computationInterval);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in worker demo: ${error.message}`,
      "error"
    );
  }
}

// Heavy computation comparison
function compareMainThreadVsWorker() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "⚡ Main Thread vs Worker Comparison", "info");

    // Simulate main thread blocking
    logToOutput(
      "workerOutput",
      "1️⃣ Main Thread Computation (blocking):",
      "info"
    );

    setTimeout(() => {
      logToOutput(
        "workerOutput",
        "🚫 UI would freeze during this computation...",
        "error"
      );

      // Simulate heavy work
      let counter = 0;
      const blockingInterval = setInterval(() => {
        counter += 20;
        logToOutput(
          "workerOutput",
          `⏳ Blocking operation: ${counter}%`,
          "error"
        );

        if (counter >= 100) {
          clearInterval(blockingInterval);
          logToOutput(
            "workerOutput",
            "😵 Main thread computation done (UI was blocked)",
            "error"
          );

          // Now show worker simulation
          setTimeout(() => {
            demonstrateNonBlockingWorker();
          }, 1000);
        }
      }, 200);

      // Store interval for cleanup
      if (!window.demoIntervals) window.demoIntervals = [];
      window.demoIntervals.push(blockingInterval);
    }, 500);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in comparison demo: ${error.message}`,
      "error"
    );
  }
}

function demonstrateNonBlockingWorker() {
  try {
    logToOutput("workerOutput", "", "info");
    logToOutput(
      "workerOutput",
      "2️⃣ Web Worker Computation (non-blocking):",
      "success"
    );

    let progress = 0;
    const workerInterval = setInterval(() => {
      progress += 10;
      updateProgress("workerProgress", progress);
      logToOutput(
        "workerOutput",
        `✅ Worker processing: ${progress}%`,
        "success"
      );

      if (progress >= 100) {
        clearInterval(workerInterval);
        logToOutput(
          "workerOutput",
          "🎉 Worker computation done (UI stayed responsive!)",
          "success"
        );
        logToOutput(
          "workerOutput",
          "💡 Web Workers run in separate threads",
          "info"
        );
      }
    }, 150);

    // Store interval for cleanup
    if (!window.demoIntervals) window.demoIntervals = [];
    window.demoIntervals.push(workerInterval);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in non-blocking demo: ${error.message}`,
      "error"
    );
  }
}

// Parallel processing demonstration
function demonstrateParallelProcessing() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "🔄 Parallel Processing Simulation", "info");
    logToOutput(
      "workerOutput",
      "Running multiple tasks simultaneously...",
      "info"
    );

    // Simulate 3 parallel tasks
    const tasks = [
      { name: "Task A", duration: 1000 },
      { name: "Task B", duration: 1500 },
      { name: "Task C", duration: 800 },
    ];

    let completedTasks = 0;
    const startTime = Date.now();

    tasks.forEach((task, index) => {
      setTimeout(() => {
        logToOutput(
          "workerOutput",
          `✅ ${task.name} completed in ${task.duration}ms`,
          "success"
        );
        completedTasks++;

        if (completedTasks === tasks.length) {
          const totalTime = Date.now() - startTime;
          logToOutput("workerOutput", "", "info");
          logToOutput(
            "workerOutput",
            `🏁 All tasks completed in ${totalTime}ms`,
            "success"
          );
          logToOutput(
            "workerOutput",
            "💡 Parallel execution is faster than sequential",
            "info"
          );
        }
      }, task.duration);
    });
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in parallel demo: ${error.message}`,
      "error"
    );
  }
}

// Message passing simulation
function demonstrateMessagePassing() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "📨 Worker Message Passing Simulation", "info");

    // Simulate main thread sending message to worker
    logToOutput(
      "workerOutput",
      "📤 Main → Worker: 'Start calculation'",
      "info"
    );

    setTimeout(() => {
      logToOutput(
        "workerOutput",
        "📥 Worker received: 'Start calculation'",
        "success"
      );
      logToOutput("workerOutput", "🔄 Worker processing...", "info");

      setTimeout(() => {
        logToOutput(
          "workerOutput",
          "📤 Worker → Main: 'Calculation complete'",
          "success"
        );

        setTimeout(() => {
          logToOutput(
            "workerOutput",
            "📥 Main received: 'Calculation complete'",
            "info"
          );
          logToOutput(
            "workerOutput",
            "✅ Message passing successful!",
            "success"
          );
          logToOutput(
            "workerOutput",
            "💡 Workers communicate via messages",
            "info"
          );
        }, 300);
      }, 1500);
    }, 500);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in message passing demo: ${error.message}`,
      "error"
    );
  }
}

// Shared array buffer simulation (conceptual)
function demonstrateSharedMemory() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "🧠 Shared Memory Concepts", "info");
    logToOutput(
      "workerOutput",
      "Note: This is a conceptual demonstration",
      "info"
    );

    // Simulate shared memory operations
    const sharedData = { count: 0 };

    logToOutput(
      "workerOutput",
      `📊 Initial shared value: ${sharedData.count}`,
      "info"
    );

    // Simulate worker modifying shared data
    setTimeout(() => {
      sharedData.count += 10;
      logToOutput(
        "workerOutput",
        `📤 Worker modified shared value: ${sharedData.count}`,
        "success"
      );

      setTimeout(() => {
        sharedData.count += 5;
        logToOutput(
          "workerOutput",
          `📤 Main thread modified shared value: ${sharedData.count}`,
          "info"
        );
        logToOutput(
          "workerOutput",
          "⚠️ Real shared memory requires careful synchronization",
          "info"
        );
        logToOutput(
          "workerOutput",
          "💡 Use SharedArrayBuffer and Atomics for real shared memory",
          "info"
        );
      }, 1000);
    }, 1000);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in shared memory demo: ${error.message}`,
      "error"
    );
  }
}

// Error handling in workers
function demonstrateWorkerErrors() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "🛡️ Worker Error Handling", "info");

    // Simulate worker error
    setTimeout(() => {
      logToOutput("workerOutput", "❌ Worker error: Division by zero", "error");
      logToOutput(
        "workerOutput",
        "🔄 Main thread handling worker error...",
        "info"
      );

      setTimeout(() => {
        logToOutput("workerOutput", "✅ Error handled gracefully", "success");
        logToOutput("workerOutput", "🔄 Restarting worker...", "info");

        setTimeout(() => {
          logToOutput(
            "workerOutput",
            "✅ Worker restarted successfully",
            "success"
          );
          logToOutput("workerOutput", "💡 Always handle worker errors", "info");
        }, 1000);
      }, 1000);
    }, 1000);
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in error handling demo: ${error.message}`,
      "error"
    );
  }
}

// Performance benchmarking
function benchmarkWorkerPerformance() {
  try {
    clearOutput("workerOutput");

    logToOutput("workerOutput", "📊 Worker Performance Benchmark", "info");

    const startTime = Date.now();

    // Simulate computation-heavy task
    let iterations = 0;
    const maxIterations = 1000000;

    function performComputation() {
      const batchSize = 50000;
      const endBatch = Math.min(iterations + batchSize, maxIterations);

      // Simulate computation
      for (let i = iterations; i < endBatch; i++) {
        // Simulated heavy computation
        Math.sqrt(i * Math.PI);
      }

      iterations = endBatch;
      const progress = (iterations / maxIterations) * 100;

      updateProgress("workerProgress", progress);
      logToOutput(
        "workerOutput",
        `🔄 Computed ${iterations.toLocaleString()} iterations (${progress.toFixed(
          1
        )}%)`,
        "info"
      );

      if (iterations < maxIterations) {
        setTimeout(performComputation, 10); // Small delay to keep UI responsive
      } else {
        const endTime = Date.now();
        const duration = endTime - startTime;
        logToOutput(
          "workerOutput",
          `✅ Benchmark completed in ${duration}ms`,
          "success"
        );
        logToOutput(
          "workerOutput",
          "💡 UI remained responsive during computation",
          "info"
        );
      }
    }

    performComputation();
  } catch (error) {
    logToOutput(
      "workerOutput",
      `Error in benchmark: ${error.message}`,
      "error"
    );
  }
}

// Export functions for global use
window.demonstrateWorkers = demonstrateWorkers;
window.compareMainThreadVsWorker = compareMainThreadVsWorker;
window.demonstrateParallelProcessing = demonstrateParallelProcessing;
window.demonstrateMessagePassing = demonstrateMessagePassing;
window.demonstrateSharedMemory = demonstrateSharedMemory;
window.demonstrateWorkerErrors = demonstrateWorkerErrors;
window.benchmarkWorkerPerformance = benchmarkWorkerPerformance;

console.log("👷 Worker demos loaded successfully!");
