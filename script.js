document.addEventListener("DOMContentLoaded", function () {
  // Check if user has already voted (using localStorage for simplicity)
  if (localStorage.getItem("rated") === "true") {
    disableRatingButtons(); // Disable rating buttons if user has already voted
  }

  // Function to disable rating buttons after user has voted
  function disableRatingButtons() {
    document.getElementById("thumbs-up").disabled = true;
    document.getElementById("thumbs-down").disabled = true;
  }

  // Function to update thumbs up count
  function updateThumbsUpCount(count) {
    document.getElementById("thumbs-up-count").textContent = count;
  }

  // Function to update thumbs down count
  function updateThumbsDownCount(count) {
    document.getElementById("thumbs-down-count").textContent = count;
  }

  // Initial ratings (you can load these from a server if needed)
  let thumbsUpCount = 0;
  let thumbsDownCount = 0;

  // Event listener for thumbs up button
  document.getElementById("thumbs-up").addEventListener("click", function () {
    if (localStorage.getItem("rated") !== "true") {
      thumbsUpCount++;
      updateThumbsUpCount(thumbsUpCount);
      localStorage.setItem("rated", "true"); // Mark user as rated
      disableRatingButtons(); // Disable buttons after voting (optional)
      sendRatingToServer("thumbsUp", thumbsUpCount);
    }
  });

  // Event listener for thumbs down button
  document.getElementById("thumbs-down").addEventListener("click", function () {
    if (localStorage.getItem("rated") !== "true") {
      thumbsDownCount++;
      updateThumbsDownCount(thumbsDownCount);
      localStorage.setItem("rated", "true"); // Mark user as rated
      disableRatingButtons(); // Disable buttons after voting (optional)
      sendRatingToServer("thumbsDown", thumbsDownCount);
    }
  });

  // Function to send rating data to server
  function sendRatingToServer(type, count) {
    // Replace this with your actual server endpoint and AJAX implementation
    console.log(`Sending ${type} count ${count} to server...`);
    // Example AJAX call using Fetch API
    fetch("/store-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type, count: count }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error sending rating to server:", error);
      });
  }
});
